import { Container } from "inversify";
import IContainer from "@interface/container.interface";
import services from "@config/services";

class ContainerFactory {
  public static create(): IContainer {
    const container = new Container({skipBaseClassChecks: false});
    container.load(services);

    return container;
  }
}

export default ContainerFactory;
