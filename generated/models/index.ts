/* tslint:disable */
/* eslint-disable */
/**
 * End payload. Required fields are title and current_step. number_of_steps is optional.
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
     * 
     * @type {number}
     * @memberof ContentStateEnd
     */
    number_of_steps?: number;
    /**
     * 
     * @type {number}
     * @memberof ContentStateEnd
     */
    current_step: number;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof ContentStateEnd
     */
    color?: ContentStateEndColorEnum;
    /**
     * Optional. Overrides color for the current step.
     * @type {string}
     * @memberof ContentStateEnd
     */
    step_color?: ContentStateEndStepColorEnum;
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
 * Start payload requires title, number_of_steps, current_step, and type.
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
     * 
     * @type {number}
     * @memberof ContentStateStart
     */
    number_of_steps: number;
    /**
     * 
     * @type {number}
     * @memberof ContentStateStart
     */
    current_step: number;
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
     * Optional. Overrides color for the current step.
     * @type {string}
     * @memberof ContentStateStart
     */
    step_color?: ContentStateStartStepColorEnum;
}


/**
 * @export
 */
export const ContentStateStartTypeEnum = {
    SegmentedProgress: 'segmented_progress'
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
 * Update payload. Required fields are title and current_step. number_of_steps is optional.
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
     * 
     * @type {number}
     * @memberof ContentStateUpdate
     */
    number_of_steps?: number;
    /**
     * 
     * @type {number}
     * @memberof ContentStateUpdate
     */
    current_step: number;
    /**
     * Optional. Accent color for the Live Activity. Defaults to blue.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    color?: ContentStateUpdateColorEnum;
    /**
     * Optional. Overrides color for the current step.
     * @type {string}
     * @memberof ContentStateUpdate
     */
    step_color?: ContentStateUpdateStepColorEnum;
}


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
 * 
 * @export
 * @interface LiveActivityEndRequest
 */
export interface LiveActivityEndRequest {
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
}
/**
 * 
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
     * Current number of active Live Activities.
     * @type {number}
     * @memberof LiveActivityLimitError
     */
    active: number;
}
/**
 * 
 * @export
 * @interface LiveActivityStartRequest
 */
export interface LiveActivityStartRequest {
    /**
     * 
     * @type {ContentStateStart}
     * @memberof LiveActivityStartRequest
     */
    content_state: ContentStateStart;
}
/**
 * 
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
     * @type {string}
     * @memberof LiveActivityStartResponse
     */
    timestamp: string;
}
/**
 * 
 * @export
 * @interface LiveActivityUpdateRequest
 */
export interface LiveActivityUpdateRequest {
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
}
/**
 * 
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
}
/**
 * 
 * @export
 * @interface PushNotificationRequest
 */
export interface PushNotificationRequest {
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
}
/**
 * 
 * @export
 * @interface PushNotificationResponse
 */
export interface PushNotificationResponse {
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
     * @type {string}
     * @memberof PushNotificationResponse
     */
    timestamp: string;
}
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
