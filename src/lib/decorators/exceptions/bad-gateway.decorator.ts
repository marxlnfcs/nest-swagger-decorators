import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiBadGatewayException(description?: string): MethodDecorator & ClassDecorator;
export function ApiBadGatewayException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiBadGatewayException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(502, ...args));
}