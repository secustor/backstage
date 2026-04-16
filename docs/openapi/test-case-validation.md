---
id: test-case-validation
title: Validate your OpenAPI spec against test data
description: Documentation on how to use `wrapServer` for OpenAPI spec validation.
---

## OpenAPI Validation using Test Cases

OpenAPI spec validation is performed by using `wrapServer` from `@backstage/backend-openapi-utils/testUtils` in your test files. This wraps your express app with a proxy that validates all requests and responses against your OpenAPI specification during test runs.

### Setup

Add the following to your `createRouter.test.ts` or `router.test.ts` file:

```diff
+ import { wrapServer } from '@backstage/backend-openapi-utils/testUtils';
+ import { Server } from 'http';

...

describe('createRouter', () => {
- let app: express.Express;
+ let app: Server;

...

- app = express().use(router);
+ app = await wrapServer(express().use(router));
```

### Running validation

Run your tests normally with `yarn backstage-cli package test`. The `wrapServer` wrapper validates all traffic against your OpenAPI spec automatically. Any mismatches between your spec and actual API behavior will be reported as test failures.

### Fixing errors

Any errors found in the generated specs can be either:

1. Fixed manually — this is usually relevant for request body or response body changes.
2. Fixed by updating the test case. This can happen where a response is mocked as:

```ts
it('should return the right value', () => {
  // We will assume that this is the actual response and update the spec accordingly.
  // Ideally, this should be a fully populated return value.
  const entity: Entity = {} as any;
  app.get('/test', () => {
    return entity;
  });
  const response = await request(app).get('/test');
  expect(response.body).toEqual(entity);
});
```

This will cause an invalid spec validation because the return value doesn't have all properties as defined in the type. Try to avoid this if possible. Something better would be:

```ts
it('should return the right value', () => {
  const entity: Entity = {
    apiVersion: 'a1',
    kind: 'k1',
    metadata: { name: 'n1' },
  };
  app.get('/test', () => {
    return entity;
  });
  const response = await request(app).get('/test');
  expect(response.body).toEqual(entity);
});
```
