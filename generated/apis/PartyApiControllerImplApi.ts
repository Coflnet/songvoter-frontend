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


import * as runtime from '../runtime';
import type {
  CoflnetSongVoterDBModelsParty,
  CoflnetSongVoterDBModelsSong,
  CoflnetSongVoterModelsParty,
} from '../models';
import {
    CoflnetSongVoterDBModelsPartyFromJSON,
    CoflnetSongVoterDBModelsPartyToJSON,
    CoflnetSongVoterDBModelsSongFromJSON,
    CoflnetSongVoterDBModelsSongToJSON,
    CoflnetSongVoterModelsPartyFromJSON,
    CoflnetSongVoterModelsPartyToJSON,
} from '../models';

export interface PartyDownvoteSongIdPostRequest {
    songId: string;
}

export interface PartyInviteLinkGetRequest {
    partyId: string;
}

export interface PartyInviteUserIdPostRequest {
    partyId: string;
    userId: string;
}

export interface PartyKickUserIdPostRequest {
    userId: string;
}

export interface PartyPartyIdJoinPostRequest {
    partyId: string;
}

export interface PartyPartyIdResetPostRequest {
    partyId: string;
}

export interface PartyPartyIdUpvoteSongIdPostRequest {
    partyId: string;
    songId: string;
}

export interface PartySongSongIdPlayedPostRequest {
    songId: string;
}

/**
 * 
 */
export class PartyApiControllerImplApi extends runtime.BaseAPI {

    /**
     * votes a song down so it is play later/not at all
     */
    async partyDownvoteSongIdPostRaw(requestParameters: PartyDownvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling partyDownvoteSongIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/downvote/{songId}`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * votes a song down so it is play later/not at all
     */
    async partyDownvoteSongIdPost(requestParameters: PartyDownvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyDownvoteSongIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Returns all parties of the curent user
     */
    async partyGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterModelsParty>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterModelsPartyFromJSON(jsonValue));
    }

    /**
     * Returns all parties of the curent user
     */
    async partyGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterModelsParty> {
        const response = await this.partyGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates an invite link for a party
     */
    async partyInviteLinkGetRaw(requestParameters: PartyInviteLinkGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling partyInviteLinkGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/inviteLink`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Creates an invite link for a party
     */
    async partyInviteLinkGet(requestParameters: PartyInviteLinkGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.partyInviteLinkGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Invites a user to a party
     */
    async partyInviteUserIdPostRaw(requestParameters: PartyInviteUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling partyInviteUserIdPost.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling partyInviteUserIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/invite/{userId}`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Invites a user to a party
     */
    async partyInviteUserIdPost(requestParameters: PartyInviteUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyInviteUserIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * kicks a user from a party
     */
    async partyKickUserIdPostRaw(requestParameters: PartyKickUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling partyKickUserIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/kick/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * kicks a user from a party
     */
    async partyKickUserIdPost(requestParameters: PartyKickUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyKickUserIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Leave a party
     */
    async partyLeavePostRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/leave`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Leave a party
     */
    async partyLeavePost(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyLeavePostRaw(initOverrides);
    }

    /**
     * gets the next Song
     */
    async partyNextSongGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterDBModelsSong>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/nextSong`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterDBModelsSongFromJSON(jsonValue));
    }

    /**
     * gets the next Song
     */
    async partyNextSongGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterDBModelsSong> {
        const response = await this.partyNextSongGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Joins a party
     */
    async partyPartyIdJoinPostRaw(requestParameters: PartyPartyIdJoinPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling partyPartyIdJoinPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/{partyId}/join`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Joins a party
     */
    async partyPartyIdJoinPost(requestParameters: PartyPartyIdJoinPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyPartyIdJoinPostRaw(requestParameters, initOverrides);
    }

    /**
     * resets the parties playing state
     */
    async partyPartyIdResetPostRaw(requestParameters: PartyPartyIdResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling partyPartyIdResetPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/{partyId}/reset`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * resets the parties playing state
     */
    async partyPartyIdResetPost(requestParameters: PartyPartyIdResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyPartyIdResetPostRaw(requestParameters, initOverrides);
    }

    /**
     * Adds an upvote to an song wich causes it to be played sooner. Also adds new songs to a party
     * votes a song up so it is play sooner
     */
    async partyPartyIdUpvoteSongIdPostRaw(requestParameters: PartyPartyIdUpvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling partyPartyIdUpvoteSongIdPost.');
        }

        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling partyPartyIdUpvoteSongIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/{partyId}/upvote/{songId}`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))).replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Adds an upvote to an song wich causes it to be played sooner. Also adds new songs to a party
     * votes a song up so it is play sooner
     */
    async partyPartyIdUpvoteSongIdPost(requestParameters: PartyPartyIdUpvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partyPartyIdUpvoteSongIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Creates a new party
     */
    async partyPostRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterDBModelsParty>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterDBModelsPartyFromJSON(jsonValue));
    }

    /**
     * Creates a new party
     */
    async partyPost(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterDBModelsParty> {
        const response = await this.partyPostRaw(initOverrides);
        return await response.value();
    }

    /**
     * Marks a song as played
     */
    async partySongSongIdPlayedPostRaw(requestParameters: PartySongSongIdPlayedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling partySongSongIdPlayedPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/party/song/{songId}/played`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Marks a song as played
     */
    async partySongSongIdPlayedPost(requestParameters: PartySongSongIdPlayedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.partySongSongIdPlayedPostRaw(requestParameters, initOverrides);
    }

}
