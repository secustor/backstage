---
'@backstage/repo-tools': minor
---

Replaced `@useoptic/optic` with `oasdiff` for OpenAPI breaking change detection. The `@useoptic/optic` peer dependency has been removed. The `oasdiff` binary is now automatically installed via a `postinstall` hook. The `@useoptic/openapi-utilities` dependency has also been removed with types inlined.
