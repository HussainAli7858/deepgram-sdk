# Deepgram TypeScript SDK



The TypeScript SDK for the Deepgram API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Agent()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/HussainAli7858/deepgram-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/HussainAli7858/deepgram-sdk
npm install ./deepgram-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DeepgramSDK } from '@hussainali7858/deepgram-sdk'

const client = new DeepgramSDK({
  apikey: process.env.DEEPGRAM_APIKEY,
})
```

### 2. List agent records

`list()` resolves to an array of Agent ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const agents = await client.Agent().list({ project_id: "example" })

for (const agent of agents) {
  console.log(agent.data())
}
```

### 3. Load an agent

Agent is nested under project, so provide the `project_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const agent = await client.Agent().load({
    project_id: 'example_project_id',
    id: 'example_id',
  })
  console.log(agent.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Update
const updated = await client.Agent().update({
  id: 'example_id',
  project_id: 'example_project_id',
  agent_id: 'example_agent_id',
})

// Remove
await client.Agent().remove({
  id: 'example_id',
  project_id: 'example_project_id',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const projectbalancev1 = await client.ProjectBalanceV1().load({ balance_id: "example", project_id: "example" })
  console.log(projectbalancev1.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DeepgramSDK.test()

const projectbalancev1 = await client.ProjectBalanceV1().load({ balance_id: 'example_balance_id', project_id: 'example_project_id' })
// projectbalancev1 is the ProjectBalanceV1 entity; .data() reads its mock record
console.log(projectbalancev1.data())
```

You can also use the instance method:

```ts
const client = new DeepgramSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ProjectBalanceV1()

// First call runs the operation and stores its result
await entity.load({ balance_id: 'example_balance_id', project_id: 'example_project_id' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DeepgramSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DEEPGRAM_TEST_LIVE=TRUE
DEEPGRAM_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### DeepgramSDK

#### Constructor

```ts
new DeepgramSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Agent(data?)` | `AgentEntity` | Create an Agent entity instance. |
| `AgentThinkModelsV1(data?)` | `AgentThinkModelsV1Entity` | Create an AgentThinkModelsV1 entity instance. |
| `AgentVariable(data?)` | `AgentVariableEntity` | Create an AgentVariable entity instance. |
| `BillingBreakdownV1(data?)` | `BillingBreakdownV1Entity` | Create a BillingBreakdownV1 entity instance. |
| `CreateAgentConfigurationV1(data?)` | `CreateAgentConfigurationV1Entity` | Create a CreateAgentConfigurationV1 entity instance. |
| `CreateKeyV1(data?)` | `CreateKeyV1Entity` | Create a CreateKeyV1 entity instance. |
| `CreateProjectDistributionCredentialsV1(data?)` | `CreateProjectDistributionCredentialsV1Entity` | Create a CreateProjectDistributionCredentialsV1 entity instance. |
| `CreateProjectInviteV1(data?)` | `CreateProjectInviteV1Entity` | Create a CreateProjectInviteV1 entity instance. |
| `Grant(data?)` | `GrantEntity` | Create a Grant entity instance. |
| `ListBillingFieldsV1(data?)` | `ListBillingFieldsV1Entity` | Create a ListBillingFieldsV1 entity instance. |
| `ListModelsV1(data?)` | `ListModelsV1Entity` | Create a ListModelsV1 entity instance. |
| `ListProjectBalancesV1ResponseBalancesItem(data?)` | `ListProjectBalancesV1ResponseBalancesItemEntity` | Create a ListProjectBalancesV1ResponseBalancesItem entity instance. |
| `ListProjectDistributionCredentialsV1ResponseDistribution(data?)` | `ListProjectDistributionCredentialsV1ResponseDistributionEntity` | Create a ListProjectDistributionCredentialsV1ResponseDistribution entity instance. |
| `ListProjectInvitesV1ResponseInvitesItem(data?)` | `ListProjectInvitesV1ResponseInvitesItemEntity` | Create a ListProjectInvitesV1ResponseInvitesItem entity instance. |
| `ListProjectKeysV1ResponseApiKeysItem(data?)` | `ListProjectKeysV1ResponseApiKeysItemEntity` | Create a ListProjectKeysV1ResponseApiKeysItem entity instance. |
| `ListProjectMemberScopesV1(data?)` | `ListProjectMemberScopesV1Entity` | Create a ListProjectMemberScopesV1 entity instance. |
| `ListProjectMembersV1ResponseMembersItem(data?)` | `ListProjectMembersV1ResponseMembersItemEntity` | Create a ListProjectMembersV1ResponseMembersItem entity instance. |
| `ListProjectPurchasesV1ResponseOrdersItem(data?)` | `ListProjectPurchasesV1ResponseOrdersItemEntity` | Create a ListProjectPurchasesV1ResponseOrdersItem entity instance. |
| `Listen(data?)` | `ListenEntity` | Create a Listen entity instance. |
| `Model(data?)` | `ModelEntity` | Create a Model entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `ProjectBalanceV1(data?)` | `ProjectBalanceV1Entity` | Create a ProjectBalanceV1 entity instance. |
| `ProjectDistributionCredentialsV1(data?)` | `ProjectDistributionCredentialsV1Entity` | Create a ProjectDistributionCredentialsV1 entity instance. |
| `ProjectInviteV1(data?)` | `ProjectInviteV1Entity` | Create a ProjectInviteV1 entity instance. |
| `ProjectKeyV1(data?)` | `ProjectKeyV1Entity` | Create a ProjectKeyV1 entity instance. |
| `ProjectKeyV1ResponseItem(data?)` | `ProjectKeyV1ResponseItemEntity` | Create a ProjectKeyV1ResponseItem entity instance. |
| `ProjectMemberV1(data?)` | `ProjectMemberV1Entity` | Create a ProjectMemberV1 entity instance. |
| `ProjectRequest(data?)` | `ProjectRequestEntity` | Create a ProjectRequest entity instance. |
| `Read(data?)` | `ReadEntity` | Create a Read entity instance. |
| `Speak(data?)` | `SpeakEntity` | Create a Speak entity instance. |
| `UpdateProjectMemberScopesV1(data?)` | `UpdateProjectMemberScopesV1Entity` | Create an UpdateProjectMemberScopesV1 entity instance. |
| `UpdateProjectV1(data?)` | `UpdateProjectV1Entity` | Create an UpdateProjectV1 entity instance. |
| `Usage(data?)` | `UsageEntity` | Create an Usage entity instance. |
| `UsageBreakdownV1(data?)` | `UsageBreakdownV1Entity` | Create an UsageBreakdownV1 entity instance. |
| `UsageFieldsV1(data?)` | `UsageFieldsV1Entity` | Create an UsageFieldsV1 entity instance. |
| `tester(testopts?, sdkopts?)` | `DeepgramSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DeepgramSDK.test(testopts?, sdkopts?)` | `DeepgramSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DeepgramSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Agent

