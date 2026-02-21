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

```ts
const response = await activitysmith.notifications.send({
  title: "New subscription 💸",
  message: "Customer upgraded to Pro plan",
  channels: ["devs", "ops"], // Optional
});

console.log(response.success);
console.log(response.devices_notified);
```

### Start a Live Activity

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

## API Surface

- `activitysmith.notifications`
- `activitysmith.liveActivities`

## TypeScript Support

This package is written in TypeScript and ships with type definitions out of the box.

## Requirements

- Node.js 18 or newer

## License

MIT
