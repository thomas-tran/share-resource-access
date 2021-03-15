/**
 * Permission types
 */
export declare type Permissions = 'r' | 'w' | 'd';
/**
 * TokenGenerator class
 */
export declare class TokenGenerator {
    /**
     * Create the share resource access token
     * @param uri - the resource uri
     * @param permissions - the array of permissions
     * @param startTime - the start time in unix timestamp
     * @param expiryTime - the expiry time in unix timestamp
     * @param clientIps - the optional client ips in comma seperate e.g. 192.168.0.1, 192.168.0.2
     * @param key - the secret key to sign
     * @returns - the share resource token
     */
    static create(uri: string, permissions: Permissions[], startTime: number, expiryTime: number, clientIps: string, key: string): string;
    /**
     *
     * @param token the shared resource access token
     * @param key the key to verify the token
     * @returns true if the token is valid, otherwise returns false
     */
    static verify(token: string, key: string): boolean;
}
//# sourceMappingURL=token-generator.d.ts.map