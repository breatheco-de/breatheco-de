/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  getNamedType,
  GraphQLInterfaceType,
  isType,
} from './graphql';
import type {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLOutputType,
  GraphQLInputType,
  GraphQLFieldConfigArgumentMap,
  GraphQLArgumentConfig,
  GraphQLIsTypeOfFn,
  GraphQLResolveInfo,
  GraphQLFieldResolver,
  FieldDefinitionNode,
  InputValueDefinitionNode,
} from './graphql';
import { ScalarTypeComposer } from './ScalarTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import type { InputTypeComposer } from './InputTypeComposer';
import type { TypeAsString } from './TypeMapper';
import { InterfaceTypeComposer } from './InterfaceTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import {
  Resolver,
  type ResolverOpts,
  type ResolverNextRpCb,
  type ResolverWrapCb,
  type ResolverMiddleware,
} from './Resolver';
import { SchemaComposer } from './SchemaComposer';
import { resolveMaybeThunk, upperFirst, inspect } from './utils/misc';
import { isObject, isFunction, isString } from './utils/is';
import { resolveOutputConfigMapAsThunk, resolveOutputConfigAsThunk } from './utils/configAsThunk';
import { defineFieldMap, defineFieldMapToConfig } from './utils/configToDefine';
import { toInputObjectType } from './utils/toInputObjectType';
import { typeByPath } from './utils/typeByPath';
import { getComposeTypeName } from './utils/typeHelpers';
import type { ProjectionType } from './utils/projection';
import type { ObjMap, Thunk, Extensions } from './utils/definitions';
import { graphqlVersion } from './utils/graphqlVersion';

export type GetRecordIdFn<TSource, TContext> = (
  source: TSource,
  args?: mixed,
  context?: TContext
) => string;

export type GraphQLObjectTypeExtended<TSource, TContext> = GraphQLObjectType & {
  _gqcInputTypeComposer?: InputTypeComposer<TContext>,
  _gqcResolvers?: Map<string, Resolver<TSource, TContext>>,
  _gqcGetRecordIdFn?: GetRecordIdFn<TSource, TContext>,
  _gqcRelations?: RelationThunkMap<TSource, TContext>,
  _gqcFields?: ComposeFieldConfigMap<TSource, TContext>,
  _gqcInterfaces?: Array<GraphQLInterfaceType | InterfaceTypeComposer<any, TContext>>,
  _gqcExtensions?: Extensions,
  description?: ?string,
};

export type ComposeObjectTypeConfig<TSource, TContext> = {
  +name: string,
  +interfaces?: Thunk<GraphQLInterfaceType[] | null>,
  +fields?: Thunk<ComposeFieldConfigMap<TSource, TContext>>,
  +isTypeOf?: ?GraphQLIsTypeOfFn<TSource, TContext>,
  +description?: string | null,
  +isIntrospection?: boolean,
  +extensions?: Extensions,
};

// extended GraphQLFieldConfigMap
export type ComposeFieldConfigMap<TSource, TContext> = ObjMap<
  ComposeFieldConfig<TSource, TContext>
>;

export type ComposeFieldConfig<TSource, TContext, TArgs = ArgsMap> =
  | ComposeFieldConfigAsObject<TSource, TContext, TArgs>
  | ComposeOutputType<any /* TReturn */, TContext>
  | (() =>
      | ComposeFieldConfigAsObject<TSource, TContext, TArgs>
      | ComposeOutputType<any /* TReturn */, TContext>);

// extended GraphQLFieldConfig
export type GraphqlFieldConfigExtended<TSource, TContext> = GraphQLFieldConfig<
  TSource,
  TContext
> & { projection?: any };

export type ComposeFieldConfigAsObject<TSource, TContext, TArgs = ArgsMap> = {
  +type: Thunk<ComposeOutputType<any /* TReturn */, TContext>> | GraphQLOutputType,
  +args?: ComposeFieldConfigArgumentMap<TArgs>,
  +resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>,
  +subscribe?: GraphQLFieldResolver<TSource, TContext>,
  +deprecationReason?: ?string,
  +description?: ?string,
  +astNode?: FieldDefinitionNode | null,
  +extensions?: Extensions,
  +[key: string]: any,
};

