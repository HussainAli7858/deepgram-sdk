// Typed models for the Deepgram SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Agent {
  agent_id: string
  config: Record<string, any>
  created_at?: string
  id?: string
  metadata?: Record<string, any>
  updated_at?: string
}

export interface AgentLoadMatch {
  id: string
  project_id: string
}

export interface AgentListMatch {
  project_id: string
}

export interface AgentUpdateData {
  id: string
  project_id: string
  agent_id?: string
  config?: Record<string, any>
  created_at?: string
  metadata?: Record<string, any>
  updated_at?: string
}

export interface AgentRemoveMatch {
  id: string
  project_id: string
}

export interface AgentThinkModelsV1 {
  models: any[]
}

export interface AgentThinkModelsV1ListMatch {
  models?: any[]
}

export interface AgentVariable {
  api_version?: number
  created_at?: string
  id?: string
  key: string
  updated_at?: string
  value: any
  variable_id: string
}

export interface AgentVariableLoadMatch {
  id: string
  project_id: string
}

export interface AgentVariableListMatch {
  project_id: string
}

export interface AgentVariableCreateData {
  project_id: string
  api_version?: number
  created_at?: string
  id?: string
  key: string
  updated_at?: string
  value: any
  variable_id: string
}

export interface AgentVariableUpdateData {
  id: string
  project_id: string
  api_version?: number
  created_at?: string
  key?: string
  updated_at?: string
  value?: any
  variable_id?: string
}

export interface AgentVariableRemoveMatch {
  id: string
  project_id: string
}

export interface BillingBreakdownV1 {
  dollars: string
  grouping: Record<string, any>
}

export interface BillingBreakdownV1ListMatch {
  project_id: string
  accessor?: string
  deployment?: string
  end?: string
  grouping?: any[]
  line_item?: string
  start?: string
  tag?: string
}

export interface CreateAgentConfigurationV1 {
  agent_id: string
  api_version?: number
  config: Record<string, any>
  metadata?: Record<string, any>
}

export interface CreateAgentConfigurationV1CreateData {
  project_id: string
  agent_id: string
  api_version?: number
  config: Record<string, any>
  metadata?: Record<string, any>
}

export interface CreateKeyV1 {
  api_key_id?: string
  comment?: string
  expiration_date?: string
  key?: string
  scopes?: any[]
  tags?: any[]
}

export interface CreateKeyV1CreateData {
  project_id: string
  api_key_id?: string
  comment?: string
  expiration_date?: string
  key?: string
  scopes?: any[]
  tags?: any[]
}

export interface CreateProjectDistributionCredentialsV1 {
  comment?: string
  distribution_credentials: Record<string, any>
  member: Record<string, any>
}

export interface CreateProjectDistributionCredentialsV1CreateData {
  project_id: string
  provider?: string
  scope?: any[]
  comment?: string
  distribution_credentials: Record<string, any>
  member: Record<string, any>
}

export interface CreateProjectInviteV1 {
  email: string
  message?: string
  scope: string
}

export interface CreateProjectInviteV1CreateData {
  project_id: string
  email: string
  message?: string
  scope: string
}

export interface Grant {
  access_token: string
  expires_in?: number
  ttl_seconds?: number
}

export interface GrantCreateData {
  access_token: string
  expires_in?: number
  ttl_seconds?: number
}

export interface ListBillingFieldsV1 {
  accessors?: any[]
  deployments?: any[]
  line_items?: Record<string, any>
  tags?: any[]
}

export interface ListBillingFieldsV1ListMatch {
  project_id: string
  end?: string
  start?: string
}

export interface ListModelsV1 {
  stt?: any[]
  tts?: any[]
}

export interface ListModelsV1ListMatch {
  project_id: string
  include_outdated?: boolean
}

export interface ListProjectBalancesV1ResponseBalancesItem {
  amount?: number
  balance_id?: string
  purchase_order_id?: string
  units?: string
}

export interface ListProjectBalancesV1ResponseBalancesItemListMatch {
  project_id: string
}

export interface ListProjectDistributionCredentialsV1ResponseDistribution {
  distribution_credentials: Record<string, any>
  member: Record<string, any>
}

export interface ListProjectDistributionCredentialsV1ResponseDistributionListMatch {
  project_id: string
}

