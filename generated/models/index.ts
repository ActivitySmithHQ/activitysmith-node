/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface ActivityMetric
 */
export interface ActivityMetric {
    /**
     * 
     * @type {string}
     * @memberof ActivityMetric
     */
    label: string;
    /**
     * 
     * @type {ActivityMetricValue}
     * @memberof ActivityMetric
     */
    value: ActivityMetricValue;
    /**
     * 
     * @type {string}
     * @memberof ActivityMetric
     */
    unit?: string;
    /**
     * Optional per-metric accent color for metrics and stats activities.
     * @type {string}
     * @memberof ActivityMetric
     */
    color?: ActivityMetricColorEnum;
}


/**
 * @export
 */
export const ActivityMetricColorEnum = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type ActivityMetricColorEnum = typeof ActivityMetricColorEnum[keyof typeof ActivityMetricColorEnum];

/**
 * @type ActivityMetricValue
 * 
 * @export
 */
export type ActivityMetricValue = number | string;
/**
 * 
 * @export
 * @interface AlertPayload
 */
export interface AlertPayload {
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
 * @interface AppIconBadgeCountUpdateError
 */
export interface AppIconBadgeCountUpdateError {
    /**
     * 
     * @type {string}
     * @memberof AppIconBadgeCountUpdateError
     */
    error: string;
    /**
     * 
     * @type {string}
     * @memberof AppIconBadgeCountUpdateError
     */
    code: AppIconBadgeCountUpdateErrorCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppIconBadgeCountUpdateError
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof AppIconBadgeCountUpdateError
     */
    badge: number;
    /**
     * 
     * @type {number}
     * @memberof AppIconBadgeCountUpdateError
     */
    devices_targeted?: number;
    /**
     * 
     * @type {number}
     * @memberof AppIconBadgeCountUpdateError
     */
    devices_updated: number;
    /**
     * 
     * @type {number}
     * @memberof AppIconBadgeCountUpdateError
     */
    users_updated?: number;
    /**
     * Deprecated compatibility alias for devices_updated.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateError
     * @deprecated
     */
    devices_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppIconBadgeCountUpdateError
     */
    effective_channel_slugs?: Array<string>;
}


/**
 * @export
 */
export const AppIconBadgeCountUpdateErrorCodeEnum = {
    DeviceDisconnected: 'badge_device_disconnected',
    UpdateFailed: 'badge_update_failed'
} as const;
export type AppIconBadgeCountUpdateErrorCodeEnum = typeof AppIconBadgeCountUpdateErrorCodeEnum[keyof typeof AppIconBadgeCountUpdateErrorCodeEnum];

/**
 * 
 * @export
 * @interface AppIconBadgeCountUpdateRequest
 */
export interface AppIconBadgeCountUpdateRequest {
    /**
     * The count to show on the ActivitySmith app icon. Send 0 to clear it.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateRequest
     */
    badge: number;
    /**
     * 
     * @type {ChannelTarget}
     * @memberof AppIconBadgeCountUpdateRequest
     */
    target?: ChannelTarget;
}
/**
 * 
 * @export
 * @interface AppIconBadgeCountUpdateResponse
 */
export interface AppIconBadgeCountUpdateResponse {
    /**
     * 
     * @type {boolean}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    success: boolean;
    /**
     * 
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    badge: number;
    /**
     * Number of devices whose App Icon Badge was updated.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    devices_updated: number;
    /**
     * Number of account users with at least one updated device.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    users_updated: number;
    /**
     * Deprecated compatibility alias for devices_updated.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     * @deprecated
     */
    devices_notified?: number;
    /**
     * Deprecated compatibility alias for users_updated.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     * @deprecated
     */
    users_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    effective_channel_slugs: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    timestamp: string;
    /**
     * Number of device tokens targeted.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    devices_targeted?: number;
    /**
     * Number of device tokens deactivated because APNs reported them unregistered.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    devices_deactivated?: number;
    /**
     * Number of targeted device tokens APNs reported as unregistered.
     * @type {number}
     * @memberof AppIconBadgeCountUpdateResponse
     */
    devices_unregistered?: number;
}
/**
 * 
 * @export
 * @interface BadRequestError
 */
export interface BadRequestError {
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
 * @interface BillingBlockedError
 */
export interface BillingBlockedError {
    /**
     * 
     * @type {string}
     * @memberof BillingBlockedError
     */
    error: BillingBlockedErrorErrorEnum;
    /**
     * 
     * @type {string}
     * @memberof BillingBlockedError
     */
    message: string;
    /**
     * 
     * @type {BillingBlockedErrorTrialPeriod}
     * @memberof BillingBlockedError
     */
    trial_period?: BillingBlockedErrorTrialPeriod;
    /**
     * 
     * @type {string}
     * @memberof BillingBlockedError
     */
    upgrade_url: string;
}


/**
 * @export
 */
export const BillingBlockedErrorErrorEnum = {
    TrialExpired: 'trial_expired',
    TrialExhausted: 'trial_exhausted',
    BillingOverageCapReached: 'billing_overage_cap_reached'
} as const;
export type BillingBlockedErrorErrorEnum = typeof BillingBlockedErrorErrorEnum[keyof typeof BillingBlockedErrorErrorEnum];

/**
 * 
 * @export
 * @interface BillingBlockedErrorTrialPeriod
 */
export interface BillingBlockedErrorTrialPeriod {
    /**
     * 
     * @type {string}
     * @memberof BillingBlockedErrorTrialPeriod
     */
    started_at: string;
    /**
     * 
     * @type {string}
     * @memberof BillingBlockedErrorTrialPeriod
     */
    ends_at: string;
}
/**
 * 
 * @export
 * @interface ChannelTarget
 */
export interface ChannelTarget {
    /**
     * Channel slugs. When omitted, API key scope determines recipients.
     * @type {Array<string>}
     * @memberof ChannelTarget
     */
    channels: Array<string>;
}
/**
 * End payload requires title. For segmented_progress include current_step and optionally number_of_steps. For progress include percentage or value with upper_limit. For metrics and stats include a non-empty metrics array. For value include a string or number in value; strings preserve currency, units, and other formatting. For alert include message. For timer, omit duration_seconds to preserve and freeze the latest timer state. Optional icon is supported by all Live Activity types. Optional badge is supported by alert, progress, segmented_progress, and value. Type is optional when ending an existing activity. You can send an updated number_of_steps here if the workflow changed after start.
 * @export
 * @interface ContentStateEnd
 */
export interface ContentStateEnd {
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
     * Current completed step count. Use for type=segmented_progress. Must be less than or equal to number_of_steps when number_of_steps is provided.
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
     * For type=value, the required prominent readout (string or finite number); strings preserve exact formatting. For type=progress, a numeric progress value used with upper_limit.
     * @type {LiveActivityValue}
     * @memberof ContentStateEnd
     */
    value?: LiveActivityValue;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateEnd
     */
    upper_limit?: number;
    /**
     * Timer duration in seconds. For type=timer, omit duration_seconds on end to preserve and freeze the latest timer state.
     * @type {number}
     * @memberof ContentStateEnd
     */
    duration_seconds?: number;
    /**
     * Use with type=timer. When true or omitted, the timer counts down from duration_seconds. Set false for an elapsed timer; omit duration_seconds for an open-ended elapsed timer.
     * @type {boolean}
     * @memberof ContentStateEnd
     */
    counts_down?: boolean;
    /**
     * Use with type=timer. Defaults to true. Set false to pause/freeze via API; set true on a paused timer to resume.
     * @type {boolean}
     * @memberof ContentStateEnd
     */
    is_running?: boolean;
    /**
     * Use for type=metrics or type=stats.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateEnd
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Alert message. Use for type=alert.
     * @type {string}
     * @memberof ContentStateEnd
     */
    message?: string;
    /**
     * Optional SF Symbol icon. Supported by alert, progress, segmented_progress, metrics, stats, timer, and value.
     * @type {LiveActivityAlertIcon}
     * @memberof ContentStateEnd
     */
    icon?: LiveActivityAlertIcon;
    /**
     * Optional badge. Supported by alert, progress, segmented_progress, and value.
     * @type {LiveActivityAlertBadge}
     * @memberof ContentStateEnd
     */
    badge?: LiveActivityAlertBadge;
    /**
     * Optional. When omitted, the API uses the existing Live Activity type.
     * @type {string}
     * @memberof ContentStateEnd
     */
    type?: ContentStateEndTypeEnum;
    /**
     * Optional. Accent color for progress, segmented_progress, metrics, timer, and value Live Activities. For Alert Live Activities, this tints action and secondary_action buttons when included.
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
    Metrics: 'metrics',
    Stats: 'stats',
    Alert: 'alert',
    Timer: 'timer',
    Value: 'value'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type ContentStateEndStepColorsEnum = typeof ContentStateEndStepColorsEnum[keyof typeof ContentStateEndStepColorsEnum];

/**
 * Start payload requires title and type. For segmented_progress include number_of_steps and current_step. For progress include percentage or value with upper_limit. For metrics and stats include a non-empty metrics array. For value include a string or number in value; strings preserve currency, units, and other formatting. For alert include message. For timer include duration_seconds for countdowns, or set counts_down false without duration_seconds for an open-ended elapsed timer. Optional icon is supported by all Live Activity types. Optional badge is supported by alert, progress, segmented_progress, and value. For segmented_progress, number_of_steps is not locked and can be changed in later update or end calls.
 * @export
 * @interface ContentStateStart
 */
export interface ContentStateStart {
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
     * Current completed step count. Use for type=segmented_progress. Set 0 when the activity has started but no segment is complete yet. Must be less than or equal to number_of_steps.
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
     * For type=value, the required prominent readout (string or finite number); strings preserve exact formatting. For type=progress, a numeric progress value used with upper_limit.
     * @type {LiveActivityValue}
     * @memberof ContentStateStart
     */
    value?: LiveActivityValue;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateStart
     */
    upper_limit?: number;
    /**
     * Timer duration in seconds. For type=timer countdowns, required on start when counts_down is true or omitted.
     * @type {number}
     * @memberof ContentStateStart
     */
    duration_seconds?: number;
    /**
     * Use with type=timer. When true or omitted, the timer counts down from duration_seconds. Set false for an elapsed timer; omit duration_seconds for an open-ended elapsed timer.
     * @type {boolean}
     * @memberof ContentStateStart
     */
    counts_down?: boolean;
    /**
     * Use with type=timer. Defaults to true. Set false to pause/freeze via API; set true on a paused timer to resume.
     * @type {boolean}
     * @memberof ContentStateStart
     */
    is_running?: boolean;
    /**
     * Use for type=metrics or type=stats.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateStart
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Required for type=alert.
     * @type {string}
     * @memberof ContentStateStart
     */
    message?: string;
    /**
     * Optional SF Symbol icon. Supported by alert, progress, segmented_progress, metrics, stats, timer, and value.
     * @type {LiveActivityAlertIcon}
     * @memberof ContentStateStart
     */
    icon?: LiveActivityAlertIcon;
    /**
     * Optional badge. Supported by alert, progress, segmented_progress, and value.
     * @type {LiveActivityAlertBadge}
     * @memberof ContentStateStart
     */
    badge?: LiveActivityAlertBadge;
    /**
     * 
     * @type {string}
     * @memberof ContentStateStart
     */
    type: ContentStateStartTypeEnum;
    /**
     * Optional. Accent color for progress, segmented_progress, metrics, timer, and value Live Activities. For Alert Live Activities, this tints action and secondary_action buttons when included.
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
    Metrics: 'metrics',
    Stats: 'stats',
    Alert: 'alert',
    Timer: 'timer',
    Value: 'value'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type ContentStateStartStepColorsEnum = typeof ContentStateStartStepColorsEnum[keyof typeof ContentStateStartStepColorsEnum];

/**
 * Update payload requires title. For segmented_progress include current_step and optionally number_of_steps. For progress include percentage or value with upper_limit. For metrics and stats include a non-empty metrics array. For value include a string or number in value; strings preserve currency, units, and other formatting. For alert include message. For timer, omit duration_seconds to preserve the current timer window or send duration_seconds to reset the timer from the update request time. Optional icon is supported by all Live Activity types. Optional badge is supported by alert, progress, segmented_progress, and value. Type is optional when updating an existing activity. You can increase or decrease number_of_steps during updates.
 * @export
 * @interface ContentStateUpdate
 */
export interface ContentStateUpdate {
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
     * Current completed step count. Use for type=segmented_progress. Set 0 when no segment is complete yet. Must be less than or equal to number_of_steps when number_of_steps is provided.
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
     * For type=value, the required prominent readout (string or finite number); strings preserve exact formatting. For type=progress, a numeric progress value used with upper_limit.
     * @type {LiveActivityValue}
     * @memberof ContentStateUpdate
     */
    value?: LiveActivityValue;
    /**
     * Maximum progress value. Use with value for type=progress.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    upper_limit?: number;
    /**
     * Timer duration in seconds. For type=timer, sending duration_seconds resets the timer window from the update request time; omit it to preserve the existing timer window.
     * @type {number}
     * @memberof ContentStateUpdate
     */
    duration_seconds?: number;
    /**
     * Use with type=timer. When true or omitted, the timer counts down from duration_seconds. Set false for an elapsed timer; omit duration_seconds for an open-ended elapsed timer.
     * @type {boolean}
     * @memberof ContentStateUpdate
     */
    counts_down?: boolean;
    /**
     * Use with type=timer. Defaults to true. Set false to pause/freeze via API; set true on a paused timer to resume.
     * @type {boolean}
     * @memberof ContentStateUpdate
     */
    is_running?: boolean;
    /**
     * Use for type=metrics or type=stats.
     * @type {Array<ActivityMetric>}
     * @memberof ContentStateUpdate
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Alert message. Use for type=alert.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    message?: string;
    /**
     * Optional SF Symbol icon. Supported by alert, progress, segmented_progress, metrics, stats, timer, and value.
     * @type {LiveActivityAlertIcon}
     * @memberof ContentStateUpdate
     */
    icon?: LiveActivityAlertIcon;
    /**
     * Optional badge. Supported by alert, progress, segmented_progress, and value.
     * @type {LiveActivityAlertBadge}
     * @memberof ContentStateUpdate
     */
    badge?: LiveActivityAlertBadge;
    /**
     * Optional. When omitted, the API uses the existing Live Activity type.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    type?: ContentStateUpdateTypeEnum;
    /**
     * Optional. Accent color for progress, segmented_progress, metrics, timer, and value Live Activities. For Alert Live Activities, this tints action and secondary_action buttons when included.
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
    Metrics: 'metrics',
    Stats: 'stats',
    Alert: 'alert',
    Timer: 'timer',
    Value: 'value'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type ContentStateUpdateStepColorsEnum = typeof ContentStateUpdateStepColorsEnum[keyof typeof ContentStateUpdateStepColorsEnum];

/**
 * 
 * @export
 * @interface ForbiddenError
 */
export interface ForbiddenError {
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
 * Optional action button shown in the Live Activity UI. Use action for the primary button, or secondary_action for a secondary button on alert, progress, segmented_progress, and value Live Activities.
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
     * Action URL. For open_url, use an HTTP or HTTPS URL or a shortcuts://run-shortcut?name=... URL that runs a specific iPhone Shortcut. For webhook, use an HTTPS URL called by the ActivitySmith backend.
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
     * @type {object}
     * @memberof LiveActivityAction
     */
    body?: object;
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
 * Optional badge for Live Activities.
 * @export
 * @interface LiveActivityAlertBadge
 */
export interface LiveActivityAlertBadge {
    /**
     * 
     * @type {string}
     * @memberof LiveActivityAlertBadge
     */
    title: string;
    /**
     * Optional badge color.
     * @type {LiveActivityColor}
     * @memberof LiveActivityAlertBadge
     */
    color?: LiveActivityColor;
}
/**
 * Optional SF Symbol icon for Live Activities.
 * @export
 * @interface LiveActivityAlertIcon
 */
export interface LiveActivityAlertIcon {
    /**
     * Apple SF Symbol name.
     * @type {string}
     * @memberof LiveActivityAlertIcon
     */
    symbol: string;
    /**
     * Optional icon color.
     * @type {LiveActivityColor}
     * @memberof LiveActivityAlertIcon
     */
    color?: LiveActivityColor;
}

/**
 * 
 * @export
 */
export const LiveActivityColor = {
    Lime: 'lime',
    Green: 'green',
    Cyan: 'cyan',
    Blue: 'blue',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type LiveActivityColor = typeof LiveActivityColor[keyof typeof LiveActivityColor];

/**
 * End an existing Live Activity by activity_id.
 * @export
 * @interface LiveActivityEndRequest
 */
export interface LiveActivityEndRequest {
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof LiveActivityEndRequest
     */
    metadata?: { [key: string]: MetadataValue; };
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndRequest
     */
    activity_id: string;
    /**
     * Tags for notification history. Omit to keep existing Tags, supply an array to replace them, or send an empty array to clear them.
     * @type {Array<string>}
     * @memberof LiveActivityEndRequest
     */
    tags?: Array<string>;
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
    /**
     * Optional secondary action button. Supported for alert, progress, segmented_progress, and value Live Activities. Uses the same open_url, shortcuts://, and webhook shapes as action.
     * @type {LiveActivityAction}
     * @memberof LiveActivityEndRequest
     */
    secondary_action?: LiveActivityAction;
}
/**
 * Returned after a Live Activity end event is sent or queued.
 * @export
 * @interface LiveActivityEndResponse
 */
export interface LiveActivityEndResponse {
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
    /**
     * True when the Live Activity had already ended and the request had no effect.
     * @type {boolean}
     * @memberof LiveActivityEndResponse
     */
    ignored?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndResponse
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndResponse
     */
    end_reason?: string | null;
    /**
     * True when the Live Activity was marked complete without a confirmed APNs end delivery.
     * @type {boolean}
     * @memberof LiveActivityEndResponse
     */
    forced_completion?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityEndResponse
     */
    warning?: string;
    /**
     * Per-device delivery errors when some devices could not be reached.
     * @type {Array<string>}
     * @memberof LiveActivityEndResponse
     */
    errors?: Array<string>;
}
/**
 * 
 * @export
 * @interface LiveActivityLimitError
 */
export interface LiveActivityLimitError {
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
     * Highest number of active Live Activities among the targeted devices.
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    active: number;
    /**
     * Number of targeted devices that have reached the enforced iOS Live Activity concurrency threshold. Included only when targeted devices have mixed capacity.
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    blocked_devices?: number;
    /**
     * Total number of targeted devices. Included only when targeted devices have mixed capacity.
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    targeted_devices?: number;
}
/**
 * Start a new Live Activity. The response includes activity_id for later update and end calls.
 * @export
 * @interface LiveActivityStartRequest
 */
export interface LiveActivityStartRequest {
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof LiveActivityStartRequest
     */
    metadata?: { [key: string]: MetadataValue; };
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
     * Optional secondary action button. Supported for alert, progress, segmented_progress, and value Live Activities. Uses the same open_url, shortcuts://, and webhook shapes as action.
     * @type {LiveActivityAction}
     * @memberof LiveActivityStartRequest
     */
    secondary_action?: LiveActivityAction;
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
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityStartRequest
     */
    tags?: Array<string>;
}
/**
 * Returned after a Live Activity starts. Save activity_id and use it for all later updates and for the final end call.
 * @export
 * @interface LiveActivityStartResponse
 */
export interface LiveActivityStartResponse {
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
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityStartResponse
     */
    tags?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    timestamp: string;
    /**
     * Present when starting this Live Activity ended an older one to stay within the device limit.
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    ended_activity_id?: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    message?: string;
    /**
     * Per-device delivery errors when some devices could not be reached.
     * @type {Array<string>}
     * @memberof LiveActivityStartResponse
     */
    errors?: Array<string>;
}
/**
 * Optional payload for ending a managed stream. When omitted, ActivitySmith ends the stream using the latest known state when possible.
 * @export
 * @interface LiveActivityStreamDeleteRequest
 */
export interface LiveActivityStreamDeleteRequest {
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof LiveActivityStreamDeleteRequest
     */
    metadata?: { [key: string]: MetadataValue; };
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityStreamDeleteRequest
     */
    tags?: Array<string>;
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
     * Optional secondary action button. Supported for alert, progress, segmented_progress, and value Live Activities. Uses the same open_url, shortcuts://, and webhook shapes as action.
     * @type {LiveActivityAction}
     * @memberof LiveActivityStreamDeleteRequest
     */
    secondary_action?: LiveActivityAction;
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
    /**
     * True when the stream was already ended and the request had no effect.
     * @type {boolean}
     * @memberof LiveActivityStreamDeleteResponse
     */
    ignored?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    message?: string;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityStreamDeleteResponse
     */
    forced_completion?: boolean;
    /**
     * Present when the stream had a current Live Activity. True when the end was sent to at least one device, or queued for a device that has not registered yet. False when no device received it, so the Live Activity may stay on the Lock Screen until iOS removes it or someone dismisses it.
     * @type {boolean}
     * @memberof LiveActivityStreamDeleteResponse
     */
    delivered?: boolean;
    /**
     * Explains why the end may not have removed the Live Activity, for example because iOS had already ended a Live Activity that started more than 8 hours ago.
     * @type {string}
     * @memberof LiveActivityStreamDeleteResponse
     */
    warning?: string;
    /**
     * Per-device delivery errors when some devices could not be reached.
     * @type {Array<string>}
     * @memberof LiveActivityStreamDeleteResponse
     */
    errors?: Array<string>;
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
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityStreamPutResponse
     */
    tags?: Array<string>;
    /**
     * Present on `updated` responses when the current Live Activity has received more than 12 updates and has averaged more than one update every 2 minutes since it started. The update is still sent, but iOS may throttle Live Activities that update this often.
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    warning?: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    timestamp: string;
    /**
     * True when the request had no effect.
     * @type {boolean}
     * @memberof LiveActivityStreamPutResponse
     */
    ignored?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LiveActivityStreamPutResponse
     */
    remote_push_sent?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityStreamPutResponse
     */
    message?: string;
    /**
     * Per-device delivery errors when some devices could not be reached.
     * @type {Array<string>}
     * @memberof LiveActivityStreamPutResponse
     */
    errors?: Array<string>;
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
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof LiveActivityStreamRequest
     */
    metadata?: { [key: string]: MetadataValue; };
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
     * Optional secondary action button. Supported for alert, progress, segmented_progress, and value Live Activities. Uses the same open_url, shortcuts://, and webhook shapes as action.
     * @type {LiveActivityAction}
     * @memberof LiveActivityStreamRequest
     */
    secondary_action?: LiveActivityAction;
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
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityStreamRequest
     */
    tags?: Array<string>;
}
/**
 * Update an existing Live Activity by activity_id.
 * @export
 * @interface LiveActivityUpdateRequest
 */
export interface LiveActivityUpdateRequest {
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof LiveActivityUpdateRequest
     */
    metadata?: { [key: string]: MetadataValue; };
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateRequest
     */
    activity_id: string;
    /**
     * Tags for notification history. Omit to keep existing Tags, supply an array to replace them, or send an empty array to clear them.
     * @type {Array<string>}
     * @memberof LiveActivityUpdateRequest
     */
    tags?: Array<string>;
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
    /**
     * Optional secondary action button. Supported for alert, progress, segmented_progress, and value Live Activities. Uses the same open_url, shortcuts://, and webhook shapes as action.
     * @type {LiveActivityAction}
     * @memberof LiveActivityUpdateRequest
     */
    secondary_action?: LiveActivityAction;
}
/**
 * Returned after a Live Activity update is sent or queued.
 * @export
 * @interface LiveActivityUpdateResponse
 */
export interface LiveActivityUpdateResponse {
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
    /**
     * 
     * @type {number}
     * @memberof LiveActivityUpdateResponse
     */
    users_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof LiveActivityUpdateResponse
     */
    effective_channel_slugs?: Array<string>;
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof LiveActivityUpdateResponse
     */
    tags?: Array<string>;
    /**
     * Present when the update started a new Live Activity for a managed stream.
     * @type {string}
     * @memberof LiveActivityUpdateResponse
     */
    operation?: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateResponse
     */
    stream_key?: string;
    /**
     * 
     * @type {string}
     * @memberof LiveActivityUpdateResponse
     */
    previous_activity_id?: string;
    /**
     * Per-device delivery errors when some devices could not be reached.
     * @type {Array<string>}
     * @memberof LiveActivityUpdateResponse
     */
    errors?: Array<string>;
}
/**
 * @type LiveActivityValue
 * A formatted string or finite numeric Live Activity value. String formatting is preserved.
 * @export
 */
export type LiveActivityValue = number | string;

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
 * @type MetadataValue
 * 
 * @export
 */
export type MetadataValue = boolean | number | string;
/**
 * 
 * @export
 * @interface Metric
 */
export interface Metric {
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    public_id: string;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    key: string;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    format: MetricFormatEnum;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    currency_code: string | null;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    unit: string | null;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    unit_spacing: MetricUnitSpacingEnum;
    /**
     * 
     * @type {any}
     * @memberof Metric
     */
    latest_value: any | null;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    latest_value_at: string | null;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    created_at: string;
    /**
     * 
     * @type {string}
     * @memberof Metric
     */
    updated_at: string;
}


/**
 * @export
 */
export const MetricFormatEnum = {
    Number: 'number',
    Currency: 'currency',
    Percent: 'percent',
    Unit: 'unit',
    String: 'string'
} as const;
export type MetricFormatEnum = typeof MetricFormatEnum[keyof typeof MetricFormatEnum];

/**
 * @export
 */
export const MetricUnitSpacingEnum = {
    None: 'none',
    Space: 'space'
} as const;
export type MetricUnitSpacingEnum = typeof MetricUnitSpacingEnum[keyof typeof MetricUnitSpacingEnum];

/**
 * 
 * @export
 * @interface MetricError
 */
export interface MetricError {
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
 * 
 * @export
 * @interface MetricResponse
 */
export interface MetricResponse {
    /**
     * 
     * @type {Metric}
     * @memberof MetricResponse
     */
    metric: Metric;
}
/**
 * Metric definition. Omitted fields keep their current values, or use defaults for a new metric: a label made from the key and the number format.
 * @export
 * @interface MetricUpsertRequest
 */
export interface MetricUpsertRequest {
    /**
     * Name shown on the widget.
     * @type {string}
     * @memberof MetricUpsertRequest
     */
    label?: string;
    /**
     * How widgets display the value: number (1,234), currency (requires currency_code), percent (send 99.9 to show 99.9%), unit (a number with a unit suffix, such as 120 ms), or string (text up to 64 characters). Defaults to number for a new metric.
     * @type {string}
     * @memberof MetricUpsertRequest
     */
    format?: MetricUpsertRequestFormatEnum;
    /**
     * 3-letter ISO 4217 currency code, such as USD. Required for the currency format.
     * @type {string}
     * @memberof MetricUpsertRequest
     */
    currency_code?: string;
    /**
     * Unit suffix for the unit format, such as ms or GB.
     * @type {string}
     * @memberof MetricUpsertRequest
     */
    unit?: string;
    /**
     * For the unit format: none shows 120ms, space shows 120 ms.
     * @type {string}
     * @memberof MetricUpsertRequest
     */
    unit_spacing?: MetricUpsertRequestUnitSpacingEnum;
}


/**
 * @export
 */
export const MetricUpsertRequestFormatEnum = {
    Number: 'number',
    Currency: 'currency',
    Percent: 'percent',
    Unit: 'unit',
    String: 'string'
} as const;
export type MetricUpsertRequestFormatEnum = typeof MetricUpsertRequestFormatEnum[keyof typeof MetricUpsertRequestFormatEnum];

/**
 * @export
 */
export const MetricUpsertRequestUnitSpacingEnum = {
    None: 'none',
    Space: 'space'
} as const;
export type MetricUpsertRequestUnitSpacingEnum = typeof MetricUpsertRequestUnitSpacingEnum[keyof typeof MetricUpsertRequestUnitSpacingEnum];

/**
 * Latest metric value to display in widgets.
 * @export
 * @interface MetricValueUpdateRequest
 */
export interface MetricValueUpdateRequest {
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
    /**
     * 
     * @type {boolean}
     * @memberof MetricValueUpdateResponse
     */
    success: boolean;
    /**
     * true when this request created the metric because no metric used the key yet.
     * @type {boolean}
     * @memberof MetricValueUpdateResponse
     */
    created?: boolean;
}
/**
 * 
 * @export
 * @interface NoRecipientsError
 */
export interface NoRecipientsError {
    /**
     * 
     * @type {string}
     * @memberof NoRecipientsError
     */
    error: string;
    /**
     * Machine-readable reason. no_paired_devices: the account has no active paired iOS devices; pair an iPhone with the ActivitySmith app. no_recipients_found: devices are paired, but none matched the targeted channels. Treat unknown values as a generic no-delivery error.
     * @type {string}
     * @memberof NoRecipientsError
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof NoRecipientsError
     */
    message: string;
    /**
     * ActivitySmith App Store link. Present when code is no_paired_devices.
     * @type {string}
     * @memberof NoRecipientsError
     */
    app_store_url?: string;
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
 * How urgently iOS presents the notification. `passive` arrives quietly in the notification list without sound or lighting up the screen. `active` is normal delivery and the default when omitted. `time-sensitive` can break through Focus and Scheduled Summary when the user allows Time Sensitive Notifications for ActivitySmith.
 * @export
 */
export const PushInterruptionLevel = {
    Passive: 'passive',
    Active: 'active',
    TimeSensitive: 'time-sensitive'
} as const;
export type PushInterruptionLevel = typeof PushInterruptionLevel[keyof typeof PushInterruptionLevel];

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
     * Action URL. For open_url, use HTTP, HTTPS, Shortcuts, or an installed app’s custom URL scheme, such as spotify:// or spotify:track:123. Custom app schemes require iOS 1.13.4 build 2 or later; no web fallback is provided. Internal and executable schemes are blocked. For webhook, use an HTTPS URL called by the ActivitySmith backend.
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
     * @type {object}
     * @memberof PushNotificationAction
     */
    body?: object;
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
 * Replacement content. title, subtitle, message, redirection, media, icon, actions, and payload fully replace the original values. Omit metadata or tags to keep the stored values; send {} or [] to clear them.
 * @export
 * @interface PushNotificationReplaceRequest
 */
export interface PushNotificationReplaceRequest {
    [key: string]: any | any;
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof PushNotificationReplaceRequest
     */
    metadata?: { [key: string]: MetadataValue; };
    /**
     * 
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    subtitle?: string;
    /**
     * Optional HTTPS image URL without credentials for a custom notification icon. If the image cannot be loaded, the app icon is used. iOS may omit subtitle when displaying a custom icon.
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    icon?: string;
    /**
     * Optional HTTPS URL for an image, audio file, or video that users can preview or play when they expand the notification. If `redirection` is omitted, tapping the notification opens this URL. Cannot be combined with `actions`.
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    media?: string;
    /**
     * Optional HTTP, HTTPS, Shortcuts, or installed app URL opened when the user taps the notification body. Custom schemes such as spotify:// and spotify:track:123 require iOS 1.13.4 build 2 or later and an installed handler; no web fallback is provided. Internal and executable schemes are blocked. Overrides the default tap target from media.
     * @type {string}
     * @memberof PushNotificationReplaceRequest
     */
    redirection?: string;
    /**
     * Optional interactive actions shown when users expand the notification. Cannot be combined with `media`.
     * @type {Array<PushNotificationAction>}
     * @memberof PushNotificationReplaceRequest
     */
    actions?: Array<PushNotificationAction>;
    /**
     * 
     * @type {object}
     * @memberof PushNotificationReplaceRequest
     */
    payload?: object;
    /**
     * 
     * @type {number}
     * @memberof PushNotificationReplaceRequest
     */
    badge?: number;
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof PushNotificationReplaceRequest
     */
    tags?: Array<string>;
}
/**
 * Apple APNs acceptance result for the replacement. Acceptance does not confirm device delivery or presentation.
 * @export
 * @interface PushNotificationReplaceResponse
 */
export interface PushNotificationReplaceResponse {
    /**
     * True when APNs accepts the replacement for at least one device.
     * @type {boolean}
     * @memberof PushNotificationReplaceResponse
     */
    success: boolean;
    /**
     * ID of the replaced Push Notification. It stays the same, so you can replace it again.
     * @type {string}
     * @memberof PushNotificationReplaceResponse
     */
    notification_id: string;
    /**
     * Number of device tokens for which APNs accepted the notification, without confirming on-device delivery.
     * @type {number}
     * @memberof PushNotificationReplaceResponse
     */
    devices_notified?: number;
    /**
     * 
     * @type {number}
     * @memberof PushNotificationReplaceResponse
     */
    users_notified?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof PushNotificationReplaceResponse
     */
    effective_channel_slugs?: Array<string>;
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof PushNotificationReplaceResponse
     */
    tags?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationReplaceResponse
     */
    timestamp: string;
}
/**
 * 
 * @export
 * @interface PushNotificationRequest
 */
export interface PushNotificationRequest {
    [key: string]: any | any;
    /**
     * Additional information shown in notification and Live Activity details in ActivitySmith. Not displayed in the Push Notification or Live Activity on the device. Values must be strings, finite numbers, or booleans. At most 50 entries and 16 KB of serialized UTF-8 JSON. Omit on updates to preserve existing Metadata; send {} to clear it.
     * @type {{ [key: string]: MetadataValue; }}
     * @memberof PushNotificationRequest
     */
    metadata?: { [key: string]: MetadataValue; };
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
     * Optional HTTPS image URL without credentials for a custom notification icon. If the image cannot be loaded, the app icon is used. iOS may omit subtitle when displaying a custom icon.
     * @type {string}
     * @memberof PushNotificationRequest
     */
    icon?: string;
    /**
     * Optional. How urgently iOS presents the notification: `passive` (quiet, no sound or screen wake), `active` (default), or `time-sensitive` (can break through Focus and Scheduled Summary when allowed). Omit for normal delivery.
     * @type {PushInterruptionLevel}
     * @memberof PushNotificationRequest
     */
    interruption_level?: PushInterruptionLevel;
    /**
     * Optional HTTPS URL for an image, audio file, or video that users can preview or play when they expand the notification. If `redirection` is omitted, tapping the notification opens this URL. Cannot be combined with `actions`.
     * @type {string}
     * @memberof PushNotificationRequest
     */
    media?: string;
    /**
     * Optional HTTP, HTTPS, Shortcuts, or installed app URL opened when the user taps the notification body. Custom schemes such as spotify:// and spotify:track:123 require iOS 1.13.4 build 2 or later and an installed handler; no web fallback is provided. Internal and executable schemes are blocked. Overrides the default tap target from media.
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
     * @type {object}
     * @memberof PushNotificationRequest
     */
    payload?: object;
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
    /**
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof PushNotificationRequest
     */
    tags?: Array<string>;
}
/**
 * Apple APNs acceptance result. Acceptance does not confirm device delivery or presentation. Alerts remain eligible for APNs delivery retries for 24 hours; device settings and APNs storage policies still apply.
 * @export
 * @interface PushNotificationResponse
 */
export interface PushNotificationResponse {
    /**
     * True when APNs accepts the notification for at least one targeted device.
     * @type {boolean}
     * @memberof PushNotificationResponse
     */
    success: boolean;
    /**
     * ID of this Push Notification. Pass it to `PUT /push-notification/{notification_id}` to replace the notification later.
     * @type {string}
     * @memberof PushNotificationResponse
     */
    notification_id?: string;
    /**
     * Number of device tokens for which APNs accepted the notification, without confirming on-device delivery.
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
     * Optional tags to organize and filter notification history.
     * @type {Array<string>}
     * @memberof PushNotificationResponse
     */
    tags?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationResponse
     */
    timestamp: string;
    /**
     * Number of device tokens targeted.
     * @type {number}
     * @memberof PushNotificationResponse
     */
    devices_targeted?: number;
    /**
     * Number of device tokens deactivated because APNs reported them unregistered.
     * @type {number}
     * @memberof PushNotificationResponse
     */
    devices_deactivated?: number;
    /**
     * Number of targeted device tokens APNs reported as unregistered.
     * @type {number}
     * @memberof PushNotificationResponse
     */
    devices_unregistered?: number;
    /**
     * True when the request was an integration connection test and no paired devices were available.
     * @type {boolean}
     * @memberof PushNotificationResponse
     */
    credential_test?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PushNotificationResponse
     */
    message?: string;
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
    /**
     * 
     * @type {string}
     * @memberof RateLimitError
     */
    code?: RateLimitErrorCodeEnum;
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
 * @export
 */
export const RateLimitErrorCodeEnum = {
    RateLimited: 'rate_limited'
} as const;
export type RateLimitErrorCodeEnum = typeof RateLimitErrorCodeEnum[keyof typeof RateLimitErrorCodeEnum];

/**
 * @type SendPushNotification429Response
 * 
 * @export
 */
export type SendPushNotification429Response = LiveActivityLimitError | RateLimitError;
/**
 * Current state for a managed Live Activity stream. Include type on the first PUT, and whenever the stream may need to start a fresh activity. Supports segmented_progress, progress, metrics, stats, alert, timer, and value types. For timer, send duration_seconds to start or reset a bounded timer; omit duration_seconds on later updates to preserve the existing timer window.
 * @export
 * @interface StreamContentState
 */
export interface StreamContentState {
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
     * Use for segmented_progress. Set 0 when no segment is complete yet. Must be less than or equal to number_of_steps when number_of_steps is provided.
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
     * For type=value, the required prominent readout (string or finite number); strings preserve exact formatting. For progress, a numeric progress value used with upper_limit.
     * @type {LiveActivityValue}
     * @memberof StreamContentState
     */
    value?: LiveActivityValue;
    /**
     * Maximum progress value. Use with value for progress.
     * @type {number}
     * @memberof StreamContentState
     */
    upper_limit?: number;
    /**
     * Timer duration in seconds. For type=timer, send duration_seconds to start or reset the timer window; omit it on later stream updates to preserve the existing timer window.
     * @type {number}
     * @memberof StreamContentState
     */
    duration_seconds?: number;
    /**
     * Use with type=timer. When true or omitted, the timer counts down from duration_seconds. Set false for an elapsed timer; omit duration_seconds for an open-ended elapsed timer.
     * @type {boolean}
     * @memberof StreamContentState
     */
    counts_down?: boolean;
    /**
     * Use with type=timer. Defaults to true. Set false to pause/freeze via API; set true on a paused timer to resume.
     * @type {boolean}
     * @memberof StreamContentState
     */
    is_running?: boolean;
    /**
     * Required on the first PUT or whenever the stream cannot infer the current activity type.
     * @type {string}
     * @memberof StreamContentState
     */
    type?: StreamContentStateTypeEnum;
    /**
     * Optional. Accent color for progress, segmented_progress, metrics, timer, and value Live Activities. For Alert Live Activities, this tints action and secondary_action buttons when included.
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
     * Use for metrics and stats activities.
     * @type {Array<ActivityMetric>}
     * @memberof StreamContentState
     */
    metrics?: Array<ActivityMetric>;
    /**
     * Required for type=alert.
     * @type {string}
     * @memberof StreamContentState
     */
    message?: string;
    /**
     * Optional SF Symbol icon. Supported by alert, progress, segmented_progress, metrics, stats, timer, and value.
     * @type {LiveActivityAlertIcon}
     * @memberof StreamContentState
     */
    icon?: LiveActivityAlertIcon;
    /**
     * Optional badge. Supported by alert, progress, segmented_progress, and value.
     * @type {LiveActivityAlertBadge}
     * @memberof StreamContentState
     */
    badge?: LiveActivityAlertBadge;
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
    Metrics: 'metrics',
    Stats: 'stats',
    Alert: 'alert',
    Timer: 'timer',
    Value: 'value'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
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
    Yellow: 'yellow',
    Gray: 'gray'
} as const;
export type StreamContentStateStepColorsEnum = typeof StreamContentStateStepColorsEnum[keyof typeof StreamContentStateStepColorsEnum];

/**
 * @type UpdateAppIconBadgeCount422Response
 * 
 * @export
 */
export type UpdateAppIconBadgeCount422Response = AppIconBadgeCountUpdateError | NoRecipientsError;
