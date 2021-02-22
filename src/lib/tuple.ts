interface Tuple<A, B> {
    first: A;
    second: B;
}

/*
Create a new tuple
*/
export function pair<A, B>(first: A, second: B): Tuple<A, B> {
    return {
        first: first,
        second: second,
    };
}

/*
First element of tuple
*/
export function first<A, B>(tuple: Tuple<A, B>): A {
    return tuple.first;
}

/*
Second element of tuple
*/
export function second<A, B>(tuple: Tuple<A, B>): B {
    return tuple.second;
}

/*
Apply a function to the first element of a tuple and save it
*/
export function mapFirst<A, B, X>(
    func: (val: A) => X,
    tuple: Tuple<A, B>
): Tuple<X, B> {
    return {
        first: func(tuple.first),
        second: tuple.second,
    };
}

/*
Apply a function to the second element of a tuple and save it
*/
export function mapSecond<A, B, X>(
    func: (val: B) => X,
    tuple: Tuple<A, B>
): Tuple<A, X> {
    return {
        first: tuple.first,
        second: func(tuple.second),
    };
}

/*
Apply two separate functions to the first and second elements of a tuple and save it
*/
export function mapBoth<A, B, X, Y>(
    firstFunc: (val: A) => X,
    secondFunc: (val: B) => Y,
    tuple: Tuple<A, B>
): Tuple<X, Y> {
    return {
        first: firstFunc(tuple.first),
        second: secondFunc(tuple.second),
    };
}
