import {HttpException, RequestMethod, Type} from "@nestjs/common";
import {IApiClassRef, IApiClassRefSingle, IApiClassRefSingleList} from "./interfaces/types.model";
import {getSchemaPath} from "@nestjs/swagger";

export function getApiSchemaPath<T>(classRef: IApiClassRefSingle|IApiClassRefSingleList): string {
  return getSchemaPath(classRef as any);
}

/** @internal */
export function isNil(source: any): source is null {
  return source === undefined || source === null;
}

/** @internal */
export function isObject<T extends object>(source: T|any): source is T {
  return source !== undefined && source !== null && !Array.isArray(source) && typeof source === 'object';
}

/** @internal */
export function isFunction<T extends Function>(source: T|any): source is T {
  return typeof source === 'function';
}

/** @internal */
export function isArray<T>(source: T[]|any): source is T[] {
  return Array.isArray(source);
}

/** @internal */
export function isString(source: any): source is string {
  return typeof source === 'string';
}

/** @internal */
export function isNumber(source: any): source is number {
  return typeof source === 'number';
}

/** @internal */
export function isBoolean(source: any): source is boolean {
  return typeof source === 'boolean';
}

/** @internal */
export function isFalse(source: any): source is false {
  return isBoolean(source) && source === false;
}

/** @internal */
export function extractPath(...args: any[]): string|string[] {
  return args.find(r => isString(r) || Array.isArray(r)) || '';
}

/** @internal */
export function extractOptions<T = any>(...args: any[]): T|false {
  return args.find(r => !isNil(r) && isObject(r) && !Array.isArray(r)) ?? false;
}

/** @internal */
export function extractStatus(method: RequestMethod|null, ...args: any[]): number|null {
  const defaultStatus = method === RequestMethod.POST ? 201 : 200;
  return args.find(r => isNumber(r)) || defaultStatus;
}

/** @internal */
export function extractString(...args: any[]): string|null {
  return args.find(r => isString(r)) || null;
}

/** @internal */
export function isClass(v: any): v is Type {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}

/** @internal */
export function extractClassRef(v: IApiClassRef): any {
  if(v === undefined || v === null){
    return null;
  }else if(Array.isArray(v)){
    return v.map((e: any) => extractClassRef(e));
  }else if(isClass(v)){
    return v;
  }else if(typeof v === 'function'){
    return extractClassRef(v());
  }
}

/** @internal */
export function flatten(...items: any[]): any[] {
  const list: any[] = [];
  items.map(item => {
    if(Array.isArray(item)){
      list.push(...flatten(...item));
    }else{
      list.push(item);
    }
  });
  return list;
}

/** @internal */
export function getStatusMessage(status: number): string {
  switch(status){
    // 2xx success
    case 200: return 'OK';
    case 201: return 'Created';
    case 202: return 'Accepted';
    case 204: return 'No Content';
    case 205: return 'Reset Content';
    case 206: return 'Partial Content';
    case 207: return 'Multi-Status';
    case 208: return 'Already Reported';
    case 226: return 'IM Used';

    // 3xx redirection
    case 300: return 'Multiple Choices';
    case 301: return 'Moved Permanently';
    case 302: return 'Found';
    case 303: return 'See Other';
    case 304: return 'Not Modified';
    case 305: return 'Use Proxy';
    case 306: return 'Switch Proxy';
    case 307: return 'Temporary Redirect';
    case 308: return 'Permanent Redirect';

    // 4xx client errors
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 402: return 'Payment Required';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 405: return 'Method Not Allowed';
    case 406: return 'Not Acceptable';
    case 407: return 'Proxy Authentication Required';
    case 408: return 'Request Timeout';
    case 409: return 'Conflict';
    case 410: return 'Gone';
    case 411: return 'Length Required';
    case 412: return 'Precondition Failed';
    case 413: return 'Payload Too Large';
    case 414: return 'URI Too Long';
    case 415: return 'Unsupported Media Type';
    case 416: return 'Range Not Satisfiable';
    case 417: return 'Expectation Failed';
    case 418: return 'I\'m a teapot';
    case 421: return 'Misdirected Request';
    case 422: return 'Unprocessable Entity';
    case 423: return 'Locked';
    case 424: return 'Failed Dependency';
    case 425: return 'Too Early';
    case 426: return 'Upgrade Required';
    case 428: return 'Precondition Required';
    case 429: return 'Too Many Request';
    case 431: return 'Request Header Fields Too Large';
    case 451: return 'Unavailable For Legal Reasons';

    // 5xx server errors
    case 500: return 'Internal Server Error';
    case 501: return 'Not Implemented';
    case 502: return 'Bad Gateway';
    case 503: return 'Service Unavailable';
    case 504: return 'Gateway Timeout';
    case 505: return 'HTTP Version Not Supported';
    case 506: return 'Variant Also Negotiates';
    case 507: return 'Insufficient Storage';
    case 508: return 'Loop Detected';
    case 510: return 'Not Extended';
    case 511: return 'Network Authentication Required';
  }
}

/** @internal */
export function createHttpError(exception: Type<Error|HttpException>): Error|HttpException {
  return transformException(new exception());
}

/** @internal */
export function createHttpErrorFromException(exception: Error|HttpException): Error|HttpException {
  return transformException(exception);
}

/** @internal */
export function transformException(exception: Error|HttpException): Error|HttpException {
  return exception;
}

/** @internal */
export function resolveClassRef(type: any): any {
  if(Array.isArray(type)){
    type.map(t => {
      if(typeof t === 'function' && !t.name){
        Object.defineProperty(t, 'name', { value: 'type', configurable: true });
      }
    })
  }else if(typeof type === 'function' && !type.name){
    Object.defineProperty(type, 'name', { value: 'type', configurable: true });
  }
  return type;
}