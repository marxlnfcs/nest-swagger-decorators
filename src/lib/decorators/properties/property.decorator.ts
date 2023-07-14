import {
  ApiProperty as _ApiProperty,
  ApiPropertyOptional as _ApiPropertyOptional,
  ApiPropertyOptions
} from "@nestjs/swagger";
import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {IApiPropertyOptions} from "../../interfaces/options.model";

export function ApiProperty(options?: ApiPropertyOptions): PropertyDecorator;
export function ApiProperty(description?: string, options?: ApiPropertyOptions): PropertyDecorator;
export function ApiProperty(...args: any[]): PropertyDecorator;
export function ApiProperty(...args: any[]): PropertyDecorator {
  const options = extractOptions<any>(...args) || {};
  return applyDecorators(_ApiProperty(Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    description: extractString(...args, options?.description),
  })));
}

export function ApiPropertyOptional(options?: Omit<ApiPropertyOptions, 'required'>): PropertyDecorator;
export function ApiPropertyOptional(description?: string, options?: Omit<ApiPropertyOptions, 'required'>): PropertyDecorator;
export function ApiPropertyOptional(...args: any[]): PropertyDecorator;
export function ApiPropertyOptional(...args: any[]): PropertyDecorator {
  const options = extractOptions<any>(...args) || {};
  return applyDecorators(_ApiPropertyOptional(Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    description: extractString(...args, options?.description),
    required: false,
  })));
}