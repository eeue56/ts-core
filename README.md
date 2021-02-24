# ts-core

Core library for TypeScript inspired by [Elm](https://package.elm-lang.org/packages/elm/core/latest/). It contains only some of the more relevant data structures and functions.

# Installation

```
npm install --save-dev @eeue56/ts-core
```

# Testing

```
npm run build
npm run test
```

# Usage

## Basics

See [src](src/lib/basics.ts)

Some useful tools for functional programming - piping, and composing. Both of these can be used to chain functions.

```javascript
import { Basics } from '@eeue56/ts-core';

// take an argument then pipe it to a variable number of functions
// for example this is 10
const doubleLength = Basics.pipe(
    'hello',
    (str: string) => {
        return str.length;
    },
    (length: number) => {
        return length + length;
    }
);

// a function that turns composes each function given as an argument
const func = Basics.compose(
    (str: string) => {
        return str.length;
    },
    (length: number) => {
        return length + length;
    }
);

// this is 10
const anotherDoubleLength = func('hello');
console.log('Expecting 10', anotherDoubleLength);
```

## Debug

See [src](src/lib/debug.ts)

Not particularly useful in JS as impurity doesn't matter, but sometimes it's nice to log what you're returning.

```javascript
import { Debug } from '@eeue56/ts-core';

// returns the same object as was logged
function getSomeObject(someObject){
    return Debug.log("My name is", someObject);
}
```

## Maybe

See [src](src/lib/maybe.ts)

A Maybe/Optional type. Useful for when dealing with a value that can either be a value, or nothing.


```javascript
import { Maybe } from '@eeue56/ts-core';

const someNothingMaybe = Maybe.Nothing();
const aValueOfZeroFromTheMaybe = Maybe.withDefault(0, someNothingMaybe);

const identity = (x) => x;
const someJustMaybe = Maybe.Just(10);
const newMaybe = Maybe.map(identity, someJustMaybe);
const aValueOfTenFromTheMaybe = Maybe.withDefault(0, someJustMaybe);

```

## Result

See [src](src/lib/result.ts)

A Result type. Useful for when dealing with a value that can either be a value, or an error.


```javascript
import { Result } from '@eeue56/ts-core';

const someResult = Result.Ok(10);
const double = (x) => x + x;
const newResult = Result.map(double, someResult);
const someResultValue = Result.withDefault(0, newResult);

const someError = Result.Err("Failed to parse on line 10");
const strLength = (x) => x.length;
const newError = Result.mapError(strLength, someError);

const someStringResult = Result.Ok("Hello");
const hello = Result.either(someStringResult);
const failedToParseOnLine10 = Result.either(someError);
```

## Tuple

See [src](src/lib/tuple.ts)

A Tuple type of size 2. Useful for combining a pair of values. Generally named objects are more useful than Tuples, however.


```javascript
import { Tuple } from '@eeue56/ts-core';

const someTuple = Tuple.pair(10, "okay");
const someNewTuple = Tuple.mapFirst(double, someTuple);
const someOtherTuple = Tuple.mapSecond(strLength, someTuple);
const someFirstValue = Tuple.first(someOtherTuple);
const someSecondValue = Tuple.second(someOtherTuple);
```