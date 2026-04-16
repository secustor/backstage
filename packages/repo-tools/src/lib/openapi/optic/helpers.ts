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

export type OasdiffResult = {
  apiName: string;
  breaking: boolean;
  output: string;
};

export type DiffSummary = {
  completed: OasdiffResult[];
  failed: { apiName: string; error: string }[];
  warning: { apiName: string; warning: string }[];
};

export const generateDiffSummaryMarkdown = (
  commit: { sha: string },
  results: DiffSummary,
) => {
  if (
    results.completed.length === 0 &&
    results.failed.length === 0 &&
    results.warning.length === 0
  ) {
    return `No API changes detected for commit (${commit.sha})`;
  }

  const breakingApis = results.completed.filter(s => s.breaking);
  const nonBreakingApis = results.completed.filter(s => !s.breaking);

  const sections: string[] = [];
  sections.push(`### Summary for commit (${commit.sha})`);

  if (breakingApis.length > 0) {
    sections.push(
      `${
        breakingApis.length === 1 ? '1 API' : `${breakingApis.length} APIs`
      } had breaking changes`,
    );
  }
  if (nonBreakingApis.length > 0) {
    sections.push(
      `${
        nonBreakingApis.length === 1
          ? '1 API'
          : `${nonBreakingApis.length} APIs`
      } had no breaking changes`,
    );
  }

  if (results.completed.length > 0) {
    sections.push('### APIs with Changes\n');
    for (const result of results.completed) {
      const status = result.breaking ? ':warning:' : ':white_check_mark:';
      sections.push(`#### ${status} ${result.apiName}\n`);
      if (result.output.trim()) {
        sections.push(`${result.output.trim()}\n`);
      }
    }
  }

  if (results.failed.length > 0) {
    sections.push('### APIs with Errors\n');
    for (const failure of results.failed) {
      sections.push(`#### ${failure.apiName}\n`);
      sections.push(`\`\`\`\n${failure.error}\n\`\`\`\n`);
    }
  }

  if (results.warning.length > 0) {
    sections.push('### APIs with Warnings\n');
    for (const warning of results.warning) {
      sections.push(`- **${warning.apiName}**: ${warning.warning}`);
    }
  }

  return sections.join('\n');
};
