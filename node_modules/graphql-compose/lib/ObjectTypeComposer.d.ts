import {
  FieldDefinitionNode,
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLFieldResolver,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInterfaceType,
  GraphQLIsTypeOfFn,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLResolveInfo,
  InputValueDefinitionNode,
} from 'graphql';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { InputTypeComposer } from './InputTypeComposer';
import { InterfaceTypeComposer } from './InterfaceTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import {
  Resolver,
  ResolverNextRpCb,
  ResolverOpts,
  ResolverWrapCb,
  ResolverMiddleware,
} from './Resolver';
import { SchemaComposer } from './SchemaComposer';
import { TypeAsString } from './TypeMapper';
import { ObjMap, Thunk, Extensions } from './utils/definitions';
import { ProjectionType } from './utils/projection';

export type GetRecordIdFn<TSource, TContext> = (
  source: TSource,
  args: any,
  context: TContext,
) => string;

export type GraphQLObjectTypeExtended<TSource, TContext> = GraphQLObjectType & {
  _gqcInputTypeComposer?: InputTypeComposer<TContext>;
  _gqcResolvers?: Map<string, Resolver<TSource, TContext>>;
  _gqcGetRecordIdFn?: GetRecordIdFn<TSource, TContext>;
  _gqcRelations?: RelationThunkMap<TSource, TContext>;
  _gqcFields?: ComposeFieldConfigMap<TSource, TContext>;
  _gqcInterfaces?: Array<
    GraphQLInterfaceType | InterfaceTypeComposer<any, TContext>
  >;
  _gqcExtensions?: Extensions;
  description: string | null;
};

export type ComposeObjectTypeConfig<TSource, TContext> = {
  name: string;
  interfaces?: Thunk<GraphQLInterfaceType[] | null>;
  fields?: Thunk<ComposeFieldConfigMap<TSource, TContext>>;
  isTypeOf?: GraphQLIsTypeOfFn<TSource, TContext> | null;
  description?: string | null;
  isIntrospection?: boolean;
  extensions?: Extensions;
};

// extended GraphQLFieldConfigMap
export type ComposeFieldConfigMap<TSource, TContext> = ObjMap<
  ComposeFieldConfig<TSource, TContext>
>;

export type ComposeFieldConfig<TSource, TContext, TArgs = ArgsMap> =
  | ComposeFieldConfigAsObject<TSource, TContext, TArgs>
  | ComposeOutputType<any /* TReturn */, TContext>
  | Thunk<
      | ComposeFieldConfigAsObject<TSource, TContext, TArgs>
      | ComposeOutputType<any /* TReturn */, TContext>
    >;

// extended GraphQLFieldConfig
export type GraphqlFieldConfigExtended<TSource, TContext> = GraphQLFieldConfig<
  TSource,
  TContext
> & { projection?: any };

export type ComposeFieldConfigAsObject<TSource, TContext, TArgs = ArgsMap> = {
  type:
    | Thunk<ComposeOutputType<any /* TReturn */, TContext>>
    | GraphQLOutputType;
  args?: ComposeFieldConfigArgumentMap<TArgs>;
  resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
  subscribe?: GraphQLFieldResolver<TSource, TContext>;
  deprecationReason?: string | null;
  description?: string | null;
  astNode?: FieldDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
} & { $call?: void };

// Output type should not have `TSource`. It should not affect on main Type source!
// extended GraphQLOutputType
export type ComposeOutputType<TReturn, TContext> =
  | GraphQLOutputType
  | ObjectTypeComposer<TReturn, TContext>
  | EnumTypeComposer<TContext>
  | ScalarTypeComposer<TContext>
  | TypeAsString
  | Resolver<any, TContext, any>
  | InterfaceTypeComposer<TReturn, TContext>
  | UnionTypeComposer<TReturn, TContext>
  | Array<
      | GraphQLOutputType
      | ObjectTypeComposer<TReturn, TContext>
      | EnumTypeComposer<TContext>
      | ScalarTypeComposer<TContext>
      | TypeAsString
      | Resolver<any, TContext, any>
      | InterfaceTypeComposer<TReturn, TContext>
      | UnionTypeComposer<TReturn, TContext>
    >;

export function isComposeOutputType(type: any): boolean;

// Compose Args -----------------------------
export type ArgsMap = { [argName: string]: any };
export type ComposeArgumentType =
  | GraphQLInputType
  | TypeAsString
  | InputTypeComposer<any>
  | EnumTypeComposer<any>
  | ScalarTypeComposer<any>
  | Array<
      | GraphQLInputType
      | TypeAsString
      | InputTypeComposer<any>
      | EnumTypeComposer<any>
      | ScalarTypeComposer<any>
    >;

