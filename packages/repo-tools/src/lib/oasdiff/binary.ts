/*
 * Copyright 2026 The Backstage Authors
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

import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { sync as commandExistsSync } from 'command-exists';
import { resolvePackagePath } from '@backstage/backend-plugin-api';

/**
 * Resolves the path to the oasdiff binary.
 *
 * Checks the postinstall download location first, then falls back to PATH.
 * Throws a clear error if oasdiff is not found.
 */
export function resolveOasdiffBinary(): string {
  // Check the postinstall download location
  const packageRoot = resolvePackagePath('@backstage/repo-tools');
  const localBinary = resolve(packageRoot, 'bin', 'oasdiff', 'oasdiff');
  if (existsSync(localBinary)) {
    return localBinary;
  }

  // Fall back to PATH
  if (commandExistsSync('oasdiff')) {
    return 'oasdiff';
  }

  throw new Error(
    'oasdiff binary not found. It should be installed automatically via the ' +
      '@backstage/repo-tools postinstall hook. Try running `yarn install` again, ' +
      'or install oasdiff manually: https://github.com/Tufin/oasdiff#installation',
  );
}
