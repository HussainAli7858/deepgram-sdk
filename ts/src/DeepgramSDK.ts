// Deepgram Ts SDK

import { AgentEntity } from './entity/AgentEntity'
import { AgentThinkModelsV1Entity } from './entity/AgentThinkModelsV1Entity'
import { AgentVariableEntity } from './entity/AgentVariableEntity'
import { BillingBreakdownV1Entity } from './entity/BillingBreakdownV1Entity'
import { CreateAgentConfigurationV1Entity } from './entity/CreateAgentConfigurationV1Entity'
import { CreateKeyV1Entity } from './entity/CreateKeyV1Entity'
import { CreateProjectDistributionCredentialsV1Entity } from './entity/CreateProjectDistributionCredentialsV1Entity'
import { CreateProjectInviteV1Entity } from './entity/CreateProjectInviteV1Entity'
import { GrantEntity } from './entity/GrantEntity'
import { ListBillingFieldsV1Entity } from './entity/ListBillingFieldsV1Entity'
import { ListModelsV1Entity } from './entity/ListModelsV1Entity'
import { ListProjectBalancesV1ResponseBalancesItemEntity } from './entity/ListProjectBalancesV1ResponseBalancesItemEntity'
import { ListProjectDistributionCredentialsV1ResponseDistributionEntity } from './entity/ListProjectDistributionCredentialsV1ResponseDistributionEntity'
import { ListProjectInvitesV1ResponseInvitesItemEntity } from './entity/ListProjectInvitesV1ResponseInvitesItemEntity'
import { ListProjectKeysV1ResponseApiKeysItemEntity } from './entity/ListProjectKeysV1ResponseApiKeysItemEntity'
import { ListProjectMemberScopesV1Entity } from './entity/ListProjectMemberScopesV1Entity'
import { ListProjectMembersV1ResponseMembersItemEntity } from './entity/ListProjectMembersV1ResponseMembersItemEntity'
import { ListProjectPurchasesV1ResponseOrdersItemEntity } from './entity/ListProjectPurchasesV1ResponseOrdersItemEntity'
import { ListenEntity } from './entity/ListenEntity'
import { ModelEntity } from './entity/ModelEntity'
import { ProjectEntity } from './entity/ProjectEntity'
import { ProjectBalanceV1Entity } from './entity/ProjectBalanceV1Entity'
import { ProjectDistributionCredentialsV1Entity } from './entity/ProjectDistributionCredentialsV1Entity'
import { ProjectInviteV1Entity } from './entity/ProjectInviteV1Entity'
import { ProjectKeyV1Entity } from './entity/ProjectKeyV1Entity'
import { ProjectKeyV1ResponseItemEntity } from './entity/ProjectKeyV1ResponseItemEntity'
import { ProjectMemberV1Entity } from './entity/ProjectMemberV1Entity'
import { ProjectRequestEntity } from './entity/ProjectRequestEntity'
import { ReadEntity } from './entity/ReadEntity'
import { SpeakEntity } from './entity/SpeakEntity'
import { UpdateProjectMemberScopesV1Entity } from './entity/UpdateProjectMemberScopesV1Entity'
import { UpdateProjectV1Entity } from './entity/UpdateProjectV1Entity'
import { UsageEntity } from './entity/UsageEntity'
import { UsageBreakdownV1Entity } from './entity/UsageBreakdownV1Entity'
import { UsageFieldsV1Entity } from './entity/UsageFieldsV1Entity'

