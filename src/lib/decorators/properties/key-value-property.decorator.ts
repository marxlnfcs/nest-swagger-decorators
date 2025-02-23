import { extractClassRef, extractOptions, extractString, getApiSchemaPath, resolveClassRef } from "../../utils";
import { applyDecorators, Type } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "./property.decorator";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { IApiClassRefSingle } from "../../interfaces/types.model";
import { ApiExtraModels } from "@nestjs/swagger";

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

export function ApiKeyValueClassProperty(classRef: IApiClassRefSingle, options?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator;
export function ApiKeyValueClassProperty(classRef: IApiClassRefSingle, description?: string, options?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator;
export function ApiKeyValueClassProperty(classRef: IApiClassRefSingle, descriptionOrOptions?: string|Omit<SchemaObject, 'type'|'$ref'>, opts?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(
    function(target: any) {
      const ctor = typeof target === 'function' ? target : target.constructor;
      ApiExtraModels(extractClassRef(classRef), ctor);
    },
    ApiProperty(description, {
      type: 'object',
      additionalProperties: Object.assign(options, {
        $ref: getApiSchemaPath(classRef),
      })
    })
  );
}

export function ApiKeyValueClassPropertyOptional(classRef: IApiClassRefSingle, options?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator;
export function ApiKeyValueClassPropertyOptional(classRef: IApiClassRefSingle, description?: string, options?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator;
export function ApiKeyValueClassPropertyOptional(classRef: IApiClassRefSingle, descriptionOrOptions?: string|Omit<SchemaObject, 'type'|'$ref'>, opts?: Omit<SchemaObject, 'type'|'$ref'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(
    function(target: any) {
      const ctor = typeof target === 'function' ? target : target.constructor;
      ApiExtraModels(extractClassRef(classRef), ctor);
    },
    ApiPropertyOptional(description, {
      type: 'object',
      additionalProperties: Object.assign(options, {
        $ref: getApiSchemaPath(classRef),
      })
    })
  );
}