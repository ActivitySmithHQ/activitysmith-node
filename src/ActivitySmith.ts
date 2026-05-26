import { Configuration, PushNotificationsApi, LiveActivitiesApi, MetricsApi } from "../generated/index";

const SDK_VERSION = "1.4.0";
const SDK_HEADER_NAME = "X-ActivitySmith-SDK";
const SDK_HEADER_VALUE = `node-v${SDK_VERSION}`;

export interface ActivitySmithOptions {
  apiKey: string;
}

type PushRequestBody = Parameters<PushNotificationsApi["sendPushNotification"]>[0]["pushNotificationRequest"];
type PushSendParameters = Parameters<PushNotificationsApi["sendPushNotification"]>[0];
type PushRawParameters = Parameters<PushNotificationsApi["sendPushNotificationRaw"]>[0];
type SendInitOverrides = Parameters<PushNotificationsApi["sendPushNotification"]>[1];
type StartRequestBody = Parameters<LiveActivitiesApi["startLiveActivity"]>[0]["liveActivityStartRequest"];
type UpdateRequestBody = Parameters<LiveActivitiesApi["updateLiveActivity"]>[0]["liveActivityUpdateRequest"];
type EndRequestBody = Parameters<LiveActivitiesApi["endLiveActivity"]>[0]["liveActivityEndRequest"];
type StreamRequestBody =
  Parameters<LiveActivitiesApi["reconcileLiveActivityStream"]>[0]["liveActivityStreamRequest"];
type StreamDeleteRequestBody =
  Parameters<LiveActivitiesApi["endLiveActivityStream"]>[0]["liveActivityStreamDeleteRequest"];
type LiveInitOverrides = Parameters<LiveActivitiesApi["startLiveActivity"]>[1];
type MetricUpdateParameters = Parameters<MetricsApi["updateMetricValue"]>[0];
type MetricRawParameters = Parameters<MetricsApi["updateMetricValueRaw"]>[0];
type MetricUpdateRequestBody = MetricUpdateParameters["metricValueUpdateRequest"];
type MetricValue = MetricUpdateRequestBody["value"];
type MetricUpdateOptions = Omit<MetricUpdateRequestBody, "value">;
type MetricInitOverrides = Parameters<MetricsApi["updateMetricValue"]>[1];
type ChannelTargetInput = { channels?: string[] };
type PushSendRequest = PushRequestBody & { channels?: string[] };

const LiveActivityTypes = {
  segmentedProgress: "segmented_progress",
  progress: "progress",
  metrics: "metrics",
  stats: "stats",
  alert: "alert",
} as const;

export type LiveActivityType = (typeof LiveActivityTypes)[keyof typeof LiveActivityTypes];

export type LiveActivityAlertIcon = {
  symbol: string;
  color?: string;
};

export type LiveActivityAlertBadge = {
  title: string;
  color?: string;
};

export type LiveActivityContentState = Record<string, unknown> & {
  title?: string;
  subtitle?: string;
  type?: LiveActivityType | string;
  message?: string;
  icon?: LiveActivityAlertIcon;
  badge?: LiveActivityAlertBadge;
  color?: string;
};

type LiveStartSendRequest = Omit<StartRequestBody, "content_state"> & {
  content_state: LiveActivityContentState;
  channels?: string[];
};
type LiveUpdateSendRequest = Omit<UpdateRequestBody, "content_state"> & {
  content_state: LiveActivityContentState;
};
type LiveEndSendRequest = Omit<EndRequestBody, "content_state"> & {
  content_state: LiveActivityContentState;
};
type LiveStreamSendRequest = Omit<StreamRequestBody, "content_state"> & {
  content_state: LiveActivityContentState;
  channels?: string[];
};
type LiveStreamDeleteSendRequest = Omit<StreamDeleteRequestBody, "content_state"> & {
  content_state?: LiveActivityContentState;
};

