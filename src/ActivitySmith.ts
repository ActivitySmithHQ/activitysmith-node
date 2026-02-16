import { Configuration, PushNotificationsApi, LiveActivitiesApi } from "../generated/index";

export interface ActivitySmithOptions {
  apiKey: string;
}

type PushRequestBody = Parameters<PushNotificationsApi["sendPushNotification"]>[0]["pushNotificationRequest"];
type SendInitOverrides = Parameters<PushNotificationsApi["sendPushNotification"]>[1];
type StartRequestBody = Parameters<LiveActivitiesApi["startLiveActivity"]>[0]["liveActivityStartRequest"];
type UpdateRequestBody = Parameters<LiveActivitiesApi["updateLiveActivity"]>[0]["liveActivityUpdateRequest"];
type EndRequestBody = Parameters<LiveActivitiesApi["endLiveActivity"]>[0]["liveActivityEndRequest"];
type LiveInitOverrides = Parameters<LiveActivitiesApi["startLiveActivity"]>[1];
type ChannelTargetInput = { channels?: string[] };
type PushSendRequest = PushRequestBody & { channels?: string[] };
type LiveStartSendRequest = StartRequestBody & { channels?: string[] };

function withTargetChannels<T extends { target?: ChannelTargetInput }>(
  request: T & { channels?: string[] },
): T {
  const channels = request.channels;
  if (!channels || channels.length === 0 || request.target) {
    const { channels: _ignored, ...rest } = request;
    return rest as T;
  }

  const { channels: _ignored, ...rest } = request;
  return {
    ...rest,
    target: { channels },
  } as T;
}

export class NotificationsResource {
  private readonly api: PushNotificationsApi;

  constructor(api: PushNotificationsApi) {
    this.api = api;
  }

  send(request: PushSendRequest, initOverrides?: SendInitOverrides) {
    return this.api.sendPushNotification(
      { pushNotificationRequest: withTargetChannels(request) },
      initOverrides,
    );
  }

  // Backward-compatible alias.
  sendPushNotification(...args: Parameters<PushNotificationsApi["sendPushNotification"]>) {
    return this.api.sendPushNotification(...args);
  }

  sendPushNotificationRaw(...args: Parameters<PushNotificationsApi["sendPushNotificationRaw"]>) {
    return this.api.sendPushNotificationRaw(...args);
  }
}

export class LiveActivitiesResource {
  private readonly api: LiveActivitiesApi;

  constructor(api: LiveActivitiesApi) {
    this.api = api;
  }

  start(request: LiveStartSendRequest, initOverrides?: LiveInitOverrides) {
    return this.api.startLiveActivity(
      { liveActivityStartRequest: withTargetChannels(request) },
      initOverrides,
    );
  }

  update(request: UpdateRequestBody, initOverrides?: LiveInitOverrides) {
    return this.api.updateLiveActivity({ liveActivityUpdateRequest: request }, initOverrides);
  }

  end(request: EndRequestBody, initOverrides?: LiveInitOverrides) {
    return this.api.endLiveActivity({ liveActivityEndRequest: request }, initOverrides);
  }

  // Backward-compatible aliases.
  startLiveActivity(...args: Parameters<LiveActivitiesApi["startLiveActivity"]>) {
    return this.api.startLiveActivity(...args);
  }

  updateLiveActivity(...args: Parameters<LiveActivitiesApi["updateLiveActivity"]>) {
    return this.api.updateLiveActivity(...args);
  }

  endLiveActivity(...args: Parameters<LiveActivitiesApi["endLiveActivity"]>) {
    return this.api.endLiveActivity(...args);
  }

  startLiveActivityRaw(...args: Parameters<LiveActivitiesApi["startLiveActivityRaw"]>) {
    return this.api.startLiveActivityRaw(...args);
  }

  updateLiveActivityRaw(...args: Parameters<LiveActivitiesApi["updateLiveActivityRaw"]>) {
    return this.api.updateLiveActivityRaw(...args);
  }

  endLiveActivityRaw(...args: Parameters<LiveActivitiesApi["endLiveActivityRaw"]>) {
    return this.api.endLiveActivityRaw(...args);
  }
}

export class ActivitySmith {
  public readonly notifications: NotificationsResource;
  public readonly liveActivities: LiveActivitiesResource;

  constructor(opts: ActivitySmithOptions) {
    if (!opts?.apiKey) {
      throw new Error("ActivitySmith: apiKey is required");
    }

    // basePath omitted on purpose — it will use the default from the generated runtime
    const config = new Configuration({
      accessToken: opts.apiKey,
    });

    this.notifications = new NotificationsResource(new PushNotificationsApi(config));
    this.liveActivities = new LiveActivitiesResource(new LiveActivitiesApi(config));
  }
}
