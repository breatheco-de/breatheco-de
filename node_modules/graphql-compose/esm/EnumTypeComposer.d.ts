/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLEnumType, GraphQLList, GraphQLNonNull } from './graphql';
import {
  GraphQLEnumValueConfig,
  GraphQLEnumTypeConfig,
  GraphQLEnumValueConfigMap,
} from './graphql';
import { TypeAsString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { Extensions } from './utils/definitions';

export type ComposeEnumTypeConfig = GraphQLEnumTypeConfig & {
  extensions?: Extensions;
};

export type EnumTypeComposeDefinition =
  | TypeAsString
  | ComposeEnumTypeConfig
  | GraphQLEnumType;

export type GraphQLEnumTypeExtended = GraphQLEnumType & {
  _gqcExtensions?: Extensions;
};

export class EnumTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected gqType: GraphQLEnumTypeExtended;

  public constructor(
    gqType: GraphQLEnumType,
    schemaComposer: SchemaComposer<TContext>,
  );

  public static create<TCtx = any>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>,
  ): EnumTypeComposer<TCtx>;

  public static createTemp<TCtx = any>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>,
  ): EnumTypeComposer<TCtx>;

  // -----------------------------------------------
  // Value methods
  // -----------------------------------------------

  public hasField(name: string): boolean;

  public getFields(): GraphQLEnumValueConfigMap;

  public getField(name: string): GraphQLEnumValueConfig;

  public getFieldNames(): string[];

  public setFields(values: GraphQLEnumValueConfigMap): this;

  public setField(name: string, valueConfig: GraphQLEnumValueConfig): this;

  public addFields(newValues: GraphQLEnumValueConfigMap): this;

  public removeField(nameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField(
    name: string,
    partialValueConfig: Partial<GraphQLEnumValueConfig>,
  ): this;

  public deprecateFields(
    fields: { [fieldName: string]: string } | string[] | string,
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
  // Type methods
  // -----------------------------------------------

  public getType(): GraphQLEnumType;

  public getTypePlural(): GraphQLList<GraphQLEnumType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLEnumType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): EnumTypeComposer<TContext>;
}
