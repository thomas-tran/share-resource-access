import { TokenGenerator } from './';

describe('should generate token', () => {
  it('returns token value', () => {
    const token = TokenGenerator.create(
      'http://sample/file',
      ['r', 'w'],
      1234,
      1233,
      '',
      'secret',
    );
    console.log(token);
    expect(token).toBeDefined();
  });

  it('returns invalid token', () => {
    const token =
      'rs_uri=http%3A%2F%2Fsample%2Ffile&ap=rw&st=1234&et=1233&ip=&sig=fp8DYQewQ0p80Ppqa9e31%2FQTSlrTIy1K%2BqHGd3zojBs%3D';
    const isValid = TokenGenerator.verify(token, 'secret');
    expect(isValid).toBe(false);
  });

  it('returns valid token', () => {
    const token =
      'rs_uri=http%3A%2F%2Fsample%2Ffile&ap=rw&st=1234&et=1233&ip=&sig=JJ4iVmFhPVIpQUe%2BkBmvvSAM1bRuwBuansUTDQQ4DbU%3D';
    const isValid = TokenGenerator.verify(token, 'secret');
    expect(isValid).toBe(true);
  });
});
