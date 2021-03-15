[shareResourceAccess](../README.md) / TokenGenerator

# Class: TokenGenerator

TokenGenerator class

## Table of contents

### Constructors

- [constructor](tokengenerator.md#constructor)

### Methods

- [create](tokengenerator.md#create)
- [verify](tokengenerator.md#verify)

## Constructors

### constructor

\+ **new TokenGenerator**(): [*TokenGenerator*](tokengenerator.md)

**Returns:** [*TokenGenerator*](tokengenerator.md)

## Methods

### create

▸ `Static`**create**(`uri`: *string*, `permissions`: [*Permissions*](../README.md#permissions)[], `startTime`: *number*, `expiryTime`: *number*, `clientIps`: *string*, `key`: *string*): *string*

Create the share resource access token

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`uri` | *string* | the resource uri   |
`permissions` | [*Permissions*](../README.md#permissions)[] | the array of permissions   |
`startTime` | *number* | the start time in unix timestamp   |
`expiryTime` | *number* | the expiry time in unix timestamp   |
`clientIps` | *string* | the optional client ips in comma seperate e.g. 192.168.0.1, 192.168.0.2   |
`key` | *string* | the secret key to sign   |

**Returns:** *string*

- the share resource token

Defined in: [token-generator.ts:23](https://github.com/thomas-tran/share-resource-access/blob/7c9cd1c/src/token-generator.ts#L23)

___

### verify

▸ `Static`**verify**(`token`: *string*, `key`: *string*): *boolean*

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`token` | *string* | the shared resource access token   |
`key` | *string* | the key to verify the token   |

**Returns:** *boolean*

true if the token is valid, otherwise returns false

Defined in: [token-generator.ts:65](https://github.com/thomas-tran/share-resource-access/blob/7c9cd1c/src/token-generator.ts#L65)
