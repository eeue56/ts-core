import test from 'ava';

import * as Tuple from './tuple';

test('pair', (t) => {
    const aPair = Tuple.pair('one', 2);
    t.deepEqual(aPair, {
        first: 'one',
        second: 2,
    });
});

test('first', (t) => {
    const aPair = Tuple.pair('one', 2);
    t.deepEqual(Tuple.first(aPair), 'one');
});

test('second', (t) => {
    const aPair = Tuple.pair('one', 2);
    t.deepEqual(Tuple.second(aPair), 2);
});

test('mapFirst', (t) => {
    const aPair = Tuple.pair('one', 2);
    const convertFunc = (value: string) => {
        return value.length;
    };
    t.deepEqual(Tuple.first(Tuple.mapFirst(convertFunc, aPair)), 3);
});

test('mapSecond', (t) => {
    const aPair = Tuple.pair('one', 2);
    const convertFunc = (value: number) => {
        return value + value;
    };
    t.deepEqual(Tuple.second(Tuple.mapSecond(convertFunc, aPair)), 4);
});

test('mapBoth', (t) => {
    const aPair = Tuple.pair('one', 2);
    const convertFirstFunc = (value: string) => {
        return value.length;
    };
    const convertSecondFunc = (value: number) => {
        return value + value;
    };

    t.deepEqual(Tuple.mapBoth(convertFirstFunc, convertSecondFunc, aPair), {
        first: 3,
        second: 4,
    });
});