export type ComposeArgumentConfigAsObject = {
  type: Thunk<ComposeArgumentType> | GraphQLInputType;
  defaultValue?: any;
  description?: string | null;
  astNode?: InputValueDefinitionNode | null;
} & { $call?: void };

export type ComposeArgumentConfig =
  | ComposeArgumentConfigAsObject
  | ComposeArgumentType
  | (() => ComposeArgumentConfigAsObject | ComposeArgumentType);

export type ComposeFieldConfigArgumentMap<TArgs = ArgsMap> = {
  [argName in keyof TArgs]: ComposeArgumentConfig
};

// RELATION -----------------------------
export type RelationThunkMap<TSource, TContext> = {
  [fieldName: string]: Thunk<RelationOpts<TSource, TContext, ArgsMap>>;
};

export type RelationOpts<TRelationSource, TSource, TContext, TArgs = ArgsMap> =
  | RelationOptsWithResolver<TRelationSource, TSource, TContext, TArgs>
  | RelationOptsWithFieldConfig<TSource, TContext, TArgs>;

export type RelationOptsWithResolver<
  TRelationSource,
  TSource,
  TContext,
  TArgs = ArgsMap
> = {
  resolver: Thunk<Resolver<TRelationSource, TContext, TArgs>>;
  prepareArgs?: RelationArgsMapper<TSource, TContext, TArgs>;
  projection?: Partial<ProjectionType>;
  description?: string | null;
  deprecationReason?: string | null;
  catchErrors?: boolean;
};

export type RelationOptsWithFieldConfig<
  TSource,
  TContext,
  TArgs = ArgsMap
> = ComposeFieldConfigAsObject<TSource, TContext, TArgs> & {
  resolve: GraphQLFieldResolver<TSource, TContext, TArgs>;
};

export type RelationArgsMapperFn<TSource, TContext, TArgs = ArgsMap> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => any;

export type RelationArgsMapper<TSource, TContext, TArgs = ArgsMap> = {
  [argName: string]:
    | { [key: string]: any }
    | RelationArgsMapperFn<TSource, TContext, TArgs>
    | null
    | void
    | string
    | number
    | any[];
};

export type ObjectTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeObjectTypeConfig<TSource, TContext>
  | GraphQLObjectType;

