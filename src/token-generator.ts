import utf8 from 'utf8';
import createHmac from 'create-hmac';
import querystring from 'querystring';
/**
 * Permission types
 */
export type Permissions = 'r' | 'w' | 'd'; // READ, WRITE, DELETE

/**
 * TokenGenerator class
 */
export class TokenGenerator {
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
  public static create(
    uri: string,
    permissions: Permissions[],
    startTime: number,
    expiryTime: number,
    clientIps: string,
    key: string,
  ): string {
    if (!uri || !key || !startTime || !expiryTime) {
      throw new Error('Missing required parameter');
    }

    const encoded = encodeURIComponent(uri);

    const payload = {
      rs_uri: uri,
      ap: permissions.join(''),
      st: startTime.toString(),
      et: expiryTime.toString(),
      ip: clientIps,
    };

    const payloadEncoded = utf8.encode(JSON.stringify(payload));

    // sign with the secret key
    const hash = createHmac('sha256', key)
      .update(payloadEncoded)
      .digest('base64');

    return `rs_uri=${encoded}&ap=${permissions.join(
      '',
    )}&st=${startTime}&et=${expiryTime}&ip=${clientIps}&sig=${encodeURIComponent(
      hash,
    )}`;
  }

  /**
   *
   * @param token the shared resource access token
   * @param key the key to verify the token
   * @returns true if the token is valid, otherwise returns false
   */
  public static verify(token: string, key: string): boolean {
    const payload = querystring.parse(token);

    const sig = payload.sig;

    // remove the signature from payload
    delete payload.sig;

    const payloadEncoded = utf8.encode(JSON.stringify(payload));

    const hash = createHmac('sha256', key)
      .update(payloadEncoded)
      .digest('base64');

    return sig === hash;
  }
}
