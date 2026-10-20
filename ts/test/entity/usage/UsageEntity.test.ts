

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


describe('UsageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.Usage()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Usage().load({"project_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'usage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"end":{"a":true,"fo":"date","h":"End","n":"end","r":false,"t":"`$STRING`","key$":"end","index$":0},"resolution":{"a":true,"h":"Resolution","n":"resolution","r":false,"t":"`$OBJECT`","key$":"resolution","index$":1},"start":{"a":true,"fo":"date","h":"Start","n":"start","r":false,"t":"`$STRING`","key$":"start","index$":2}},"name":"usage","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/projects/{project_id}/usage","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"accessor","or":"accessor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"alternative","or":"alternatives","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"callback_method","or":"callback_method","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"channel","or":"channels","r":false,"t":"`$BOOLEAN`","index$":4},{"a":true,"k":"query","n":"custom_intent","or":"custom_intent","r":false,"t":"`$BOOLEAN`","index$":5},{"a":true,"k":"query","n":"custom_intent_mode","or":"custom_intent_mode","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"k":"query","n":"custom_topic","or":"custom_topic","r":false,"t":"`$BOOLEAN`","index$":7},{"a":true,"k":"query","n":"custom_topic_mode","or":"custom_topic_mode","r":false,"t":"`$BOOLEAN`","index$":8},{"a":true,"k":"query","n":"deployment","or":"deployment","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"detect_entity","or":"detect_entities","r":false,"t":"`$BOOLEAN`","index$":10},{"a":true,"k":"query","n":"detect_language","or":"detect_language","r":false,"t":"`$BOOLEAN`","index$":11},{"a":true,"k":"query","n":"diarize","or":"diarize","r":false,"t":"`$BOOLEAN`","index$":12},{"a":true,"k":"query","n":"dictation","or":"dictation","r":false,"t":"`$BOOLEAN`","index$":13},{"a":true,"k":"query","n":"encoding","or":"encoding","r":false,"t":"`$BOOLEAN`","index$":14},{"a":true,"k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"endpoint","or":"endpoint","r":false,"t":"`$STRING`","index$":16},{"a":true,"k":"query","n":"extra","or":"extra","r":false,"t":"`$BOOLEAN`","index$":17},{"a":true,"k":"query","n":"filler_word","or":"filler_words","r":false,"t":"`$BOOLEAN`","index$":18},{"a":true,"k":"query","n":"intent","or":"intents","r":false,"t":"`$BOOLEAN`","index$":19},{"a":true,"k":"query","n":"keyterm","or":"keyterm","r":false,"t":"`$BOOLEAN`","index$":20},{"a":true,"k":"query","n":"keyword","or":"keywords","r":false,"t":"`$BOOLEAN`","index$":21},{"a":true,"k":"query","n":"language","or":"language","r":false,"t":"`$BOOLEAN`","index$":22},{"a":true,"k":"query","n":"measurement","or":"measurements","r":false,"t":"`$BOOLEAN`","index$":23},{"a":true,"k":"query","n":"method","or":"method","r":false,"t":"`$STRING`","index$":24},{"a":true,"k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":25},{"a":true,"k":"query","n":"multichannel","or":"multichannel","r":false,"t":"`$BOOLEAN`","index$":26},{"a":true,"k":"query","n":"numeral","or":"numerals","r":false,"t":"`$BOOLEAN`","index$":27},{"a":true,"k":"query","n":"paragraph","or":"paragraphs","r":false,"t":"`$BOOLEAN`","index$":28},{"a":true,"k":"query","n":"profanity_filter","or":"profanity_filter","r":false,"t":"`$BOOLEAN`","index$":29},{"a":true,"k":"query","n":"punctuate","or":"punctuate","r":false,"t":"`$BOOLEAN`","index$":30},{"a":true,"k":"query","n":"redact","or":"redact","r":false,"t":"`$BOOLEAN`","index$":31},{"a":true,"k":"query","n":"replace","or":"replace","r":false,"t":"`$BOOLEAN`","index$":32},{"a":true,"k":"query","n":"sample_rate","or":"sample_rate","r":false,"t":"`$BOOLEAN`","index$":33},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$BOOLEAN`","index$":34},{"a":true,"k":"query","n":"sentiment","or":"sentiment","r":false,"t":"`$BOOLEAN`","index$":35},{"a":true,"k":"query","n":"smart_format","or":"smart_format","r":false,"t":"`$BOOLEAN`","index$":36},{"a":true,"k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":37},{"a":true,"k":"query","n":"summarize","or":"summarize","r":false,"t":"`$BOOLEAN`","index$":38},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$STRING`","index$":39},{"a":true,"k":"query","n":"topic","or":"topics","r":false,"t":"`$BOOLEAN`","index$":40},{"a":true,"k":"query","n":"utt_split","or":"utt_split","r":false,"t":"`$BOOLEAN`","index$":41},{"a":true,"k":"query","n":"utterance","or":"utterances","r":false,"t":"`$BOOLEAN`","index$":42},{"a":true,"k":"query","n":"version","or":"version","r":false,"t":"`$BOOLEAN`","index$":43}]},"k":"http","m":"GET","o":"/v1/projects/{project_id}/usage","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"usage"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"usage","name__orig":"usage","Name":"Usage","name_":"usage","name-":"usage","NAME":"USAGE","index$":32}, {"active":true,"entity":"usage","key$":"BasicUsageFlow","kind":"basic","name":"BasicUsageFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"usage_ref01","srcdatavar":"usage_ref01_data","suffix":"_dt0"},"m":{"id":"usage01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-usage_ref01"}}],"unreachable":true}]}, 'Usage', {"GET /v1/projects/{project_id}/usage":{"protocol":"http","parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0},{"name":"start","in":"query","description":"Start date of the requested date range. Format accepted is YYYY-MM-DD","required":false,"schema":{"type":"string","format":"date"},"index$":1},{"name":"end","in":"query","description":"End date of the requested date range. Format accepted is YYYY-MM-DD","required":false,"schema":{"type":"string","format":"date"},"index$":2},{"name":"accessor","in":"query","description":"Filter for requests where a specific accessor was used","required":false,"schema":{"type":"string"},"index$":3},{"name":"alternatives","in":"query","description":"Filter for requests where alternatives were used","required":false,"schema":{"type":"boolean"},"index$":4},{"name":"callback_method","in":"query","description":"Filter for requests where callback method was used","required":false,"schema":{"type":"boolean"},"index$":5},{"name":"callback","in":"query","description":"Filter for requests where callback was used","required":false,"schema":{"type":"boolean"},"index$":6},{"name":"channels","in":"query","description":"Filter for requests where channels were used","required":false,"schema":{"type":"boolean"},"index$":7},{"name":"custom_intent_mode","in":"query","description":"Filter for requests where custom intent mode was used","required":false,"schema":{"type":"boolean"},"index$":8},{"name":"custom_intent","in":"query","description":"Filter for requests where custom intent was used","required":false,"schema":{"type":"boolean"},"index$":9},{"name":"custom_topic_mode","in":"query","description":"Filter for requests where custom topic mode was used","required":false,"schema":{"type":"boolean"},"index$":10},{"name":"custom_topic","in":"query","description":"Filter for requests where custom topic was used","required":false,"schema":{"type":"boolean"},"index$":11},{"name":"deployment","in":"query","description":"Filter for requests where a specific deployment was used","required":false,"schema":{"type":"string","enum":["hosted","beta","self-hosted"],"description":"Deployment type for the requests","title":"V1ProjectsProjectIdUsageGetParametersDeployment","x-ref":"#/components/schemas/V1ProjectsProjectIdUsageGetParametersDeployment"},"index$":12},{"name":"detect_entities","in":"query","description":"Filter for requests where detect entities was used","required":false,"schema":{"type":"boolean"},"index$":13},{"name":"detect_language","in":"query","description":"Filter for requests where detect language was used","required":false,"schema":{"type":"boolean"},"index$":14},{"name":"diarize","in":"query","description":"Filter for requests where diarize was used","required":false,"schema":{"type":"boolean"},"index$":15},{"name":"dictation","in":"query","description":"Filter for requests where dictation was used","required":false,"schema":{"type":"boolean"},"index$":16},{"name":"encoding","in":"query","description":"Filter for requests where encoding was used","required":false,"schema":{"type":"boolean"},"index$":17},{"name":"endpoint","in":"query","description":"Filter for requests where a specific endpoint was used","required":false,"schema":{"type":"string","enum":["listen","read","speak","agent"],"title":"V1ProjectsProjectIdUsageGetParametersEndpoint","x-ref":"#/components/schemas/V1ProjectsProjectIdUsageGetParametersEndpoint"},"index$":18},{"name":"extra","in":"query","description":"Filter for requests where extra was used","required":false,"schema":{"type":"boolean"},"index$":19},{"name":"filler_words","in":"query","description":"Filter for requests where filler words was used","required":false,"schema":{"type":"boolean"},"index$":20},{"name":"intents","in":"query","description":"Filter for requests where intents was used","required":false,"schema":{"type":"boolean"},"index$":21},{"name":"keyterm","in":"query","description":"Filter for requests where keyterm was used","required":false,"schema":{"type":"boolean"},"index$":22},{"name":"keywords","in":"query","description":"Filter for requests where keywords was used","required":false,"schema":{"type":"boolean"},"index$":23},{"name":"language","in":"query","description":"Filter for requests where language was used","required":false,"schema":{"type":"boolean"},"index$":24},{"name":"measurements","in":"query","description":"Filter for requests where measurements were used","required":false,"schema":{"type":"boolean"},"index$":25},{"name":"method","in":"query","description":"Filter for requests where a specific method was used","required":false,"schema":{"type":"string","enum":["sync","async","streaming"],"description":"Method type for the request","title":"V1ProjectsProjectIdUsageGetParametersMethod","x-ref":"#/components/schemas/V1ProjectsProjectIdUsageGetParametersMethod"},"index$":26},{"name":"model","in":"query","description":"Filter for requests where a specific model uuid was used","required":false,"schema":{"type":"string"},"index$":27},{"name":"multichannel","in":"query","description":"Filter for requests where multichannel was used","required":false,"schema":{"type":"boolean"},"index$":28},{"name":"numerals","in":"query","description":"Filter for requests where numerals were used","required":false,"schema":{"type":"boolean"},"index$":29},{"name":"paragraphs","in":"query","description":"Filter for requests where paragraphs were used","required":false,"schema":{"type":"boolean"},"index$":30},{"name":"profanity_filter","in":"query","description":"Filter for requests where profanity filter was used","required":false,"schema":{"type":"boolean"},"index$":31},{"name":"punctuate","in":"query","description":"Filter for requests where punctuate was used","required":false,"schema":{"type":"boolean"},"index$":32},{"name":"redact","in":"query","description":"Filter for requests where redact was used","required":false,"schema":{"type":"boolean"},"index$":33},{"name":"replace","in":"query","description":"Filter for requests where replace was used","required":false,"schema":{"type":"boolean"},"index$":34},{"name":"sample_rate","in":"query","description":"Filter for requests where sample rate was used","required":false,"schema":{"type":"boolean"},"index$":35},{"name":"search","in":"query","description":"Filter for requests where search was used","required":false,"schema":{"type":"boolean"},"index$":36},{"name":"sentiment","in":"query","description":"Filter for requests where sentiment was used","required":false,"schema":{"type":"boolean"},"index$":37},{"name":"smart_format","in":"query","description":"Filter for requests where smart format was used","required":false,"schema":{"type":"boolean"},"index$":38},{"name":"summarize","in":"query","description":"Filter for requests where summarize was used","required":false,"schema":{"type":"boolean"},"index$":39},{"name":"tag","in":"query","description":"Filter for requests where a specific tag was used","required":false,"schema":{"type":"string"},"index$":40},{"name":"topics","in":"query","description":"Filter for requests where topics was used","required":false,"schema":{"type":"boolean"},"index$":41},{"name":"utt_split","in":"query","description":"Filter for requests where utt split was used","required":false,"schema":{"type":"boolean"},"index$":42},{"name":"utterances","in":"query","description":"Filter for requests where utterances was used","required":false,"schema":{"type":"boolean"},"index$":43},{"name":"version","in":"query","description":"Filter for requests where version was used","required":false,"schema":{"type":"boolean"},"index$":44}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let usage_ref01_data = Object.values(setup.data.existing.usage)[0] as any

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
      '../../../../.sdk/test/entity/usage/UsageTestData.json')

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
    ['usage01','usage02','usage03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_USAGE_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_USAGE_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_USAGE_ENTID']
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
  