// Output type should not have `TSource`. It should not affect on main Type source!
// extended GraphQLOutputType
export type ComposeOutputType<TReturn, TContext> =
  | GraphQLOutputType
  | ObjectTypeComposer<TReturn, TContext>
  | EnumTypeComposer<TContext>
  | ScalarTypeComposer<TContext>
  | TypeAsString
  | Resolver<TReturn, TContext, any>
  | InterfaceTypeComposer<TReturn, TContext>
  | UnionTypeComposer<TReturn, TContext>
  | $ReadOnlyArray<ComposeOutputType<TReturn, TContext>>;

export function isComposeOutputType(type: mixed): boolean %checks {
  return (
    isType(type) ||
    (Array.isArray(type) && isComposeOutputType(type[0])) ||
    type instanceof Resolver ||
    type instanceof ObjectTypeComposer ||
    type instanceof InterfaceTypeComposer ||
    type instanceof EnumTypeComposer ||
    type instanceof UnionTypeComposer ||
    type instanceof ScalarTypeComposer
  );
}

// Compose Args -----------------------------
export type ArgsMap = { [argName: string]: any };
export type ComposeArgumentType =
  | GraphQLInputType
  | TypeAsString
  | InputTypeComposer<any>
  | EnumTypeComposer<any>
  | ScalarTypeComposer<any>
  | $ReadOnlyArray<ComposeArgumentType>;
export type ComposeArgumentConfigAsObject = {
  +type: Thunk<ComposeArgumentType> | GraphQLInputType,
  +defaultValue?: mixed,
  +description?: string | null,
  +astNode?: InputValueDefinitionNode | null,
  +[key: string]: any,
};

export type ComposeArgumentConfig =
  | ComposeArgumentConfigAsObject
  | ComposeArgumentType
  | (() => ComposeArgumentConfigAsObject | ComposeArgumentType);

export type ComposeFieldConfigArgumentMap<TArgs = ArgsMap> = {
  [argName: $Keys<TArgs>]: ComposeArgumentConfig,
};

// RELATION -----------------------------
export type RelationThunkMap<TSource, TContext> = {
  [fieldName: string]: Thunk<RelationOpts<any, TSource, TContext, ArgsMap>>,
};
export type RelationOpts<TRelationSource, TSource, TContext, TArgs = ArgsMap> =
  | RelationOptsWithResolver<TRelationSource, TSource, TContext, TArgs>
  | RelationOptsWithFieldConfig<TSource, TContext, TArgs>;
export type RelationOptsWithResolver<TRelationSource, TSource, TContext, TArgs = ArgsMap> = {
  +resolver: Thunk<Resolver<TRelationSource, TContext, TArgs>>,
  +prepareArgs?: RelationArgsMapper<TSource, TContext, TArgs>,
  +projection?: ProjectionType,
  +description?: string | null,
  +deprecationReason?: string | null,
  +catchErrors?: boolean,
};
export type RelationOptsWithFieldConfig<
  TSource,
  TContext,
  TArgs = ArgsMap
> = ComposeFieldConfigAsObject<TSource, TContext, TArgs> & {
  resolve: GraphQLFieldResolver<TSource, TContext, TArgs>,
};

export type RelationArgsMapperFn<TSource, TContext, TArgs = ArgsMap> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;
export type RelationArgsMapper<TSource, TContext, TArgs = ArgsMap> = {
  [argName: $Keys<TArgs>]:
    | { [key: string]: any }
    | RelationArgsMapperFn<TSource, TContext, TArgs>
    | null
    | void
    | string
    | number
    | any[],
};

export type ObjectTypeComposeDefinition<TSource, TContext> =
  | TypeAsString
  | ComposeObjectTypeConfig<TSource, TContext>
  | GraphQLObjectType;

