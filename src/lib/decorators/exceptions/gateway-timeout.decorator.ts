import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiGatewayTimeoutException(description?: string): MethodDecorator & ClassDecorator;
export function ApiGatewayTimeoutException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiGatewayTimeoutException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(504, ...args));
}