| Field | Description |
| --- | --- |
| `agent_id` | The unique identifier of the agent configuration |
| `config` | The agent configuration object |
| `created_at` | Timestamp when the configuration was created |
| `id` |  |
| `metadata` | A map of arbitrary key-value pairs for labeling or organizing the agent configuration |
| `updated_at` | Timestamp when the configuration was last updated |

Operations: list, load, remove, update.

API path: `/v1/projects/{project_id}/agents`

#### AgentThinkModelsV1

| Field | Description |
| --- | --- |
| `models` |  |

Operations: list.

API path: `/v1/agent/settings/think/models`

#### AgentVariable

| Field | Description |
| --- | --- |
| `api_version` | API version. |
| `created_at` | Timestamp when the variable was created |
| `id` |  |
| `key` | The variable name, following the DG_<VARIABLE_NAME> format |
| `updated_at` | Timestamp when the variable was last updated |
| `value` | The value to substitute. |
| `variable_id` | The unique identifier of the variable |

Operations: create, list, load, remove, update.

API path: `/v1/projects/{project_id}/agent-variables`

#### BillingBreakdownV1

| Field | Description |
| --- | --- |
| `dollars` | USD cost of the billing for this grouping |
| `grouping` |  |

Operations: list.

API path: `/v1/projects/{project_id}/billing/breakdown`

#### CreateAgentConfigurationV1

| Field | Description |
| --- | --- |
| `agent_id` | The unique identifier of the newly created agent configuration |
| `api_version` | API version. |
| `config` | The parsed agent configuration object |
| `metadata` | Metadata associated with the agent configuration |

Operations: create.

API path: `/v1/projects/{project_id}/agents`

#### CreateKeyV1

