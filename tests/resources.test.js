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

  it("preserves shortcuts redirection for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      title: "Task finished",
      redirection: "shortcuts://run-shortcut?name=Jarvis",
    };

    await client.notifications.send(payload);

    expect(sendSpy).toHaveBeenCalledWith({ pushNotificationRequest: payload }, undefined);
  });

  it("preserves shortcuts open_url actions for notifications.send", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const sendSpy = vi
      .spyOn(generated.PushNotificationsApi.prototype, "sendPushNotification")
      .mockResolvedValue({ success: true });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      title: "Task finished",
      actions: [
        {
          title: "Run Shortcut",
          type: "open_url",
          url: "shortcuts://run-shortcut?name=Jarvis",
        },
      ],
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

  it("passes through timer content_state fields", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      content_state: ActivitySmith.contentState({
        title: "Benchmark Run",
        subtitle: "sampling performance",
        type: ActivitySmith.liveActivityTypes.timer,
        duration_seconds: 300,
        counts_down: true,
        color: "cyan",
      }),
    };

    await client.liveActivities.start(payload);

    expect(payload.content_state).toEqual({
      title: "Benchmark Run",
      subtitle: "sampling performance",
      type: "timer",
      duration_seconds: 300,
      counts_down: true,
      color: "cyan",
    });
    expect(startSpy).toHaveBeenCalledWith({ liveActivityStartRequest: payload }, undefined);
  });

  it("passes through stats content_state with metric accent colors", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const startSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "startLiveActivity")
      .mockResolvedValue({ activity_id: "act-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      content_state: {
        title: "Sales",
        subtitle: "last hour",
        type: ActivitySmith.liveActivityTypes.stats,
        metrics: [
          { label: "Revenue", value: "$2430", color: "blue" },
          { label: "Orders", value: "37", color: "green" },
          { label: "Conversion", value: "4.8%", color: "magenta" },
        ],
      },
    };

    await client.liveActivities.start(payload);

    expect(startSpy).toHaveBeenCalledWith({ liveActivityStartRequest: payload }, undefined);
  });

  it("passes through alert content_state with icon and badge colors", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const streamSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "reconcileLiveActivityStream")
      .mockResolvedValue({ operation: "started", stream_key: "customer-ops" });

    const client = new ActivitySmith({ apiKey: "test" });
    const payload = {
      content_state: ActivitySmith.contentState({
        title: "Reactivation",
        message: "Lumen came back after 2 weeks",
        type: ActivitySmith.liveActivityTypes.alert,
        color: "red",
        icon: ActivitySmith.alertIcon("cloud.sun", { color: "yellow" }),
        badge: ActivitySmith.alertBadge("Customer", { color: "magenta" }),
      }),
    };

    await client.liveActivities.stream("customer-ops", payload);

    expect(streamSpy).toHaveBeenCalledWith(
      {
        streamKey: "customer-ops",
        liveActivityStreamRequest: {
          content_state: {
            title: "Reactivation",
            message: "Lumen came back after 2 weeks",
            type: ActivitySmith.liveActivityTypes.alert,
            color: "red",
            icon: { symbol: "cloud.sun", color: "yellow" },
            badge: { title: "Customer", color: "magenta" },
          },
        },
      },
      undefined,
    );
  });

  it("passes through icon and badge on non-alert live activity types", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const streamSpy = vi
      .spyOn(generated.LiveActivitiesApi.prototype, "reconcileLiveActivityStream")
      .mockResolvedValue({ operation: "started", stream_key: "prod-web-1" });

    const client = new ActivitySmith({ apiKey: "test" });
    await client.liveActivities.stream("prod-web-1", {
      content_state: ActivitySmith.contentState({
        title: "Server Health",
        subtitle: "prod-web-1",
        type: ActivitySmith.liveActivityTypes.metrics,
        icon: ActivitySmith.alertIcon("server.rack", { color: "blue" }),
        metrics: [{ label: "CPU", value: 18, unit: "%" }],
      }),
    });
    await client.liveActivities.stream("nightly-database-backup", {
      content_state: ActivitySmith.contentState({
        title: "Nightly Database Backup",
        subtitle: "verify restore",
        type: ActivitySmith.liveActivityTypes.progress,
        badge: ActivitySmith.alertBadge("S3", { color: "cyan" }),
        percentage: 62,
      }),
    });

    expect(streamSpy).toHaveBeenNthCalledWith(
      1,
      {
        streamKey: "prod-web-1",
        liveActivityStreamRequest: {
          content_state: {
            title: "Server Health",
            subtitle: "prod-web-1",
            type: ActivitySmith.liveActivityTypes.metrics,
            icon: { symbol: "server.rack", color: "blue" },
            metrics: [{ label: "CPU", value: 18, unit: "%" }],
          },
        },
      },
      undefined,
    );
    expect(streamSpy).toHaveBeenNthCalledWith(
      2,
      {
        streamKey: "nightly-database-backup",
        liveActivityStreamRequest: {
          content_state: {
            title: "Nightly Database Backup",
            subtitle: "verify restore",
            type: ActivitySmith.liveActivityTypes.progress,
            badge: { title: "S3", color: "cyan" },
            percentage: 62,
          },
        },
      },
      undefined,
    );
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
        url: "shortcuts://run-shortcut?name=Deploy%20Status",
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
        url: "shortcuts://run-shortcut?name=Deploy%20Status",
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

  it("wraps metric values for metrics.update", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const updateSpy = vi
      .spyOn(generated.MetricsApi.prototype, "updateMetricValue")
      .mockResolvedValue({ metric: { key: "deploy.success_rate", latest_value: 99.9 } });

    const client = new ActivitySmith({ apiKey: "test" });

    await client.metrics.update("deploy.success_rate", 99.9, {
      timestamp: "2026-05-03T12:30:00.000Z",
    });
    await client.metrics.update("prod.status", { value: "healthy" });

    expect(updateSpy).toHaveBeenNthCalledWith(
      1,
      {
        key: "deploy.success_rate",
        metricValueUpdateRequest: {
          value: 99.9,
          timestamp: "2026-05-03T12:30:00.000Z",
        },
      },
      undefined,
    );
    expect(updateSpy).toHaveBeenNthCalledWith(
      2,
      {
        key: "prod.status",
        metricValueUpdateRequest: { value: "healthy" },
      },
      undefined,
    );
  });

  it("keeps long metric aliases working", async () => {
    const ActivitySmith = require("../dist/src/index.js");
    const generated = require("../dist/generated/index.js");

    const updateSpy = vi
      .spyOn(generated.MetricsApi.prototype, "updateMetricValue")
      .mockResolvedValue({ metric: { key: "deploy.success_rate", latest_value: 42 } });

    const client = new ActivitySmith({ apiKey: "test" });
    const request = {
      key: "deploy.success_rate",
      metricValueUpdateRequest: { value: 42 },
    };

    await client.metrics.updateMetricValue(request);
    expect(updateSpy).toHaveBeenCalledWith(request, undefined);
  });
});
