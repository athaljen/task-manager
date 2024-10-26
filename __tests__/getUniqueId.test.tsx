import {getUniqueId} from '../src/util';

describe('getUniqueId', () => {
  it('should return a string', () => {
    const id = getUniqueId();
    expect(typeof id).toBe('string');
  });

  it('should return a unique each time', () => {
    const id1 = getUniqueId();
    const id2 = getUniqueId();
    expect(id1).not.toBe(id2);
  });

  it('sufficient length for uniqueness', () => {
    const id = getUniqueId();
    expect(id.length).toBeGreaterThanOrEqual(25);
  });
});
