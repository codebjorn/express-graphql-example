import graphQLConfig from "@config/graphql";
import jwt from "express-jwt";
class JwtFactory {
  /* eslint @typescript-eslint/no-explicit-any: "off" */
  public static create(): Record<string, any> {
    return {
      path: graphQLConfig.path,
      jwt: jwt({
        secret: graphQLConfig.authSecret,
        algorithms: ["HS256"],
        credentialsRequired: false,
      }),
      errorHandling: (err, req, res, next) => {
        if (err.code === "invalid_token") return next();
        return next(err);
      },
    };
  }
}

export default JwtFactory;
