import { Hello } from '../src';

test('hello', () => {
    expect(new Hello().world()).toBe('Hello, world!')
});
