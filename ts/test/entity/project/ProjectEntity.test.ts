

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


describe('ProjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.Project()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('project hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of DeepgramSDK.test(offline).Project().stream('list')) { }
    }, /offline/)

    for await (const _item of DeepgramSDK.test(offline).Project()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = DeepgramSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Project().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of DeepgramSDK.test().Project().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new DeepgramSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Project().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Project().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Project().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"mip_opt_out":{"a":true,"h":"Mip Opt Out","n":"mip_opt_out","r":false,"sh":"Model Improvement Program opt-out","t":"`$BOOLEAN`","key$":"mip_opt_out","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the project","t":"`$STRING`","key$":"name","index$":2},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"The unique identifier of the project","t":"`$STRING`","key$":"project_id","index$":3}},"id":{"field":"id","name":"id"},"name":"project","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/projects","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/projects","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"}],"t":{"req":"`reqdata`","res":"`body.projects`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$NUMBER`","index$":0},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/projects/{project_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/projects/{project_id}","q":{"exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /v1/projects/{project_id}/leave","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/projects/{project_id}/leave","q":{"$action":"leave","exist":["id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"id"},{"lit":"leave"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"project","name__orig":"project","Name":"Project","name_":"project","name-":"project","NAME":"PROJECT","index$":20}, {"active":true,"entity":"project","key$":"BasicProjectFlow","kind":"basic","name":"BasicProjectFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"project_ref01","srcdatavar":"project_ref01_data","suffix":"_dt0"},"m":{"id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_ref01"}}],"index$":1}]}, 'Project', {"GET /v1/projects":{"protocol":"http","parameters":[]},"GET /v1/projects/{project_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Number of results to return per page. Default 10. Range [1,1000]","required":false,"schema":{"type":"number","format":"double","minimum":1,"maximum":1000,"default":10},"index$":1},{"name":"page","in":"query","description":"Navigate and return the results to retrieve specific portions of information of the response","required":false,"schema":{"type":"number","format":"double"},"index$":2}]},"DELETE /v1/projects/{project_id}":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /v1/projects/{project_id}/leave":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let project_ref01_data = Object.values(setup.data.existing.project)[0] as any

    // LIST
    const project_ref01_ent = client.Project()
    const project_ref01_match: any = {}

    const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e: any) => e.data())


    // LOAD
    const project_ref01_match_dt0: any = {}
    project_ref01_match_dt0.id = project_ref01_data.id
    const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data()
    assert(project_ref01_data_dt0.id === project_ref01_data.id)


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
      '../../../../.sdk/test/entity/project/ProjectTestData.json')

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
    ['project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_PROJECT_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_PROJECT_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_PROJECT_ENTID']
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
  
