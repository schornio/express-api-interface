import { HTTPBadRequestError } from '../../Error';
import stringObjectToMap from './index';

test('stringObjectToMap', () => {
  const result = stringObjectToMap({ a: '1', b: '2', c: '3' });
  expect(result).toStrictEqual(
    new Map([
      ['a', '1'],
      ['b', '2'],
      ['c', '3'],
    ]),
  );
});

test('stringObjectToMap no string', () => {
  expect(() => {
    stringObjectToMap({ a: '1', b: 2, c: '3' });
  }).toThrow(HTTPBadRequestError);
});
