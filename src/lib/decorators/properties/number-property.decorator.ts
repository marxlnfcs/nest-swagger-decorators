import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiNumberProperty(options?: IApiTypedOptions): PropertyDecorator;
export function ApiNumberProperty(description?: string, options?: IApiTypedOptions): PropertyDecorator;
export function ApiNumberProperty(descriptionOrOptions?: string|IApiTypedOptions, opts?: IApiTypedOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) ];
  return applyDecorators(ApiProperty(description, Object.assign(options, {
    type: 'number'
  })));
}

export function ApiNumberPropertyOptional(options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiNumberPropertyOptional(description?: string, options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiNumberPropertyOptional(descriptionOrOptions?: string|IApiTypedOptionalOptions, opts?: IApiTypedOptionalOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign(options, {
    type: 'number'
  })));
}