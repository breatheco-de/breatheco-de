/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLScalarType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarLiteralParser,
} from './graphql';
import { TypeMapper } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { TypeAsString } from './TypeMapper';
import { Extensions } from './utils/definitions';

export type ComposeScalarTypeConfig = GraphQLScalarTypeConfig<any, any> & {
  extensions?: Extensions;
};

export type ScalarTypeComposeDefinition =
  | TypeAsString
  | ComposeScalarTypeConfig
  | GraphQLScalarType;

export type GraphQLScalarTypeExtended = GraphQLScalarType & {
  _gqcExtensions?: Extensions;
};

export class ScalarTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;

  protected gqType: GraphQLScalarTypeExtended;

  public constructor(
    gqType: GraphQLScalarType,
    schemaComposer: SchemaComposer<TContext>,
  );

  public static create<TCtx = any>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>,
  ): ScalarTypeComposer<TCtx>;

  public static createTemp<TCtx = any>(
    typeDef: ScalarTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>,
  ): ScalarTypeComposer<TCtx>;

  // -----------------------------------------------
  // Serialize methods
  // -----------------------------------------------

  public setSerialize(fn: GraphQLScalarSerializer<any>): void;

  public getSerialize(): GraphQLScalarSerializer<any>;

  public setParseValue(fn: GraphQLScalarValueParser<any> | void): void;

  public getParseValue(): GraphQLScalarValueParser<any>;

  public setParseLiteral(fn: GraphQLScalarLiteralParser<any> | void): void;

  public getParseLiteral(): GraphQLScalarLiteralParser<any>;

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  public getType(): GraphQLScalarType;

  public getTypePlural(): GraphQLList<GraphQLScalarType>;

  public getTypeNonNull(): GraphQLNonNull<GraphQLScalarType>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public clone(newTypeName: string): ScalarTypeComposer<TContext>;

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
}
