import test from 'ava';

import * as Maybe from './maybe';

const aNothingValue = Maybe.Nothing<string>();

const aRealValue = 'just something';
const aJustValue = Maybe.Just(aRealValue);

const aSecondRealValue = 'just something else';
const aSecondJustValue = Maybe.Just(aSecondRealValue);

const aThirdRealValue = 'another just something else';
const aThirdJustValue = Maybe.Just(aThirdRealValue);

test('withDefault', (t) => {
    const defaultValue = 'a default';
    t.deepEqual(Maybe.withDefault(defaultValue, aNothingValue), defaultValue);

    t.deepEqual(Maybe.withDefault(defaultValue, aJustValue), aRealValue);
});

test('map', (t) => {
    const innerValue = aRealValue.length;

    const convertFunc = (str: string): number => {
        return str.length;
    };

    const inner = Maybe.Just(innerValue);

    // Nothing => Nothing
    t.deepEqual(Maybe.map(convertFunc, aNothingValue), Maybe.Nothing());

    // Just => Just
    t.deepEqual(Maybe.map(convertFunc, aJustValue), inner);
});

test('map2', (t) => {
    const convertFunc = (first: string, second: string): number => {
        return first.length + second.length;
    };

    const inner = Maybe.Just(aRealValue.length + aSecondRealValue.length);

    // Nothing => Just => Nothing
    t.deepEqual(
        Maybe.map2(convertFunc, aNothingValue, aJustValue),
        Maybe.Nothing()
    );

    // Just => Nothing => Nothing
    t.deepEqual(
        Maybe.map2(convertFunc, aJustValue, aNothingValue),
        Maybe.Nothing()
    );

    // Nothing => Nothing => Nothing
    t.deepEqual(
        Maybe.map2(convertFunc, aNothingValue, aNothingValue),
        Maybe.Nothing()
    );

    // Just => Just => Just
    t.deepEqual(Maybe.map2(convertFunc, aJustValue, aSecondJustValue), inner);
    t.deepEqual(Maybe.map2(convertFunc, aSecondJustValue, aJustValue), inner);
});

test('map3', (t) => {
    const convertFunc = (
        first: string,
        second: string,
        third: string
    ): number => {
        return first.length + second.length + third.length;
    };

    const inner = Maybe.Just(
        aRealValue.length + aSecondRealValue.length + aThirdRealValue.length
    );

    // Just => Nothing => Nothing => Nothing
    t.deepEqual(
        Maybe.map3(convertFunc, aJustValue, aNothingValue, aNothingValue),
        Maybe.Nothing()
    );

    // Nothing => Just => Nothing => Nothing
    t.deepEqual(
        Maybe.map3(convertFunc, aNothingValue, aJustValue, aNothingValue),
        Maybe.Nothing()
    );

    // Nothing => Nothing => Just => Nothing
    t.deepEqual(
        Maybe.map3(convertFunc, aNothingValue, aNothingValue, aJustValue),
        Maybe.Nothing()
    );

    // Nothing => Nothing => Nothing => Nothing
    t.deepEqual(
        Maybe.map3(convertFunc, aNothingValue, aNothingValue, aNothingValue),
        Maybe.Nothing()
    );

    // Just => Just => Just
    t.deepEqual(
        Maybe.map3(convertFunc, aJustValue, aSecondJustValue, aThirdJustValue),
        inner
    );
    t.deepEqual(
        Maybe.map3(convertFunc, aSecondJustValue, aThirdJustValue, aJustValue),
        inner
    );
});

test('andThen', (t) => {
    const convertFunc = (value: string) => {
        return Maybe.Just(value.length);
    };

    // Nothing => Nothing
    t.deepEqual(Maybe.andThen(convertFunc, aNothingValue), Maybe.Nothing());

    // Just => Just
    t.deepEqual(
        Maybe.andThen(convertFunc, aJustValue),
        Maybe.Just(aRealValue.length)
    );
});
