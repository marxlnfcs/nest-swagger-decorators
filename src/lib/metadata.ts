import 'reflect-metadata';

/** @internal */
const ApiMetadataExceptionsKey = Symbol('Api Exceptions Store');

/** @internal */
export interface IApiMetadataExceptions {
  [status: number]: string[];
}

/** @internal */
export function getApiMetadataExceptions(target: any, propertyKey?: string): IApiMetadataExceptions {
  return Reflect.getMetadata(ApiMetadataExceptionsKey, target, propertyKey) || {};
}

/** @internal */
export function setApiMetadataExceptions(exceptions: IApiMetadataExceptions, target: any, propertyKey?: string) {
  Reflect.defineMetadata(ApiMetadataExceptionsKey, exceptions, target, propertyKey);
}