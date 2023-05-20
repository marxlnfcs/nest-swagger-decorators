import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiMethodNotAllowedException(description?: string): MethodDecorator & ClassDecorator;
export function ApiMethodNotAllowedException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiMethodNotAllowedException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(405, ...args));
}