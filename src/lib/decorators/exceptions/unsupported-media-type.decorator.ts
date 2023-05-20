import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiUnsupportedMediaTypeException(description?: string): MethodDecorator & ClassDecorator;
export function ApiUnsupportedMediaTypeException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiUnsupportedMediaTypeException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(415, ...args));
}