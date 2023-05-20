import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiBadRequestException(description?: string): MethodDecorator & ClassDecorator;
export function ApiBadRequestException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiBadRequestException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(400, ...args));
}