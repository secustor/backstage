## API Report File for "@backstage/plugin-scaffolder-common"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { Entity } from '@backstage/catalog-model';
import type { EntityMeta } from '@backstage/catalog-model';
import type { JsonArray } from '@backstage/types';
import { JsonObject } from '@backstage/types';
import { JSONSchema7 } from 'json-schema';
import { JsonValue } from '@backstage/types';
import { KindValidator } from '@backstage/catalog-model';
import { Observable } from '@backstage/types';
import { ScmIntegrationRegistry } from '@backstage/integration';
import type { UserEntity } from '@backstage/catalog-model';

// @public
export type Action = {
  id: string;
  description?: string;
  schema?: {
    input?: JSONSchema7;
    output?: JSONSchema7;
  };
  examples?: ScaffolderUsageExample[];
};

// @public
export const isTemplateEntityV1beta3: (
  entity: Entity,
) => entity is TemplateEntityV1beta3;

// @public
export type ListActionsResponse = Array<Action>;

// @public
export type ListTemplatingExtensionsResponse = {
  filters: Record<string, TemplateFilter>;
  globals: {
    functions: Record<string, TemplateGlobalFunction>;
    values: Record<string, TemplateGlobalValue>;
  };
};

// @public
export type LogEvent = {
  type: TaskEventType;
  body: {
    message: string;
    stepId?: string;
    status?: ScaffolderTaskStatus;
  };
  createdAt: string;
  id: number;
  taskId: string;
};

