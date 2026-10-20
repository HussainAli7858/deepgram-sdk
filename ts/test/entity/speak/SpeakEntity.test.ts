

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


describe('SpeakEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.Speak()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Speak().create({"callback":1,"model":"x","request_id":"x","text":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'speak.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"request_id":{"a":true,"fo":"uuid","h":"Request Id","n":"request_id","r":true,"sh":"Unique identifier for tracking the asynchronous request","t":"`$STRING`","key$":"request_id","index$":0},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The text content to be converted to speech.","t":"`$STRING`","key$":"text","index$":1}},"name":"speak","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["text"],"co":{"id":"POST /v2/speak","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":48000,"k":"query","n":"bit_rate","or":"bit_rate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"POST","k":"query","n":"callback_method","or":"callback_method","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"wav","k":"query","n":"container","or":"container","r":false,"t":"`$ANY`","index$":3},{"a":true,"ex":"mp3","k":"query","n":"encoding","or":"encoding","r":false,"t":"`$ANY`","index$":4},{"a":true,"ex":0,"k":"query","n":"expressivity","or":"expressivity","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":false,"k":"query","n":"mip_opt_out","or":"mip_opt_out","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"k":"query","n":"model","or":"model","r":true,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"priority","or":"priority","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":24000,"k":"query","n":"sample_rate","or":"sample_rate","r":false,"t":"`$ANY`","index$":9},{"a":true,"ex":1,"k":"query","n":"speed","or":"speed","r":false,"t":"`$NUMBER`","index$":10},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":11}]},"k":"http","m":"POST","o":"/v2/speak","q":{"exist":["model"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"speak"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["text"],"co":{"id":"POST /v1/speak","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":48000,"k":"query","n":"bit_rate","or":"bit_rate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"POST","k":"query","n":"callback_method","or":"callback_method","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"wav","k":"query","n":"container","or":"container","r":false,"t":"`$ANY`","index$":3},{"a":true,"ex":"mp3","k":"query","n":"encoding","or":"encoding","r":false,"t":"`$ANY`","index$":4},{"a":true,"ex":false,"k":"query","n":"mip_opt_out","or":"mip_opt_out","r":false,"t":"`$BOOLEAN`","index$":5},{"a":true,"ex":"aura-asteria-en","k":"query","n":"model","or":"model","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":24000,"k":"query","n":"sample_rate","or":"sample_rate","r":false,"t":"`$ANY`","index$":7},{"a":true,"ex":1,"k":"query","n":"speed","or":"speed","r":false,"t":"`$NUMBER`","index$":8},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":9}]},"k":"http","m":"POST","o":"/v1/speak","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"speak"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"speak","name__orig":"speak","Name":"Speak","name_":"speak","name-":"speak","NAME":"SPEAK","index$":29}, {"active":true,"entity":"speak","key$":"BasicSpeakFlow","kind":"basic","name":"BasicSpeakFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"speak_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Speak', {"POST /v2/speak":{"protocol":"http","requestBody":{"description":"Transform text to speech","content":{"application/json":{"schema":{"type":"object","properties":{"text":{"type":"string","description":"The text content to be converted to speech. The server normalizes and preprocesses the text before synthesis. May contain inline pause controls (`\\{pause:500ms\\}`, 500-3000 ms in 100 ms steps, at most 8 per request) and inline pronunciation controls (`\\{\"word\": \"...\", \"pronounce\": \"<IPA>\"\\}`, Early Access). Pronunciation cannot be combined with pause or with a `speed` other than `1.0`, and `speed` is capped at `1.15` when a pause is present. See [Speed, Pause, Pronunciation](/docs/tts-voice-controls).","key$":"text"}},"required":["text"],"description":"Request body for Flux TTS batch (REST) text-to-speech conversion. The full block of text is synthesized in a single request and returned as one audio response.","title":"SpeakV2Request","x-ref":"#/components/schemas/SpeakV2Request","index$":1}}}},"parameters":[{"name":"callback","in":"query","description":"URL to which we'll make the callback request","required":false,"schema":{"type":"string"},"index$":0},{"name":"callback_method","in":"query","description":"HTTP method by which the callback request will be made","required":false,"schema":{"type":"string","enum":["POST","PUT"],"default":"POST","title":"V2SpeakPostParametersCallbackMethod","x-ref":"#/components/schemas/V2SpeakPostParametersCallbackMethod"},"index$":1},{"name":"mip_opt_out","in":"query","description":"Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip","required":false,"schema":{"type":"boolean","default":false},"index$":2},{"name":"tag","in":"query","description":"Label your requests for the purpose of identification during usage reporting","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V2SpeakPostParametersTag","x-ref":"#/components/schemas/V2SpeakPostParametersTag"},"index$":3},{"name":"bit_rate","in":"query","description":"The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type.","required":false,"schema":{"oneOf":[{"type":"string","enum":["8000","16000","24000","32000","40000","48000"],"description":"Encoding - mp3(default). Supported bitrates - 8000, 16000, 24000, 32000, 40000, 48000(default) bps.","title":"V2SpeakPostParametersBitRate0","x-ref":"#/components/schemas/V2SpeakPostParametersBitRate0"},{"type":"integer","minimum":4000,"maximum":650000},{"type":"integer","minimum":4000,"maximum":192000}],"title":"V2SpeakPostParametersBitRate","default":48000,"x-ref":"#/components/schemas/V2SpeakPostParametersBitRate"},"index$":4},{"name":"container","in":"query","description":"Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.","required":false,"schema":{"oneOf":[{"type":"string","enum":["none"],"description":"No container.","title":"V2SpeakPostParametersContainer0","x-ref":"#/components/schemas/V2SpeakPostParametersContainer0"},{"type":"string","enum":["wav"],"description":"Encoding - linear16. Supported container - wav (default), or no container.","title":"V2SpeakPostParametersContainer1","x-ref":"#/components/schemas/V2SpeakPostParametersContainer1"},{"type":"string","enum":["wav"],"description":"Encoding - mulaw. Supported container - wav (default), or no container.","title":"V2SpeakPostParametersContainer2","x-ref":"#/components/schemas/V2SpeakPostParametersContainer2"},{"type":"string","enum":["wav"],"description":"Encoding - alaw. Supported container - wav (default), or no container.","title":"V2SpeakPostParametersContainer3","x-ref":"#/components/schemas/V2SpeakPostParametersContainer3"},{"type":"string","enum":["ogg"],"description":"Encoding - opus. Supported container - ogg (default).","title":"V2SpeakPostParametersContainer4","x-ref":"#/components/schemas/V2SpeakPostParametersContainer4"}],"title":"V2SpeakPostParametersContainer","default":"wav","x-ref":"#/components/schemas/V2SpeakPostParametersContainer"},"index$":5},{"name":"encoding","in":"query","description":"Encoding allows you to specify the expected encoding of your audio output","required":false,"schema":{"oneOf":[{"type":"string","enum":["linear16"],"description":"Encoding - linear16. Uncompressed, high-quality audio format often used for telephony or audio processing.","title":"V2SpeakPostParametersEncoding0","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding0"},{"type":"string","enum":["flac"],"description":"Encoding - flac. Lossless audio format for high-quality compression.","title":"V2SpeakPostParametersEncoding1","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding1"},{"type":"string","enum":["mulaw"],"description":"Encoding - mulaw. Compressed audio format commonly used in telephony.","title":"V2SpeakPostParametersEncoding2","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding2"},{"type":"string","enum":["alaw"],"description":"Encoding - alaw. Similar to mulaw but used in international telephony.","title":"V2SpeakPostParametersEncoding3","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding3"},{"type":"string","enum":["mp3"],"description":"Encoding - mp3. Popular compressed audio format for music and streaming.","title":"V2SpeakPostParametersEncoding4","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding4"},{"type":"string","enum":["opus"],"description":"Encoding - opus. High-compression audio format optimized for real-time communications.","title":"V2SpeakPostParametersEncoding5","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding5"},{"type":"string","enum":["aac"],"description":"Encoding - aac. Advanced audio format offering better quality at smaller file sizes than mp3.","title":"V2SpeakPostParametersEncoding6","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding6"}],"title":"V2SpeakPostParametersEncoding","default":"mp3","x-ref":"#/components/schemas/V2SpeakPostParametersEncoding"},"index$":6},{"name":"expressivity","in":"query","description":"Expressive range of the generated speech, on a calm-to-animated axis. Accepted values: `-2`, `-1`, `0`, `1`, `2`. `0` (the default) is the voice's tuned delivery and the production-validated setting, with `-2` the calm end of the range and `2` the animated end. Supported on all Flux voices; applies to the whole request. Beta: behavior may change in future model versions, and non-default values increase the risk of hallucinations and pronunciation errors; audition before shipping. An invalid value is rejected with a `400` — `EXPRESSIVITY_OUT_OF_RANGE` for a value outside the range, `EXPRESSIVITY_INCREMENT_INVALID` for a fractional value. See [Expressivity](/docs/tts-expressivity).","required":false,"schema":{"type":"string","enum":["-2","-1","0","1","2"],"title":"V2SpeakPostParametersExpressivity","default":0,"x-ref":"#/components/schemas/V2SpeakPostParametersExpressivity"},"index$":7},{"name":"model","in":"query","description":"Flux TTS model used to synthesize the submitted text, in the form `flux-{voice}-{language}` (for example, `flux-alexis-en`). Required; unlike the v1 (Aura) endpoint there is no default and only flux models are accepted. English-only at launch.","required":true,"schema":{"type":"string"},"index$":8},{"name":"sample_rate","in":"query","description":"Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable","required":false,"schema":{"oneOf":[{"type":"string","enum":["8000","16000","24000","32000","44100","48000"],"description":"Encoding - linear16. Supported sample rates - 8000, 16000, 24000, 32000, 44100, 48000 Hz.","title":"V2SpeakPostParametersSampleRate0","x-ref":"#/components/schemas/V2SpeakPostParametersSampleRate0"},{"type":"string","enum":["8000","16000"],"description":"Encoding - mulaw. Supported sample rates - 8000, 16000 Hz.","title":"V2SpeakPostParametersSampleRate1","x-ref":"#/components/schemas/V2SpeakPostParametersSampleRate1"},{"type":"string","enum":["8000","16000"],"description":"Encoding - alaw. Supported sample rates - 8000, 16000 Hz.","title":"V2SpeakPostParametersSampleRate2","x-ref":"#/components/schemas/V2SpeakPostParametersSampleRate2"},{"type":"string","enum":["8000","16000","22050","32000","48000"],"description":"Encoding - flac. Supported sample rates - 8000, 16000, 22050, 32000, 48000 Hz.","title":"V2SpeakPostParametersSampleRate3","x-ref":"#/components/schemas/V2SpeakPostParametersSampleRate3"}],"title":"V2SpeakPostParametersSampleRate","default":24000,"x-ref":"#/components/schemas/V2SpeakPostParametersSampleRate"},"index$":9},{"name":"speed","in":"query","description":"Speaking rate multiplier that adjusts the pace of generated speech while preserving natural prosody and voice quality. Accepted values run `0.5` to `1.5` in `0.05` increments. Not yet supported in all languages. When the text contains an inline pause marker, speed is capped at `1.15` (`PAUSE_SPEED_CAP_EXCEEDED` above that). A value other than `1.0` cannot be combined with inline pronunciation controls (`CONTROL_COMBINATION_INVALID`).","required":false,"schema":{"type":"number","format":"double","minimum":0.5,"maximum":1.5,"multipleOf":0.05,"default":1},"index$":10},{"name":"priority","in":"query","description":"Processing priority for asynchronous (callback) requests. The only supported value is low.","required":false,"schema":{"type":"string","enum":["low"],"title":"V2SpeakPostParametersPriority","x-ref":"#/components/schemas/V2SpeakPostParametersPriority"},"index$":11}]},"POST /v1/speak":{"protocol":"http","requestBody":{"description":"Transform text to speech","content":{"application/json":{"schema":{"type":"object","properties":{"text":{"type":"string","description":"The text content to be converted to speech","key$":"text"}},"required":["text"],"description":"Request body for text-to-speech conversion","title":"SpeakV1Request","x-ref":"#/components/schemas/SpeakV1Request","index$":1}}}},"parameters":[{"name":"callback","in":"query","description":"URL to which we'll make the callback request","required":false,"schema":{"type":"string"},"index$":0},{"name":"callback_method","in":"query","description":"HTTP method by which the callback request will be made","required":false,"schema":{"type":"string","enum":["POST","PUT"],"default":"POST","title":"V1SpeakPostParametersCallbackMethod","x-ref":"#/components/schemas/V1SpeakPostParametersCallbackMethod"},"index$":1},{"name":"mip_opt_out","in":"query","description":"Opts out requests from the Deepgram Model Improvement Program. Refer to our Docs for pricing impacts before setting this to true. https://dpgr.am/deepgram-mip","required":false,"schema":{"type":"boolean","default":false},"index$":2},{"name":"tag","in":"query","description":"Label your requests for the purpose of identification during usage reporting","required":false,"schema":{"oneOf":[{"type":"string"},{"type":"array","items":{"type":"string"}}],"title":"V1SpeakPostParametersTag","x-ref":"#/components/schemas/V1SpeakPostParametersTag"},"index$":3},{"name":"bit_rate","in":"query","description":"The bitrate of the audio in bits per second. Choose from predefined ranges or specific values based on the encoding type.","required":false,"schema":{"oneOf":[{"type":"string","enum":["32000","48000"],"description":"Encoding - mp3(default). Supported bitrates - 32000, 48000(default) bps.","title":"V1SpeakPostParametersBitRate0","x-ref":"#/components/schemas/V1SpeakPostParametersBitRate0"},{"type":"number","format":"double","minimum":4000,"maximum":650000},{"type":"number","format":"double","minimum":4000,"maximum":192000}],"title":"V1SpeakPostParametersBitRate","default":48000,"x-ref":"#/components/schemas/V1SpeakPostParametersBitRate"},"index$":4},{"name":"container","in":"query","description":"Container specifies the file format wrapper for the output audio. The available options depend on the encoding type.","required":false,"schema":{"oneOf":[{"type":"string","enum":["none"],"description":"No container.","title":"V1SpeakPostParametersContainer0","x-ref":"#/components/schemas/V1SpeakPostParametersContainer0"},{"type":"string","enum":["wav"],"description":"Encoding - linear16. Supported container - wav (default), or no container.","title":"V1SpeakPostParametersContainer1","x-ref":"#/components/schemas/V1SpeakPostParametersContainer1"},{"type":"string","enum":["wav"],"description":"Encoding - mulaw. Supported container - wav (default), or no container.","title":"V1SpeakPostParametersContainer2","x-ref":"#/components/schemas/V1SpeakPostParametersContainer2"},{"type":"string","enum":["wav"],"description":"Encoding - alaw. Supported container - wav (default), or no container.","title":"V1SpeakPostParametersContainer3","x-ref":"#/components/schemas/V1SpeakPostParametersContainer3"},{"type":"string","enum":["ogg"],"description":"Encoding - opus. Supported container - ogg (default).","title":"V1SpeakPostParametersContainer4","x-ref":"#/components/schemas/V1SpeakPostParametersContainer4"}],"title":"V1SpeakPostParametersContainer","default":"wav","x-ref":"#/components/schemas/V1SpeakPostParametersContainer"},"index$":5},{"name":"encoding","in":"query","description":"Encoding allows you to specify the expected encoding of your audio output","required":false,"schema":{"oneOf":[{"type":"string","enum":["linear16"],"description":"Encoding - linear16. Uncompressed, high-quality audio format often used for telephony or audio processing.","title":"V1SpeakPostParametersEncoding0","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding0"},{"type":"string","enum":["flac"],"description":"Encoding - flac. Lossless audio format for high-quality compression.","title":"V1SpeakPostParametersEncoding1","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding1"},{"type":"string","enum":["mulaw"],"description":"Encoding - mulaw. Compressed audio format commonly used in telephony.","title":"V1SpeakPostParametersEncoding2","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding2"},{"type":"string","enum":["alaw"],"description":"Encoding - alaw. Similar to mulaw but used in international telephony.","title":"V1SpeakPostParametersEncoding3","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding3"},{"type":"string","enum":["mp3"],"description":"Encoding - mp3. Popular compressed audio format for music and streaming.","title":"V1SpeakPostParametersEncoding4","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding4"},{"type":"string","enum":["opus"],"description":"Encoding - opus. High-compression audio format optimized for real-time communications.","title":"V1SpeakPostParametersEncoding5","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding5"},{"type":"string","enum":["aac"],"description":"Encoding - aac. Advanced audio format offering better quality at smaller file sizes than mp3.","title":"V1SpeakPostParametersEncoding6","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding6"}],"title":"V1SpeakPostParametersEncoding","default":"mp3","x-ref":"#/components/schemas/V1SpeakPostParametersEncoding"},"index$":6},{"name":"model","in":"query","description":"AI model used to process submitted text","required":false,"schema":{"type":"string","enum":["aura-angus-en","aura-arcas-en","aura-asteria-en","aura-athena-en","aura-helios-en","aura-hera-en","aura-luna-en","aura-orion-en","aura-orpheus-en","aura-perseus-en","aura-stella-en","aura-zeus-en","aura-2-amalthea-en","aura-2-andromeda-en","aura-2-apollo-en","aura-2-arcas-en","aura-2-aries-en","aura-2-asteria-en","aura-2-athena-en","aura-2-atlas-en","aura-2-aurora-en","aura-2-callista-en","aura-2-cora-en","aura-2-cordelia-en","aura-2-delia-en","aura-2-draco-en","aura-2-electra-en","aura-2-harmonia-en","aura-2-helena-en","aura-2-hera-en","aura-2-hermes-en","aura-2-hyperion-en","aura-2-iris-en","aura-2-janus-en","aura-2-juno-en","aura-2-jupiter-en","aura-2-luna-en","aura-2-mars-en","aura-2-minerva-en","aura-2-neptune-en","aura-2-odysseus-en","aura-2-ophelia-en","aura-2-orion-en","aura-2-orpheus-en","aura-2-pandora-en","aura-2-phoebe-en","aura-2-pluto-en","aura-2-saturn-en","aura-2-selene-en","aura-2-thalia-en","aura-2-theia-en","aura-2-vesta-en","aura-2-zeus-en","aura-2-agustina-es","aura-2-alvaro-es","aura-2-antonia-es","aura-2-aquila-es","aura-2-carina-es","aura-2-celeste-es","aura-2-diana-es","aura-2-estrella-es","aura-2-gloria-es","aura-2-javier-es","aura-2-luciano-es","aura-2-nestor-es","aura-2-olivia-es","aura-2-selena-es","aura-2-silvia-es","aura-2-sirio-es","aura-2-valerio-es","aura-2-aurelia-de","aura-2-elara-de","aura-2-fabian-de","aura-2-julius-de","aura-2-kara-de","aura-2-lara-de","aura-2-viktoria-de","aura-2-beatrix-nl","aura-2-cornelia-nl","aura-2-daphne-nl","aura-2-hestia-nl","aura-2-lars-nl","aura-2-leda-nl","aura-2-rhea-nl","aura-2-roman-nl","aura-2-sander-nl","aura-2-agathe-fr","aura-2-hector-fr","aura-2-cesare-it","aura-2-cinzia-it","aura-2-demetra-it","aura-2-dionisio-it","aura-2-elio-it","aura-2-flavio-it","aura-2-livia-it","aura-2-maia-it","aura-2-melia-it","aura-2-ama-ja","aura-2-ebisu-ja","aura-2-fujin-ja","aura-2-izanami-ja","aura-2-uzume-ja"],"default":"aura-asteria-en","title":"V1SpeakPostParametersModel","x-ref":"#/components/schemas/V1SpeakPostParametersModel"},"index$":7},{"name":"sample_rate","in":"query","description":"Sample Rate specifies the sample rate for the output audio. Based on the encoding, different sample rates are supported. For some encodings, the sample rate is not configurable","required":false,"schema":{"oneOf":[{"type":"string","enum":["8000","16000","24000","32000","48000"],"description":"Encoding - linear16. Supported sample rates - 8000, 16000, 24000, 32000, 48000 Hz.","title":"V1SpeakPostParametersSampleRate0","x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate0"},{"type":"string","enum":["8000","16000"],"description":"Encoding - mulaw. Supported sample rates - 8000, 16000 Hz.","title":"V1SpeakPostParametersSampleRate1","x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate1"},{"type":"string","enum":["8000","16000"],"description":"Encoding - alaw. Supported sample rates - 8000, 16000 Hz.","title":"V1SpeakPostParametersSampleRate2","x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate2"},{"type":"string","enum":["22050"],"description":"Encoding - mp3. Sample rate is fixed and not configurable (22050 Hz).","title":"V1SpeakPostParametersSampleRate3","x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate3"},{"type":"string","enum":["48000"],"description":"Encoding - opus. Sample rate is fixed at 48000 Hz.","title":"V1SpeakPostParametersSampleRate4","x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate4"}],"title":"V1SpeakPostParametersSampleRate","default":24000,"x-ref":"#/components/schemas/V1SpeakPostParametersSampleRate"},"index$":8},{"name":"speed","in":"query","description":"Speaking rate multiplier that adjusts the pace of generated speech while preserving natural prosody and voice quality. Not yet supported in all languages.","required":false,"schema":{"type":"number","format":"double","minimum":0.7,"maximum":1.5,"default":1},"index$":9}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const speak_ref01_ent = client.Speak()
    let speak_ref01_data = setup.data.new.speak['speak_ref01']

    speak_ref01_data = (await speak_ref01_ent.create(speak_ref01_data)).data()
    assert(null != speak_ref01_data)


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
      '../../../../.sdk/test/entity/speak/SpeakTestData.json')

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
    ['speak01','speak02','speak03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_SPEAK_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_SPEAK_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_SPEAK_ENTID']
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
  
