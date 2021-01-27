import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { buildSchema } from "graphql";
import mercurius, { IResolvers, MercuriusLoaders } from "mercurius";
import mercuriusCodegen, { loadSchemaFiles } from "mercurius-codegen";
import pino from "pino";
import { Card, CardMark, Player } from "./graphql/generated";
const AltairFastify = require("altair-fastify-plugin");

const log = pino();

const debug = process.env.NODE_ENV === "development";

export const app = Fastify();

const { schema } = loadSchemaFiles("./src/graphql/schema/**/*.gql", {
  watchOptions: {
    enabled: debug,
    onChange(schema) {
      app.graphql.replaceSchema(buildSchema(schema.join("\n")));
      app.graphql.defineResolvers(resolvers);

      mercuriusCodegen(app, {
        targetPath: "./src/graphql/generated.ts",
        operationsGlob: "./src/graphql/operations/*.gql",
      }).catch((e) => log.error(e));
    },
  },
});

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

const PUBSUB_KEY_PLAYERS = "PUBSUB_KEY_PLAYERS";
const PUBSUB_KEY_CHANGE_PLAYER_DECK = "PUBSUB_KEY_CHANGE_PLAYER_DECK";

let players: Player[] = [];

const resolvers: IResolvers = {
  Query: {},
  Mutation: {
    join(_, { name }, { pubsub }) {
      const player = players.find((p) => p.name === name);
      if (player) return player;

      const newPlayer: Player = { name: name, deck: [] };
      players.push(newPlayer);
      pubsub.publish({
        topic: PUBSUB_KEY_PLAYERS,
        payload: { players },
      });
      return newPlayer;
    },
    leave(_, { name }, { pubsub }) {
      players = players.filter((p) => p.name !== name);
      pubsub.publish({
        topic: PUBSUB_KEY_PLAYERS,
        payload: { players },
      });
      return true;
    },
    start(_, __, { pubsub }) {
      if (players.length === 0) return false;
      players = players.map((p) => {
        p.deck = [];
        return p;
      });

      const marks = Object.entries(CardMark).map(([k, v]) => v);
      let cards = Array.from(Array(53).keys()).map(
        (i): Card => {
          return {
            mark: marks[Math.trunc(i / 13)],
            number: String((i % 13) + 1),
          };
        }
      );
      for (let i = cards.length; 1 < i; i--) {
        const k = Math.floor(Math.random() * i);
        [cards[k], cards[i - 1]] = [cards[i - 1], cards[k]];
      }

      const len = players.length;
      for (let i = 0; i < cards.length; i++) {
        players[i % len].deck.push(cards[i]);
      }

      pubsub.publish({
        topic: PUBSUB_KEY_PLAYERS,
        payload: { players },
      });
      return true;
    },
  },
  Subscription: {
    players: {
      subscribe(_, __, { pubsub }) {
        return pubsub.subscribe(PUBSUB_KEY_PLAYERS);
      },
    },
    changePlayerDeck: {
      subscribe(_, __, { pubsub }) {
        return pubsub.subscribe(PUBSUB_KEY_CHANGE_PLAYER_DECK);
      },
    },
  },
};

const loaders: MercuriusLoaders = {};

app.register(mercurius, {
  schema,
  resolvers,
  loaders,
  context: buildContext,
  subscription: true,
  graphiql: false,
  ide: false,
  path: "/graphql",
});

if (debug) {
  app.register(AltairFastify, {
    path: "/altair",
    baseURL: "/altair/",
    endpointURL: "/graphql",
  });
}

mercuriusCodegen(app, {
  targetPath: "./src/graphql/generated.ts",
  operationsGlob: "./src/graphql/operations/*.gql",
  watchOptions: {
    enabled: debug,
  },
}).catch((e) => log.error(e));

const port = 8000;
log.info(`Listen and serve http://localhost:${port}`);
app.listen(port);
