/*!
 * share-resource-access v1.0.0
 * (c) Thomas Tran
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utf8 = require('utf8');
var createHmac = require('create-hmac');
var querystring = require('querystring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var utf8__default = /*#__PURE__*/_interopDefaultLegacy(utf8);
var createHmac__default = /*#__PURE__*/_interopDefaultLegacy(createHmac);
var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);

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
        var payloadEncoded = utf8__default['default'].encode(JSON.stringify(payload));
        // sign with the secret key
        var hash = createHmac__default['default']('sha256', key)
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
        var payload = querystring__default['default'].parse(token);
        var sig = payload.sig;
        // remove the signature from payload
        delete payload.sig;
        var payloadEncoded = utf8__default['default'].encode(JSON.stringify(payload));
        var hash = createHmac__default['default']('sha256', key)
            .update(payloadEncoded)
            .digest('base64');
        return sig === hash;
    };
    return TokenGenerator;
}());

exports.TokenGenerator = TokenGenerator;
//# sourceMappingURL=index.js.map
