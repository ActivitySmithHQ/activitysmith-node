/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface ActivityMetric
 */
export interface ActivityMetric {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ActivityMetric
     */
    label: string;
    /**
     * 
     * @type {number}
     * @memberof ActivityMetric
     */
    value: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityMetric
     */
    unit?: string;
}
/**
 * 
 * @export
 * @interface AlertPayload
 */
export interface AlertPayload {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof AlertPayload
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof AlertPayload
     */
    body?: string;
}
/**
 * 
 * @export
 * @interface BadRequestError
 */
export interface BadRequestError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof BadRequestError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof BadRequestError
     */
    message: string;
}
/**
 * 
 * @export
 * @interface ChannelTarget
 */
export interface ChannelTarget {
    [key: string]: any | any;
    /**
     * Channel slugs. When omitted, API key scope determines recipients.
     * @type {Array<string>}
     * @memberof ChannelTarget
     */
    channels: Array<string>;
}
/**
 * End payload requires title. For segmented_progress include current_step and optionally number_of_steps. For progress include percentage or value with upper_limit. For metrics include a non-empty metrics array. Type is optional when ending an existing activity. You can send an updated number_of_steps here if the workflow changed after start.
 * @export
 * @interface ContentStateEnd
 */
export interface ContentStateEnd {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ContentStateEnd
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ContentStateEnd
     */
    subtitle?: string;
    /**
     * Total number of steps. Use for type=segmented_progress. Optional on end, and safe to change if the final workflow used more or fewer steps than originally planned.
     * @type {number}
     * @memberof ContentStateEnd
     */
    number_of_steps?: number;
    /**
     * Current step. Use for type=segmented_progress.
     * @type {number}
     * @memberof ContentStateEnd
     */
    current_step?: number;
    /**
     * Progress percentage (0–100). Use for type=progress. Takes precedence over value/upper_limit if both are provided.
     * @type {number}
     * @memberof ContentStateEnd
     */
    percentage?: number;
    /**
     * Current progress value. Use with upper_limit for type=progress.
     * @type {number}
     * @memberof ContentStateEnd
     */
    value?: number;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateEnd
     */
    upper_limit?: number;
    /**
     * Use for type=metrics.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateEnd
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Optional. When omitted, the API uses the existing Live Activity type.
     * @type {string}
     * @memberof ContentStateEnd
     */
    type?: ContentStateEndTypeEnum;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof ContentStateEnd
     */
    color?: ContentStateEndColorEnum;
    /**
     * Optional. Overrides color for the current step. Only applies to type=segmented_progress.
     * @type {string}
     * @memberof ContentStateEnd
     */
    step_color?: ContentStateEndStepColorEnum;
    /**
     * Optional. Colors for completed steps. When used with segmented_progress, the array length should match current_step.
     * @type {Array<string>}
     * @memberof ContentStateEnd
     */
    step_colors?: Array<ContentStateEndStepColorsEnum>;
    /**
     * Optional. Minutes before the ended Live Activity is dismissed. Default 3. Set 0 for immediate dismissal. iOS will dismiss ended Live Activities after ~4 hours max.
     * @type {number}
     * @memberof ContentStateEnd
     */
    auto_dismiss_minutes?: number;
}


/**
 * @export
 */
export const ContentStateEndTypeEnum = {
    SegmentedProgress: 'segmented_progress',
    Progress: 'progress',
    Metrics: 'metrics'
} as const;
export type ContentStateEndTypeEnum = typeof ContentStateEndTypeEnum[keyof typeof ContentStateEndTypeEnum];

/**
 * @export
 */
export const ContentStateEndColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateEndColorEnum = typeof ContentStateEndColorEnum[keyof typeof ContentStateEndColorEnum];

/**
 * @export
 */
export const ContentStateEndStepColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateEndStepColorEnum = typeof ContentStateEndStepColorEnum[keyof typeof ContentStateEndStepColorEnum];

/**
 * @export
 */
export const ContentStateEndStepColorsEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateEndStepColorsEnum = typeof ContentStateEndStepColorsEnum[keyof typeof ContentStateEndStepColorsEnum];

/**
 * Start payload requires title and type. For segmented_progress include number_of_steps and current_step. For progress include percentage or value with upper_limit. For metrics include a non-empty metrics array. For segmented_progress, number_of_steps is not locked and can be changed in later update or end calls.
 * @export
 * @interface ContentStateStart
 */
