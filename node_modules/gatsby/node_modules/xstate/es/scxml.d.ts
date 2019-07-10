import { EventObject } from './types';
import { StateNode } from './index';
export declare function fromMachine(machine: StateNode): string;
export interface ScxmlToMachineOptions {
    evalCond: (expr: string, extState?: object) => // tslint:disable-next-line:ban-types
    ((extState: any, event: EventObject) => boolean) | Function;
    delimiter?: string;
}
export declare function toMachine(xml: string, options: ScxmlToMachineOptions): StateNode;
