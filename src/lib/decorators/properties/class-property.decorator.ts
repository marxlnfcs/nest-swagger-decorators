import {extractOptions, extractString, resolveClassRef} from "../../utils";
import {applyDecorators} from "@nestjs/common";
import {ApiProperty, ApiPropertyOptional} from "./property.decorator";
import {IApiPropertyOptions, IApiTypedOptionalOptions, IApiTypedOptions} from "../../interfaces/options.model";
import {IApiClassRefSingle, IApiClassRefSingleList} from "../../interfaces/types.model";

export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, description?: string, options?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassProperty(classRef: IApiClassRefSingle|IApiClassRefSingleList, descriptionOrOptions?: string|Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
    const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ]
    return applyDecorators(
        ApiProperty(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, { type: resolveClassRef(classRef) }))
    );
}

export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, description?: string, options?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator;
export function ApiClassPropertyOptional(classRef: IApiClassRefSingle|IApiClassRefSingleList, descriptionOrOptions?: string|Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>, opts?: Omit<IApiTypedOptionalOptions, 'type'|'enum'|'enumName'|'schema'>): PropertyDecorator {
    const [ description, options ] = [ extractString(descriptionOrOptions, opts?.description), extractOptions(descriptionOrOptions, opts) || {} ]
    return applyDecorators(
        ApiPropertyOptional(description, Object.assign<IApiPropertyOptions, IApiPropertyOptions>(options, { type: resolveClassRef(classRef) }))
    );
}