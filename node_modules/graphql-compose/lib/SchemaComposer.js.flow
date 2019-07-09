/* @flow strict */
/* eslint-disable class-methods-use-this */

import deprecate from './utils/deprecate';
import { TypeStorage } from './TypeStorage';
import { TypeMapper } from './TypeMapper';
import { ObjectTypeComposer, type ObjectTypeComposeDefinition } from './ObjectTypeComposer';
import { InputTypeComposer, type InputTypeComposeDefinition } from './InputTypeComposer';
import { ScalarTypeComposer, type ScalarTypeComposeDefinition } from './ScalarTypeComposer';
import { EnumTypeComposer, type EnumTypeComposeDefinition } from './EnumTypeComposer';
import {
  InterfaceTypeComposer,
  type InterfaceTypeComposeDefinition,
} from './InterfaceTypeComposer';
import { UnionTypeComposer, type UnionTypeComposeDefinition } from './UnionTypeComposer';
import { Resolver, type ResolverOpts } from './Resolver';
import { isFunction } from './utils/is';
import { inspect } from './utils/misc';
import { getGraphQLType } from './utils/typeHelpers';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLDirective,
  GraphQLSkipDirective,
  GraphQLIncludeDirective,
  GraphQLDeprecatedDirective,
  GraphQLScalarType,
  type GraphQLNamedType,
  type SchemaDefinitionNode,
  type GraphQLResolveInfo,
} from './graphql';

type ExtraSchemaConfig = {
  types?: GraphQLNamedType[] | null,
  directives?: GraphQLDirective[] | null,
  astNode?: SchemaDefinitionNode | null,
};

type MustHaveTypes<TContext> =
  | ObjectTypeComposer<any, TContext>
  | InputTypeComposer<TContext>
  | EnumTypeComposer<TContext>
  | InterfaceTypeComposer<any, TContext>
  | UnionTypeComposer<any, TContext>
  | ScalarTypeComposer<TContext>
  | GraphQLNamedType;

type GraphQLToolsResolveMethods<TContext> = {
  [typeName: string]: {
    [fieldName: string]: (
      source: any,
      args: Object,
      context: TContext,
      info: GraphQLResolveInfo
    ) => any,
  },
};

const BUILT_IN_DIRECTIVES = [
  GraphQLSkipDirective,
  GraphQLIncludeDirective,
  GraphQLDeprecatedDirective,
];

export class SchemaComposer<TContext> extends TypeStorage<any, any> {
  typeMapper: TypeMapper<TContext>;
  _schemaMustHaveTypes: Array<MustHaveTypes<TContext>> = [];
  _directives: Array<GraphQLDirective> = BUILT_IN_DIRECTIVES;

