## CLI Report file for "@backstage/cli"

> Do not edit this file. It is a report generated by `yarn build:api-reports`

### `backstage-cli`

```
Usage: backstage-cli [options] [command]

Options:
  -V, --version
  -h, --help

Commands:
  build-workspace
  config [command]
  config:check
  config:docs
  config:print
  config:schema
  create-github-app
  help [command]
  info
  migrate [command]
  new
  package [command]
  repo [command]
  versions:bump
  versions:migrate
```

### `backstage-cli build-workspace`

```
Usage: program [options] <workspace-dir> [packages...]

Options:
  --alwaysPack
  -h, --help
```

### `backstage-cli config`

```
Usage: backstage-cli config [options] [command] [command]

Options:
  -h, --help

Commands:
  docs
  help [command]
  schema
```

### `backstage-cli config docs`

```
Usage: backstage-cli config docs [options]

Options:
  --package <name>
  -h, --help
```

### `backstage-cli config schema`

```
Usage: <none>

Options:
  --format
  --help
  --merge
  --no-merge
  --package
  --version
```

### `backstage-cli config:check`

```
Usage: <none>

Options:
  --config
  --deprecated
  --frontend
  --help
  --lax
  --package
  --strict
  --version
```

### `backstage-cli config:docs`

```
Usage: program [options]

Options:
  --package <name>
  -h, --help
```

### `backstage-cli config:print`

```
Usage: <none>

Options:
  --config
  --format
  --frontend
  --help
  --lax
  --package
  --version
  --with-secrets
```

### `backstage-cli config:schema`

```
Usage: <none>

Options:
  --format
  --help
  --merge
  --no-merge
  --package
  --version
```

### `backstage-cli create-github-app`

```
Usage: program [options] <github-org>

Options:
  -h, --help
```

### `backstage-cli info`

```
Usage: <none>

Options:
  --help
  --version
```

### `backstage-cli migrate`

```
Usage: backstage-cli migrate [options] [command] [command]

Options:
  -h, --help

Commands:
  help [command]
  package-exports
  package-lint-configs
  package-roles
  package-scripts
  react-router-deps
```

### `backstage-cli migrate package-exports`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli migrate package-lint-configs`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli migrate package-roles`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli migrate package-scripts`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli migrate react-router-deps`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli new`

```
Usage: program [options]

Options:
  --baseVersion <version>
  --license <license>
  --no-private
  --npm-registry <URL>
  --option <name>=<value>
  --scope <scope>
  --select <name>
  --skip-install
  -h, --help
```

### `backstage-cli package`

```
Usage: backstage-cli package [options] [command] [command]

Options:
  -h, --help

Commands:
  build
  clean
  help [command]
  lint
  postpack
  prepack
  start
  test
```

### `backstage-cli package build`

```
Usage: program [options]

Options:
  --config <path>
  --minify
  --role <name>
  --skip-build-dependencies
  --stats
  -h, --help
```

### `backstage-cli package clean`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli package lint`

```
Usage: program [options] [directories...]

Options:
  --fix
  --format <format>
  --max-warnings <number>
  --output-file <path>
  -h, --help
```

### `backstage-cli package postpack`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli package prepack`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli package start`

```
Usage: program [options]

Options:
  --check
  --config <path>
  --inspect [host]
  --inspect-brk [host]
  --link <path>
  --require <path...>
  --role <name>
  -h, --help
```

### `backstage-cli package test`

```
Usage: backstage-cli [--config=<pathToConfigFile>] [TestPathPattern]

Options:
  --all
  --automock
  --cache
  --cacheDirectory
  --changedFilesWithAncestor
  --changedSince
  --ci
  --clearCache
  --clearMocks
  --collectCoverage
  --collectCoverageFrom
  --color
  --colors
  --coverage
  --coverageDirectory
  --coveragePathIgnorePatterns
  --coverageProvider
  --coverageReporters
  --coverageThreshold
  --debug
  --detectLeaks
  --detectOpenHandles
  --env
  --errorOnDeprecated
  --filter
  --findRelatedTests
  --forceExit
  --globalSetup
  --globalTeardown
  --globals
  --haste
  --ignoreProjects
  --init
  --injectGlobals
  --json
  --lastCommit
  --listTests
  --logHeapUsage
  --maxConcurrency
  --moduleDirectories
  --moduleFileExtensions
  --moduleNameMapper
  --modulePathIgnorePatterns
  --modulePaths
  --noStackTrace
  --notify
  --notifyMode
  --openHandlesTimeout
  --outputFile
  --passWithNoTests
  --preset
  --prettierPath
  --projects
  --randomize
  --reporters
  --resetMocks
  --resetModules
  --resolver
  --restoreMocks
  --rootDir
  --roots
  --runTestsByPath
  --runner
  --seed
  --selectProjects
  --setupFiles
  --setupFilesAfterEnv
  --shard
  --showConfig
  --showSeed
  --silent
  --skipFilter
  --snapshotSerializers
  --testEnvironment
  --testEnvironmentOptions
  --testFailureExitCode
  --testLocationInResults
  --testMatch
  --testPathIgnorePatterns
  --testPathPattern
  --testRegex
  --testResultsProcessor
  --testRunner
  --testSequencer
  --testTimeout
  --transform
  --transformIgnorePatterns
  --unmockedModulePathPatterns
  --useStderr
  --verbose
  --version
  --watch
  --watchAll
  --watchPathIgnorePatterns
  --watchman
  --workerThreads
  -b, --bail
  -c, --config
  -e, --expand
  -f, --onlyFailures
  -h, --help
  -i, --runInBand
  -o, --onlyChanged
  -t, --testNamePattern
  -u, --updateSnapshot
  -w, --maxWorkers
```

### `backstage-cli repo`

```
Usage: backstage-cli repo [options] [command] [command]

Options:
  -h, --help

Commands:
  build
  clean
  fix
  help [command]
  lint
  list-deprecations
  start
  test
```

### `backstage-cli repo build`

```
Usage: program [options] [command]

Options:
  --all
  --minify
  --since <ref>
  -h, --help
```

### `backstage-cli repo clean`

```
Usage: program [options]

Options:
  -h, --help
```

### `backstage-cli repo fix`

```
Usage: program [options]

Options:
  --check
  --publish
  -h, --help
```

### `backstage-cli repo lint`

```
Usage: program [options] [command]

Options:
  --fix
  --format <format>
  --max-warnings <number>
  --output-file <path>
  --since <ref>
  --successCache
  --successCacheDir <path>
  -h, --help
```

### `backstage-cli repo list-deprecations`

```
Usage: program [options]

Options:
  --json
  -h, --help
```

### `backstage-cli repo start`

```
Usage: program [options] [packageNameOrPath...]

Options:
  --config <path>
  --inspect [host]
  --inspect-brk [host]
  --link <path>
  --plugin <pluginId>
  --require <path...>
  -h, --help
```

### `backstage-cli repo test`

```
Usage: program [options]

Options:
  --jest-help
  --since <ref>
  --successCache
  --successCacheDir <path>
  -h, --help
```

### `backstage-cli versions:bump`

```
Usage: program [options]

Options:
  --pattern <glob>
  --release <version|next|main>
  --skip-install
  --skip-migrate
  -h, --help
```

### `backstage-cli versions:migrate`

```
Usage: program [options]

Options:
  --pattern <glob>
  --skip-code-changes
  -h, --help
```
