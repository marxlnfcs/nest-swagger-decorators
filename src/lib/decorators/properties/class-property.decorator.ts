import {extractOptions, extractString} from "../../utils";
import {applyDecorators, Type} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiClassProperty(classRef: Type|[Type], options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: Type|[Type], description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: Type|[Type], descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) ];
  return applyDecorators(ApiProperty(description, Object.assign(options, {
    type: classRef
  })));
}

export function ApiClassPropertyOptional(classRef: Type|[Type], options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: Type|[Type], description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: Type|[Type], descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign(options, {
    type: classRef
  })));
}