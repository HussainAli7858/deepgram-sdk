# Deepgram TypeScript SDK Reference

Complete API reference for the Deepgram TypeScript SDK.


## DeepgramSDK

### Constructor

```ts
new DeepgramSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeepgramSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DeepgramSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DeepgramSDK` instance in test mode.


### Instance Methods

#### `Agent(data?: object)`

Create a new `Agent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentEntity` instance.

#### `AgentThinkModelsV1(data?: object)`

Create a new `AgentThinkModelsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentThinkModelsV1Entity` instance.

#### `AgentVariable(data?: object)`

Create a new `AgentVariable` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentVariableEntity` instance.

#### `BillingBreakdownV1(data?: object)`

Create a new `BillingBreakdownV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingBreakdownV1Entity` instance.

#### `CreateAgentConfigurationV1(data?: object)`

Create a new `CreateAgentConfigurationV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateAgentConfigurationV1Entity` instance.

#### `CreateKeyV1(data?: object)`

Create a new `CreateKeyV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateKeyV1Entity` instance.

#### `CreateProjectDistributionCredentialsV1(data?: object)`

Create a new `CreateProjectDistributionCredentialsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateProjectDistributionCredentialsV1Entity` instance.

#### `CreateProjectInviteV1(data?: object)`

Create a new `CreateProjectInviteV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateProjectInviteV1Entity` instance.

#### `Grant(data?: object)`

Create a new `Grant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GrantEntity` instance.

#### `ListBillingFieldsV1(data?: object)`

Create a new `ListBillingFieldsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListBillingFieldsV1Entity` instance.

#### `ListModelsV1(data?: object)`

Create a new `ListModelsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListModelsV1Entity` instance.

#### `ListProjectBalancesV1ResponseBalancesItem(data?: object)`

Create a new `ListProjectBalancesV1ResponseBalancesItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectBalancesV1ResponseBalancesItemEntity` instance.

#### `ListProjectDistributionCredentialsV1ResponseDistribution(data?: object)`

Create a new `ListProjectDistributionCredentialsV1ResponseDistribution` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectDistributionCredentialsV1ResponseDistributionEntity` instance.

#### `ListProjectInvitesV1ResponseInvitesItem(data?: object)`

Create a new `ListProjectInvitesV1ResponseInvitesItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectInvitesV1ResponseInvitesItemEntity` instance.

#### `ListProjectKeysV1ResponseApiKeysItem(data?: object)`

Create a new `ListProjectKeysV1ResponseApiKeysItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectKeysV1ResponseApiKeysItemEntity` instance.

#### `ListProjectMemberScopesV1(data?: object)`

Create a new `ListProjectMemberScopesV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectMemberScopesV1Entity` instance.

#### `ListProjectMembersV1ResponseMembersItem(data?: object)`

Create a new `ListProjectMembersV1ResponseMembersItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectMembersV1ResponseMembersItemEntity` instance.

#### `ListProjectPurchasesV1ResponseOrdersItem(data?: object)`

Create a new `ListProjectPurchasesV1ResponseOrdersItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListProjectPurchasesV1ResponseOrdersItemEntity` instance.

#### `Listen(data?: object)`

Create a new `Listen` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListenEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `ProjectBalanceV1(data?: object)`

Create a new `ProjectBalanceV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectBalanceV1Entity` instance.

#### `ProjectDistributionCredentialsV1(data?: object)`

Create a new `ProjectDistributionCredentialsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectDistributionCredentialsV1Entity` instance.

#### `ProjectInviteV1(data?: object)`

Create a new `ProjectInviteV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectInviteV1Entity` instance.

#### `ProjectKeyV1(data?: object)`

Create a new `ProjectKeyV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectKeyV1Entity` instance.

#### `ProjectKeyV1ResponseItem(data?: object)`

Create a new `ProjectKeyV1ResponseItem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectKeyV1ResponseItemEntity` instance.

#### `ProjectMemberV1(data?: object)`

Create a new `ProjectMemberV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectMemberV1Entity` instance.

#### `ProjectRequest(data?: object)`

Create a new `ProjectRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectRequestEntity` instance.

#### `Read(data?: object)`

Create a new `Read` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReadEntity` instance.

#### `Speak(data?: object)`

Create a new `Speak` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpeakEntity` instance.

#### `UpdateProjectMemberScopesV1(data?: object)`

Create a new `UpdateProjectMemberScopesV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateProjectMemberScopesV1Entity` instance.

#### `UpdateProjectV1(data?: object)`

