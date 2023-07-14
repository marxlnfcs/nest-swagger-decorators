import {extractOptions, extractString} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";

export function ApiEnumProperty(enumRef: any, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiEnumProperty(enumRef: any, description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiEnumProperty(enumRef: any, descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options, schema ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {}, buildEnumSchema(enumRef) ];
  return applyDecorators(ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: schema.types.length > 0 ? schema.types.join(' or ') : 'unknown',
    example: options?.example || schema.examples.length > 0 ? schema.examples[0].original : null,
    enum: Array.from(new Set(schema.examples.map(e => e.value))),
  })));
}

export function ApiEnumPropertyOptional(enumRef: any, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiEnumPropertyOptional(enumRef: any, description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiEnumPropertyOptional(enumRef: any, descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options, schema ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {}, buildEnumSchema(enumRef) ];
  return applyDecorators(ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, {
    type: schema.types.length > 0 ? schema.types.join(' or ') : 'unknown',
    example: options?.example || schema.examples.length > 0 ? schema.examples[0].original : null,
    enum: Array.from(new Set(schema.examples.map(e => e.value))),
  })));
}

function buildEnumSchema(enumRef: any): { types: Array<string|number>; examples: Array<{ original: string|number, value: string|number }> } {
  const ref = { types: [], examples: [] };
  if(Array.isArray(enumRef)){
    enumRef
      .filter(v => typeof v === 'string' || typeof v === 'number')
      .map(v => {
        if(!ref.types.includes(typeof v)){
          ref.types.push(typeof v);
        }
        ref.examples.push({
          original: v,
          value: v,
        })
      });
  }else{
    Object
      .keys(enumRef)
      .filter(k => isNaN(parseInt(k)))
      .filter(k => typeof enumRef[k] === 'string' || typeof enumRef[k] === 'number')
      .map(k => {
        if(!ref.types.includes(typeof enumRef[k])){
          ref.types.push(typeof enumRef[k]);
        }
        ref.examples.push({
          original: enumRef[k],
          value: enumRef[k],
        })
      })
  }
  return ref;
}