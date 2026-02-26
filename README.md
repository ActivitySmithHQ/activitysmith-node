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

## Usage

### Send a Push Notification

<p align="center">
  <img src="https://cdn.activitysmith.com/features/new-subscription-push-notification.png" alt="Push notification example" width="680" />
</p>

```ts
const response = await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
});

console.log(response.success);
console.log(response.devices_notified);
```

### Start a Live Activity

<p align="center">
  <img src="https://cdn.activitysmith.com/features/start-live-activity.png" alt="Start live activity example" width="680" />
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

### Update a Live Activity

<p align="center">
  <img src="https://cdn.activitysmith.com/features/update-live-activity.png" alt="Update live activity example" width="680" />
</p>

```ts
const update = await activitysmith.liveActivities.update({
  activity_id: activityId,
  content_state: {
    title: "Nightly database backup",
    subtitle: "upload archive",
    current_step: 2,
  },
});

console.log(update.devices_notified);
```

### End a Live Activity

<p align="center">
  <img src="https://cdn.activitysmith.com/features/end-live-activity.png" alt="End live activity example" width="680" />
</p>

```ts
const end = await activitysmith.liveActivities.end({
  activity_id: activityId,
  content_state: {
    title: "Nightly database backup",
    subtitle: "verify restore",
    current_step: 3,
    auto_dismiss_minutes: 2,
  },
});

console.log(end.success);
```

## Channels

Channels are used to target specific team members or devices. Can be used for both notifications and live activities.

```ts
const response = await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
  channels: ["sales", "customer-success"], // Optional
});
```

## Push Notification Redirection and Actions

Push notification redirection and actions are optional and can be used to redirect the user to a specific URL or to trigger a specific action.
Webhooks are executed by ActivitySmith backend.

```ts
const response = await activitysmith.notifications.send({
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
