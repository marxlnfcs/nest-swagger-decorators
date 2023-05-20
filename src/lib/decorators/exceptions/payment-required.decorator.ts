import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiPaymentRequiredException(description?: string): MethodDecorator & ClassDecorator;
export function ApiPaymentRequiredException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiPaymentRequiredException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(402, ...args));
}