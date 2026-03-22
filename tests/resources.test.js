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

  it("maps top-level channels to target.channels for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    await client.notifications.send({
      title: "Build Failed",
      channels: ["devs", "ops"],
    });

    expect(sendSpy).toHaveBeenCalledWith(
      {
        pushNotificationRequest: {
          title: "Build Failed",
          target: { channels: ["devs", "ops"] },
        },
      },
      undefined,
    );
  });

  it("preserves media and redirection for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      title: "Voice Over Generated",
      media: "https://cdn.activitysmith.com/voice_over.mp3",
      redirection: "https://studio.acme.com/voice-overs/482/review",
    };

    await client.notifications.send(payload);

    expect(sendSpy).toHaveBeenCalledWith({ pushNotificationRequest: payload }, undefined);
  });

  it("rejects media with actions for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");

    const client = new ActivitySmith({ apiKey: "test" });

    expect(() =>
      client.notifications.send({
        title: "Voice Over Generated",
        media: "https://cdn.activitysmith.com/voice_over.mp3",
        actions: [{ title: "Open", type: "open_url", url: "https://example.com" }],
      }),
    ).toThrow("ActivitySmith: media cannot be combined with actions");
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

    expect(sendSpy).toHaveBeenCalledWith(request, undefined);
  });

  it("rejects media with actions for the long notification alias", async () => {
    const ActivitySmith = require("../dist/src/index.js");

    const client = new ActivitySmith({ apiKey: "test" });

    expect(() =>
      client.notifications.sendPushNotification({
        pushNotificationRequest: {
          title: "Voice Over Generated",
          media: "https://cdn.activitysmith.com/voice_over.mp3",
          actions: [{ title: "Open", type: "open_url", url: "https://example.com" }],
        },
      }),
    ).toThrow("ActivitySmith: media cannot be combined with actions");
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

  it("maps top-level channels to target.channels for liveActivities.start", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    await client.liveActivities.start({
      content_state: {
        title: "Deploy",
        number_of_steps: 4,
        current_step: 1,
        type: "segmented_progress",
      },
      channels: ["devs", "ops"],
    });

    expect(startSpy).toHaveBeenCalledWith(
      {
        liveActivityStartRequest: {
          content_state: {
            title: "Deploy",
            number_of_steps: 4,
            current_step: 1,
            type: "segmented_progress",
          },
          target: { channels: ["devs", "ops"] },
        },
      },
      undefined,
    );
  });

  it("passes through progress content_state without segmented fields", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      content_state: {
        title: "Render export",
        subtitle: "encoding frames",
        type: "progress",
        percentage: 67,
        color: "purple",
      },
    };

    await client.liveActivities.start(payload);

    expect(startSpy).toHaveBeenCalledWith({ liveActivityStartRequest: payload }, undefined);
  });

  it("wraps live activity stream payloads for short methods", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const streamSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "reconcileLiveActivityStream")
      .mockResolvedValue({ operation: "started", stream_key: "prod-web-1" });
    const endStreamSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "endLiveActivityStream")
      .mockResolvedValue({ operation: "ended", stream_key: "prod-web-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    await client.liveActivities.stream("prod-web-1", {
      content_state: {
        title: "Server Health",
        subtitle: "prod-web-1",
        type: "metrics",
        metrics: [
          { label: "CPU", value: 9, unit: "%" },
          { label: "MEM", value: 45, unit: "%" },
        ],
      },
      channels: ["ops"],
    });
    await client.liveActivities.endStream("prod-web-1");

    expect(streamSpy).toHaveBeenCalledWith(
      {
        streamKey: "prod-web-1",
        liveActivityStreamRequest: {
          content_state: {
            title: "Server Health",
            subtitle: "prod-web-1",
            type: "metrics",
            metrics: [
              { label: "CPU", value: 9, unit: "%" },
              { label: "MEM", value: 45, unit: "%" },
            ],
          },
          target: { channels: ["ops"] },
        },
      },
      undefined,
    );
    expect(endStreamSpy).toHaveBeenCalledWith({ streamKey: "prod-web-1" }, undefined);
  });

  it("keeps long stream aliases working", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const streamSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "reconcileLiveActivityStream")
      .mockResolvedValue({ operation: "started", stream_key: "prod-web-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    const request = {
      streamKey: "prod-web-1",
      liveActivityStreamRequest: {
        content_state: {
          title: "Server Health",
          subtitle: "prod-web-1",
          type: "metrics",
          metrics: [{ label: "CPU", value: 9, unit: "%" }],
        },
      },
    };

    await client.liveActivities.reconcileLiveActivityStream(request);
    expect(streamSpy).toHaveBeenCalledWith(request);
  });

  it("passes through live activity actions for short methods", async () => {
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
        title: "Deploying payments-api",
        subtitle: "Running database migrations",
        number_of_steps: 5,
        current_step: 3,
        type: "segmented_progress",
      },
      action: {
        title: "Open Workflow",
        type: "open_url",
        url: "https://github.com/acme/payments-api/actions/runs/1234567890",
      },
    };

    const updatePayload = {
      activity_id: "act-1",
      content_state: {
        title: "Reindexing product search",
        subtitle: "Shard 7 of 12",
        number_of_steps: 12,
        current_step: 7,
      },
      action: {
        title: "Pause Reindex",
        type: "webhook",
        url: "https://ops.example.com/hooks/search/reindex/pause",
        method: "POST",
        body: { job_id: "reindex-2026-03-19" },
      },
    };

    const endPayload = {
      activity_id: "act-1",
      content_state: {
        title: "Deploying payments-api",
        subtitle: "Production rollout complete",
        number_of_steps: 5,
        current_step: 5,
      },
      action: {
        title: "Open Workflow",
        type: "open_url",
        url: "https://github.com/acme/payments-api/actions/runs/1234567890",
      },
    };

    await client.liveActivities.start(startPayload);
    await client.liveActivities.update(updatePayload);
    await client.liveActivities.end(endPayload);

    expect(startSpy).toHaveBeenCalledWith({ liveActivityStartRequest: startPayload }, undefined);
    expect(updateSpy).toHaveBeenCalledWith({ liveActivityUpdateRequest: updatePayload }, undefined);
    expect(endSpy).toHaveBeenCalledWith({ liveActivityEndRequest: endPayload }, undefined);
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
