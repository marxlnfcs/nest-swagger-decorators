import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiNotImplementedException(description?: string): MethodDecorator & ClassDecorator;
export function ApiNotImplementedException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiNotImplementedException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(501, ...args));
}