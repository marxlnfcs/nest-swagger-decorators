import 'reflect-metadata';
import {DECORATORS} from "@nestjs/swagger/dist/constants";

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
export function getApiMetadataTags(target: any, descriptor?: PropertyDescriptor): string[] {
  try{
    return Reflect.getMetadata(DECORATORS.API_TAGS, descriptor ? descriptor.value : target) || [];
  }catch{
    return [];
  }
}

/** @internal */
export function getApiMetadataTagGroups(target: any, descriptor?: PropertyDescriptor): string[] {
  try{
    return Reflect.getMetadata(ApiMetadataApiGroupsKey, descriptor ? descriptor.value : target) || [];
  }catch{
    return [];
  }
}

/** @internal */
export function setApiMetadataTagGroups(tagGroups: string[], target: any, descriptor?: PropertyDescriptor) {
  try{
    Reflect.defineMetadata(ApiMetadataApiGroupsKey, tagGroups.map(g => g.trim()).sort(), descriptor ? descriptor.value : target);
  }catch{
    // ignore
  }
}

/** @internal */
export function addApiMetadataTagGroups(tagGroups: string[], target: any, descriptor?: PropertyDescriptor) {
  const groups = getApiMetadataTagGroups(target, descriptor);
  for(let group of tagGroups.filter(g => !!g)){
    if(!groups.map(g => g.trim().toLowerCase()).includes(group.trim().toLowerCase())){
      groups.push(group.trim());
    }
  }
  setApiMetadataTagGroups(groups, target, descriptor);
}