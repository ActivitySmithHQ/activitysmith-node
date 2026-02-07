import { createRequire } from "node:module";
import { afterEach, describe, expect, it, vi } from "vitest";

const require = createRequire(import.meta.url);

describe("resource wrappers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("wraps push payload for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = { title: "Build Failed" };
    const result = await client.notifications.send(payload);

    expect(result).toEqual({ success: true });
    expect(sendSpy).toHaveBeenCalledWith({ pushNotificationRequest: payload }, undefined);
  });

  it("keeps long notification alias working", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const request = { pushNotificationRequest: { title: "Build Failed" } };
    await client.notifications.sendPushNotification(request);

    expect(sendSpy).toHaveBeenCalledWith(request);
  });

  it("wraps live activity payloads for short methods", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });
    const updateSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "updateLiveActivity")
      .mockResolvedValue({ success: true });
    const endSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "endLiveActivity")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const startPayload = {
      content_state: {
        title: "Deploy",
        number_of_steps: 4,
        current_step: 1,
        type: "segmented_progress",
      },
    };

    await client.liveActivities.start(startPayload);
    await client.liveActivities.update({
      activity_id: "act-1",
      content_state: { title: "Deploy", current_step: 2 },
    });
    await client.liveActivities.end({
      activity_id: "act-1",
      content_state: { title: "Deploy", current_step: 4 },
    });

    expect(startSpy).toHaveBeenCalledWith({ liveActivityStartRequest: startPayload }, undefined);
    expect(updateSpy).toHaveBeenCalledWith(
      {
        liveActivityUpdateRequest: {
          activity_id: "act-1",
          content_state: { title: "Deploy", current_step: 2 },
        },
      },
      undefined,
    );
    expect(endSpy).toHaveBeenCalledWith(
      {
        liveActivityEndRequest: {
          activity_id: "act-1",
          content_state: { title: "Deploy", current_step: 4 },
        },
      },
      undefined,
    );
  });

  it("keeps long live activity aliases working", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    const request = {
      liveActivityStartRequest: {
        content_state: {
          title: "Deploy",
          number_of_steps: 4,
          current_step: 1,
          type: "segmented_progress",
        },
      },
    };

    await client.liveActivities.startLiveActivity(request);
    expect(startSpy).toHaveBeenCalledWith(request);
  });
});
