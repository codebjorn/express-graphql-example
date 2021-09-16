import "reflect-metadata";

import ApolloFactory from "@factory/apollo.factory";
import { ApolloServer } from "apollo-server-express";
import ContainerFactory from "@factory/container.factory";
import DatabaseFactory from "@factory/database.factory";
import { Express } from "express";
import ExpressFactory from "@factory/express.factory";
import IContainer from "@interface/container.interface";
import JwtFactory from "@factory/jwt.factory";

class App {
  private server: Express;
  private container: IContainer;
  private apollo: ApolloServer;

  constructor() {
    this.setServer();
    this.setDatabase();
    this.setContainer();
    this.setJwt();
    this.setApollo();
  }

  public getServer(): Express {
    return this.server;
  }

  public setServer(): void {
    this.server = ExpressFactory.create();
  }

  public async setDatabase(): Promise<void> {
    DatabaseFactory.create();
  }

  public getContainer(): IContainer {
    return this.container;
  }

  public setContainer(): void {
    this.container = ContainerFactory.create();
  }

  public setJwt(): void {
    const data = JwtFactory.create();
    this.server.use(data.path, data.jwt, data.errorHandling);
  }

  public getApollo(): ApolloServer {
    return this.apollo;
  }

  public setApollo(): void {
    this.apollo = ApolloFactory.create(this.server, this.container);
  }

  public listen(): void {
    const port = process.env.APP_PORT;
    this.server.listen(port, () => {
      console.log(`🚀 App listening on the port ${port}`);
    });
  }
}

export default App;
