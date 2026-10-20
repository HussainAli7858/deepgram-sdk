# REST API

The REST API.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 35 entities and 50 HTTP routes. There are 2 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Agent

Results: A list of agent configurations; An agent configuration; Agent configuration deleted; Agent configuration updated.

SDK operations: `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `agent_id`: The unique identifier of the agent configuration
- `config`: The agent configuration object
- `created_at`: Timestamp when the configuration was created
- `metadata`: A map of arbitrary key-value pairs for labeling or organizing the agent configuration
- `updated_at`: Timestamp when the configuration was last updated

### AgentThinkModelsV1

Results: List of available think models.

SDK operations: `list`.

### AgentVariable

Results: Agent variable created successfully; A list of agent variables; An agent variable; Agent variable deleted; Agent variable updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `api_version`: API version.
- `created_at`: Timestamp when the variable was created
- `key`: The variable name, following the `DG_`&lt;`VARIABLE_NAME`&gt; format
- `updated_at`: Timestamp when the variable was last updated
- `value`: The value to substitute. Can be any valid JSON type

### BillingBreakdownV1

Results: Billing breakdown response.

SDK operations: `list`.

Key fields to recognise:

- `dollars`: USD cost of the billing for this grouping

### CreateAgentConfigurationV1

Results: Agent configuration created successfully.

SDK operations: `create`.

Key fields to recognise:

- `agent_id`: The unique identifier of the newly created agent configuration
- `api_version`: API version.
- `config`: The parsed agent configuration object
- `metadata`: Metadata associated with the agent configuration

### CreateKeyV1

Results: API key created successfully.

SDK operations: `create`.

Key fields to recognise:

- `api_key_id`: The unique identifier of the API key
- `comment`: A comment for the API key
- `expiration_date`: The expiration date of the API key
- `key`: The API key
- `scopes`: The scopes for the API key

### CreateProjectDistributionCredentialsV1

Results: Single distribution credential.

SDK operations: `create`.

Key fields to recognise:

- `comment`: Optional comment about the credentials

### CreateProjectInviteV1

Results: The invite was successfully generated.

SDK operations: `create`.

Key fields to recognise:

- `email`: The email address of the invitee
- `message`: confirmation message
- `scope`: The scope of the invitee

### Grant

Results: Grant response.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: JSON Web Token (JWT)
- `expires_in`: Time in seconds until the JWT expires
- `ttl_seconds`: Time to live in seconds for the token.

### ListBillingFieldsV1

Results: A list of billing fields for a specific project.

SDK operations: `list`.

Key fields to recognise:

- `accessors`: List of accessor UUIDs for the time period
- `deployments`: List of deployment types for the time period
- `line_items`: Map of line item names to human-readable descriptions for the time period
- `tags`: List of tags for the time period

### ListModelsV1

Results: A list of models.

SDK operations: `list`.

### ListProjectBalancesV1ResponseBalancesItem

Results: A list of outstanding balances.

SDK operations: `list`.

Key fields to recognise:

- `amount`: The amount of the balance
- `balance_id`: The unique identifier of the balance
- `purchase_order_id`: Description or reference of the purchase
- `units`: The units of the balance, such as &quot;USD&quot;

### ListProjectDistributionCredentialsV1ResponseDistribution

Results: A list of distribution credentials for a specific project.

SDK operations: `list`.

Key fields to recognise:

- `distribution_credentials`: Array of distribution credentials with associated member information

### ListProjectInvitesV1ResponseInvitesItem

Results: A list of invites for a specific project.

SDK operations: `list`.

Key fields to recognise:

- `email`: The email address of the invitee
- `scope`: The scope of the invitee

### ListProjectKeysV1ResponseApiKeysItem

Results: A list of API keys.

SDK operations: `list`.

### ListProjectMemberScopesV1

Results: A list of scopes for a specific member.

SDK operations: `list`.

Key fields to recognise:

- `scopes`: The API scopes of the member

### ListProjectMembersV1ResponseMembersItem

Results: A list of members for a given project.

SDK operations: `list`.

Key fields to recognise:

- `member_id`: The unique identifier of the member
- `scopes`: The API scopes of the member

### ListProjectPurchasesV1ResponseOrdersItem

Results: A list of purchases for a specific project.

SDK operations: `list`.

### Listen

Results: Returns either transcription results, or a `request_id` when using a callback.

SDK operations: `create`.

### Model

Results: A list of models; A model object that can be either STT or TTS.

SDK operations: `list`, `load`.

### Project

Results: A list of projects; A project; Successfully removed account from project.

SDK operations: `list`, `load`, `remove`.

Key fields to recognise:

- `mip_opt_out`: Model Improvement Program opt-out
- `name`: The name of the project
- `project_id`: The unique identifier of the project

### ProjectBalanceV1

Results: A specific balance.

SDK operations: `load`.

Key fields to recognise:

- `amount`: The amount of the balance
- `balance_id`: The unique identifier of the balance
- `purchase_order_id`: Description or reference of the purchase
- `units`: The units of the balance, such as &quot;USD&quot;

### ProjectDistributionCredentialsV1

Results: Single distribution credential.

SDK operations: `load`, `remove`.

### ProjectInviteV1

Results: The invite was successfully deleted.

SDK operations: `remove`.

### ProjectKeyV1

Results: API key deleted.

SDK operations: `remove`.

### ProjectKeyV1ResponseItem

Results: A specific API key.

SDK operations: `load`.

### ProjectMemberV1

Results: Delete the specific member from the project.

SDK operations: `remove`.

### ProjectRequest

Results: A list of requests for a specific project; A specific request for a specific project.

SDK operations: `list`, `load`.

Key fields to recognise:

- `api_key_id`: The unique identifier of the API key
- `callback`: The callback URL for the request
- `code`: The response code of the request
- `created`: The date and time the request was created
- `deployment`: The deployment type

### Read

Results: Successful text analysis.

SDK operations: `create`.

### Speak

Results: Returns the synthesized audio in the requested encoding as a binary stream. When a `callback` URL is supplied, the request is processed asynchronously and the response body is instead a JSON acknowledgement (Content-Type `application/json`) of the form &#123;&quot;`request_id`&quot;: &quot;...&quot;&#125;, with the audio delivered to the callback URL. Because this endpoint is typed as a binary audio stream, SDK callers that set `callback` receive this JSON acknowledgement through the audio byte iterator as raw bytes and must join the chunks and parse `request_id` themselves.; Successful text-to-speech transformation.

SDK operations: `create`.

Key fields to recognise:

- `request_id`: Unique identifier for tracking the asynchronous request
- `text`: The text content to be converted to speech.

### UpdateProjectMemberScopesV1

Results: Updated the scopes for a specific member.

SDK operations: `update`.

Key fields to recognise:

- `message`: confirmation message
- `scope`: A scope to update

### UpdateProjectV1

Results: A project.

SDK operations: `update`.

Key fields to recognise:

- `message`: confirmation message
- `name`: The name of the project

### Usage

Results: A specific request for a specific project.

SDK operations: `load`.

### UsageBreakdownV1

Results: Usage breakdown response.

SDK operations: `list`.

Key fields to recognise:

- `agent_hours`: Agent hours used
- `hours`: Audio hours processed
- `requests`: Number of requests
- `tokens_in`: Number of input tokens
- `tokens_out`: Number of output tokens

### UsageFieldsV1

Results: A list of fields for a specific project.

SDK operations: `list`.

Key fields to recognise:

- `language`: The language supported by the model (IETF language tag).
- `model_id`: Unique identifier for the model.
- `name`: Name of the model.
- `version`: Version identifier of the model, typically with a date and a revision number.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Agent | `list` | `GET /v1/projects/{project_id}/agents` | Required |
| Agent | `load` | `GET /v1/projects/{project_id}/agents/{agent_id}` | Required |
| Agent | `remove` | `DELETE /v1/projects/{project_id}/agents/{agent_id}` | Required |
| Agent | `update` | `PUT /v1/projects/{project_id}/agents/{agent_id}` | Required |
| AgentThinkModelsV1 | `list` | `GET /v1/agent/settings/think/models` | See reference |
| AgentVariable | `create` | `POST /v1/projects/{project_id}/agent-variables` | Required |
| AgentVariable | `list` | `GET /v1/projects/{project_id}/agent-variables` | Required |
| AgentVariable | `load` | `GET /v1/projects/{project_id}/agent-variables/{variable_id}` | Required |
| AgentVariable | `remove` | `DELETE /v1/projects/{project_id}/agent-variables/{variable_id}` | Required |
| AgentVariable | `update` | `PATCH /v1/projects/{project_id}/agent-variables/{variable_id}` | Required |
| BillingBreakdownV1 | `list` | `GET /v1/projects/{project_id}/billing/breakdown` | Required |
| CreateAgentConfigurationV1 | `create` | `POST /v1/projects/{project_id}/agents` | Required |
| CreateKeyV1 | `create` | `POST /v1/projects/{project_id}/keys` | Required |
| CreateProjectDistributionCredentialsV1 | `create` | `POST /v1/projects/{project_id}/self-hosted/distribution/credentials` | Required |
| CreateProjectInviteV1 | `create` | `POST /v1/projects/{project_id}/invites` | Required |
| Grant | `create` | `POST /v1/auth/grant` | Required |
| ListBillingFieldsV1 | `list` | `GET /v1/projects/{project_id}/billing/fields` | Required |
| ListModelsV1 | `list` | `GET /v1/projects/{project_id}/models` | Required |
| ListProjectBalancesV1ResponseBalancesItem | `list` | `GET /v1/projects/{project_id}/balances` | Required |
| ListProjectDistributionCredentialsV1ResponseDistribution | `list` | `GET /v1/projects/{project_id}/self-hosted/distribution/credentials` | Required |
| ListProjectInvitesV1ResponseInvitesItem | `list` | `GET /v1/projects/{project_id}/invites` | Required |
| ListProjectKeysV1ResponseApiKeysItem | `list` | `GET /v1/projects/{project_id}/keys` | Required |
| ListProjectMemberScopesV1 | `list` | `GET /v1/projects/{project_id}/members/{member_id}/scopes` | Required |
| ListProjectMembersV1ResponseMembersItem | `list` | `GET /v1/projects/{project_id}/members` | Required |
| ListProjectPurchasesV1ResponseOrdersItem | `list` | `GET /v1/projects/{project_id}/purchases` | Required |
| Listen | `create` | `POST /v1/listen` | Required |
| Model | `list` | `GET /v1/models` | Required |
| Model | `load` | `GET /v1/projects/{project_id}/models/{model_id}` | Required |
| Model | `load` | `GET /v1/models/{model_id}` | Required |
| Project | `list` | `GET /v1/projects` | Required |
| Project | `load` | `GET /v1/projects/{project_id}` | Required |
| Project | `remove` | `DELETE /v1/projects/{project_id}` | Required |
| Project | `remove` | `DELETE /v1/projects/{project_id}/leave` | Required |
| ProjectBalanceV1 | `load` | `GET /v1/projects/{project_id}/balances/{balance_id}` | Required |
| ProjectDistributionCredentialsV1 | `load` | `GET /v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}` | Required |
| ProjectDistributionCredentialsV1 | `remove` | `DELETE /v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}` | Required |
| ProjectInviteV1 | `remove` | `DELETE /v1/projects/{project_id}/invites/{email}` | Required |
| ProjectKeyV1 | `remove` | `DELETE /v1/projects/{project_id}/keys/{key_id}` | Required |
| ProjectKeyV1ResponseItem | `load` | `GET /v1/projects/{project_id}/keys/{key_id}` | Required |
| ProjectMemberV1 | `remove` | `DELETE /v1/projects/{project_id}/members/{member_id}` | Required |
| ProjectRequest | `list` | `GET /v1/projects/{project_id}/requests` | Required |
| ProjectRequest | `load` | `GET /v1/projects/{project_id}/requests/{request_id}` | Required |
| Read | `create` | `POST /v1/read` | Required |
| Speak | `create` | `POST /v2/speak` | Required |
| Speak | `create` | `POST /v1/speak` | Required |
| UpdateProjectMemberScopesV1 | `update` | `PUT /v1/projects/{project_id}/members/{member_id}/scopes` | Required |
| UpdateProjectV1 | `update` | `PATCH /v1/projects/{project_id}` | Required |
| Usage | `load` | `GET /v1/projects/{project_id}/usage` | Required |
| UsageBreakdownV1 | `list` | `GET /v1/projects/{project_id}/usage/breakdown` | Required |
| UsageFieldsV1 | `list` | `GET /v1/projects/{project_id}/usage/fields` | Required |

## Connect to the API

- Production: `https://api.deepgram.com`
- Base: `https://agent.deepgram.com`

The default credential is sent in the `Authorization` header with the `Token` prefix.

Use `Authorization: Token &lt;API_KEY&gt;` Example: `Authorization: Token 12345abcdef`

Use `Authorization: Bearer &lt;JWT&gt;` Example: `Authorization: Bearer eyJhbGciOiJ...`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

