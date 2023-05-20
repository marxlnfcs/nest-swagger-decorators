import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiPayloadTooLargeException(description?: string): MethodDecorator & ClassDecorator;
export function ApiPayloadTooLargeException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiPayloadTooLargeException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(413, ...args));
}