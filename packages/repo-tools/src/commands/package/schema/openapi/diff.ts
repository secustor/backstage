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
import { exec } from '../../../../lib/exec';
import { getPathToCurrentOpenApiSpec } from '../../../../lib/openapi/helpers';
import { OptionValues } from 'commander';
import { resolveOasdiffBinary } from '../../../../lib/oasdiff/binary';

async function check(opts: OptionValues) {
  const resolvedOpenapiPath = await getPathToCurrentOpenApiSpec();
  const oasdiff = resolveOasdiffBinary();

  let baseRef = opts.since;
  if (!baseRef) {
    const { stdout: branch } = await exec(
      'git merge-base --fork-point origin/master',
    );
    baseRef = branch.toString().trim();
  }

  const format = opts.json ? 'json' : 'text';
  const gitSpec = `${baseRef}:${resolvedOpenapiPath}`;

  let failed = false;
  let output = '';
  try {
    const { stdout } = await exec(oasdiff, [
      'breaking',
      gitSpec,
      resolvedOpenapiPath,
      '-f',
      format,
    ]);
    output = stdout.toString();
  } catch (err: any) {
    output = (err.stdout ?? err.message) as string;
    failed = true;
  }

  if (opts.json) {
    console.log(output);
    if (!opts.ignore && failed) {
      throw new Error('Some checks failed');
    }
  } else {
    console.log(output);
    if (!opts.ignore && failed) {
      throw new Error('Some checks failed');
    }
  }
}

export async function command(opts: OptionValues) {
  try {
    await check(opts);
    if (!opts.json) console.log(chalk.green(`All checks passed.`));
  } catch (err: any) {
    if (!opts.json) console.log(chalk.red(err.message));
    process.exit(1);
  }
}
