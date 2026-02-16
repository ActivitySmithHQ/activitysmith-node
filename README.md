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
  title: "Build Failed",
  message: "CI pipeline failed on main branch",
  channels: ["devs", "ops"], // Optional
});

console.log(response.success);
console.log(response.devices_notified);
```

### Start a Live Activity

```ts
const start = await activitysmith.liveActivities.start({
  content_state: {
    title: "ActivitySmith API Deployment",
    subtitle: "start",
    number_of_steps: 4,
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
    title: "ActivitySmith API Deployment",
    subtitle: "npm i & pm2",
    current_step: 3,
  },
});

console.log(update.devices_notified);
```

### End a Live Activity

```ts
const end = await activitysmith.liveActivities.end({
  activity_id: activityId,
  content_state: {
    title: "ActivitySmith API Deployment",
    subtitle: "done",
    current_step: 4,
    auto_dismiss_minutes: 3,
  },
});

console.log(end.success);
```

## Error Handling

```ts
try {
  await activitysmith.notifications.send({
    title: "Build Failed",
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
