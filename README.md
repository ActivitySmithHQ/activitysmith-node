# ActivitySmith Node SDK

The ActivitySmith Node SDK provides convenient access to the ActivitySmith API from server-side JavaScript and TypeScript applications.

## Documentation

See [API reference](https://activitysmith.com/docs/api-reference/introduction)

## Installation

```sh
npm install activitysmith
```

## Setup

```ts
import ActivitySmith from "activitysmith";

const activitysmith = new ActivitySmith({
  apiKey: process.env.ACTIVITYSMITH_API_KEY,
});
```

CommonJS:

```js
const ActivitySmith = require("activitysmith");

const activitysmith = new ActivitySmith({
  apiKey: process.env.ACTIVITYSMITH_API_KEY,
});
```

## Push Notifications

### Send a Push Notification

<p align="center">
  <img src="https://cdn.activitysmith.com/features/new-subscription-push-notification.png" alt="Push notification example" width="680" />
</p>

```ts
await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
});
```

### Rich Push Notifications with Media

<p align="center">
  <img src="https://cdn.activitysmith.com/features/rich-push-notification-with-image.png" alt="Rich push notification with image" width="680" />
</p>

```ts
await activitysmith.notifications.send({
  title: "Homepage ready",
  message: "Your agent finished the redesign.",
  media: "https://cdn.example.com/output/homepage-v2.png",
  redirection: "https://github.com/acme/web/pull/482",
});
```

Send images, videos, or audio with your push notifications, press and hold to preview media directly from the notification, then tap through to open the linked content.

<p align="center">
  <img src="https://cdn.activitysmith.com/features/rich-push-notification-with-audio.png" alt="Rich push notification with audio" width="680" />
</p>

What will work:

- direct image URL: `.jpg`, `.png`, `.gif`, etc.
- direct audio file URL: `.mp3`, `.m4a`, etc.
- direct video file URL: `.mp4`, `.mov`, etc.
- URL that responds with a proper media `Content-Type`, even if the path has no extension

### Actionable Push Notifications

<p align="center">
  <img src="https://cdn.activitysmith.com/features/actionable-push-notifications-2.png" alt="Actionable push notification example" width="680" />
</p>

Actionable push notifications can open a URL on tap or trigger actions when someone long-presses the notification.
Webhooks are executed by the ActivitySmith backend.

```ts
await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
  redirection: "https://crm.example.com/customers/cus_9f3a1d", // Optional
  actions: [
    {
      title: "Open CRM Profile",
      type: "open_url",
      url: "https://crm.example.com/customers/cus_9f3a1d",
    },
    {
      title: "Start Onboarding Workflow",
      type: "webhook",
      url: "https://hooks.example.com/activitysmith/onboarding/start",
      method: "POST",
      body: {
        customer_id: "cus_9f3a1d",
        plan: "pro",
      },
    },
  ], // Optional (max 4)
});
```

## Live Activities

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-action.png" alt="Metrics Live Activity screenshot" width="680" />
</p>

There are three types of Live Activities:

- `metrics`: best for live operational stats like server CPU and memory, queue depth, or replica lag
- `segmented_progress`: best for step-based workflows like deployments, backups, and ETL pipelines
- `progress`: best for continuous jobs like uploads, reindexes, and long-running migrations tracked as a percentage

When working with Live Activities via our API, you have two approaches tailored to different needs. First, the stateless mode is the simplest path - one API call can initiate or update an activity, and another ends it - no state tracking on your side.

This is ideal if you want minimal complexity, perfect for automated workflows like cron jobs.

In contrast, if you need precise lifecycle control, the classic approach offers distinct calls for start, updates, and end, giving you full control over the activity's state.

In the following sections, we'll break down how to implement each method so you can choose what fits your use case best.

### Simple: Let ActivitySmith manage the Live Activity for you

Use a stable `streamKey` to identify the system or workflow you are tracking,
such as a server, deployment, or build pipeline.
This is especially useful for cron jobs and other scheduled tasks where you do
not want to store `activity_id` between runs.

#### Metrics

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-start.png" alt="Metrics stream example" width="680" />
</p>

```ts
const status = await activitysmith.liveActivities.stream("prod-web-1", {
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 9, unit: "%" },
      { label: "MEM", value: 45, unit: "%" },
    ],
  },
});
```

#### Segmented progress

<p align="center">
  <img src="https://cdn.activitysmith.com/features/update-live-activity.png" alt="Segmented progress stream example" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("nightly-backup", {
  content_state: {
    title: "Nightly Backup",
    subtitle: "upload archive",
    type: "segmented_progress",
    number_of_steps: 3,
    current_step: 2,
  },
});
```

#### Progress

<p align="center">
  <img src="https://cdn.activitysmith.com/features/progress-live-activity.png" alt="Progress stream example" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("search-reindex", {
  content_state: {
    title: "Search Reindex",
    subtitle: "catalog-v2",
    type: "progress",
    percentage: 42,
  },
});
```

Call `stream(...)` again with the same `streamKey` whenever the state changes.

#### End a stream

Use this when the tracked process is finished and you no longer want the Live
Activity on devices. `content_state` is optional here; include it if you want
to end the stream with a final state.

```ts
await activitysmith.liveActivities.endStream("prod-web-1", {
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 7, unit: "%" },
      { label: "MEM", value: 38, unit: "%" },
    ],
  },
});
```

If you later send another `stream(...)` request with the same `streamKey`,
ActivitySmith starts a new Live Activity for that stream again.

Stream responses include an `operation` field:

- `started`: ActivitySmith started a new Live Activity for this `streamKey`
- `updated`: ActivitySmith updated the current Live Activity
- `rotated`: ActivitySmith ended the previous Live Activity and started a new one
- `noop`: the incoming state matched the current state, so no update was sent
- `paused`: the stream is paused, so no Live Activity was started or updated
- `ended`: returned by `endStream(...)` after the stream is ended

### Advanced: Full lifecycle control

Use these methods when you want to manage the Live Activity lifecycle yourself:

1. Call `activitysmith.liveActivities.start(...)`.
2. Save the returned `activity_id`.
3. Call `activitysmith.liveActivities.update(...)` as progress changes.
4. Call `activitysmith.liveActivities.end(...)` when the work is finished.

### Metrics Type

Use `metrics` when you want to keep a small set of live stats visible, such as
server health, queue pressure, or database load.

#### Start

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-start.png" alt="Metrics start example" width="680" />
</p>

```ts
const start = await activitysmith.liveActivities.start({
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 9, unit: "%" },
      { label: "MEM", value: 45, unit: "%" },
    ],
  },
});

const activityId = start.activity_id;
```

#### Update

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-update.png" alt="Metrics update example" width="680" />
</p>

```ts
await activitysmith.liveActivities.update({
  activity_id: activityId,
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 76, unit: "%" },
      { label: "MEM", value: 52, unit: "%" },
    ],
  },
});
```

#### End

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-end.png" alt="Metrics end example" width="680" />
</p>

```ts
await activitysmith.liveActivities.end({
  activity_id: activityId,
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 7, unit: "%" },
      { label: "MEM", value: 38, unit: "%" },
    ],
    auto_dismiss_minutes: 2,
  },
});
```

### Segmented Progress Type

Use `segmented_progress` for jobs and workflows that move through clear steps or
phases. It fits jobs like backups, deployments, ETL pipelines, and checklists.
`number_of_steps` is dynamic, so you can increase or decrease it later if the
workflow changes.

#### Start

<p align="center">
  <img src="https://cdn.activitysmith.com/features/start-live-activity.png" alt="Segmented progress start example" width="680" />
</p>

```ts
const start = await activitysmith.liveActivities.start({
  content_state: {
    title: "Nightly database backup",
    subtitle: "create snapshot",
    number_of_steps: 3,
    current_step: 1,
    type: "segmented_progress",
    color: "yellow",
  },
});

const activityId = start.activity_id;
```

#### Update

<p align="center">
  <img src="https://cdn.activitysmith.com/features/update-live-activity.png" alt="Segmented progress update example" width="680" />
</p>

```ts
await activitysmith.liveActivities.update({
  activity_id: activityId,
  content_state: {
    title: "Nightly database backup",
    subtitle: "upload archive",
    number_of_steps: 3,
    current_step: 2,
  },
});
```

#### End

<p align="center">
  <img src="https://cdn.activitysmith.com/features/end-live-activity.png" alt="Segmented progress end example" width="680" />
</p>

```ts
await activitysmith.liveActivities.end({
  activity_id: activityId,
  content_state: {
    title: "Nightly database backup",
    subtitle: "verify restore",
    number_of_steps: 3,
    current_step: 3,
    auto_dismiss_minutes: 2,
  },
});
```

### Progress Type

Use `progress` when the state is naturally continuous. It fits charging,
downloads, sync jobs, uploads, timers, and any flow where a percentage or
numeric range is the clearest signal.

#### Start

<p align="center">
  <img src="https://cdn.activitysmith.com/features/progress-live-activity-start.png" alt="Progress start example" width="680" />
</p>

```ts
const start = await activitysmith.liveActivities.start({
  content_state: {
    title: "EV Charging",
    subtitle: "Added 30 mi range",
    type: "progress",
    percentage: 15,
    color: "lime",
  },
});

const activityId = start.activity_id;
```

#### Update

<p align="center">
  <img src="https://cdn.activitysmith.com/features/progress-live-activity-update.png" alt="Progress update example" width="680" />
</p>

```ts
await activitysmith.liveActivities.update({
  activity_id: activityId,
  content_state: {
    title: "EV Charging",
    subtitle: "Added 120 mi range",
    percentage: 60,
  },
});
```

#### End

<p align="center">
  <img src="https://cdn.activitysmith.com/features/progress-live-activity-end.png" alt="Progress end example" width="680" />
</p>

```ts
await activitysmith.liveActivities.end({
  activity_id: activityId,
  content_state: {
    title: "EV Charging",
    subtitle: "Added 200 mi range",
    percentage: 100,
    auto_dismiss_minutes: 2,
  },
});
```

### Live Activity Action

Just like Actionable Push Notifications, Live Activities can have a button that opens provided URL in a browser or triggers a webhook. Webhooks are executed by the ActivitySmith backend.

#### Open URL action

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-action.png" alt="Metrics Live Activity with action" width="680" />
</p>

```ts
const start = await activitysmith.liveActivities.start({
  content_state: {
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    metrics: [
      { label: "CPU", value: 76, unit: "%" },
      { label: "MEM", value: 52, unit: "%" },
    ],
  },
  action: {
    title: "Open Dashboard",
    type: "open_url",
    url: "https://ops.example.com/servers/prod-web-1",
  },
});

const activityId = start.activity_id;
```

#### Webhook action

<p align="center">
  <img src="https://cdn.activitysmith.com/features/live-activity-with-action.png?v=20260319-1" alt="Live Activity with action" width="680" />
</p>

```ts
await activitysmith.liveActivities.update({
  activity_id: activityId,
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
    body: {
      job_id: "reindex-2026-03-19",
      requested_by: "activitysmith-node",
    },
  },
});
```

## Channels

Channels are used to target specific team members or devices. Can be used for both push notifications and live activities.

```ts
await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
  channels: ["sales", "customer-success"], // Optional
});
```

## Widgets

<p align="center">
  <img src="https://cdn.activitysmith.com/features/lock-screen-widgets.png" alt="Lock screen widgets" width="680" />
</p>

ActivitySmith lets you display any value on your Lock Screen with widgets - SaaS metrics, revenue, signups, uptime, habits, or anything else you want to track. Create a metric in the web app, then update the metric value using our API, add a widget to your lock screen and it will fetch the latest update automatically.

<p align="center">
  <img src="https://cdn.activitysmith.com/features/create-widget-metric.png" alt="Create widget metric" width="680" />
</p>

Use the metric key to update its value.

```ts
await activitysmith.metrics.update("deploy.success_rate", 99.9);
```

String metric values work too.

```ts
await activitysmith.metrics.update("prod.status", "healthy");
```

## Error Handling

```ts
try {
  await activitysmith.notifications.send({
    title: "New subscription 💸",
  });
} catch (error) {
  console.error(error);
}
```

## TypeScript Support

This package is written in TypeScript and ships with type definitions out of the box.

## Requirements

- Node.js 18 or newer

## License

MIT
