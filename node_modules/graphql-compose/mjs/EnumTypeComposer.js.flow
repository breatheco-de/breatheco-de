/* @flow strict */
/* eslint-disable no-use-before-define */

import keyMap from 'graphql/jsutils/keyMap';
import { GraphQLEnumType, GraphQLList, GraphQLNonNull } from './graphql';
import { isObject, isString } from './utils/is';
import { inspect } from './utils/misc';
import type {
  GraphQLEnumValueConfig,
  GraphQLEnumTypeConfig,
  GraphQLEnumValueConfigMap,
} from './graphql';
import { defineEnumValues, defineEnumValuesToConfig } from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';
import type { TypeAsString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type { Extensions } from './utils/definitions';

export type ComposeEnumTypeConfig = GraphQLEnumTypeConfig & {
  +extensions?: Extensions,
};

export type EnumTypeComposeDefinition =
  | TypeAsString
  | $ReadOnly<ComposeEnumTypeConfig>
  | $ReadOnly<GraphQLEnumType>;

export type GraphQLEnumTypeExtended = GraphQLEnumType & {
  _gqcExtensions?: Extensions,
};

export class EnumTypeComposer<TContext> {
  gqType: GraphQLEnumTypeExtended;
  schemaComposer: SchemaComposer<TContext>;

  static create<TCtx>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `EnumTypeComposer.create(typeDef, schemaComposer)`'
      );
    }
    const etc = this.createTemp(typeDef, schemaComposer);
    if (schemaComposer) schemaComposer.add(etc);
    return etc;
  }

  static createTemp<TCtx>(
    typeDef: EnumTypeComposeDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let ETC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      const NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      if (NAME_RX.test(typeName)) {
        ETC = new EnumTypeComposer(
          new GraphQLEnumType({
            name: typeName,
            values: graphqlVersion < 13 ? { _OldGraphqlStubValue_: {} } : {},
          }),
          sc
        );
      } else {
        const type = sc.typeMapper.createType(typeName);
        if (!(type instanceof GraphQLEnumType)) {
          throw new Error(
            'You should provide correct GraphQLEnumType type definition.' +
              'Eg. `enum MyType { KEY1 KEY2 KEY3 }`'
          );
        }
        ETC = new EnumTypeComposer(type, sc);
      }
    } else if (typeDef instanceof GraphQLEnumType) {
      ETC = new EnumTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLEnumType({
        ...(typeDef: any),
      });
      ETC = new EnumTypeComposer(type, sc);
      ETC.gqType._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLEnumTypeConfig or string with enum name or SDL. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return ETC;
  }

  constructor(
    gqType: GraphQLEnumType,
    schemaComposer: SchemaComposer<TContext>
  ): EnumTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new EnumTypeComposer(GraphQLEnumType, SchemaComposer)`'
      );
    }
    this.schemaComposer = schemaComposer;

    if (!(gqType instanceof GraphQLEnumType)) {
      throw new Error('EnumTypeComposer accept only GraphQLEnumType in constructor');
    }
    this.gqType = gqType;

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Value methods
  // -----------------------------------------------

  hasField(name: string): boolean {
    const values = this.getFields();
    return !!values[name];
  }

  _fixEnumBelowV13() {
    if (graphqlVersion < 13) {
      if (!this.gqType._values) {
        // $FlowFixMe Support for graphql@0.11 and below
        this.gqType._values = defineEnumValues(this.gqType, this.gqType._enumConfig.values);
      }
      this.gqType._values = this.gqType._values.filter(o => o.name !== '_OldGraphqlStubValue_');
    }
  }

  getFields(): GraphQLEnumValueConfigMap {
    if (graphqlVersion >= 14) {
      return defineEnumValuesToConfig(this.gqType._values);
    } else {
      this._fixEnumBelowV13();
      return (this.gqType: any)._getNameLookup();
    }
  }

  getField(name: string): GraphQLEnumValueConfig {
    const values = this.getFields();

    if (!values[name]) {
      throw new Error(
        `Cannot get value '${name}' from enum type '${this.getTypeName()}'. Value with such name does not exist.`
      );
    }

    return values[name];
  }

  getFieldNames(): string[] {
    return Object.keys(this.getFields());
  }

  /**
   * Completely replace all values in GraphQL enum type
   * WARNING: this method rewrite an internal GraphQL instance properties.
   */
  setFields(values: GraphQLEnumValueConfigMap): EnumTypeComposer<TContext> {
    if (graphqlVersion >= 14) {
      this.gqType._values = defineEnumValues(this.gqType, values);
      this.gqType._valueLookup = new Map(
        this.gqType._values.map(enumValue => [enumValue.value, enumValue])
      );
      this.gqType._nameLookup = keyMap(this.gqType._values, value => value.name);
    } else {
      // cleanup isDepricated
      Object.keys(values).forEach(key => {
        // $FlowFixMe
        delete values[key].isDeprecated; // eslint-disable-line
      });

      // $FlowFixMe
      this.gqType._enumConfig.values = values;

      // clear builded fields in type
      delete this.gqType._values;
      delete this.gqType._valueLookup;
      delete this.gqType._nameLookup;

      this._fixEnumBelowV13();
    }

    return this;
  }

  setField(name: string, valueConfig: GraphQLEnumValueConfig): EnumTypeComposer<TContext> {
    this.addFields({ [name]: valueConfig });
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(newValues: GraphQLEnumValueConfigMap): EnumTypeComposer<TContext> {
    this.setFields({ ...this.getFields(), ...newValues });
    return this;
  }

  removeField(nameOrArray: string | string[]): EnumTypeComposer<TContext> {
    const valueNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    const values = this.getFields();
    valueNames.forEach(valueName => delete values[valueName]);
    this.setFields({ ...values });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): EnumTypeComposer<TContext> {
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

  reorderFields(names: string[]): EnumTypeComposer<TContext> {
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

  extendField(
    name: string,
    partialValueConfig: $Shape<GraphQLEnumValueConfig>
  ): EnumTypeComposer<TContext> {
    let prevValueConfig;
    try {
      prevValueConfig = this.getField(name);
    } catch (e) {
      throw new Error(
        `Cannot extend value '${name}' from enum '${this.getTypeName()}'. Value does not exist.`
      );
    }

    const valueConfig: GraphQLEnumValueConfig = {
      ...(prevValueConfig: any),
      ...(partialValueConfig: any),
    };
    this.setField(name, valueConfig);
    return this;
  }

  deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate unexisted value '${fields}' from enum '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate unexisted value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
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

  setExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    this.gqType._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...extensions,
    });
    return this;
  }

  clearExtensions(): EnumTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): EnumTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): EnumTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLEnumType {
    return this.gqType;
  }

  getTypePlural(): GraphQLList<GraphQLEnumType> {
    return new GraphQLList(this.gqType);
  }

  getTypeNonNull(): GraphQLNonNull<GraphQLEnumType> {
    return new GraphQLNonNull(this.gqType);
  }

  getTypeName(): string {
    return this.gqType.name;
  }

  setTypeName(name: string): EnumTypeComposer<TContext> {
    this.gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this.gqType.description || '';
  }

  setDescription(description: string): EnumTypeComposer<TContext> {
    this.gqType.description = description;
    return this;
  }

  clone(newTypeName: string): EnumTypeComposer<TContext> {
    if (!newTypeName) {
      throw new Error('You should provide newTypeName:string for EnumTypeComposer.clone()');
    }

    const values = this.getFields();
    const newValues = {};
    Object.keys(values).forEach(fieldName => {
      newValues[fieldName] = { ...values[fieldName] };
      delete newValues[fieldName].isDeprecated;
    });

    const cloned = new EnumTypeComposer(
      new GraphQLEnumType({
        name: newTypeName,
        values: newValues,
      }),
      this.schemaComposer
    );

    cloned.setDescription(this.getDescription());

    return cloned;
  }
}