function withTargetChannels<T extends object>(
  request: T & { target?: ChannelTargetInput; channels?: string[] },
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

function withoutAlertRootColor<T extends { content_state?: LiveActivityContentState }>(
  request: T,
): T {
  if (request.content_state?.type !== LiveActivityTypes.alert || !("color" in request.content_state)) {
    return request;
  }

  const { color: _ignored, ...contentState } = request.content_state;
  return {
    ...request,
    content_state: contentState,
  };
}

function hasMediaValue(media: unknown): boolean {
  if (typeof media === "string") {
    return media.trim().length > 0;
  }

  return media !== null && media !== undefined;
}

function hasActionsValue(actions: unknown): boolean {
  if (Array.isArray(actions)) {
    return actions.length > 0;
  }

  return actions !== null && actions !== undefined;
}

function assertValidPushRequest(request: { media?: unknown; actions?: unknown }) {
  if (hasMediaValue(request.media) && hasActionsValue(request.actions)) {
    throw new Error("ActivitySmith: media cannot be combined with actions");
  }
}

function toMetricUpdateRequest(
  valueOrRequest: MetricValue | MetricUpdateRequestBody,
  options?: MetricUpdateOptions,
): MetricUpdateRequestBody {
  if (
    typeof valueOrRequest === "object" &&
    valueOrRequest !== null &&
    "value" in valueOrRequest
  ) {
    return {
      ...valueOrRequest,
      ...options,
    };
  }

  return {
    value: valueOrRequest as MetricValue,
    ...options,
  };
}

export class NotificationsResource {
  private readonly api: PushNotificationsApi;

  constructor(api: PushNotificationsApi) {
    this.api = api;
  }

  send(request: PushSendRequest, initOverrides?: SendInitOverrides) {
    const normalized = withTargetChannels(request);
    assertValidPushRequest(normalized);

    return this.api.sendPushNotification(
      { pushNotificationRequest: normalized },
      initOverrides,
    );
  }

  // Backward-compatible alias.
  sendPushNotification(requestParameters: PushSendParameters, initOverrides?: SendInitOverrides) {
    assertValidPushRequest(requestParameters.pushNotificationRequest);
    return this.api.sendPushNotification(requestParameters, initOverrides);
  }

  sendPushNotificationRaw(
    requestParameters: PushRawParameters,
    initOverrides?: SendInitOverrides,
  ) {
    assertValidPushRequest(requestParameters.pushNotificationRequest);
    return this.api.sendPushNotificationRaw(requestParameters, initOverrides);
  }
}

export class LiveActivitiesResource {
  public static readonly types = LiveActivityTypes;

  private readonly api: LiveActivitiesApi;

  constructor(api: LiveActivitiesApi) {
    this.api = api;
  }

  start(request: LiveStartSendRequest, initOverrides?: LiveInitOverrides) {
    return this.api.startLiveActivity(
      {
        liveActivityStartRequest: withoutAlertRootColor(
          withTargetChannels<LiveStartSendRequest>(request),
        ) as StartRequestBody,
      },
      initOverrides,
    );
  }

  update(request: LiveUpdateSendRequest, initOverrides?: LiveInitOverrides) {
    return this.api.updateLiveActivity(
      { liveActivityUpdateRequest: withoutAlertRootColor(request) as UpdateRequestBody },
      initOverrides,
    );
  }

  end(request: LiveEndSendRequest, initOverrides?: LiveInitOverrides) {
    return this.api.endLiveActivity(
      { liveActivityEndRequest: withoutAlertRootColor(request) as EndRequestBody },
      initOverrides,
    );
  }

  stream(streamKey: string, request: LiveStreamSendRequest, initOverrides?: LiveInitOverrides) {
    return this.api.reconcileLiveActivityStream(
      {
        streamKey,
        liveActivityStreamRequest: withoutAlertRootColor(
          withTargetChannels<LiveStreamSendRequest>(request),
        ) as StreamRequestBody,
      },
      initOverrides,
    );
  }

  endStream(
    streamKey: string,
    request?: LiveStreamDeleteSendRequest,
    initOverrides?: LiveInitOverrides,
  ) {
    if (request) {
      return this.api.endLiveActivityStream(
        {
          streamKey,
          liveActivityStreamDeleteRequest: withoutAlertRootColor(
            request,
          ) as StreamDeleteRequestBody,
        },
        initOverrides,
      );
    }

    return this.api.endLiveActivityStream({ streamKey }, initOverrides);
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

  reconcileLiveActivityStream(...args: Parameters<LiveActivitiesApi["reconcileLiveActivityStream"]>) {
    return this.api.reconcileLiveActivityStream(...args);
  }

  endLiveActivityStream(...args: Parameters<LiveActivitiesApi["endLiveActivityStream"]>) {
    return this.api.endLiveActivityStream(...args);
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

  reconcileLiveActivityStreamRaw(
    ...args: Parameters<LiveActivitiesApi["reconcileLiveActivityStreamRaw"]>
  ) {
    return this.api.reconcileLiveActivityStreamRaw(...args);
  }

  endLiveActivityStreamRaw(...args: Parameters<LiveActivitiesApi["endLiveActivityStreamRaw"]>) {
    return this.api.endLiveActivityStreamRaw(...args);
  }
}

export class MetricsResource {
  private readonly api: MetricsApi;

  constructor(api: MetricsApi) {
    this.api = api;
  }

  update(
    key: string,
    valueOrRequest: MetricValue | MetricUpdateRequestBody,
    options?: MetricUpdateOptions,
    initOverrides?: MetricInitOverrides,
  ) {
    return this.api.updateMetricValue(
      {
        key,
        metricValueUpdateRequest: toMetricUpdateRequest(valueOrRequest, options),
      },
      initOverrides,
    );
  }

  // Backward-compatible generated-style aliases.
  updateMetricValue(requestParameters: MetricUpdateParameters, initOverrides?: MetricInitOverrides) {
    return this.api.updateMetricValue(requestParameters, initOverrides);
  }

  updateMetricValueRaw(
    requestParameters: MetricRawParameters,
    initOverrides?: MetricInitOverrides,
  ) {
    return this.api.updateMetricValueRaw(requestParameters, initOverrides);
  }
}

export class ActivitySmith {
  public static readonly liveActivityTypes = LiveActivityTypes;

  public readonly notifications: NotificationsResource;
  public readonly liveActivities: LiveActivitiesResource;
  public readonly metrics: MetricsResource;

  constructor(opts: ActivitySmithOptions) {
    if (!opts?.apiKey) {
      throw new Error("ActivitySmith: apiKey is required");
    }

    // basePath omitted on purpose — it will use the default from the generated runtime
    const config = new Configuration({
      accessToken: opts.apiKey,
      headers: {
        [SDK_HEADER_NAME]: SDK_HEADER_VALUE,
      },
    });

    this.notifications = new NotificationsResource(new PushNotificationsApi(config));
    this.liveActivities = new LiveActivitiesResource(new LiveActivitiesApi(config));
    this.metrics = new MetricsResource(new MetricsApi(config));
  }
}
