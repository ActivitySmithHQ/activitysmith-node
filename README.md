# ActivitySmith Node SDK

The ActivitySmith Node SDK provides convenient access to the ActivitySmith API from server-side JavaScript and TypeScript applications.

## Documentation

See [API reference](https://activitysmith.com/docs/api-reference/introduction)

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Push Notifications](#push-notifications)
  - [Send a Push Notification](#send-a-push-notification)
  - [Rich Push Notifications with Media](#rich-push-notifications-with-media)
  - [Actionable Push Notifications](#actionable-push-notifications)
- [App Icon Badge Count](#app-icon-badge-count)
  - [Update App Icon Badge Count](#update-app-icon-badge-count)
- [Live Activities](#live-activities)
  - [Start & Update Live Activity](#start--update-live-activity)
  - [End Live Activity](#end-live-activity)
  - [Live Activity Action](#live-activity-action)
  - [Icons and Badges](#icons-and-badges)
  - [Live Activity Colors](#live-activity-colors)
- [Channels](#channels)
- [Widgets](#widgets)

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

Push notification `redirection` and `actions` are optional. Use them to open HTTPS URLs, run a specific iPhone Shortcut with `shortcuts://run-shortcut?name=...`, or trigger backend webhook workflows.
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
      title: "Chat with Jarvis",
      type: "open_url",
      url: "shortcuts://run-shortcut?name=Jarvis",
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

## App Icon Badge Count

Set the number shown on the ActivitySmith app icon across devices in your API key's account scope. This is separate from push notifications.

### Update App Icon Badge Count

```ts
await activitysmith.appIconBadge.update(12);
```

Pass `0` to clear the count:

```ts
await activitysmith.appIconBadge.update(0);
```

Use `channels` to update only devices in selected channels:

```ts
await activitysmith.appIconBadge.update(3, {
  channels: ["sales", "customer-success"],
});
```

## Live Activities

There are six types of Live Activities:

- `stats`: best for showing business numbers side by side, such as revenue, sales, new users, conversion, refunds, or any other value you want visible at a glance
- `metrics`: best for live percentage values that change often, like server CPU, memory usage, disk usage, or error rate
- `segmented_progress`: best for anything that moves through clear stages, like deployments, onboarding flows, backups, ETL pipelines, migrations, and AI agent runs
- `progress`: best for tracking real-time progress with percentage, like tasks, backups, migrations, syncs, or uploads
- `alert`: best for status updates, such as feature adoption, reactivation, onboarding blockers, incidents, escalations, and other operational states
- `timer`: best for countdowns and elapsed runtime, like benchmark runs, uploads, backups, transcodes, and long-running jobs

### Start & Update Live Activity

Use a stable `streamKey` to identify the metric, job, deployment, or system you want to keep visible. The first `stream(...)` call starts the Live Activity. Later calls with the same `streamKey` update it.

#### Stats

<p align="center">
  <img src="https://cdn.activitysmith.com/features/stats-live-activity.png" alt="Stats Live Activity stream example" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("sales-hourly", {
  content_state: {
    title: "Sales",
    subtitle: "last hour",
    type: "stats",
    metrics: [
      { label: "Revenue", value: "$2430", color: "blue" },
      { label: "Orders", value: "37", color: "green" },
      { label: "Conversion", value: "4.8%", color: "magenta" },
      { label: "Avg Order", value: "$65.68", color: "yellow" },
      { label: "Refunds", value: "$84", color: "red" },
      { label: "New Buyers", value: "18", color: "cyan" },
    ],
  },
});
```

#### Metrics

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-start.png" alt="Metrics Live Activity stream example" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("prod-web-1", {
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

#### Segmented Progress

<p align="center">
  <img src="https://cdn.activitysmith.com/features/update-live-activity.png" alt="Segmented Progress Live Activity stream example" width="680" />
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
  <img src="https://cdn.activitysmith.com/features/progress-live-activity.png" alt="Progress Live Activity stream example" width="680" />
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

#### Alert

<p align="center">
  <img src="https://cdn.activitysmith.com/features/alert-live-activity.png" alt="Alert Live Activity stream example" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("customer-ops", {
  content_state: ActivitySmith.contentState({
    title: "Reactivation",
    message: "Lumen came back after 2 weeks",
    type: "alert",
    icon: ActivitySmith.alertIcon("cloud.sun", { color: "yellow" }),
    badge: ActivitySmith.alertBadge("Customer", { color: "magenta" }),
  }),
});
```

#### Timer

<p align="center">
  <img src="https://cdn.activitysmith.com/features/timer-live-activity.png" alt="Timer Live Activity showing a benchmark run countdown" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("benchmark-run", {
  content_state: {
    title: "Benchmark Run",
    subtitle: "sampling",
    type: "timer",
    duration_seconds: 300,
    color: "cyan",
  },
});
```

For a countdown, send `duration_seconds`. You can update `title`, `subtitle`, `color`, or any other visible field as the work changes. Leave `duration_seconds` out unless you want to change the timer.

To start at 00:00 and count up, set `counts_down: false` and leave out `duration_seconds`.

### End Live Activity

Call `endStream(...)` with the same `streamKey` to dismiss the Live Activity. You can include final values before it is removed. By default, iOS removes the Live Activity after two minutes. Set `auto_dismiss_minutes` to choose a different dismissal time, including `0` for immediate dismissal.

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
    auto_dismiss_minutes: 2,
  },
});
```

### Live Activity Action

Live Activities can include an action button.

- `open_url`: open an HTTPS URL.
- `open_url` with a `shortcuts://` URL: run an Apple Shortcut, for example to open an app.
- `webhook`: trigger a backend GET/POST workflow.

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-action.png" alt="Live Activity with action button" width="680" />
</p>

#### Open URL action

```ts
await activitysmith.liveActivities.stream("prod-web-1", {
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
    title: "Dashboard",
    type: "open_url",
    url: "https://ops.example.com/servers/prod-web-1",
  },
});
```

#### Apple Shortcut action

```ts
await activitysmith.liveActivities.stream("deploy-payments-api", {
  content_state: {
    title: "Deploying payments-api",
    subtitle: "Running database migrations",
    type: "segmented_progress",
    number_of_steps: 5,
    current_step: 3,
  },
  action: {
    title: "Chat with Jarvis",
    type: "open_url",
    url: "shortcuts://run-shortcut?name=Jarvis",
  },
});
```

#### Webhook action

```ts
await activitysmith.liveActivities.stream("search-reindex", {
  content_state: {
    title: "Reindexing product search",
    subtitle: "Shard 7 of 12",
    type: "segmented_progress",
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

#### Secondary action

<p align="center">
  <img src="https://cdn.activitysmith.com/features/live-activity-secondary-action.png" alt="Alert Live Activity with primary and secondary action buttons" width="680" />
</p>

Use `secondary_action` when you want a second button beside the primary `action`.

The secondary action button is supported for `alert`, `progress`, and `segmented_progress` Live Activities. Both buttons use the same `open_url`, `webhook`, and Apple Shortcut payload shapes.

```ts
await activitysmith.liveActivities.stream("agent-approval", {
  content_state: {
    title: "Approval Needed",
    message: "Should I send the follow-up email to Brightlane?",
    type: "alert",
    color: "green",
    icon: {
      symbol: "sparkles",
      color: "green",
    },
    badge: {
      title: "Agent",
      color: "green",
    },
  },
  action: {
    title: "Send",
    type: "webhook",
    url: "https://agent.example.com/live-activity/approve",
    method: "POST",
    body: {
      approval_id: "approval_01JY3J7Q9S0P8M1V5PZK7DR4M2",
      decision: "send",
    },
  },
  secondary_action: {
    title: "Deny",
    type: "webhook",
    url: "https://agent.example.com/live-activity/deny",
    method: "POST",
    body: {
      approval_id: "approval_01JY3J7Q9S0P8M1V5PZK7DR4M2",
      decision: "deny",
    },
  },
});
```

### Icons and Badges

Add more context to Live Activities with icons and badges.

#### Icon

Supported Live Activity types: `stats`, `metrics`, `progress`, `segmented_progress`, `alert`, and `timer`.

<p align="center">
  <img src="https://cdn.activitysmith.com/features/metrics-live-activity-with-icon.png" alt="Metrics Live Activity with an SF Symbol icon on the iPhone Lock Screen" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("prod-web-1", {
  content_state: ActivitySmith.contentState({
    title: "Server Health",
    subtitle: "prod-web-1",
    type: "metrics",
    icon: ActivitySmith.alertIcon("server.rack", { color: "blue" }),
    metrics: [
      { label: "CPU", value: 18, unit: "%" },
      { label: "MEM", value: 42, unit: "%" },
    ],
  }),
});
```

The `icon.symbol` value is an Apple SF Symbol name. Browse the catalog with one of these tools:

- [ActivitySmith app](https://apps.apple.com/us/app/activitysmith/id6752254835) - Open Settings -> SF Symbols to browse 45 hand-picked icons ready to use
- [SF Symbols](https://developer.apple.com/sf-symbols/) - Apple's official macOS app
- [Interactful](https://apps.apple.com/app/interactful/id1528095640) - free third-party iOS app listing all SF Symbols under Foundations -> Iconography

#### Badge

Badges are supported by `alert`, `progress`, and `segmented_progress` Live Activities.

<p align="center">
  <img src="https://cdn.activitysmith.com/features/progress-live-activity-with-badge.png" alt="Progress Live Activity with a badge on the iPhone Lock Screen" width="680" />
</p>

```ts
await activitysmith.liveActivities.stream("nightly-database-backup", {
  content_state: ActivitySmith.contentState({
    title: "Nightly Database Backup",
    subtitle: "verify restore",
    type: "progress",
    badge: ActivitySmith.alertBadge("S3", { color: "cyan" }),
    percentage: 62,
  }),
});
```

### Live Activity Colors

Choose from these colors for the Live Activity accent, including progress bars and action buttons, or apply them to an individual icon or badge:

`lime`, `green`, `cyan`, `blue`, `purple`, `magenta`, `red`, `orange`, `yellow`, `gray`

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

ActivitySmith lets you display any value on your Lock Screen with widgets - SaaS metrics, revenue, signups, uptime, habits, or anything else you want to track. Create a metric in the <a href="https://activitysmith.com/app/widgets" target="_blank" rel="noopener noreferrer">web app</a>, then update the metric value using our API, add a widget to your lock screen and it will fetch the latest update automatically.

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
