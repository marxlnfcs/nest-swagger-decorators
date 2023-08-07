import 'reflect-metadata';

/** @internal */
const ApiMetadataExceptionsKey = Symbol('Api Exceptions Store');
const ApiMetadataApiGroupsKey = Symbol('Api Tag Groups Store');

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

/** @internal */
export function getApiMetadataTagGroups(target: any, propertyKey?: string): string[] {
  return Reflect.getMetadata(ApiMetadataApiGroupsKey, target, propertyKey) || [];
}

/** @internal */
export function setApiMetadataTagGroups(tagGroups: string[], target: any, propertyKey?: string) {
  Reflect.defineMetadata(ApiMetadataApiGroupsKey, tagGroups.map(g => g.trim()).sort(), target, propertyKey);
}

/** @internal */
export function addApiMetadataTagGroups(tagGroups: string[], target: any, propertyKey?: string) {
  const groups = getApiMetadataTagGroups(target, propertyKey);
  for(let group of tagGroups.filter(g => !!g)){
    if(!groups.map(g => g.trim().toLowerCase()).includes(group.trim().toLowerCase())){
      groups.push(group.trim());
    }
  }
  setApiMetadataTagGroups(groups, target, propertyKey);
}