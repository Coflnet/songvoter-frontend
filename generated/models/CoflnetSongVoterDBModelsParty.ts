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
import type { CoflnetSongVoterDBModelsPartySong } from './CoflnetSongVoterDBModelsPartySong';
import {
    CoflnetSongVoterDBModelsPartySongFromJSON,
    CoflnetSongVoterDBModelsPartySongFromJSONTyped,
    CoflnetSongVoterDBModelsPartySongToJSON,
} from './CoflnetSongVoterDBModelsPartySong';
import type { CoflnetSongVoterDBModelsUser } from './CoflnetSongVoterDBModelsUser';
import {
    CoflnetSongVoterDBModelsUserFromJSON,
    CoflnetSongVoterDBModelsUserFromJSONTyped,
    CoflnetSongVoterDBModelsUserToJSON,
} from './CoflnetSongVoterDBModelsUser';

/**
 * 
 * @export
 * @interface CoflnetSongVoterDBModelsParty
 */
export interface CoflnetSongVoterDBModelsParty {
    /**
     * 
     * @type {number}
     * @memberof CoflnetSongVoterDBModelsParty
     */
    id?: number;
    /**
     * 
     * @type {CoflnetSongVoterDBModelsUser}
     * @memberof CoflnetSongVoterDBModelsParty
     */
    creator?: CoflnetSongVoterDBModelsUser;
    /**
     * 
     * @type {string}
     * @memberof CoflnetSongVoterDBModelsParty
     */
    name?: string | null;
    /**
     * 
     * @type {Array<CoflnetSongVoterDBModelsUser>}
     * @memberof CoflnetSongVoterDBModelsParty
     */
    members?: Array<CoflnetSongVoterDBModelsUser> | null;
    /**
     * 
     * @type {Array<CoflnetSongVoterDBModelsPartySong>}
     * @memberof CoflnetSongVoterDBModelsParty
     */
    songs?: Array<CoflnetSongVoterDBModelsPartySong> | null;
}

/**
 * Check if a given object implements the CoflnetSongVoterDBModelsParty interface.
 */
export function instanceOfCoflnetSongVoterDBModelsParty(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CoflnetSongVoterDBModelsPartyFromJSON(json: any): CoflnetSongVoterDBModelsParty {
    return CoflnetSongVoterDBModelsPartyFromJSONTyped(json, false);
}

export function CoflnetSongVoterDBModelsPartyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CoflnetSongVoterDBModelsParty {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'creator': !exists(json, 'creator') ? undefined : CoflnetSongVoterDBModelsUserFromJSON(json['creator']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'members': !exists(json, 'members') ? undefined : (json['members'] === null ? null : (json['members'] as Array<any>).map(CoflnetSongVoterDBModelsUserFromJSON)),
        'songs': !exists(json, 'songs') ? undefined : (json['songs'] === null ? null : (json['songs'] as Array<any>).map(CoflnetSongVoterDBModelsPartySongFromJSON)),
    };
}

export function CoflnetSongVoterDBModelsPartyToJSON(value?: CoflnetSongVoterDBModelsParty | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'creator': CoflnetSongVoterDBModelsUserToJSON(value.creator),
        'name': value.name,
        'members': value.members === undefined ? undefined : (value.members === null ? null : (value.members as Array<any>).map(CoflnetSongVoterDBModelsUserToJSON)),
        'songs': value.songs === undefined ? undefined : (value.songs === null ? null : (value.songs as Array<any>).map(CoflnetSongVoterDBModelsPartySongToJSON)),
    };
}

