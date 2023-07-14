import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiBooleanProperty(options?: IApiTypedOptions): PropertyDecorator;
export function ApiBooleanProperty(description?: string, options?: IApiTypedOptions): PropertyDecorator;
export function ApiBooleanProperty(descriptionOrOptions?: string|IApiTypedOptions, opts?: IApiTypedOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'boolean'
  })));
}

export function ApiBooleanPropertyOptional(options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiBooleanPropertyOptional(description?: string, options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiBooleanPropertyOptional(descriptionOrOptions?: string|IApiTypedOptionalOptions, opts?: IApiTypedOptionalOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'boolean'
  })));
}