export interface ListProjectInvitesV1ResponseInvitesItem {
  email?: string
  scope?: string
}

export interface ListProjectInvitesV1ResponseInvitesItemListMatch {
  project_id: string
}

export interface ListProjectKeysV1ResponseApiKeysItem {
  api_key?: Record<string, any>
  member?: Record<string, any>
}

export interface ListProjectKeysV1ResponseApiKeysItemListMatch {
  project_id: string
  status?: string
}

export interface ListProjectMemberScopesV1 {
  scopes?: any[]
}

export interface ListProjectMemberScopesV1ListMatch {
  member_id: string
  project_id: string
}

export interface ListProjectMembersV1ResponseMembersItem {
  email?: string
  first_name?: string
  last_name?: string
  member_id?: string
  scopes?: any[]
}

export interface ListProjectMembersV1ResponseMembersItemListMatch {
  project_id: string
}

export interface ListProjectPurchasesV1ResponseOrdersItem {
  amount?: string
  created?: string
  expiration?: string
  order_id?: string
  order_type?: string
  units?: string
}

export interface ListProjectPurchasesV1ResponseOrdersItemListMatch {
  project_id: string
  limit?: number
}

export interface Listen {
  url: string
}

export interface ListenCreateData {
  callback?: string
  callback_method?: string
  custom_intent?: any
  custom_intent_mode?: string
  custom_topic?: any
  custom_topic_mode?: string
  detect_entity?: boolean
  detect_language?: any
  diarize?: boolean
  diarize_model?: string
  dictation?: boolean
  encoding?: string
  extra?: any
  filler_word?: boolean
  intent?: boolean
  keyterm?: any[]
  keyword?: any
  language?: string
  measurement?: boolean
  mip_opt_out?: boolean
  model?: any
  multichannel?: boolean
  numeral?: boolean
  paragraph?: boolean
  profanity_filter?: boolean
  punctuate?: boolean
  redact?: any
  replace?: any
  search?: any
  sentiment?: boolean
  smart_format?: boolean
  summarize?: any
  tag?: any
  topic?: boolean
  utt_split?: number
  utterance?: boolean
  version?: any
  url: string
}

export interface Model {
  id?: string
  stt?: any[]
  tts?: any[]
}

export interface ModelLoadMatch {
  id: string
  project_id?: string
}

export interface ModelListMatch {
  include_outdated?: boolean
}

export interface Project {
  id?: string
  mip_opt_out?: boolean
  name?: string
  project_id?: string
}

export interface ProjectLoadMatch {
  id: string
  limit?: number
  page?: number
}

export interface ProjectListMatch {
  id?: string
  mip_opt_out?: boolean
  name?: string
  project_id?: string
}

export interface ProjectRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'leave'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectBalanceV1 {
  amount?: number
  balance_id?: string
  purchase_order_id?: string
  units?: string
}

export interface ProjectBalanceV1LoadMatch {
  balance_id: string
  project_id: string
}

export interface ProjectDistributionCredentialsV1 {
  distribution_credentials: Record<string, any>
  member: Record<string, any>
}

export interface ProjectDistributionCredentialsV1LoadMatch {
  distribution_credentials_id: string
  project_id: string
}

export interface ProjectDistributionCredentialsV1RemoveMatch {
  distribution_credentials_id: string
  project_id: string
}

export interface ProjectInviteV1 {
}

export interface ProjectInviteV1RemoveMatch {
  email: string
  project_id: string
}

export interface ProjectKeyV1 {
}

export interface ProjectKeyV1RemoveMatch {
  key_id: string
  project_id: string
}

export interface ProjectKeyV1ResponseItem {
  member?: Record<string, any>
}

export interface ProjectKeyV1ResponseItemLoadMatch {
  key_id: string
  project_id: string
}

export interface ProjectMemberV1 {
}

export interface ProjectMemberV1RemoveMatch {
  member_id: string
  project_id: string
}

export interface ProjectRequest {
  api_key_id?: string
  callback?: string
  code?: number
  created?: string
  deployment?: string
  id?: string
  path?: string
  project_uuid?: string
  request_id?: string
  response?: Record<string, any>
}

export interface ProjectRequestLoadMatch {
  id: string
  project_id: string
}

