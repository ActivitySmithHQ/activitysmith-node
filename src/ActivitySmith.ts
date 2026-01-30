import { Configuration, NotificationsApi, LiveActivitiesApi } from "../generated/index";

export interface ActivitySmithOptions {
  apiKey: string;
}

export class ActivitySmith {
  public readonly notifications: NotificationsApi;
  public readonly liveActivities: LiveActivitiesApi;

  constructor(opts: ActivitySmithOptions) {
    if (!opts?.apiKey) {
      throw new Error("ActivitySmith: apiKey is required");
    }

    // basePath omitted on purpose — it will use the default from the generated runtime
    const config = new Configuration({
      accessToken: opts.apiKey,
    });

    this.notifications = new NotificationsApi(config);
    this.liveActivities = new LiveActivitiesApi(config);
  }
}
