import { StateNode } from './StateNode';
import { StateValue, EntryExitStateArrays, EventType, EventObject } from './types';
export interface StateTreeOptions {
    resolved?: boolean;
}
export declare class StateTree {
    stateNode: StateNode;
    stateValue: StateValue | undefined;
    parent?: StateTree | undefined;
    nodes: Record<string, StateTree>;
    isResolved: boolean;
    constructor(stateNode: StateNode, stateValue: StateValue | undefined, options?: StateTreeOptions);
    readonly done: boolean;
    getDoneData<TContext>(context: TContext, event: EventObject): any;
    readonly atomicNodes: StateNode[];
    getDoneEvents(entryStateNodes?: Set<StateNode>): EventObject[];
    readonly resolved: StateTree;
    readonly paths: string[][];
    readonly absolute: StateTree;
    readonly nextEvents: EventType[];
    clone(): StateTree;
    combine(tree: StateTree): StateTree;
    readonly value: StateValue;
    matches(parentValue: StateValue): boolean;
    getEntryExitStates(prevTree: StateTree, externalNodes?: Set<StateNode<any>>): EntryExitStateArrays<any>;
    getEntryStates(): StateNode[];
    getExitStates(): StateNode[];
}
