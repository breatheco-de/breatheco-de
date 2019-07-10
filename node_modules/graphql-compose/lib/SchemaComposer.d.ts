import {
  GraphQLSchema,
  GraphQLNamedType,
  GraphQLDirective,
  SchemaDefinitionNode,
  GraphQLResolveInfo,
} from 'graphql';
import {
  ObjectTypeComposer,
  ObjectTypeComposeDefinition,
  ArgsMap,
} from './ObjectTypeComposer';
import {
  InputTypeComposer,
  InputTypeComposeDefinition,
} from './InputTypeComposer';
import {
  ScalarTypeComposer,
  ScalarTypeComposeDefinition,
} from './ScalarTypeComposer';
import {
  EnumTypeComposer,
  EnumTypeComposeDefinition,
} from './EnumTypeComposer';
import {
  InterfaceTypeComposer,
  InterfaceTypeComposeDefinition,
} from './InterfaceTypeComposer';
import {
  UnionTypeComposer,
  UnionTypeComposeDefinition,
} from './UnionTypeComposer';
import { TypeStorage } from './TypeStorage';
import { TypeMapper } from './TypeMapper';
import { Resolver, ResolverOpts } from './Resolver';

type ExtraSchemaConfig = {
  types?: GraphQLNamedType[] | null;
  directives?: GraphQLDirective[] | null;
  astNode?: SchemaDefinitionNode | null;
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
      args: {},
      context: TContext,
      info: GraphQLResolveInfo,
    ) => any;
  };
};

export class SchemaComposer<TContext> extends TypeStorage<any, any> {
  public typeMapper: TypeMapper<TContext>;

  public Query: ObjectTypeComposer<any, TContext>;
  public Mutation: ObjectTypeComposer<any, TContext>;
  public Subscription: ObjectTypeComposer<any, TContext>;

  protected _schemaMustHaveTypes: Array<MustHaveTypes<TContext>>;
  protected _directives: GraphQLDirective[];

  public constructor();

  public buildSchema(extraConfig?: ExtraSchemaConfig): GraphQLSchema;

  public addSchemaMustHaveType(type: MustHaveTypes<TContext>): this;

  public removeEmptyTypes(
    tc: ObjectTypeComposer<any, TContext>,
    passedTypes: Set<string>,
  ): void;

  public getOrCreateOTC<TSource = any>(
    typeName: string,
    onCreate?: (tc: ObjectTypeComposer<TSource, TContext>) => any,
  ): ObjectTypeComposer<TSource, TContext>;

  public getOrCreateITC(
    typeName: string,
    onCreate?: (itc: InputTypeComposer<TContext>) => any,
  ): InputTypeComposer<TContext>;

  public getOrCreateETC(
    typeName: string,
    onCreate?: (etc: EnumTypeComposer<TContext>) => any,
  ): EnumTypeComposer<TContext>;

  public getOrCreateIFTC<TSource = any>(
    typeName: string,
    onCreate?: (iftc: InterfaceTypeComposer<TSource, TContext>) => any,
  ): InterfaceTypeComposer<TSource, TContext>;

  public getOrCreateUTC<TSource = any>(
    typeName: string,
    onCreate?: (utc: UnionTypeComposer<TSource, TContext>) => any,
  ): UnionTypeComposer<TSource, TContext>;

  public getOrCreateSTC(
    typeName: string,
    onCreate?: (stc: ScalarTypeComposer<TContext>) => any,
  ): ScalarTypeComposer<TContext>;

  public getOTC<TSource = any>(
    typeName: any,
  ): ObjectTypeComposer<TSource, TContext>;

  public getITC(typeName: any): InputTypeComposer<TContext>;

  public getETC(typeName: any): EnumTypeComposer<TContext>;

  public getIFTC<TSource = any>(
    typeName: any,
  ): InterfaceTypeComposer<TSource, TContext>;

  public getUTC<TSource = any>(
    typeName: any,
  ): UnionTypeComposer<TSource, TContext>;

  public getSTC(typeName: any): ScalarTypeComposer<TContext>;

  public getAnyTC(
    typeName: any,
  ):
    | ObjectTypeComposer<any, TContext>
    | InputTypeComposer<TContext>
    | EnumTypeComposer<TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>
    | ScalarTypeComposer<TContext>;

  public add(typeOrSDL: any): string | null;

  public addAsComposer(typeOrSDL: any): string;

  public addTypeDefs(typeDefs: string): TypeStorage<string, GraphQLNamedType>;

  public addResolveMethods(
    typesFieldsResolve: GraphQLToolsResolveMethods<TContext>,
  ): void;

  public createObjectTC<TSource = any>(
    typeDef: ObjectTypeComposeDefinition<TSource, TContext>,
  ): ObjectTypeComposer<TSource, TContext>;

  public createInputTC(
    typeDef: InputTypeComposeDefinition,
  ): InputTypeComposer<TContext>;

  public createEnumTC(
    typeDef: EnumTypeComposeDefinition,
  ): EnumTypeComposer<TContext>;

  public createInterfaceTC<TSource = any>(
    typeDef: InterfaceTypeComposeDefinition<TSource, TContext>,
  ): InterfaceTypeComposer<TSource, TContext>;

  public createUnionTC<TSource = any>(
    typeDef: UnionTypeComposeDefinition<TSource, TContext>,
  ): UnionTypeComposer<TSource, TContext>;

  public createScalarTC(
    typeDef: ScalarTypeComposeDefinition,
  ): ScalarTypeComposer<TContext>;

  public createResolver<TSource = any, TArgs = ArgsMap>(
    opts: ResolverOpts<TSource, TContext, TArgs>,
  ): Resolver<TSource, TContext, TArgs>;

  public addDirective(directive: GraphQLDirective): this;

  public removeDirective(directive: GraphQLDirective): this;

  public getDirectives(): GraphQLDirective[];

  public hasDirective(directive: string | GraphQLDirective): boolean;
}
