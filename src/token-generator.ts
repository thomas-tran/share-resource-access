import utf8 from 'utf8';
import createHmac from 'create-hmac';

export type Permissions = 'r'|'w'|'d'; // READ, WRITE, DELETE

export class TokenGenerator {
    public static create(uri: string, permissions: Permissions[], startTime: number, expiryTime: number, clientIps: string, key:string) : string {

        if (!uri || !key || !startTime || !expiryTime) {
            throw new Error('Missing required parameter');
        }

        const encoded = encodeURIComponent(uri);

        let payload =  {
            'rs_uri': uri,
            'ap': permissions.join(''),
            'st': startTime.toString(),
            'et': expiryTime.toString(),
            'ip': clientIps
        };

        const payloadEncoded = utf8.encode(JSON.stringify(payload));
        

        // sign with the secret key
        const hash = createHmac('sha256', key).update(payloadEncoded).digest('base64');
        
        return `rs_uri=${encoded}&ap=${permissions.join('')}&st=${startTime}&et=${expiryTime}&ip=${clientIps}&sig=${encodeURIComponent(hash)}`;
    }

    public static verify(token: string, key: string): boolean {

        const querystring = require('querystring');
        const payload = querystring.parse(token);
        
        const sig = payload.sig;
        

        // remove the signature from payload
        delete payload.sig

        const payloadEncoded = utf8.encode(JSON.stringify(payload));
        
        const hash = createHmac('sha256', key).update(payloadEncoded).digest('base64');
        
        return sig === hash;
    }
}