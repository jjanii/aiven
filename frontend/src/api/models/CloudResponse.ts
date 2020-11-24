/* tslint:disable */
/* eslint-disable */
/**
 * Aiven Platform List
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Cloud,
    CloudFromJSON,
    CloudFromJSONTyped,
    CloudToJSON,
} from './';

/**
 * 
 * @export
 * @interface CloudResponse
 */
export interface CloudResponse {
    /**
     * 
     * @type {Array<Cloud>}
     * @memberof CloudResponse
     */
    clouds: Array<Cloud>;
    /**
     * 
     * @type {Array<Error>}
     * @memberof CloudResponse
     */
    errors?: Array<Error>;
    /**
     * 
     * @type {string}
     * @memberof CloudResponse
     */
    message?: string;
}

export function CloudResponseFromJSON(json: any): CloudResponse {
    return CloudResponseFromJSONTyped(json, false);
}

export function CloudResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CloudResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clouds': ((json['clouds'] as Array<any>).map(CloudFromJSON)),
        'errors': !exists(json, 'errors') ? undefined : json['errors'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function CloudResponseToJSON(value?: CloudResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clouds': ((value.clouds as Array<any>).map(CloudToJSON)),
        'errors': value.errors,
        'message': value.message,
    };
}

