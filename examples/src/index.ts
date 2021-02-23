import Basics from 'ts-core';
// import Basics from 'ts-core';

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
const doubleLength = func('hello');