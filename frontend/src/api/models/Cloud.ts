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
/**
 * 
 * @export
 * @interface Cloud
 */
export interface Cloud {
    /**
     * 
     * @type {string}
     * @memberof Cloud
     */
    cloudName: string;
    /**
     * 
     * @type {string}
     * @memberof Cloud
     */
    cloudDescription?: string;
    /**
     * 
     * @type {number}
     * @memberof Cloud
     */
    geoLatitude: number;
    /**
     * 
     * @type {number}
     * @memberof Cloud
     */
    geoLongitude: number;
    /**
     * 
     * @type {string}
     * @memberof Cloud
     */
    geoRegion: string;
}

export function CloudFromJSON(json: any): Cloud {
    return CloudFromJSONTyped(json, false);
}

export function CloudFromJSONTyped(json: any, ignoreDiscriminator: boolean): Cloud {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cloudName': json['cloud_name'],
        'cloudDescription': !exists(json, 'cloud_description') ? undefined : json['cloud_description'],
        'geoLatitude': json['geo_latitude'],
        'geoLongitude': json['geo_longitude'],
        'geoRegion': json['geo_region'],
    };
}

export function CloudToJSON(value?: Cloud | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cloud_name': value.cloudName,
        'cloud_description': value.cloudDescription,
        'geo_latitude': value.geoLatitude,
        'geo_longitude': value.geoLongitude,
        'geo_region': value.geoRegion,
    };
}