export class ObjectTypeComposer<TSource, TContext> {
  gqType: GraphQLObjectTypeExtended<TSource, TContext>;
  schemaComposer: SchemaComposer<TContext>;

  static create<TSrc, TCtx>(
    typeDef: ObjectTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): ObjectTypeComposer<TSrc, TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `ObjectTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const tc = this.createTemp(typeDef, schemaComposer);
    const typeName = tc.getTypeName();
    if (typeName !== 'Query' && typeName !== 'Mutation' && typeName !== 'Subscription') {
      schemaComposer.add(tc);
    }
    return tc;
  }

  static createTemp<TSrc, TCtx>(
    typeDef: ObjectTypeComposeDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): ObjectTypeComposer<TSrc, TCtx> {
    const sc = schemaComposer || new SchemaComposer();
    let TC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        TC = new ObjectTypeComposer(
          new GraphQLObjectType({
            name: typeName,
            fields: () => ({}),
          }),
          sc
        );
      } else {
        const type = sc.typeMapper.createType(typeName);
        if (!(type instanceof GraphQLObjectType)) {
          throw new Error(
            'You should provide correct GraphQLObjectType type definition.' +
              'Eg. `type MyType { name: String }`'
          );
        }
        TC = new ObjectTypeComposer(type, sc);
      }
    } else if (typeDef instanceof GraphQLObjectType) {
      TC = new ObjectTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const fields = typeDef.fields;
      const type = new GraphQLObjectType({
        ...(typeDef: any),
        fields: isFunction(fields)
          ? () => resolveOutputConfigMapAsThunk(sc, (fields(): any), typeDef.name)
          : () => ({}),
      });
      TC = new ObjectTypeComposer(type, sc);
      if (isObject(fields)) TC.addFields(fields);
      TC.gqType._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLObjectTypeConfig or string with type name to ObjectTypeComposer.create(opts). Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return TC;
  }

  constructor(
    gqType: GraphQLObjectType,
    schemaComposer: SchemaComposer<TContext>
  ): ObjectTypeComposer<TSource, TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new ObjectTypeComposer(GraphQLObjectType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLObjectType)) {
      throw new Error('ObjectTypeComposer accept only GraphQLObjectType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Field methods
  // -----------------------------------------------

  getFields(): ComposeFieldConfigMap<TSource, TContext> {
    if (!this.gqType._gqcFields) {
      if (graphqlVersion >= 14) {
        this.gqType._gqcFields = (defineFieldMapToConfig(this.gqType._fields): any);
      } else {
        const fields: Thunk<GraphQLFieldConfigMap<any, TContext>> = (this.gqType: any)._typeConfig
          .fields;
        this.gqType._gqcFields = (resolveMaybeThunk(fields) || {}: any);
      }
    }

    return this.gqType._gqcFields;
  }

  getFieldNames(): string[] {
    return Object.keys(this.getFields());
  }

  setFields(
    fields: ComposeFieldConfigMap<TSource, TContext>
  ): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcFields = fields;
    if (graphqlVersion >= 14) {
      this.gqType._fields = () => {
        return defineFieldMap(
          this.gqType,
          resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName())
        );
      };
    } else {
      (this.gqType: any)._typeConfig.fields = () => {
        return resolveOutputConfigMapAsThunk(this.schemaComposer, fields, this.getTypeName());
      };
      delete this.gqType._fields; // clear builded fields in type
    }
    return this;
  }

  hasField(fieldName: string): boolean {
    const fields = this.getFields();
    return !!fields[fieldName];
  }

  setField(
    fieldName: string,
    fieldConfig: ComposeFieldConfig<TSource, TContext, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    this.addFields({ [fieldName]: fieldConfig });

    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(
    newFields: ComposeFieldConfigMap<TSource, TContext>
  ): ObjectTypeComposer<TSource, TContext> {
    this.setFields({ ...this.getFields(), ...newFields });
    return this;
  }

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  addNestedFields(
    newFields: ComposeFieldConfigMap<TSource, TContext>
  ): ObjectTypeComposer<TSource, TContext> {
    Object.keys(newFields).forEach(fieldName => {
      const fc = newFields[fieldName];
      const names = fieldName.split('.');
      const name = names.shift();

      if (names.length === 0) {
        // single field
        this.setField(name, fc);
      } else {
        // nested field
        let childTC;
        if (!this.hasField(name)) {
          childTC = ObjectTypeComposer.createTemp(
            `${this.getTypeName()}${upperFirst(name)}`,
            this.schemaComposer
          );
          this.setField(name, {
            type: childTC,
            resolve: () => ({}),
          });
        } else {
          childTC = this.getFieldTC(name);
        }
        childTC.addNestedFields({ [names.join('.')]: fc });
      }
    });

    return this;
  }

  /**
   * Get fieldConfig by name
   */
  getField(fieldName: string): ComposeFieldConfig<TSource, TContext, ArgsMap> {
    const fields = this.getFields();

    if (!fields[fieldName]) {
      throw new Error(
        `Cannot get field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    return fields[fieldName];
  }

  removeField(fieldNameOrArray: string | string[]): ObjectTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    const fields = this.getFields();
    fieldNames.forEach(fieldName => delete fields[fieldName]);
    this.setFields({ ...fields });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): ObjectTypeComposer<TSource, TContext> {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    const fields = this.getFields();
    Object.keys(fields).forEach(fieldName => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete fields[fieldName];
      }
    });
    this.setFields(fields);
    return this;
  }

  extendField(
    fieldName: string,
    partialFieldConfig: $Shape<ComposeFieldConfigAsObject<TSource, TContext, ArgsMap>>
  ): ObjectTypeComposer<TSource, TContext> {
    let prevFieldConfig;
    try {
      prevFieldConfig = this.getFieldConfig(fieldName);
    } catch (e) {
      throw new Error(
        `Cannot extend field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    this.setField(fieldName, {
      ...(prevFieldConfig: any),
      ...partialFieldConfig,
    });
    return this;
  }

  reorderFields(names: string[]): ObjectTypeComposer<TSource, TContext> {
    const orderedFields = {};
    const fields = this.getFields();
    names.forEach(name => {
      if (fields[name]) {
        orderedFields[name] = fields[name];
        delete fields[name];
      }
    });
    this.setFields({ ...orderedFields, ...fields });
    return this;
  }

  isFieldNonNull(fieldName: string): boolean {
    return this.getFieldType(fieldName) instanceof GraphQLNonNull;
  }

  getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext> {
    const fc = this.getField(fieldName);
    if (!fc) {
      throw new Error(`Type ${this.getTypeName()} does not have field with name '${fieldName}'`);
    }

    return resolveOutputConfigAsThunk(this.schemaComposer, fc, fieldName, this.getTypeName());
  }

  getFieldType(fieldName: string): GraphQLOutputType {
    return this.getFieldConfig(fieldName).type;
  }

  getFieldTC(fieldName: string): ObjectTypeComposer<TSource, TContext> {
    const fieldType = getNamedType(this.getFieldType(fieldName));
    if (!(fieldType instanceof GraphQLObjectType)) {
      throw new Error(
        `Cannot get ObjectTypeComposer for field '${fieldName}' in type ${this.getTypeName()}. ` +
          `This field should be ObjectType, but it has type '${fieldType.constructor.name}'`
      );
    }
    return ObjectTypeComposer.createTemp(fieldType, this.schemaComposer);
  }

  makeFieldNonNull(fieldNameOrArray: string | string[]): ObjectTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);
        if (!(fieldType instanceof GraphQLNonNull)) {
          this.extendField(fieldName, { type: new GraphQLNonNull(fieldType) });
        }
      }
    });
    return this;
  }

  makeFieldNullable(fieldNameOrArray: string | string[]): ObjectTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      if (this.hasField(fieldName)) {
        const fieldType = this.getFieldType(fieldName);
        if (fieldType instanceof GraphQLNonNull) {
          this.extendField(fieldName, { type: fieldType.ofType });
        }
      }
    });
    return this;
  }

  deprecateFields(
    fields: { [fieldName: string]: string } | string[] | string
  ): ObjectTypeComposer<TSource, TContext> {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate unexisted field '${fields}' from type '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted field '${field}' from type '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted field '${field}' from type '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
    }

    return this;
  }

  getFieldArgs(fieldName: string): GraphQLFieldConfigArgumentMap {
    try {
      const fc = this.getFieldConfig(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(
        `Cannot get field args. Field '${fieldName}' from type '${this.getTypeName()}' does not exist.`
      );
    }
  }

  hasFieldArg(fieldName: string, argName: string): boolean {
    try {
      const fieldArgs = this.getFieldArgs(fieldName);
      return !!fieldArgs[argName];
    } catch (e) {
      return false;
    }
  }

  getFieldArg(fieldName: string, argName: string): GraphQLArgumentConfig {
    const fieldArgs = this.getFieldArgs(fieldName);

    if (!fieldArgs[argName]) {
      throw new Error(
        `Cannot get arg '${argName}' from type.field '${this.getTypeName()}.${fieldName}'. Argument does not exist.`
      );
    }

    return fieldArgs[argName];
  }

  getFieldArgType(fieldName: string, argName: string): GraphQLInputType {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.type;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLObjectType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLObjectType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLObjectType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): ObjectTypeComposer<TSource, TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): ObjectTypeComposer<TSource, TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): ObjectTypeComposer<TSource, TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for ObjectTypeComposer.clone()');
    }

    const newFields = {};
    this.getFieldNames().forEach(fieldName => {
      const fc = this.getFieldConfig(fieldName);
      newFields[fieldName] = { ...(fc: any) };
    });

    const cloned = new ObjectTypeComposer(
      new GraphQLObjectType({
        name: newTypeName,
        fields: newFields,
      }),
      this.schemaComposer
    );

    cloned.setDescription(this.getDescription());
    try {
      cloned.setRecordIdFn(this.getRecordIdFn());
    } catch (e) {
      // no problem, clone without resolveIdFn
    }
    this.getResolvers().forEach(resolver => {
      const newResolver = resolver.clone();
      cloned.addResolver(newResolver);
    });

    return cloned;
  }

  getIsTypeOf(): ?GraphQLIsTypeOfFn<TSource, TContext> {
    return this.gqType.isTypeOf;
  }

  setIsTypeOf(fn: ?GraphQLIsTypeOfFn<any, any>): ObjectTypeComposer<TSource, TContext> {
    this.gqType.isTypeOf = fn;
    return this;
  }

  // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------

  getInputType(): GraphQLInputObjectType {
    return this.getInputTypeComposer().getType();
  }

  hasInputTypeComposer(): boolean {
    return !!this.gqType._gqcInputTypeComposer;
  }

  setInputTypeComposer(itc: InputTypeComposer<TContext>): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcInputTypeComposer = itc;
    return this;
  }

  getInputTypeComposer(): InputTypeComposer<TContext> {
    if (!this.gqType._gqcInputTypeComposer) {
      this.gqType._gqcInputTypeComposer = toInputObjectType(this);
    }

    return this.gqType._gqcInputTypeComposer;
  }

  // Alias for getInputTypeComposer()
  getITC(): InputTypeComposer<TContext> {
    return this.getInputTypeComposer();
  }

  removeInputTypeComposer(): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcInputTypeComposer = undefined;
    return this;
  }

  // -----------------------------------------------
  // Resolver methods
  // -----------------------------------------------

  getResolvers(): Map<string, Resolver<any, TContext, any>> {
    if (!this.gqType._gqcResolvers) {
      this.gqType._gqcResolvers = new Map();
    }
    return this.gqType._gqcResolvers;
  }

  hasResolver(name: string): boolean {
    if (!this.gqType._gqcResolvers) {
      return false;
    }
    return this.gqType._gqcResolvers.has(name);
  }

  getResolver(
    name: string,
    middlewares?: Array<ResolverMiddleware<TSource, TContext, ArgsMap>>
  ): Resolver<any, TContext, ArgsMap> {
    if (!this.hasResolver(name)) {
      throw new Error(`Type ${this.getTypeName()} does not have resolver with name '${name}'`);
    }
    const resolverMap: any = this.gqType._gqcResolvers;
    const resolver = resolverMap.get(name);

    if (Array.isArray(middlewares)) {
      return resolver.withMiddlewares(middlewares);
    }

    return resolver;
  }

  setResolver(
    name: string,
    resolver: Resolver<any, TContext, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    if (!this.gqType._gqcResolvers) {
      this.gqType._gqcResolvers = new Map();
    }
    if (!(resolver instanceof Resolver)) {
      throw new Error('setResolver() accept only Resolver instance');
    }
    this.gqType._gqcResolvers.set(name, resolver);
    resolver.setDisplayName(`${this.getTypeName()}.${resolver.name}`);
    return this;
  }

  addResolver(
    opts: Resolver<any, TContext, ArgsMap> | ResolverOpts<any, TContext, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    if (!opts) {
      throw new Error('addResolver called with empty Resolver');
    }

    let resolver: Resolver<any, TContext, any>;
    if (!(opts instanceof Resolver)) {
      const resolverOpts = { ...opts };
      // add resolve method, otherwise added resolver will not return any data by graphql-js
      if (!resolverOpts.hasOwnProperty('resolve')) {
        resolverOpts.resolve = () => ({});
      }
      resolver = new Resolver(
        (resolverOpts: ResolverOpts<any, TContext, any>),
        this.schemaComposer
      );
    } else {
      resolver = opts;
    }

    if (!resolver.name) {
      throw new Error('resolver should have non-empty `name` property');
    }
    this.setResolver(resolver.name, resolver);
    return this;
  }

  removeResolver(resolverName: string): ObjectTypeComposer<TSource, TContext> {
    if (resolverName) {
      this.getResolvers().delete(resolverName);
    }
    return this;
  }

  wrapResolver(
    resolverName: string,
    cbResolver: ResolverWrapCb<any, TSource, TContext, ArgsMap, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    const resolver = this.getResolver(resolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverAs(
    resolverName: string,
    fromResolverName: string,
    cbResolver: ResolverWrapCb<any, TSource, TContext, ArgsMap, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    const resolver = this.getResolver(fromResolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverResolve(
    resolverName: string,
    cbNextRp: ResolverNextRpCb<any, TContext, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    const resolver = this.getResolver(resolverName);
    this.setResolver(resolverName, resolver.wrapResolve(cbNextRp));
    return this;
  }

  // -----------------------------------------------
  // Interface methods
  // -----------------------------------------------

  getInterfaces(): Array<GraphQLInterfaceType | InterfaceTypeComposer<any, TContext>> {
    if (!this.gqType._gqcInterfaces) {
      let interfaces: any;
      if (graphqlVersion >= 14) {
        interfaces = this.gqType._interfaces;
      } else {
        interfaces = (this.gqType: any)._typeConfig.interfaces;
      }
      this.gqType._gqcInterfaces = (resolveMaybeThunk(interfaces) || []: any);
    }

    return this.gqType._gqcInterfaces;
  }

  setInterfaces(
    interfaces: Array<InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType>
  ): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcInterfaces = interfaces;
    const interfacesThunk = () => {
      return interfaces.map(iface => {
        if (iface instanceof GraphQLInterfaceType) {
          return iface;
        } else if (iface instanceof InterfaceTypeComposer) {
          return iface.getType();
        }
        throw new Error(
          `For type ${this.getTypeName()} you provide incorrect interface object ${inspect(iface)}`
        );
      });
    };

    if (graphqlVersion >= 14) {
      this.gqType._interfaces = interfacesThunk;
    } else {
      // for old graphql versions below 0.13
      (this.gqType: any)._typeConfig.interfaces = interfacesThunk;
      delete this.gqType._interfaces;
    }
    return this;
  }

  hasInterface(
    iface: string | InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType
  ): boolean {
    const nameAsString = getComposeTypeName(iface);
    const ifaces = this.getInterfaces();
    return !!ifaces.find(i => getComposeTypeName(i) === nameAsString);
  }

  addInterface(
    interfaceObj: InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType
  ): ObjectTypeComposer<TSource, TContext> {
    if (!this.hasInterface(interfaceObj)) {
      this.setInterfaces([...this.getInterfaces(), interfaceObj]);
    }
    return this;
  }

  removeInterface(
    interfaceObj: InterfaceTypeComposer<any, TContext> | GraphQLInterfaceType
  ): ObjectTypeComposer<TSource, TContext> {
    const interfaces = this.getInterfaces();
    const idx = interfaces.indexOf(interfaceObj);
    if (idx > -1) {
      interfaces.splice(idx, 1);
      this.setInterfaces(interfaces);
    }
    return this;
  }

  // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------

  getExtensions(): Extensions {
    if (!this.gqType._gqcExtensions) {
      return {};
    } else {
      return this.gqType._gqcExtensions;
    }
  }

  setExtensions(extensions: Extensions): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): ObjectTypeComposer<TSource, TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): ObjectTypeComposer<TSource, TContext> {
    this.setExtensions({});
    return this;
  }

  getExtension(extensionName: string): ?any {
    const extensions = this.getExtensions();
    return extensions[extensionName];
  }

  hasExtension(extensionName: string): boolean {
    const extensions = this.getExtensions();
    return extensionName in extensions;
  }

  setExtension(extensionName: string, value: any): ObjectTypeComposer<TSource, TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): ObjectTypeComposer<TSource, TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    if (
      isObject(field) &&
      !isFunction(field) &&
      !Array.isArray(field) &&
      !isComposeOutputType(field)
    ) {
      return (field: ComposeObjectTypeConfig<any, any>).extensions || {};
    } else {
      return {};
    }
  }

  setFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): ObjectTypeComposer<TSource, TContext> {
    this.extendField(fieldName, {
      extensions,
    });
    return this;
  }

  extendFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): ObjectTypeComposer<TSource, TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...extensions,
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): ObjectTypeComposer<TSource, TContext> {
    this.setFieldExtensions(fieldName, {});
    return this;
  }

  getFieldExtension(fieldName: string, extensionName: string): ?any {
    const extensions = this.getFieldExtensions(fieldName);
    return extensions[extensionName];
  }

  hasFieldExtension(fieldName: string, extensionName: string): boolean {
    const extensions = this.getFieldExtensions(fieldName);
    return extensionName in extensions;
  }

  setFieldExtension(
    fieldName: string,
    extensionName: string,
    value: any
  ): ObjectTypeComposer<TSource, TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(
    fieldName: string,
    extensionName: string
  ): ObjectTypeComposer<TSource, TContext> {
    const extensions = { ...this.getFieldExtensions(fieldName) };
    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
    return this;
  }

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  addRelation(
    fieldName: string,
    opts: RelationOpts<any, TSource, TContext, ArgsMap>
  ): ObjectTypeComposer<TSource, TContext> {
    if (!this.gqType._gqcRelations) {
      this.gqType._gqcRelations = {};
    }
    this.gqType._gqcRelations[fieldName] = opts;

    if (opts.hasOwnProperty('resolver')) {
      this.setField(fieldName, () => {
        return this._relationWithResolverToFC(opts, fieldName);
      });
    } else if (opts.hasOwnProperty('type')) {
      const fc: RelationOptsWithFieldConfig<TSource, TContext, any> = (opts: any);
      this.setField(fieldName, fc);
    }

    return this;
  }

  getRelations(): RelationThunkMap<any, TContext> {
    if (!this.gqType._gqcRelations) {
      this.gqType._gqcRelations = {};
    }
    return this.gqType._gqcRelations;
  }

  _relationWithResolverToFC(
    opts: RelationOptsWithResolver<any, TSource, TContext, any>,
    fieldName?: string = ''
  ): ComposeFieldConfigAsObject<TSource, TContext, any> {
    const resolver = isFunction(opts.resolver) ? opts.resolver() : opts.resolver;

    if (!(resolver instanceof Resolver)) {
      throw new Error(
        'You should provide correct Resolver object for relation ' +
          `${this.getTypeName()}.${fieldName}`
      );
    }
    if ((opts: any).type) {
      throw new Error(
        'You can not use `resolver` and `type` properties simultaneously for relation ' +
          `${this.getTypeName()}.${fieldName}`
      );
    }
    if ((opts: any).resolve) {
      throw new Error(
        'You can not use `resolver` and `resolve` properties simultaneously for relation ' +
          `${this.getTypeName()}.${fieldName}`
      );
    }

    const fieldConfig = resolver.getFieldConfig();
    const argsConfig = { ...fieldConfig.args };
    const argsProto = {};
    const argsRuntime: [string, RelationArgsMapperFn<TSource, TContext, ArgsMap>][] = [];

    // remove args from config, if arg name provided in args
    //    if `argMapVal`
    //       is `undefined`, then keep arg field in config
    //       is `null`, then just remove arg field from config
    //       is `function`, then remove arg field and run it in resolve
    //       is any other value, then put it to args prototype for resolve
    const optsArgs = opts.prepareArgs || {};

    Object.keys(optsArgs).forEach(argName => {
      const argMapVal = optsArgs[argName];
      if (argMapVal !== undefined) {
        delete argsConfig[argName];

        if (isFunction(argMapVal)) {
          argsRuntime.push([argName, argMapVal]);
        } else if (argMapVal !== null) {
          argsProto[argName] = argMapVal;
        }
      }
    });

    // if opts.catchErrors is undefined then set true, otherwise take it value
    const { catchErrors = true } = opts;

    const resolve = (source, args, context, info) => {
      const newArgs = { ...args, ...argsProto };
      argsRuntime.forEach(([argName, argFn]) => {
        newArgs[argName] = argFn(source, args, context, info);
      });

      const payload = fieldConfig.resolve
        ? fieldConfig.resolve(source, newArgs, context, info)
        : null;
      return catchErrors
        ? Promise.resolve(payload).catch(e => {
            // eslint-disable-next-line
            console.log(`GQC ERROR: relation for ${this.getTypeName()}.${fieldName} throws error:`);
            console.log(e); // eslint-disable-line
            return null;
          })
        : payload;
    };

    return {
      type: fieldConfig.type,
      description: opts.description,
      deprecationReason: opts.deprecationReason,
      args: argsConfig,
      resolve,
      projection: opts.projection,
    };
  }

  setRecordIdFn(fn: GetRecordIdFn<TSource, TContext>): ObjectTypeComposer<TSource, TContext> {
    this.gqType._gqcGetRecordIdFn = fn;
    return this;
  }

  hasRecordIdFn(): boolean {
    return !!this.gqType._gqcGetRecordIdFn;
  }

  getRecordIdFn(): GetRecordIdFn<TSource, TContext> {
    if (!this.gqType._gqcGetRecordIdFn) {
      throw new Error(`Type ${this.getTypeName()} does not have RecordIdFn`);
    }
    return this.gqType._gqcGetRecordIdFn;
  }

  /**
   * Get function that returns record id, from provided object.
   */
  getRecordId(source: TSource, args?: ArgsMap, context?: TContext): string | number {
    return this.getRecordIdFn()(source, args, context);
  }

  get(path: string | string[]): any {
    return typeByPath(this, path);
  }
}
