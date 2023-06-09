/* tslint:disable */
/* eslint-disable */
/**
 * Songvoter
 * Songvoter
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: support@coflnet.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CoflnetSongVoterModelsAuthToken
 */
export interface CoflnetSongVoterModelsAuthToken {
    /**
     * Gets or Sets Token
     * @type {string}
     * @memberof CoflnetSongVoterModelsAuthToken
     */
    token?: string | null;
}

/**
 * Check if a given object implements the CoflnetSongVoterModelsAuthToken interface.
 */
export function instanceOfCoflnetSongVoterModelsAuthToken(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CoflnetSongVoterModelsAuthTokenFromJSON(json: any): CoflnetSongVoterModelsAuthToken {
    return CoflnetSongVoterModelsAuthTokenFromJSONTyped(json, false);
}

export function CoflnetSongVoterModelsAuthTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): CoflnetSongVoterModelsAuthToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': !exists(json, 'token') ? undefined : json['token'],
    };
}

export function CoflnetSongVoterModelsAuthTokenToJSON(value?: CoflnetSongVoterModelsAuthToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
    };
}

