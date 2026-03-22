import { createRequire } from "node:module";
import { afterEach, describe, expect, it, vi } from "vitest";

const require = createRequire(import.meta.url);

describe("smoke", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("constructs a client without throwing", () => {
    globalThis.fetch = vi.fn(async () => new Response(null, { status: 200 }));

    const { Configuration, LiveActivitiesApi } = require("../dist/generated/index.js");
    const config = new Configuration({ accessToken: "test" });
    const client = new LiveActivitiesApi(config);

    expect(client).toBeTruthy();
  });

  it("supports short method names for resources", async () => {
    const fetchSpy = vi.fn(async () =>
      new Response(
        JSON.stringify({
          success: true,
          devices_notified: 1,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );

    globalThis.fetch = fetchSpy;

    const ActivitySmith = require("../dist/src/index.js");
    const client = new ActivitySmith({ apiKey: "test" });

    await client.notifications.send({ title: "Build Failed" });
    await client.liveActivities.start({
      content_state: {
        title: "Deploy",
        number_of_steps: 4,
        current_step: 1,
        type: "segmented_progress",
      },
    });
    await client.liveActivities.stream("prod-web-1", {
      content_state: {
        title: "Server Health",
        subtitle: "prod-web-1",
        type: "metrics",
        metrics: [{ label: "CPU", value: 9, unit: "%" }],
      },
    });

    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(String(fetchSpy.mock.calls[0][0])).toContain("/push-notification");
    expect(String(fetchSpy.mock.calls[1][0])).toContain("/live-activity/start");
    expect(String(fetchSpy.mock.calls[2][0])).toContain("/live-activity/stream/prod-web-1");
  });
});
