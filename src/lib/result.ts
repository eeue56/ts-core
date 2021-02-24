import * as Maybe from './maybe';

export type Err<Error> = {
    kind: 'err';
    error: Error;
};

export type Ok<Value> = {
    kind: 'ok';
    value: Value;
};

export type Result<Error, Value> = Ok<Value> | Err<Error>;

/*
Creates an Ok value
*/
export function Ok<Error, Value>(value: Value): Result<Error, Value> {
    return {
        kind: 'ok',
        value: value,
    };
}

/*
Creates an Err value
*/
export function Err<Error, Value>(error: Error): Result<Error, Value> {
    return {
        kind: 'err',
        error: error,
    };
}

/*
If result is Ok, return the value inside it.
Otherwise return the default value provided;
*/
export function withDefault<Error, Value>(
    value: Value,
    result: Result<Error, Value>
): Value {
    switch (result.kind) {
        case 'ok':
            return result.value;

        default:
            return value;
    }
}

/*
When both error and ok are the same value,
return the inner value of whichever is contained.
*/
export function either<A>(result: Result<A, A>) {
    switch (result.kind) {
        case 'ok':
            return result.value;
        default:
            return result.error;
    }
}

/*
Turns Ok into Just, Err into Nothing
*/
export function toMaybe<Error, Value>(
    result: Result<Error, Value>
): Maybe.Maybe<Value> {
    switch (result.kind) {
        case 'ok':
            return Maybe.Just(result.value);
        default:
            return Maybe.Nothing();
    }
}

/*
Turns Just into Ok, Nothing into Err with the default value provided.
*/
export function fromMaybe<Error, Value>(
    error: Error,
    maybe: Maybe.Maybe<Value>
): Result<Error, Value> {
    switch (maybe.kind) {
        case 'just':
            return Ok(maybe.value);
        default:
            return Err(error);
    }
}

/*
If result is Ok, apply a function to it and return a Ok containing the new value.
Otherwise return Err.
*/
export function map<Error, A, Value>(
    func: (val: A) => Value,
    result: Result<Error, A>
): Result<Error, Value> {
    switch (result.kind) {
        case 'ok':
            return Ok(func(result.value));

        default:
            return result;
    }
}

/*
If all results are Ok, apply a function to them and return a Ok containing the new value.
Otherwise return the first Err encountered.
*/
export function map2<Error, A, B, Value>(
    func: (firstResult: A, secondResult: B) => Value,
    firstResult: Result<Error, A>,
    secondResult: Result<Error, B>
): Result<Error, Value> {
    switch (firstResult.kind) {
        case 'ok':
            switch (secondResult.kind) {
                case 'ok':
                    return Ok(func(firstResult.value, secondResult.value));

                default:
                    return secondResult;
            }
        default:
            return firstResult;
    }
}

/*
If all results are Ok, apply a function to them and return a Ok containing the new value.
Otherwise return the first Err encountered.
*/
export function map3<Error, A, B, C, Value>(
    func: (firstResult: A, secondResult: B, thirdResult: C) => Value,
    firstResult: Result<Error, A>,
    secondResult: Result<Error, B>,
    thirdResult: Result<Error, C>
): Result<Error, Value> {
    switch (firstResult.kind) {
        case 'ok':
            switch (secondResult.kind) {
                case 'ok':
                    switch (thirdResult.kind) {
                        case 'ok':
                            return Ok(
                                func(
                                    firstResult.value,
                                    secondResult.value,
                                    thirdResult.value
                                )
                            );

                        default:
                            return thirdResult;
                    }

                default:
                    return secondResult;
            }
        default:
            return firstResult;
    }
}

/*
If result is Err, apply a function to it and return a Err containing the new value.
Otherwise return Ok.
*/
export function mapError<ErrorA, ErrorB, Value>(
    func: (val: ErrorA) => ErrorB,
    result: Result<ErrorA, Value>
): Result<ErrorB, Value> {
    switch (result.kind) {
        case 'err':
            return Err(func(result.error));

        default:
            return result;
    }
}

/*
If the result is Ok, apply a function that turns things into a result to it.
Otherwise return Err.
*/
export function andThen<Error, A, B>(
    func: (value: A) => Result<Error, B>,
    result: Result<Error, A>
): Result<Error, B> {
    switch (result.kind) {
        case 'ok':
            return func(result.value);

        default:
            return result;
    }
}
