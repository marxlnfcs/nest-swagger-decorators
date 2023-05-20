import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiRequestTimeoutException(description?: string): MethodDecorator & ClassDecorator;
export function ApiRequestTimeoutException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiRequestTimeoutException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(408, ...args));
}