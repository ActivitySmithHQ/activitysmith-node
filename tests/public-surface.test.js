import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { expect, it } from "vitest";

const require = createRequire(import.meta.url);
it("does not package removed internal APIs or models", () => {
  const generated = require("../dist/generated/index.js");
  expect(generated).not.toHaveProperty("PublicApi");
  const files = readdirSync(new URL("../dist/", import.meta.url), { recursive: true });
  expect(files.filter(file => /(?:PublicApi|HealthResponse|HealthCheck|ChangelogEntry|ChangelogItem|ChangelogListResponse)\.(?:js|d\.ts)$/.test(file))).toEqual([]);
});
