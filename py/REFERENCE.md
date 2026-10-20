# Deepgram Python SDK Reference

Complete API reference for the Deepgram Python SDK.


## DeepgramSDK

### Constructor

```python
from deepgram_sdk import DeepgramSDK

client = DeepgramSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DeepgramSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DeepgramSDK.test()
```


### Instance Methods

#### `Agent(data=None)`

Create a new `AgentEntity` instance. Pass `None` for no initial data.

#### `AgentThinkModelsV1(data=None)`

Create a new `AgentThinkModelsV1Entity` instance. Pass `None` for no initial data.

#### `AgentVariable(data=None)`

Create a new `AgentVariableEntity` instance. Pass `None` for no initial data.

#### `BillingBreakdownV1(data=None)`

Create a new `BillingBreakdownV1Entity` instance. Pass `None` for no initial data.

#### `CreateAgentConfigurationV1(data=None)`

Create a new `CreateAgentConfigurationV1Entity` instance. Pass `None` for no initial data.

#### `CreateKeyV1(data=None)`

Create a new `CreateKeyV1Entity` instance. Pass `None` for no initial data.

#### `CreateProjectDistributionCredentialsV1(data=None)`

Create a new `CreateProjectDistributionCredentialsV1Entity` instance. Pass `None` for no initial data.

#### `CreateProjectInviteV1(data=None)`

Create a new `CreateProjectInviteV1Entity` instance. Pass `None` for no initial data.

#### `Grant(data=None)`

Create a new `GrantEntity` instance. Pass `None` for no initial data.

#### `ListBillingFieldsV1(data=None)`

Create a new `ListBillingFieldsV1Entity` instance. Pass `None` for no initial data.

#### `ListModelsV1(data=None)`

Create a new `ListModelsV1Entity` instance. Pass `None` for no initial data.

#### `ListProjectBalancesV1ResponseBalancesItem(data=None)`

Create a new `ListProjectBalancesV1ResponseBalancesItemEntity` instance. Pass `None` for no initial data.

#### `ListProjectDistributionCredentialsV1ResponseDistribution(data=None)`

Create a new `ListProjectDistributionCredentialsV1ResponseDistributionEntity` instance. Pass `None` for no initial data.

#### `ListProjectInvitesV1ResponseInvitesItem(data=None)`

Create a new `ListProjectInvitesV1ResponseInvitesItemEntity` instance. Pass `None` for no initial data.

#### `ListProjectKeysV1ResponseApiKeysItem(data=None)`

Create a new `ListProjectKeysV1ResponseApiKeysItemEntity` instance. Pass `None` for no initial data.

#### `ListProjectMemberScopesV1(data=None)`

Create a new `ListProjectMemberScopesV1Entity` instance. Pass `None` for no initial data.

#### `ListProjectMembersV1ResponseMembersItem(data=None)`

Create a new `ListProjectMembersV1ResponseMembersItemEntity` instance. Pass `None` for no initial data.

#### `ListProjectPurchasesV1ResponseOrdersItem(data=None)`

Create a new `ListProjectPurchasesV1ResponseOrdersItemEntity` instance. Pass `None` for no initial data.

#### `Listen(data=None)`

Create a new `ListenEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `ProjectBalanceV1(data=None)`

Create a new `ProjectBalanceV1Entity` instance. Pass `None` for no initial data.

#### `ProjectDistributionCredentialsV1(data=None)`

Create a new `ProjectDistributionCredentialsV1Entity` instance. Pass `None` for no initial data.

#### `ProjectInviteV1(data=None)`

Create a new `ProjectInviteV1Entity` instance. Pass `None` for no initial data.

#### `ProjectKeyV1(data=None)`

Create a new `ProjectKeyV1Entity` instance. Pass `None` for no initial data.

#### `ProjectKeyV1ResponseItem(data=None)`

Create a new `ProjectKeyV1ResponseItemEntity` instance. Pass `None` for no initial data.

#### `ProjectMemberV1(data=None)`

Create a new `ProjectMemberV1Entity` instance. Pass `None` for no initial data.

#### `ProjectRequest(data=None)`

Create a new `ProjectRequestEntity` instance. Pass `None` for no initial data.

#### `Read(data=None)`

Create a new `ReadEntity` instance. Pass `None` for no initial data.

#### `Speak(data=None)`

Create a new `SpeakEntity` instance. Pass `None` for no initial data.

#### `UpdateProjectMemberScopesV1(data=None)`

Create a new `UpdateProjectMemberScopesV1Entity` instance. Pass `None` for no initial data.

#### `UpdateProjectV1(data=None)`

Create a new `UpdateProjectV1Entity` instance. Pass `None` for no initial data.

#### `Usage(data=None)`

Create a new `UsageEntity` instance. Pass `None` for no initial data.

#### `UsageBreakdownV1(data=None)`

Create a new `UsageBreakdownV1Entity` instance. Pass `None` for no initial data.

#### `UsageFieldsV1(data=None)`

Create a new `UsageFieldsV1Entity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AgentEntity

