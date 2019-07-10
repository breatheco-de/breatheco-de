import {
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from 'graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import {
  ComposeFieldConfig,
  ComposeFieldConfigMap,
  ObjectTypeComposer,
} from './ObjectTypeComposer';
import { TypeAsString, ComposeObjectType } from './TypeMapper';
import { Thunk, Extensions, MaybePromise } from './utils/definitions';

export type GraphQLUnionTypeExtended<TSource, TContext> = GraphQLUnionType & {
  _gqcTypeMap: Map<string, ComposeObjectType>;
  _gqcTypeResolvers?: UnionTypeResolversMap<TSource, TContext>;
  _gqcExtensions?: Extensions;
};

export type UnionTypeResolversMap<TSource, TContext> = Map<
  ComposeObjectType,
  UnionTypeResolverCheckFn<TSource, TContext>
>;

export type UnionTypeResolverCheckFn<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo,
) => MaybePromise<boolean | null | void>;

export type ComposeUnionTypeConfig<TSource, TContext> = {
  name: string;
  types?: Thunk<ComposeObjectType[]>;
  resolveType?: GraphQLTypeResolver<TSource, TContext> | null;
  description?: string | null;
  extensions?: Extensions;
};

export type UnionTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeUnionTypeConfig<TSource, TContext>;

export class UnionTypeComposer<TSource = any, TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;

  protected gqType: GraphQLUnionTypeExtended<TSource, TContext>;

  public constructor(
    gqType: GraphQLUnionType,
    schemaComposer: SchemaComposer<TContext>,
  );

  public static create<TSrc = any, TCtx = any>(
    typeDef: UnionTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>,
  ): UnionTypeComposer<TSrc, TCtx>;

  public static createTemp<TSrc = any, TCtx = any>(
    typeDef: UnionTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>,
  ): UnionTypeComposer<TSrc, TCtx>;

  // -----------------------------------------------
  // Union Types methods
  // -----------------------------------------------

  public hasType(
    name: string | GraphQLObjectType | ObjectTypeComposer<any, TContext>,
  ): boolean;

  public getTypes(): ComposeObjectType[];

  public getTypeNames(): string[];

  public clearTypes(): UnionTypeComposer<TSource, TContext>;

  public setTypes(types: ComposeObjectType[]): this;

  public addType(type: ComposeObjectType): this;

  public removeType(nameOrArray: string | string[]): this;

  public removeOtherTypes(nameOrArray: string | string[]): this;

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  public getType(): GraphQLUnionType;

  public getTypePlural(): GraphQLList<GraphQLUnionType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLUnionType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): UnionTypeComposer<TSource, TContext>;

  // -----------------------------------------------
  // ResolveType methods
  // -----------------------------------------------

  public getResolveType(): GraphQLTypeResolver<TSource, TContext> | null | void;

  public setResolveType(
    fn: GraphQLTypeResolver<TSource, TContext> | null | void,
  ): this;

  public hasTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
  ): boolean;

  public getTypeResolvers(): UnionTypeResolversMap<TSource, TContext>;

  public getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
  ): UnionTypeResolverCheckFn<any, TContext>;

  public getTypeResolverNames(): string[];

  public getTypeResolverTypes(): GraphQLObjectType[];

  public setTypeResolvers(
    typeResolversMap: UnionTypeResolversMap<TSource, TContext>,
  ): this;

  public addTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
    checkFn: UnionTypeResolverCheckFn<TSource, TContext>,
  ): this;

  public removeTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
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

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------
}
