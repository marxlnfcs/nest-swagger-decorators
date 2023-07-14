import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiAnyProperty(options?: IApiTypedOptions): PropertyDecorator;
export function ApiAnyProperty(description?: string, options?: IApiTypedOptions): PropertyDecorator;
export function ApiAnyProperty(descriptionOrOptions?: string|IApiTypedOptions, opts?: IApiTypedOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'any'
  })));
}

export function ApiAnyPropertyOptional(options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiAnyPropertyOptional(description?: string, options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiAnyPropertyOptional(descriptionOrOptions?: string|IApiTypedOptionalOptions, opts?: IApiTypedOptionalOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'any'
  })));
}