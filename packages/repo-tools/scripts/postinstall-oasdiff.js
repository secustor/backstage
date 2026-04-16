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

// @ts-check
/* eslint-disable no-console */

/**
 * Postinstall script that downloads the oasdiff binary for the current platform.
 * This runs as part of `yarn install` and must be plain JS (not TS).
 * Failures are non-fatal — a warning is printed but install continues.
 */

const {
  createWriteStream,
  existsSync,
  mkdirSync,
  chmodSync,
} = require('node:fs');
const { pipeline } = require('node:stream/promises');
const { execSync } = require('node:child_process');
const { join } = require('node:path');
const os = require('node:os');

const OASDIFF_VERSION = '1.14.0';
const BIN_DIR = join(__dirname, '..', 'bin', 'oasdiff');
const BINARY_PATH = join(BIN_DIR, 'oasdiff');

function getPlatformAsset() {
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'darwin') {
    return `oasdiff_${OASDIFF_VERSION}_darwin_all.tar.gz`;
  }

  if (platform === 'linux' && arch === 'x64') {
    return `oasdiff_${OASDIFF_VERSION}_linux_amd64.tar.gz`;
  }

  if (platform === 'linux' && arch === 'arm64') {
    return `oasdiff_${OASDIFF_VERSION}_linux_arm64.tar.gz`;
  }

  return undefined;
}

async function download(url, dest) {
  // Use dynamic import for node-fetch or fall back to global fetch (Node 18+)
  const fetchFn =
    typeof globalThis.fetch === 'function'
      ? globalThis.fetch
      : (await import('node-fetch')).default;

  const response = await fetchFn(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status} ${response.statusText}`,
    );
  }
  const fileStream = createWriteStream(dest);
  await pipeline(response.body, fileStream);
}

async function main() {
  if (existsSync(BINARY_PATH)) {
    try {
      const version = execSync(`${BINARY_PATH} --version`, {
        encoding: 'utf8',
      }).trim();
      if (version.includes(OASDIFF_VERSION)) {
        console.log(
          `oasdiff ${OASDIFF_VERSION} already installed at ${BINARY_PATH}`,
        );
        return;
      }
    } catch {
      // Binary exists but is broken — re-download
    }
  }

  const asset = getPlatformAsset();
  if (!asset) {
    console.warn(
      `[oasdiff] Unsupported platform: ${process.platform}/${process.arch}. ` +
        `Install oasdiff manually and ensure it is on your PATH.`,
    );
    return;
  }

  const url = `https://github.com/Tufin/oasdiff/releases/download/v${OASDIFF_VERSION}/${asset}`;
  const tmpDir = os.tmpdir();
  const archivePath = join(tmpDir, asset);

  console.log(`Downloading oasdiff ${OASDIFF_VERSION} from ${url}...`);

  await download(url, archivePath);

  mkdirSync(BIN_DIR, { recursive: true });

  // Extract the oasdiff binary from the tar.gz archive
  execSync(`tar -xzf "${archivePath}" -C "${BIN_DIR}" oasdiff`, {
    stdio: 'pipe',
  });

  chmodSync(BINARY_PATH, 0o755);
  console.log(`oasdiff ${OASDIFF_VERSION} installed to ${BINARY_PATH}`);
}

main().catch(err => {
  // Non-fatal: warn but don't break yarn install
  console.warn(
    `[oasdiff] Failed to install oasdiff binary: ${err.message}\n` +
      `You can install oasdiff manually: https://github.com/Tufin/oasdiff#installation`,
  );
});
