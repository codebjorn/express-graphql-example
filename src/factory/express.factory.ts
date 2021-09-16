import express, { Express } from "express";

class ExpressFactory {
  public static create(): Express {
    return express();
  }
}

export default ExpressFactory;
