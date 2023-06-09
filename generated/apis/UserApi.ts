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
  CoflnetSongVoterDBModelsUser,
} from '../models';
import {
    CoflnetSongVoterDBModelsUserFromJSON,
    CoflnetSongVoterDBModelsUserToJSON,
} from '../models';

export interface UserNamePostRequest {
    body: string;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * Updates the display name of the current user
     */
    async userNamePostRaw(requestParameters: UserNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CoflnetSongVoterDBModelsUser>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling userNamePost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        const response = await this.request({
            path: `/user/name`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CoflnetSongVoterDBModelsUserFromJSON(jsonValue));
    }

    /**
     * Updates the display name of the current user
     */
    async userNamePost(requestParameters: UserNamePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CoflnetSongVoterDBModelsUser> {
        const response = await this.userNamePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
