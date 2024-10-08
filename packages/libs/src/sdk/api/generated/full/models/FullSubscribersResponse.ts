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
import type { UserFull } from './UserFull';
import {
    UserFullFromJSON,
    UserFullFromJSONTyped,
    UserFullToJSON,
} from './UserFull';
import type { VersionMetadata } from './VersionMetadata';
import {
    VersionMetadataFromJSON,
    VersionMetadataFromJSONTyped,
    VersionMetadataToJSON,
} from './VersionMetadata';

/**
 * 
 * @export
 * @interface FullSubscribersResponse
 */
export interface FullSubscribersResponse {
    /**
     * 
     * @type {number}
     * @memberof FullSubscribersResponse
     */
    latestChainBlock: number;
    /**
     * 
     * @type {number}
     * @memberof FullSubscribersResponse
     */
    latestIndexedBlock: number;
    /**
     * 
     * @type {number}
     * @memberof FullSubscribersResponse
     */
    latestChainSlotPlays: number;
    /**
     * 
     * @type {number}
     * @memberof FullSubscribersResponse
     */
    latestIndexedSlotPlays: number;
    /**
     * 
     * @type {string}
     * @memberof FullSubscribersResponse
     */
    signature: string;
    /**
     * 
     * @type {string}
     * @memberof FullSubscribersResponse
     */
    timestamp: string;
    /**
     * 
     * @type {VersionMetadata}
     * @memberof FullSubscribersResponse
     */
    version: VersionMetadata;
    /**
     * 
     * @type {Array<UserFull>}
     * @memberof FullSubscribersResponse
     */
    data?: Array<UserFull>;
}

/**
 * Check if a given object implements the FullSubscribersResponse interface.
 */
export function instanceOfFullSubscribersResponse(value: object): value is FullSubscribersResponse {
    let isInstance = true;
    isInstance = isInstance && "latestChainBlock" in value && value["latestChainBlock"] !== undefined;
    isInstance = isInstance && "latestIndexedBlock" in value && value["latestIndexedBlock"] !== undefined;
    isInstance = isInstance && "latestChainSlotPlays" in value && value["latestChainSlotPlays"] !== undefined;
    isInstance = isInstance && "latestIndexedSlotPlays" in value && value["latestIndexedSlotPlays"] !== undefined;
    isInstance = isInstance && "signature" in value && value["signature"] !== undefined;
    isInstance = isInstance && "timestamp" in value && value["timestamp"] !== undefined;
    isInstance = isInstance && "version" in value && value["version"] !== undefined;

    return isInstance;
}

export function FullSubscribersResponseFromJSON(json: any): FullSubscribersResponse {
    return FullSubscribersResponseFromJSONTyped(json, false);
}

export function FullSubscribersResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FullSubscribersResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latestChainBlock': json['latest_chain_block'],
        'latestIndexedBlock': json['latest_indexed_block'],
        'latestChainSlotPlays': json['latest_chain_slot_plays'],
        'latestIndexedSlotPlays': json['latest_indexed_slot_plays'],
        'signature': json['signature'],
        'timestamp': json['timestamp'],
        'version': VersionMetadataFromJSON(json['version']),
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(UserFullFromJSON)),
    };
}

export function FullSubscribersResponseToJSON(value?: FullSubscribersResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latest_chain_block': value.latestChainBlock,
        'latest_indexed_block': value.latestIndexedBlock,
        'latest_chain_slot_plays': value.latestChainSlotPlays,
        'latest_indexed_slot_plays': value.latestIndexedSlotPlays,
        'signature': value.signature,
        'timestamp': value.timestamp,
        'version': VersionMetadataToJSON(value.version),
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(UserFullToJSON)),
    };
}

