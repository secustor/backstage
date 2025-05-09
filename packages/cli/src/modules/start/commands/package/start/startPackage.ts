/*
 * Copyright 2020 The Backstage Authors
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

import { PackageRole } from '@backstage/cli-node';
import { startBackend, startBackendPlugin } from './startBackend';
import { startFrontend } from './startFrontend';

export async function startPackage(options: {
  role: PackageRole;
  targetDir: string;
  configPaths: string[];
  checksEnabled: boolean;
  inspectEnabled?: boolean | string;
  inspectBrkEnabled?: boolean | string;
  linkedWorkspace?: string;
  require?: string;
}): Promise<void> {
  switch (options.role) {
    case 'backend':
      return startBackend(options);
    case 'backend-plugin':
    case 'backend-plugin-module':
    case 'node-library':
      return startBackendPlugin(options);
    case 'frontend':
      return startFrontend({
        ...options,
        entry: 'src/index',
        verifyVersions: true,
      });
    case 'web-library':
    case 'frontend-plugin':
    case 'frontend-plugin-module':
      return startFrontend({
        entry: 'dev/index',
        ...options,
      });
    case 'frontend-dynamic-container' as PackageRole: // experimental
      return startFrontend({
        entry: 'src/index',
        ...options,
        skipOpenBrowser: true,
        isModuleFederationRemote: true,
      });
    default:
      throw new Error(
        `Start command is not supported for package role '${options.role}'`,
      );
  }
}
