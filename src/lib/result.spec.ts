import test from 'ava';

import * as Maybe from './maybe';
import * as Result from './result';

const anRealErrorValue = 'Something went wrong';
const anErrorValue = Result.Err<string, string>(anRealErrorValue);

const aRealValue = 'just something';
const aOkValue = Result.Ok<string, string>(aRealValue);

const aSecondRealValue = 'just something else';
const aSecondOkValue = Result.Ok(aSecondRealValue);

const aThirdRealValue = 'another just something else';
const aThirdOkValue = Result.Ok(aThirdRealValue);

test('withDefault', (t) => {
    const defaultValue = 'a default';
    t.deepEqual(Result.withDefault(defaultValue, anErrorValue), defaultValue);

    t.deepEqual(Result.withDefault(defaultValue, aOkValue), aRealValue);
});

test('toMaybe', (t) => {
    t.deepEqual(Result.toMaybe(anErrorValue), Maybe.Nothing());

    t.deepEqual(Result.toMaybe(aOkValue), Maybe.Just(aRealValue));
});

test('fromMaybe', (t) => {
    t.deepEqual(
        Result.fromMaybe('default error', Maybe.Nothing()),
        Result.Err('default error')
    );

    t.deepEqual(
        Result.fromMaybe('default error', Maybe.Just(aRealValue)),
        aOkValue
    );
});

test('map', (t) => {
    const innerValue = aRealValue.length;

    const convertFunc = (str: string): number => {
        return str.length;
    };

    const inner = Result.Ok<string, number>(innerValue);

    // Err => Err
    t.deepEqual(
        Result.map(convertFunc, anErrorValue),
        Result.Err<string, number>(anRealErrorValue)
    );

    // Ok => Ok
    t.deepEqual(Result.map(convertFunc, aOkValue), inner);
});

test('map2', (t) => {
    const convertFunc = (first: string, second: string): number => {
        return first.length + second.length;
    };

    const inner = Result.Ok(aRealValue.length + aSecondRealValue.length);

    // Err => Ok => Err
    t.deepEqual(
        Result.map2(convertFunc, anErrorValue, aOkValue),
        Result.Err(anRealErrorValue)
    );

    // Ok => Err => Err
    t.deepEqual(
        Result.map2(convertFunc, aOkValue, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Err => Err => Err
    t.deepEqual(
        Result.map2(convertFunc, anErrorValue, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Ok => Ok => Ok
    t.deepEqual(Result.map2(convertFunc, aOkValue, aSecondOkValue), inner);
    t.deepEqual(Result.map2(convertFunc, aSecondOkValue, aOkValue), inner);
});

test('map3', (t) => {
    const convertFunc = (
        first: string,
        second: string,
        third: string
    ): number => {
        return first.length + second.length + third.length;
    };

    const inner = Result.Ok(
        aRealValue.length + aSecondRealValue.length + aThirdRealValue.length
    );

    // Ok => Err => Err => Err
    t.deepEqual(
        Result.map3(convertFunc, aOkValue, anErrorValue, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Err => Ok => Err => Err
    t.deepEqual(
        Result.map3(convertFunc, anErrorValue, aOkValue, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Err => Err => Ok => Err
    t.deepEqual(
        Result.map3(convertFunc, anErrorValue, anErrorValue, aOkValue),
        Result.Err(anRealErrorValue)
    );

    // Err => Err => Err => Err
    t.deepEqual(
        Result.map3(convertFunc, anErrorValue, anErrorValue, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Ok => Ok => Ok
    t.deepEqual(
        Result.map3(convertFunc, aOkValue, aSecondOkValue, aThirdOkValue),
        inner
    );
    t.deepEqual(
        Result.map3(convertFunc, aSecondOkValue, aThirdOkValue, aOkValue),
        inner
    );
});

test('mapError', (t) => {
    const innerValue = anRealErrorValue.length;

    const convertFunc = (str: string): number => {
        return str.length;
    };

    const inner = Result.Err<number, string>(innerValue);

    // Err => Err
    t.deepEqual(Result.mapError(convertFunc, anErrorValue), inner);

    // Ok => Ok
    t.deepEqual(Result.mapError(convertFunc, aOkValue), Result.Ok(aRealValue));
});

test('andThen', (t) => {
    const convertFunc = (value: string) => {
        return Result.Ok(value.length);
    };

    // Err => Err
    t.deepEqual(
        Result.andThen(convertFunc, anErrorValue),
        Result.Err(anRealErrorValue)
    );

    // Ok => Ok
    t.deepEqual(
        Result.andThen(convertFunc, aOkValue),
        Result.Ok(aRealValue.length)
    );
});