export interface ContentStateStart {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ContentStateStart
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ContentStateStart
     */
    subtitle?: string;
    /**
     * Total number of steps. Use for type=segmented_progress. This value can be increased or decreased later when updating or ending the same activity.
     * @type {number}
     * @memberof ContentStateStart
     */
    number_of_steps?: number;
    /**
     * Current step. Use for type=segmented_progress.
     * @type {number}
     * @memberof ContentStateStart
     */
    current_step?: number;
    /**
     * Progress percentage (0–100). Use for type=progress. Takes precedence over value/upper_limit if both are provided.
     * @type {number}
     * @memberof ContentStateStart
     */
    percentage?: number;
    /**
     * Current progress value. Use with upper_limit for type=progress.
     * @type {number}
     * @memberof ContentStateStart
     */
    value?: number;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateStart
     */
    upper_limit?: number;
    /**
     * Use for type=metrics.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateStart
     */
    metrics?: Array<ActivityMetric>;
    /**
     * 
     * @type {string}
     * @memberof ContentStateStart
     */
    type: ContentStateStartTypeEnum;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof ContentStateStart
     */
    color?: ContentStateStartColorEnum;
    /**
     * Optional. Overrides color for the current step. Only applies to type=segmented_progress.
     * @type {string}
     * @memberof ContentStateStart
     */
    step_color?: ContentStateStartStepColorEnum;
    /**
     * Optional. Colors for completed steps. When used with segmented_progress, the array length should match current_step.
     * @type {Array<string>}
     * @memberof ContentStateStart
     */
    step_colors?: Array<ContentStateStartStepColorsEnum>;
}


/**
 * @export
 */
export const ContentStateStartTypeEnum = {
    SegmentedProgress: 'segmented_progress',
    Progress: 'progress',
    Metrics: 'metrics'
} as const;
export type ContentStateStartTypeEnum = typeof ContentStateStartTypeEnum[keyof typeof ContentStateStartTypeEnum];

/**
 * @export
 */
export const ContentStateStartColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateStartColorEnum = typeof ContentStateStartColorEnum[keyof typeof ContentStateStartColorEnum];

/**
 * @export
 */
export const ContentStateStartStepColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateStartStepColorEnum = typeof ContentStateStartStepColorEnum[keyof typeof ContentStateStartStepColorEnum];

/**
 * @export
 */
export const ContentStateStartStepColorsEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateStartStepColorsEnum = typeof ContentStateStartStepColorsEnum[keyof typeof ContentStateStartStepColorsEnum];

/**
 * Update payload requires title. For segmented_progress include current_step and optionally number_of_steps. For progress include percentage or value with upper_limit. For metrics include a non-empty metrics array. Type is optional when updating an existing activity. You can increase or decrease number_of_steps during updates.
 * @export
 * @interface ContentStateUpdate
 */
export interface ContentStateUpdate {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ContentStateUpdate
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ContentStateUpdate
     */
    subtitle?: string;
    /**
     * Total number of steps. Use for type=segmented_progress. Optional on update, and safe to change if the workflow gains or loses steps.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    number_of_steps?: number;
    /**
     * Current step. Use for type=segmented_progress.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    current_step?: number;
    /**
     * Progress percentage (0–100). Use for type=progress. Takes precedence over value/upper_limit if both are provided.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    percentage?: number;
    /**
     * Current progress value. Use with upper_limit for type=progress.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    value?: number;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    upper_limit?: number;
    /**
     * Use for type=metrics.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateUpdate
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Optional. When omitted, the API uses the existing Live Activity type.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    type?: ContentStateUpdateTypeEnum;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    color?: ContentStateUpdateColorEnum;
    /**
     * Optional. Overrides color for the current step. Only applies to type=segmented_progress.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    step_color?: ContentStateUpdateStepColorEnum;
    /**
     * Optional. Colors for completed steps. When used with segmented_progress, the array length should match current_step.
     * @type {Array<string>}
     * @memberof ContentStateUpdate
     */
    step_colors?: Array<ContentStateUpdateStepColorsEnum>;
}


/**
 * @export
 */
