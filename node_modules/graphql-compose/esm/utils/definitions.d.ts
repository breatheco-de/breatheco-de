export type ObjMap<T> = { [key: string]: T };
export type Thunk<T> = (() => T) | T;
export type Extensions = { [key: string]: any };
export type MaybePromise<T> = Promise<T> | T;
