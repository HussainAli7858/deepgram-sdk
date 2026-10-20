# BillingBreakdownV1 entity test

import json
import os
import time

import pytest

from deepgram_sdk.utility.voxgig_struct import voxgig_struct as vs
from deepgram_sdk import DeepgramSDK
from deepgram_sdk.core import helpers
from deepgram_sdk.config import shared_config
from deepgram_sdk.feature.base_feature import DeepgramBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBillingBreakdownV1Entity:

    def test_should_create_instance(self):
        testsdk = DeepgramSDK.test(None, None)
        ent = testsdk.BillingBreakdownV1(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = DeepgramSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.BillingBreakdownV1(None).list({"project_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _billing_breakdown_v1_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "billing_breakdown_v1." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["project01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via DEEPGRAM_TEST_BILLING_BREAKDOWN_V1_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        billing_breakdown_v1_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.billing_breakdown_v1")))
        billing_breakdown_v1_ref01_data = None
        if len(billing_breakdown_v1_ref01_data_raw) > 0:
            billing_breakdown_v1_ref01_data = helpers.to_map(billing_breakdown_v1_ref01_data_raw[0][1])

        # LIST
        billing_breakdown_v1_ref01_ent = client.BillingBreakdownV1(None)
        billing_breakdown_v1_ref01_match = {
            "project_id": setup["idmap"]["project01"],
        }

        billing_breakdown_v1_ref01_list_result = billing_breakdown_v1_ref01_ent.list(billing_breakdown_v1_ref01_match, None)
        assert isinstance(billing_breakdown_v1_ref01_list_result, list)



def _billing_breakdown_v1_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/billing_breakdown_v1/BillingBreakdownV1TestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DeepgramSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["billing_breakdown_v101", "billing_breakdown_v102", "billing_breakdown_v103", "project01", "project02", "project03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "DEEPGRAM_TEST_BILLING_BREAKDOWN_V1_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DEEPGRAM_TEST_BILLING_BREAKDOWN_V1_ENTID": idmap,
        "DEEPGRAM_TEST_LIVE": "FALSE",
        "DEEPGRAM_TEST_EXPLAIN": "FALSE",
        "DEEPGRAM_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("DEEPGRAM_TEST_BILLING_BREAKDOWN_V1_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DEEPGRAM_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("DEEPGRAM_APIKEY"),
            },
            extra or {},
        ])
        client = DeepgramSDK(helpers.to_map(merged_opts))

    _live = env.get("DEEPGRAM_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DEEPGRAM_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
