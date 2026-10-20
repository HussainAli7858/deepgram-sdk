# Deepgram server routing

The preserved upstream OpenAPI document declares two global servers. SDKGen
uses the first server in its derived model as the default client base and does
not retain a server choice for individual operations.

This project preserves the upstream document unchanged. Its persistent
`.sdk/build/apidef.js` configuration reorders the servers in memory only, so
generated clients default to `https://api.deepgram.com`. This is the correct
host for the account-management API, including `GET /v1/projects`.

The following generated operation must instead be called from a separately
constructed client whose `base` is `https://agent.deepgram.com`:

- `client.AgentThinkModelsV1().list()` — `GET /v1/agent/settings/think/models`

Do not send this operation through the standard API-base client. The operation
is public according to the upstream specification; no API key is needed for
it.
