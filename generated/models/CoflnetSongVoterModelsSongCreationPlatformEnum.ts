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


/**
 * The platform of this song
 * @export
 */
export const CoflnetSongVoterModelsSongCreationPlatformEnum = {
    Youtube: 'youtube',
    Spotify: 'spotify'
} as const;
export type CoflnetSongVoterModelsSongCreationPlatformEnum = typeof CoflnetSongVoterModelsSongCreationPlatformEnum[keyof typeof CoflnetSongVoterModelsSongCreationPlatformEnum];


export function CoflnetSongVoterModelsSongCreationPlatformEnumFromJSON(json: any): CoflnetSongVoterModelsSongCreationPlatformEnum {
    return CoflnetSongVoterModelsSongCreationPlatformEnumFromJSONTyped(json, false);
}

export function CoflnetSongVoterModelsSongCreationPlatformEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): CoflnetSongVoterModelsSongCreationPlatformEnum {
    return json as CoflnetSongVoterModelsSongCreationPlatformEnum;
}

export function CoflnetSongVoterModelsSongCreationPlatformEnumToJSON(value?: CoflnetSongVoterModelsSongCreationPlatformEnum | null): any {
    return value as any;
}

