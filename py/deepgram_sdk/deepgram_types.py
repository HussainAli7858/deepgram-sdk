# Typed models for the Deepgram SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AgentRequired(TypedDict):
    agent_id: str
    config: dict


class Agent(AgentRequired, total=False):
    created_at: str
    id: str
    metadata: dict
    updated_at: str


class AgentLoadMatch(TypedDict):
    id: str
    project_id: str


class AgentListMatch(TypedDict):
    project_id: str


class AgentUpdateDataRequired(TypedDict):
    id: str
    project_id: str


class AgentUpdateData(AgentUpdateDataRequired, total=False):
    agent_id: str
    config: dict
    created_at: str
    metadata: dict
    updated_at: str


class AgentRemoveMatch(TypedDict):
    id: str
    project_id: str


class AgentThinkModelsV1(TypedDict):
    models: list


class AgentThinkModelsV1ListMatch(TypedDict, total=False):
    models: list


class AgentVariableRequired(TypedDict):
    key: str
    value: Any
    variable_id: str


class AgentVariable(AgentVariableRequired, total=False):
    api_version: int
    created_at: str
    id: str
    updated_at: str


class AgentVariableLoadMatch(TypedDict):
    id: str
    project_id: str


class AgentVariableListMatch(TypedDict):
    project_id: str


class AgentVariableCreateDataRequired(TypedDict):
    project_id: str
    key: str
    value: Any
    variable_id: str


class AgentVariableCreateData(AgentVariableCreateDataRequired, total=False):
    api_version: int
    created_at: str
    id: str
    updated_at: str


class AgentVariableUpdateDataRequired(TypedDict):
    id: str
    project_id: str


class AgentVariableUpdateData(AgentVariableUpdateDataRequired, total=False):
    api_version: int
    created_at: str
    key: str
    updated_at: str
    value: Any
    variable_id: str


class AgentVariableRemoveMatch(TypedDict):
    id: str
    project_id: str


class BillingBreakdownV1(TypedDict):
    dollars: str
    grouping: dict


class BillingBreakdownV1ListMatchRequired(TypedDict):
    project_id: str


class BillingBreakdownV1ListMatch(BillingBreakdownV1ListMatchRequired, total=False):
    accessor: str
    deployment: str
    end: str
    grouping: list
    line_item: str
    start: str
    tag: str


class CreateAgentConfigurationV1Required(TypedDict):
    agent_id: str
    config: dict


class CreateAgentConfigurationV1(CreateAgentConfigurationV1Required, total=False):
    api_version: int
    metadata: dict


class CreateAgentConfigurationV1CreateDataRequired(TypedDict):
    project_id: str
    agent_id: str
    config: dict


class CreateAgentConfigurationV1CreateData(CreateAgentConfigurationV1CreateDataRequired, total=False):
    api_version: int
    metadata: dict


class CreateKeyV1(TypedDict, total=False):
    api_key_id: str
    comment: str
    expiration_date: str
    key: str
    scopes: list
    tags: list


class CreateKeyV1CreateDataRequired(TypedDict):
    project_id: str


class CreateKeyV1CreateData(CreateKeyV1CreateDataRequired, total=False):
    api_key_id: str
    comment: str
    expiration_date: str
    key: str
    scopes: list
    tags: list


class CreateProjectDistributionCredentialsV1Required(TypedDict):
    distribution_credentials: dict
    member: dict


class CreateProjectDistributionCredentialsV1(CreateProjectDistributionCredentialsV1Required, total=False):
    comment: str


class CreateProjectDistributionCredentialsV1CreateDataRequired(TypedDict):
    project_id: str
    distribution_credentials: dict
    member: dict


class CreateProjectDistributionCredentialsV1CreateData(CreateProjectDistributionCredentialsV1CreateDataRequired, total=False):
    provider: str
    scope: list
    comment: str


class CreateProjectInviteV1Required(TypedDict):
    email: str
    scope: str


class CreateProjectInviteV1(CreateProjectInviteV1Required, total=False):
    message: str


class CreateProjectInviteV1CreateDataRequired(TypedDict):
    project_id: str
    email: str
    scope: str


class CreateProjectInviteV1CreateData(CreateProjectInviteV1CreateDataRequired, total=False):
    message: str


class GrantRequired(TypedDict):
    access_token: str


class Grant(GrantRequired, total=False):
    expires_in: float
    ttl_seconds: float


class GrantCreateDataRequired(TypedDict):
    access_token: str


class GrantCreateData(GrantCreateDataRequired, total=False):
    expires_in: float
    ttl_seconds: float


class ListBillingFieldsV1(TypedDict, total=False):
    accessors: list
    deployments: list
    line_items: dict
    tags: list


class ListBillingFieldsV1ListMatchRequired(TypedDict):
    project_id: str


class ListBillingFieldsV1ListMatch(ListBillingFieldsV1ListMatchRequired, total=False):
    end: str
    start: str


class ListModelsV1(TypedDict, total=False):
    stt: list
    tts: list


class ListModelsV1ListMatchRequired(TypedDict):
    project_id: str


