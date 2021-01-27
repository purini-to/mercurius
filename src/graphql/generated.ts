import { MercuriusContext } from "mercurius";
import { FastifyReply } from "fastify";
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<DeepPartial<TResult>> | DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CardMark {
  DIAMOND = "DIAMOND",
  HEART = "HEART",
  CLUB = "CLUB",
  SPADE = "SPADE",
  JOKER = "JOKER",
}

export type Card = {
  __typename?: "Card";
  mark: CardMark;
  number: Scalars["String"];
};

export type Player = {
  __typename?: "Player";
  name: Scalars["String"];
  deck: Array<Card>;
};

export type Query = {
  __typename?: "Query";
  players: Array<Player>;
};

export type Mutation = {
  __typename?: "Mutation";
  join: Player;
  leave: Scalars["Boolean"];
  start: Scalars["Boolean"];
};

export type MutationjoinArgs = {
  name: Scalars["String"];
};

export type MutationleaveArgs = {
  name: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  players: Array<Player>;
  changePlayerDeck: Player;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CardMark: CardMark;
  Card: ResolverTypeWrapper<Card>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Player: ResolverTypeWrapper<Player>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Card: Card;
  String: Scalars["String"];
  Player: Player;
  Query: {};
  Mutation: {};
  Boolean: Scalars["Boolean"];
  Subscription: {};
};

export type CardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"]
> = {
  mark?: Resolver<ResolversTypes["CardMark"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Player"] = ResolversParentTypes["Player"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  deck?: Resolver<Array<ResolversTypes["Card"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  players?: Resolver<Array<ResolversTypes["Player"]>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  join?: Resolver<
    ResolversTypes["Player"],
    ParentType,
    ContextType,
    RequireFields<MutationjoinArgs, "name">
  >;
  leave?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationleaveArgs, "name">
  >;
  start?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  players?: SubscriptionResolver<
    Array<ResolversTypes["Player"]>,
    "players",
    ParentType,
    ContextType
  >;
  changePlayerDeck?: SubscriptionResolver<
    ResolversTypes["Player"],
    "changePlayerDeck",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: FastifyReply;
  }
) => Promise<Array<DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = MercuriusContext & { reply: FastifyReply }
> {
  Card?: {
    mark?: LoaderResolver<CardMark, Card, {}, TContext>;
    number?: LoaderResolver<Scalars["String"], Card, {}, TContext>;
  };

  Player?: {
    name?: LoaderResolver<Scalars["String"], Player, {}, TContext>;
    deck?: LoaderResolver<Array<Card>, Player, {}, TContext>;
  };
}
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;

interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

declare module "mercurius" {
  interface IResolvers extends Resolvers<MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
