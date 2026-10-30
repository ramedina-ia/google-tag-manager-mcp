/**
 * Tipos e interfaces para el Servidor MCP de Google Tag Manager
 */

export interface GtmCredentialsConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  defaultAccountId?: string;
  defaultContainerId?: string;
}

export interface ListAccountsParams {
  // Sin parámetros requeridos
}

export interface ListContainersParams {
  accountId?: string;
}

export interface GetContainerParams {
  accountId?: string;
  containerId: string;
}

export interface ListWorkspacesParams {
  accountId?: string;
  containerId: string;
}

export interface GetWorkspaceStatusParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
}

export interface ListTagsParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
}

export interface GetTagParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  tagId: string;
}

export interface ListTriggersParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
}

export interface GetTriggerParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  triggerId: string;
}

export interface ListVariablesParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
}

export interface ListBuiltInVariablesParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
}

export interface CreateTagParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  name: string;
  type: string;
  parameter?: Array<{ type: string; key: string; value?: string; list?: any[]; map?: any[] }>;
  firingTriggerId?: string[];
  blockingTriggerId?: string[];
  notes?: string;
}

export interface UpdateTagParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  tagId: string;
  name?: string;
  type?: string;
  parameter?: Array<{ type: string; key: string; value?: string; list?: any[]; map?: any[] }>;
  firingTriggerId?: string[];
  blockingTriggerId?: string[];
  paused?: boolean;
  notes?: string;
}

export interface CreateTriggerParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  name: string;
  type: string;
  filter?: Array<{
    type: string;
    parameter: Array<{ type: string; key: string; value: string }>;
  }>;
  customEventFilter?: Array<{
    type: string;
    parameter: Array<{ type: string; key: string; value: string }>;
  }>;
  notes?: string;
}

export interface CreateVariableParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  name: string;
  type: string;
  parameter?: Array<{ type: string; key: string; value?: string; list?: any[]; map?: any[] }>;
  notes?: string;
}

export interface CreateVersionParams {
  accountId?: string;
  containerId: string;
  workspaceId: string;
  name: string;
  notes?: string;
}

export interface PublishVersionParams {
  accountId?: string;
  containerId: string;
  containerVersionId: string;
  confirmPublish: boolean;
}
