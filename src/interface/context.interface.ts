import { ExpressContext } from "apollo-server-express";
import IRequest from "./request.interface";

interface IExpressContext extends ExpressContext {
  req: IRequest
}

export default IExpressContext;
