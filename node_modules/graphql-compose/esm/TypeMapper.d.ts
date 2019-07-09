import {
  DocumentNode,
  GraphQLArgumentConfig,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLNamedType,
  GraphQLType,
  GraphQLObjectType,
} from 'graphql';
import { SchemaComposer } from './SchemaComposer';
import {
  ComposeInputFieldConfig,
  ComposeInputFieldConfigMap,
} from './InputTypeComposer';
import {
  ObjectTypeComposer,
  ComposeArgumentConfig,
  ComposeFieldConfig,
  ComposeFieldConfigArgumentMap,
  ComposeFieldConfigMap,
} from './ObjectTypeComposer';
import {
  TypeDefinitionString,
  TypeNameString,
  TypeWrappedString,
} from './TypeMapper';
import { TypeStorage } from './TypeStorage';

export type TypeDefinitionString = string; // eg. type Name { field: Int }
export type TypeWrappedString = string; // eg. Int, Int!, [Int]
export type TypeNameString = string; // eg. Int, Float
export type TypeAsString =
  | TypeDefinitionString
  | TypeWrappedString
  | TypeNameString;
export type ComposeObjectType =
  | ObjectTypeComposer<any, any>
  | GraphQLObjectType
  | TypeDefinitionString
  | TypeAsString;

declare class TypeMapper<TContext> {
  public schemaComposer: SchemaComposer<TContext>;
  protected basicScalars: Map<string, GraphQLNamedType>;

  public constructor(schemaComposer: SchemaComposer<TContext>);

  public get(name: string): GraphQLNamedType | void;

  public set(name: string, type: GraphQLNamedType): void;

  public has(name: string): boolean;

  public getWrapped(
    str: TypeWrappedString | TypeNameString,
  ): GraphQLType | null;

  public createType(str: TypeDefinitionString): GraphQLNamedType | void;

  public parseTypesFromString(
    str: string,
  ): TypeStorage<string, GraphQLNamedType>;

  public parseTypesFromAst(
    astDocument: DocumentNode,
  ): TypeStorage<string, GraphQLNamedType>;

  public convertOutputType(composeType: ComposeObjectType): GraphQLObjectType;

  public convertOutputFieldConfig<TSource = any, TContext = any>(
    composeFC: ComposeFieldConfig<TSource, TContext>,
    fieldName?: string,
    typeName?: string,
  ): GraphQLFieldConfig<TSource, TContext>;

  public convertOutputFieldConfigMap<TSource = any, TContext = any>(
    composeFields:
      | ComposeFieldConfigMap<TSource, TContext>
      | GraphQLFieldConfigMap<TSource, TContext>,
    typeName?: string,
  ): GraphQLFieldConfigMap<TSource, TContext>;

  public convertArgConfig(
    composeAC: ComposeArgumentConfig,
    argName?: string,
    fieldName?: string,
    typeName?: string,
  ): GraphQLArgumentConfig;

  public convertArgConfigMap(
    composeArgsConfigMap: ComposeFieldConfigArgumentMap<any>,
    fieldName?: string,
    typeName?: string,
  ): GraphQLFieldConfigArgumentMap;

  public convertInputFieldConfig(
    composeIFC: ComposeInputFieldConfig,
    fieldName?: string,
    typeName?: string,
  ): GraphQLInputFieldConfig;

  public convertInputFieldConfigMap(
    composeFields: ComposeInputFieldConfigMap,
    typeName?: string,
  ): GraphQLInputFieldConfigMap;
}
