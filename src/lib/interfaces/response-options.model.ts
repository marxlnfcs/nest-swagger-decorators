import {Type} from "@nestjs/common";
import {SchemaObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import {ApiContentType} from "../enums/content-type.enum";

export interface IApiResponseOptions{
    status?: number;
    type?: Type;
    description?: string;
    contentType?: string|string[]|ApiContentType|ApiContentType[];
    isArray?: boolean;
    schema?: SchemaObject;
}
