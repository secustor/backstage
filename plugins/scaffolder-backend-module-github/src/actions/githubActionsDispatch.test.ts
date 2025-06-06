/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ScmIntegrations,
  DefaultGithubCredentialsProvider,
  GithubCredentialsProvider,
} from '@backstage/integration';
import { ConfigReader } from '@backstage/config';
import { TemplateAction } from '@backstage/plugin-scaffolder-node';
import { createMockActionContext } from '@backstage/plugin-scaffolder-node-test-utils';
import { createGithubActionsDispatchAction } from './githubActionsDispatch';

import { Octokit } from 'octokit';

const octokitMock = Octokit as unknown as jest.Mock;
const mockOctokit = {
  rest: {
    actions: {
      createWorkflowDispatch: jest.fn(),
    },
  },
};
jest.mock('octokit', () => ({
  Octokit: jest.fn(),
}));

describe('github:actions:dispatch', () => {
  const config = new ConfigReader({
    integrations: {
      github: [
        { host: 'github.com', token: 'tokenlols' },
        { host: 'ghe.github.com' },
      ],
    },
  });

  const integrations = ScmIntegrations.fromConfig(config);
  let githubCredentialsProvider: GithubCredentialsProvider;
  let action: TemplateAction<any, any, any>;

  const mockContext = createMockActionContext({
    input: {
      repoUrl: 'github.com?repo=repo&owner=owner',
      workflowId: 'a-workflow-id',
      branchOrTagName: 'main',
    },
  });

  beforeEach(() => {
    jest.resetAllMocks();
    octokitMock.mockImplementation(() => mockOctokit);
    githubCredentialsProvider =
      DefaultGithubCredentialsProvider.fromIntegrations(integrations);
    action = createGithubActionsDispatchAction({
      integrations,
      githubCredentialsProvider,
    });
  });

  it('should pass context logger to Octokit client', async () => {
    await action.handler(mockContext);

    expect(octokitMock).toHaveBeenCalledWith(
      expect.objectContaining({ log: mockContext.logger }),
    );
  });

  it('should call the githubApis for creating WorkflowDispatch without an input object', async () => {
    mockOctokit.rest.actions.createWorkflowDispatch.mockResolvedValue({
      data: {
        foo: 'bar',
      },
    });

    const repoUrl = 'github.com?repo=repo&owner=owner';
    const workflowId = 'dispatch_workflow';
    const branchOrTagName = 'main';
    const ctx = Object.assign({}, mockContext, {
      input: { repoUrl, workflowId, branchOrTagName },
    });
    await action.handler(ctx);

    expect(
      mockOctokit.rest.actions.createWorkflowDispatch,
    ).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      workflow_id: workflowId,
      ref: branchOrTagName,
    });
  });

  it('should call the githubApis for creating WorkflowDispatch with an input object', async () => {
    mockOctokit.rest.actions.createWorkflowDispatch.mockResolvedValue({
      data: {
        foo: 'bar',
      },
    });

    const repoUrl = 'github.com?repo=repo&owner=owner';
    const workflowId = 'dispatch_workflow';
    const branchOrTagName = 'main';
    const workflowInputs = '{ "foo": "bar" }';
    const ctx = Object.assign({}, mockContext, {
      input: { repoUrl, workflowId, branchOrTagName, workflowInputs },
    });
    await action.handler(ctx);

    expect(
      mockOctokit.rest.actions.createWorkflowDispatch,
    ).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      workflow_id: workflowId,
      ref: branchOrTagName,
      inputs: workflowInputs,
    });
  });
});
