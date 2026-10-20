

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DeepgramSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AgentVariableEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.AgentVariable()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentVariable().list({"project_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_variable.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_version":{"a":true,"h":"Api Version","n":"api_version","r":false,"sh":"API version.","t":"`$INTEGER`","key$":"api_version","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the variable was created","t":"`$STRING`","key$":"created_at","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"key":{"a":true,"h":"Key","n":"key","r":true,"sh":"The variable name, following the DG_<VARIABLE_NAME> format","t":"`$STRING`","key$":"key","index$":3},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Timestamp when the variable was last updated","t":"`$STRING`","key$":"updated_at","index$":4},"value":{"a":true,"h":"Value","n":"value","r":true,"sh":"The value to substitute.","t":"`$ANY`","key$":"value","index$":5},"variable_id":{"a":true,"h":"Variable Id","n":"variable_id","r":true,"sh":"The unique identifier of the variable","t":"`$STRING`","key$":"variable_id","index$":6}},"id":{"field":"id","name":"id"},"name":"agent_variable","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["api_version","key","value"],"co":{"id":"POST /v1/projects/{project_id}/agent-variables","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/projects/{project_id}/agent-variables","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"agent-variables"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/agent-variables","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/agent-variables","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"agent-variables"}],"t":{"req":"`reqdata`","res":"`body.variables`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/agent-variables/{variable_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"variable_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/agent-variables/{variable_id}","q":{"exist":["id","project_id"]},"r":{"param":{"variable_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"agent-variables"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/projects/{project_id}/agent-variables/{variable_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"variable_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/projects/{project_id}/agent-variables/{variable_id}","q":{"exist":["id","project_id"]},"r":{"param":{"variable_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"agent-variables"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["value"],"co":{"id":"PATCH /v1/projects/{project_id}/agent-variables/{variable_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"variable_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v1/projects/{project_id}/agent-variables/{variable_id}","q":{"exist":["id","project_id"]},"r":{"param":{"variable_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"agent-variables"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"agent_variable","name__orig":"agent_variable","Name":"AgentVariable","name_":"agent_variable","name-":"agent-variable","NAME":"AGENT_VARIABLE","index$":2}, {"active":true,"entity":"agent_variable","key$":"BasicAgentVariableFlow","kind":"basic","name":"BasicAgentVariableFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_variable_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_variable_ref01"}}],"index$":1},{"a":true,"d":{"project_id":"project01"},"i":{"ref":"agent_variable_ref01","srcdatavar":"agent_variable_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_variable_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"agent_variable_ref01","srcdatavar":"agent_variable_ref01_data","suffix":"_dt0"},"m":{"id":"agent_variable01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_variable_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"agent_variable_ref01","suffix":"_rm0"},"m":{"id":"agent_variable01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"agent_variable_ref01"}}],"index$":5}]}, 'AgentVariable', {"POST /v1/projects/{project_id}/agent-variables":{"protocol":"http","requestBody":{"description":"Agent variable details","content":{"application/json":{"schema":{"type":"object","properties":{"key":{"type":"string","description":"The variable name, following the DG_<VARIABLE_NAME> format","key$":"key"},"value":{"description":"The value to substitute. Can be any valid JSON type (string, number, boolean, object, or array)","key$":"value"},"api_version":{"type":"integer","default":1,"description":"API version. Defaults to 1","key$":"api_version"}},"required":["key","value"],"description":"Request body for creating an agent variable","title":"CreateAgentVariableV1Request","x-ref":"#/components/schemas/CreateAgentVariableV1Request","index$":1}}}},"parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/projects/{project_id}/agent-variables":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]},"GET /v1/projects/{project_id}/agent-variables/{variable_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"variable_id","in":"path","description":"The unique identifier of the agent variable","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /v1/projects/{project_id}/agent-variables/{variable_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"variable_id","in":"path","description":"The unique identifier of the agent variable","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /v1/projects/{project_id}/agent-variables/{variable_id}":{"protocol":"http","requestBody":{"description":"Updated value for the agent variable","content":{"application/json":{"schema":{"type":"object","properties":{"value":{"description":"The new value to substitute","key$":"value"}},"required":["value"],"description":"Request body for updating an agent variable","title":"UpdateAgentVariableV1Request","x-ref":"#/components/schemas/UpdateAgentVariableV1Request","index$":1}}}},"parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"variable_id","in":"path","description":"The unique identifier of the agent variable","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_variable_ref01_ent = client.AgentVariable()
    let agent_variable_ref01_data = setup.data.new.agent_variable['agent_variable_ref01']
    agent_variable_ref01_data['project_id'] = setup.idmap['project01']

    agent_variable_ref01_data = (await agent_variable_ref01_ent.create(agent_variable_ref01_data)).data()
    assert(null != agent_variable_ref01_data.id)


    // LIST
    const agent_variable_ref01_match: any = {}
    agent_variable_ref01_match['project_id'] = setup.idmap['project01']

    const agent_variable_ref01_list = (await agent_variable_ref01_ent.list(agent_variable_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(agent_variable_ref01_list, { id: agent_variable_ref01_data.id })))


    // UPDATE
    const agent_variable_ref01_data_up0: any = {}
    agent_variable_ref01_data_up0.id = agent_variable_ref01_data.id
    agent_variable_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']

    const agent_variable_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-agent_variable_ref01_' + setup.now }
    ;(agent_variable_ref01_data_up0 as any)[agent_variable_ref01_markdef_up0.name] = agent_variable_ref01_markdef_up0.value

    const agent_variable_ref01_resdata_up0 = (await agent_variable_ref01_ent.update(agent_variable_ref01_data_up0)).data()
    assert(agent_variable_ref01_resdata_up0.id === agent_variable_ref01_data_up0.id)

    assert((agent_variable_ref01_resdata_up0 as any)[agent_variable_ref01_markdef_up0.name] === agent_variable_ref01_markdef_up0.value)


    // LOAD
    const agent_variable_ref01_match_dt0: any = {}
    agent_variable_ref01_match_dt0.id = agent_variable_ref01_data.id
    agent_variable_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const agent_variable_ref01_data_dt0 = (await agent_variable_ref01_ent.load(agent_variable_ref01_match_dt0)).data()
    assert(agent_variable_ref01_data_dt0.id === agent_variable_ref01_data.id)


    // REMOVE
    const agent_variable_ref01_match_rm0: any = { id: agent_variable_ref01_data.id }
    agent_variable_ref01_match_rm0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    await agent_variable_ref01_ent.remove(agent_variable_ref01_match_rm0)
  

    // LIST
    const agent_variable_ref01_match_rt0: any = {}
    agent_variable_ref01_match_rt0['project_id'] = setup.idmap['project01']

    const agent_variable_ref01_list_rt0 = (await agent_variable_ref01_ent.list(agent_variable_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(agent_variable_ref01_list_rt0, { id: agent_variable_ref01_data.id })))


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agent_variable/AgentVariableTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DeepgramSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['agent_variable01','agent_variable02','agent_variable03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_AGENT_VARIABLE_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_AGENT_VARIABLE_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_AGENT_VARIABLE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DeepgramSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.DEEPGRAM_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DEEPGRAM_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
