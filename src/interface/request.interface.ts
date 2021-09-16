import { Request } from "express";

interface IRequest extends Request {
  user: string;
}

export default IRequest;