export const ContentStateUpdateTypeEnum = {
    SegmentedProgress: 'segmented_progress',
    Progress: 'progress',
    Metrics: 'metrics'
} as const;
export type ContentStateUpdateTypeEnum = typeof ContentStateUpdateTypeEnum[keyof typeof ContentStateUpdateTypeEnum];

/**
 * @export
 */
export const ContentStateUpdateColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateUpdateColorEnum = typeof ContentStateUpdateColorEnum[keyof typeof ContentStateUpdateColorEnum];

/**
 * @export
 */
export const ContentStateUpdateStepColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateUpdateStepColorEnum = typeof ContentStateUpdateStepColorEnum[keyof typeof ContentStateUpdateStepColorEnum];

/**
 * @export
 */
export const ContentStateUpdateStepColorsEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type ContentStateUpdateStepColorsEnum = typeof ContentStateUpdateStepColorsEnum[keyof typeof ContentStateUpdateStepColorsEnum];

/**
 * 
 * @export
 * @interface ForbiddenError
 */
export interface ForbiddenError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ForbiddenError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof ForbiddenError
     */
    message: string;
}
/**
 * Optional single action button shown in the Live Activity UI.
 * @export
 * @interface LiveActivityAction
 */
export interface LiveActivityAction {
    [key: string]: any | any;
    /**
     * Button title displayed in the Live Activity UI.
     * @type {string}
     * @memberof LiveActivityAction
     */
    title: string;
    /**
     * 
     * @type {LiveActivityActionType}
     * @memberof LiveActivityAction
     */
    type: LiveActivityActionType;
    /**
     * HTTPS URL. For open_url it is opened in browser. For webhook it is called by ActivitySmith backend.
     * @type {string}
     * @memberof LiveActivityAction
     */
    url: string;
    /**
     * Webhook HTTP method. Used only when type=webhook.
     * @type {LiveActivityWebhookMethod}
     * @memberof LiveActivityAction
     */
    method?: LiveActivityWebhookMethod;
    /**
     * Optional webhook payload body. Used only when type=webhook.
     * @type {{ [key: string]: any; }}
     * @memberof LiveActivityAction
     */
    body?: { [key: string]: any; };
}

/**
 * 
 * @export
 */
export const LiveActivityActionType = {
    OpenUrl: 'open_url',
    Webhook: 'webhook'
} as const;
export type LiveActivityActionType = typeof LiveActivityActionType[keyof typeof LiveActivityActionType];

/**
 * End an existing Live Activity by activity_id.
 * @export
 * @interface LiveActivityEndRequest
 */
export interface LiveActivityEndRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndRequest
     */
    activity_id: string;
    /**
     * 
     * @type {ContentStateEnd}
     * @memberof LiveActivityEndRequest
     */
    content_state: ContentStateEnd;
    /**
     * 
     * @type {LiveActivityAction}
     * @memberof LiveActivityEndRequest
     */
    action?: LiveActivityAction;
}
/**
 * Returned after a Live Activity end event is sent or queued.
 * @export
 * @interface LiveActivityEndResponse
 */
export interface LiveActivityEndResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityEndResponse
     */
    success: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndResponse
     */
    activity_id: string;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityEndResponse
     */
    devices_queued?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityEndResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndResponse
     */
    timestamp: string;
}
/**
 * 
 * @export
 * @interface LiveActivityLimitError
 */
export interface LiveActivityLimitError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityLimitError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityLimitError
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    limit: number;
    /**
     * Current number of active Live Activities.
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    active: number;
}
/**
 * Start a new Live Activity. The response includes activity_id for later update and end calls.
 * @export
 * @interface LiveActivityStartRequest
 */
export interface LiveActivityStartRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {ContentStateStart}
     * @memberof LiveActivityStartRequest
     */
    content_state: ContentStateStart;
    /**
     * 
     * @type {LiveActivityAction}
     * @memberof LiveActivityStartRequest
     */
    action?: LiveActivityAction;
    /**
     * 
     * @type {AlertPayload}
     * @memberof LiveActivityStartRequest
     */
    alert?: AlertPayload;
    /**
     * 
     * @type {ChannelTarget}
     * @memberof LiveActivityStartRequest
     */
    target?: ChannelTarget;
}
/**
 * Returned after a Live Activity starts. Save activity_id and use it for all later updates and for the final end call.
 * @export
 * @interface LiveActivityStartResponse
 */