| Field | Description |
| --- | --- |
| `api_key_id` | The unique identifier of the API key |
| `comment` | A comment for the API key |
| `expiration_date` | The expiration date of the API key |
| `key` | The API key |
| `scopes` | The scopes for the API key |
| `tags` | The tags for the API key |

Operations: create.

API path: `/v1/projects/{project_id}/keys`

#### CreateProjectDistributionCredentialsV1

| Field | Description |
| --- | --- |
| `comment` | Optional comment about the credentials |
| `distribution_credentials` |  |
| `member` |  |

Operations: create.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials`

#### CreateProjectInviteV1

| Field | Description |
| --- | --- |
| `email` | The email address of the invitee |
| `message` | confirmation message |
| `scope` | The scope of the invitee |

Operations: create.

API path: `/v1/projects/{project_id}/invites`

#### Grant

| Field | Description |
| --- | --- |
| `access_token` | JSON Web Token (JWT) |
| `expires_in` | Time in seconds until the JWT expires |
| `ttl_seconds` | Time to live in seconds for the token. |

Operations: create.

API path: `/v1/auth/grant`

#### ListBillingFieldsV1

| Field | Description |
| --- | --- |
| `accessors` | List of accessor UUIDs for the time period |
| `deployments` | List of deployment types for the time period |
| `line_items` | Map of line item names to human-readable descriptions for the time period |
| `tags` | List of tags for the time period |

Operations: list.

API path: `/v1/projects/{project_id}/billing/fields`

#### ListModelsV1

| Field | Description |
| --- | --- |
| `stt` |  |
| `tts` |  |

Operations: list.

API path: `/v1/projects/{project_id}/models`

#### ListProjectBalancesV1ResponseBalancesItem

| Field | Description |
| --- | --- |
| `amount` | The amount of the balance |
| `balance_id` | The unique identifier of the balance |
| `purchase_order_id` | Description or reference of the purchase |
| `units` | The units of the balance, such as "USD" |

Operations: list.

API path: `/v1/projects/{project_id}/balances`

#### ListProjectDistributionCredentialsV1ResponseDistribution

| Field | Description |
| --- | --- |
| `distribution_credentials` |  |
| `member` |  |

Operations: list.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials`

#### ListProjectInvitesV1ResponseInvitesItem

| Field | Description |
| --- | --- |
| `email` | The email address of the invitee |
| `scope` | The scope of the invitee |

Operations: list.

API path: `/v1/projects/{project_id}/invites`

#### ListProjectKeysV1ResponseApiKeysItem

| Field | Description |
| --- | --- |
| `api_key` |  |
| `member` |  |

Operations: list.

API path: `/v1/projects/{project_id}/keys`

#### ListProjectMemberScopesV1

| Field | Description |
| --- | --- |
| `scopes` | The API scopes of the member |

Operations: list.

API path: `/v1/projects/{project_id}/members/{member_id}/scopes`

#### ListProjectMembersV1ResponseMembersItem

| Field | Description |
| --- | --- |
| `email` |  |
| `first_name` |  |
| `last_name` |  |
| `member_id` | The unique identifier of the member |
| `scopes` | The API scopes of the member |

Operations: list.

API path: `/v1/projects/{project_id}/members`

#### ListProjectPurchasesV1ResponseOrdersItem

| Field | Description |
| --- | --- |
| `amount` |  |
| `created` |  |
| `expiration` |  |
| `order_id` |  |
| `order_type` |  |
| `units` |  |

Operations: list.

API path: `/v1/projects/{project_id}/purchases`

#### Listen

| Field | Description |
| --- | --- |
| `url` |  |

Operations: create.

API path: `/v1/listen`

#### Model

| Field | Description |
| --- | --- |
| `id` |  |
| `stt` |  |
| `tts` |  |

Operations: list, load.

API path: `/v1/models`

#### Project

| Field | Description |
| --- | --- |
| `id` |  |
| `mip_opt_out` | Model Improvement Program opt-out |
| `name` | The name of the project |
| `project_id` | The unique identifier of the project |

Operations: list, load, remove.

API path: `/v1/projects`

#### ProjectBalanceV1

| Field | Description |
| --- | --- |
| `amount` | The amount of the balance |
| `balance_id` | The unique identifier of the balance |
| `purchase_order_id` | Description or reference of the purchase |
| `units` | The units of the balance, such as "USD" |

