import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiServiceUnavailableException(description?: string): MethodDecorator & ClassDecorator;
export function ApiServiceUnavailableException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiServiceUnavailableException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(503, ...args));
}