

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


describe('ListenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.Listen()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Listen().create({"callback":1,"url":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'listen.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":0}},"name":"listen","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["url"],"co":{"id":"POST /v1/listen","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"POST","k":"query","n":"callback_method","or":"callback_method","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"custom_intent","or":"custom_intent","r":false,"t":"`$ANY`","index$":2},{"a":true,"ex":"extended","k":"query","n":"custom_intent_mode","or":"custom_intent_mode","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"custom_topic","or":"custom_topic","r":false,"t":"`$ANY`","index$":4},{"a":true,"ex":"extended","k":"query","n":"custom_topic_mode","or":"custom_topic_mode","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":false,"k":"query","n":"detect_entity","or":"detect_entities","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"k":"query","n":"detect_language","or":"detect_language","r":false,"t":"`$ANY`","index$":7},{"a":true,"ex":false,"k":"query","n":"diarize","or":"diarize","r":false,"t":"`$BOOLEAN`","index$":8},{"a":true,"k":"query","n":"diarize_model","or":"diarize_model","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":false,"k":"query","n":"dictation","or":"dictation","r":false,"t":"`$BOOLEAN`","index$":10},{"a":true,"k":"query","n":"encoding","or":"encoding","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"extra","or":"extra","r":false,"t":"`$ANY`","index$":12},{"a":true,"ex":false,"k":"query","n":"filler_word","or":"filler_words","r":false,"t":"`$BOOLEAN`","index$":13},{"a":true,"ex":false,"k":"query","n":"intent","or":"intents","r":false,"t":"`$BOOLEAN`","index$":14},{"a":true,"k":"query","n":"keyterm","or":"keyterm","r":false,"t":"`$ARRAY`","index$":15},{"a":true,"k":"query","n":"keyword","or":"keywords","r":false,"t":"`$ANY`","index$":16},{"a":true,"ex":"en","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":17},{"a":true,"ex":false,"k":"query","n":"measurement","or":"measurements","r":false,"t":"`$BOOLEAN`","index$":18},{"a":true,"ex":false,"k":"query","n":"mip_opt_out","or":"mip_opt_out","r":false,"t":"`$BOOLEAN`","index$":19},{"a":true,"ex":"base-general","k":"query","n":"model","or":"model","r":false,"t":"`$ANY`","index$":20},{"a":true,"ex":false,"k":"query","n":"multichannel","or":"multichannel","r":false,"t":"`$BOOLEAN`","index$":21},{"a":true,"ex":false,"k":"query","n":"numeral","or":"numerals","r":false,"t":"`$BOOLEAN`","index$":22},{"a":true,"ex":false,"k":"query","n":"paragraph","or":"paragraphs","r":false,"t":"`$BOOLEAN`","index$":23},{"a":true,"ex":false,"k":"query","n":"profanity_filter","or":"profanity_filter","r":false,"t":"`$BOOLEAN`","index$":24},{"a":true,"ex":false,"k":"query","n":"punctuate","or":"punctuate","r":false,"t":"`$BOOLEAN`","index$":25},{"a":true,"ex":false,"k":"query","n":"redact","or":"redact","r":false,"t":"`$ANY`","index$":26},{"a":true,"k":"query","n":"replace","or":"replace","r":false,"t":"`$ANY`","index$":27},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$ANY`","index$":28},{"a":true,"ex":false,"k":"query","n":"sentiment","or":"sentiment","r":false,"t":"`$BOOLEAN`","index$":29},{"a":true,"ex":false,"k":"query","n":"smart_format","or":"smart_format","r":false,"t":"`$BOOLEAN`","index$":30},{"a":true,"k":"query","n":"summarize","or":"summarize","r":false,"t":"`$ANY`","index$":31},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":32},{"a":true,"ex":false,"k":"query","n":"topic","or":"topics","r":false,"t":"`$BOOLEAN`","index$":33},{"a":true,"ex":0.8,"k":"query","n":"utt_split","or":"utt_split","r":false,"t":"`$NUMBER`","index$":34},{"a":true,"ex":false,"k":"query","n":"utterance","or":"utterances","r":false,"t":"`$BOOLEAN`","index$":35},{"a":true,"ex":"latest","k":"query","n":"version","or":"version","r":false,"t":"`$ANY`","index$":36}]},"k":"http","m":"POST","o":"/v1/listen","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"listen"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"listen","name__orig":"listen","Name":"Listen","name_":"listen","name-":"listen","NAME":"LISTEN","index$":18}, {"active":true,"entity":"listen","key$":"BasicListenFlow","kind":"basic","name":"BasicListenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"listen_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Listen', {"POST /v1/listen":{"protocol":"http","requestBody":{"description":"Transcribe an audio or video file","content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","format":"uri","key$":"url"}},"required":["url"],"description":"Audio file URL to transcribe","title":"ListenV1RequestUrl","x-ref":"#/components/schemas/ListenV1RequestUrl","index$":1}}}},"parameters":[{"name":"callback","in":"query","description":"URL to which we'll make the callback request","required":false,"schema":{"type":"string"},"index$":0},{"name":"callback_method","in":"query","description":"HTTP method by which the callback request will be made","required":false,"schema":{"type":"string","enum":["POST","PUT"],"default":"POST","title":"V1ListenPostParametersCallbackMethod","x-ref":"#/components/schemas/V1ListenPostParametersCallbackMethod"},"index$":1},{"name":"extra","in":"query","description":"Arbitrary key-value pairs that are attached to the API response for usage in downstream processing","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersExtra","x-ref":"#/components/schemas/V1ListenPostParametersExtra"},"index$":2},{"name":"sentiment","in":"query","description":"Recognizes the sentiment throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":3},{"name":"summarize","in":"query","description":"Summarize content. For Listen API, supports string version option. For Read API, accepts boolean only.","required":false,"schema":{"oneOf":[{"type":"string","enum":["v2"],"title":"V1ListenPostParametersSummarize0","x-ref":"#/components/schemas/V1ListenPostParametersSummarize0"},{"type":"boolean","default":false}],"title":"V1ListenPostParametersSummarize","x-ref":"#/components/schemas/V1ListenPostParametersSummarize"},"index$":4},{"name":"tag","in":"query","description":"Label your requests for the purpose of identification during usage reporting","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersTag","x-ref":"#/components/schemas/V1ListenPostParametersTag"},"index$":5},{"name":"topics","in":"query","description":"Detect topics throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":6},{"name":"custom_topic","in":"query","description":"Custom topics you want the model to detect within your input audio or text if present Submit up to `100`.","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersCustomTopic","x-ref":"#/components/schemas/V1ListenPostParametersCustomTopic"},"index$":7},{"name":"custom_topic_mode","in":"query","description":"Sets how the model will interpret strings submitted to the `custom_topic` param. When `strict`, the model will only return topics submitted using the `custom_topic` param. When `extended`, the model will return its own detected topics in addition to those submitted using the `custom_topic` param","required":false,"schema":{"type":"string","enum":["extended","strict"],"default":"extended","title":"V1ListenPostParametersCustomTopicMode","x-ref":"#/components/schemas/V1ListenPostParametersCustomTopicMode"},"index$":8},{"name":"intents","in":"query","description":"Recognizes speaker intent throughout a transcript or text","required":false,"schema":{"type":"boolean","default":false},"index$":9},{"name":"custom_intent","in":"query","description":"Custom intents you want the model to detect within your input audio if present","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersCustomIntent","x-ref":"#/components/schemas/V1ListenPostParametersCustomIntent"},"index$":10},{"name":"custom_intent_mode","in":"query","description":"Sets how the model will interpret intents submitted to the `custom_intent` param. When `strict`, the model will only return intents submitted using the `custom_intent` param. When `extended`, the model will return its own detected intents in the `custom_intent` param.","required":false,"schema":{"type":"string","enum":["extended","strict"],"default":"extended","title":"V1ListenPostParametersCustomIntentMode","x-ref":"#/components/schemas/V1ListenPostParametersCustomIntentMode"},"index$":11},{"name":"detect_entities","in":"query","description":"Identifies and extracts key entities from content in submitted audio","required":false,"schema":{"type":"boolean","default":false},"index$":12},{"name":"detect_language","in":"query","description":"Identifies the dominant language spoken in submitted audio","required":false,"schema":{"oneOf":[{"type":"boolean","default":false},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersDetectLanguage","x-ref":"#/components/schemas/V1ListenPostParametersDetectLanguage"},"index$":13},{"name":"diarize","in":"query","description":"Deprecated: use `diarize_model` instead. Recognize speaker changes. Each word in the transcript will be assigned a speaker number starting at 0.","required":false,"schema":{"type":"boolean","default":false},"deprecated":true,"index$":14},{"name":"diarize_model","in":"query","description":"Select and enable a specific diarization model version. Specifying this parameter enables diarization and selects the model — you do not need to also set the deprecated `diarize=true` parameter. For batch, supported values are `latest` (currently v2), `v1`, and `v2`. For streaming, supported values are `latest` (currently v1) and `v1`; `v2` returns a validation error on streaming requests.","required":false,"schema":{"type":"string","enum":["latest","v1","v2"],"title":"V1ListenPostParametersDiarizeModel","x-ref":"#/components/schemas/V1ListenPostParametersDiarizeModel"},"index$":15},{"name":"dictation","in":"query","description":"Dictation mode for controlling formatting with dictated speech","required":false,"schema":{"type":"boolean","default":false},"index$":16},{"name":"encoding","in":"query","description":"Specify the expected encoding of your submitted audio","required":false,"schema":{"type":"string","enum":["linear16","flac","mulaw","amr-nb","amr-wb","opus","speex","g729"],"title":"V1ListenPostParametersEncoding","x-ref":"#/components/schemas/V1ListenPostParametersEncoding"},"index$":17},{"name":"filler_words","in":"query","description":"Filler Words can help transcribe interruptions in your audio, like \"uh\" and \"um\"","required":false,"schema":{"type":"boolean","default":false},"index$":18},{"name":"keyterm","in":"query","description":"Key term prompting improves recognition of specialized terminology and brands. Only compatible with Nova-3.\n\n`keyterm` accepts plain terms only. Unlike the legacy `keywords` feature, it does not support weights or intensifiers. Appending one (for example, `keyterm=term:0.15`) is not rejected—the weight is silently ignored and the entire value is treated as a literal keyterm.\n\nTo boost multiple separate keyterms, repeat the `keyterm` parameter (for example, `keyterm=term1&keyterm=term2`). To boost one multi-word phrase as a single keyterm, join the words with `%20` or `+` (for example, `keyterm=customer%20service`). Do not separate keyterms with commas, semicolons, or line breaks.\n","required":false,"schema":{"type":"array","items":{"type":"string"}},"index$":19},{"name":"keywords","in":"query","description":"Keywords can boost or suppress specialized terminology and brands. `keywords` is not supported with Nova-3 models; use `keyterm` instead.","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersKeywords","x-ref":"#/components/schemas/V1ListenPostParametersKeywords"},"index$":20},{"name":"language","in":"query","description":"The [BCP-47 language tag](https://tools.ietf.org/html/bcp47) that hints at the primary spoken language. Depending on the Model and API endpoint you choose only certain languages are available","required":false,"schema":{"type":"string","default":"en"},"index$":21},{"name":"measurements","in":"query","description":"Spoken measurements will be converted to their corresponding abbreviations","required":false,"schema":{"type":"boolean","default":false},"index$":22},{"name":"model","in":"query","description":"AI model used to process submitted audio","required":false,"schema":{"oneOf":[{"type":"string","enum":["nova-3","nova-3-general","nova-3-medical","nova-2","nova-2-general","nova-2-meeting","nova-2-finance","nova-2-conversationalai","nova-2-voicemail","nova-2-video","nova-2-medical","nova-2-drivethru","nova-2-automotive","nova","nova-general","nova-phonecall","nova-medical","enhanced","enhanced-general","enhanced-meeting","enhanced-phonecall","enhanced-finance","base","meeting","phonecall","finance","conversationalai","voicemail","video"],"description":"Our public models available to all accounts","title":"V1ListenPostParametersModel0","x-ref":"#/components/schemas/V1ListenPostParametersModel0"},{"type":"string"}],"title":"V1ListenPostParametersModel","default":"base-general","x-ref":"#/components/schemas/V1ListenPostParametersModel"},"index$":23},{"name":"multichannel","in":"query","description":"Transcribe each audio channel independently","required":false,"schema":{"type":"boolean","default":false},"index$":24},{"name":"numerals","in":"query","description":"Numerals converts numbers from written format to numerical format","required":false,"schema":{"type":"boolean","default":false},"index$":25},{"name":"paragraphs","in":"query","description":"Splits audio into paragraphs to improve transcript readability","required":false,"schema":{"type":"boolean","default":false},"index$":26},{"name":"profanity_filter","in":"query","description":"Profanity Filter looks for recognized profanity and converts it to the nearest recognized non-profane word or removes it from the transcript completely","required":false,"schema":{"type":"boolean","default":false},"index$":27},{"name":"punctuate","in":"query","description":"Add punctuation and capitalization to the transcript","required":false,"schema":{"type":"boolean","default":false},"index$":28},{"name":"redact","in":"query","description":"Redaction removes sensitive information from your transcripts","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string","enum":["pci","pii","numbers"],"title":"V1ListenPostParametersRedactSchemaOneOf1Items","x-ref":"#/components/schemas/V1ListenPostParametersRedactSchemaOneOf1Items"},"title":"V1ListenPostParametersRedact1","x-ref":"#/components/schemas/V1ListenPostParametersRedact1"}],"title":"V1ListenPostParametersRedact","default":false,"x-ref":"#/components/schemas/V1ListenPostParametersRedact"},"index$":29},{"name":"replace","in":"query","description":"Search for terms or phrases in submitted audio and replaces them","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersReplace","x-ref":"#/components/schemas/V1ListenPostParametersReplace"},"index$":30},{"name":"search","in":"query","description":"Search for terms or phrases in submitted audio","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1ListenPostParametersSearch","x-ref":"#/components/schemas/V1ListenPostParametersSearch"},"index$":31},{"name":"smart_format","in":"query","description":"Apply formatting to transcript output. When set to true, additional formatting will be applied to transcripts to improve readability","required":false,"schema":{"type":"boolean","default":false},"index$":32},{"name":"utterances","in":"query","description":"Segments speech into meaningful semantic units","required":false,"schema":{"type":"boolean","default":false},"index$":33},{"name":"utt_split","in":"query","description":"Seconds to wait before detecting a pause between words in submitted audio","required":false,"schema":{"type":"number","format":"double","default":0.8},"index$":34},{"name":"version","in":"query","description":"Version of an AI model to use","required":false,"schema":{"oneOf":[{"type":"string","enum":["latest"],"description":"Use the latest version of a model","title":"V1ListenPostParametersVersion0","x-ref":"#/components/schemas/V1ListenPostParametersVersion0"},{"type":"string"}],"title":"V1ListenPostParametersVersion","default":"latest","x-ref":"#/components/schemas/V1ListenPostParametersVersion"},"index$":35},{"name":"mip_opt_out","in":"query","description":"Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip","required":false,"schema":{"type":"boolean","default":false},"index$":36}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const listen_ref01_ent = client.Listen()
    let listen_ref01_data = setup.data.new.listen['listen_ref01']

    listen_ref01_data = (await listen_ref01_ent.create(listen_ref01_data)).data()
    assert(null != listen_ref01_data)


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
      '../../../../.sdk/test/entity/listen/ListenTestData.json')

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
    ['listen01','listen02','listen03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_LISTEN_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_LISTEN_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_LISTEN_ENTID']
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
  
