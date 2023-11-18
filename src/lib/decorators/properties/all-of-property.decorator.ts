import { extractClassRef, extractOptions, extractString, flatten, getApiSchemaPath } from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";
import {ApiExtraModels} from "@nestjs/swagger";
import {IApiClassRefList} from "../../interfaces/types.model";

export function ApiAllOfProperty(allOf: IApiClassRefList, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiAllOfProperty(allOf: IApiClassRefList, description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiAllOfProperty(allOf: IApiClassRefList, descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  const models = flatten(extractClassRef(allOf));
  return applyDecorators(
      function(target){
          ApiExtraModels(...models)(target?.constructor || target)
      },
      ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
          type: 'array',
          items: {
              allOf: models.map(o => ({ $ref: getApiSchemaPath(o) })),
          }
      }))
  );
}

export function ApiAllOfPropertyOptional(allOf: IApiClassRefList, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiAllOfPropertyOptional(allOf: IApiClassRefList, description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiAllOfPropertyOptional(allOf: IApiClassRefList, descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  const models = flatten(extractClassRef(allOf));
  return applyDecorators(
      function(target){
          ApiExtraModels(...models)(target?.constructor || target)
      },
      ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
          type: 'array',
          items: {
              allOf: models.map(o => ({ $ref: getApiSchemaPath(o) })),
          }
      }))
  );
}