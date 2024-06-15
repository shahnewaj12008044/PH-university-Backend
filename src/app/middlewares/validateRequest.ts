import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationRequest = (shema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await shema.parseAsync({
          body: req.body,
      });
      next();
      } catch (err) {
        next(err);
      }
    };
  };

  export default validationRequest;
  