import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiTooManyRequestsException(description?: string): MethodDecorator & ClassDecorator;
export function ApiTooManyRequestsException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiTooManyRequestsException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(429, ...args));
}