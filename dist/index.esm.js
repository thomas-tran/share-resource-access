/*!
 * share-resource-access v1.0.0
 * (c) Thomas Tran
 * Released under the MIT License.
 */

import utf8 from 'utf8';
import createHmac from 'create-hmac';
import querystring from 'querystring';

/**
 * TokenGenerator class
 */
var TokenGenerator = /** @class */ (function () {
    function TokenGenerator() {
    }
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
    TokenGenerator.create = function (uri, permissions, startTime, expiryTime, clientIps, key) {
        if (!uri || !key || !startTime || !expiryTime) {
            throw new Error('Missing required parameter');
        }
        var encoded = encodeURIComponent(uri);
        var payload = {
            rs_uri: uri,
            ap: permissions.join(''),
            st: startTime.toString(),
            et: expiryTime.toString(),
            ip: clientIps,
        };
        var payloadEncoded = utf8.encode(JSON.stringify(payload));
        // sign with the secret key
        var hash = createHmac('sha256', key)
            .update(payloadEncoded)
            .digest('base64');
        return "rs_uri=" + encoded + "&ap=" + permissions.join('') + "&st=" + startTime + "&et=" + expiryTime + "&ip=" + clientIps + "&sig=" + encodeURIComponent(hash);
    };
    /**
     *
     * @param token the shared resource access token
     * @param key the key to verify the token
     * @returns true if the token is valid, otherwise returns false
     */
    TokenGenerator.verify = function (token, key) {
        var payload = querystring.parse(token);
        var sig = payload.sig;
        // remove the signature from payload
        delete payload.sig;
        var payloadEncoded = utf8.encode(JSON.stringify(payload));
        var hash = createHmac('sha256', key)
            .update(payloadEncoded)
            .digest('base64');
        return sig === hash;
    };
    return TokenGenerator;
}());

export { TokenGenerator };
//# sourceMappingURL=index.esm.js.map
