# Deepgram SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Deepgram",
            "slug": "deepgram",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.deepgram.com",
            "auth": {
                "prefix": "Token",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "agent": {},
                "agent_think_models_v1": {},
                "agent_variable": {},
                "billing_breakdown_v1": {},
                "create_agent_configuration_v1": {},
                "create_key_v1": {},
                "create_project_distribution_credentials_v1": {},
                "create_project_invite_v1": {},
                "grant": {},
                "list_billing_fields_v1": {},
                "list_models_v1": {},
                "list_project_balances_v1_response_balances_item": {},
                "list_project_distribution_credentials_v1_response_distribution": {},
                "list_project_invites_v1_response_invites_item": {},
                "list_project_keys_v1_response_api_keys_item": {},
                "list_project_member_scopes_v1": {},
                "list_project_members_v1_response_members_item": {},
                "list_project_purchases_v1_response_orders_item": {},
                "listen": {},
                "model": {},
                "project": {},
                "project_balance_v1": {},
                "project_distribution_credentials_v1": {},
                "project_invite_v1": {},
                "project_key_v1": {},
                "project_key_v1_response_item": {},
                "project_member_v1": {},
                "project_request": {},
                "read": {},
                "speak": {},
                "update_project_member_scopes_v1": {},
                "update_project_v1": {},
                "usage": {},
                "usage_breakdown_v1": {},
                "usage_fields_v1": {},
            },
        },
        "entity": {
      "agent": {
        "fields": [
          {
            "name": "agent_id",
            "title": "Agent Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier of the agent configuration",
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The agent configuration object",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the configuration was created",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "op": {
              "update": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "short": "A map of arbitrary key-value pairs for labeling or organizing the agent configuration",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the configuration was last updated",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "agent",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/agents",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agents",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agents",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.agents`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/agents/{agent_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agents",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agents",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "agent_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "agent_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/agents/{agent_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agents",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agents",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "agent_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "agent_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/v1/projects/{project_id}/agents/{agent_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agents",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agents",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "agent_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "agent_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "agent_think_models_v1": {
        "fields": [
          {
            "name": "models",
            "title": "Models",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "agent_think_models_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/agent/settings/think/models",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "agent",
                  },
                  {
                    "lit": "settings",
                  },
                  {
                    "lit": "think",
                  },
                  {
                    "lit": "models",
                  },
                ],
                "parts": [
                  "v1",
                  "agent",
                  "settings",
                  "think",
                  "models",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.models`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agent_variable": {
        "fields": [
          {
            "name": "api_version",
            "title": "Api Version",
            "type": "`$INTEGER`",
            "short": "API version.",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the variable was created",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "req": True,
            "short": "The variable name, following the DG_<VARIABLE_NAME> format",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the variable was last updated",
            "format": "date-time",
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$ANY`",
            "req": True,
            "short": "The value to substitute.",
          },
          {
            "name": "variable_id",
            "title": "Variable Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier of the variable",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "agent_variable",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/projects/{project_id}/agent-variables",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agent-variables",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agent-variables",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/agent-variables",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agent-variables",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agent-variables",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.variables`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/agent-variables/{variable_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agent-variables",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agent-variables",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "variable_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "variable_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/agent-variables/{variable_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agent-variables",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agent-variables",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "variable_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "variable_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/projects/{project_id}/agent-variables/{variable_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agent-variables",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agent-variables",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "variable_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "variable_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "billing_breakdown_v1": {
        "fields": [
          {
            "name": "dollars",
            "title": "Dollars",
            "type": "`$STRING`",
            "req": True,
            "short": "USD cost of the billing for this grouping",
          },
          {
            "name": "grouping",
            "title": "Grouping",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "billing_breakdown_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/billing/breakdown",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "breakdown",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "billing",
                  "breakdown",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "accessor",
                      "orig": "accessor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "deployment",
                      "orig": "deployment",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "grouping",
                      "orig": "grouping",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "line_item",
                      "orig": "line_item",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "create_agent_configuration_v1": {
        "fields": [
          {
            "name": "agent_id",
            "title": "Agent Id",
            "type": "`$STRING`",
            "req": True,
            "short": "The unique identifier of the newly created agent configuration",
          },
          {
            "name": "api_version",
            "title": "Api Version",
            "type": "`$INTEGER`",
            "short": "API version.",
          },
          {
            "name": "config",
            "title": "Config",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The parsed agent configuration object",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "short": "Metadata associated with the agent configuration",
          },
        ],
        "name": "create_agent_configuration_v1",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/projects/{project_id}/agents",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "agents",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "agents",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "create_key_v1": {
        "fields": [
          {
            "name": "api_key_id",
            "title": "Api Key Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the API key",
          },
          {
            "name": "comment",
            "title": "Comment",
            "type": "`$STRING`",
            "short": "A comment for the API key",
          },
          {
            "name": "expiration_date",
            "title": "Expiration Date",
            "type": "`$STRING`",
            "short": "The expiration date of the API key",
            "format": "date-time",
          },
          {
            "name": "key",
            "title": "Key",
            "type": "`$STRING`",
            "short": "The API key",
          },
          {
            "name": "scopes",
            "title": "Scopes",
            "type": "`$ARRAY`",
            "short": "The scopes for the API key",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "The tags for the API key",
          },
        ],
        "name": "create_key_v1",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/projects/{project_id}/keys",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "keys",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "keys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "create_project_distribution_credentials_v1": {
        "fields": [
          {
            "name": "comment",
            "title": "Comment",
            "type": "`$STRING`",
            "short": "Optional comment about the credentials",
          },
          {
            "name": "distribution_credentials",
            "title": "Distribution Credentials",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "member",
            "title": "Member",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "create_project_distribution_credentials_v1",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/projects/{project_id}/self-hosted/distribution/credentials",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "self-hosted",
                  },
                  {
                    "lit": "distribution",
                  },
                  {
                    "lit": "credentials",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "self-hosted",
                  "distribution",
                  "credentials",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "provider",
                      "orig": "provider",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "quay",
                    },
                    {
                      "name": "scope",
                      "orig": "scopes",
                      "type": "`$ARRAY`",
                      "kind": "query",
                      "example": [
                        "self-hosted:products",
                      ],
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "create_project_invite_v1": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "req": True,
            "short": "The email address of the invitee",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "confirmation message",
          },
          {
            "name": "scope",
            "title": "Scope",
            "type": "`$STRING`",
            "req": True,
            "short": "The scope of the invitee",
          },
        ],
        "name": "create_project_invite_v1",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/projects/{project_id}/invites",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "invites",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "invites",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "grant": {
        "fields": [
          {
            "name": "access_token",
            "title": "Access Token",
            "type": "`$STRING`",
            "req": True,
            "short": "JSON Web Token (JWT)",
          },
          {
            "name": "expires_in",
            "title": "Expires In",
            "type": "`$NUMBER`",
            "short": "Time in seconds until the JWT expires",
            "format": "double",
          },
          {
            "name": "ttl_seconds",
            "title": "Ttl Seconds",
            "type": "`$NUMBER`",
            "short": "Time to live in seconds for the token.",
            "format": "double",
          },
        ],
        "name": "grant",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/auth/grant",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "grant",
                  },
                ],
                "parts": [
                  "v1",
                  "auth",
                  "grant",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "list_billing_fields_v1": {
        "fields": [
          {
            "name": "accessors",
            "title": "Accessors",
            "type": "`$ARRAY`",
            "short": "List of accessor UUIDs for the time period",
          },
          {
            "name": "deployments",
            "title": "Deployments",
            "type": "`$ARRAY`",
            "short": "List of deployment types for the time period",
          },
          {
            "name": "line_items",
            "title": "Line Items",
            "type": "`$OBJECT`",
            "short": "Map of line item names to human-readable descriptions for the time period",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
            "short": "List of tags for the time period",
          },
        ],
        "name": "list_billing_fields_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/billing/fields",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "billing",
                  },
                  {
                    "lit": "fields",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "billing",
                  "fields",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_models_v1": {
        "fields": [
          {
            "name": "stt",
            "title": "Stt",
            "type": "`$ARRAY`",
          },
          {
            "name": "tts",
            "title": "Tts",
            "type": "`$ARRAY`",
          },
        ],
        "name": "list_models_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/models",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "models",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "models",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "include_outdated",
                      "orig": "include_outdated",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_balances_v1_response_balances_item": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "short": "The amount of the balance",
            "format": "double",
          },
          {
            "name": "balance_id",
            "title": "Balance Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the balance",
          },
          {
            "name": "purchase_order_id",
            "title": "Purchase Order Id",
            "type": "`$STRING`",
            "short": "Description or reference of the purchase",
          },
          {
            "name": "units",
            "title": "Units",
            "type": "`$STRING`",
            "short": "The units of the balance, such as \"USD\"",
          },
        ],
        "name": "list_project_balances_v1_response_balances_item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/balances",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "balances",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "balances",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.balances`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_distribution_credentials_v1_response_distribution": {
        "fields": [
          {
            "name": "distribution_credentials",
            "title": "Distribution Credentials",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "member",
            "title": "Member",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "list_project_distribution_credentials_v1_response_distribution",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/self-hosted/distribution/credentials",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "self-hosted",
                  },
                  {
                    "lit": "distribution",
                  },
                  {
                    "lit": "credentials",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "self-hosted",
                  "distribution",
                  "credentials",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.distribution_credentials`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_invites_v1_response_invites_item": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "The email address of the invitee",
          },
          {
            "name": "scope",
            "title": "Scope",
            "type": "`$STRING`",
            "short": "The scope of the invitee",
          },
        ],
        "name": "list_project_invites_v1_response_invites_item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/invites",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "invites",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "invites",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.invites`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_keys_v1_response_api_keys_item": {
        "fields": [
          {
            "name": "api_key",
            "title": "Api Key",
            "type": "`$OBJECT`",
          },
          {
            "name": "member",
            "title": "Member",
            "type": "`$OBJECT`",
          },
        ],
        "name": "list_project_keys_v1_response_api_keys_item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/keys",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "keys",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "keys",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.api_keys`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_member_scopes_v1": {
        "fields": [
          {
            "name": "scopes",
            "title": "Scopes",
            "type": "`$ARRAY`",
            "short": "The API scopes of the member",
          },
        ],
        "name": "list_project_member_scopes_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/members/{member_id}/scopes",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "member_id",
                  },
                  {
                    "lit": "scopes",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "members",
                  "{member_id}",
                  "scopes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.scopes`",
                },
                "args": {
                  "params": [
                    {
                      "name": "member_id",
                      "orig": "member_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "member_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_members_v1_response_members_item": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
          },
          {
            "name": "first_name",
            "title": "First Name",
            "type": "`$STRING`",
          },
          {
            "name": "last_name",
            "title": "Last Name",
            "type": "`$STRING`",
          },
          {
            "name": "member_id",
            "title": "Member Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the member",
          },
          {
            "name": "scopes",
            "title": "Scopes",
            "type": "`$ARRAY`",
            "short": "The API scopes of the member",
          },
        ],
        "name": "list_project_members_v1_response_members_item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/members",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "members",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "members",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.members`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "list_project_purchases_v1_response_orders_item": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "expiration",
            "title": "Expiration",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "order_id",
            "title": "Order Id",
            "type": "`$STRING`",
            "format": "uuid",
          },
          {
            "name": "order_type",
            "title": "Order Type",
            "type": "`$STRING`",
          },
          {
            "name": "units",
            "title": "Units",
            "type": "`$STRING`",
          },
        ],
        "name": "list_project_purchases_v1_response_orders_item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/purchases",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "purchases",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "purchases",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.orders`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "listen": {
        "fields": [
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "format": "uri",
          },
        ],
        "name": "listen",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/listen",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "listen",
                  },
                ],
                "parts": [
                  "v1",
                  "listen",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "POST",
                    },
                    {
                      "name": "custom_intent",
                      "orig": "custom_intent",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent_mode",
                      "orig": "custom_intent_mode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "extended",
                    },
                    {
                      "name": "custom_topic",
                      "orig": "custom_topic",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic_mode",
                      "orig": "custom_topic_mode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "extended",
                    },
                    {
                      "name": "detect_entity",
                      "orig": "detect_entities",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "detect_language",
                      "orig": "detect_language",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "diarize",
                      "orig": "diarize",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "diarize_model",
                      "orig": "diarize_model",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "dictation",
                      "orig": "dictation",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "encoding",
                      "orig": "encoding",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "extra",
                      "orig": "extra",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "filler_word",
                      "orig": "filler_words",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "intent",
                      "orig": "intents",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "keyterm",
                      "orig": "keyterm",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "keyword",
                      "orig": "keywords",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "measurement",
                      "orig": "measurements",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "mip_opt_out",
                      "orig": "mip_opt_out",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "base-general",
                    },
                    {
                      "name": "multichannel",
                      "orig": "multichannel",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "numeral",
                      "orig": "numerals",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "paragraph",
                      "orig": "paragraphs",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "profanity_filter",
                      "orig": "profanity_filter",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "punctuate",
                      "orig": "punctuate",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "redact",
                      "orig": "redact",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "replace",
                      "orig": "replace",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "sentiment",
                      "orig": "sentiment",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "smart_format",
                      "orig": "smart_format",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "summarize",
                      "orig": "summarize",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "topic",
                      "orig": "topics",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "utt_split",
                      "orig": "utt_split",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 0.8,
                    },
                    {
                      "name": "utterance",
                      "orig": "utterances",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "latest",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "model": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "stt",
            "title": "Stt",
            "type": "`$ARRAY`",
          },
          {
            "name": "tts",
            "title": "Tts",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/models",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "models",
                  },
                ],
                "parts": [
                  "v1",
                  "models",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "include_outdated",
                      "orig": "include_outdated",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/models/{model_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "models",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "models",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "model_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "model_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/models/{model_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "models",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "models",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "model_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "model_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "mip_opt_out",
            "title": "Mip Opt Out",
            "type": "`$BOOLEAN`",
            "short": "Model Improvement Program opt-out",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The name of the project",
          },
          {
            "name": "project_id",
            "title": "Project Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the project",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "project",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.projects`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "project_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "project_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/leave",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "leave",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{id}",
                  "leave",
                ],
                "rename": {
                  "param": {
                    "project_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "leave",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "project_balance_v1": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "short": "The amount of the balance",
            "format": "double",
          },
          {
            "name": "balance_id",
            "title": "Balance Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the balance",
          },
          {
            "name": "purchase_order_id",
            "title": "Purchase Order Id",
            "type": "`$STRING`",
            "short": "Description or reference of the purchase",
          },
          {
            "name": "units",
            "title": "Units",
            "type": "`$STRING`",
            "short": "The units of the balance, such as \"USD\"",
          },
        ],
        "name": "project_balance_v1",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/balances/{balance_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "balances",
                  },
                  {
                    "var": "balance_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "balances",
                  "{balance_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "balance_id",
                      "orig": "balance_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "balance_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_distribution_credentials_v1": {
        "fields": [
          {
            "name": "distribution_credentials",
            "title": "Distribution Credentials",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "member",
            "title": "Member",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "project_distribution_credentials_v1",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "self-hosted",
                  },
                  {
                    "lit": "distribution",
                  },
                  {
                    "lit": "credentials",
                  },
                  {
                    "var": "distribution_credentials_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "self-hosted",
                  "distribution",
                  "credentials",
                  "{distribution_credentials_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "distribution_credentials_id",
                      "orig": "distribution_credentials_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "distribution_credentials_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/self-hosted/distribution/credentials/{distribution_credentials_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "self-hosted",
                  },
                  {
                    "lit": "distribution",
                  },
                  {
                    "lit": "credentials",
                  },
                  {
                    "var": "distribution_credentials_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "self-hosted",
                  "distribution",
                  "credentials",
                  "{distribution_credentials_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "distribution_credentials_id",
                      "orig": "distribution_credentials_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "distribution_credentials_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_invite_v1": {
        "fields": [],
        "name": "project_invite_v1",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/invites/{email}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "invites",
                  },
                  {
                    "var": "email",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "invites",
                  "{email}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "email",
                      "orig": "email",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "email",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_key_v1": {
        "fields": [],
        "name": "project_key_v1",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/keys/{key_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "var": "key_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "keys",
                  "{key_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key_id",
                      "orig": "key_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_key_v1_response_item": {
        "fields": [
          {
            "name": "member",
            "title": "Member",
            "type": "`$OBJECT`",
          },
        ],
        "name": "project_key_v1_response_item",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/keys/{key_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "var": "key_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "keys",
                  "{key_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.item`",
                },
                "args": {
                  "params": [
                    {
                      "name": "key_id",
                      "orig": "key_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "key_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_member_v1": {
        "fields": [],
        "name": "project_member_v1",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/v1/projects/{project_id}/members/{member_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "member_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "members",
                  "{member_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "member_id",
                      "orig": "member_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "member_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "project_request": {
        "fields": [
          {
            "name": "api_key_id",
            "title": "Api Key Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the API key",
          },
          {
            "name": "callback",
            "title": "Callback",
            "type": "`$STRING`",
            "short": "The callback URL for the request",
          },
          {
            "name": "code",
            "title": "Code",
            "type": "`$NUMBER`",
            "short": "The response code of the request",
            "format": "double",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
            "short": "The date and time the request was created",
            "format": "date-time",
          },
          {
            "name": "deployment",
            "title": "Deployment",
            "type": "`$STRING`",
            "short": "The deployment type",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "path",
            "title": "Path",
            "type": "`$STRING`",
            "short": "The API path of the request",
          },
          {
            "name": "project_uuid",
            "title": "Project Uuid",
            "type": "`$STRING`",
            "short": "The unique identifier of the project",
          },
          {
            "name": "request_id",
            "title": "Request Id",
            "type": "`$STRING`",
            "short": "The unique identifier of the request",
          },
          {
            "name": "response",
            "title": "Response",
            "type": "`$OBJECT`",
            "short": "The response of the request",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "project_request",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/requests",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "requests",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{id}",
                  "requests",
                ],
                "rename": {
                  "param": {
                    "project_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.requests`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "accessor",
                      "orig": "accessor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "deployment",
                      "orig": "deployment",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "endpoint",
                      "orig": "endpoint",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "method",
                      "orig": "method",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "request_id",
                      "orig": "request_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/requests/{request_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "requests",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "requests",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "request_id": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.request`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "request_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "read": {
        "fields": [
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "read",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/read",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "read",
                  },
                ],
                "parts": [
                  "v1",
                  "read",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "POST",
                    },
                    {
                      "name": "custom_intent",
                      "orig": "custom_intent",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent_mode",
                      "orig": "custom_intent_mode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "extended",
                    },
                    {
                      "name": "custom_topic",
                      "orig": "custom_topic",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic_mode",
                      "orig": "custom_topic_mode",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "extended",
                    },
                    {
                      "name": "intent",
                      "orig": "intents",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "sentiment",
                      "orig": "sentiment",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "summarize",
                      "orig": "summarize",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                    {
                      "name": "topic",
                      "orig": "topics",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "speak": {
        "fields": [
          {
            "name": "request_id",
            "title": "Request Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for tracking the asynchronous request",
            "format": "uuid",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
            "short": "The text content to be converted to speech.",
          },
        ],
        "name": "speak",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v2/speak",
                "segments": [
                  {
                    "lit": "v2",
                  },
                  {
                    "lit": "speak",
                  },
                ],
                "parts": [
                  "v2",
                  "speak",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bit_rate",
                      "orig": "bit_rate",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": 48000,
                    },
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "POST",
                    },
                    {
                      "name": "container",
                      "orig": "container",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "wav",
                    },
                    {
                      "name": "encoding",
                      "orig": "encoding",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "mp3",
                    },
                    {
                      "name": "expressivity",
                      "orig": "expressivity",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "mip_opt_out",
                      "orig": "mip_opt_out",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "priority",
                      "orig": "priority",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "sample_rate",
                      "orig": "sample_rate",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": 24000,
                    },
                    {
                      "name": "speed",
                      "orig": "speed",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "model",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/v1/speak",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "speak",
                  },
                ],
                "parts": [
                  "v1",
                  "speak",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bit_rate",
                      "orig": "bit_rate",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": 48000,
                    },
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "POST",
                    },
                    {
                      "name": "container",
                      "orig": "container",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "wav",
                    },
                    {
                      "name": "encoding",
                      "orig": "encoding",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": "mp3",
                    },
                    {
                      "name": "mip_opt_out",
                      "orig": "mip_opt_out",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "aura-asteria-en",
                    },
                    {
                      "name": "sample_rate",
                      "orig": "sample_rate",
                      "type": "`$ANY`",
                      "kind": "query",
                      "example": 24000,
                    },
                    {
                      "name": "speed",
                      "orig": "speed",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$ANY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "update_project_member_scopes_v1": {
        "fields": [
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "confirmation message",
          },
          {
            "name": "scope",
            "title": "Scope",
            "type": "`$STRING`",
            "req": True,
            "short": "A scope to update",
          },
        ],
        "name": "update_project_member_scopes_v1",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/v1/projects/{project_id}/members/{member_id}/scopes",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "member_id",
                  },
                  {
                    "lit": "scopes",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "members",
                  "{member_id}",
                  "scopes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "member_id",
                      "orig": "member_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "member_id",
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "update_project_v1": {
        "fields": [
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "short": "confirmation message",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The name of the project",
          },
        ],
        "name": "update_project_v1",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/v1/projects/{project_id}",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "usage": {
        "fields": [
          {
            "name": "end",
            "title": "End",
            "type": "`$STRING`",
            "format": "date",
          },
          {
            "name": "resolution",
            "title": "Resolution",
            "type": "`$OBJECT`",
          },
          {
            "name": "start",
            "title": "Start",
            "type": "`$STRING`",
            "format": "date",
          },
        ],
        "name": "usage",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/usage",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "usage",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "usage",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "accessor",
                      "orig": "accessor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "alternative",
                      "orig": "alternatives",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "channel",
                      "orig": "channels",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent",
                      "orig": "custom_intent",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent_mode",
                      "orig": "custom_intent_mode",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic",
                      "orig": "custom_topic",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic_mode",
                      "orig": "custom_topic_mode",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "deployment",
                      "orig": "deployment",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "detect_entity",
                      "orig": "detect_entities",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "detect_language",
                      "orig": "detect_language",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "diarize",
                      "orig": "diarize",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "dictation",
                      "orig": "dictation",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "encoding",
                      "orig": "encoding",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "endpoint",
                      "orig": "endpoint",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "extra",
                      "orig": "extra",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "filler_word",
                      "orig": "filler_words",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "intent",
                      "orig": "intents",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "keyterm",
                      "orig": "keyterm",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "keyword",
                      "orig": "keywords",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "measurement",
                      "orig": "measurements",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "method",
                      "orig": "method",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "multichannel",
                      "orig": "multichannel",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "numeral",
                      "orig": "numerals",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "paragraph",
                      "orig": "paragraphs",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "profanity_filter",
                      "orig": "profanity_filter",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "punctuate",
                      "orig": "punctuate",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "redact",
                      "orig": "redact",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "replace",
                      "orig": "replace",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "sample_rate",
                      "orig": "sample_rate",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "sentiment",
                      "orig": "sentiment",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "smart_format",
                      "orig": "smart_format",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "summarize",
                      "orig": "summarize",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "topic",
                      "orig": "topics",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "utt_split",
                      "orig": "utt_split",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "utterance",
                      "orig": "utterances",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "usage_breakdown_v1": {
        "fields": [
          {
            "name": "agent_hours",
            "title": "Agent Hours",
            "type": "`$STRING`",
            "req": True,
            "short": "Agent hours used",
          },
          {
            "name": "grouping",
            "title": "Grouping",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "hours",
            "title": "Hours",
            "type": "`$STRING`",
            "req": True,
            "short": "Audio hours processed",
          },
          {
            "name": "requests",
            "title": "Requests",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Number of requests",
            "format": "double",
          },
          {
            "name": "tokens_in",
            "title": "Tokens In",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Number of input tokens",
            "format": "double",
          },
          {
            "name": "tokens_out",
            "title": "Tokens Out",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Number of output tokens",
            "format": "double",
          },
          {
            "name": "total_hours",
            "title": "Total Hours",
            "type": "`$STRING`",
            "req": True,
            "short": "Total hours including all processing",
          },
          {
            "name": "tts_characters",
            "title": "Tts Characters",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Number of text-to-speech characters processed",
            "format": "double",
          },
        ],
        "name": "usage_breakdown_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/usage/breakdown",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "breakdown",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "usage",
                  "breakdown",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "accessor",
                      "orig": "accessor",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "alternative",
                      "orig": "alternatives",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "callback_method",
                      "orig": "callback_method",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "channel",
                      "orig": "channels",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent",
                      "orig": "custom_intent",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_intent_mode",
                      "orig": "custom_intent_mode",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic",
                      "orig": "custom_topic",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "custom_topic_mode",
                      "orig": "custom_topic_mode",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "deployment",
                      "orig": "deployment",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "detect_entity",
                      "orig": "detect_entities",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "detect_language",
                      "orig": "detect_language",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "diarize",
                      "orig": "diarize",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "dictation",
                      "orig": "dictation",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "encoding",
                      "orig": "encoding",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "endpoint",
                      "orig": "endpoint",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "extra",
                      "orig": "extra",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "filler_word",
                      "orig": "filler_words",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "grouping",
                      "orig": "grouping",
                      "type": "`$STRING`",
                      "kind": "query",
                      "field": True,
                    },
                    {
                      "name": "intent",
                      "orig": "intents",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "keyterm",
                      "orig": "keyterm",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "keyword",
                      "orig": "keywords",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "measurement",
                      "orig": "measurements",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "method",
                      "orig": "method",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "multichannel",
                      "orig": "multichannel",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "numeral",
                      "orig": "numerals",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "paragraph",
                      "orig": "paragraphs",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "profanity_filter",
                      "orig": "profanity_filter",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "punctuate",
                      "orig": "punctuate",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "redact",
                      "orig": "redact",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "replace",
                      "orig": "replace",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "sample_rate",
                      "orig": "sample_rate",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "sentiment",
                      "orig": "sentiment",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "smart_format",
                      "orig": "smart_format",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "summarize",
                      "orig": "summarize",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "topic",
                      "orig": "topics",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "utt_split",
                      "orig": "utt_split",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "utterance",
                      "orig": "utterances",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
      "usage_fields_v1": {
        "fields": [
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
            "short": "The language supported by the model (IETF language tag).",
          },
          {
            "name": "model_id",
            "title": "Model Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the model.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the model.",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "short": "Version identifier of the model, typically with a date and a revision number.",
          },
        ],
        "name": "usage_fields_v1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/projects/{project_id}/usage/fields",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "projects",
                  },
                  {
                    "var": "project_id",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "fields",
                  },
                ],
                "parts": [
                  "v1",
                  "projects",
                  "{project_id}",
                  "usage",
                  "fields",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.models`",
                },
                "args": {
                  "params": [
                    {
                      "name": "project_id",
                      "orig": "project_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end",
                      "orig": "end",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start",
                      "orig": "start",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "project_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.project",
            ],
          ],
        },
      },
    },
    }
