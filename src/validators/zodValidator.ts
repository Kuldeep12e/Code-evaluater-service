import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";


export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error) {
      console.error("Validation failed:", error);
      return res.status(400).json({
        success: false,
        message: "Invalid submission data",
        error,
      });
    }
  };