export type * from './DeepgramTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { DeepgramEntityBase } from './DeepgramEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class DeepgramSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method,
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('DeepgramSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('DeepgramSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('DeepgramSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Agent().list()` / `client.Agent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Agent(entopts?: Record<string, any>) {
    const self = this
    return new AgentEntity(self, entopts)
  }


  // Entity access: `client.AgentThinkModelsV1().list()` / `client.AgentThinkModelsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentThinkModelsV1(entopts?: Record<string, any>) {
    const self = this
    return new AgentThinkModelsV1Entity(self, entopts)
  }


  // Entity access: `client.AgentVariable().list()` / `client.AgentVariable().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AgentVariable(entopts?: Record<string, any>) {
    const self = this
    return new AgentVariableEntity(self, entopts)
  }


  // Entity access: `client.BillingBreakdownV1().list()` / `client.BillingBreakdownV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BillingBreakdownV1(entopts?: Record<string, any>) {
    const self = this
    return new BillingBreakdownV1Entity(self, entopts)
  }


  // Entity access: `client.CreateAgentConfigurationV1().list()` / `client.CreateAgentConfigurationV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateAgentConfigurationV1(entopts?: Record<string, any>) {
    const self = this
    return new CreateAgentConfigurationV1Entity(self, entopts)
  }


  // Entity access: `client.CreateKeyV1().list()` / `client.CreateKeyV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateKeyV1(entopts?: Record<string, any>) {
    const self = this
    return new CreateKeyV1Entity(self, entopts)
  }


  // Entity access: `client.CreateProjectDistributionCredentialsV1().list()` / `client.CreateProjectDistributionCredentialsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateProjectDistributionCredentialsV1(entopts?: Record<string, any>) {
    const self = this
    return new CreateProjectDistributionCredentialsV1Entity(self, entopts)
  }


  // Entity access: `client.CreateProjectInviteV1().list()` / `client.CreateProjectInviteV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateProjectInviteV1(entopts?: Record<string, any>) {
    const self = this
    return new CreateProjectInviteV1Entity(self, entopts)
  }


  // Entity access: `client.Grant().list()` / `client.Grant().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Grant(entopts?: Record<string, any>) {
    const self = this
    return new GrantEntity(self, entopts)
  }


  // Entity access: `client.ListBillingFieldsV1().list()` / `client.ListBillingFieldsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListBillingFieldsV1(entopts?: Record<string, any>) {
    const self = this
    return new ListBillingFieldsV1Entity(self, entopts)
  }


  // Entity access: `client.ListModelsV1().list()` / `client.ListModelsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListModelsV1(entopts?: Record<string, any>) {
    const self = this
    return new ListModelsV1Entity(self, entopts)
  }


  // Entity access: `client.ListProjectBalancesV1ResponseBalancesItem().list()` / `client.ListProjectBalancesV1ResponseBalancesItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectBalancesV1ResponseBalancesItem(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectBalancesV1ResponseBalancesItemEntity(self, entopts)
  }


  // Entity access: `client.ListProjectDistributionCredentialsV1ResponseDistribution().list()` / `client.ListProjectDistributionCredentialsV1ResponseDistribution().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectDistributionCredentialsV1ResponseDistribution(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectDistributionCredentialsV1ResponseDistributionEntity(self, entopts)
  }


  // Entity access: `client.ListProjectInvitesV1ResponseInvitesItem().list()` / `client.ListProjectInvitesV1ResponseInvitesItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectInvitesV1ResponseInvitesItem(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectInvitesV1ResponseInvitesItemEntity(self, entopts)
  }


  // Entity access: `client.ListProjectKeysV1ResponseApiKeysItem().list()` / `client.ListProjectKeysV1ResponseApiKeysItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectKeysV1ResponseApiKeysItem(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectKeysV1ResponseApiKeysItemEntity(self, entopts)
  }


  // Entity access: `client.ListProjectMemberScopesV1().list()` / `client.ListProjectMemberScopesV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectMemberScopesV1(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectMemberScopesV1Entity(self, entopts)
  }


  // Entity access: `client.ListProjectMembersV1ResponseMembersItem().list()` / `client.ListProjectMembersV1ResponseMembersItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectMembersV1ResponseMembersItem(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectMembersV1ResponseMembersItemEntity(self, entopts)
  }


  // Entity access: `client.ListProjectPurchasesV1ResponseOrdersItem().list()` / `client.ListProjectPurchasesV1ResponseOrdersItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ListProjectPurchasesV1ResponseOrdersItem(entopts?: Record<string, any>) {
    const self = this
    return new ListProjectPurchasesV1ResponseOrdersItemEntity(self, entopts)
  }


  // Entity access: `client.Listen().list()` / `client.Listen().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Listen(entopts?: Record<string, any>) {
    const self = this
    return new ListenEntity(self, entopts)
  }


  // Entity access: `client.Model().list()` / `client.Model().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Model(entopts?: Record<string, any>) {
    const self = this
    return new ModelEntity(self, entopts)
  }


  // Entity access: `client.Project().list()` / `client.Project().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Project(entopts?: Record<string, any>) {
    const self = this
    return new ProjectEntity(self, entopts)
  }


  // Entity access: `client.ProjectBalanceV1().list()` / `client.ProjectBalanceV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectBalanceV1(entopts?: Record<string, any>) {
    const self = this
    return new ProjectBalanceV1Entity(self, entopts)
  }


  // Entity access: `client.ProjectDistributionCredentialsV1().list()` / `client.ProjectDistributionCredentialsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectDistributionCredentialsV1(entopts?: Record<string, any>) {
    const self = this
    return new ProjectDistributionCredentialsV1Entity(self, entopts)
  }


  // Entity access: `client.ProjectInviteV1().list()` / `client.ProjectInviteV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectInviteV1(entopts?: Record<string, any>) {
    const self = this
    return new ProjectInviteV1Entity(self, entopts)
  }


  // Entity access: `client.ProjectKeyV1().list()` / `client.ProjectKeyV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectKeyV1(entopts?: Record<string, any>) {
    const self = this
    return new ProjectKeyV1Entity(self, entopts)
  }


  // Entity access: `client.ProjectKeyV1ResponseItem().list()` / `client.ProjectKeyV1ResponseItem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectKeyV1ResponseItem(entopts?: Record<string, any>) {
    const self = this
    return new ProjectKeyV1ResponseItemEntity(self, entopts)
  }


  // Entity access: `client.ProjectMemberV1().list()` / `client.ProjectMemberV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectMemberV1(entopts?: Record<string, any>) {
    const self = this
    return new ProjectMemberV1Entity(self, entopts)
  }


  // Entity access: `client.ProjectRequest().list()` / `client.ProjectRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ProjectRequest(entopts?: Record<string, any>) {
    const self = this
    return new ProjectRequestEntity(self, entopts)
  }


  // Entity access: `client.Read().list()` / `client.Read().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Read(entopts?: Record<string, any>) {
    const self = this
    return new ReadEntity(self, entopts)
  }


  // Entity access: `client.Speak().list()` / `client.Speak().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Speak(entopts?: Record<string, any>) {
    const self = this
    return new SpeakEntity(self, entopts)
  }


  // Entity access: `client.UpdateProjectMemberScopesV1().list()` / `client.UpdateProjectMemberScopesV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UpdateProjectMemberScopesV1(entopts?: Record<string, any>) {
    const self = this
    return new UpdateProjectMemberScopesV1Entity(self, entopts)
  }


  // Entity access: `client.UpdateProjectV1().list()` / `client.UpdateProjectV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UpdateProjectV1(entopts?: Record<string, any>) {
    const self = this
    return new UpdateProjectV1Entity(self, entopts)
  }


  // Entity access: `client.Usage().list()` / `client.Usage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Usage(entopts?: Record<string, any>) {
    const self = this
    return new UsageEntity(self, entopts)
  }


  // Entity access: `client.UsageBreakdownV1().list()` / `client.UsageBreakdownV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsageBreakdownV1(entopts?: Record<string, any>) {
    const self = this
    return new UsageBreakdownV1Entity(self, entopts)
  }


  // Entity access: `client.UsageFieldsV1().list()` / `client.UsageFieldsV1().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsageFieldsV1(entopts?: Record<string, any>) {
    const self = this
    return new UsageFieldsV1Entity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new DeepgramSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return DeepgramSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Deepgram' }
  }

  toString() {
    return 'Deepgram ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = DeepgramSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  DeepgramEntityBase,

  DeepgramSDK,
  SDK,
}


export type { DirectResult }
