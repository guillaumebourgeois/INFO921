/**
 * Represents an OAuth2 token.
 */
export interface OAuthToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: Date;
    scope: string;
}