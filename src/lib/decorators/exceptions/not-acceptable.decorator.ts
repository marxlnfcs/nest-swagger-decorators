import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiNotAcceptableException(description?: string): MethodDecorator & ClassDecorator;
export function ApiNotAcceptableException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiNotAcceptableException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(406, ...args));
}