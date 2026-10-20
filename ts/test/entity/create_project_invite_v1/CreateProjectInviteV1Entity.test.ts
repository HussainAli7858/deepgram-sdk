

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


describe('CreateProjectInviteV1Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEEPGRAM_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEEPGRAM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DeepgramSDK.test()
    const ent = testsdk.CreateProjectInviteV1()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = DeepgramSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateProjectInviteV1().create({"project_id":1,"email":"x","scope":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEEPGRAM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_project_invite_v1.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"The email address of the invitee","t":"`$STRING`","key$":"email","index$":0},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"confirmation message","t":"`$STRING`","key$":"message","index$":1},"scope":{"a":true,"h":"Scope","n":"scope","r":true,"sh":"The scope of the invitee","t":"`$STRING`","key$":"scope","index$":2}},"name":"create_project_invite_v1","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","scope"],"co":{"id":"POST /v1/projects/{project_id}/invites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/projects/{project_id}/invites","q":{"exist":["project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"projects"},{"var":"project_id"},{"lit":"invites"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"create_project_invite_v1","name__orig":"create_project_invite_v1","Name":"CreateProjectInviteV1","name_":"create_project_invite_v1","name-":"create-project-invite-v1","NAME":"CREATE_PROJECT_INVITE_V1","index$":7}, {"active":true,"entity":"create_project_invite_v1","key$":"BasicCreateProjectInviteV1Flow","kind":"basic","name":"BasicCreateProjectInviteV1Flow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_project_invite_v1_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CreateProjectInviteV1', {"POST /v1/projects/{project_id}/invites":{"protocol":"http","requestBody":{"description":"email to invite to the project","content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","description":"The email address of the invitee","key$":"email"},"scope":{"type":"string","description":"The scope of the invitee","key$":"scope"}},"required":["email","scope"],"description":"Request body for creating a project invite","title":"CreateProjectInviteV1Request","x-ref":"#/components/schemas/CreateProjectInviteV1Request","index$":1}}}},"parameters":[{"name":"project_id","in":"path","description":"The unique identifier of the project","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_project_invite_v1_ref01_ent = client.CreateProjectInviteV1()
    let create_project_invite_v1_ref01_data = setup.data.new.create_project_invite_v1['create_project_invite_v1_ref01']
    create_project_invite_v1_ref01_data['project_id'] = setup.idmap['project01']

    create_project_invite_v1_ref01_data = (await create_project_invite_v1_ref01_ent.create(create_project_invite_v1_ref01_data)).data()
    assert(null != create_project_invite_v1_ref01_data)


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
      '../../../../.sdk/test/entity/create_project_invite_v1/CreateProjectInviteV1TestData.json')

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
    ['create_project_invite_v101','create_project_invite_v102','create_project_invite_v103','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEEPGRAM_TEST_CREATE_PROJECT_INVITE_V1_ENTID': idmap,
    'DEEPGRAM_TEST_LIVE': 'FALSE',
    'DEEPGRAM_TEST_EXPLAIN': 'FALSE',
    'DEEPGRAM_APIKEY': '',
  })

  idmap = env['DEEPGRAM_TEST_CREATE_PROJECT_INVITE_V1_ENTID']

  const live = 'TRUE' === env.DEEPGRAM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEEPGRAM_TEST_CREATE_PROJECT_INVITE_V1_ENTID']
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
  
