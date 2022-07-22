export type Nothing = {
    kind: 'Nothing';
};

export type Just<A> = {
    kind: 'Just';
    value: A;
};

export type Maybe<A> = Just<A> | Nothing;

/*
Create a Maybe with an actual value
*/
export function Just<A>(value: A): Maybe<A> {
    return {
        kind: 'Just',
        value: value,
    };
}

/*
Create a Maybe with no value
*/
export function Nothing<A>(): Maybe<A> {
    return {
        kind: 'Nothing',
    };
}

export function isJust<A>(maybe: Maybe<A>): maybe is Just<A> {
    switch (maybe.kind) {
        case 'Just':
            return true;
        default:
            return false;
    }
}

export function isNothing<A>(maybe: Maybe<A>): maybe is Just<A> {
    switch (maybe.kind) {
        case 'Nothing':
            return true;
        default:
            return false;
    }
}

/*
If a maybe has a value, return it.
Otherwise return the provided value
*/
export function withDefault<A>(value: A, maybeValue: Maybe<A>): A {
    switch (maybeValue.kind) {
        case 'Just':
            return maybeValue.value;

        default:
            return value;
    }
}

/*
If a maybe has a value, apply a function to it and return a maybe containing the new value.
Otherwise return Nothing.
*/
export function map<A, Value>(
    func: (val: A) => Value,
    maybeValue: Maybe<A>
): Maybe<Value> {
    switch (maybeValue.kind) {
        case 'Just':
            return Just(func(maybeValue.value));

        default:
            return maybeValue;
    }
}

/*
If both maybes have a value, apply a function to them and return a maybe containing the new value.
Otherwise return Nothing.
*/
export function map2<A, B, Value>(
    func: (firstValue: A, secondValue: B) => Value,
    firstMaybeValue: Maybe<A>,
    secondMaybeValue: Maybe<B>
): Maybe<Value> {
    switch (firstMaybeValue.kind) {
        case 'Just':
            switch (secondMaybeValue.kind) {
                case 'Just':
                    return Just(
                        func(firstMaybeValue.value, secondMaybeValue.value)
                    );

                default:
                    return Nothing();
            }
        default:
            return Nothing();
    }
}

/*
If all maybes have a value, apply a function to them and return a maybe containing the new value.
Otherwise return Nothing.
*/
export function map3<A, B, C, Value>(
    func: (firstValue: A, secondValue: B, thirdValue: C) => Value,
    firstMaybeValue: Maybe<A>,
    secondMaybeValue: Maybe<B>,
    thirdMaybeValue: Maybe<C>
): Maybe<Value> {
    switch (firstMaybeValue.kind) {
        case 'Just':
            switch (secondMaybeValue.kind) {
                case 'Just':
                    switch (thirdMaybeValue.kind) {
                        case 'Just':
                            return Just(
                                func(
                                    firstMaybeValue.value,
                                    secondMaybeValue.value,
                                    thirdMaybeValue.value
                                )
                            );

                        default:
                            return Nothing();
                    }

                default:
                    return Nothing();
            }
        default:
            return Nothing();
    }
}

/*
If the maybe has a value, apply a function that turns things into a maybe to it.
Otherwise return Nothing.
*/
export function andThen<A, B>(
    func: (firstValue: A) => Maybe<B>,
    maybeValue: Maybe<A>
): Maybe<B> {
    switch (maybeValue.kind) {
        case 'Just':
            return func(maybeValue.value);

        default:
            return Nothing();
    }
}
