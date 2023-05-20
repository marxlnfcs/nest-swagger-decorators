import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiNotFoundException(description?: string): MethodDecorator & ClassDecorator;
export function ApiNotFoundException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiNotFoundException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(404, ...args));
}