Create a new `UpdateProjectV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateProjectV1Entity` instance.

#### `Usage(data?: object)`

Create a new `Usage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageEntity` instance.

#### `UsageBreakdownV1(data?: object)`

Create a new `UsageBreakdownV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageBreakdownV1Entity` instance.

#### `UsageFieldsV1(data?: object)`

Create a new `UsageFieldsV1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageFieldsV1Entity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DeepgramSDK.test()`.

**Returns:** `DeepgramSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AgentEntity

```ts
const agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes | The unique identifier of the agent configuration |
| `config` | `Record<string, any>` | Yes | The agent configuration object |
| `created_at` | `string` | No | Timestamp when the configuration was created |
| `id` | `string` | No |  |
| `metadata` | `Record<string, any>` | No | A map of arbitrary key-value pairs for labeling or organizing the agent configuration |
| `updated_at` | `string` | No | Timestamp when the configuration was last updated |

### Field Usage by Operation

| Field | load | list | update | remove |
| --- | --- | --- | --- | --- |
| `agent_id` | - | - | - | - |
| `config` | - | - | - | - |
| `created_at` | - | - | - | - |
| `id` | - | - | - | - |
| `metadata` | - | - | Yes | - |
| `updated_at` | - | - | - | - |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Agent().list({ project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Agent().load({ id: 'agent_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Agent().remove({ id: 'agent_id', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Agent().update({
  id: 'agent_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentThinkModelsV1Entity

```ts
const agent_think_models_v1 = client.AgentThinkModelsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `models` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentThinkModelsV1().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentThinkModelsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentVariableEntity

```ts
const agent_variable = client.AgentVariable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `number` | No | API version. |
| `created_at` | `string` | No | Timestamp when the variable was created |
| `id` | `string` | No |  |
| `key` | `string` | Yes | The variable name, following the DG_<VARIABLE_NAME> format |
| `updated_at` | `string` | No | Timestamp when the variable was last updated |
| `value` | `any` | Yes | The value to substitute. |
| `variable_id` | `string` | Yes | The unique identifier of the variable |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AgentVariable().create({
  project_id: 'example_project_id',
  key: 'example_key',
  value: 'example_value',
  variable_id: 'example_variable_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AgentVariable().list({ project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AgentVariable().load({ id: 'agent_variable_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.AgentVariable().remove({ id: 'agent_variable_id', project_id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.AgentVariable().update({
  id: 'agent_variable_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentVariableEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingBreakdownV1Entity

```ts
const billing_breakdown_v1 = client.BillingBreakdownV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dollars` | `string` | Yes | USD cost of the billing for this grouping |
| `grouping` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BillingBreakdownV1().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingBreakdownV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateAgentConfigurationV1Entity

```ts
const create_agent_configuration_v1 = client.CreateAgentConfigurationV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `string` | Yes | The unique identifier of the newly created agent configuration |
| `api_version` | `number` | No | API version. |
| `config` | `Record<string, any>` | Yes | The parsed agent configuration object |
| `metadata` | `Record<string, any>` | No | Metadata associated with the agent configuration |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateAgentConfigurationV1().create({
  project_id: 'example_project_id',
  agent_id: 'example_agent_id',
  config: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateAgentConfigurationV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateKeyV1Entity

```ts
const create_key_v1 = client.CreateKeyV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_id` | `string` | No | The unique identifier of the API key |
| `comment` | `string` | No | A comment for the API key |
| `expiration_date` | `string` | No | The expiration date of the API key |
| `key` | `string` | No | The API key |
| `scopes` | `any[]` | No | The scopes for the API key |
| `tags` | `any[]` | No | The tags for the API key |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateKeyV1().create({
  project_id: 'example_project_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateKeyV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateProjectDistributionCredentialsV1Entity

```ts
const create_project_distribution_credentials_v1 = client.CreateProjectDistributionCredentialsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No | Optional comment about the credentials |
| `distribution_credentials` | `Record<string, any>` | Yes |  |
| `member` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateProjectDistributionCredentialsV1().create({
  project_id: 'example_project_id',
  distribution_credentials: {},
  member: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateProjectDistributionCredentialsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateProjectInviteV1Entity

```ts
const create_project_invite_v1 = client.CreateProjectInviteV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | The email address of the invitee |
| `message` | `string` | No | confirmation message |
| `scope` | `string` | Yes | The scope of the invitee |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateProjectInviteV1().create({
  project_id: 'example_project_id',
  email: 'example_email',
  scope: 'example_scope',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateProjectInviteV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GrantEntity

```ts
const grant = client.Grant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes | JSON Web Token (JWT) |
| `expires_in` | `number` | No | Time in seconds until the JWT expires |
| `ttl_seconds` | `number` | No | Time to live in seconds for the token. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Grant().create({
  access_token: 'example_access_token',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GrantEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListBillingFieldsV1Entity

```ts
const list_billing_fields_v1 = client.ListBillingFieldsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessors` | `any[]` | No | List of accessor UUIDs for the time period |
| `deployments` | `any[]` | No | List of deployment types for the time period |
| `line_items` | `Record<string, any>` | No | Map of line item names to human-readable descriptions for the time period |
| `tags` | `any[]` | No | List of tags for the time period |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListBillingFieldsV1().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListBillingFieldsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListModelsV1Entity

```ts
const list_models_v1 = client.ListModelsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stt` | `any[]` | No |  |
| `tts` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListModelsV1().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListModelsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectBalancesV1ResponseBalancesItemEntity

```ts
const list_project_balances_v1_response_balances_item = client.ListProjectBalancesV1ResponseBalancesItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | The amount of the balance |
| `balance_id` | `string` | No | The unique identifier of the balance |
| `purchase_order_id` | `string` | No | Description or reference of the purchase |
| `units` | `string` | No | The units of the balance, such as "USD" |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectBalancesV1ResponseBalancesItem().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectBalancesV1ResponseBalancesItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectDistributionCredentialsV1ResponseDistributionEntity

```ts
const list_project_distribution_credentials_v1_response_distribution = client.ListProjectDistributionCredentialsV1ResponseDistribution()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `distribution_credentials` | `Record<string, any>` | Yes |  |
| `member` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectDistributionCredentialsV1ResponseDistribution().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectDistributionCredentialsV1ResponseDistributionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectInvitesV1ResponseInvitesItemEntity

```ts
const list_project_invites_v1_response_invites_item = client.ListProjectInvitesV1ResponseInvitesItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The email address of the invitee |
| `scope` | `string` | No | The scope of the invitee |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectInvitesV1ResponseInvitesItem().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectInvitesV1ResponseInvitesItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectKeysV1ResponseApiKeysItemEntity

```ts
const list_project_keys_v1_response_api_keys_item = client.ListProjectKeysV1ResponseApiKeysItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `Record<string, any>` | No |  |
| `member` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectKeysV1ResponseApiKeysItem().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectKeysV1ResponseApiKeysItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectMemberScopesV1Entity

```ts
const list_project_member_scopes_v1 = client.ListProjectMemberScopesV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `scopes` | `any[]` | No | The API scopes of the member |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectMemberScopesV1().list({ member_id: "example", project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectMemberScopesV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectMembersV1ResponseMembersItemEntity

```ts
const list_project_members_v1_response_members_item = client.ListProjectMembersV1ResponseMembersItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No |  |
| `first_name` | `string` | No |  |
| `last_name` | `string` | No |  |
| `member_id` | `string` | No | The unique identifier of the member |
| `scopes` | `any[]` | No | The API scopes of the member |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectMembersV1ResponseMembersItem().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectMembersV1ResponseMembersItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListProjectPurchasesV1ResponseOrdersItemEntity

```ts
const list_project_purchases_v1_response_orders_item = client.ListProjectPurchasesV1ResponseOrdersItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `string` | No |  |
| `created` | `string` | No |  |
| `expiration` | `string` | No |  |
| `order_id` | `string` | No |  |
| `order_type` | `string` | No |  |
| `units` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ListProjectPurchasesV1ResponseOrdersItem().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListProjectPurchasesV1ResponseOrdersItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListenEntity

```ts
const listen = client.Listen()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Listen().create({
  url: 'example_url',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListenEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `stt` | `any[]` | No |  |
| `tts` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Model().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Model().load({ id: 'model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `mip_opt_out` | `boolean` | No | Model Improvement Program opt-out |
| `name` | `string` | No | The name of the project |
| `project_id` | `string` | No | The unique identifier of the project |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `leave` | `/v1/projects/{project_id}/leave` | `client.Project().remove({ $action: 'leave', ... })` |

An action returns that action's OWN response, which is not necessarily a
Project record — check the API definition for its shape.

```ts
const result = await client.Project().remove({
  $action: 'leave',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Project().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Project().load({ id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Project().remove({ id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectBalanceV1Entity

```ts
const project_balance_v1 = client.ProjectBalanceV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | The amount of the balance |
| `balance_id` | `string` | No | The unique identifier of the balance |
| `purchase_order_id` | `string` | No | Description or reference of the purchase |
| `units` | `string` | No | The units of the balance, such as "USD" |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectBalanceV1().load({ balance_id: 'balance_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectBalanceV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectDistributionCredentialsV1Entity

```ts
const project_distribution_credentials_v1 = client.ProjectDistributionCredentialsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `distribution_credentials` | `Record<string, any>` | Yes |  |
| `member` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectDistributionCredentialsV1().load({ distribution_credentials_id: 'distribution_credentials_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectDistributionCredentialsV1().remove({ distribution_credentials_id: 'distribution_credentials_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectDistributionCredentialsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectInviteV1Entity

```ts
const project_invite_v1 = client.ProjectInviteV1()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectInviteV1().remove({ email: 'email', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectInviteV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectKeyV1Entity

```ts
const project_key_v1 = client.ProjectKeyV1()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectKeyV1().remove({ key_id: 'key_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectKeyV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectKeyV1ResponseItemEntity

```ts
const project_key_v1_response_item = client.ProjectKeyV1ResponseItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `member` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectKeyV1ResponseItem().load({ key_id: 'key_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectKeyV1ResponseItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectMemberV1Entity

```ts
const project_member_v1 = client.ProjectMemberV1()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ProjectMemberV1().remove({ member_id: 'member_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectMemberV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectRequestEntity

```ts
const project_request = client.ProjectRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_id` | `string` | No | The unique identifier of the API key |
| `callback` | `string` | No | The callback URL for the request |
| `code` | `number` | No | The response code of the request |
| `created` | `string` | No | The date and time the request was created |
| `deployment` | `string` | No | The deployment type |
| `id` | `string` | No |  |
| `path` | `string` | No | The API path of the request |
| `project_uuid` | `string` | No | The unique identifier of the project |
| `request_id` | `string` | No | The unique identifier of the request |
| `response` | `Record<string, any>` | No | The response of the request |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ProjectRequest().list({ id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ProjectRequest().load({ id: 'project_request_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReadEntity

```ts
const read = client.Read()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `metadata` | `Record<string, any>` | Yes |  |
| `results` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Read().create({
  metadata: {},
  results: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReadEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpeakEntity

```ts
const speak = client.Speak()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `request_id` | `string` | Yes | Unique identifier for tracking the asynchronous request |
| `text` | `string` | Yes | The text content to be converted to speech. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Speak().create({
  model: 'example_model',
  request_id: 'example_request_id',
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpeakEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateProjectMemberScopesV1Entity

```ts
const update_project_member_scopes_v1 = client.UpdateProjectMemberScopesV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | No | confirmation message |
| `scope` | `string` | Yes | A scope to update |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.UpdateProjectMemberScopesV1().update({
  member_id: 'member_id',
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateProjectMemberScopesV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateProjectV1Entity

```ts
const update_project_v1 = client.UpdateProjectV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | No | confirmation message |
| `name` | `string` | No | The name of the project |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.UpdateProjectV1().update({
  project_id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateProjectV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageEntity

```ts
const usage = client.Usage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end` | `string` | No |  |
| `resolution` | `Record<string, any>` | No |  |
| `start` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Usage().load({ project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageBreakdownV1Entity

```ts
const usage_breakdown_v1 = client.UsageBreakdownV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_hours` | `string` | Yes | Agent hours used |
| `grouping` | `Record<string, any>` | Yes |  |
| `hours` | `string` | Yes | Audio hours processed |
| `requests` | `number` | Yes | Number of requests |
| `tokens_in` | `number` | Yes | Number of input tokens |
| `tokens_out` | `number` | Yes | Number of output tokens |
| `total_hours` | `string` | Yes | Total hours including all processing |
| `tts_characters` | `number` | Yes | Number of text-to-speech characters processed |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.UsageBreakdownV1().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageBreakdownV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageFieldsV1Entity

```ts
const usage_fields_v1 = client.UsageFieldsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `language` | `string` | No | The language supported by the model (IETF language tag). |
| `model_id` | `string` | No | Unique identifier for the model. |
| `name` | `string` | No | Name of the model. |
| `version` | `string` | No | Version identifier of the model, typically with a date and a revision number. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.UsageFieldsV1().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageFieldsV1Entity` instance with the same client and
options.

#### `client()`

Return the parent `DeepgramSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new DeepgramSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