class ListModelsV1ListMatch(ListModelsV1ListMatchRequired, total=False):
    include_outdated: bool


class ListProjectBalancesV1ResponseBalancesItem(TypedDict, total=False):
    amount: float
    balance_id: str
    purchase_order_id: str
    units: str


class ListProjectBalancesV1ResponseBalancesItemListMatch(TypedDict):
    project_id: str


class ListProjectDistributionCredentialsV1ResponseDistribution(TypedDict):
    distribution_credentials: dict
    member: dict


class ListProjectDistributionCredentialsV1ResponseDistributionListMatch(TypedDict):
    project_id: str


class ListProjectInvitesV1ResponseInvitesItem(TypedDict, total=False):
    email: str
    scope: str


class ListProjectInvitesV1ResponseInvitesItemListMatch(TypedDict):
    project_id: str


class ListProjectKeysV1ResponseApiKeysItem(TypedDict, total=False):
    api_key: dict
    member: dict


class ListProjectKeysV1ResponseApiKeysItemListMatchRequired(TypedDict):
    project_id: str


class ListProjectKeysV1ResponseApiKeysItemListMatch(ListProjectKeysV1ResponseApiKeysItemListMatchRequired, total=False):
    status: str


class ListProjectMemberScopesV1(TypedDict, total=False):
    scopes: list


class ListProjectMemberScopesV1ListMatch(TypedDict):
    member_id: str
    project_id: str


class ListProjectMembersV1ResponseMembersItem(TypedDict, total=False):
    email: str
    first_name: str
    last_name: str
    member_id: str
    scopes: list


class ListProjectMembersV1ResponseMembersItemListMatch(TypedDict):
    project_id: str


class ListProjectPurchasesV1ResponseOrdersItem(TypedDict, total=False):
    amount: str
    created: str
    expiration: str
    order_id: str
    order_type: str
    units: str


class ListProjectPurchasesV1ResponseOrdersItemListMatchRequired(TypedDict):
    project_id: str


class ListProjectPurchasesV1ResponseOrdersItemListMatch(ListProjectPurchasesV1ResponseOrdersItemListMatchRequired, total=False):
    limit: float


class Listen(TypedDict):
    url: str


class ListenCreateDataRequired(TypedDict):
    url: str


class ListenCreateData(ListenCreateDataRequired, total=False):
    callback: str
    callback_method: str
    custom_intent: Any
    custom_intent_mode: str
    custom_topic: Any
    custom_topic_mode: str
    detect_entity: bool
    detect_language: Any
    diarize: bool
    diarize_model: str
    dictation: bool
    encoding: str
    extra: Any
    filler_word: bool
    intent: bool
    keyterm: list
    keyword: Any
    language: str
    measurement: bool
    mip_opt_out: bool
    model: Any
    multichannel: bool
    numeral: bool
    paragraph: bool
    profanity_filter: bool
    punctuate: bool
    redact: Any
    replace: Any
    search: Any
    sentiment: bool
    smart_format: bool
    summarize: Any
    tag: Any
    topic: bool
    utt_split: float
    utterance: bool
    version: Any


class Model(TypedDict, total=False):
    id: str
    stt: list
    tts: list


class ModelLoadMatchRequired(TypedDict):
    id: str


class ModelLoadMatch(ModelLoadMatchRequired, total=False):
    project_id: str


class ModelListMatch(TypedDict, total=False):
    include_outdated: bool


class Project(TypedDict, total=False):
    id: str
    mip_opt_out: bool
    name: str
    project_id: str


class ProjectLoadMatchRequired(TypedDict):
    id: str


class ProjectLoadMatch(ProjectLoadMatchRequired, total=False):
    limit: float
    page: float


class ProjectListMatch(TypedDict, total=False):
    id: str
    mip_opt_out: bool
    name: str
    project_id: str


class ProjectRemoveMatch(TypedDict):
    id: str


class ProjectBalanceV1(TypedDict, total=False):
    amount: float
    balance_id: str
    purchase_order_id: str
    units: str


class ProjectBalanceV1LoadMatch(TypedDict):
    balance_id: str
    project_id: str


class ProjectDistributionCredentialsV1(TypedDict):
    distribution_credentials: dict
    member: dict


class ProjectDistributionCredentialsV1LoadMatch(TypedDict):
    distribution_credentials_id: str
    project_id: str


class ProjectDistributionCredentialsV1RemoveMatch(TypedDict):
    distribution_credentials_id: str
    project_id: str


class ProjectInviteV1(TypedDict):
    pass


class ProjectInviteV1RemoveMatch(TypedDict):
    email: str
    project_id: str


class ProjectKeyV1(TypedDict):
    pass


class ProjectKeyV1RemoveMatch(TypedDict):
    key_id: str
    project_id: str


class ProjectKeyV1ResponseItem(TypedDict, total=False):
    member: dict


class ProjectKeyV1ResponseItemLoadMatch(TypedDict):
    key_id: str
    project_id: str


class ProjectMemberV1(TypedDict):
    pass


