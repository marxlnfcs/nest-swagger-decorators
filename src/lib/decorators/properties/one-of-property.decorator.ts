import {extractOptions, extractString} from "../../utils";
import {applyDecorators, Type} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";
import {ApiExtraModels} from "@nestjs/swagger";

export function ApiOneOfProperty(oneOf: Type[], options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiOneOfProperty(oneOf: Type[], description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiOneOfProperty(oneOf: Type[], descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) ];
  return applyDecorators(
    ApiExtraModels(...oneOf),
    ApiProperty(description, Object.assign(options, {
      schema: oneOf.map(o => ({ $ref: `#/components/schemas/${o.name}` }))
    }))
  );
}

export function ApiOneOfPropertyOptional(oneOf: Type[], options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiOneOfPropertyOptional(oneOf: Type[], description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator;
export function ApiOneOfPropertyOptional(oneOf: Type[], descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(
    ApiExtraModels(...oneOf),
    ApiPropertyOptional(description, Object.assign(options, {
      schema: oneOf.map(o => ({ $ref: `#/components/schemas/${o.name}` }))
    }))
  );
}