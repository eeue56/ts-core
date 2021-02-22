/*
Takes a message and a value - logs the message and value, then
return the value
*/
export function log<A>(message: string, value: A): A {
    console.log(message, value);
    return value;
}
