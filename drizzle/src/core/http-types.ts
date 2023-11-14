import { Request, Response } from 'express';
import { ParamsDictionary, Query, Send } from 'express-serve-static-core';

export interface TypedRequest<T extends Query, V extends ParamsDictionary, U = any> extends Request {
  query: T;
  body: U;
  params: V;
}

export interface TypedResponse<T> extends Response {
  json: Send<T, this>;
}
