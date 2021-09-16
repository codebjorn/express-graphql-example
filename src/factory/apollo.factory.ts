import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import IContainer from "@interface/container.interface";
import IExpressContext from "@interface/context.interface";
import { UserPayload } from "@interface/userService.interface";
import { buildSchema } from "type-graphql";
import graphQLConfig from "@config/graphql";

class ApolloFactory {
  private server: Express;
  private container: IContainer;
  private apollo: ApolloServer;

  constructor(server: Express, container: IContainer) {
    this.server = server;
    this.container = container;
  }

  public static create(server: Express, container: IContainer): ApolloServer {
    const self = new this(server, container);

    self.createApollo().then(() => {
      self.startApollo();
    });

    return self.getApollo();
  }

  private getApollo(): ApolloServer {
    return this.apollo;
  }

  private async createApollo(): Promise<void> {
    const schema = await buildSchema({
      resolvers: graphQLConfig.resolvers,
      container: this.container,
      authChecker: this.authApollo,
    });

    this.apollo = new ApolloServer({
      schema,
      context: ({ req }: IExpressContext) => {
        const context = {
          req,
          user: req.user,
        };
        return context;
      },
    });
  }

  private authApollo({ context }, rolesOrPerms: string[]) {
    if (!context.user) throw new Error("User must be logged in");
    const user: UserPayload = context.user;

    const hasAccess = rolesOrPerms.some(
      (roleOrPerm: string) =>
        roleOrPerm === user.role.name ||
        user.role.permissions.includes(roleOrPerm)
    );

    return hasAccess;
  }

  private async startApollo(): Promise<this> {
    await this.apollo.start();
    this.apollo.applyMiddleware({ app: this.server, path: graphQLConfig.path });
    return this;
  }
}

export default ApolloFactory;
