
import { inspect } from 'node:util'

import { DeepgramEntityBase } from '../DeepgramEntityBase'

import type {
  DeepgramSDK,
} from '../DeepgramSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  CreateAgentConfigurationV1,
  CreateAgentConfigurationV1CreateData,
} from '../DeepgramTypes'

class CreateAgentConfigurationV1Entity extends DeepgramEntityBase<CreateAgentConfigurationV1> {

  constructor(client: DeepgramSDK, entopts: any) {
    super(client, entopts)
    this.name = 'create_agent_configuration_v1'
    this.name_ = 'create_agent_configuration_v1'
    this.Name = 'CreateAgentConfigurationV1'
  }


  make(this: CreateAgentConfigurationV1Entity) {
    return new CreateAgentConfigurationV1Entity(this._client, this.entopts())
  }





  async create(this: any, reqdata?: CreateAgentConfigurationV1CreateData, ctrl?: Control): Promise<CreateAgentConfigurationV1Entity> {

    const utility = this._utility
    const {
      makeContext,
      done,
      // The registry name is `makeError`; `error` is the local alias.
      makeError: error,
      featureHook,
      makePoint,
      makeRequest,
      makeResponse,
      makeResult,
      makeSpec,
    } = utility

    let fres: Promise<any> | undefined = undefined

    let ctx: Context = makeContext({
      opname: 'create',
      ctrl,
      match: this._match,
      data: this._data,
      reqdata
    }, this._entctx)

    try {

      fres = featureHook(ctx, 'PrePoint')
      if (fres instanceof Promise) { await fres }

      ctx.out.point = makePoint(ctx)
      if (ctx.out.point instanceof Error) {
        return error(ctx, ctx.out.point)
      }



      fres = featureHook(ctx, 'PreSpec')
      if (fres instanceof Promise) { await fres }

      ctx.out.spec = makeSpec(ctx)
      if (ctx.out.spec instanceof Error) {
        return error(ctx, ctx.out.spec)
      }



      fres = featureHook(ctx, 'PreRequest')
      if (fres instanceof Promise) { await fres }

      ctx.out.request = await makeRequest(ctx)
      if (ctx.out.request instanceof Error) {
        return error(ctx, ctx.out.request)
      }



      fres = featureHook(ctx, 'PreResponse')
      if (fres instanceof Promise) { await fres }

      ctx.out.response = await makeResponse(ctx)
      if (ctx.out.response instanceof Error) {
        return error(ctx, ctx.out.response)
      }



      fres = featureHook(ctx, 'PreResult')
      if (fres instanceof Promise) { await fres }

      ctx.out.result = await makeResult(ctx)
      if (ctx.out.result instanceof Error) {
        return error(ctx, ctx.out.result)
      }



      fres = featureHook(ctx, 'PreDone')
      if (fres instanceof Promise) { await fres }

      if (null != ctx.result) {
        if (null != ctx.result.resdata) {
          this._data = ctx.result.resdata
        }
      }

      const out = done(ctx)

      return (ctx.result && ctx.result.ok) ? this : out
    }
    catch (err: any) {
      // What a hook throws here must not escape the cleaning below.
      try {

        fres = featureHook(ctx, 'PreUnexpected')
        if (fres instanceof Promise) { await fres }
      }
      catch (hookerr: any) {
        err = hookerr
      }

      err = this._unexpected(ctx, err)

      if (err) {
        throw err
      }
      else {
        // Off-happy-path (throw disabled): typed as any so the method's
        // Promise<CreateAgentConfigurationV1Entity> return stays clean under strict null checks.
        return undefined as any
      }
    }
  }





}


export {
  CreateAgentConfigurationV1Entity
}
