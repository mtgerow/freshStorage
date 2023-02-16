import { DataBuilder } from '../../src/support/DataBuilder.js';
import { STORAGE_TYPES, DATE_KEY } from '../../src/support/Constants.js';

const instance = new DataBuilder();
const standardExp = new Date(new Date().getTime()+5000);
describe('DataBuilder functionality tests.', ()=> {
  it('returns object with value and expiration.', () => {
    const input = 'input';
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result).toHaveProperty('exp');
    expect(result).toHaveProperty('data');
    expect(result.data).toEqual(input);
  });

  it('returns object with basic expiration type.', () => {
    const input = 'input';
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result).toHaveProperty('type');
    expect(result.type).toEqual(STORAGE_TYPES.BASIC_EXPIRATION);
  });

  it('can handle array values', () => {
    const input = ['input1', 'input2'];
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(input);
  });

  it('can handle number values', () => {
    const input = 12345;
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(input);
  });

  it('can handle boolean values', () => {
    const input = true;
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(input);
  });

  it('can handle object values', () => {
    const input = {key1: 'value1', key2:' value2', keyA: true, id: 324};
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(input);
  });

  it('will parse date values into milliseconds', () => {
    const input = standardExp;
    const expected = DATE_KEY + standardExp.getTime();
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(expected);
  });

  it('will parse object date values into milliseconds', () => {
    const input = {key1: 'value1', key2:' value2', keyA: standardExp, id: 324};
    const expected = input;
    expected.keyA = DATE_KEY + standardExp.getTime();
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(expected);
  });

  it('will parse nested date values into milliseconds', () => {
    const date2 = new Date();
    const input = {key1: 'value1', key2:' value2', keyA: standardExp, nextObj: { key4: 'value3', keyB: date2}};
    const expected = input;
    expected.keyA = DATE_KEY + standardExp.getTime();
    expected.nextObj.keyB = DATE_KEY + date2.getTime();
    const result = instance.buildBasicDataItem(input, standardExp);
    expect(result.data).toStrictEqual(expected);
  });
});
