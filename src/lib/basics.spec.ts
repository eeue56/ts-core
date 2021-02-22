import test from 'ava';

import * as Basics from './basics';

test('pipe', (t) => {
    const doubleLength = Basics.pipe(
        'hello',
        (str: string) => {
            return str.length;
        },
        (length: number) => {
            return length + length;
        }
    );

    t.deepEqual(doubleLength, 10);
});

test('compose', (t) => {
    const func = Basics.compose(
        (str: string) => {
            return str.length;
        },
        (length: number) => {
            return length + length;
        }
    );

    const doubleLength = func('hello');
    t.deepEqual(doubleLength, 10);
});
