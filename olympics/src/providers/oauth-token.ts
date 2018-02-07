import { Injectable } from "@angular/core";

/**
 * Represents an OAuth2 token.
 */
interface IOAuthToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: Date;
    scope: string;

    isExpired() : boolean;
}

/**
 * Represents an OAuth2 token.
 */
@Injectable() export class OAuthToken implements IOAuthToken
{
    access_token: string = null;
    token_type: string = null;
    refresh_token: string = null;
    expires_in: number = 0;
    expires_at: Date = null;
    scope: string = null;

    constructor(_token?: IOAuthToken) {
        let date = new Date();
        let expires_at = new Date();

        this.access_token = _token ? _token.access_token : null;
        this.token_type = _token ? _token.token_type : null;
        this.refresh_token = _token ? _token.refresh_token : null;
        this.expires_in = _token ? _token.expires_in : 0;
        this.scope = _token ? _token.scope : null;
        this.expires_at = _token? _token.expires_at : null;
    }

    /**
     * Check if an OAuth2 token's access_token is still valid.
     * @param token The token to compare
     */
    public isExpired() : boolean {
        let now = new Date();
        let isExpired: boolean = now.getTime() > this.expires_at.getTime() ? true : false;
        console.log('Token is expired ? ' + isExpired);
        return isExpired;
    }
}