import { Request } from "express";

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email:string;
    password:string;
}

export interface TokenPayload {
  id: string;
  role: string;
}

export interface authenticatedRequest extends Request {
  user: TokenPayload;
}