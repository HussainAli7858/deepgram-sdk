

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


describe('ListProjectDistributionCredentialsV1ResponseDistributionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.ListProjectDistributionCredentialsV1ResponseDistribution()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ListProjectDistributionCredentialsV1ResponseDistribution().list({"project_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'list_project_distribution_credentials_v1_response_distribution.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"distribution_credentials":{"a":true,"h":"Distribution Credentials","n":"distribution_credentials","r":true,"t":"`$OBJECT`","key$":"distribution_credentials","index$":0},"member":{"a":true,"h":"Member","n":"member","r":true,"t":"`$OBJECT`","key$":"member","index$":1}},"name":"list_project_distribution_credentials_v1_response_distribution","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/self-hosted/distribution/credentials","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/self-hosted/distribution/credentials","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"self-hosted"},{"lit":"distribution"},{"lit":"credentials"}],"t":{"req":"`reqdata`","res":"`body.distribution_credentials`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"list_project_distribution_credentials_v1_response_distribution","name__orig":"list_project_distribution_credentials_v1_response_distribution","Name":"ListProjectDistributionCredentialsV1ResponseDistribution","name_":"list_project_distribution_credentials_v1_response_distribution","name-":"list-project-distribution-credentials-v1-response-distribution","NAME":"LIST_PROJECT_DISTRIBUTION_CREDENTIALS_V1_RESPONSE_DISTRIBUTION","index$":12}, {"active":true,"entity":"list_project_distribution_credentials_v1_response_distribution","key$":"BasicListProjectDistributionCredentialsV1ResponseDistributionFlow","kind":"basic","name":"BasicListProjectDistributionCredentialsV1ResponseDistributionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"list_project_distribution_credentials_v1_response_distribution_ref01"}}],"index$":0}]}, 'ListProjectDistributionCredentialsV1ResponseDistribution', {"GET /v1/projects/{project_id}/self-hosted/distribution/credentials":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let list_project_distribution_credentials_v1_response_distribution_ref01_data = Object.values(setup.data.existing.list_project_distribution_credentials_v1_response_distribution)[0] as any

    // LIST
    const list_project_distribution_credentials_v1_response_distribution_ref01_ent = client.ListProjectDistributionCredentialsV1ResponseDistribution()
    const list_project_distribution_credentials_v1_response_distribution_ref01_match: any = {}
    list_project_distribution_credentials_v1_response_distribution_ref01_match['project_id'] = setup.idmap['project01']

    const list_project_distribution_credentials_v1_response_distribution_ref01_list = (await list_project_distribution_credentials_v1_response_distribution_ref01_ent.list(list_project_distribution_credentials_v1_response_distribution_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/list_project_distribution_credentials_v1_response_distribution/ListProjectDistributionCredentialsV1ResponseDistributionTestData.json')

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
    ['list_project_distribution_credentials_v1_response_distribution01','list_project_distribution_credentials_v1_response_distribution02','list_project_distribution_credentials_v1_response_distribution03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_LIST_PROJECT_DISTRIBUTION_CREDENTIALS_V1_RESPONSE_DISTRIBUTION_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_LIST_PROJECT_DISTRIBUTION_CREDENTIALS_V1_RESPONSE_DISTRIBUTION_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_LIST_PROJECT_DISTRIBUTION_CREDENTIALS_V1_RESPONSE_DISTRIBUTION_ENTID']
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
  