  constructor(): SchemaComposer<TContext> {
    super();
    this.typeMapper = new TypeMapper(this);

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  get Query(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Query');
  }

  /* @deprecated 7.0.0 */
  rootQuery(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Query property instead');
    return this.getOrCreateOTC('Query');
  }

  get Mutation(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Mutation');
  }

  /* @deprecated 7.0.0 */
  rootMutation(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Query property instead');
    return this.getOrCreateOTC('Mutation');
  }

  get Subscription(): ObjectTypeComposer<any, TContext> {
    return this.getOrCreateOTC('Subscription');
  }

  /* @deprecated 7.0.0 */
  rootSubscription(): ObjectTypeComposer<any, TContext> {
    deprecate('Use schemaComposer.Query property instead');
    return this.getOrCreateOTC('Subscription');
  }

  buildSchema(extraConfig?: ExtraSchemaConfig): GraphQLSchema {
    const roots = {};

    if (this.has('Query')) {
      const tc = this.getOTC('Query');
      this.removeEmptyTypes(tc, new Set());
      roots.query = tc.getType();
    }

    if (this.has('Mutation')) {
      const tc = this.getOTC('Mutation');
      this.removeEmptyTypes(tc, new Set());
      roots.mutation = tc.getType();
    }

    if (this.has('Subscription')) {
      const tc = this.getOTC('Subscription');
      this.removeEmptyTypes(tc, new Set());
      roots.subscription = tc.getType();
    }

    if (!roots.query) {
      throw new Error(
        'Can not build schema. Must be initialized Query type. See https://github.com/graphql/graphql-js/issues/448'
      );
    }

    if (Object.keys(roots).length === 0) {
      throw new Error(
        'Can not build schema. Must be initialized at least one ' +
          'of the following types: Query, Mutation, Subscription.'
      );
    }

    const types = [
      ...this._schemaMustHaveTypes.map(t => (getGraphQLType(t): any)), // additional types, eg. used in Interfaces
      ...(extraConfig && Array.isArray(extraConfig.types) ? [...extraConfig.types] : []),
    ];

    const directives = [
      ...this._directives,
      ...(extraConfig && Array.isArray(extraConfig.directives) ? [...extraConfig.directives] : []),
    ];

    return new GraphQLSchema({ ...roots, ...extraConfig, types, directives });
  }

  addSchemaMustHaveType(type: MustHaveTypes<TContext>): SchemaComposer<TContext> {
    this._schemaMustHaveTypes.push(type);
    return this;
  }

  removeEmptyTypes(
    tc: ObjectTypeComposer<any, TContext>,
    passedTypes: Set<string> = new Set()
  ): void {
    tc.getFieldNames().forEach(fieldName => {
      const fieldType = tc.getFieldType(fieldName);
      if (fieldType instanceof GraphQLObjectType) {
        const typeName = fieldType.name;
        if (!passedTypes.has(typeName)) {
          passedTypes.add(typeName);
          const fieldTC = new ObjectTypeComposer(fieldType, this);
          if (Object.keys(fieldTC.getFields()).length > 0) {
            this.removeEmptyTypes(fieldTC, passedTypes);
          } else {
            // eslint-disable-next-line
            console.log(
              `graphql-compose: Delete field '${tc.getTypeName()}.${fieldName}' ` +
                `with type '${fieldTC.getTypeName()}', cause it does not have fields.`
            );
            tc.removeField(fieldName);
          }
        }
      }
    });
  }

  /* @deprecated 7.0.0 */
  getOrCreateTC(
    typeName: string,
    onCreate?: (ObjectTypeComposer<any, TContext>) => any
  ): ObjectTypeComposer<any, TContext> {
    deprecate(`Use SchemaComposer.getOrCreateOTC() method instead`);
    return this.getOrCreateOTC(typeName, onCreate);
  }

  getOrCreateOTC(
    typeName: string,
    onCreate?: (ObjectTypeComposer<any, TContext>) => any
  ): ObjectTypeComposer<any, TContext> {
    try {
      return this.getOTC(typeName);
    } catch (e) {
      const tc = ObjectTypeComposer.create(typeName, this);
      this.set(typeName, tc);
      if (onCreate && isFunction(onCreate)) onCreate(tc);
      return tc;
    }
  }

  getOrCreateITC(
    typeName: string,
    onCreate?: (InputTypeComposer<TContext>) => any
  ): InputTypeComposer<TContext> {
    try {
      return this.getITC(typeName);
    } catch (e) {
      const itc = InputTypeComposer.create(typeName, this);
      this.set(typeName, itc);
      if (onCreate && isFunction(onCreate)) onCreate(itc);
      return itc;
    }
  }

  getOrCreateETC(
    typeName: string,
    onCreate?: (EnumTypeComposer<TContext>) => any
  ): EnumTypeComposer<TContext> {
    try {
      return this.getETC(typeName);
    } catch (e) {
      const etc = EnumTypeComposer.create(typeName, this);
      this.set(typeName, etc);
      if (onCreate && isFunction(onCreate)) onCreate(etc);
      return etc;
    }
  }

  getOrCreateIFTC(
    typeName: string,
    onCreate?: (InterfaceTypeComposer<any, TContext>) => any
  ): InterfaceTypeComposer<any, TContext> {
    try {
      return this.getIFTC(typeName);
    } catch (e) {
      const iftc = InterfaceTypeComposer.create(typeName, this);
      this.set(typeName, iftc);
      if (onCreate && isFunction(onCreate)) onCreate(iftc);
      return iftc;
    }
  }

  getOrCreateUTC(
    typeName: string,
    onCreate?: (UnionTypeComposer<any, TContext>) => any
  ): UnionTypeComposer<any, TContext> {
    try {
      return this.getUTC(typeName);
    } catch (e) {
      const utc = UnionTypeComposer.create(typeName, this);
      this.set(typeName, utc);
      if (onCreate && isFunction(onCreate)) onCreate(utc);
      return utc;
    }
  }

  getOrCreateSTC(
    typeName: string,
    onCreate?: (ScalarTypeComposer<TContext>) => any
  ): ScalarTypeComposer<TContext> {
    try {
      return this.getSTC(typeName);
    } catch (e) {
      const stc = ScalarTypeComposer.create(typeName, this);
      this.set(typeName, stc);
      if (onCreate && isFunction(onCreate)) onCreate(stc);
      return stc;
    }
  }

  // disable redundant noise in console.logs
  toString(): string {
    return 'SchemaComposer';
  }

  toJSON() {
    return 'SchemaComposer';
  }

  inspect() {
    return 'SchemaComposer';
  }

  clear(): void {
    super.clear();
    this._schemaMustHaveTypes = [];
    this._directives = BUILT_IN_DIRECTIVES;
  }

  /* @deprecated 7.0.0 */
  getTC(typeName: any): ObjectTypeComposer<any, TContext> {
    deprecate(`Use SchemaComposer.getOTC() method instead`);
    return this.getOTC(typeName);
  }

  getOTC(typeName: any): ObjectTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLObjectType)) {
      return ObjectTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, ObjectTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find ObjectTypeComposer with name ${typeName}`);
  }

  getITC(typeName: any): InputTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLInputObjectType)) {
      return InputTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, InputTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find InputTypeComposer with name ${typeName}`);
  }

  getETC(typeName: any): EnumTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLEnumType)) {
      return EnumTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, EnumTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find EnumTypeComposer with name ${typeName}`);
  }

  getIFTC(typeName: any): InterfaceTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLInterfaceType)) {
      return InterfaceTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, InterfaceTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find InterfaceTypeComposer with name ${typeName}`);
  }

  getUTC(typeName: any): UnionTypeComposer<any, TContext> {
    if (this.hasInstance(typeName, GraphQLUnionType)) {
      return UnionTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, UnionTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find UnionTypeComposer with name ${typeName}`);
  }

  getSTC(typeName: any): ScalarTypeComposer<TContext> {
    if (this.hasInstance(typeName, GraphQLScalarType)) {
      return ScalarTypeComposer.create((this.get(typeName): any), this);
    }
    if (this.hasInstance(typeName, ScalarTypeComposer)) {
      return (this.get(typeName): any);
    }
    throw new Error(`Cannot find ScalarTypeComposer with name ${typeName}`);
  }

  getAnyTC(
    typeName: any
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext> {
    const type = this.get(typeName);
    if (
      type instanceof ObjectTypeComposer ||
      type instanceof InputTypeComposer ||
      type instanceof ScalarTypeComposer ||
      type instanceof EnumTypeComposer ||
      type instanceof InterfaceTypeComposer ||
      type instanceof UnionTypeComposer
    ) {
      return type;
    } else if (type instanceof GraphQLObjectType) {
      return ObjectTypeComposer.create(type, this);
    } else if (type instanceof GraphQLInputObjectType) {
      return InputTypeComposer.create(type, this);
    } else if (type instanceof GraphQLScalarType) {
      return ScalarTypeComposer.create(type, this);
    } else if (type instanceof GraphQLEnumType) {
      return EnumTypeComposer.create(type, this);
    } else if (type instanceof GraphQLInterfaceType) {
      return InterfaceTypeComposer.create(type, this);
    } else if (type instanceof GraphQLUnionType) {
      return UnionTypeComposer.create(type, this);
    }

    throw new Error(
      `Type with name ${inspect(
        typeName
      )} cannot be obtained as any Composer helper. Put something strange?`
    );
  }

  add(typeOrSDL: mixed): ?string {
    if (typeof typeOrSDL === 'string') {
      return this.addAsComposer(typeOrSDL);
    } else {
      return super.add((typeOrSDL: any));
    }
  }

  addAsComposer(typeOrSDL: mixed): string {
    let type;
    if (typeof typeOrSDL === 'string') {
      type = this.typeMapper.createType(typeOrSDL);
    } else {
      type = typeOrSDL;
    }

    if (
      type instanceof ObjectTypeComposer ||
      type instanceof InputTypeComposer ||
      type instanceof ScalarTypeComposer ||
      type instanceof EnumTypeComposer ||
      type instanceof InterfaceTypeComposer ||
      type instanceof UnionTypeComposer
    ) {
      const name = type.getTypeName();
      this.set(name, type);
      return name;
    } else if (type instanceof GraphQLObjectType) {
      return ObjectTypeComposer.create(type, this).getTypeName();
    } else if (type instanceof GraphQLInputObjectType) {
      return InputTypeComposer.create(type, this).getTypeName();
    } else if (type instanceof GraphQLScalarType) {
      return ScalarTypeComposer.create(type, this).getTypeName();
    } else if (type instanceof GraphQLEnumType) {
      return EnumTypeComposer.create(type, this).getTypeName();
    } else if (type instanceof GraphQLInterfaceType) {
      return InterfaceTypeComposer.create(type, this).getTypeName();
    } else if (type instanceof GraphQLUnionType) {
      return UnionTypeComposer.create(type, this).getTypeName();
    }

    throw new Error(`Cannot add as Composer type following value: ${inspect(type)}.`);
  }

  addTypeDefs(typeDefs: string): TypeStorage<string, GraphQLNamedType> {
    const types = this.typeMapper.parseTypesFromString(typeDefs);
    types.forEach((type: any) => {
      const name = type.name;
      if (name !== 'Query' && name !== 'Mutation' && name !== 'Subscription') {
        this.add((type: any));
      }
    });
    if (types.has('Query')) {
      this.Query.addFields(ObjectTypeComposer.create((types.get('Query'): any), this).getFields());
    }
    if (types.has('Mutation')) {
      this.Mutation.addFields(
        ObjectTypeComposer.create((types.get('Mutation'): any), this).getFields()
      );
    }
    if (types.has('Subscription')) {
      this.Subscription.addFields(
        ObjectTypeComposer.create((types.get('Subscription'): any), this).getFields()
      );
    }
    return types;
  }

  addResolveMethods(typesFieldsResolve: GraphQLToolsResolveMethods<TContext>): void {
    const typeNames = Object.keys(typesFieldsResolve);
    typeNames.forEach(typeName => {
      if (this.get(typeName) instanceof GraphQLScalarType) {
        const maybeScalar: any = typesFieldsResolve[typeName];
        if (maybeScalar instanceof GraphQLScalarType) {
          this.set(typeName, maybeScalar);
          return;
        }
        if (typeof maybeScalar.name === 'string' && typeof maybeScalar.serialize === 'function') {
          this.set(typeName, new GraphQLScalarType(maybeScalar));
          return;
        }
      }
      const tc = this.getOTC(typeName);
      const fieldsResolve = typesFieldsResolve[typeName];
      const fieldNames = Object.keys(fieldsResolve);
      fieldNames.forEach(fieldName => {
        tc.extendField(fieldName, {
          resolve: fieldsResolve[fieldName],
        });
      });
    });
  }

  // alias for createObjectTC
  /* @deprecated 7.0.0 */
  createTC(typeDef: ObjectTypeComposeDefinition<any, TContext>): ObjectTypeComposer<any, TContext> {
    deprecate(`Use SchemaComposer.getOTC() method instead`);
    return this.createObjectTC(typeDef);
  }

  createObjectTC(
    typeDef: ObjectTypeComposeDefinition<any, TContext>
  ): ObjectTypeComposer<any, TContext> {
    return ObjectTypeComposer.create(typeDef, this);
  }

  createInputTC(typeDef: InputTypeComposeDefinition): InputTypeComposer<TContext> {
    return InputTypeComposer.create(typeDef, this);
  }

  createEnumTC(typeDef: EnumTypeComposeDefinition): EnumTypeComposer<TContext> {
    return EnumTypeComposer.create(typeDef, this);
  }

  createInterfaceTC(
    typeDef: InterfaceTypeComposeDefinition<any, TContext>
  ): InterfaceTypeComposer<any, TContext> {
    return InterfaceTypeComposer.create(typeDef, this);
  }

  createUnionTC(
    typeDef: UnionTypeComposeDefinition<any, TContext>
  ): UnionTypeComposer<any, TContext> {
    return UnionTypeComposer.create(typeDef, this);
  }

  createScalarTC(typeDef: ScalarTypeComposeDefinition): ScalarTypeComposer<TContext> {
    return ScalarTypeComposer.create(typeDef, this);
  }

  createResolver(opts: ResolverOpts<any, TContext>): Resolver<any, TContext> {
    return new Resolver<any, TContext, any>(opts, this);
  }

  addDirective(directive: GraphQLDirective): SchemaComposer<TContext> {
    if (!(directive instanceof GraphQLDirective)) {
      throw new Error(
        `You should provide GraphQLDirective to schemaComposer.addDirective(), but recieved ${inspect(
          directive
        )}`
      );
    }
    if (!this.hasDirective(directive)) {
      this._directives.push(directive);
    }
    return this;
  }

  removeDirective(directive: GraphQLDirective): SchemaComposer<TContext> {
    this._directives = this._directives.filter(o => o !== directive);
    return this;
  }

  getDirectives(): Array<GraphQLDirective> {
    return this._directives;
  }

  hasDirective(directive: string | GraphQLDirective): boolean {
    if (!directive) return false;

    if (typeof directive === 'string') {
      const name = directive.startsWith('@') ? directive.slice(1) : directive;
      return !!this._directives.find(o => o.name === name);
    } else if (directive instanceof GraphQLDirective) {
      return !!this._directives.find(o => o === directive);
    }

    return false;
  }
}
