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
import { YAML_SCHEMA_PATH } from '../../../../lib/openapi/constants';
import { getPathToCurrentOpenApiSpec } from '../../../../lib/openapi/helpers';

async function init() {
  try {
    await getPathToCurrentOpenApiSpec();
  } catch (err) {
    throw new Error(
      `OpenAPI.yaml not found in ${YAML_SCHEMA_PATH}. Please create one and retry this command.`,
    );
  }
}

export async function singleCommand() {
  try {
    await init();
    console.log(chalk.green(`Successfully configured.`));
  } catch (err: any) {
    console.log(chalk.red(`OpenAPI tooling initialization failed.`));
    console.log(err.message);
    process.exit(1);
  }
}
