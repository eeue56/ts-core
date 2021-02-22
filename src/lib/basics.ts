/* eslint-disable  @typescript-eslint/no-explicit-any */

/*
Takes a value, then passes it along the chain of functions.
Each return value is passed onwards to the next function.
*/
export function pipe<A, B>(value: A, ...functions: any[]): B {
    return functions.reduce((currentValue, func) => {
        return func(currentValue);
    }, value);
}

/*
Create a partial function from a list of functions
*/
export function compose(...functions: any[]) {
    return function (value: any) {
        return functions.reduce((currentValue, func) => {
            return func(currentValue);
        }, value);
    };
}
