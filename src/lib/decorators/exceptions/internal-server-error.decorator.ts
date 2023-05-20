import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiInternalServerErrorException(description?: string): MethodDecorator & ClassDecorator;
export function ApiInternalServerErrorException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiInternalServerErrorException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(500, ...args));
}