Operations: load.

API path: `/v1/projects/{project_id}/balances/{balance_id}`

#### ProjectDistributionCredentialsV1

| Field | Description |
| --- | --- |
| `distribution_credentials` |  |
| `member` |  |

Operations: load, remove.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}`

#### ProjectInviteV1

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v1/projects/{project_id}/invites/{email}`

#### ProjectKeyV1

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v1/projects/{project_id}/keys/{key_id}`

#### ProjectKeyV1ResponseItem

| Field | Description |
| --- | --- |
| `member` |  |

Operations: load.

API path: `/v1/projects/{project_id}/keys/{key_id}`

#### ProjectMemberV1

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v1/projects/{project_id}/members/{member_id}`

#### ProjectRequest

| Field | Description |
| --- | --- |
| `api_key_id` | The unique identifier of the API key |
| `callback` | The callback URL for the request |
| `code` | The response code of the request |
| `created` | The date and time the request was created |
| `deployment` | The deployment type |
| `id` |  |
| `path` | The API path of the request |
| `project_uuid` | The unique identifier of the project |
| `request_id` | The unique identifier of the request |
| `response` | The response of the request |

Operations: list, load.

API path: `/v1/projects/{project_id}/requests`

#### Read

| Field | Description |
| --- | --- |
| `metadata` |  |
| `results` |  |

Operations: create.

API path: `/v1/read`

#### Speak

| Field | Description |
| --- | --- |
| `request_id` | Unique identifier for tracking the asynchronous request |
| `text` | The text content to be converted to speech. |

Operations: create.

API path: `/v2/speak`

#### UpdateProjectMemberScopesV1

| Field | Description |
| --- | --- |
| `message` | confirmation message |
| `scope` | A scope to update |

Operations: update.

API path: `/v1/projects/{project_id}/members/{member_id}/scopes`

#### UpdateProjectV1

| Field | Description |
| --- | --- |
| `message` | confirmation message |
| `name` | The name of the project |

Operations: update.

API path: `/v1/projects/{project_id}`

#### Usage

| Field | Description |
| --- | --- |
| `end` |  |
| `resolution` |  |
| `start` |  |

Operations: load.

API path: `/v1/projects/{project_id}/usage`

#### UsageBreakdownV1

| Field | Description |
| --- | --- |
| `agent_hours` | Agent hours used |
| `grouping` |  |
| `hours` | Audio hours processed |
| `requests` | Number of requests |
| `tokens_in` | Number of input tokens |
| `tokens_out` | Number of output tokens |
| `total_hours` | Total hours including all processing |
| `tts_characters` | Number of text-to-speech characters processed |

Operations: list.

API path: `/v1/projects/{project_id}/usage/breakdown`

#### UsageFieldsV1

| Field | Description |
| --- | --- |
| `language` | The language supported by the model (IETF language tag). |
| `model_id` | Unique identifier for the model. |
| `name` | Name of the model. |
| `version` | Version identifier of the model, typically with a date and a revision number. |

Operations: list.

API path: `/v1/projects/{project_id}/usage/fields`



## Entities


### Agent

Create an instance: `const agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` | The unique identifier of the agent configuration |
| `config` | `Record<string, any>` | The agent configuration object |
| `created_at` | `string` | Timestamp when the configuration was created |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` | A map of arbitrary key-value pairs for labeling or organizing the agent configuration |
| `updated_at` | `string` | Timestamp when the configuration was last updated |

#### Example: Load

```ts
const agent = await client.Agent().load({ id: 'agent_id', project_id: 'project_id' })
```

#### Example: List

```ts
const agents = await client.Agent().list({ project_id: "example" })
```


### AgentThinkModelsV1

Create an instance: `const agent_think_models_v1 = client.AgentThinkModelsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `models` | `any[]` |  |

#### Example: List

```ts
const agent_think_models_v1s = await client.AgentThinkModelsV1().list()
```


### AgentVariable

Create an instance: `const agent_variable = client.AgentVariable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_version` | `number` | API version. |
| `created_at` | `string` | Timestamp when the variable was created |
| `id` | `string` |  |
| `key` | `string` | The variable name, following the DG_<VARIABLE_NAME> format |
| `updated_at` | `string` | Timestamp when the variable was last updated |
| `value` | `any` | The value to substitute. |
| `variable_id` | `string` | The unique identifier of the variable |

