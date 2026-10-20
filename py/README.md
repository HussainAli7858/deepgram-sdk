# Deepgram Python SDK



The Python SDK for the Deepgram API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Agent()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/HussainAli7858/deepgram-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from deepgram_sdk import DeepgramSDK

client = DeepgramSDK({
    "apikey": os.environ.get("DEEPGRAM_APIKEY"),
})
```

### 2. List agent records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    agents = client.Agent().list({"project_id": "example"})
    for agent in agents:
        print(agent.data_get())
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an agent

Agent is nested under project, so provide the `project_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    agent = client.Agent().load({"project_id": "example_project_id", "id": "example_id"})
    print(agent.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Update
client.Agent().update({"id": "example_id", "project_id": "example_project_id", "agent_id": "example_agent_id"})

# Remove
client.Agent().remove({"id": "example_id", "project_id": "example_project_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    projectbalancev1 = client.ProjectBalanceV1().load({"balance_id": "example", "project_id": "example"})
    print(projectbalancev1.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = DeepgramSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
projectbalancev1 = client.ProjectBalanceV1().load({"balance_id": "example", "project_id": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = DeepgramSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
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
cd py && pytest test/
```


## Reference

### DeepgramSDK

```python
from deepgram_sdk import DeepgramSDK

client = DeepgramSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = DeepgramSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### DeepgramSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `AgentThinkModelsV1` | `(data) -> AgentThinkModelsV1Entity` | Create an AgentThinkModelsV1 entity instance. |
| `AgentVariable` | `(data) -> AgentVariableEntity` | Create an AgentVariable entity instance. |
| `BillingBreakdownV1` | `(data) -> BillingBreakdownV1Entity` | Create a BillingBreakdownV1 entity instance. |
| `CreateAgentConfigurationV1` | `(data) -> CreateAgentConfigurationV1Entity` | Create a CreateAgentConfigurationV1 entity instance. |
| `CreateKeyV1` | `(data) -> CreateKeyV1Entity` | Create a CreateKeyV1 entity instance. |
| `CreateProjectDistributionCredentialsV1` | `(data) -> CreateProjectDistributionCredentialsV1Entity` | Create a CreateProjectDistributionCredentialsV1 entity instance. |
| `CreateProjectInviteV1` | `(data) -> CreateProjectInviteV1Entity` | Create a CreateProjectInviteV1 entity instance. |
| `Grant` | `(data) -> GrantEntity` | Create a Grant entity instance. |
| `ListBillingFieldsV1` | `(data) -> ListBillingFieldsV1Entity` | Create a ListBillingFieldsV1 entity instance. |
| `ListModelsV1` | `(data) -> ListModelsV1Entity` | Create a ListModelsV1 entity instance. |
| `ListProjectBalancesV1ResponseBalancesItem` | `(data) -> ListProjectBalancesV1ResponseBalancesItemEntity` | Create a ListProjectBalancesV1ResponseBalancesItem entity instance. |
| `ListProjectDistributionCredentialsV1ResponseDistribution` | `(data) -> ListProjectDistributionCredentialsV1ResponseDistributionEntity` | Create a ListProjectDistributionCredentialsV1ResponseDistribution entity instance. |
| `ListProjectInvitesV1ResponseInvitesItem` | `(data) -> ListProjectInvitesV1ResponseInvitesItemEntity` | Create a ListProjectInvitesV1ResponseInvitesItem entity instance. |
| `ListProjectKeysV1ResponseApiKeysItem` | `(data) -> ListProjectKeysV1ResponseApiKeysItemEntity` | Create a ListProjectKeysV1ResponseApiKeysItem entity instance. |
| `ListProjectMemberScopesV1` | `(data) -> ListProjectMemberScopesV1Entity` | Create a ListProjectMemberScopesV1 entity instance. |
| `ListProjectMembersV1ResponseMembersItem` | `(data) -> ListProjectMembersV1ResponseMembersItemEntity` | Create a ListProjectMembersV1ResponseMembersItem entity instance. |
| `ListProjectPurchasesV1ResponseOrdersItem` | `(data) -> ListProjectPurchasesV1ResponseOrdersItemEntity` | Create a ListProjectPurchasesV1ResponseOrdersItem entity instance. |
| `Listen` | `(data) -> ListenEntity` | Create a Listen entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `ProjectBalanceV1` | `(data) -> ProjectBalanceV1Entity` | Create a ProjectBalanceV1 entity instance. |
| `ProjectDistributionCredentialsV1` | `(data) -> ProjectDistributionCredentialsV1Entity` | Create a ProjectDistributionCredentialsV1 entity instance. |
| `ProjectInviteV1` | `(data) -> ProjectInviteV1Entity` | Create a ProjectInviteV1 entity instance. |
| `ProjectKeyV1` | `(data) -> ProjectKeyV1Entity` | Create a ProjectKeyV1 entity instance. |
| `ProjectKeyV1ResponseItem` | `(data) -> ProjectKeyV1ResponseItemEntity` | Create a ProjectKeyV1ResponseItem entity instance. |
| `ProjectMemberV1` | `(data) -> ProjectMemberV1Entity` | Create a ProjectMemberV1 entity instance. |
| `ProjectRequest` | `(data) -> ProjectRequestEntity` | Create a ProjectRequest entity instance. |
| `Read` | `(data) -> ReadEntity` | Create a Read entity instance. |
| `Speak` | `(data) -> SpeakEntity` | Create a Speak entity instance. |
| `UpdateProjectMemberScopesV1` | `(data) -> UpdateProjectMemberScopesV1Entity` | Create an UpdateProjectMemberScopesV1 entity instance. |
| `UpdateProjectV1` | `(data) -> UpdateProjectV1Entity` | Create an UpdateProjectV1 entity instance. |
| `Usage` | `(data) -> UsageEntity` | Create an Usage entity instance. |
| `UsageBreakdownV1` | `(data) -> UsageBreakdownV1Entity` | Create an UsageBreakdownV1 entity instance. |
| `UsageFieldsV1` | `(data) -> UsageFieldsV1Entity` | Create an UsageFieldsV1 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Operations: List, Load, Remove, Update.

API path: `/v1/projects/{project_id}/agents`

#### AgentThinkModelsV1

| Field | Description |
| --- | --- |
| `models` |  |

Operations: List.

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

Operations: Create, List, Load, Remove, Update.

API path: `/v1/projects/{project_id}/agent-variables`

#### BillingBreakdownV1

| Field | Description |
| --- | --- |
| `dollars` | USD cost of the billing for this grouping |
| `grouping` |  |

Operations: List.

API path: `/v1/projects/{project_id}/billing/breakdown`

#### CreateAgentConfigurationV1

| Field | Description |
| --- | --- |
| `agent_id` | The unique identifier of the newly created agent configuration |
| `api_version` | API version. |
| `config` | The parsed agent configuration object |
| `metadata` | Metadata associated with the agent configuration |

Operations: Create.

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

Operations: Create.

API path: `/v1/projects/{project_id}/keys`

#### CreateProjectDistributionCredentialsV1

| Field | Description |
| --- | --- |
| `comment` | Optional comment about the credentials |
| `distribution_credentials` |  |
| `member` |  |

Operations: Create.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials`

#### CreateProjectInviteV1

| Field | Description |
| --- | --- |
| `email` | The email address of the invitee |
| `message` | confirmation message |
| `scope` | The scope of the invitee |

Operations: Create.

API path: `/v1/projects/{project_id}/invites`

#### Grant

| Field | Description |
| --- | --- |
| `access_token` | JSON Web Token (JWT) |
| `expires_in` | Time in seconds until the JWT expires |
| `ttl_seconds` | Time to live in seconds for the token. |

Operations: Create.

API path: `/v1/auth/grant`

#### ListBillingFieldsV1

| Field | Description |
| --- | --- |
| `accessors` | List of accessor UUIDs for the time period |
| `deployments` | List of deployment types for the time period |
| `line_items` | Map of line item names to human-readable descriptions for the time period |
| `tags` | List of tags for the time period |

Operations: List.

API path: `/v1/projects/{project_id}/billing/fields`

#### ListModelsV1

| Field | Description |
| --- | --- |
| `stt` |  |
| `tts` |  |

Operations: List.

API path: `/v1/projects/{project_id}/models`

#### ListProjectBalancesV1ResponseBalancesItem

| Field | Description |
| --- | --- |
| `amount` | The amount of the balance |
| `balance_id` | The unique identifier of the balance |
| `purchase_order_id` | Description or reference of the purchase |
| `units` | The units of the balance, such as "USD" |

Operations: List.

API path: `/v1/projects/{project_id}/balances`

#### ListProjectDistributionCredentialsV1ResponseDistribution

| Field | Description |
| --- | --- |
| `distribution_credentials` |  |
| `member` |  |

Operations: List.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials`

#### ListProjectInvitesV1ResponseInvitesItem

| Field | Description |
| --- | --- |
| `email` | The email address of the invitee |
| `scope` | The scope of the invitee |

Operations: List.

API path: `/v1/projects/{project_id}/invites`

#### ListProjectKeysV1ResponseApiKeysItem

| Field | Description |
| --- | --- |
| `api_key` |  |
| `member` |  |

Operations: List.

API path: `/v1/projects/{project_id}/keys`

#### ListProjectMemberScopesV1

| Field | Description |
| --- | --- |
| `scopes` | The API scopes of the member |

Operations: List.

API path: `/v1/projects/{project_id}/members/{member_id}/scopes`

#### ListProjectMembersV1ResponseMembersItem

| Field | Description |
| --- | --- |
| `email` |  |
| `first_name` |  |
| `last_name` |  |
| `member_id` | The unique identifier of the member |
| `scopes` | The API scopes of the member |

Operations: List.

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

Operations: List.

API path: `/v1/projects/{project_id}/purchases`

#### Listen

| Field | Description |
| --- | --- |
| `url` |  |

Operations: Create.

API path: `/v1/listen`

#### Model

| Field | Description |
| --- | --- |
| `id` |  |
| `stt` |  |
| `tts` |  |

Operations: List, Load.

API path: `/v1/models`

#### Project

| Field | Description |
| --- | --- |
| `id` |  |
| `mip_opt_out` | Model Improvement Program opt-out |
| `name` | The name of the project |
| `project_id` | The unique identifier of the project |

Operations: List, Load, Remove.

API path: `/v1/projects`

#### ProjectBalanceV1

| Field | Description |
| --- | --- |
| `amount` | The amount of the balance |
| `balance_id` | The unique identifier of the balance |
| `purchase_order_id` | Description or reference of the purchase |
| `units` | The units of the balance, such as "USD" |

Operations: Load.

API path: `/v1/projects/{project_id}/balances/{balance_id}`

#### ProjectDistributionCredentialsV1

| Field | Description |
| --- | --- |
| `distribution_credentials` |  |
| `member` |  |

Operations: Load, Remove.

API path: `/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}`

#### ProjectInviteV1

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v1/projects/{project_id}/invites/{email}`

#### ProjectKeyV1

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/v1/projects/{project_id}/keys/{key_id}`

#### ProjectKeyV1ResponseItem

| Field | Description |
| --- | --- |
| `member` |  |

Operations: Load.

API path: `/v1/projects/{project_id}/keys/{key_id}`

#### ProjectMemberV1

| Field | Description |
| --- | --- |

Operations: Remove.

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

Operations: List, Load.

API path: `/v1/projects/{project_id}/requests`

#### Read

| Field | Description |
| --- | --- |
| `metadata` |  |
| `results` |  |

Operations: Create.

API path: `/v1/read`

#### Speak

| Field | Description |
| --- | --- |
| `request_id` | Unique identifier for tracking the asynchronous request |
| `text` | The text content to be converted to speech. |

Operations: Create.

API path: `/v2/speak`

#### UpdateProjectMemberScopesV1

| Field | Description |
| --- | --- |
| `message` | confirmation message |
| `scope` | A scope to update |

Operations: Update.

API path: `/v1/projects/{project_id}/members/{member_id}/scopes`

#### UpdateProjectV1

| Field | Description |
| --- | --- |
| `message` | confirmation message |
| `name` | The name of the project |

Operations: Update.

API path: `/v1/projects/{project_id}`

#### Usage

| Field | Description |
| --- | --- |
| `end` |  |
| `resolution` |  |
| `start` |  |

Operations: Load.

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

Operations: List.

API path: `/v1/projects/{project_id}/usage/breakdown`

#### UsageFieldsV1

| Field | Description |
| --- | --- |
| `language` | The language supported by the model (IETF language tag). |
| `model_id` | Unique identifier for the model. |
| `name` | Name of the model. |
| `version` | Version identifier of the model, typically with a date and a revision number. |

Operations: List.

API path: `/v1/projects/{project_id}/usage/fields`



## Entities


### Agent

Create an instance: `agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `str` | The unique identifier of the agent configuration |
| `config` | `dict` | The agent configuration object |
| `created_at` | `str` | Timestamp when the configuration was created |
| `id` | `str` |  |
| `metadata` | `dict` | A map of arbitrary key-value pairs for labeling or organizing the agent configuration |
| `updated_at` | `str` | Timestamp when the configuration was last updated |

#### Example: Load

```python
agent = client.Agent().load({"id": "agent_id", "project_id": "project_id"})
```

#### Example: List

```python
agents = client.Agent().list({"project_id": "example"})
```


### AgentThinkModelsV1

Create an instance: `agent_think_models_v1 = client.AgentThinkModelsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `models` | `list` |  |

#### Example: List

```python
agent_think_models_v1s = client.AgentThinkModelsV1().list()
```


### AgentVariable

Create an instance: `agent_variable = client.AgentVariable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_version` | `int` | API version. |
| `created_at` | `str` | Timestamp when the variable was created |
| `id` | `str` |  |
| `key` | `str` | The variable name, following the DG_<VARIABLE_NAME> format |
| `updated_at` | `str` | Timestamp when the variable was last updated |
| `value` | `Any` | The value to substitute. |
| `variable_id` | `str` | The unique identifier of the variable |

#### Example: Load

```python
agent_variable = client.AgentVariable().load({"id": "agent_variable_id", "project_id": "project_id"})
```

#### Example: List

```python
agent_variables = client.AgentVariable().list({"project_id": "example"})
```

#### Example: Create

```python
agent_variable = client.AgentVariable().create({
    "project_id": "example_project_id",  # str
    "key": "example_key",  # str
    "value": "example_value",  # Any
    "variable_id": "example_variable_id",  # str
})
```


### BillingBreakdownV1

Create an instance: `billing_breakdown_v1 = client.BillingBreakdownV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dollars` | `str` | USD cost of the billing for this grouping |
| `grouping` | `dict` |  |

#### Example: List

```python
billing_breakdown_v1s = client.BillingBreakdownV1().list({"project_id": "example"})
```


### CreateAgentConfigurationV1

Create an instance: `create_agent_configuration_v1 = client.CreateAgentConfigurationV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_id` | `str` | The unique identifier of the newly created agent configuration |
| `api_version` | `int` | API version. |
| `config` | `dict` | The parsed agent configuration object |
| `metadata` | `dict` | Metadata associated with the agent configuration |

#### Example: Create

```python
create_agent_configuration_v1 = client.CreateAgentConfigurationV1().create({
    "project_id": "example_project_id",  # str
    "agent_id": "example_agent_id",  # str
    "config": {},  # dict
})
```


### CreateKeyV1

Create an instance: `create_key_v1 = client.CreateKeyV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_id` | `str` | The unique identifier of the API key |
| `comment` | `str` | A comment for the API key |
| `expiration_date` | `str` | The expiration date of the API key |
| `key` | `str` | The API key |
| `scopes` | `list` | The scopes for the API key |
| `tags` | `list` | The tags for the API key |

#### Example: Create

```python
create_key_v1 = client.CreateKeyV1().create({
    "project_id": "example_project_id",  # str
})
```


### CreateProjectDistributionCredentialsV1

Create an instance: `create_project_distribution_credentials_v1 = client.CreateProjectDistributionCredentialsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `str` | Optional comment about the credentials |
| `distribution_credentials` | `dict` |  |
| `member` | `dict` |  |

#### Example: Create

```python
create_project_distribution_credentials_v1 = client.CreateProjectDistributionCredentialsV1().create({
    "project_id": "example_project_id",  # str
    "distribution_credentials": {},  # dict
    "member": {},  # dict
})
```


### CreateProjectInviteV1

Create an instance: `create_project_invite_v1 = client.CreateProjectInviteV1()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | The email address of the invitee |
| `message` | `str` | confirmation message |
| `scope` | `str` | The scope of the invitee |

#### Example: Create

```python
create_project_invite_v1 = client.CreateProjectInviteV1().create({
    "project_id": "example_project_id",  # str
    "email": "example_email",  # str
    "scope": "example_scope",  # str
})
```


### Grant

Create an instance: `grant = client.Grant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` | JSON Web Token (JWT) |
| `expires_in` | `float` | Time in seconds until the JWT expires |
| `ttl_seconds` | `float` | Time to live in seconds for the token. |

#### Example: Create

```python
grant = client.Grant().create({
    "access_token": "example_access_token",  # str
})
```


### ListBillingFieldsV1

Create an instance: `list_billing_fields_v1 = client.ListBillingFieldsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessors` | `list` | List of accessor UUIDs for the time period |
| `deployments` | `list` | List of deployment types for the time period |
| `line_items` | `dict` | Map of line item names to human-readable descriptions for the time period |
| `tags` | `list` | List of tags for the time period |

#### Example: List

```python
list_billing_fields_v1s = client.ListBillingFieldsV1().list({"project_id": "example"})
```


### ListModelsV1

Create an instance: `list_models_v1 = client.ListModelsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `stt` | `list` |  |
| `tts` | `list` |  |

#### Example: List

```python
list_models_v1s = client.ListModelsV1().list({"project_id": "example"})
```


### ListProjectBalancesV1ResponseBalancesItem

Create an instance: `list_project_balances_v1_response_balances_item = client.ListProjectBalancesV1ResponseBalancesItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The amount of the balance |
| `balance_id` | `str` | The unique identifier of the balance |
| `purchase_order_id` | `str` | Description or reference of the purchase |
| `units` | `str` | The units of the balance, such as "USD" |

#### Example: List

```python
list_project_balances_v1_response_balances_items = client.ListProjectBalancesV1ResponseBalancesItem().list({"project_id": "example"})
```


### ListProjectDistributionCredentialsV1ResponseDistribution

Create an instance: `list_project_distribution_credentials_v1_response_distribution = client.ListProjectDistributionCredentialsV1ResponseDistribution()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `distribution_credentials` | `dict` |  |
| `member` | `dict` |  |

#### Example: List

```python
list_project_distribution_credentials_v1_response_distributions = client.ListProjectDistributionCredentialsV1ResponseDistribution().list({"project_id": "example"})
```


### ListProjectInvitesV1ResponseInvitesItem

Create an instance: `list_project_invites_v1_response_invites_item = client.ListProjectInvitesV1ResponseInvitesItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` | The email address of the invitee |
| `scope` | `str` | The scope of the invitee |

#### Example: List

```python
list_project_invites_v1_response_invites_items = client.ListProjectInvitesV1ResponseInvitesItem().list({"project_id": "example"})
```


### ListProjectKeysV1ResponseApiKeysItem

Create an instance: `list_project_keys_v1_response_api_keys_item = client.ListProjectKeysV1ResponseApiKeysItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key` | `dict` |  |
| `member` | `dict` |  |

#### Example: List

```python
list_project_keys_v1_response_api_keys_items = client.ListProjectKeysV1ResponseApiKeysItem().list({"project_id": "example"})
```


### ListProjectMemberScopesV1

Create an instance: `list_project_member_scopes_v1 = client.ListProjectMemberScopesV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `scopes` | `list` | The API scopes of the member |

#### Example: List

```python
list_project_member_scopes_v1s = client.ListProjectMemberScopesV1().list({"member_id": "example", "project_id": "example"})
```


### ListProjectMembersV1ResponseMembersItem

Create an instance: `list_project_members_v1_response_members_item = client.ListProjectMembersV1ResponseMembersItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `first_name` | `str` |  |
| `last_name` | `str` |  |
| `member_id` | `str` | The unique identifier of the member |
| `scopes` | `list` | The API scopes of the member |

#### Example: List

```python
list_project_members_v1_response_members_items = client.ListProjectMembersV1ResponseMembersItem().list({"project_id": "example"})
```


### ListProjectPurchasesV1ResponseOrdersItem

Create an instance: `list_project_purchases_v1_response_orders_item = client.ListProjectPurchasesV1ResponseOrdersItem()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `str` |  |
| `created` | `str` |  |
| `expiration` | `str` |  |
| `order_id` | `str` |  |
| `order_type` | `str` |  |
| `units` | `str` |  |

#### Example: List

```python
list_project_purchases_v1_response_orders_items = client.ListProjectPurchasesV1ResponseOrdersItem().list({"project_id": "example"})
```


### Listen

Create an instance: `listen = client.Listen()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `url` | `str` |  |

#### Example: Create

```python
listen = client.Listen().create({
    "url": "example_url",  # str
})
```


### Model

Create an instance: `model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `stt` | `list` |  |
| `tts` | `list` |  |

#### Example: Load

```python
model = client.Model().load({"id": "model_id"})
```

#### Example: List

```python
models = client.Model().list()
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `mip_opt_out` | `bool` | Model Improvement Program opt-out |
| `name` | `str` | The name of the project |
| `project_id` | `str` | The unique identifier of the project |

#### Example: Load

```python
project = client.Project().load({"id": "project_id"})
```

#### Example: List

```python
projects = client.Project().list()
```


### ProjectBalanceV1

Create an instance: `project_balance_v1 = client.ProjectBalanceV1()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The amount of the balance |
| `balance_id` | `str` | The unique identifier of the balance |
| `purchase_order_id` | `str` | Description or reference of the purchase |
| `units` | `str` | The units of the balance, such as "USD" |

#### Example: Load

```python
project_balance_v1 = client.ProjectBalanceV1().load({"balance_id": "balance_id", "project_id": "project_id"})
```


### ProjectDistributionCredentialsV1

Create an instance: `project_distribution_credentials_v1 = client.ProjectDistributionCredentialsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `distribution_credentials` | `dict` |  |
| `member` | `dict` |  |

#### Example: Load

```python
project_distribution_credentials_v1 = client.ProjectDistributionCredentialsV1().load({"distribution_credentials_id": "distribution_credentials_id", "project_id": "project_id"})
```


### ProjectInviteV1

Create an instance: `project_invite_v1 = client.ProjectInviteV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectKeyV1

Create an instance: `project_key_v1 = client.ProjectKeyV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectKeyV1ResponseItem

Create an instance: `project_key_v1_response_item = client.ProjectKeyV1ResponseItem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `member` | `dict` |  |

#### Example: Load

```python
project_key_v1_response_item = client.ProjectKeyV1ResponseItem().load({"key_id": "key_id", "project_id": "project_id"})
```


### ProjectMemberV1

Create an instance: `project_member_v1 = client.ProjectMemberV1()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ProjectRequest

Create an instance: `project_request = client.ProjectRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_key_id` | `str` | The unique identifier of the API key |
| `callback` | `str` | The callback URL for the request |
| `code` | `float` | The response code of the request |
| `created` | `str` | The date and time the request was created |
| `deployment` | `str` | The deployment type |
| `id` | `str` |  |
| `path` | `str` | The API path of the request |
| `project_uuid` | `str` | The unique identifier of the project |
| `request_id` | `str` | The unique identifier of the request |
| `response` | `dict` | The response of the request |

#### Example: Load

```python
project_request = client.ProjectRequest().load({"id": "project_request_id", "project_id": "project_id"})
```

#### Example: List

```python
project_requests = client.ProjectRequest().list({"id": "example"})
```


### Read

Create an instance: `read = client.Read()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | `dict` |  |
| `results` | `dict` |  |

#### Example: Create

```python
read = client.Read().create({
    "metadata": {},  # dict
    "results": {},  # dict
})
```


### Speak

Create an instance: `speak = client.Speak()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request_id` | `str` | Unique identifier for tracking the asynchronous request |
| `text` | `str` | The text content to be converted to speech. |

#### Example: Create

```python
speak = client.Speak().create({
    "model": "example_model",  # str
    "request_id": "example_request_id",  # str
    "text": "example_text",  # str
})
```


### UpdateProjectMemberScopesV1

Create an instance: `update_project_member_scopes_v1 = client.UpdateProjectMemberScopesV1()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `str` | confirmation message |
| `scope` | `str` | A scope to update |


### UpdateProjectV1

Create an instance: `update_project_v1 = client.UpdateProjectV1()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `str` | confirmation message |
| `name` | `str` | The name of the project |


### Usage

Create an instance: `usage = client.Usage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `end` | `str` |  |
| `resolution` | `dict` |  |
| `start` | `str` |  |

#### Example: Load

```python
usage = client.Usage().load({"project_id": "project_id"})
```


### UsageBreakdownV1

Create an instance: `usage_breakdown_v1 = client.UsageBreakdownV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_hours` | `str` | Agent hours used |
| `grouping` | `dict` |  |
| `hours` | `str` | Audio hours processed |
| `requests` | `float` | Number of requests |
| `tokens_in` | `float` | Number of input tokens |
| `tokens_out` | `float` | Number of output tokens |
| `total_hours` | `str` | Total hours including all processing |
| `tts_characters` | `float` | Number of text-to-speech characters processed |

#### Example: List

```python
usage_breakdown_v1s = client.UsageBreakdownV1().list({"project_id": "example"})
```


### UsageFieldsV1

Create an instance: `usage_fields_v1 = client.UsageFieldsV1()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `language` | `str` | The language supported by the model (IETF language tag). |
| `model_id` | `str` | Unique identifier for the model. |
| `name` | `str` | Name of the model. |
| `version` | `str` | Version identifier of the model, typically with a date and a revision number. |

#### Example: List

```python
usage_fields_v1s = client.UsageFieldsV1().list({"project_id": "example"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── deepgram_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`deepgram_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
projectbalancev1 = client.ProjectBalanceV1()
projectbalancev1.load({"balance_id": "example", "project_id": "example"})

# projectbalancev1.data_get() now returns the projectbalancev1 data from the last load
# projectbalancev1.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
