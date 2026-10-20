import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "agent",
    "accessor": "Agent",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/agents",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "agents": [
        {
          "agent_id": "x",
          "config": {},
          "metadata": {},
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "agent",
    "accessor": "Agent",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/agents/{agent_id}",
    "args": [
      {
        "name": "id",
        "wire": "agent_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "agent_id": "x",
      "config": {},
      "metadata": {},
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "agent",
    "accessor": "Agent",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/agents/{agent_id}",
    "args": [
      {
        "name": "id",
        "wire": "agent_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "agent",
    "accessor": "Agent",
    "op": "update",
    "method": "PUT",
    "path": "/v1/projects/{project_id}/agents/{agent_id}",
    "args": [
      {
        "name": "id",
        "wire": "agent_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "agent_id": "x",
      "config": {},
      "metadata": {},
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "agent_think_models_v1",
    "accessor": "AgentThinkModelsV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/agent/settings/think/models",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "models": [
        {
          "id": "gpt-5",
          "name": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "agent_variable",
    "accessor": "AgentVariable",
    "op": "create",
    "method": "POST",
    "path": "/v1/projects/{project_id}/agent-variables",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "variable_id": "x",
      "key": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "agent_variable",
    "accessor": "AgentVariable",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/agent-variables",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "variables": [
        {
          "variable_id": "x",
          "key": "x",
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "agent_variable",
    "accessor": "AgentVariable",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/agent-variables/{variable_id}",
    "args": [
      {
        "name": "id",
        "wire": "variable_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "variable_id": "x",
      "key": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "agent_variable",
    "accessor": "AgentVariable",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/agent-variables/{variable_id}",
    "args": [
      {
        "name": "id",
        "wire": "variable_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "agent_variable",
    "accessor": "AgentVariable",
    "op": "update",
    "method": "PATCH",
    "path": "/v1/projects/{project_id}/agent-variables/{variable_id}",
    "args": [
      {
        "name": "id",
        "wire": "variable_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "variable_id": "x",
      "key": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "billing_breakdown_v1",
    "accessor": "BillingBreakdownV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/billing/breakdown",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "accessor": "v1",
      "deployment": "v1",
      "end": "v1",
      "grouping": "v1",
      "line_item": "v1",
      "start": "v1",
      "tag": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end",
      "accessor",
      "deployment",
      "tag",
      "line_item",
      "grouping"
    ],
    "queryArgs": [
      {
        "name": "accessor",
        "wire": "accessor"
      },
      {
        "name": "deployment",
        "wire": "deployment"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "grouping",
        "wire": "grouping"
      },
      {
        "name": "line_item",
        "wire": "line_item"
      },
      {
        "name": "start",
        "wire": "start"
      },
      {
        "name": "tag",
        "wire": "tag"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "start": "2026-01-01",
      "end": "2026-01-01",
      "resolution": {
        "units": "x",
        "amount": 1
      },
      "results": [
        {
          "dollars": "x",
          "grouping": {
            "start": "2026-01-01",
            "end": "2026-01-01",
            "accessor": "x",
            "deployment": "x",
            "line_item": "x",
            "tags": [
              "x"
            ]
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "create_agent_configuration_v1",
    "accessor": "CreateAgentConfigurationV1",
    "op": "create",
    "method": "POST",
    "path": "/v1/projects/{project_id}/agents",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "agent_id": "x",
      "config": {},
      "metadata": {}
    },
    "idField": "id"
  },
  {
    "entity": "create_key_v1",
    "accessor": "CreateKeyV1",
    "op": "create",
    "method": "POST",
    "path": "/v1/projects/{project_id}/keys",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "api_key_id": "x",
      "key": "x",
      "comment": "x",
      "scopes": [
        "x"
      ],
      "tags": [
        "x"
      ],
      "expiration_date": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "create_project_distribution_credentials_v1",
    "accessor": "CreateProjectDistributionCredentialsV1",
    "op": "create",
    "method": "POST",
    "path": "/v1/projects/{project_id}/self-hosted/distribution/credentials",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "provider": "quay",
      "scope": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "scopes",
      "provider"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "member": {
        "member_id": "x",
        "email": "x"
      },
      "distribution_credentials": {
        "distribution_credentials_id": "x",
        "provider": "x",
        "comment": "x",
        "scopes": [
          "x"
        ],
        "created": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "create_project_invite_v1",
    "accessor": "CreateProjectInviteV1",
    "op": "create",
    "method": "POST",
    "path": "/v1/projects/{project_id}/invites",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "grant",
    "accessor": "Grant",
    "op": "create",
    "method": "POST",
    "path": "/v1/auth/grant",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "access_token": "x",
      "expires_in": 1
    },
    "idField": "id"
  },
  {
    "entity": "list_billing_fields_v1",
    "accessor": "ListBillingFieldsV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/billing/fields",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end"
    ],
    "queryArgs": [
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "start",
        "wire": "start"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "accessors": [
        "x"
      ],
      "deployments": [
        "hosted"
      ],
      "tags": [
        "x"
      ],
      "line_items": {}
    },
    "idField": "id"
  },
  {
    "entity": "list_models_v1",
    "accessor": "ListModelsV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/models",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "include_outdated": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include_outdated"
    ],
    "queryArgs": [
      {
        "name": "include_outdated",
        "wire": "include_outdated"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "stt": [
        {
          "name": "x",
          "canonical_name": "x",
          "architecture": "x",
          "languages": [
            "x"
          ],
          "version": "x",
          "uuid": "x",
          "batch": true,
          "streaming": true,
          "formatted_output": true
        }
      ],
      "tts": [
        {
          "name": "x",
          "canonical_name": "x",
          "architecture": "x",
          "languages": [
            "x"
          ],
          "version": "x",
          "uuid": "x",
          "metadata": {
            "accent": "x",
            "age": "x",
            "color": "x",
            "image": "x",
            "sample": "x",
            "tags": [
              "x"
            ],
            "use_cases": [
              "x"
            ]
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_balances_v1_response_balances_item",
    "accessor": "ListProjectBalancesV1ResponseBalancesItem",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/balances",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "balances": [
        {
          "balance_id": "x",
          "amount": 1,
          "units": "x",
          "purchase_order_id": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_distribution_credentials_v1_response_distribution",
    "accessor": "ListProjectDistributionCredentialsV1ResponseDistribution",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/self-hosted/distribution/credentials",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "distribution_credentials": [
        {
          "member": {
            "member_id": "x",
            "email": "x"
          },
          "distribution_credentials": {
            "distribution_credentials_id": "x",
            "provider": "x",
            "comment": "x",
            "scopes": [
              "x"
            ],
            "created": "2026-01-01T00:00:00Z"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_invites_v1_response_invites_item",
    "accessor": "ListProjectInvitesV1ResponseInvitesItem",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/invites",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "invites": [
        {
          "email": "x",
          "scope": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_keys_v1_response_api_keys_item",
    "accessor": "ListProjectKeysV1ResponseApiKeysItem",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/keys",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "status": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "status"
    ],
    "queryArgs": [
      {
        "name": "status",
        "wire": "status"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "api_keys": [
        {
          "member": {
            "member_id": "x",
            "email": "x"
          },
          "api_key": {
            "api_key_id": "x",
            "comment": "x",
            "scopes": [
              "x"
            ],
            "created": "2026-01-01T00:00:00Z"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_member_scopes_v1",
    "accessor": "ListProjectMemberScopesV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/members/{member_id}/scopes",
    "args": [
      {
        "name": "member_id",
        "wire": "member_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "scopes": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_members_v1_response_members_item",
    "accessor": "ListProjectMembersV1ResponseMembersItem",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/members",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "members": [
        {
          "member_id": "x",
          "scopes": [
            "x"
          ],
          "email": "x",
          "first_name": "x",
          "last_name": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "list_project_purchases_v1_response_orders_item",
    "accessor": "ListProjectPurchasesV1ResponseOrdersItem",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/purchases",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 10
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "orders": [
        {
          "order_id": "x",
          "expiration": "2026-01-01T00:00:00Z",
          "created": "2026-01-01T00:00:00Z",
          "amount": "x",
          "units": "x",
          "order_type": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "listen",
    "accessor": "Listen",
    "op": "create",
    "method": "POST",
    "path": "/v1/listen",
    "args": [],
    "select": {
      "callback": "v1",
      "callback_method": "POST",
      "custom_intent": "v1",
      "custom_intent_mode": "extended",
      "custom_topic": "v1",
      "custom_topic_mode": "extended",
      "detect_entity": "v1",
      "detect_language": "v1",
      "diarize": "v1",
      "diarize_model": "v1",
      "dictation": "v1",
      "encoding": "v1",
      "extra": "v1",
      "filler_word": "v1",
      "intent": "v1",
      "keyterm": "v1",
      "keyword": "v1",
      "language": "en",
      "measurement": "v1",
      "mip_opt_out": "v1",
      "model": "base-general",
      "multichannel": "v1",
      "numeral": "v1",
      "paragraph": "v1",
      "profanity_filter": "v1",
      "punctuate": "v1",
      "redact": "v1",
      "replace": "v1",
      "search": "v1",
      "sentiment": "v1",
      "smart_format": "v1",
      "summarize": "v1",
      "tag": "v1",
      "topic": "v1",
      "utt_split": 0.8,
      "utterance": "v1",
      "version": "latest"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback",
      "callback_method",
      "extra",
      "sentiment",
      "summarize",
      "tag",
      "topics",
      "custom_topic",
      "custom_topic_mode",
      "intents",
      "custom_intent",
      "custom_intent_mode",
      "detect_entities",
      "detect_language",
      "diarize",
      "diarize_model",
      "dictation",
      "encoding",
      "filler_words",
      "keyterm",
      "keywords",
      "language",
      "measurements",
      "model",
      "multichannel",
      "numerals",
      "paragraphs",
      "profanity_filter",
      "punctuate",
      "redact",
      "replace",
      "search",
      "smart_format",
      "utterances",
      "utt_split",
      "version",
      "mip_opt_out"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "metadata": {
        "transaction_key": "x",
        "request_id": "x",
        "sha256": "x",
        "created": "2026-01-01T00:00:00Z",
        "duration": 1,
        "channels": 1,
        "models": [
          "x"
        ],
        "model_info": {},
        "diarize_info": {
          "model_uuid": "x",
          "arch": "x"
        },
        "summary_info": {
          "model_uuid": "x",
          "input_tokens": 1,
          "output_tokens": 1
        },
        "sentiment_info": {
          "model_uuid": "x",
          "input_tokens": 1,
          "output_tokens": 1
        },
        "topics_info": {
          "model_uuid": "x",
          "input_tokens": 1,
          "output_tokens": 1
        },
        "intents_info": {
          "model_uuid": "x",
          "input_tokens": 1,
          "output_tokens": 1
        },
        "tags": [
          "x"
        ]
      },
      "results": {
        "channels": [
          {
            "search": [
              {}
            ],
            "alternatives": [
              {}
            ],
            "detected_language": "x"
          }
        ],
        "utterances": [
          {
            "start": "x",
            "end": "x",
            "confidence": "x",
            "channel": 1,
            "transcript": "x",
            "words": [
              {}
            ],
            "speaker": 1,
            "id": "x"
          }
        ],
        "summary": {
          "result": "x",
          "short": "x"
        },
        "topics": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "topics": []
            }
          ]
        },
        "intents": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "intents": []
            }
          ]
        },
        "sentiments": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "sentiment": "x",
              "sentiment_score": 1
            }
          ],
          "average": {
            "sentiment": "x",
            "sentiment_score": 1
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "list",
    "method": "GET",
    "path": "/v1/models",
    "args": [],
    "select": {
      "include_outdated": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "include_outdated"
    ],
    "queryArgs": [
      {
        "name": "include_outdated",
        "wire": "include_outdated"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "stt": [
        {
          "name": "x",
          "canonical_name": "x",
          "architecture": "x",
          "languages": [
            "x"
          ],
          "version": "x",
          "uuid": "x",
          "batch": true,
          "streaming": true,
          "formatted_output": true
        }
      ],
      "tts": [
        {
          "name": "x",
          "canonical_name": "x",
          "architecture": "x",
          "languages": [
            "x"
          ],
          "version": "x",
          "uuid": "x",
          "metadata": {
            "accent": "x",
            "age": "x",
            "color": "x",
            "image": "x",
            "sample": "x",
            "tags": [
              "x"
            ],
            "use_cases": [
              "x"
            ]
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/models/{model_id}",
    "args": [
      {
        "name": "id",
        "wire": "model_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "canonical_name": "x",
      "architecture": "x",
      "languages": [
        "x"
      ],
      "version": "x",
      "uuid": "x",
      "batch": true,
      "streaming": true,
      "formatted_output": true
    },
    "idField": "id"
  },
  {
    "entity": "model",
    "accessor": "Model",
    "op": "load",
    "method": "GET",
    "path": "/v1/models/{model_id}",
    "args": [
      {
        "name": "id",
        "wire": "model_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "name": "x",
      "canonical_name": "x",
      "architecture": "x",
      "languages": [
        "x"
      ],
      "version": "x",
      "uuid": "x",
      "batch": true,
      "streaming": true,
      "formatted_output": true
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "projects": [
        {
          "project_id": "x",
          "name": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "limit": 10,
      "page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "limit",
      "page"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "page",
        "wire": "page"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "project_id": "x",
      "mip_opt_out": true,
      "name": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project",
    "accessor": "Project",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/leave",
    "action": "leave",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project_balance_v1",
    "accessor": "ProjectBalanceV1",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/balances/{balance_id}",
    "args": [
      {
        "name": "balance_id",
        "wire": "balance_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "balance_id": "x",
      "amount": 1,
      "units": "x",
      "purchase_order_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project_distribution_credentials_v1",
    "accessor": "ProjectDistributionCredentialsV1",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}",
    "args": [
      {
        "name": "distribution_credentials_id",
        "wire": "distribution_credentials_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "member": {
        "member_id": "x",
        "email": "x"
      },
      "distribution_credentials": {
        "distribution_credentials_id": "x",
        "provider": "x",
        "comment": "x",
        "scopes": [
          "x"
        ],
        "created": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "project_distribution_credentials_v1",
    "accessor": "ProjectDistributionCredentialsV1",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}",
    "args": [
      {
        "name": "distribution_credentials_id",
        "wire": "distribution_credentials_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "member": {
        "member_id": "x",
        "email": "x"
      },
      "distribution_credentials": {
        "distribution_credentials_id": "x",
        "provider": "x",
        "comment": "x",
        "scopes": [
          "x"
        ],
        "created": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "project_invite_v1",
    "accessor": "ProjectInviteV1",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/invites/{email}",
    "args": [
      {
        "name": "email",
        "wire": "email",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project_key_v1",
    "accessor": "ProjectKeyV1",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/keys/{key_id}",
    "args": [
      {
        "name": "key_id",
        "wire": "key_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project_key_v1_response_item",
    "accessor": "ProjectKeyV1ResponseItem",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/keys/{key_id}",
    "args": [
      {
        "name": "key_id",
        "wire": "key_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "item": {
        "member": {
          "member_id": "x",
          "email": "x",
          "first_name": "x",
          "last_name": "x",
          "api_key": {
            "api_key_id": "x",
            "comment": "x",
            "scopes": [
              "x"
            ],
            "tags": [
              "x"
            ],
            "expiration_date": "2026-01-01T00:00:00Z",
            "created": "2026-01-01T00:00:00Z"
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "project_member_v1",
    "accessor": "ProjectMemberV1",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/projects/{project_id}/members/{member_id}",
    "args": [
      {
        "name": "member_id",
        "wire": "member_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "project_request",
    "accessor": "ProjectRequest",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/requests",
    "args": [
      {
        "name": "id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "accessor": "v1",
      "deployment": "v1",
      "end": "v1",
      "endpoint": "v1",
      "limit": 10,
      "method": "v1",
      "page": "v1",
      "request_id": "v1",
      "start": "v1",
      "status": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end",
      "limit",
      "page",
      "accessor",
      "request_id",
      "deployment",
      "endpoint",
      "method",
      "status"
    ],
    "queryArgs": [
      {
        "name": "accessor",
        "wire": "accessor"
      },
      {
        "name": "deployment",
        "wire": "deployment"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "endpoint",
        "wire": "endpoint"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "method",
        "wire": "method"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "request_id",
        "wire": "request_id"
      },
      {
        "name": "start",
        "wire": "start"
      },
      {
        "name": "status",
        "wire": "status"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "limit": 1,
      "requests": [
        {
          "request_id": "x",
          "project_uuid": "x",
          "created": "2026-01-01T00:00:00Z",
          "path": "x",
          "api_key_id": "x",
          "response": {},
          "code": 1,
          "deployment": "x",
          "callback": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "project_request",
    "accessor": "ProjectRequest",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/requests/{request_id}",
    "args": [
      {
        "name": "id",
        "wire": "request_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "request": {
        "request_id": "x",
        "project_uuid": "x",
        "created": "2026-01-01T00:00:00Z",
        "path": "x",
        "api_key_id": "x",
        "response": {},
        "code": 1,
        "deployment": "x",
        "callback": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "read",
    "accessor": "Read",
    "op": "create",
    "method": "POST",
    "path": "/v1/read",
    "args": [],
    "select": {
      "callback": "v1",
      "callback_method": "POST",
      "custom_intent": "v1",
      "custom_intent_mode": "extended",
      "custom_topic": "v1",
      "custom_topic_mode": "extended",
      "intent": "v1",
      "language": "en",
      "sentiment": "v1",
      "summarize": "v1",
      "tag": "v1",
      "topic": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback",
      "callback_method",
      "sentiment",
      "summarize",
      "tag",
      "topics",
      "custom_topic",
      "custom_topic_mode",
      "intents",
      "custom_intent",
      "custom_intent_mode",
      "language"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "metadata": {
        "metadata": {
          "request_id": "x",
          "created": "2026-01-01T00:00:00Z",
          "language": "x",
          "summary_info": {
            "model_uuid": "x",
            "input_tokens": 1,
            "output_tokens": 1
          },
          "sentiment_info": {
            "model_uuid": "x",
            "input_tokens": 1,
            "output_tokens": 1
          },
          "topics_info": {
            "model_uuid": "x",
            "input_tokens": 1,
            "output_tokens": 1
          },
          "intents_info": {
            "model_uuid": "x",
            "input_tokens": 1,
            "output_tokens": 1
          }
        }
      },
      "results": {
        "summary": {
          "results": {
            "summary": {
              "text": "x"
            }
          }
        },
        "topics": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "topics": [
                {}
              ]
            }
          ]
        },
        "intents": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "intents": [
                {}
              ]
            }
          ]
        },
        "sentiments": {
          "segments": [
            {
              "text": "x",
              "start_word": 1,
              "end_word": 1,
              "sentiment": "x",
              "sentiment_score": 1
            }
          ],
          "average": {
            "sentiment": "x",
            "sentiment_score": 1
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "speak",
    "accessor": "Speak",
    "op": "create",
    "method": "POST",
    "path": "/v2/speak",
    "args": [],
    "select": {
      "model": "v1",
      "bit_rate": 48000,
      "callback": "v1",
      "callback_method": "POST",
      "container": "wav",
      "encoding": "mp3",
      "expressivity": 0,
      "mip_opt_out": "v1",
      "priority": "v1",
      "sample_rate": 24000,
      "speed": 1,
      "tag": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback",
      "callback_method",
      "mip_opt_out",
      "tag",
      "bit_rate",
      "container",
      "encoding",
      "expressivity",
      "model",
      "sample_rate",
      "speed",
      "priority"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "request_id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "speak",
    "accessor": "Speak",
    "op": "create",
    "method": "POST",
    "path": "/v1/speak",
    "args": [],
    "select": {
      "bit_rate": 48000,
      "callback": "v1",
      "callback_method": "POST",
      "container": "wav",
      "encoding": "mp3",
      "mip_opt_out": "v1",
      "sample_rate": 24000,
      "speed": 1,
      "tag": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "callback",
      "callback_method",
      "mip_opt_out",
      "tag",
      "bit_rate",
      "container",
      "encoding",
      "model",
      "sample_rate",
      "speed"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "update_project_member_scopes_v1",
    "accessor": "UpdateProjectMemberScopesV1",
    "op": "update",
    "method": "PUT",
    "path": "/v1/projects/{project_id}/members/{member_id}/scopes",
    "args": [
      {
        "name": "member_id",
        "wire": "member_id",
        "value": "p1"
      },
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "update_project_v1",
    "accessor": "UpdateProjectV1",
    "op": "update",
    "method": "PATCH",
    "path": "/v1/projects/{project_id}",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "usage",
    "accessor": "Usage",
    "op": "load",
    "method": "GET",
    "path": "/v1/projects/{project_id}/usage",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "accessor": "v1",
      "alternative": "v1",
      "callback": "v1",
      "callback_method": "v1",
      "channel": "v1",
      "custom_intent": "v1",
      "custom_intent_mode": "v1",
      "custom_topic": "v1",
      "custom_topic_mode": "v1",
      "deployment": "v1",
      "detect_entity": "v1",
      "detect_language": "v1",
      "diarize": "v1",
      "dictation": "v1",
      "encoding": "v1",
      "end": "v1",
      "endpoint": "v1",
      "extra": "v1",
      "filler_word": "v1",
      "intent": "v1",
      "keyterm": "v1",
      "keyword": "v1",
      "language": "v1",
      "measurement": "v1",
      "method": "v1",
      "model": "v1",
      "multichannel": "v1",
      "numeral": "v1",
      "paragraph": "v1",
      "profanity_filter": "v1",
      "punctuate": "v1",
      "redact": "v1",
      "replace": "v1",
      "sample_rate": "v1",
      "search": "v1",
      "sentiment": "v1",
      "smart_format": "v1",
      "start": "v1",
      "summarize": "v1",
      "tag": "v1",
      "topic": "v1",
      "utt_split": "v1",
      "utterance": "v1",
      "version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end",
      "accessor",
      "alternatives",
      "callback_method",
      "callback",
      "channels",
      "custom_intent_mode",
      "custom_intent",
      "custom_topic_mode",
      "custom_topic",
      "deployment",
      "detect_entities",
      "detect_language",
      "diarize",
      "dictation",
      "encoding",
      "endpoint",
      "extra",
      "filler_words",
      "intents",
      "keyterm",
      "keywords",
      "language",
      "measurements",
      "method",
      "model",
      "multichannel",
      "numerals",
      "paragraphs",
      "profanity_filter",
      "punctuate",
      "redact",
      "replace",
      "sample_rate",
      "search",
      "sentiment",
      "smart_format",
      "summarize",
      "tag",
      "topics",
      "utt_split",
      "utterances",
      "version"
    ],
    "queryArgs": [
      {
        "name": "accessor",
        "wire": "accessor"
      },
      {
        "name": "alternative",
        "wire": "alternatives"
      },
      {
        "name": "callback",
        "wire": "callback"
      },
      {
        "name": "callback_method",
        "wire": "callback_method"
      },
      {
        "name": "channel",
        "wire": "channels"
      },
      {
        "name": "custom_intent",
        "wire": "custom_intent"
      },
      {
        "name": "custom_intent_mode",
        "wire": "custom_intent_mode"
      },
      {
        "name": "custom_topic",
        "wire": "custom_topic"
      },
      {
        "name": "custom_topic_mode",
        "wire": "custom_topic_mode"
      },
      {
        "name": "deployment",
        "wire": "deployment"
      },
      {
        "name": "detect_entity",
        "wire": "detect_entities"
      },
      {
        "name": "detect_language",
        "wire": "detect_language"
      },
      {
        "name": "diarize",
        "wire": "diarize"
      },
      {
        "name": "dictation",
        "wire": "dictation"
      },
      {
        "name": "encoding",
        "wire": "encoding"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "endpoint",
        "wire": "endpoint"
      },
      {
        "name": "extra",
        "wire": "extra"
      },
      {
        "name": "filler_word",
        "wire": "filler_words"
      },
      {
        "name": "intent",
        "wire": "intents"
      },
      {
        "name": "keyterm",
        "wire": "keyterm"
      },
      {
        "name": "keyword",
        "wire": "keywords"
      },
      {
        "name": "language",
        "wire": "language"
      },
      {
        "name": "measurement",
        "wire": "measurements"
      },
      {
        "name": "method",
        "wire": "method"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "multichannel",
        "wire": "multichannel"
      },
      {
        "name": "numeral",
        "wire": "numerals"
      },
      {
        "name": "paragraph",
        "wire": "paragraphs"
      },
      {
        "name": "profanity_filter",
        "wire": "profanity_filter"
      },
      {
        "name": "punctuate",
        "wire": "punctuate"
      },
      {
        "name": "redact",
        "wire": "redact"
      },
      {
        "name": "replace",
        "wire": "replace"
      },
      {
        "name": "sample_rate",
        "wire": "sample_rate"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sentiment",
        "wire": "sentiment"
      },
      {
        "name": "smart_format",
        "wire": "smart_format"
      },
      {
        "name": "start",
        "wire": "start"
      },
      {
        "name": "summarize",
        "wire": "summarize"
      },
      {
        "name": "tag",
        "wire": "tag"
      },
      {
        "name": "topic",
        "wire": "topics"
      },
      {
        "name": "utt_split",
        "wire": "utt_split"
      },
      {
        "name": "utterance",
        "wire": "utterances"
      },
      {
        "name": "version",
        "wire": "version"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "start": "2026-01-01",
      "end": "2026-01-01",
      "resolution": {
        "units": "x",
        "amount": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "usage_breakdown_v1",
    "accessor": "UsageBreakdownV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/usage/breakdown",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "accessor": "v1",
      "alternative": "v1",
      "callback": "v1",
      "callback_method": "v1",
      "channel": "v1",
      "custom_intent": "v1",
      "custom_intent_mode": "v1",
      "custom_topic": "v1",
      "custom_topic_mode": "v1",
      "deployment": "v1",
      "detect_entity": "v1",
      "detect_language": "v1",
      "diarize": "v1",
      "dictation": "v1",
      "encoding": "v1",
      "end": "v1",
      "endpoint": "v1",
      "extra": "v1",
      "filler_word": "v1",
      "grouping": "v1",
      "intent": "v1",
      "keyterm": "v1",
      "keyword": "v1",
      "language": "v1",
      "measurement": "v1",
      "method": "v1",
      "model": "v1",
      "multichannel": "v1",
      "numeral": "v1",
      "paragraph": "v1",
      "profanity_filter": "v1",
      "punctuate": "v1",
      "redact": "v1",
      "replace": "v1",
      "sample_rate": "v1",
      "search": "v1",
      "sentiment": "v1",
      "smart_format": "v1",
      "start": "v1",
      "summarize": "v1",
      "tag": "v1",
      "topic": "v1",
      "utt_split": "v1",
      "utterance": "v1",
      "version": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end",
      "grouping",
      "accessor",
      "alternatives",
      "callback_method",
      "callback",
      "channels",
      "custom_intent_mode",
      "custom_intent",
      "custom_topic_mode",
      "custom_topic",
      "deployment",
      "detect_entities",
      "detect_language",
      "diarize",
      "dictation",
      "encoding",
      "endpoint",
      "extra",
      "filler_words",
      "intents",
      "keyterm",
      "keywords",
      "language",
      "measurements",
      "method",
      "model",
      "multichannel",
      "numerals",
      "paragraphs",
      "profanity_filter",
      "punctuate",
      "redact",
      "replace",
      "sample_rate",
      "search",
      "sentiment",
      "smart_format",
      "summarize",
      "tag",
      "topics",
      "utt_split",
      "utterances",
      "version"
    ],
    "queryArgs": [
      {
        "name": "accessor",
        "wire": "accessor"
      },
      {
        "name": "alternative",
        "wire": "alternatives"
      },
      {
        "name": "callback",
        "wire": "callback"
      },
      {
        "name": "callback_method",
        "wire": "callback_method"
      },
      {
        "name": "channel",
        "wire": "channels"
      },
      {
        "name": "custom_intent",
        "wire": "custom_intent"
      },
      {
        "name": "custom_intent_mode",
        "wire": "custom_intent_mode"
      },
      {
        "name": "custom_topic",
        "wire": "custom_topic"
      },
      {
        "name": "custom_topic_mode",
        "wire": "custom_topic_mode"
      },
      {
        "name": "deployment",
        "wire": "deployment"
      },
      {
        "name": "detect_entity",
        "wire": "detect_entities"
      },
      {
        "name": "detect_language",
        "wire": "detect_language"
      },
      {
        "name": "diarize",
        "wire": "diarize"
      },
      {
        "name": "dictation",
        "wire": "dictation"
      },
      {
        "name": "encoding",
        "wire": "encoding"
      },
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "endpoint",
        "wire": "endpoint"
      },
      {
        "name": "extra",
        "wire": "extra"
      },
      {
        "name": "filler_word",
        "wire": "filler_words"
      },
      {
        "name": "grouping",
        "wire": "grouping"
      },
      {
        "name": "intent",
        "wire": "intents"
      },
      {
        "name": "keyterm",
        "wire": "keyterm"
      },
      {
        "name": "keyword",
        "wire": "keywords"
      },
      {
        "name": "language",
        "wire": "language"
      },
      {
        "name": "measurement",
        "wire": "measurements"
      },
      {
        "name": "method",
        "wire": "method"
      },
      {
        "name": "model",
        "wire": "model"
      },
      {
        "name": "multichannel",
        "wire": "multichannel"
      },
      {
        "name": "numeral",
        "wire": "numerals"
      },
      {
        "name": "paragraph",
        "wire": "paragraphs"
      },
      {
        "name": "profanity_filter",
        "wire": "profanity_filter"
      },
      {
        "name": "punctuate",
        "wire": "punctuate"
      },
      {
        "name": "redact",
        "wire": "redact"
      },
      {
        "name": "replace",
        "wire": "replace"
      },
      {
        "name": "sample_rate",
        "wire": "sample_rate"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sentiment",
        "wire": "sentiment"
      },
      {
        "name": "smart_format",
        "wire": "smart_format"
      },
      {
        "name": "start",
        "wire": "start"
      },
      {
        "name": "summarize",
        "wire": "summarize"
      },
      {
        "name": "tag",
        "wire": "tag"
      },
      {
        "name": "topic",
        "wire": "topics"
      },
      {
        "name": "utt_split",
        "wire": "utt_split"
      },
      {
        "name": "utterance",
        "wire": "utterances"
      },
      {
        "name": "version",
        "wire": "version"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "start": "2026-01-01",
      "end": "2026-01-01",
      "resolution": {
        "units": "x",
        "amount": 1
      },
      "results": [
        {
          "hours": "x",
          "total_hours": "x",
          "agent_hours": "x",
          "tokens_in": 1,
          "tokens_out": 1,
          "tts_characters": 1,
          "requests": 1,
          "grouping": {
            "start": "2026-01-01",
            "end": "2026-01-01",
            "accessor": "x",
            "endpoint": "x",
            "feature_set": "x",
            "models": [
              "x"
            ],
            "method": "x",
            "tags": [
              "x"
            ],
            "deployment": "x"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "usage_fields_v1",
    "accessor": "UsageFieldsV1",
    "op": "list",
    "method": "GET",
    "path": "/v1/projects/{project_id}/usage/fields",
    "args": [
      {
        "name": "project_id",
        "wire": "project_id",
        "value": "p1"
      }
    ],
    "select": {
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "start",
      "end"
    ],
    "queryArgs": [
      {
        "name": "end",
        "wire": "end"
      },
      {
        "name": "start",
        "wire": "start"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "tags": [
        "x"
      ],
      "models": [
        {
          "name": "x",
          "language": "x",
          "version": "x",
          "model_id": "x"
        }
      ],
      "processing_methods": [
        "x"
      ],
      "features": [
        "x"
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