export interface LiveActivityStartResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityStartResponse
     */
    success: boolean;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStartResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStartResponse
     */
    users_notified?: number;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    activity_id: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof LiveActivityStartResponse
     */
    effective_channel_slugs?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    timestamp: string;
}
/**
 * Optional payload for ending a managed stream. When omitted, ActivitySmith ends the stream using the latest known state when possible.
 * @export
 * @interface LiveActivityStreamDeleteRequest
 */
export interface LiveActivityStreamDeleteRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {StreamContentState}
     * @memberof LiveActivityStreamDeleteRequest
     */
    content_state?: StreamContentState;
    /**
     * 
     * @type {LiveActivityAction}
     * @memberof LiveActivityStreamDeleteRequest
     */
    action?: LiveActivityAction;
    /**
     * 
     * @type {AlertPayload}
     * @memberof LiveActivityStreamDeleteRequest
     */
    alert?: AlertPayload;
}
/**
 * Returned after a managed stream is ended and removed.
 * @export
 * @interface LiveActivityStreamDeleteResponse
 */
export interface LiveActivityStreamDeleteResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityStreamDeleteResponse
     */
    success: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    operation: LiveActivityStreamDeleteResponseOperationEnum;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    stream_key: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    activity_id?: string | null;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStreamDeleteResponse
     */
    devices_queued?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStreamDeleteResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    timestamp: string;
}


/**
 * @export
 */
export const LiveActivityStreamDeleteResponseOperationEnum = {
    Ended: 'ended'
} as const;
export type LiveActivityStreamDeleteResponseOperationEnum = typeof LiveActivityStreamDeleteResponseOperationEnum[keyof typeof LiveActivityStreamDeleteResponseOperationEnum];

/**
 * Returned after a managed stream request is reconciled.
 * @export
 * @interface LiveActivityStreamPutResponse
 */
export interface LiveActivityStreamPutResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityStreamPutResponse
     */
    success: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    operation: LiveActivityStreamPutResponseOperationEnum;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    stream_key: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    activity_id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    previous_activity_id?: string;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStreamPutResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStreamPutResponse
     */
    devices_queued?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityStreamPutResponse
     */
    users_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof LiveActivityStreamPutResponse
     */
    effective_channel_slugs?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    timestamp: string;
}


/**
 * @export
 */
export const LiveActivityStreamPutResponseOperationEnum = {
    Started: 'started',
    Updated: 'updated',
    Rotated: 'rotated',
    Noop: 'noop',
    Paused: 'paused'
} as const;
export type LiveActivityStreamPutResponseOperationEnum = typeof LiveActivityStreamPutResponseOperationEnum[keyof typeof LiveActivityStreamPutResponseOperationEnum];

/**
 * Send the latest state for a managed Live Activity stream. channels is the streamlined form for stream targeting. target.channels is also accepted for compatibility. If both are provided, they must match.
 * @export
 * @interface LiveActivityStreamRequest
 */
export interface LiveActivityStreamRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {StreamContentState}
     * @memberof LiveActivityStreamRequest
     */
    content_state: StreamContentState;
    /**
     * 
     * @type {LiveActivityAction}
     * @memberof LiveActivityStreamRequest
     */
    action?: LiveActivityAction;
    /**
     * 
     * @type {AlertPayload}
     * @memberof LiveActivityStreamRequest
     */
    alert?: AlertPayload;
    /**
     * Channel slugs. When omitted, API key scope determines recipients.
     * @type {Array<string>}
     * @memberof LiveActivityStreamRequest
     */
    channels?: Array<string>;
    /**
     * 
     * @type {ChannelTarget}
     * @memberof LiveActivityStreamRequest
     */
    target?: ChannelTarget;
}
/**
 * Update an existing Live Activity by activity_id.
 * @export
 * @interface LiveActivityUpdateRequest
 */
export interface LiveActivityUpdateRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateRequest
     */
    activity_id: string;
    /**
     * 
     * @type {ContentStateUpdate}
     * @memberof LiveActivityUpdateRequest
     */
    content_state: ContentStateUpdate;
    /**
     * 
     * @type {LiveActivityAction}
     * @memberof LiveActivityUpdateRequest
     */
    action?: LiveActivityAction;
}
/**
 * Returned after a Live Activity update is sent or queued.
 * @export
 * @interface LiveActivityUpdateResponse
 */
