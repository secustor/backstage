/*
 * Copyright 2023 The Backstage Authors
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

import chalk from 'chalk';
import { runner } from '../../../../lib/runner';
import { getPathToOpenApiSpec } from '../../../../lib/openapi/helpers';
import { exec } from '../../../../lib/exec';

async function test(directoryPath: string) {
  try {
    await getPathToOpenApiSpec(directoryPath);
  } catch {
    // OpenAPI schema doesn't exist — skip this package.
    return;
  }

  await exec('yarn', ['backstage-cli', 'package', 'test', '--no-watch'], {
    cwd: directoryPath,
    env: process.env,
  });
}

export async function bulkCommand(paths: string[] = []): Promise<void> {
  const resultsList = await runner(paths, dir => test(dir), {
    concurrencyLimit: 1,
  });

  let failed = false;
  for (const { relativeDir, resultText } of resultsList) {
    if (resultText) {
      console.log();
      console.log(
        chalk.red(
          `OpenAPI runtime validation against tests failed in ${relativeDir}:`,
        ),
      );
      console.log(resultText.trimStart());

      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  } else {
    console.log(chalk.green('Verified all specifications against test data.'));
  }
}
