# Deepgram SDK

from deepgram_sdk.utility.voxgig_struct import voxgig_struct as vs
from deepgram_sdk.core.utility_type import DeepgramUtility
from deepgram_sdk.core.spec import DeepgramSpec
from deepgram_sdk.core import helpers
from deepgram_sdk.utility.prepare_method import allowed
from deepgram_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from deepgram_sdk.utility import register

# Load features
from deepgram_sdk.feature.base_feature import DeepgramBaseFeature
from deepgram_sdk.features import _has_feature, _make_feature


class DeepgramSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = DeepgramUtility()
        self._utility = utility

        from deepgram_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "DeepgramSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return DeepgramUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = DeepgramSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "DeepgramSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("DeepgramSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Agent(self, data=None) -> "AgentEntity":
        """Entity factory: client.Agent().list() / client.Agent().load({"id": ...})."""
        from deepgram_sdk.entity.agent_entity import AgentEntity
        return AgentEntity(self, data)


    def AgentThinkModelsV1(self, data=None) -> "AgentThinkModelsV1Entity":
        """Entity factory: client.AgentThinkModelsV1().list() / client.AgentThinkModelsV1().load({"id": ...})."""
        from deepgram_sdk.entity.agent_think_models_v1_entity import AgentThinkModelsV1Entity
        return AgentThinkModelsV1Entity(self, data)


    def AgentVariable(self, data=None) -> "AgentVariableEntity":
        """Entity factory: client.AgentVariable().list() / client.AgentVariable().load({"id": ...})."""
        from deepgram_sdk.entity.agent_variable_entity import AgentVariableEntity
        return AgentVariableEntity(self, data)


    def BillingBreakdownV1(self, data=None) -> "BillingBreakdownV1Entity":
        """Entity factory: client.BillingBreakdownV1().list() / client.BillingBreakdownV1().load({"id": ...})."""
        from deepgram_sdk.entity.billing_breakdown_v1_entity import BillingBreakdownV1Entity
        return BillingBreakdownV1Entity(self, data)


    def CreateAgentConfigurationV1(self, data=None) -> "CreateAgentConfigurationV1Entity":
        """Entity factory: client.CreateAgentConfigurationV1().list() / client.CreateAgentConfigurationV1().load({"id": ...})."""
        from deepgram_sdk.entity.create_agent_configuration_v1_entity import CreateAgentConfigurationV1Entity
        return CreateAgentConfigurationV1Entity(self, data)


    def CreateKeyV1(self, data=None) -> "CreateKeyV1Entity":
        """Entity factory: client.CreateKeyV1().list() / client.CreateKeyV1().load({"id": ...})."""
        from deepgram_sdk.entity.create_key_v1_entity import CreateKeyV1Entity
        return CreateKeyV1Entity(self, data)


    def CreateProjectDistributionCredentialsV1(self, data=None) -> "CreateProjectDistributionCredentialsV1Entity":
        """Entity factory: client.CreateProjectDistributionCredentialsV1().list() / client.CreateProjectDistributionCredentialsV1().load({"id": ...})."""
        from deepgram_sdk.entity.create_project_distribution_credentials_v1_entity import CreateProjectDistributionCredentialsV1Entity
        return CreateProjectDistributionCredentialsV1Entity(self, data)


    def CreateProjectInviteV1(self, data=None) -> "CreateProjectInviteV1Entity":
        """Entity factory: client.CreateProjectInviteV1().list() / client.CreateProjectInviteV1().load({"id": ...})."""
        from deepgram_sdk.entity.create_project_invite_v1_entity import CreateProjectInviteV1Entity
        return CreateProjectInviteV1Entity(self, data)


    def Grant(self, data=None) -> "GrantEntity":
        """Entity factory: client.Grant().list() / client.Grant().load({"id": ...})."""
        from deepgram_sdk.entity.grant_entity import GrantEntity
        return GrantEntity(self, data)


    def ListBillingFieldsV1(self, data=None) -> "ListBillingFieldsV1Entity":
        """Entity factory: client.ListBillingFieldsV1().list() / client.ListBillingFieldsV1().load({"id": ...})."""
        from deepgram_sdk.entity.list_billing_fields_v1_entity import ListBillingFieldsV1Entity
        return ListBillingFieldsV1Entity(self, data)


    def ListModelsV1(self, data=None) -> "ListModelsV1Entity":
        """Entity factory: client.ListModelsV1().list() / client.ListModelsV1().load({"id": ...})."""
        from deepgram_sdk.entity.list_models_v1_entity import ListModelsV1Entity
        return ListModelsV1Entity(self, data)


    def ListProjectBalancesV1ResponseBalancesItem(self, data=None) -> "ListProjectBalancesV1ResponseBalancesItemEntity":
        """Entity factory: client.ListProjectBalancesV1ResponseBalancesItem().list() / client.ListProjectBalancesV1ResponseBalancesItem().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_balances_v1_response_balances_item_entity import ListProjectBalancesV1ResponseBalancesItemEntity
        return ListProjectBalancesV1ResponseBalancesItemEntity(self, data)


    def ListProjectDistributionCredentialsV1ResponseDistribution(self, data=None) -> "ListProjectDistributionCredentialsV1ResponseDistributionEntity":
        """Entity factory: client.ListProjectDistributionCredentialsV1ResponseDistribution().list() / client.ListProjectDistributionCredentialsV1ResponseDistribution().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_distribution_credentials_v1_response_distribution_entity import ListProjectDistributionCredentialsV1ResponseDistributionEntity
        return ListProjectDistributionCredentialsV1ResponseDistributionEntity(self, data)


    def ListProjectInvitesV1ResponseInvitesItem(self, data=None) -> "ListProjectInvitesV1ResponseInvitesItemEntity":
        """Entity factory: client.ListProjectInvitesV1ResponseInvitesItem().list() / client.ListProjectInvitesV1ResponseInvitesItem().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_invites_v1_response_invites_item_entity import ListProjectInvitesV1ResponseInvitesItemEntity
        return ListProjectInvitesV1ResponseInvitesItemEntity(self, data)


    def ListProjectKeysV1ResponseApiKeysItem(self, data=None) -> "ListProjectKeysV1ResponseApiKeysItemEntity":
        """Entity factory: client.ListProjectKeysV1ResponseApiKeysItem().list() / client.ListProjectKeysV1ResponseApiKeysItem().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_keys_v1_response_api_keys_item_entity import ListProjectKeysV1ResponseApiKeysItemEntity
        return ListProjectKeysV1ResponseApiKeysItemEntity(self, data)


    def ListProjectMemberScopesV1(self, data=None) -> "ListProjectMemberScopesV1Entity":
        """Entity factory: client.ListProjectMemberScopesV1().list() / client.ListProjectMemberScopesV1().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_member_scopes_v1_entity import ListProjectMemberScopesV1Entity
        return ListProjectMemberScopesV1Entity(self, data)


    def ListProjectMembersV1ResponseMembersItem(self, data=None) -> "ListProjectMembersV1ResponseMembersItemEntity":
        """Entity factory: client.ListProjectMembersV1ResponseMembersItem().list() / client.ListProjectMembersV1ResponseMembersItem().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_members_v1_response_members_item_entity import ListProjectMembersV1ResponseMembersItemEntity
        return ListProjectMembersV1ResponseMembersItemEntity(self, data)


    def ListProjectPurchasesV1ResponseOrdersItem(self, data=None) -> "ListProjectPurchasesV1ResponseOrdersItemEntity":
        """Entity factory: client.ListProjectPurchasesV1ResponseOrdersItem().list() / client.ListProjectPurchasesV1ResponseOrdersItem().load({"id": ...})."""
        from deepgram_sdk.entity.list_project_purchases_v1_response_orders_item_entity import ListProjectPurchasesV1ResponseOrdersItemEntity
        return ListProjectPurchasesV1ResponseOrdersItemEntity(self, data)


    def Listen(self, data=None) -> "ListenEntity":
        """Entity factory: client.Listen().list() / client.Listen().load({"id": ...})."""
        from deepgram_sdk.entity.listen_entity import ListenEntity
        return ListenEntity(self, data)


    def Model(self, data=None) -> "ModelEntity":
        """Entity factory: client.Model().list() / client.Model().load({"id": ...})."""
        from deepgram_sdk.entity.model_entity import ModelEntity
        return ModelEntity(self, data)


    def Project(self, data=None) -> "ProjectEntity":
        """Entity factory: client.Project().list() / client.Project().load({"id": ...})."""
        from deepgram_sdk.entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    def ProjectBalanceV1(self, data=None) -> "ProjectBalanceV1Entity":
        """Entity factory: client.ProjectBalanceV1().list() / client.ProjectBalanceV1().load({"id": ...})."""
        from deepgram_sdk.entity.project_balance_v1_entity import ProjectBalanceV1Entity
        return ProjectBalanceV1Entity(self, data)


    def ProjectDistributionCredentialsV1(self, data=None) -> "ProjectDistributionCredentialsV1Entity":
        """Entity factory: client.ProjectDistributionCredentialsV1().list() / client.ProjectDistributionCredentialsV1().load({"id": ...})."""
        from deepgram_sdk.entity.project_distribution_credentials_v1_entity import ProjectDistributionCredentialsV1Entity
        return ProjectDistributionCredentialsV1Entity(self, data)


    def ProjectInviteV1(self, data=None) -> "ProjectInviteV1Entity":
        """Entity factory: client.ProjectInviteV1().list() / client.ProjectInviteV1().load({"id": ...})."""
        from deepgram_sdk.entity.project_invite_v1_entity import ProjectInviteV1Entity
        return ProjectInviteV1Entity(self, data)


    def ProjectKeyV1(self, data=None) -> "ProjectKeyV1Entity":
        """Entity factory: client.ProjectKeyV1().list() / client.ProjectKeyV1().load({"id": ...})."""
        from deepgram_sdk.entity.project_key_v1_entity import ProjectKeyV1Entity
        return ProjectKeyV1Entity(self, data)


    def ProjectKeyV1ResponseItem(self, data=None) -> "ProjectKeyV1ResponseItemEntity":
        """Entity factory: client.ProjectKeyV1ResponseItem().list() / client.ProjectKeyV1ResponseItem().load({"id": ...})."""
        from deepgram_sdk.entity.project_key_v1_response_item_entity import ProjectKeyV1ResponseItemEntity
        return ProjectKeyV1ResponseItemEntity(self, data)


    def ProjectMemberV1(self, data=None) -> "ProjectMemberV1Entity":
        """Entity factory: client.ProjectMemberV1().list() / client.ProjectMemberV1().load({"id": ...})."""
        from deepgram_sdk.entity.project_member_v1_entity import ProjectMemberV1Entity
        return ProjectMemberV1Entity(self, data)


    def ProjectRequest(self, data=None) -> "ProjectRequestEntity":
        """Entity factory: client.ProjectRequest().list() / client.ProjectRequest().load({"id": ...})."""
        from deepgram_sdk.entity.project_request_entity import ProjectRequestEntity
        return ProjectRequestEntity(self, data)


    def Read(self, data=None) -> "ReadEntity":
        """Entity factory: client.Read().list() / client.Read().load({"id": ...})."""
        from deepgram_sdk.entity.read_entity import ReadEntity
        return ReadEntity(self, data)


    def Speak(self, data=None) -> "SpeakEntity":
        """Entity factory: client.Speak().list() / client.Speak().load({"id": ...})."""
        from deepgram_sdk.entity.speak_entity import SpeakEntity
        return SpeakEntity(self, data)


    def UpdateProjectMemberScopesV1(self, data=None) -> "UpdateProjectMemberScopesV1Entity":
        """Entity factory: client.UpdateProjectMemberScopesV1().list() / client.UpdateProjectMemberScopesV1().load({"id": ...})."""
        from deepgram_sdk.entity.update_project_member_scopes_v1_entity import UpdateProjectMemberScopesV1Entity
        return UpdateProjectMemberScopesV1Entity(self, data)


    def UpdateProjectV1(self, data=None) -> "UpdateProjectV1Entity":
        """Entity factory: client.UpdateProjectV1().list() / client.UpdateProjectV1().load({"id": ...})."""
        from deepgram_sdk.entity.update_project_v1_entity import UpdateProjectV1Entity
        return UpdateProjectV1Entity(self, data)


    def Usage(self, data=None) -> "UsageEntity":
        """Entity factory: client.Usage().list() / client.Usage().load({"id": ...})."""
        from deepgram_sdk.entity.usage_entity import UsageEntity
        return UsageEntity(self, data)


    def UsageBreakdownV1(self, data=None) -> "UsageBreakdownV1Entity":
        """Entity factory: client.UsageBreakdownV1().list() / client.UsageBreakdownV1().load({"id": ...})."""
        from deepgram_sdk.entity.usage_breakdown_v1_entity import UsageBreakdownV1Entity
        return UsageBreakdownV1Entity(self, data)


    def UsageFieldsV1(self, data=None) -> "UsageFieldsV1Entity":
        """Entity factory: client.UsageFieldsV1().list() / client.UsageFieldsV1().load({"id": ...})."""
        from deepgram_sdk.entity.usage_fields_v1_entity import UsageFieldsV1Entity
        return UsageFieldsV1Entity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "DeepgramSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from deepgram_sdk.entity.agent_entity import AgentEntity
    from deepgram_sdk.entity.agent_think_models_v1_entity import AgentThinkModelsV1Entity
    from deepgram_sdk.entity.agent_variable_entity import AgentVariableEntity
    from deepgram_sdk.entity.billing_breakdown_v1_entity import BillingBreakdownV1Entity
    from deepgram_sdk.entity.create_agent_configuration_v1_entity import CreateAgentConfigurationV1Entity
    from deepgram_sdk.entity.create_key_v1_entity import CreateKeyV1Entity
    from deepgram_sdk.entity.create_project_distribution_credentials_v1_entity import CreateProjectDistributionCredentialsV1Entity
    from deepgram_sdk.entity.create_project_invite_v1_entity import CreateProjectInviteV1Entity
    from deepgram_sdk.entity.grant_entity import GrantEntity
    from deepgram_sdk.entity.list_billing_fields_v1_entity import ListBillingFieldsV1Entity
    from deepgram_sdk.entity.list_models_v1_entity import ListModelsV1Entity
    from deepgram_sdk.entity.list_project_balances_v1_response_balances_item_entity import ListProjectBalancesV1ResponseBalancesItemEntity
    from deepgram_sdk.entity.list_project_distribution_credentials_v1_response_distribution_entity import ListProjectDistributionCredentialsV1ResponseDistributionEntity
    from deepgram_sdk.entity.list_project_invites_v1_response_invites_item_entity import ListProjectInvitesV1ResponseInvitesItemEntity
    from deepgram_sdk.entity.list_project_keys_v1_response_api_keys_item_entity import ListProjectKeysV1ResponseApiKeysItemEntity
    from deepgram_sdk.entity.list_project_member_scopes_v1_entity import ListProjectMemberScopesV1Entity
    from deepgram_sdk.entity.list_project_members_v1_response_members_item_entity import ListProjectMembersV1ResponseMembersItemEntity
    from deepgram_sdk.entity.list_project_purchases_v1_response_orders_item_entity import ListProjectPurchasesV1ResponseOrdersItemEntity
    from deepgram_sdk.entity.listen_entity import ListenEntity
    from deepgram_sdk.entity.model_entity import ModelEntity
    from deepgram_sdk.entity.project_entity import ProjectEntity
    from deepgram_sdk.entity.project_balance_v1_entity import ProjectBalanceV1Entity
    from deepgram_sdk.entity.project_distribution_credentials_v1_entity import ProjectDistributionCredentialsV1Entity
    from deepgram_sdk.entity.project_invite_v1_entity import ProjectInviteV1Entity
    from deepgram_sdk.entity.project_key_v1_entity import ProjectKeyV1Entity
    from deepgram_sdk.entity.project_key_v1_response_item_entity import ProjectKeyV1ResponseItemEntity
    from deepgram_sdk.entity.project_member_v1_entity import ProjectMemberV1Entity
    from deepgram_sdk.entity.project_request_entity import ProjectRequestEntity
    from deepgram_sdk.entity.read_entity import ReadEntity
    from deepgram_sdk.entity.speak_entity import SpeakEntity
    from deepgram_sdk.entity.update_project_member_scopes_v1_entity import UpdateProjectMemberScopesV1Entity
    from deepgram_sdk.entity.update_project_v1_entity import UpdateProjectV1Entity
    from deepgram_sdk.entity.usage_entity import UsageEntity
    from deepgram_sdk.entity.usage_breakdown_v1_entity import UsageBreakdownV1Entity
    from deepgram_sdk.entity.usage_fields_v1_entity import UsageFieldsV1Entity
