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
/**
 * 
 * @export
 * @interface UsdcPurchaseSellerNotificationActionData
 */
export interface UsdcPurchaseSellerNotificationActionData {
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    contentType: string;
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    buyerUserId: string;
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    sellerUserId: string;
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    amount: string;
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    extraAmount: string;
    /**
     * 
     * @type {string}
     * @memberof UsdcPurchaseSellerNotificationActionData
     */
    contentId: string;
}

/**
 * Check if a given object implements the UsdcPurchaseSellerNotificationActionData interface.
 */
export function instanceOfUsdcPurchaseSellerNotificationActionData(value: object): value is UsdcPurchaseSellerNotificationActionData {
    let isInstance = true;
    isInstance = isInstance && "contentType" in value && value["contentType"] !== undefined;
    isInstance = isInstance && "buyerUserId" in value && value["buyerUserId"] !== undefined;
    isInstance = isInstance && "sellerUserId" in value && value["sellerUserId"] !== undefined;
    isInstance = isInstance && "amount" in value && value["amount"] !== undefined;
    isInstance = isInstance && "extraAmount" in value && value["extraAmount"] !== undefined;
    isInstance = isInstance && "contentId" in value && value["contentId"] !== undefined;

    return isInstance;
}

export function UsdcPurchaseSellerNotificationActionDataFromJSON(json: any): UsdcPurchaseSellerNotificationActionData {
    return UsdcPurchaseSellerNotificationActionDataFromJSONTyped(json, false);
}

export function UsdcPurchaseSellerNotificationActionDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsdcPurchaseSellerNotificationActionData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'contentType': json['content_type'],
        'buyerUserId': json['buyer_user_id'],
        'sellerUserId': json['seller_user_id'],
        'amount': json['amount'],
        'extraAmount': json['extra_amount'],
        'contentId': json['content_id'],
    };
}

export function UsdcPurchaseSellerNotificationActionDataToJSON(value?: UsdcPurchaseSellerNotificationActionData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'content_type': value.contentType,
        'buyer_user_id': value.buyerUserId,
        'seller_user_id': value.sellerUserId,
        'amount': value.amount,
        'extra_amount': value.extraAmount,
        'content_id': value.contentId,
    };
}

