import { createRequire } from 'node:module';
import { afterEach, expect, it, vi } from 'vitest';
const require = createRequire(import.meta.url);
const ActivitySmith = require('../dist/src/index.js');
afterEach(() => vi.unstubAllGlobals());
for (const method of ['start', 'update', 'end', 'stream', 'endStream']) {
  it(`${method} sends formatted Value strings and zero through the real serializer`, async () => {
    const bodies = [];
    vi.stubGlobal('fetch', vi.fn(async (_url, init) => {
      bodies.push(JSON.parse(init.body));
      return new Response(JSON.stringify({success: true}), {status: 200});
    }));
    const activitysmith = new ActivitySmith({apiKey: 'test'});
    for (const value of ['$1,240', '0007', '', 0, -12.75]) {
      const request = {content_state: ActivitySmith.contentState({title: 'Revenue', type: ActivitySmith.liveActivityTypes.value, value})};
      if (['update', 'end'].includes(method)) request.activity_id = 'test';
      const args = ['stream', 'endStream'].includes(method) ? ['revenue', request] : [request];
      await activitysmith.liveActivities[method](...args);
      expect(bodies.at(-1).content_state.value).toBe(value);
      expect(bodies.at(-1).content_state.type).toBe('value');
    }
  });
}
