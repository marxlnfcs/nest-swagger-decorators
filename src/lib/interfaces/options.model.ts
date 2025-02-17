import { HttpException, Type } from "@nestjs/common";
import { IApiBodyOptions, IApiHeaderOptions, IApiParamOptions, IApiQueryOptions } from "./request-options.model";
import { IApiResponseOptions } from "./response-options.model";
import { ApiResponseOptions } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { ApiPropertyOptions } from "@nestjs/swagger";
import { IApiRouteLike } from "./types.model";
import {
    EnumAllowedTypes,
    SchemaObjectMetadata
} from "@nestjs/swagger/dist/interfaces/schema-object-metadata.interface";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export interface IApiRouteOptions {

    // path
    path?: IApiRouteLike;

    // operation
    summary?: string;
    description?: string;

    // tags
    tags?: string[],
    tagGroups?: string[];

    // body, query and params
    body?: [Type] | Type | IApiBodyOptions;
    header?: IApiHeaderOptions;
    params?: IApiParamOptions;
    query?: IApiQueryOptions;

    // response
    response?: Type[] | Type | IApiResponseOptions;

    // error codes
    errors?: Array<Type<HttpException> | HttpException>;

}

export interface IApiControllerOptions {

    // path
    path?: IApiRouteLike;

    // tags
    tagGroups?: string[];
    tags?: string[],

    // header, query and params
    header?: IApiHeaderOptions;
    params?: IApiParamOptions;
    query?: IApiQueryOptions;

}

export interface IApiExceptionOptions extends Omit<ApiResponseOptions, 'status'> {
    status?: number;
}
export type IApiDefinedExceptionOptions = Omit<IApiExceptionOptions, 'status'>;

interface IApiSchemaObjectCommonMetadata extends Omit<SchemaObject, 'type' | 'required' | 'properties' | 'enum'> {
    isArray?: boolean;
    name?: string;
    enum?: EnumAllowedTypes;
}

export type IApiPropertyOptions = ApiPropertyOptions | IApiPropertyOptionsCustom;
export type IApiPropertyOptionsCustom = (IApiSchemaObjectCommonMetadata & {
    type?: any;
    required?: boolean;
});

export type IApiTypedOptions = Omit<IApiPropertyOptions, 'type'>;
export type IApiTypedOptionalOptions = Omit<IApiPropertyOptions, 'type'|'required'>;