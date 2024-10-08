/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { TierChangeNotificationAction } from './TierChangeNotificationAction';
import {
    TierChangeNotificationActionFromJSON,
    TierChangeNotificationActionFromJSONTyped,
    TierChangeNotificationActionToJSON,
} from './TierChangeNotificationAction';

/**
 * 
 * @export
 * @interface TierChangeNotification
 */
export interface TierChangeNotification {
    /**
     * 
     * @type {string}
     * @memberof TierChangeNotification
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof TierChangeNotification
     */
    groupId: string;
    /**
     * 
     * @type {boolean}
     * @memberof TierChangeNotification
     */
    isSeen: boolean;
    /**
     * 
     * @type {number}
     * @memberof TierChangeNotification
     */
    seenAt?: number;
    /**
     * 
     * @type {Array<TierChangeNotificationAction>}
     * @memberof TierChangeNotification
     */
    actions: Array<TierChangeNotificationAction>;
}

/**
 * Check if a given object implements the TierChangeNotification interface.
 */
export function instanceOfTierChangeNotification(value: object): value is TierChangeNotification {
    let isInstance = true;
    isInstance = isInstance && "type" in value && value["type"] !== undefined;
    isInstance = isInstance && "groupId" in value && value["groupId"] !== undefined;
    isInstance = isInstance && "isSeen" in value && value["isSeen"] !== undefined;
    isInstance = isInstance && "actions" in value && value["actions"] !== undefined;

    return isInstance;
}

export function TierChangeNotificationFromJSON(json: any): TierChangeNotification {
    return TierChangeNotificationFromJSONTyped(json, false);
}

export function TierChangeNotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TierChangeNotification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'groupId': json['group_id'],
        'isSeen': json['is_seen'],
        'seenAt': !exists(json, 'seen_at') ? undefined : json['seen_at'],
        'actions': ((json['actions'] as Array<any>).map(TierChangeNotificationActionFromJSON)),
    };
}

export function TierChangeNotificationToJSON(value?: TierChangeNotification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'group_id': value.groupId,
        'is_seen': value.isSeen,
        'seen_at': value.seenAt,
        'actions': ((value.actions as Array<any>).map(TierChangeNotificationActionToJSON)),
    };
}

