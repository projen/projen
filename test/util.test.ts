import { decamelizeKeysRecursively, isTruthy } from '../src/util';

describe('decamelizeRecursively', () => {
  test('decamel recurses an object structure', () => {
    // GIVEN
    const input = {
      dependsOn: ['a', 'b', 'c'],
      volumes: [
        {
          driver: 'tmpfs',
          driverOpts: {
            type: 'nfs',
            o: 'addr=...',
            device: ':/docker/example',
          },
        },
      ],
    };

    // WHEN
    const output = decamelizeKeysRecursively(input);

    // THEN
    expect(output).toEqual({
      depends_on: ['a', 'b', 'c'],
      volumes: [
        {
          driver: 'tmpfs',
          driver_opts: {
            type: 'nfs',
            o: 'addr=...',
            device: ':/docker/example',
          },
        },
      ],
    });
  });

  test('decamel quits when it recurses too deeply', () => {
    // GIVEN
    const circle: Record<string, any> = {};
    circle.circle = circle;

    // WHEN
    expect(() => decamelizeKeysRecursively(circle)).toThrow(/circular reference/);
  });

  test('decamel can know when not to decamelize a key', () => {
    // GIVEN
    const input = {
      dependsOn: ['a', 'b'],
      environment: {
        leaveThisAlone: true,
        LEAVE_CASE_ALONE: true,
      },
    };

    // WHEN
    const output = decamelizeKeysRecursively(input, {
      shouldDecamelize(path, _value) {
        return !/^environment\./.test(path.join('.'));
      },
    });

    // THEN
    expect(output).toEqual({
      depends_on: ['a', 'b'],
      environment: {
        leaveThisAlone: true,
        LEAVE_CASE_ALONE: true,
      },
    });
  });
});

test('isTruthy', () => {
  expect(isTruthy(undefined)).toEqual(false);
  expect(isTruthy('false')).toEqual(false);
  expect(isTruthy('0')).toEqual(false);
  expect(isTruthy('null')).toEqual(false);
  expect(isTruthy('')).toEqual(false);
  expect(isTruthy('true')).toEqual(true);
  expect(isTruthy('1')).toEqual(true);
  expect(isTruthy('enabled')).toEqual(true);
});
