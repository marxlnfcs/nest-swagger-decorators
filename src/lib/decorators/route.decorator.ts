import {
  createHttpError,
  createHttpErrorFromException,
  extractOptions,
  extractPath,
  extractStatus,
  getStatusMessage,
  isArray,
  isFalse,
  isFunction,
  isObject,
  isString
} from "../utils";
import {applyDecorators, HttpCode, HttpException, RequestMapping, RequestMethod, Type} from "@nestjs/common";
import {IApiRouteOptions, IApiRoutePath} from "../interfaces/options.model";
import {
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import {IApiBodyOptions} from "../interfaces/request-options.model";
import {IApiResponseOptions} from "../interfaces/response-options.model";
import {ApiTagGroups} from "./tag-group.decorator";

export function ApiAll(status?: number): MethodDecorator;
export function ApiAll(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiAll(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiAll(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.ALL, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiGet(status?: number): MethodDecorator;
export function ApiGet(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiGet(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiGet(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.GET, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiPost(status?: number): MethodDecorator;
export function ApiPost(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiPost(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiPost(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.POST, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiPatch(status?: number): MethodDecorator;
export function ApiPatch(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiPatch(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiPatch(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.PATCH, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiPut(status?: number): MethodDecorator;
export function ApiPut(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiPut(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiPut(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.PUT, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiDelete(status?: number): MethodDecorator;
export function ApiDelete(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiDelete(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiDelete(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.DELETE, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiHead(status?: number): MethodDecorator;
export function ApiHead(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiHead(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiHead(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.HEAD, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

export function ApiOptions(status?: number): MethodDecorator;
export function ApiOptions(options?: IApiRouteOptions|false, status?: number): MethodDecorator;
export function ApiOptions(path?: IApiRoutePath, options?: Omit<IApiRouteOptions, 'path'>|false, status?: number): MethodDecorator;
export function ApiOptions(pathOrOptionsOrStatus?: IApiRoutePath|IApiRouteOptions|number|false, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|number|false, statusNumber?: number): MethodDecorator {
  return ApiRoute(RequestMethod.OPTIONS, pathOrOptionsOrStatus, statusOrOptions, statusNumber);
}

/** @internal */
function ApiRoute(method: RequestMethod, pathOrStatusOrOptions?: IApiRoutePath|IApiRouteOptions|false|number, statusOrOptions?: Omit<IApiRouteOptions, 'path'>|false|number, statusNumber?: number): MethodDecorator {
  return function(target, propertyKey, descriptor) {

    // resolve path and options
    const options = extractOptions<IApiRouteOptions>(pathOrStatusOrOptions, statusOrOptions);
    const path: string|string[] = extractPath(pathOrStatusOrOptions, options ? options.path : null);
    const status: number = extractStatus(method, pathOrStatusOrOptions, statusOrOptions, isObject(options as any) && isObject((options as any)?.response) ? (options as any).response.status : null, statusNumber);

    // create array for decorators to add
    const decorators: any[] = [];

    // add route to decorators
    decorators.push(RequestMapping({
      path: path,
      method: method,
    }));

    // exclude endpoint if the options equals FALSE
    if(isFalse(options)){
      decorators.push(ApiExcludeEndpoint());
    }

    // add swagger decorators
    if(!isFalse(options)){

      // set http status code
      decorators.push(HttpCode(status));

      // set operation and/or description
      if(isString(options.summary) || isString(options.description)){
        decorators.push(ApiOperation({
          summary: options.summary,
          description: options.description,
        }));
      }

      // set tags
      if(isArray(options?.tags)){
        decorators.push(ApiTags(...options.tags));
      }

      // set tagGroups
      if(isArray(options?.tagGroups)){
        decorators.push(ApiTagGroups(...options.tagGroups));
      }

      // set headers
      if(isObject(options.header)){
        Object.entries(options.header).map(([fieldName, declaration]) => {
          decorators.push(ApiHeader(Object.assign(declaration || {}, {
            name: fieldName
          })));
        });
      }

      // set params
      if(isObject(options.params)){
        Object.entries(options.params).map(([fieldName, declaration]) => {
          decorators.push(ApiParam(Object.assign(declaration || {}, {
            name: fieldName
          })));
        });
      }

      // set query
      if(isObject(options.query)){
        Object.entries(options.query).map(([fieldName, declaration]) => {
          decorators.push(ApiQuery(Object.assign(declaration || {}, {
            name: fieldName
          })));
        });
      }

      // set body
      switch(true){
        case isObject(options.body): {
          const body: IApiBodyOptions = options.body as any;
          if(body.contentType){
            decorators.push(ApiConsumes(...(isArray(body.contentType) ? body.contentType.filter(c => !!c) : [body.contentType])));
          }
          decorators.push(ApiBody({
            type: body.type,
            isArray: body.isArray,
            schema: body.schema,
          }));
          break;
        }
        case isFunction(options.body): {
          decorators.push(ApiBody({
            type: options.body as any,
          }));
          break;
        }
        case isArray(options.body): {
          const body: [Type] = options.body as any;
          const type: Type = body.length > 0 ? body[0] || null : null;
          if(type){
            decorators.push(ApiBody({
              type: type,
              isArray: true,
            }));
          }
          break;
        }
      }

      // set response
      switch(true){
        case isObject(options.response): {
          const response: IApiResponseOptions = options.response as any;
          if(response.contentType){
            decorators.push(ApiProduces(...(isArray(response.contentType) ? response.contentType.filter(c => !!c) : [response.contentType])));
          }
          decorators.push(ApiResponse({
            status: status,
            description: getStatusMessage(status),
            type: response.type,
            isArray: response.isArray,
            schema: response.schema,
          }));
          break;
        }
        case isFunction(options.response): {
          decorators.push(ApiResponse({
            status: status,
            description: getStatusMessage(status),
            type: options.response as any,
          }));
          break;
        }
        case isArray(options.response): {
          const response: [Type] = options.response as any;
          const type: Type = response.length > 0 ? response[0] || null : null;
          if(type){
            decorators.push(ApiResponse({
              status: status,
              description: getStatusMessage(status),
              type: type,
              isArray: true,
            }));
          }
          break;
        }
      }

      // set response errors
      if(isArray(options.errors)){
        options.errors.filter(e => !!e).map(error => {
          const exception = error instanceof HttpException ? createHttpErrorFromException(error) : createHttpError(error);
          if(exception instanceof HttpException){
            decorators.push(ApiResponse({
              status: exception.getStatus(),
              description: getStatusMessage(exception.getStatus())
            }));
          }else{
            // unsupported
          }
        });
      }

    }

    // apply decorators
    applyDecorators(...decorators)(target, propertyKey, descriptor);

  }
}