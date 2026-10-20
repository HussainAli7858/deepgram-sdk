

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


describe('ReadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.Read()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Read().create({"callback":1,"metadata":"x","results":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'read.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"t":"`$OBJECT`","key$":"metadata","index$":0},"results":{"a":true,"h":"Results","n":"results","r":true,"t":"`$OBJECT`","key$":"results","index$":1}},"name":"read","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["text","url"],"co":{"id":"POST /v1/read","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"POST","k":"query","n":"callback_method","or":"callback_method","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"custom_intent","or":"custom_intent","r":false,"t":"`$ANY`","index$":2},{"a":true,"ex":"extended","k":"query","n":"custom_intent_mode","or":"custom_intent_mode","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"custom_topic","or":"custom_topic","r":false,"t":"`$ANY`","index$":4},{"a":true,"ex":"extended","k":"query","n":"custom_topic_mode","or":"custom_topic_mode","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":false,"k":"query","n":"intent","or":"intents","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"ex":"en","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":false,"k":"query","n":"sentiment","or":"sentiment","r":false,"t":"`$BOOLEAN`","index$":8},{"a":true,"k":"query","n":"summarize","or":"summarize","r":false,"t":"`$ANY`","index$":9},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":10},{"a":true,"ex":false,"k":"query","n":"topic","or":"topics","r":false,"t":"`$BOOLEAN`","index$":11}]},"k":"http","m":"POST","o":"/v1/read","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"read"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"read","name__orig":"read","Name":"Read","name_":"read","name-":"read","NAME":"READ","index$":28}, {"active":true,"entity":"read","key$":"BasicReadFlow","kind":"basic","name":"BasicReadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"read_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Read', {"POST /v1/read":{"protocol":"http","requestBody":{"description":"Analyze a text file","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"A URL pointing to the text source"}},"required":["url"],"title":"ReadV1RequestUrl","x-ref":"#/components/schemas/ReadV1RequestUrl"},{"type":"object","properties":{"text":{"type":"string","description":"The plain text to analyze"}},"required":["text"],"title":"ReadV1RequestText","x-ref":"#/components/schemas/ReadV1RequestText"}],"title":"ReadV1Request","x-ref":"#/components/schemas/ReadV1Request","index$":1}}}},"parameters":[{"name":"callback","in":"query","description":"URL to which we'll make the callback request","required":false,"schema":{"type":"string"},"index$":0},{"name":"callback_method","in":"query","description":"HTTP method by which the callback request will be made","required":false,"schema":{"type":"string","enum":["POST","PUT"],"default":"POST","title":"V1ReadPostParametersCallbackMethod","x-ref":"#/components/schemas/V1ReadPostParametersCallbackMethod"},"index$":1},{"name":"sentiment","in":"query","description":"Recognizes the sentiment throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":2},{"name":"summarize","in":"query","description":"Summarize content. For Listen API, supports string version option. For Read API, accepts boolean only.","required":false,"schema":{"oneOf":[{"type":"string","enum":["v2"],"title":"V1ReadPostParametersSummarize0","x-ref":"#/components/schemas/V1ReadPostParametersSummarize0"},{"type":"boolean","default":false}],"title":"V1ReadPostParametersSummarize","x-ref":"#/components/schemas/V1ReadPostParametersSummarize"},"index$":3},{"name":"tag","in":"query","description":"Label your requests for the purpose of identification during usage reporting","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ReadPostParametersTag","x-ref":"#/components/schemas/V1ReadPostParametersTag"},"index$":4},{"name":"topics","in":"query","description":"Detect topics throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":5},{"name":"custom_topic","in":"query","description":"Custom topics you want the model to detect within your input audio or text if present Submit up to `100`.","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ReadPostParametersCustomTopic","x-ref":"#/components/schemas/V1ReadPostParametersCustomTopic"},"index$":6},{"name":"custom_topic_mode","in":"query","description":"Sets how the model will interpret strings submitted to the `custom_topic` param. When `strict`, the model will only return topics submitted using the `custom_topic` param. When `extended`, the model will return its own detected topics in addition to those submitted using the `custom_topic` param","required":false,"schema":{"type":"string","enum":["extended","strict"],"default":"extended","title":"V1ReadPostParametersCustomTopicMode","x-ref":"#/components/schemas/V1ReadPostParametersCustomTopicMode"},"index$":7},{"name":"intents","in":"query","description":"Recognizes speaker intent throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":8},{"name":"custom_intent","in":"query","description":"Custom intents you want the model to detect within your input audio if present","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ReadPostParametersCustomIntent","x-ref":"#/components/schemas/V1ReadPostParametersCustomIntent"},"index$":9},{"name":"custom_intent_mode","in":"query","description":"Sets how the model will interpret intents submitted to the `custom_intent` param. When `strict`, the model will only return intents submitted using the `custom_intent` param. When `extended`, the model will return its own detected intents in the `custom_intent` param.","required":false,"schema":{"type":"string","enum":["extended","strict"],"default":"extended","title":"V1ReadPostParametersCustomIntentMode","x-ref":"#/components/schemas/V1ReadPostParametersCustomIntentMode"},"index$":10},{"name":"language","in":"query","description":"The [BCP-47 language tag](https://tools.ietf.org/html/bcp47) that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available","required":false,"schema":{"type":"string","default":"en"},"index$":11}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const read_ref01_ent = client.Read()
    let read_ref01_data = setup.data.new.read['read_ref01']

    read_ref01_data = (await read_ref01_ent.create(read_ref01_data)).data()
    assert(null != read_ref01_data)


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
      '../../../../.sdk/test/entity/read/ReadTestData.json')

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
    ['read01','read02','read03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_READ_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_READ_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_READ_ENTID']
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
  
