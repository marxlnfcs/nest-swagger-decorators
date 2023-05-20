import {IApiDefinedExceptionOptions} from "../../interfaces/options.model";
import {applyDecorators} from "@nestjs/common";
import {ApiException} from "./exception.decorator";

export function ApiUnprocessableEntityException(description?: string): MethodDecorator & ClassDecorator;
export function ApiUnprocessableEntityException(options?: IApiDefinedExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiUnprocessableEntityException(...args: any[]): MethodDecorator & ClassDecorator {
  return applyDecorators(ApiException(422, ...args));
}