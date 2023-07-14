import {extractClassRef, extractOptions, extractString, getExtraModelReference} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";
import {IApiClassRefSingle, IApiClassRefSingleList} from "../../interfaces/types.model";
import {ApiExtraModels} from "@nestjs/swagger";

export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
  const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
  const models = extractClassRef(classRef);
  return applyDecorators(
      ApiExtraModels(...Array.isArray(models) ? models : [models]),
      ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, !Array.isArray(models)
        ? { $ref: getExtraModelReference(models) } as any
        : { type: 'array', items: { $ref: getExtraModelReference(models[0]) } }
      ))
  );
}

export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
    const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ];
    const models = extractClassRef(classRef);
    return applyDecorators(
        ApiExtraModels(...Array.isArray(models) ? models : [models]),
        ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, !Array.isArray(models)
            ? { $ref: getExtraModelReference(models) } as any
            : { type: 'array', items: { $ref: getExtraModelReference(models[0]) } }
        ))
    );
}