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
  CoflnetSongVoterDBModelsPlatforms,
  CoflnetSongVoterMiddlewareApiException,
  CoflnetSongVoterModelsInvite,
  CoflnetSongVoterModelsParty,
  CoflnetSongVoterModelsPartyPlaylistEntry,
  CoflnetSongVoterModelsSong,
} from '../models';
import {
    CoflnetSongVoterDBModelsPlatformsFromJSON,
    CoflnetSongVoterDBModelsPlatformsToJSON,
    CoflnetSongVoterMiddlewareApiExceptionFromJSON,
    CoflnetSongVoterMiddlewareApiExceptionToJSON,
    CoflnetSongVoterModelsInviteFromJSON,
    CoflnetSongVoterModelsInviteToJSON,
    CoflnetSongVoterModelsPartyFromJSON,
    CoflnetSongVoterModelsPartyToJSON,
    CoflnetSongVoterModelsPartyPlaylistEntryFromJSON,
    CoflnetSongVoterModelsPartyPlaylistEntryToJSON,
    CoflnetSongVoterModelsSongFromJSON,
    CoflnetSongVoterModelsSongToJSON,
} from '../models';

export interface ApiPartyDownvoteSongIdPostRequest {
    songId: string;
}

export interface ApiPartyInviteIdJoinPostRequest {
    inviteId: string;
}

export interface ApiPartyInviteUserIdPostRequest {
    partyId: string;
    userId: string;
}

export interface ApiPartyKickUserIdPostRequest {
    userId: string;
}

export interface ApiPartyPartyIdResetPostRequest {
    partyId: string;
}

export interface ApiPartyPostRequest {
    name?: string;
    supportedPlatforms?: CoflnetSongVoterDBModelsPlatforms;
}

export interface ApiPartyRemoveVoteSongIdPostRequest {
    songId: string;
}

export interface ApiPartySongSongIdPlayedPostRequest {
    songId: string;
}

export interface ApiPartyUpvoteSongIdPostRequest {
    songId: string;
}

/**
 * 
 */
export class PartyApi extends runtime.BaseAPI {