export interface LiveActivityUpdateResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityUpdateResponse
     */
    success: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateResponse
     */
    activity_id: string;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityUpdateResponse
     */
    devices_queued?: number;
    /**
     * 
     * @type {number}
     * @memberof LiveActivityUpdateResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateResponse
     */
    timestamp: string;
}

/**
 * 
 * @export
 */
export const LiveActivityWebhookMethod = {
    Get: 'GET',
    Post: 'POST'
} as const;
export type LiveActivityWebhookMethod = typeof LiveActivityWebhookMethod[keyof typeof LiveActivityWebhookMethod];

/**
 * 
 * @export
 * @interface MetricError
 */
export interface MetricError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof MetricError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof MetricError
     */
    message?: string;
}
/**
 * Latest metric value to display in widgets.
 * @export
 * @interface MetricValueUpdateRequest
 */
export interface MetricValueUpdateRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {MetricValueUpdateRequestValue}
     * @memberof MetricValueUpdateRequest
     */
    value: MetricValueUpdateRequestValue;
    /**
     * Optional ISO timestamp for when the metric value was measured. Defaults to the server receive time.
     * @type {string}
     * @memberof MetricValueUpdateRequest
     */
    timestamp?: string;
}
/**
 * @type MetricValueUpdateRequestValue
 * 
 * @export
 */
export type MetricValueUpdateRequestValue = number | string;
/**
 * 
 * @export
 * @interface MetricValueUpdateResponse
 */
export interface MetricValueUpdateResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof MetricValueUpdateResponse
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface NoRecipientsError
 */
export interface NoRecipientsError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof NoRecipientsError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof NoRecipientsError
     */
    message: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof NoRecipientsError
     */
    effective_channel_slugs?: Array<string>;
}
/**
 * 
 * @export
 * @interface NotFoundError
 */
export interface NotFoundError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof NotFoundError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof NotFoundError
     */
    message: string;
}
/**
 * 
 * @export
 * @interface PushNotificationAction
 */
export interface PushNotificationAction {
    [key: string]: any | any;
    /**
     * Button title displayed in iOS expanded notification UI.
     * @type {string}
     * @memberof PushNotificationAction
     */
    title: string;
    /**
     * 
     * @type {PushNotificationActionType}
     * @memberof PushNotificationAction
     */
    type: PushNotificationActionType;
    /**
     * HTTPS URL. For open_url it is opened in browser. For webhook it is called by ActivitySmith backend.
     * @type {string}
     * @memberof PushNotificationAction
     */
    url: string;
    /**
     * Webhook HTTP method. Used only when type=webhook.
     * @type {PushNotificationWebhookMethod}
     * @memberof PushNotificationAction
     */
    method?: PushNotificationWebhookMethod;
    /**
     * Optional webhook payload body. Used only when type=webhook.
     * @type {{ [key: string]: any; }}
     * @memberof PushNotificationAction
     */
    body?: { [key: string]: any; };
}

/**
 * 
 * @export
 */
export const PushNotificationActionType = {
    OpenUrl: 'open_url',
    Webhook: 'webhook'
} as const;
export type PushNotificationActionType = typeof PushNotificationActionType[keyof typeof PushNotificationActionType];

/**
 * 
 * @export
 * @interface PushNotificationRequest
 */
export interface PushNotificationRequest {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationRequest
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationRequest
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationRequest
     */
    subtitle?: string;
    /**
     * Optional HTTPS URL for an image, audio file, or video that users can preview or play when they expand the notification. If `redirection` is omitted, tapping the notification opens this URL. Cannot be combined with `actions`.
     * @type {string}
     * @memberof PushNotificationRequest
     */
    media?: string;
    /**
     * Optional HTTPS URL opened when user taps the notification body. Overrides the default tap target from `media` when both are provided.
     * @type {string}
     * @memberof PushNotificationRequest
     */
    redirection?: string;
    /**
     * Optional interactive actions shown when users expand the notification. Cannot be combined with `media`.
     * @type {Array<PushNotificationAction>}
     * @memberof PushNotificationRequest
     */
    actions?: Array<PushNotificationAction>;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof PushNotificationRequest
     */
    payload?: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof PushNotificationRequest
     */
    badge?: number;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationRequest
     */
    sound?: string;
    /**
     * 
     * @type {ChannelTarget}
     * @memberof PushNotificationRequest
     */
    target?: ChannelTarget;
}
/**
 * 
 * @export
 * @interface PushNotificationResponse
 */
