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

Live Activities come in two UI types, but the lifecycle stays the same:
start the activity, keep the returned `activity_id`, update it as state
changes, then end it when the work is done.

- `segmented_progress`: best for jobs tracked in steps
- `progress`: best for jobs tracked as a percentage or numeric range

### Shared flow

1. Call `activitysmith.liveActivities.start(...)`.
2. Save the returned `activity_id`.
3. Call `activitysmith.liveActivities.update(...)` as progress changes.
4. Call `activitysmith.liveActivities.end(...)` when the work is finished.

### Segmented Progress Type

Use `segmented_progress` when progress is easier to follow as steps instead of a
raw percentage. It fits jobs like backups, deployments, ETL pipelines, and
checklists where "step 2 of 3" is more useful than "67%".
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
  channels: ["devs", "ops"], // Optional
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
    number_of_steps: 4,
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
    number_of_steps: 4,
    current_step: 4,
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

  <img src="https://cdn.activitysmith.com/features/live-activity-with-action.png" alt="Live Activity with action" width="680" />

#### Open URL action

```ts
const start = await activitysmith.liveActivities.start({
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
});

const activityId = start.activity_id;
```

#### Webhook action

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
