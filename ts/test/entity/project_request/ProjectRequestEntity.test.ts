

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


describe('ProjectRequestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.ProjectRequest()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectRequest().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_request.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_key_id":{"a":true,"h":"Api Key Id","n":"api_key_id","r":false,"sh":"The unique identifier of the API key","t":"`$STRING`","key$":"api_key_id","index$":0},"callback":{"a":true,"h":"Callback","n":"callback","r":false,"sh":"The callback URL for the request","t":"`$STRING`","key$":"callback","index$":1},"code":{"a":true,"fo":"double","h":"Code","n":"code","r":false,"sh":"The response code of the request","t":"`$NUMBER`","key$":"code","index$":2},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"sh":"The date and time the request was created","t":"`$STRING`","key$":"created","index$":3},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":false,"sh":"The deployment type","t":"`$STRING`","key$":"deployment","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"path":{"a":true,"h":"Path","n":"path","r":false,"sh":"The API path of the request","t":"`$STRING`","key$":"path","index$":6},"project_uuid":{"a":true,"h":"Project Uuid","n":"project_uuid","r":false,"sh":"The unique identifier of the project","t":"`$STRING`","key$":"project_uuid","index$":7},"request_id":{"a":true,"h":"Request Id","n":"request_id","r":false,"sh":"The unique identifier of the request","t":"`$STRING`","key$":"request_id","index$":8},"response":{"a":true,"h":"Response","n":"response","r":false,"sh":"The response of the request","t":"`$OBJECT`","key$":"response","index$":9}},"id":{"field":"id","name":"id"},"name":"project_request","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/requests","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"accessor","or":"accessor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"deployment","or":"deployment","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"endpoint","or":"endpoint","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$NUMBER`","index$":4},{"a":true,"k":"query","n":"method","or":"method","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$NUMBER`","index$":6},{"a":true,"k":"query","n":"request_id","or":"request_id","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/requests","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"requests"}],"t":{"req":"`reqdata`","res":"`body.requests`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/requests/{request_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"request_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/requests/{request_id}","q":{"exist":["id","project_id"]},"r":{"param":{"request_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"requests"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.request`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"project_request","name__orig":"project_request","Name":"ProjectRequest","name_":"project_request","name-":"project-request","NAME":"PROJECT_REQUEST","index$":27}, {"active":true,"entity":"project_request","key$":"BasicProjectRequestFlow","kind":"basic","name":"BasicProjectRequestFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_request_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"project_request_ref01","srcdatavar":"project_request_ref01_data","suffix":"_dt0"},"m":{"id":"project_request01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_request_ref01"}}],"index$":0}]}, 'ProjectRequest', {"GET /v1/projects/{project_id}/requests":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"start","in":"query","description":"Start date of the requested date range. Formats accepted are YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, or YYYY-MM-DDTHH:MM:SS+HH:MM","required":false,"schema":{"type":"string","format":"date-time"},"index$":1},{"name":"end","in":"query","description":"End date of the requested date range. Formats accepted are YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, or YYYY-MM-DDTHH:MM:SS+HH:MM","required":false,"schema":{"type":"string","format":"date-time"},"index$":2},{"name":"limit","in":"query","description":"Number of results to return per page. Default 10. Range [1,1000]","required":false,"schema":{"type":"number","format":"double","minimum":1,"maximum":1000,"default":10},"index$":3},{"name":"page","in":"query","description":"Navigate and return the results to retrieve specific portions of information of the response","required":false,"schema":{"type":"number","format":"double"},"index$":4},{"name":"accessor","in":"query","description":"Filter for requests where a specific accessor was used","required":false,"schema":{"type":"string"},"index$":5},{"name":"request_id","in":"query","description":"Filter for a specific request id","required":false,"schema":{"type":"string"},"index$":6},{"name":"deployment","in":"query","description":"Filter for requests where a specific deployment was used","required":false,"schema":{"type":"string","enum":["hosted","beta","self-hosted"],"description":"Deployment type for the requests","title":"V1ProjectsProjectIdRequestsGetParametersDeployment","x-ref":"#/components/schemas/V1ProjectsProjectIdRequestsGetParametersDeployment"},"index$":7},{"name":"endpoint","in":"query","description":"Filter for requests where a specific endpoint was used","required":false,"schema":{"type":"string","enum":["listen","read","speak","agent"],"title":"V1ProjectsProjectIdRequestsGetParametersEndpoint","x-ref":"#/components/schemas/V1ProjectsProjectIdRequestsGetParametersEndpoint"},"index$":8},{"name":"method","in":"query","description":"Filter for requests where a specific method was used","required":false,"schema":{"type":"string","enum":["sync","async","streaming"],"description":"Method type for the request","title":"V1ProjectsProjectIdRequestsGetParametersMethod","x-ref":"#/components/schemas/V1ProjectsProjectIdRequestsGetParametersMethod"},"index$":9},{"name":"status","in":"query","description":"Filter for requests that succeeded (status code < 300) or failed (status code >=400)","required":false,"schema":{"type":"string","enum":["succeeded","failed"],"title":"V1ProjectsProjectIdRequestsGetParametersStatus","x-ref":"#/components/schemas/V1ProjectsProjectIdRequestsGetParametersStatus"},"index$":10}]},"GET /v1/projects/{project_id}/requests/{request_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"request_id","in":"path","description":"The unique identifier of the request","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let project_request_ref01_data = Object.values(setup.data.existing.project_request)[0] as any

    // LOAD
    const project_request_ref01_ent = client.ProjectRequest()
    const project_request_ref01_match_dt0: any = {}
    project_request_ref01_match_dt0.id = project_request_ref01_data.id
    project_request_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const project_request_ref01_data_dt0 = (await project_request_ref01_ent.load(project_request_ref01_match_dt0)).data()
    assert(project_request_ref01_data_dt0.id === project_request_ref01_data.id)


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
      '../../../../.sdk/test/entity/project_request/ProjectRequestTestData.json')

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
    ['project_request01','project_request02','project_request03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_PROJECT_REQUEST_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_PROJECT_REQUEST_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_PROJECT_REQUEST_ENTID']
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
  