export class ObjectTypeComposer<TSource = any, TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;

  protected gqType: GraphQLObjectTypeExtended<TSource, TContext>;

  public constructor(
    gqType: GraphQLObjectType,
    schemaComposer: SchemaComposer<TContext>,
  );

  public static create<TSrc = any, TCtx = any>(
    typeDef: ObjectTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>,
  ): ObjectTypeComposer<TSrc, TCtx>;

  public static createTemp<TSrc = any, TCtx = any>(
    typeDef: ObjectTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>,
  ): ObjectTypeComposer<TSrc, TCtx>;

  // -----------------------------------------------
  // Field methods
  // -----------------------------------------------

  public getFields(): ComposeFieldConfigMap<TSource, TContext>;

  public getFieldNames(): string[];

  public setFields(fields: ComposeFieldConfigMap<TSource, TContext>): this;

  public hasField(fieldName: string): boolean;

  public setField<TArgs = ArgsMap>(
    fieldName: string,
    fieldConfig: ComposeFieldConfig<TSource, TContext, TArgs>,
  ): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newFields: ComposeFieldConfigMap<TSource, TContext>): this;

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  public addNestedFields(
    newFields: ComposeFieldConfigMap<TSource, TContext>,
  ): this;

  public getField<TArgs = ArgsMap>(
    fieldName: string,
  ): ComposeFieldConfig<TSource, TContext, TArgs>;

  public removeField(fieldNameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public extendField<TArgs = ArgsMap>(
    fieldName: string,
    partialFieldConfig: Partial<ComposeFieldConfig<TSource, TContext, TArgs>>,
  ): this;

  public reorderFields(names: string[]): this;

  public isFieldNonNull(fieldName: string): boolean;

  public getFieldConfig(
    fieldName: string,
  ): GraphQLFieldConfig<TSource, TContext>;

  public getFieldType(fieldName: string): GraphQLOutputType;

  public getFieldTC(fieldName: string): ObjectTypeComposer<TSource, TContext>;

  public makeFieldNonNull(fieldNameOrArray: string | string[]): this;

  public makeFieldNullable(fieldNameOrArray: string | string[]): this;

  public deprecateFields(
    fields: { [fieldName: string]: string } | string[] | string,
  ): this;

  public getFieldArgs(fieldName: string): GraphQLFieldConfigArgumentMap;

  public hasFieldArg(fieldName: string, argName: string): boolean;

  public getFieldArg(fieldName: string, argName: string): GraphQLArgumentConfig;

  public getFieldArgType(fieldName: string, argName: string): GraphQLInputType;

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  public getType(): GraphQLObjectType;

  public getTypePlural(): GraphQLList<GraphQLObjectType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLObjectType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone<TCloneSource = TSource>(
    newTypeName: string,
  ): ObjectTypeComposer<TCloneSource, TContext>;

  public getIsTypeOf(): GraphQLIsTypeOfFn<TSource, TContext> | null | void;

  public setIsTypeOf(fn: GraphQLIsTypeOfFn<any, any> | null | void): this;

  // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------

  public getInputType(): GraphQLInputObjectType;

  public hasInputTypeComposer(): boolean;

  public setInputTypeComposer(itc: InputTypeComposer<TContext>): this;

  public getInputTypeComposer(): InputTypeComposer<TContext>;

  public getITC(): InputTypeComposer<TContext>;

  public removeInputTypeComposer(): this;

  // -----------------------------------------------
  // Resolver methods
  // -----------------------------------------------

  public getResolvers(): Map<string, Resolver<any, TContext, any>>;

  public hasResolver(name: string): boolean;

  public getResolver<TResolverSource = any, TArgs = ArgsMap>(
    name: string,
    middlewares?: Array<ResolverMiddleware<TResolverSource, TContext, TArgs>>,
  ): Resolver<TResolverSource, TContext, TArgs>;

  public setResolver<TResolverSource = any, TArgs = ArgsMap>(
    name: string,
    resolver: Resolver<TResolverSource, TContext, TArgs>,
  ): this;

  public addResolver<TResolverSource = any, TArgs = ArgsMap>(
    resolver:
      | Resolver<TResolverSource, TContext, TArgs>
      | ResolverOpts<TResolverSource, TContext, TArgs>,
  ): this;

  public removeResolver(resolverName: string): this;

  public wrapResolver<TResolverSource = any, TArgs = ArgsMap>(
    resolverName: string,
    cbResolver: ResolverWrapCb<TResolverSource, TSource, TContext, TArgs>,
  ): this;

  public wrapResolverAs<TResolverSource = any, TArgs = ArgsMap>(
    resolverName: string,
    fromResolverName: string,
    cbResolver: ResolverWrapCb<TResolverSource, TSource, TContext, TArgs>,
  ): this;

  public wrapResolverResolve<TResolverSource = any, TArgs = ArgsMap>(
    resolverName: string,
    cbNextRp: ResolverNextRpCb<TResolverSource, TContext, TArgs>,
  ): this;

  // -----------------------------------------------
  // Interface methods
  // -----------------------------------------------

  public getInterfaces(): Array<
    InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType
  >;

  public setInterfaces(
    interfaces: Array<
      InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType
    >,
  ): this;

  public hasInterface(
    iface: string | InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType,
  ): boolean;

  public addInterface(
    interfaceObj: InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType,
  ): this;

  public removeInterface(
    interfaceObj: InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType,
  ): this;

  // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------

  public getExtensions(): Extensions;

  public setExtensions(extensions: Extensions): this;

  public extendExtensions(extensions: Extensions): this;

  public clearExtensions(): this;

  public getExtension(extensionName: string): any;

  public hasExtension(extensionName: string): boolean;

  public setExtension(extensionName: string, value: any): this;

  public removeExtension(extensionName: string): this;

  public getFieldExtensions(fieldName: string): Extensions;

  public setFieldExtensions(fieldName: string, extensions: Extensions): this;

  public extendFieldExtensions(fieldName: string, extensions: Extensions): this;

  public clearFieldExtensions(fieldName: string): this;

  public getFieldExtension(fieldName: string, extensionName: string): any;

  public hasFieldExtension(fieldName: string, extensionName: string): boolean;

  public setFieldExtension(
    fieldName: string,
    extensionName: string,
    value: any,
  ): this;

  public removeFieldExtension(fieldName: string, extensionName: string): this;

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  public addRelation<TRelationSource = any, TArgs = ArgsMap>(
    fieldName: string,
    relationOpts: RelationOpts<TRelationSource, TSource, TContext, TArgs>,
  ): this;

  public getRelations(): RelationThunkMap<any, TContext>;

  public setRecordIdFn(fn: GetRecordIdFn<TSource, TContext>): this;

  public hasRecordIdFn(): boolean;

  public getRecordIdFn(): GetRecordIdFn<TSource, TContext>;

  /**
   * Get function that returns record id, from provided object.
   */
  public getRecordId(
    source: TSource,
    args?: ArgsMap,
    context?: TContext,
  ): string | number;

  public get(path: string | string[]): any;
}