#### Example: Load

```ts
const agent_variable = await client.AgentVariable().load({ id: 'agent_variable_id', project_id: 'project_id' })
```

#### Example: List

```ts
const agent_variables = await client.AgentVariable().list({ project_id: "example" })
```

#### Example: Create

```ts
const agent_variable = await client.AgentVariable().create({
  project_id: 'example_project_id',
  key: 'example_key',
  value: 'example_value',
  variable_id: 'example_variable_id',
})
```


### BillingBreakdownV1

Create an instance: `const billing_breakdown_v1 = client.BillingBreakdownV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dollars` | `string` | USD cost of the billing for this grouping |
| `grouping` | `Record<string, any>` |  |

#### Example: List

```ts
const billing_breakdown_v1s = await client.BillingBreakdownV1().list({ project_id: "example" })
```


### CreateAgentConfigurationV1

Create an instance: `const create_agent_configuration_v1 = client.CreateAgentConfigurationV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `string` | The unique identifier of the newly created agent configuration |
| `api_version` | `number` | API version. |
| `config` | `Record<string, any>` | The parsed agent configuration object |
| `metadata` | `Record<string, any>` | Metadata associated with the agent configuration |

#### Example: Create

```ts
const create_agent_configuration_v1 = await client.CreateAgentConfigurationV1().create({
  project_id: 'example_project_id',
  agent_id: 'example_agent_id',
  config: {},
})
```


### CreateKeyV1

Create an instance: `const create_key_v1 = client.CreateKeyV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_id` | `string` | The unique identifier of the API key |
| `comment` | `string` | A comment for the API key |
| `expiration_date` | `string` | The expiration date of the API key |
| `key` | `string` | The API key |
| `scopes` | `any[]` | The scopes for the API key |
| `tags` | `any[]` | The tags for the API key |

#### Example: Create

```ts
const create_key_v1 = await client.CreateKeyV1().create({
  project_id: 'example_project_id',
})
```


### CreateProjectDistributionCredentialsV1

Create an instance: `const create_project_distribution_credentials_v1 = client.CreateProjectDistributionCredentialsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` | Optional comment about the credentials |
| `distribution_credentials` | `Record<string, any>` |  |
| `member` | `Record<string, any>` |  |

#### Example: Create

```ts
const create_project_distribution_credentials_v1 = await client.CreateProjectDistributionCredentialsV1().create({
  project_id: 'example_project_id',
  distribution_credentials: {},
  member: {},
})
```


### CreateProjectInviteV1

Create an instance: `const create_project_invite_v1 = client.CreateProjectInviteV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The email address of the invitee |
| `message` | `string` | confirmation message |
| `scope` | `string` | The scope of the invitee |

#### Example: Create

```ts
const create_project_invite_v1 = await client.CreateProjectInviteV1().create({
  project_id: 'example_project_id',
  email: 'example_email',
  scope: 'example_scope',
})
```


### Grant

Create an instance: `const grant = client.Grant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | JSON Web Token (JWT) |
| `expires_in` | `number` | Time in seconds until the JWT expires |
| `ttl_seconds` | `number` | Time to live in seconds for the token. |

#### Example: Create

```ts
const grant = await client.Grant().create({
  access_token: 'example_access_token',
})
```


### ListBillingFieldsV1

Create an instance: `const list_billing_fields_v1 = client.ListBillingFieldsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessors` | `any[]` | List of accessor UUIDs for the time period |
| `deployments` | `any[]` | List of deployment types for the time period |
| `line_items` | `Record<string, any>` | Map of line item names to human-readable descriptions for the time period |
| `tags` | `any[]` | List of tags for the time period |

#### Example: List

```ts
const list_billing_fields_v1s = await client.ListBillingFieldsV1().list({ project_id: "example" })
```


### ListModelsV1

Create an instance: `const list_models_v1 = client.ListModelsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `stt` | `any[]` |  |
| `tts` | `any[]` |  |

#### Example: List

```ts
const list_models_v1s = await client.ListModelsV1().list({ project_id: "example" })
```


### ListProjectBalancesV1ResponseBalancesItem