export interface ProjectRequestListMatch {
  id: string
  accessor?: string
  deployment?: string
  end?: string
  endpoint?: string
  limit?: number
  method?: string
  page?: number
  request_id?: string
  start?: string
  status?: string
}

export interface Read {
  metadata: Record<string, any>
  results: Record<string, any>
}

export interface ReadCreateData {
  callback?: string
  callback_method?: string
  custom_intent?: any
  custom_intent_mode?: string
  custom_topic?: any
  custom_topic_mode?: string
  intent?: boolean
  language?: string
  sentiment?: boolean
  summarize?: any
  tag?: any
  topic?: boolean
  metadata: Record<string, any>
  results: Record<string, any>
}

export interface Speak {
  request_id: string
  text: string
}

export interface SpeakCreateData {
  bit_rate?: any
  callback?: string
  callback_method?: string
  container?: any
  encoding?: any
  expressivity?: string
  mip_opt_out?: boolean
  model: string
  priority?: string
  sample_rate?: any
  speed?: number
  tag?: any
  request_id: string
  text: string
}

export interface UpdateProjectMemberScopesV1 {
  message?: string
  scope: string
}

export interface UpdateProjectMemberScopesV1UpdateData {
  member_id: string
  project_id: string
  message?: string
  scope?: string
}

export interface UpdateProjectV1 {
  message?: string
  name?: string
}

export interface UpdateProjectV1UpdateData {
  project_id: string
  message?: string
  name?: string
}

export interface Usage {
  end?: string
  resolution?: Record<string, any>
  start?: string
}

export interface UsageLoadMatch {
  project_id: string
  accessor?: string
  alternative?: boolean
  callback?: boolean
  callback_method?: boolean
  channel?: boolean
  custom_intent?: boolean
  custom_intent_mode?: boolean
  custom_topic?: boolean
  custom_topic_mode?: boolean
  deployment?: string
  detect_entity?: boolean
  detect_language?: boolean
  diarize?: boolean
  dictation?: boolean
  encoding?: boolean
  end?: string
  endpoint?: string
  extra?: boolean
  filler_word?: boolean
  intent?: boolean
  keyterm?: boolean
  keyword?: boolean
  language?: boolean
  measurement?: boolean
  method?: string
  model?: string
  multichannel?: boolean
  numeral?: boolean
  paragraph?: boolean
  profanity_filter?: boolean
  punctuate?: boolean
  redact?: boolean
  replace?: boolean
  sample_rate?: boolean
  search?: boolean
  sentiment?: boolean
  smart_format?: boolean
  start?: string
  summarize?: boolean
  tag?: string
  topic?: boolean
  utt_split?: boolean
  utterance?: boolean
  version?: boolean
}

export interface UsageBreakdownV1 {
  agent_hours: string
  grouping: Record<string, any>
  hours: string
  requests: number
  tokens_in: number
  tokens_out: number
  total_hours: string
  tts_characters: number
}

export interface UsageBreakdownV1ListMatch {
  project_id: string
  accessor?: string
  alternative?: boolean
  callback?: boolean
  callback_method?: boolean
  channel?: boolean
  custom_intent?: boolean
  custom_intent_mode?: boolean
  custom_topic?: boolean
  custom_topic_mode?: boolean
  deployment?: string
  detect_entity?: boolean
  detect_language?: boolean
  diarize?: boolean
  dictation?: boolean
  encoding?: boolean
  end?: string
  endpoint?: string
  extra?: boolean
  filler_word?: boolean
  grouping?: string
  intent?: boolean
  keyterm?: boolean
  keyword?: boolean
  language?: boolean
  measurement?: boolean
  method?: string
  model?: string
  multichannel?: boolean
  numeral?: boolean
  paragraph?: boolean
  profanity_filter?: boolean
  punctuate?: boolean
  redact?: boolean
  replace?: boolean
  sample_rate?: boolean
  search?: boolean
  sentiment?: boolean
  smart_format?: boolean
  start?: string
  summarize?: boolean
  tag?: string
  topic?: boolean
  utt_split?: boolean
  utterance?: boolean
  version?: boolean
}

export interface UsageFieldsV1 {
  language?: string
  model_id?: string
  name?: string
  version?: string
}

export interface UsageFieldsV1ListMatch {
  project_id: string
  end?: string
  start?: string
}

