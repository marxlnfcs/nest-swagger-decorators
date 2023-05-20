import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiPreConditionFailedException(description?: string): MethodDecorator & ClassDecorator;
export function ApiPreConditionFailedException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiPreConditionFailedException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(428, ...args));
}