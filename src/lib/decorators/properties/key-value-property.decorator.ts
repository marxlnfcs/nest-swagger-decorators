import { extractOptions, extractString } from "../../utils";
import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "./property.decorator";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function ApiKeyValueProperty(options?: SchemaObject): PropertyDecorator;
export function ApiKeyValueProperty(description?: string, options?: SchemaObject): PropertyDecorator;
export function ApiKeyValueProperty(descriptionOrOptions?: string|SchemaObject, opts?: SchemaObject): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiProperty(description, {
    type: 'object',
    additionalProperties: Object.assign(options)
  }));
}

export function ApiKeyValuePropertyOptional(options?: SchemaObject): PropertyDecorator;
export function ApiKeyValuePropertyOptional(description?: string, options?: SchemaObject): PropertyDecorator;
export function ApiKeyValuePropertyOptional(descriptionOrOptions?: string|SchemaObject, opts?: SchemaObject): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, {
    type: 'object',
    additionalProperties: Object.assign(options)
  }));
}