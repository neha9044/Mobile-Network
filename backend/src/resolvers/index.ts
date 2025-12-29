import {auth} from "./authResolver";

export default {
  Query: {
    ...auth.Query,
  },
  Mutation: {
    ...auth.Mutation,
  },
};