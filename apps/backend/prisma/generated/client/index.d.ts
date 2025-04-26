
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SaleData
 * 
 */
export type SaleData = $Result.DefaultSelection<Prisma.$SaleDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SaleData
 * const saleData = await prisma.saleData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SaleData
   * const saleData = await prisma.saleData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.saleData`: Exposes CRUD operations for the **SaleData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SaleData
    * const saleData = await prisma.saleData.findMany()
    * ```
    */
  get saleData(): Prisma.SaleDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SaleData: 'SaleData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "saleData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SaleData: {
        payload: Prisma.$SaleDataPayload<ExtArgs>
        fields: Prisma.SaleDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          findFirst: {
            args: Prisma.SaleDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          findMany: {
            args: Prisma.SaleDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>[]
          }
          create: {
            args: Prisma.SaleDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          createMany: {
            args: Prisma.SaleDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>[]
          }
          delete: {
            args: Prisma.SaleDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          update: {
            args: Prisma.SaleDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          deleteMany: {
            args: Prisma.SaleDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>[]
          }
          upsert: {
            args: Prisma.SaleDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SaleDataPayload>
          }
          aggregate: {
            args: Prisma.SaleDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaleData>
          }
          groupBy: {
            args: Prisma.SaleDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleDataCountArgs<ExtArgs>
            result: $Utils.Optional<SaleDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    saleData?: SaleDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SaleData
   */

  export type AggregateSaleData = {
    _count: SaleDataCountAggregateOutputType | null
    _avg: SaleDataAvgAggregateOutputType | null
    _sum: SaleDataSumAggregateOutputType | null
    _min: SaleDataMinAggregateOutputType | null
    _max: SaleDataMaxAggregateOutputType | null
  }

  export type SaleDataAvgAggregateOutputType = {
    saleDataId: number | null
    price: number | null
  }

  export type SaleDataSumAggregateOutputType = {
    saleDataId: number | null
    price: number | null
  }

  export type SaleDataMinAggregateOutputType = {
    saleDataId: number | null
    userId: string | null
    price: number | null
    universityName: string | null
    facultyName: string | null
    departmentName: string | null
    className: string | null
    explanation: string | null
    Features1: string | null
    Features2: string | null
    Features3: string | null
    someday: string | null
  }

  export type SaleDataMaxAggregateOutputType = {
    saleDataId: number | null
    userId: string | null
    price: number | null
    universityName: string | null
    facultyName: string | null
    departmentName: string | null
    className: string | null
    explanation: string | null
    Features1: string | null
    Features2: string | null
    Features3: string | null
    someday: string | null
  }

  export type SaleDataCountAggregateOutputType = {
    saleDataId: number
    userId: number
    price: number
    universityName: number
    facultyName: number
    departmentName: number
    className: number
    explanation: number
    Features1: number
    Features2: number
    Features3: number
    someday: number
    _all: number
  }


  export type SaleDataAvgAggregateInputType = {
    saleDataId?: true
    price?: true
  }

  export type SaleDataSumAggregateInputType = {
    saleDataId?: true
    price?: true
  }

  export type SaleDataMinAggregateInputType = {
    saleDataId?: true
    userId?: true
    price?: true
    universityName?: true
    facultyName?: true
    departmentName?: true
    className?: true
    explanation?: true
    Features1?: true
    Features2?: true
    Features3?: true
    someday?: true
  }

  export type SaleDataMaxAggregateInputType = {
    saleDataId?: true
    userId?: true
    price?: true
    universityName?: true
    facultyName?: true
    departmentName?: true
    className?: true
    explanation?: true
    Features1?: true
    Features2?: true
    Features3?: true
    someday?: true
  }

  export type SaleDataCountAggregateInputType = {
    saleDataId?: true
    userId?: true
    price?: true
    universityName?: true
    facultyName?: true
    departmentName?: true
    className?: true
    explanation?: true
    Features1?: true
    Features2?: true
    Features3?: true
    someday?: true
    _all?: true
  }

  export type SaleDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleData to aggregate.
     */
    where?: SaleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleData to fetch.
     */
    orderBy?: SaleDataOrderByWithRelationInput | SaleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SaleData
    **/
    _count?: true | SaleDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleDataMaxAggregateInputType
  }

  export type GetSaleDataAggregateType<T extends SaleDataAggregateArgs> = {
        [P in keyof T & keyof AggregateSaleData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaleData[P]>
      : GetScalarType<T[P], AggregateSaleData[P]>
  }




  export type SaleDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleDataWhereInput
    orderBy?: SaleDataOrderByWithAggregationInput | SaleDataOrderByWithAggregationInput[]
    by: SaleDataScalarFieldEnum[] | SaleDataScalarFieldEnum
    having?: SaleDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleDataCountAggregateInputType | true
    _avg?: SaleDataAvgAggregateInputType
    _sum?: SaleDataSumAggregateInputType
    _min?: SaleDataMinAggregateInputType
    _max?: SaleDataMaxAggregateInputType
  }

  export type SaleDataGroupByOutputType = {
    saleDataId: number
    userId: string
    price: number
    universityName: string
    facultyName: string
    departmentName: string
    className: string
    explanation: string
    Features1: string
    Features2: string
    Features3: string
    someday: string
    _count: SaleDataCountAggregateOutputType | null
    _avg: SaleDataAvgAggregateOutputType | null
    _sum: SaleDataSumAggregateOutputType | null
    _min: SaleDataMinAggregateOutputType | null
    _max: SaleDataMaxAggregateOutputType | null
  }

  type GetSaleDataGroupByPayload<T extends SaleDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleDataGroupByOutputType[P]>
            : GetScalarType<T[P], SaleDataGroupByOutputType[P]>
        }
      >
    >


  export type SaleDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDataId?: boolean
    userId?: boolean
    price?: boolean
    universityName?: boolean
    facultyName?: boolean
    departmentName?: boolean
    className?: boolean
    explanation?: boolean
    Features1?: boolean
    Features2?: boolean
    Features3?: boolean
    someday?: boolean
  }, ExtArgs["result"]["saleData"]>

  export type SaleDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDataId?: boolean
    userId?: boolean
    price?: boolean
    universityName?: boolean
    facultyName?: boolean
    departmentName?: boolean
    className?: boolean
    explanation?: boolean
    Features1?: boolean
    Features2?: boolean
    Features3?: boolean
    someday?: boolean
  }, ExtArgs["result"]["saleData"]>

  export type SaleDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    saleDataId?: boolean
    userId?: boolean
    price?: boolean
    universityName?: boolean
    facultyName?: boolean
    departmentName?: boolean
    className?: boolean
    explanation?: boolean
    Features1?: boolean
    Features2?: boolean
    Features3?: boolean
    someday?: boolean
  }, ExtArgs["result"]["saleData"]>

  export type SaleDataSelectScalar = {
    saleDataId?: boolean
    userId?: boolean
    price?: boolean
    universityName?: boolean
    facultyName?: boolean
    departmentName?: boolean
    className?: boolean
    explanation?: boolean
    Features1?: boolean
    Features2?: boolean
    Features3?: boolean
    someday?: boolean
  }

  export type SaleDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"saleDataId" | "userId" | "price" | "universityName" | "facultyName" | "departmentName" | "className" | "explanation" | "Features1" | "Features2" | "Features3" | "someday", ExtArgs["result"]["saleData"]>

  export type $SaleDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SaleData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      saleDataId: number
      userId: string
      price: number
      universityName: string
      facultyName: string
      departmentName: string
      className: string
      explanation: string
      Features1: string
      Features2: string
      Features3: string
      someday: string
    }, ExtArgs["result"]["saleData"]>
    composites: {}
  }

  type SaleDataGetPayload<S extends boolean | null | undefined | SaleDataDefaultArgs> = $Result.GetResult<Prisma.$SaleDataPayload, S>

  type SaleDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleDataCountAggregateInputType | true
    }

  export interface SaleDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SaleData'], meta: { name: 'SaleData' } }
    /**
     * Find zero or one SaleData that matches the filter.
     * @param {SaleDataFindUniqueArgs} args - Arguments to find a SaleData
     * @example
     * // Get one SaleData
     * const saleData = await prisma.saleData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleDataFindUniqueArgs>(args: SelectSubset<T, SaleDataFindUniqueArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SaleData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleDataFindUniqueOrThrowArgs} args - Arguments to find a SaleData
     * @example
     * // Get one SaleData
     * const saleData = await prisma.saleData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleDataFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataFindFirstArgs} args - Arguments to find a SaleData
     * @example
     * // Get one SaleData
     * const saleData = await prisma.saleData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleDataFindFirstArgs>(args?: SelectSubset<T, SaleDataFindFirstArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SaleData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataFindFirstOrThrowArgs} args - Arguments to find a SaleData
     * @example
     * // Get one SaleData
     * const saleData = await prisma.saleData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleDataFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SaleData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SaleData
     * const saleData = await prisma.saleData.findMany()
     * 
     * // Get first 10 SaleData
     * const saleData = await prisma.saleData.findMany({ take: 10 })
     * 
     * // Only select the `saleDataId`
     * const saleDataWithSaleDataIdOnly = await prisma.saleData.findMany({ select: { saleDataId: true } })
     * 
     */
    findMany<T extends SaleDataFindManyArgs>(args?: SelectSubset<T, SaleDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SaleData.
     * @param {SaleDataCreateArgs} args - Arguments to create a SaleData.
     * @example
     * // Create one SaleData
     * const SaleData = await prisma.saleData.create({
     *   data: {
     *     // ... data to create a SaleData
     *   }
     * })
     * 
     */
    create<T extends SaleDataCreateArgs>(args: SelectSubset<T, SaleDataCreateArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SaleData.
     * @param {SaleDataCreateManyArgs} args - Arguments to create many SaleData.
     * @example
     * // Create many SaleData
     * const saleData = await prisma.saleData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleDataCreateManyArgs>(args?: SelectSubset<T, SaleDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SaleData and returns the data saved in the database.
     * @param {SaleDataCreateManyAndReturnArgs} args - Arguments to create many SaleData.
     * @example
     * // Create many SaleData
     * const saleData = await prisma.saleData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SaleData and only return the `saleDataId`
     * const saleDataWithSaleDataIdOnly = await prisma.saleData.createManyAndReturn({
     *   select: { saleDataId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleDataCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SaleData.
     * @param {SaleDataDeleteArgs} args - Arguments to delete one SaleData.
     * @example
     * // Delete one SaleData
     * const SaleData = await prisma.saleData.delete({
     *   where: {
     *     // ... filter to delete one SaleData
     *   }
     * })
     * 
     */
    delete<T extends SaleDataDeleteArgs>(args: SelectSubset<T, SaleDataDeleteArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SaleData.
     * @param {SaleDataUpdateArgs} args - Arguments to update one SaleData.
     * @example
     * // Update one SaleData
     * const saleData = await prisma.saleData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleDataUpdateArgs>(args: SelectSubset<T, SaleDataUpdateArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SaleData.
     * @param {SaleDataDeleteManyArgs} args - Arguments to filter SaleData to delete.
     * @example
     * // Delete a few SaleData
     * const { count } = await prisma.saleData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDataDeleteManyArgs>(args?: SelectSubset<T, SaleDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SaleData
     * const saleData = await prisma.saleData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleDataUpdateManyArgs>(args: SelectSubset<T, SaleDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SaleData and returns the data updated in the database.
     * @param {SaleDataUpdateManyAndReturnArgs} args - Arguments to update many SaleData.
     * @example
     * // Update many SaleData
     * const saleData = await prisma.saleData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SaleData and only return the `saleDataId`
     * const saleDataWithSaleDataIdOnly = await prisma.saleData.updateManyAndReturn({
     *   select: { saleDataId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SaleDataUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SaleData.
     * @param {SaleDataUpsertArgs} args - Arguments to update or create a SaleData.
     * @example
     * // Update or create a SaleData
     * const saleData = await prisma.saleData.upsert({
     *   create: {
     *     // ... data to create a SaleData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SaleData we want to update
     *   }
     * })
     */
    upsert<T extends SaleDataUpsertArgs>(args: SelectSubset<T, SaleDataUpsertArgs<ExtArgs>>): Prisma__SaleDataClient<$Result.GetResult<Prisma.$SaleDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SaleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataCountArgs} args - Arguments to filter SaleData to count.
     * @example
     * // Count the number of SaleData
     * const count = await prisma.saleData.count({
     *   where: {
     *     // ... the filter for the SaleData we want to count
     *   }
     * })
    **/
    count<T extends SaleDataCountArgs>(
      args?: Subset<T, SaleDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SaleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleDataAggregateArgs>(args: Subset<T, SaleDataAggregateArgs>): Prisma.PrismaPromise<GetSaleDataAggregateType<T>>

    /**
     * Group by SaleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleDataGroupByArgs['orderBy'] }
        : { orderBy?: SaleDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SaleData model
   */
  readonly fields: SaleDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SaleData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SaleData model
   */
  interface SaleDataFieldRefs {
    readonly saleDataId: FieldRef<"SaleData", 'Int'>
    readonly userId: FieldRef<"SaleData", 'String'>
    readonly price: FieldRef<"SaleData", 'Int'>
    readonly universityName: FieldRef<"SaleData", 'String'>
    readonly facultyName: FieldRef<"SaleData", 'String'>
    readonly departmentName: FieldRef<"SaleData", 'String'>
    readonly className: FieldRef<"SaleData", 'String'>
    readonly explanation: FieldRef<"SaleData", 'String'>
    readonly Features1: FieldRef<"SaleData", 'String'>
    readonly Features2: FieldRef<"SaleData", 'String'>
    readonly Features3: FieldRef<"SaleData", 'String'>
    readonly someday: FieldRef<"SaleData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SaleData findUnique
   */
  export type SaleDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter, which SaleData to fetch.
     */
    where: SaleDataWhereUniqueInput
  }

  /**
   * SaleData findUniqueOrThrow
   */
  export type SaleDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter, which SaleData to fetch.
     */
    where: SaleDataWhereUniqueInput
  }

  /**
   * SaleData findFirst
   */
  export type SaleDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter, which SaleData to fetch.
     */
    where?: SaleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleData to fetch.
     */
    orderBy?: SaleDataOrderByWithRelationInput | SaleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleData.
     */
    cursor?: SaleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleData.
     */
    distinct?: SaleDataScalarFieldEnum | SaleDataScalarFieldEnum[]
  }

  /**
   * SaleData findFirstOrThrow
   */
  export type SaleDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter, which SaleData to fetch.
     */
    where?: SaleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleData to fetch.
     */
    orderBy?: SaleDataOrderByWithRelationInput | SaleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SaleData.
     */
    cursor?: SaleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SaleData.
     */
    distinct?: SaleDataScalarFieldEnum | SaleDataScalarFieldEnum[]
  }

  /**
   * SaleData findMany
   */
  export type SaleDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter, which SaleData to fetch.
     */
    where?: SaleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SaleData to fetch.
     */
    orderBy?: SaleDataOrderByWithRelationInput | SaleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SaleData.
     */
    cursor?: SaleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SaleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SaleData.
     */
    skip?: number
    distinct?: SaleDataScalarFieldEnum | SaleDataScalarFieldEnum[]
  }

  /**
   * SaleData create
   */
  export type SaleDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * The data needed to create a SaleData.
     */
    data: XOR<SaleDataCreateInput, SaleDataUncheckedCreateInput>
  }

  /**
   * SaleData createMany
   */
  export type SaleDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SaleData.
     */
    data: SaleDataCreateManyInput | SaleDataCreateManyInput[]
  }

  /**
   * SaleData createManyAndReturn
   */
  export type SaleDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * The data used to create many SaleData.
     */
    data: SaleDataCreateManyInput | SaleDataCreateManyInput[]
  }

  /**
   * SaleData update
   */
  export type SaleDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * The data needed to update a SaleData.
     */
    data: XOR<SaleDataUpdateInput, SaleDataUncheckedUpdateInput>
    /**
     * Choose, which SaleData to update.
     */
    where: SaleDataWhereUniqueInput
  }

  /**
   * SaleData updateMany
   */
  export type SaleDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SaleData.
     */
    data: XOR<SaleDataUpdateManyMutationInput, SaleDataUncheckedUpdateManyInput>
    /**
     * Filter which SaleData to update
     */
    where?: SaleDataWhereInput
    /**
     * Limit how many SaleData to update.
     */
    limit?: number
  }

  /**
   * SaleData updateManyAndReturn
   */
  export type SaleDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * The data used to update SaleData.
     */
    data: XOR<SaleDataUpdateManyMutationInput, SaleDataUncheckedUpdateManyInput>
    /**
     * Filter which SaleData to update
     */
    where?: SaleDataWhereInput
    /**
     * Limit how many SaleData to update.
     */
    limit?: number
  }

  /**
   * SaleData upsert
   */
  export type SaleDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * The filter to search for the SaleData to update in case it exists.
     */
    where: SaleDataWhereUniqueInput
    /**
     * In case the SaleData found by the `where` argument doesn't exist, create a new SaleData with this data.
     */
    create: XOR<SaleDataCreateInput, SaleDataUncheckedCreateInput>
    /**
     * In case the SaleData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleDataUpdateInput, SaleDataUncheckedUpdateInput>
  }

  /**
   * SaleData delete
   */
  export type SaleDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
    /**
     * Filter which SaleData to delete.
     */
    where: SaleDataWhereUniqueInput
  }

  /**
   * SaleData deleteMany
   */
  export type SaleDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SaleData to delete
     */
    where?: SaleDataWhereInput
    /**
     * Limit how many SaleData to delete.
     */
    limit?: number
  }

  /**
   * SaleData without action
   */
  export type SaleDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SaleData
     */
    select?: SaleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SaleData
     */
    omit?: SaleDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SaleDataScalarFieldEnum: {
    saleDataId: 'saleDataId',
    userId: 'userId',
    price: 'price',
    universityName: 'universityName',
    facultyName: 'facultyName',
    departmentName: 'departmentName',
    className: 'className',
    explanation: 'explanation',
    Features1: 'Features1',
    Features2: 'Features2',
    Features3: 'Features3',
    someday: 'someday'
  };

  export type SaleDataScalarFieldEnum = (typeof SaleDataScalarFieldEnum)[keyof typeof SaleDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SaleDataWhereInput = {
    AND?: SaleDataWhereInput | SaleDataWhereInput[]
    OR?: SaleDataWhereInput[]
    NOT?: SaleDataWhereInput | SaleDataWhereInput[]
    saleDataId?: IntFilter<"SaleData"> | number
    userId?: StringFilter<"SaleData"> | string
    price?: IntFilter<"SaleData"> | number
    universityName?: StringFilter<"SaleData"> | string
    facultyName?: StringFilter<"SaleData"> | string
    departmentName?: StringFilter<"SaleData"> | string
    className?: StringFilter<"SaleData"> | string
    explanation?: StringFilter<"SaleData"> | string
    Features1?: StringFilter<"SaleData"> | string
    Features2?: StringFilter<"SaleData"> | string
    Features3?: StringFilter<"SaleData"> | string
    someday?: StringFilter<"SaleData"> | string
  }

  export type SaleDataOrderByWithRelationInput = {
    saleDataId?: SortOrder
    userId?: SortOrder
    price?: SortOrder
    universityName?: SortOrder
    facultyName?: SortOrder
    departmentName?: SortOrder
    className?: SortOrder
    explanation?: SortOrder
    Features1?: SortOrder
    Features2?: SortOrder
    Features3?: SortOrder
    someday?: SortOrder
  }

  export type SaleDataWhereUniqueInput = Prisma.AtLeast<{
    saleDataId?: number
    AND?: SaleDataWhereInput | SaleDataWhereInput[]
    OR?: SaleDataWhereInput[]
    NOT?: SaleDataWhereInput | SaleDataWhereInput[]
    userId?: StringFilter<"SaleData"> | string
    price?: IntFilter<"SaleData"> | number
    universityName?: StringFilter<"SaleData"> | string
    facultyName?: StringFilter<"SaleData"> | string
    departmentName?: StringFilter<"SaleData"> | string
    className?: StringFilter<"SaleData"> | string
    explanation?: StringFilter<"SaleData"> | string
    Features1?: StringFilter<"SaleData"> | string
    Features2?: StringFilter<"SaleData"> | string
    Features3?: StringFilter<"SaleData"> | string
    someday?: StringFilter<"SaleData"> | string
  }, "saleDataId">

  export type SaleDataOrderByWithAggregationInput = {
    saleDataId?: SortOrder
    userId?: SortOrder
    price?: SortOrder
    universityName?: SortOrder
    facultyName?: SortOrder
    departmentName?: SortOrder
    className?: SortOrder
    explanation?: SortOrder
    Features1?: SortOrder
    Features2?: SortOrder
    Features3?: SortOrder
    someday?: SortOrder
    _count?: SaleDataCountOrderByAggregateInput
    _avg?: SaleDataAvgOrderByAggregateInput
    _max?: SaleDataMaxOrderByAggregateInput
    _min?: SaleDataMinOrderByAggregateInput
    _sum?: SaleDataSumOrderByAggregateInput
  }

  export type SaleDataScalarWhereWithAggregatesInput = {
    AND?: SaleDataScalarWhereWithAggregatesInput | SaleDataScalarWhereWithAggregatesInput[]
    OR?: SaleDataScalarWhereWithAggregatesInput[]
    NOT?: SaleDataScalarWhereWithAggregatesInput | SaleDataScalarWhereWithAggregatesInput[]
    saleDataId?: IntWithAggregatesFilter<"SaleData"> | number
    userId?: StringWithAggregatesFilter<"SaleData"> | string
    price?: IntWithAggregatesFilter<"SaleData"> | number
    universityName?: StringWithAggregatesFilter<"SaleData"> | string
    facultyName?: StringWithAggregatesFilter<"SaleData"> | string
    departmentName?: StringWithAggregatesFilter<"SaleData"> | string
    className?: StringWithAggregatesFilter<"SaleData"> | string
    explanation?: StringWithAggregatesFilter<"SaleData"> | string
    Features1?: StringWithAggregatesFilter<"SaleData"> | string
    Features2?: StringWithAggregatesFilter<"SaleData"> | string
    Features3?: StringWithAggregatesFilter<"SaleData"> | string
    someday?: StringWithAggregatesFilter<"SaleData"> | string
  }

  export type SaleDataCreateInput = {
    saleDataId: number
    userId: string
    price: number
    universityName: string
    facultyName: string
    departmentName: string
    className: string
    explanation: string
    Features1: string
    Features2: string
    Features3: string
    someday: string
  }

  export type SaleDataUncheckedCreateInput = {
    saleDataId: number
    userId: string
    price: number
    universityName: string
    facultyName: string
    departmentName: string
    className: string
    explanation: string
    Features1: string
    Features2: string
    Features3: string
    someday: string
  }

  export type SaleDataUpdateInput = {
    saleDataId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    universityName?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    departmentName?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    Features1?: StringFieldUpdateOperationsInput | string
    Features2?: StringFieldUpdateOperationsInput | string
    Features3?: StringFieldUpdateOperationsInput | string
    someday?: StringFieldUpdateOperationsInput | string
  }

  export type SaleDataUncheckedUpdateInput = {
    saleDataId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    universityName?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    departmentName?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    Features1?: StringFieldUpdateOperationsInput | string
    Features2?: StringFieldUpdateOperationsInput | string
    Features3?: StringFieldUpdateOperationsInput | string
    someday?: StringFieldUpdateOperationsInput | string
  }

  export type SaleDataCreateManyInput = {
    saleDataId: number
    userId: string
    price: number
    universityName: string
    facultyName: string
    departmentName: string
    className: string
    explanation: string
    Features1: string
    Features2: string
    Features3: string
    someday: string
  }

  export type SaleDataUpdateManyMutationInput = {
    saleDataId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    universityName?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    departmentName?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    Features1?: StringFieldUpdateOperationsInput | string
    Features2?: StringFieldUpdateOperationsInput | string
    Features3?: StringFieldUpdateOperationsInput | string
    someday?: StringFieldUpdateOperationsInput | string
  }

  export type SaleDataUncheckedUpdateManyInput = {
    saleDataId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    universityName?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    departmentName?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    explanation?: StringFieldUpdateOperationsInput | string
    Features1?: StringFieldUpdateOperationsInput | string
    Features2?: StringFieldUpdateOperationsInput | string
    Features3?: StringFieldUpdateOperationsInput | string
    someday?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type SaleDataCountOrderByAggregateInput = {
    saleDataId?: SortOrder
    userId?: SortOrder
    price?: SortOrder
    universityName?: SortOrder
    facultyName?: SortOrder
    departmentName?: SortOrder
    className?: SortOrder
    explanation?: SortOrder
    Features1?: SortOrder
    Features2?: SortOrder
    Features3?: SortOrder
    someday?: SortOrder
  }

  export type SaleDataAvgOrderByAggregateInput = {
    saleDataId?: SortOrder
    price?: SortOrder
  }

  export type SaleDataMaxOrderByAggregateInput = {
    saleDataId?: SortOrder
    userId?: SortOrder
    price?: SortOrder
    universityName?: SortOrder
    facultyName?: SortOrder
    departmentName?: SortOrder
    className?: SortOrder
    explanation?: SortOrder
    Features1?: SortOrder
    Features2?: SortOrder
    Features3?: SortOrder
    someday?: SortOrder
  }

  export type SaleDataMinOrderByAggregateInput = {
    saleDataId?: SortOrder
    userId?: SortOrder
    price?: SortOrder
    universityName?: SortOrder
    facultyName?: SortOrder
    departmentName?: SortOrder
    className?: SortOrder
    explanation?: SortOrder
    Features1?: SortOrder
    Features2?: SortOrder
    Features3?: SortOrder
    someday?: SortOrder
  }

  export type SaleDataSumOrderByAggregateInput = {
    saleDataId?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}