    /**
     * votes a song down so it is play later/not at all
     */
    async apiPartyDownvoteSongIdPostRaw(requestParameters: ApiPartyDownvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling apiPartyDownvoteSongIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/downvote/{songId}`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * votes a song down so it is play later/not at all
     */
    async apiPartyDownvoteSongIdPost(requestParameters: ApiPartyDownvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyDownvoteSongIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Returns all parties of the curent user
     */
    async apiPartyGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterModelsParty>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterModelsPartyFromJSON(jsonValue));
    }

    /**
     * Returns all parties of the curent user
     */
    async apiPartyGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterModelsParty> {
        const response = await this.apiPartyGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Joins a party
     */
    async apiPartyInviteIdJoinPostRaw(requestParameters: ApiPartyInviteIdJoinPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inviteId === null || requestParameters.inviteId === undefined) {
            throw new runtime.RequiredError('inviteId','Required parameter requestParameters.inviteId was null or undefined when calling apiPartyInviteIdJoinPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/{inviteId}/join`.replace(`{${"inviteId"}}`, encodeURIComponent(String(requestParameters.inviteId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Joins a party
     */
    async apiPartyInviteIdJoinPost(requestParameters: ApiPartyInviteIdJoinPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyInviteIdJoinPostRaw(requestParameters, initOverrides);
    }

    /**
     * Creates an invite link for a party
     */
    async apiPartyInviteLinkGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterModelsInvite>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/inviteLink`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterModelsInviteFromJSON(jsonValue));
    }

    /**
     * Creates an invite link for a party
     */
    async apiPartyInviteLinkGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterModelsInvite> {
        const response = await this.apiPartyInviteLinkGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Invites a user to a party
     */
    async apiPartyInviteUserIdPostRaw(requestParameters: ApiPartyInviteUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling apiPartyInviteUserIdPost.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiPartyInviteUserIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/invite/{userId}`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Invites a user to a party
     */
    async apiPartyInviteUserIdPost(requestParameters: ApiPartyInviteUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyInviteUserIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * kicks a user from a party
     */
    async apiPartyKickUserIdPostRaw(requestParameters: ApiPartyKickUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling apiPartyKickUserIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/kick/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * kicks a user from a party
     */
    async apiPartyKickUserIdPost(requestParameters: ApiPartyKickUserIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyKickUserIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Leave a party
     */
    async apiPartyLeavePostRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/leave`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Leave a party
     */
    async apiPartyLeavePost(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyLeavePostRaw(initOverrides);
    }

    /**
     * gets the next Song
     */
    async apiPartyNextSongGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterModelsSong>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/nextSong`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterModelsSongFromJSON(jsonValue));
    }

    /**
     * gets the next Song
     */
    async apiPartyNextSongGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterModelsSong> {
        const response = await this.apiPartyNextSongGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * resets the parties playing state
     */
    async apiPartyPartyIdResetPostRaw(requestParameters: ApiPartyPartyIdResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.partyId === null || requestParameters.partyId === undefined) {
            throw new runtime.RequiredError('partyId','Required parameter requestParameters.partyId was null or undefined when calling apiPartyPartyIdResetPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/{partyId}/reset`.replace(`{${"partyId"}}`, encodeURIComponent(String(requestParameters.partyId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * resets the parties playing state
     */
    async apiPartyPartyIdResetPost(requestParameters: ApiPartyPartyIdResetPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyPartyIdResetPostRaw(requestParameters, initOverrides);
    }

    /**
     */
    async apiPartyPlaylistGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<CoflnetSongVoterModelsPartyPlaylistEntry>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/playlist`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CoflnetSongVoterModelsPartyPlaylistEntryFromJSON));
    }

    /**
     */
    async apiPartyPlaylistGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CoflnetSongVoterModelsPartyPlaylistEntry>> {
        const response = await this.apiPartyPlaylistGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Creates a new party
     */
    async apiPartyPostRaw(requestParameters: ApiPartyPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterModelsParty>> {
        const queryParameters: any = {};

        if (requestParameters.name !== undefined) {
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.supportedPlatforms !== undefined) {
            queryParameters['SupportedPlatforms'] = requestParameters.supportedPlatforms;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterModelsPartyFromJSON(jsonValue));
    }

    /**
     * Creates a new party
     */
    async apiPartyPost(requestParameters: ApiPartyPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterModelsParty> {
        const response = await this.apiPartyPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove vote from song
     */
    async apiPartyRemoveVoteSongIdPostRaw(requestParameters: ApiPartyRemoveVoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling apiPartyRemoveVoteSongIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/removeVote/{songId}`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove vote from song
     */
    async apiPartyRemoveVoteSongIdPost(requestParameters: ApiPartyRemoveVoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyRemoveVoteSongIdPostRaw(requestParameters, initOverrides);
    }

    /**
     * Marks a song as played
     */
    async apiPartySongSongIdPlayedPostRaw(requestParameters: ApiPartySongSongIdPlayedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling apiPartySongSongIdPlayedPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/song/{songId}/played`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Marks a song as played
     */
    async apiPartySongSongIdPlayedPost(requestParameters: ApiPartySongSongIdPlayedPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartySongSongIdPlayedPostRaw(requestParameters, initOverrides);
    }

    /**
     * Adds an upvote to an song wich causes it to be played sooner. Also adds new songs to a party
     * votes a song up so it is play sooner
     */
    async apiPartyUpvoteSongIdPostRaw(requestParameters: ApiPartyUpvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.songId === null || requestParameters.songId === undefined) {
            throw new runtime.RequiredError('songId','Required parameter requestParameters.songId was null or undefined when calling apiPartyUpvoteSongIdPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/party/upvote/{songId}`.replace(`{${"songId"}}`, encodeURIComponent(String(requestParameters.songId))),
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
    async apiPartyUpvoteSongIdPost(requestParameters: ApiPartyUpvoteSongIdPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPartyUpvoteSongIdPostRaw(requestParameters, initOverrides);
    }

}
