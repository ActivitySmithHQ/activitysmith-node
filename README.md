# ActivitySmith Node SDK

The ActivitySmith Node SDK provides convenient access to the ActivitySmith API from server-side JavaScript and TypeScript applications.

## Documentation

See [API reference](https://activitysmith.com/docs/api-reference/introduction)

## Installation

```sh
npm install activitysmith
```

## Usage

ESM:

```ts
import ActivitySmith from "activitysmith";

const activitysmith = new ActivitySmith({
  apiKey: process.env.ACTIVITYSMITH_API_KEY,
});

// Push Notifications
await activitysmith.notifications.send({
  // See PushNotificationRequest for fields
});

// Live Activities
await activitysmith.liveActivities.start({
  // See LiveActivityStartRequest for fields
});
```

CommonJS:

```js
const ActivitySmith = require("activitysmith");

const activitysmith = new ActivitySmith({
  apiKey: process.env.ACTIVITYSMITH_API_KEY,
});
```

## API Surface

The client exposes grouped resources:

- `activitysmith.liveActivities`
- `activitysmith.notifications`

Each method is fully typed. Request and response types are included in the type definitions.

## TypeScript Support

This package is written in TypeScript and ships with type definitions out of the box.

## Requirements

- Node.js 18 or newer

## License

MIT