```python
agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `str` | Yes | The unique identifier of the agent configuration |
| `config` | `dict` | Yes | The agent configuration object |
| `created_at` | `str` | No | Timestamp when the configuration was created |
| `id` | `str` | No |  |
| `metadata` | `dict` | No | A map of arbitrary key-value pairs for labeling or organizing the agent configuration |
| `updated_at` | `str` | No | Timestamp when the configuration was last updated |

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

#### `list(reqmatch=None, ctrl=None) -> list[AgentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Agent().list({"project_id": "example"})
for agent in results:
    print(agent.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Agent().load({"id": "agent_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Agent().remove({"id": "agent_id", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> AgentEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Agent().update({
    "id": "agent_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentThinkModelsV1Entity

```python
agent_think_models_v1 = client.AgentThinkModelsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `models` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AgentThinkModelsV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentThinkModelsV1().list()
for agent_think_models_v1 in results:
    print(agent_think_models_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentThinkModelsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentVariableEntity

```python
agent_variable = client.AgentVariable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_version` | `int` | No | API version. |
| `created_at` | `str` | No | Timestamp when the variable was created |
| `id` | `str` | No |  |
| `key` | `str` | Yes | The variable name, following the DG_<VARIABLE_NAME> format |
| `updated_at` | `str` | No | Timestamp when the variable was last updated |
| `value` | `Any` | Yes | The value to substitute. |
| `variable_id` | `str` | Yes | The unique identifier of the variable |

### Operations

#### `create(reqdata, ctrl=None) -> AgentVariableEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AgentVariable().create({
    "project_id": "example_project_id",  # str
    "key": "example_key",  # str
    "value": "example_value",  # Any
    "variable_id": "example_variable_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AgentVariableEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AgentVariable().list({"project_id": "example"})
for agent_variable in results:
    print(agent_variable.data_get())
```

#### `load(reqmatch, ctrl=None) -> AgentVariableEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AgentVariable().load({"id": "agent_variable_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> AgentVariableEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.AgentVariable().remove({"id": "agent_variable_id", "project_id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> AgentVariableEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.AgentVariable().update({
    "id": "agent_variable_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentVariableEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingBreakdownV1Entity

```python
billing_breakdown_v1 = client.BillingBreakdownV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dollars` | `str` | Yes | USD cost of the billing for this grouping |
| `grouping` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[BillingBreakdownV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BillingBreakdownV1().list({"project_id": "example"})
for billing_breakdown_v1 in results:
    print(billing_breakdown_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingBreakdownV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateAgentConfigurationV1Entity

```python
create_agent_configuration_v1 = client.CreateAgentConfigurationV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_id` | `str` | Yes | The unique identifier of the newly created agent configuration |
| `api_version` | `int` | No | API version. |
| `config` | `dict` | Yes | The parsed agent configuration object |
| `metadata` | `dict` | No | Metadata associated with the agent configuration |

### Operations

#### `create(reqdata, ctrl=None) -> CreateAgentConfigurationV1Entity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateAgentConfigurationV1().create({
    "project_id": "example_project_id",  # str
    "agent_id": "example_agent_id",  # str
    "config": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateAgentConfigurationV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateKeyV1Entity

```python
create_key_v1 = client.CreateKeyV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_id` | `str` | No | The unique identifier of the API key |
| `comment` | `str` | No | A comment for the API key |
| `expiration_date` | `str` | No | The expiration date of the API key |
| `key` | `str` | No | The API key |
| `scopes` | `list` | No | The scopes for the API key |
| `tags` | `list` | No | The tags for the API key |

### Operations

#### `create(reqdata, ctrl=None) -> CreateKeyV1Entity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateKeyV1().create({
    "project_id": "example_project_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateKeyV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateProjectDistributionCredentialsV1Entity

```python
create_project_distribution_credentials_v1 = client.CreateProjectDistributionCredentialsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `str` | No | Optional comment about the credentials |
| `distribution_credentials` | `dict` | Yes |  |
| `member` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> CreateProjectDistributionCredentialsV1Entity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateProjectDistributionCredentialsV1().create({
    "project_id": "example_project_id",  # str
    "distribution_credentials": {},  # dict
    "member": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateProjectDistributionCredentialsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateProjectInviteV1Entity

```python
create_project_invite_v1 = client.CreateProjectInviteV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes | The email address of the invitee |
| `message` | `str` | No | confirmation message |
| `scope` | `str` | Yes | The scope of the invitee |

### Operations

#### `create(reqdata, ctrl=None) -> CreateProjectInviteV1Entity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateProjectInviteV1().create({
    "project_id": "example_project_id",  # str
    "email": "example_email",  # str
    "scope": "example_scope",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateProjectInviteV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GrantEntity

```python
grant = client.Grant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | Yes | JSON Web Token (JWT) |
| `expires_in` | `float` | No | Time in seconds until the JWT expires |
| `ttl_seconds` | `float` | No | Time to live in seconds for the token. |

### Operations

#### `create(reqdata, ctrl=None) -> GrantEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Grant().create({
    "access_token": "example_access_token",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GrantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListBillingFieldsV1Entity

```python
list_billing_fields_v1 = client.ListBillingFieldsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accessors` | `list` | No | List of accessor UUIDs for the time period |
| `deployments` | `list` | No | List of deployment types for the time period |
| `line_items` | `dict` | No | Map of line item names to human-readable descriptions for the time period |
| `tags` | `list` | No | List of tags for the time period |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListBillingFieldsV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListBillingFieldsV1().list({"project_id": "example"})
for list_billing_fields_v1 in results:
    print(list_billing_fields_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListBillingFieldsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListModelsV1Entity

```python
list_models_v1 = client.ListModelsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `stt` | `list` | No |  |
| `tts` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListModelsV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListModelsV1().list({"project_id": "example"})
for list_models_v1 in results:
    print(list_models_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListModelsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectBalancesV1ResponseBalancesItemEntity

```python
list_project_balances_v1_response_balances_item = client.ListProjectBalancesV1ResponseBalancesItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | The amount of the balance |
| `balance_id` | `str` | No | The unique identifier of the balance |
| `purchase_order_id` | `str` | No | Description or reference of the purchase |
| `units` | `str` | No | The units of the balance, such as "USD" |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectBalancesV1ResponseBalancesItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectBalancesV1ResponseBalancesItem().list({"project_id": "example"})
for list_project_balances_v1_response_balances_item in results:
    print(list_project_balances_v1_response_balances_item.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectBalancesV1ResponseBalancesItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectDistributionCredentialsV1ResponseDistributionEntity

```python
list_project_distribution_credentials_v1_response_distribution = client.ListProjectDistributionCredentialsV1ResponseDistribution()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `distribution_credentials` | `dict` | Yes |  |
| `member` | `dict` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectDistributionCredentialsV1ResponseDistributionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectDistributionCredentialsV1ResponseDistribution().list({"project_id": "example"})
for list_project_distribution_credentials_v1_response_distribution in results:
    print(list_project_distribution_credentials_v1_response_distribution.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectDistributionCredentialsV1ResponseDistributionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectInvitesV1ResponseInvitesItemEntity

```python
list_project_invites_v1_response_invites_item = client.ListProjectInvitesV1ResponseInvitesItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No | The email address of the invitee |
| `scope` | `str` | No | The scope of the invitee |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectInvitesV1ResponseInvitesItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectInvitesV1ResponseInvitesItem().list({"project_id": "example"})
for list_project_invites_v1_response_invites_item in results:
    print(list_project_invites_v1_response_invites_item.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectInvitesV1ResponseInvitesItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectKeysV1ResponseApiKeysItemEntity

```python
list_project_keys_v1_response_api_keys_item = client.ListProjectKeysV1ResponseApiKeysItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key` | `dict` | No |  |
| `member` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectKeysV1ResponseApiKeysItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectKeysV1ResponseApiKeysItem().list({"project_id": "example"})
for list_project_keys_v1_response_api_keys_item in results:
    print(list_project_keys_v1_response_api_keys_item.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectKeysV1ResponseApiKeysItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectMemberScopesV1Entity

```python
list_project_member_scopes_v1 = client.ListProjectMemberScopesV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `scopes` | `list` | No | The API scopes of the member |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectMemberScopesV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectMemberScopesV1().list({"member_id": "example", "project_id": "example"})
for list_project_member_scopes_v1 in results:
    print(list_project_member_scopes_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectMemberScopesV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectMembersV1ResponseMembersItemEntity

```python
list_project_members_v1_response_members_item = client.ListProjectMembersV1ResponseMembersItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No |  |
| `first_name` | `str` | No |  |
| `last_name` | `str` | No |  |
| `member_id` | `str` | No | The unique identifier of the member |
| `scopes` | `list` | No | The API scopes of the member |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectMembersV1ResponseMembersItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectMembersV1ResponseMembersItem().list({"project_id": "example"})
for list_project_members_v1_response_members_item in results:
    print(list_project_members_v1_response_members_item.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectMembersV1ResponseMembersItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListProjectPurchasesV1ResponseOrdersItemEntity

```python
list_project_purchases_v1_response_orders_item = client.ListProjectPurchasesV1ResponseOrdersItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `str` | No |  |
| `created` | `str` | No |  |
| `expiration` | `str` | No |  |
| `order_id` | `str` | No |  |
| `order_type` | `str` | No |  |
| `units` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ListProjectPurchasesV1ResponseOrdersItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ListProjectPurchasesV1ResponseOrdersItem().list({"project_id": "example"})
for list_project_purchases_v1_response_orders_item in results:
    print(list_project_purchases_v1_response_orders_item.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListProjectPurchasesV1ResponseOrdersItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListenEntity

```python
listen = client.Listen()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ListenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Listen().create({
    "url": "example_url",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `stt` | `list` | No |  |
| `tts` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ModelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model.data_get())
```

#### `load(reqmatch, ctrl=None) -> ModelEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Model().load({"id": "model_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `mip_opt_out` | `bool` | No | Model Improvement Program opt-out |
| `name` | `str` | No | The name of the project |
| `project_id` | `str` | No | The unique identifier of the project |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Project().list()
for project in results:
    print(project.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Project().load({"id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> ProjectEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Project().remove({"id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectBalanceV1Entity

```python
project_balance_v1 = client.ProjectBalanceV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | The amount of the balance |
| `balance_id` | `str` | No | The unique identifier of the balance |
| `purchase_order_id` | `str` | No | Description or reference of the purchase |
| `units` | `str` | No | The units of the balance, such as "USD" |

### Operations

#### `load(reqmatch, ctrl=None) -> ProjectBalanceV1Entity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectBalanceV1().load({"balance_id": "balance_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectBalanceV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectDistributionCredentialsV1Entity

```python
project_distribution_credentials_v1 = client.ProjectDistributionCredentialsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `distribution_credentials` | `dict` | Yes |  |
| `member` | `dict` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ProjectDistributionCredentialsV1Entity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectDistributionCredentialsV1().load({"distribution_credentials_id": "distribution_credentials_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> ProjectDistributionCredentialsV1Entity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectDistributionCredentialsV1().remove({"distribution_credentials_id": "distribution_credentials_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectDistributionCredentialsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectInviteV1Entity

```python
project_invite_v1 = client.ProjectInviteV1()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> ProjectInviteV1Entity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectInviteV1().remove({"email": "email", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectInviteV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectKeyV1Entity

```python
project_key_v1 = client.ProjectKeyV1()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> ProjectKeyV1Entity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectKeyV1().remove({"key_id": "key_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectKeyV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectKeyV1ResponseItemEntity

```python
project_key_v1_response_item = client.ProjectKeyV1ResponseItem()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `member` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> ProjectKeyV1ResponseItemEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectKeyV1ResponseItem().load({"key_id": "key_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectKeyV1ResponseItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectMemberV1Entity

```python
project_member_v1 = client.ProjectMemberV1()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> ProjectMemberV1Entity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ProjectMemberV1().remove({"member_id": "member_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectMemberV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectRequestEntity

```python
project_request = client.ProjectRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_key_id` | `str` | No | The unique identifier of the API key |
| `callback` | `str` | No | The callback URL for the request |
| `code` | `float` | No | The response code of the request |
| `created` | `str` | No | The date and time the request was created |
| `deployment` | `str` | No | The deployment type |
| `id` | `str` | No |  |
| `path` | `str` | No | The API path of the request |
| `project_uuid` | `str` | No | The unique identifier of the project |
| `request_id` | `str` | No | The unique identifier of the request |
| `response` | `dict` | No | The response of the request |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProjectRequestEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ProjectRequest().list({"id": "example"})
for project_request in results:
    print(project_request.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProjectRequestEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProjectRequest().load({"id": "project_request_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReadEntity

```python
read = client.Read()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `metadata` | `dict` | Yes |  |
| `results` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> ReadEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Read().create({
    "metadata": {},  # dict
    "results": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpeakEntity

```python
speak = client.Speak()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `request_id` | `str` | Yes | Unique identifier for tracking the asynchronous request |
| `text` | `str` | Yes | The text content to be converted to speech. |

### Operations

#### `create(reqdata, ctrl=None) -> SpeakEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Speak().create({
    "model": "example_model",  # str
    "request_id": "example_request_id",  # str
    "text": "example_text",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpeakEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UpdateProjectMemberScopesV1Entity

```python
update_project_member_scopes_v1 = client.UpdateProjectMemberScopesV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `str` | No | confirmation message |
| `scope` | `str` | Yes | A scope to update |

### Operations

#### `update(reqdata, ctrl=None) -> UpdateProjectMemberScopesV1Entity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.UpdateProjectMemberScopesV1().update({
    "member_id": "member_id",
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpdateProjectMemberScopesV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UpdateProjectV1Entity

```python
update_project_v1 = client.UpdateProjectV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `str` | No | confirmation message |
| `name` | `str` | No | The name of the project |

### Operations

#### `update(reqdata, ctrl=None) -> UpdateProjectV1Entity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.UpdateProjectV1().update({
    "project_id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UpdateProjectV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageEntity

```python
usage = client.Usage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `end` | `str` | No |  |
| `resolution` | `dict` | No |  |
| `start` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> UsageEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Usage().load({"project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageBreakdownV1Entity

```python
usage_breakdown_v1 = client.UsageBreakdownV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_hours` | `str` | Yes | Agent hours used |
| `grouping` | `dict` | Yes |  |
| `hours` | `str` | Yes | Audio hours processed |
| `requests` | `float` | Yes | Number of requests |
| `tokens_in` | `float` | Yes | Number of input tokens |
| `tokens_out` | `float` | Yes | Number of output tokens |
| `total_hours` | `str` | Yes | Total hours including all processing |
| `tts_characters` | `float` | Yes | Number of text-to-speech characters processed |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UsageBreakdownV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UsageBreakdownV1().list({"project_id": "example"})
for usage_breakdown_v1 in results:
    print(usage_breakdown_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageBreakdownV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageFieldsV1Entity

```python
usage_fields_v1 = client.UsageFieldsV1()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `language` | `str` | No | The language supported by the model (IETF language tag). |
| `model_id` | `str` | No | Unique identifier for the model. |
| `name` | `str` | No | Name of the model. |
| `version` | `str` | No | Version identifier of the model, typically with a date and a revision number. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UsageFieldsV1Entity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UsageFieldsV1().list({"project_id": "example"})
for usage_fields_v1 in results:
    print(usage_fields_v1.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageFieldsV1Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = DeepgramSDK({
    "feature": {
        "test": {"active": True},
    },
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