export interface PushNotificationResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {boolean}
     * @memberof PushNotificationResponse
     */
    success: boolean;
    /**
     * 
     * @type {number}
     * @memberof PushNotificationResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {number}
     * @memberof PushNotificationResponse
     */
    users_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof PushNotificationResponse
     */
    effective_channel_slugs?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationResponse
     */
    timestamp: string;
}

/**
 * 
 * @export
 */
export const PushNotificationWebhookMethod = {
    Get: 'GET',
    Post: 'POST'
} as const;
export type PushNotificationWebhookMethod = typeof PushNotificationWebhookMethod[keyof typeof PushNotificationWebhookMethod];

/**
 * 
 * @export
 * @interface RateLimitError
 */
export interface RateLimitError {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof RateLimitError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof RateLimitError
     */
    message: string;
}
/**
 * @type SendPushNotification429Response
 * 
 * @export
 */
export type SendPushNotification429Response = LiveActivityLimitError | RateLimitError;
/**
 * Current state for a managed Live Activity stream. Include type on the first PUT, and whenever the stream may need to start a fresh activity. Supports segmented_progress, progress, and metrics types.
 * @export
 * @interface StreamContentState
 */
export interface StreamContentState {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof StreamContentState
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof StreamContentState
     */
    subtitle?: string;
    /**
     * Use for segmented_progress.
     * @type {number}
     * @memberof StreamContentState
     */
    number_of_steps?: number;
    /**
     * Use for segmented_progress.
     * @type {number}
     * @memberof StreamContentState
     */
    current_step?: number;
    /**
     * Use for progress. Takes precedence over value/upper_limit if both are provided.
     * @type {number}
     * @memberof StreamContentState
     */
    percentage?: number;
    /**
     * Current progress value. Use with upper_limit for progress.
     * @type {number}
     * @memberof StreamContentState
     */
    value?: number;
    /**
     * Maximum progress value. Use with value for progress.
     * @type {number}
     * @memberof StreamContentState
     */
    upper_limit?: number;
    /**
     * Required on the first PUT or whenever the stream cannot infer the current activity type.
     * @type {string}
     * @memberof StreamContentState
     */
    type?: StreamContentStateTypeEnum;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof StreamContentState
     */
    color?: StreamContentStateColorEnum;
    /**
     * Optional. Overrides color for the current step. Only applies to segmented_progress.
     * @type {string}
     * @memberof StreamContentState
     */
    step_color?: StreamContentStateStepColorEnum;
    /**
     * Optional. Colors for completed steps. When used with segmented_progress, the array length should match current_step.
     * @type {Array<string>}
     * @memberof StreamContentState
     */
    step_colors?: Array<StreamContentStateStepColorsEnum>;
    /**
     * Use for metrics activities.
     * @type {Array<ActivityMetric>}
     * @memberof StreamContentState
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Optional. Seconds before the ended Live Activity is dismissed.
     * @type {number}
     * @memberof StreamContentState
     */
    auto_dismiss_seconds?: number;
    /**
     * Optional. Minutes before the ended Live Activity is dismissed.
     * @type {number}
     * @memberof StreamContentState
     */
    auto_dismiss_minutes?: number;
}


/**
 * @export
 */
export const StreamContentStateTypeEnum = {
    SegmentedProgress: 'segmented_progress',
    Progress: 'progress',
    Metrics: 'metrics'
} as const;
export type StreamContentStateTypeEnum = typeof StreamContentStateTypeEnum[keyof typeof StreamContentStateTypeEnum];

/**
 * @export
 */
export const StreamContentStateColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type StreamContentStateColorEnum = typeof StreamContentStateColorEnum[keyof typeof StreamContentStateColorEnum];

/**
 * @export
 */
export const StreamContentStateStepColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type StreamContentStateStepColorEnum = typeof StreamContentStateStepColorEnum[keyof typeof StreamContentStateStepColorEnum];

/**
 * @export
 */
export const StreamContentStateStepColorsEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow'
} as const;
export type StreamContentStateStepColorsEnum = typeof StreamContentStateStepColorsEnum[keyof typeof StreamContentStateStepColorsEnum];

