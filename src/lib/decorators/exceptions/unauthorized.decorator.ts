import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiUnauthorizedException(description?: string): MethodDecorator & ClassDecorator;
export function ApiUnauthorizedException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiUnauthorizedException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(401, ...args));
}