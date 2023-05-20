import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiForbiddenException(description?: string): MethodDecorator & ClassDecorator;
export function ApiForbiddenException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiForbiddenException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(403, ...args));
}