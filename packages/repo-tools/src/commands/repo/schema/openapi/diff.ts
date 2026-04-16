/*
 * Copyright 2024 The Backstage Authors
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
import { PackageGraph } from '@backstage/cli-node';
import { OptionValues } from 'commander';
import { exec } from '../../../../lib/exec';
import { targetPaths } from '@backstage/cli-common';
import {
  DiffSummary,
  generateDiffSummaryMarkdown,
} from '../../../../lib/openapi/optic/helpers';
import { YAML_SCHEMA_PATH } from '../../../../lib/openapi/constants';

function cleanUpApiName(name: string): string {
  return name.replace(targetPaths.dir, '').replace(YAML_SCHEMA_PATH, '');
}

export async function command(opts: OptionValues) {
  let packages = await PackageGraph.listTargetPackages();

  let since = '';
  if (opts.since) {
    const { stdout: sinceRaw } = await exec('git', ['rev-parse', opts.since]);
    since = sinceRaw.toString().trim();
    const { stdout: changedFilesRaw } = await exec('git', [
      'diff',
      '--name-only',
      since,
    ]);
    const changedFiles = changedFilesRaw.toString().trim();

    const changedOpenApiSpecs = changedFiles
      .split('\n')
      .filter(e => e.endsWith(YAML_SCHEMA_PATH))
      .map(e => targetPaths.resolve(e));

    // filter packages by changedFiles
    packages = packages.filter(pkg =>
      changedOpenApiSpecs.some(e => e.startsWith(`${pkg.dir}/`)),
    );
  }

  const checkablePackages = packages.filter(e => e.packageJson.scripts?.diff);

  try {
    const outputs: DiffSummary = {
      completed: [],
      failed: [],
      warning: [],
    };

    for (const pkg of checkablePackages) {
      const sinceCommands = since ? ['--since', since] : [];
      try {
        const { stdout } = await exec(
          'yarn',
          ['diff', '--ignore', ...sinceCommands],
          { cwd: pkg.dir },
        );
        outputs.completed.push({
          apiName: cleanUpApiName(`${pkg.dir}/`),
          breaking: false,
          output: stdout.toString().trim(),
        });
      } catch (err: any) {
        const errOutput = (err.stdout ?? err.message) as string;
        outputs.completed.push({
          apiName: cleanUpApiName(`${pkg.dir}/`),
          breaking: true,
          output: errOutput.toString().trim(),
        });
      }
    }

    for (const pkg of packages.filter(e => !e.packageJson.scripts?.diff)) {
      outputs.warning.push({
        apiName: cleanUpApiName(`${pkg.dir}/`),
        warning: 'No diff script found in package.json',
      });
    }

    const { stdout: currentSha } = await exec('git', ['rev-parse', 'HEAD']);
    console.log(
      generateDiffSummaryMarkdown(
        { sha: currentSha.toString().trim() },
        outputs,
      ),
    );

    const hasBreaking = outputs.completed.some(r => r.breaking);
    if (hasBreaking) {
      throw new Error('Some checks failed');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
