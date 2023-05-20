import {ApiResponse} from "@nestjs/swagger";
import {IApiExceptionOptions} from "../../interfaces/options.model";
import {extractOptions, extractStatus, extractString, getStatusMessage, isNumber} from "../../utils";
import {getApiMetadataExceptions, setApiMetadataExceptions} from "../../metadata";

export function ApiException(options?: IApiExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiException(status: number, options?: IApiExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiException(status: number, options?: IApiExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiException(status: number, description?: string, options?: IApiExceptionOptions): MethodDecorator & ClassDecorator;
export function ApiException(...args: any[]): MethodDecorator & ClassDecorator;
export function ApiException(...args: any[]){
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){

    // get status and options
    const options = extractOptions<any>(...args) || {};
    const status = extractStatus(null, ...args, options?.status);
    const description = extractString(...args);

    // skip if status is null
    if(!isNumber(status)){
      return;
    }

    // get metadata
    const exceptions = getApiMetadataExceptions(target, propertyKey);

    // add code if not exists
    if(!exceptions[status]){
      exceptions[status] = [];
    }

    // add message
    if(options.description && !exceptions[status].filter(m => m.trim().toLowerCase() === options.description.trim().toLowerCase()).length){
      exceptions[status].push(description || options.description);
    }

    // save metadata
    setApiMetadataExceptions(exceptions, target, propertyKey);

    // create response object
    const response: any = {
      status: status,
      description: exceptions[status].length ? exceptions[status].join('|') : getStatusMessage(status),
      type: options?.type,
      isArray: options?.isArray,
      schema: options?.schema,
    };

    // add response
    ApiResponse(response)(target, propertyKey, descriptor);

  }
}