class ProjectMemberV1RemoveMatch(TypedDict):
    member_id: str
    project_id: str


class ProjectRequest(TypedDict, total=False):
    api_key_id: str
    callback: str
    code: float
    created: str
    deployment: str
    id: str
    path: str
    project_uuid: str
    request_id: str
    response: dict


class ProjectRequestLoadMatch(TypedDict):
    id: str
    project_id: str


class ProjectRequestListMatchRequired(TypedDict):
    id: str


class ProjectRequestListMatch(ProjectRequestListMatchRequired, total=False):
    accessor: str
    deployment: str
    end: str
    endpoint: str
    limit: float
    method: str
    page: float
    request_id: str
    start: str
    status: str


class Read(TypedDict):
    metadata: dict
    results: dict


class ReadCreateDataRequired(TypedDict):
    metadata: dict
    results: dict


class ReadCreateData(ReadCreateDataRequired, total=False):
    callback: str
    callback_method: str
    custom_intent: Any
    custom_intent_mode: str
    custom_topic: Any
    custom_topic_mode: str
    intent: bool
    language: str
    sentiment: bool
    summarize: Any
    tag: Any
    topic: bool


class Speak(TypedDict):
    request_id: str
    text: str


class SpeakCreateDataRequired(TypedDict):
    model: str
    request_id: str
    text: str


class SpeakCreateData(SpeakCreateDataRequired, total=False):
    bit_rate: Any
    callback: str
    callback_method: str
    container: Any
    encoding: Any
    expressivity: str
    mip_opt_out: bool
    priority: str
    sample_rate: Any
    speed: float
    tag: Any


class UpdateProjectMemberScopesV1Required(TypedDict):
    scope: str


class UpdateProjectMemberScopesV1(UpdateProjectMemberScopesV1Required, total=False):
    message: str


class UpdateProjectMemberScopesV1UpdateDataRequired(TypedDict):
    member_id: str
    project_id: str


class UpdateProjectMemberScopesV1UpdateData(UpdateProjectMemberScopesV1UpdateDataRequired, total=False):
    message: str
    scope: str


class UpdateProjectV1(TypedDict, total=False):
    message: str
    name: str


class UpdateProjectV1UpdateDataRequired(TypedDict):
    project_id: str


class UpdateProjectV1UpdateData(UpdateProjectV1UpdateDataRequired, total=False):
    message: str
    name: str


class Usage(TypedDict, total=False):
    end: str
    resolution: dict
    start: str


class UsageLoadMatchRequired(TypedDict):
    project_id: str


class UsageLoadMatch(UsageLoadMatchRequired, total=False):
    accessor: str
    alternative: bool
    callback: bool
    callback_method: bool
    channel: bool
    custom_intent: bool
    custom_intent_mode: bool
    custom_topic: bool
    custom_topic_mode: bool
    deployment: str
    detect_entity: bool
    detect_language: bool
    diarize: bool
    dictation: bool
    encoding: bool
    end: str
    endpoint: str
    extra: bool
    filler_word: bool
    intent: bool
    keyterm: bool
    keyword: bool
    language: bool
    measurement: bool
    method: str
    model: str
    multichannel: bool
    numeral: bool
    paragraph: bool
    profanity_filter: bool
    punctuate: bool
    redact: bool
    replace: bool
    sample_rate: bool
    search: bool
    sentiment: bool
    smart_format: bool
    start: str
    summarize: bool
    tag: str
    topic: bool
    utt_split: bool
    utterance: bool
    version: bool


class UsageBreakdownV1(TypedDict):
    agent_hours: str
    grouping: dict
    hours: str
    requests: float
    tokens_in: float
    tokens_out: float
    total_hours: str
    tts_characters: float


class UsageBreakdownV1ListMatchRequired(TypedDict):
    project_id: str


class UsageBreakdownV1ListMatch(UsageBreakdownV1ListMatchRequired, total=False):
    accessor: str
    alternative: bool
    callback: bool
    callback_method: bool
    channel: bool
    custom_intent: bool
    custom_intent_mode: bool
    custom_topic: bool
    custom_topic_mode: bool
    deployment: str
    detect_entity: bool
    detect_language: bool
    diarize: bool
    dictation: bool
    encoding: bool
    end: str
    endpoint: str
    extra: bool
    filler_word: bool
    grouping: str
    intent: bool
    keyterm: bool
    keyword: bool
    language: bool
    measurement: bool
    method: str
    model: str
    multichannel: bool
    numeral: bool
    paragraph: bool
    profanity_filter: bool
    punctuate: bool
    redact: bool
    replace: bool
    sample_rate: bool
    search: bool
    sentiment: bool
    smart_format: bool
    start: str
    summarize: bool
    tag: str
    topic: bool
    utt_split: bool
    utterance: bool
    version: bool


class UsageFieldsV1(TypedDict, total=False):
    language: str
    model_id: str
    name: str
    version: str


class UsageFieldsV1ListMatchRequired(TypedDict):
    project_id: str


class UsageFieldsV1ListMatch(UsageFieldsV1ListMatchRequired, total=False):
    end: str
    start: str
