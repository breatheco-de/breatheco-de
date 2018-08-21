import { Observable } from '../Observable';
import { MonoTypeOperatorFunction, OperatorFunction } from '../../internal/types';
export declare function first<T>(predicate?: null, defaultValue?: T): MonoTypeOperatorFunction<T>;
export declare function first<T, S extends T>(predicate: (value: T, index: number, source: Observable<T>) => value is S, defaultValue?: T): OperatorFunction<T, S>;
export declare function first<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: T): MonoTypeOperatorFunction<T>;