// @public
export interface ScaffolderApi {
  // (undocumented)
  autocomplete?(
    request: {
      token: string;
      provider: string;
      resource: string;
      context: Record<string, string>;
    },
    options?: ScaffolderRequestOptions,
  ): Promise<{
    results: {
      title?: string;
      id: string;
    }[];
  }>;
  cancelTask(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<{
    status?: ScaffolderTaskStatus;
  }>;
  // (undocumented)
  dryRun?(
    request: ScaffolderDryRunOptions,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderDryRunResponse>;
  // (undocumented)
  getIntegrationsList(
    options: ScaffolderGetIntegrationsListOptions,
  ): Promise<ScaffolderGetIntegrationsListResponse>;
  // (undocumented)
  getTask(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderTask>;
  // (undocumented)
  getTemplateParameterSchema(
    templateRef: string,
    options?: ScaffolderRequestOptions,
  ): Promise<TemplateParameterSchema>;
  listActions(options?: ScaffolderRequestOptions): Promise<ListActionsResponse>;
  // (undocumented)
  listTasks?(
    request: {
      filterByOwnership: 'owned' | 'all';
      limit?: number;
      offset?: number;
    },
    options?: ScaffolderRequestOptions,
  ): Promise<{
    tasks: ScaffolderTask[];
    totalTasks?: number;
  }>;
  listTemplatingExtensions?(
    options?: ScaffolderRequestOptions,
  ): Promise<ListTemplatingExtensionsResponse>;
  retry?(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<{
    id: string;
  }>;
  scaffold(
    request: ScaffolderScaffoldOptions,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderScaffoldResponse>;
  // (undocumented)
  streamLogs(
    request: ScaffolderStreamLogsOptions,
    options?: ScaffolderRequestOptions,
  ): Observable<LogEvent>;
}

// @public
export class ScaffolderClient implements ScaffolderApi {
  constructor(options: {
    discoveryApi: {
      getBaseUrl(pluginId: string): Promise<string>;
    };
    fetchApi: {
      fetch: typeof fetch;
    };
    identityApi?: {
      getBackstageIdentity(): Promise<{
        type: 'user';
        userEntityRef: string;
        ownershipEntityRefs: string[];
      }>;
    };
    scmIntegrationsApi: ScmIntegrationRegistry;
    useLongPollingLogs?: boolean;
  });
  autocomplete({
    token,
    resource,
    provider,
    context,
  }: {
    token: string;
    provider: string;
    resource: string;
    context: Record<string, string>;
  }): Promise<{
    results: {
      title?: string;
      id: string;
    }[];
  }>;
  cancelTask(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<{
    status?: ScaffolderTaskStatus;
  }>;
  // (undocumented)
  dryRun(
    request: ScaffolderDryRunOptions,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderDryRunResponse>;
  // (undocumented)
  getIntegrationsList(
    options: ScaffolderGetIntegrationsListOptions,
  ): Promise<ScaffolderGetIntegrationsListResponse>;
  // (undocumented)
  getTask(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderTask>;
  // (undocumented)
  getTemplateParameterSchema(
    templateRef: string,
    options?: ScaffolderRequestOptions,
  ): Promise<TemplateParameterSchema>;
  listActions(options?: ScaffolderRequestOptions): Promise<ListActionsResponse>;
  // (undocumented)
  listTasks(
    request: {
      filterByOwnership: 'owned' | 'all';
      limit?: number;
      offset?: number;
    },
    options?: ScaffolderRequestOptions,
  ): Promise<{
    tasks: ScaffolderTask[];
    totalTasks?: number;
  }>;
  listTemplatingExtensions(
    options?: ScaffolderRequestOptions,
  ): Promise<ListTemplatingExtensionsResponse>;
  retry?(
    taskId: string,
    options?: ScaffolderRequestOptions,
  ): Promise<{
    id: string;
  }>;
  scaffold(
    request: ScaffolderScaffoldOptions,
    options?: ScaffolderRequestOptions,
  ): Promise<ScaffolderScaffoldResponse>;
  // (undocumented)
  streamLogs(
    request: ScaffolderStreamLogsOptions,
    options?: ScaffolderRequestOptions,
  ): Observable<LogEvent>;
}

// @public (undocumented)
export interface ScaffolderDryRunOptions {
  // (undocumented)
  directoryContents: {
    path: string;
    base64Content: string;
  }[];
  // (undocumented)
  secrets?: Record<string, string>;
  // (undocumented)
  template: TemplateEntityV1beta3;
  // (undocumented)
  values: JsonObject;
}

// @public (undocumented)
export interface ScaffolderDryRunResponse {
  // (undocumented)
  directoryContents: Array<{
    path: string;
    base64Content: string;
    executable?: boolean;
  }>;
  // (undocumented)
  log: Array<Pick<LogEvent, 'body'>>;
  // (undocumented)
  output: ScaffolderTaskOutput;
  // (undocumented)
  steps: TaskStep[];
}

// @public
export interface ScaffolderGetIntegrationsListOptions {
  // (undocumented)
  allowedHosts: string[];
}

// @public
export interface ScaffolderGetIntegrationsListResponse {
  // (undocumented)
  integrations: {
    type: string;
    title: string;
    host: string;
  }[];
}

// @public (undocumented)
export type ScaffolderOutputLink = {
  title?: string;
  icon?: string;
  url?: string;
  entityRef?: string;
};

// @public (undocumented)
export type ScaffolderOutputText = {
  title?: string;
  icon?: string;
  content?: string;
  default?: boolean;
};

// @public
export interface ScaffolderRequestOptions {
  // (undocumented)
  token?: string;
}

// @public
export interface ScaffolderScaffoldOptions {
  // (undocumented)
  secrets?: Record<string, string>;
  // (undocumented)
  templateRef: string;
  // (undocumented)
  values: Record<string, JsonValue>;
}

// @public
export interface ScaffolderScaffoldResponse {
  // (undocumented)
  taskId: string;
}

// @public
export interface ScaffolderStreamLogsOptions {
  // (undocumented)
  after?: number;
  // (undocumented)
  isTaskRecoverable?: boolean;
  // (undocumented)
  taskId: string;
}

// @public
export type ScaffolderTask = {
  id: string;
  spec: TaskSpec;
  status: ScaffolderTaskStatus;
  lastHeartbeatAt?: string;
  createdAt: string;
};

// @public (undocumented)
export type ScaffolderTaskOutput = {
  links?: ScaffolderOutputLink[];
  text?: ScaffolderOutputText[];
} & {
  [key: string]: unknown;
};

// @public (undocumented)
export type ScaffolderTaskStatus =
  | 'cancelled'
  | 'completed'
  | 'failed'
  | 'open'
  | 'processing'
  | 'skipped';

// @public
export type ScaffolderUsageExample = {
  description?: string;
  example: string;
  notes?: string;
};

// @public (undocumented)
export type TaskEventType = 'cancelled' | 'completion' | 'log' | 'recovered';

// @public
export type TaskRecoverStrategy = 'none' | 'startOver';

// @public
export interface TaskRecovery {
  EXPERIMENTAL_strategy?: TaskRecoverStrategy;
}

// @public
export type TaskSpec = TaskSpecV1beta3;

// @public
export interface TaskSpecV1beta3 {
  apiVersion: 'scaffolder.backstage.io/v1beta3';
  EXPERIMENTAL_recovery?: TaskRecovery;
  output: {
    [name: string]: JsonValue;
  };
  parameters: JsonObject;
  steps: TaskStep[];
  templateInfo?: TemplateInfo;
  user?: {
    entity?: UserEntity;
    ref?: string;
  };
}

// @public
export interface TaskStep {
  action: string;
  each?: string | JsonArray;
  id: string;
  if?: string | boolean;
  input?: JsonObject;
  name: string;
}

// @public
export interface TemplateEntityStepV1beta3 extends JsonObject {
  // (undocumented)
  'backstage:permissions'?: TemplatePermissionsV1beta3;
  // (undocumented)
  action: string;
  // (undocumented)
  id?: string;
  // (undocumented)
  if?: string | boolean;
  // (undocumented)
  input?: JsonObject;
  // (undocumented)
  name?: string;
}

// @public
export interface TemplateEntityV1beta3 extends Entity {
  apiVersion: 'scaffolder.backstage.io/v1beta3';
  kind: 'Template';
  spec: {
    type: string;
    presentation?: TemplatePresentationV1beta3;
    EXPERIMENTAL_recovery?: TemplateRecoveryV1beta3;
    EXPERIMENTAL_formDecorators?: {
      id: string;
      input?: JsonObject;
    }[];
    parameters?: TemplateParametersV1beta3 | TemplateParametersV1beta3[];
    steps: Array<TemplateEntityStepV1beta3>;
    output?: {
      [name: string]: string;
    };
    owner?: string;
    lifecycle?: string;
  };
}

// @public
export const templateEntityV1beta3Validator: KindValidator;

// @public
export type TemplateFilter = {
  description?: string;
  schema?: {
    input?: JSONSchema7;
    arguments?: JSONSchema7[];
    output?: JSONSchema7;
  };
  examples?: ScaffolderUsageExample[];
};

// @public
export type TemplateGlobalFunction = {
  description?: string;
  schema?: {
    arguments?: JSONSchema7[];
    output?: JSONSchema7;
  };
  examples?: ScaffolderUsageExample[];
};

// @public
export type TemplateGlobalValue = {
  description?: string;
  value: JsonValue;
};

// @public
export type TemplateInfo = {
  entityRef: string;
  baseUrl?: string;
  entity?: {
    metadata: EntityMeta;
  };
};

// @public
export type TemplateParameterSchema = {
  title: string;
  description?: string;
  presentation?: TemplatePresentationV1beta3;
  steps: Array<{
    title: string;
    description?: string;
    schema: JsonObject;
  }>;
  EXPERIMENTAL_formDecorators?: {
    id: string;
    input?: JsonObject;
  }[];
};

// @public
export interface TemplateParametersV1beta3 extends JsonObject {
  // (undocumented)
  'backstage:permissions'?: TemplatePermissionsV1beta3;
}

// @public
export interface TemplatePermissionsV1beta3 extends JsonObject {
  // (undocumented)
  tags?: string[];
}

// @public
export interface TemplatePresentationV1beta3 extends JsonObject {
  buttonLabels?: {
    backButtonText?: string;
    createButtonText?: string;
    reviewButtonText?: string;
  };
}

// @public
export interface TemplateRecoveryV1beta3 extends JsonObject {
  EXPERIMENTAL_strategy?: 'none' | 'startOver';
}
```
