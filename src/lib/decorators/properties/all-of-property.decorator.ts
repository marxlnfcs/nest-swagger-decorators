import {extractOptions, extractString} from "../../utils";
import {applyDecorators, Type} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";
import {ApiExtraModels} from "@nestjs/swagger";

export function ApiAllOffProperty(allOf: Type[], options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiAllOffProperty(allOf: Type[], description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiAllOffProperty(allOf: Type[], descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) ];
  return applyDecorators(
    ApiExtraModels(...allOf),
    ApiProperty(description, Object.assign(options, {
      schema: allOf.map(o => ({ $ref: `#/components/schemas/${o.name}` }))
    }))
  );
}

export function ApiAllOffPropertyOptional(allOf: Type[], options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiAllOffPropertyOptional(allOf: Type[], description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiAllOffPropertyOptional(allOf: Type[], descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(
    ApiExtraModels(...allOf),
    ApiPropertyOptional(description, Object.assign(options, {
      schema: allOf.map(o => ({ $ref: `#/components/schemas/${o.name}` }))
    }))
  );
}