Create an instance: `const list_project_balances_v1_response_balances_item = client.ListProjectBalancesV1ResponseBalancesItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The amount of the balance |
| `balance_id` | `string` | The unique identifier of the balance |
| `purchase_order_id` | `string` | Description or reference of the purchase |
| `units` | `string` | The units of the balance, such as "USD" |

#### Example: List

```ts
const list_project_balances_v1_response_balances_items = await client.ListProjectBalancesV1ResponseBalancesItem().list({ project_id: "example" })
```


### ListProjectDistributionCredentialsV1ResponseDistribution

Create an instance: `const list_project_distribution_credentials_v1_response_distribution = client.ListProjectDistributionCredentialsV1ResponseDistribution()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `distribution_credentials` | `Record<string, any>` |  |
| `member` | `Record<string, any>` |  |

#### Example: List

```ts
const list_project_distribution_credentials_v1_response_distributions = await client.ListProjectDistributionCredentialsV1ResponseDistribution().list({ project_id: "example" })
```


### ListProjectInvitesV1ResponseInvitesItem

Create an instance: `const list_project_invites_v1_response_invites_item = client.ListProjectInvitesV1ResponseInvitesItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The email address of the invitee |
| `scope` | `string` | The scope of the invitee |

#### Example: List

```ts
const list_project_invites_v1_response_invites_items = await client.ListProjectInvitesV1ResponseInvitesItem().list({ project_id: "example" })
```


### ListProjectKeysV1ResponseApiKeysItem

Create an instance: `const list_project_keys_v1_response_api_keys_item = client.ListProjectKeysV1ResponseApiKeysItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `Record<string, any>` |  |
| `member` | `Record<string, any>` |  |

#### Example: List

```ts
const list_project_keys_v1_response_api_keys_items = await client.ListProjectKeysV1ResponseApiKeysItem().list({ project_id: "example" })
```


### ListProjectMemberScopesV1

Create an instance: `const list_project_member_scopes_v1 = client.ListProjectMemberScopesV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `scopes` | `any[]` | The API scopes of the member |

#### Example: List

```ts
const list_project_member_scopes_v1s = await client.ListProjectMemberScopesV1().list({ member_id: "example", project_id: "example" })
```


### ListProjectMembersV1ResponseMembersItem

Create an instance: `const list_project_members_v1_response_members_item = client.ListProjectMembersV1ResponseMembersItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `last_name` | `string` |  |
| `member_id` | `string` | The unique identifier of the member |
| `scopes` | `any[]` | The API scopes of the member |

#### Example: List

```ts
const list_project_members_v1_response_members_items = await client.ListProjectMembersV1ResponseMembersItem().list({ project_id: "example" })
```


### ListProjectPurchasesV1ResponseOrdersItem

Create an instance: `const list_project_purchases_v1_response_orders_item = client.ListProjectPurchasesV1ResponseOrdersItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `string` |  |
| `created` | `string` |  |
| `expiration` | `string` |  |
| `order_id` | `string` |  |
| `order_type` | `string` |  |
| `units` | `string` |  |

#### Example: List

```ts
const list_project_purchases_v1_response_orders_items = await client.ListProjectPurchasesV1ResponseOrdersItem().list({ project_id: "example" })
```


### Listen

Create an instance: `const listen = client.Listen()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `string` |  |

#### Example: Create

```ts
const listen = await client.Listen().create({
  url: 'example_url',
})
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `stt` | `any[]` |  |
| `tts` | `any[]` |  |

#### Example: Load

```ts
const model = await client.Model().load({ id: 'model_id' })
```

#### Example: List

```ts
const models = await client.Model().list()
```


### Project

Create an instance: `const project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `mip_opt_out` | `boolean` | Model Improvement Program opt-out |
| `name` | `string` | The name of the project |
| `project_id` | `string` | The unique identifier of the project |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list()
```


### ProjectBalanceV1

Create an instance: `const project_balance_v1 = client.ProjectBalanceV1()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The amount of the balance |
| `balance_id` | `string` | The unique identifier of the balance |
| `purchase_order_id` | `string` | Description or reference of the purchase |
| `units` | `string` | The units of the balance, such as "USD" |

#### Example: Load

```ts
const project_balance_v1 = await client.ProjectBalanceV1().load({ balance_id: 'balance_id', project_id: 'project_id' })
```


### ProjectDistributionCredentialsV1

