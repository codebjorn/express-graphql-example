import AuthResolver from "@resolver/auth.resolver";
import UserResolver from "@resolver/user.resolver";

const graphQLConfig = {
  path: "/gql",
  authSecret: process.env.AUTH_SECRET,
  resolvers: [AuthResolver, UserResolver] as const,
};

export default graphQLConfig;
