import {Type} from "@nestjs/common";
import {ApiContentType} from "../enums/content-type.enum";
import {ParameterObject, SchemaObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import {ApiHeaderOptions} from "@nestjs/swagger";
import {SwaggerEnumType} from "@nestjs/swagger/dist/types/swagger-enum.type";

export interface IApiBodyOptions{
    type?: Type;
    contentType?: string|string[]|ApiContentType|ApiContentType[];
    isArray?: boolean;
    schema?: SchemaObject;
}

export type IApiHeaderOptions = { [fieldName: string]: Omit<ApiHeaderOptions, 'name'|'in'> };

export interface IApiParamMetadata extends Omit<ParameterObject, 'name'|'in'|'schema'>{
    type?: Type<unknown> | Function | [Function] | string;
    format?: string;
    enum?: SwaggerEnumType;
    enumName?: string;
}
export type IApiParamOptions = { [fieldName: string]: IApiParamMetadata };

export interface IApiQueryMetadata extends Omit<ParameterObject, 'name'|'in'|'schema'> {
    name?: string;
    type?: Type<unknown> | Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
    enumName?: string;
}
export type IApiQueryOptions = { [fieldName: string]: IApiQueryMetadata };