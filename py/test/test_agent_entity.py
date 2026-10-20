# Agent entity test

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


class TestAgentEntity:

    def test_should_create_instance(self):
        testsdk = DeepgramSDK.test(None, None)
        ent = testsdk.Agent(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = DeepgramSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Agent(None).list({"project_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _agent_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "agent." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["project01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via DEEPGRAM_TEST_AGENT_ENTID")
        if setup["live"]:
            runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a agent record it did not create")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        agent_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.agent")))
        agent_ref01_data = None
        if len(agent_ref01_data_raw) > 0:
            agent_ref01_data = helpers.to_map(agent_ref01_data_raw[0][1])

        # LIST
        agent_ref01_ent = client.Agent(None)
        agent_ref01_match = {
            "project_id": setup["idmap"]["project01"],
        }

        agent_ref01_list_result = agent_ref01_ent.list(agent_ref01_match, None)
        assert isinstance(agent_ref01_list_result, list)

        # UPDATE
        agent_ref01_data_up0_up = {
            "id": agent_ref01_data["id"],
            "project_id": setup["idmap"]["project_id"],
        }

        agent_ref01_markdef_up0_name = "agent_id"
        agent_ref01_markdef_up0_value = "Mark01-agent_ref01_" + str(setup["now"])
        agent_ref01_data_up0_up[agent_ref01_markdef_up0_name] = agent_ref01_markdef_up0_value

        agent_ref01_resdata_up0 = helpers.to_map(runner.entity_data(agent_ref01_ent.update(agent_ref01_data_up0_up, None)))
        assert agent_ref01_resdata_up0 is not None
        assert agent_ref01_resdata_up0["id"] == agent_ref01_data_up0_up["id"]
        assert agent_ref01_resdata_up0[agent_ref01_markdef_up0_name] == agent_ref01_markdef_up0_value

        # LOAD
        agent_ref01_match_dt0 = {
            "id": agent_ref01_data["id"],
        }
        agent_ref01_match_dt0["project_id"] = setup["idmap"].get("project_id") or setup["idmap"].get("project01")
        agent_ref01_data_dt0_loaded = agent_ref01_ent.load(agent_ref01_match_dt0, None)
        agent_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(agent_ref01_data_dt0_loaded))
        assert agent_ref01_data_dt0_load_result is not None
        assert agent_ref01_data_dt0_load_result["id"] == agent_ref01_data["id"]



def _agent_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/agent/AgentTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DeepgramSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["agent01", "agent02", "agent03", "project01", "project02", "project03"],
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
        "DEEPGRAM_TEST_AGENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DEEPGRAM_TEST_AGENT_ENTID": idmap,
        "DEEPGRAM_TEST_LIVE": "FALSE",
        "DEEPGRAM_TEST_EXPLAIN": "FALSE",
        "DEEPGRAM_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("DEEPGRAM_TEST_AGENT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("project_id") is None:
        idmap_resolved["project_id"] = idmap_resolved.get("project01")

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
