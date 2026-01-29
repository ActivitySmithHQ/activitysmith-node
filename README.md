# activitysmith

Official ActivitySmith Node.js SDK (OpenAPI generated).

## Install

```sh
npm i activitysmith
```

## Usage (ESM)

```ts
import { Configuration, LiveActivitiesApi, NotificationsApi } from "activitysmith";

const config = new Configuration({
  accessToken: process.env.ACTIVITYSMITH_API_KEY,
});

const live = new LiveActivitiesApi(config);
await live.startLiveActivity({
  liveActivityStartRequest: {
    // See LiveActivityStartRequest type for fields
  },
});

const notifications = new NotificationsApi(config);
await notifications.sendPushNotification({
  pushNotificationRequest: {
    // See PushNotificationRequest type for fields
  },
});
```

## Configuration

- Default base URL: `https://activitysmith.com/api`
- Override with `new Configuration({ basePath: "..." })`

## Types

All request/response types are exported from the package.