Create an instance: `const project_distribution_credentials_v1 = client.ProjectDistributionCredentialsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `distribution_credentials` | `Record<string, any>` |  |
| `member` | `Record<string, any>` |  |

#### Example: Load

```ts
const project_distribution_credentials_v1 = await client.ProjectDistributionCredentialsV1().load({ distribution_credentials_id: 'distribution_credentials_id', project_id: 'project_id' })
```


### ProjectInviteV1

Create an instance: `const project_invite_v1 = client.ProjectInviteV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectKeyV1

Create an instance: `const project_key_v1 = client.ProjectKeyV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectKeyV1ResponseItem

Create an instance: `const project_key_v1_response_item = client.ProjectKeyV1ResponseItem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `member` | `Record<string, any>` |  |

#### Example: Load

```ts
const project_key_v1_response_item = await client.ProjectKeyV1ResponseItem().load({ key_id: 'key_id', project_id: 'project_id' })
```


### ProjectMemberV1

Create an instance: `const project_member_v1 = client.ProjectMemberV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectRequest

Create an instance: `const project_request = client.ProjectRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_id` | `string` | The unique identifier of the API key |
| `callback` | `string` | The callback URL for the request |
| `code` | `number` | The response code of the request |
| `created` | `string` | The date and time the request was created |
| `deployment` | `string` | The deployment type |
| `id` | `string` |  |
| `path` | `string` | The API path of the request |
| `project_uuid` | `string` | The unique identifier of the project |
| `request_id` | `string` | The unique identifier of the request |
| `response` | `Record<string, any>` | The response of the request |

#### Example: Load

```ts
const project_request = await client.ProjectRequest().load({ id: 'project_request_id', project_id: 'project_id' })
```

#### Example: List

```ts
const project_requests = await client.ProjectRequest().list({ id: "example" })
```


### Read

Create an instance: `const read = client.Read()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | `Record<string, any>` |  |
| `results` | `Record<string, any>` |  |

#### Example: Create

```ts
const read = await client.Read().create({
  metadata: {},
  results: {},
})
```


### Speak

Create an instance: `const speak = client.Speak()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request_id` | `string` | Unique identifier for tracking the asynchronous request |
| `text` | `string` | The text content to be converted to speech. |

#### Example: Create

```ts
const speak = await client.Speak().create({
  model: 'example_model',
  request_id: 'example_request_id',
  text: 'example_text',
})
```


### UpdateProjectMemberScopesV1

Create an instance: `const update_project_member_scopes_v1 = client.UpdateProjectMemberScopesV1()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` | confirmation message |
| `scope` | `string` | A scope to update |


### UpdateProjectV1

Create an instance: `const update_project_v1 = client.UpdateProjectV1()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `string` | confirmation message |
| `name` | `string` | The name of the project |


### Usage

Create an instance: `const usage = client.Usage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end` | `string` |  |
| `resolution` | `Record<string, any>` |  |
| `start` | `string` |  |

#### Example: Load

```ts
const usage = await client.Usage().load({ project_id: 'project_id' })
```


### UsageBreakdownV1

Create an instance: `const usage_breakdown_v1 = client.UsageBreakdownV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_hours` | `string` | Agent hours used |
| `grouping` | `Record<string, any>` |  |
| `hours` | `string` | Audio hours processed |
| `requests` | `number` | Number of requests |
| `tokens_in` | `number` | Number of input tokens |
| `tokens_out` | `number` | Number of output tokens |
| `total_hours` | `string` | Total hours including all processing |
| `tts_characters` | `number` | Number of text-to-speech characters processed |

#### Example: List

```ts
const usage_breakdown_v1s = await client.UsageBreakdownV1().list({ project_id: "example" })
```


### UsageFieldsV1

Create an instance: `const usage_fields_v1 = client.UsageFieldsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `language` | `string` | The language supported by the model (IETF language tag). |
| `model_id` | `string` | Unique identifier for the model. |
| `name` | `string` | Name of the model. |
| `version` | `string` | Version identifier of the model, typically with a date and a revision number. |

#### Example: List

```ts
const usage_fields_v1s = await client.UsageFieldsV1().list({ project_id: "example" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `agent_think_models_v1` | `models` | 5 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
deepgram/
├── src/
│   ├── DeepgramSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DeepgramSDK } from '@hussainali7858/deepgram-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const projectbalancev1 = client.ProjectBalanceV1()
await projectbalancev1.load({ balance_id: "example", project_id: "example" })

// projectbalancev1.data() now returns the projectbalancev1 data from the last `load`
// projectbalancev1.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
