import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiStringProperty(options?: IApiTypedOptions): PropertyDecorator;
export function ApiStringProperty(description?: string, options?: IApiTypedOptions): PropertyDecorator;
export function ApiStringProperty(descriptionOrOptions?: string|IApiTypedOptions, opts?: IApiTypedOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'string'
  })));
}

export function ApiStringPropertyOptional(options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiStringPropertyOptional(description?: string, options?: IApiTypedOptionalOptions): PropertyDecorator;
export function ApiStringPropertyOptional(descriptionOrOptions?: string|IApiTypedOptionalOptions, opts?: IApiTypedOptionalOptions): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: 'string'
  })));
}