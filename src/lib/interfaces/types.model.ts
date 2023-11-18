import {Type} from "@nestjs/common";

export type IApiClassRefSingleDef = Type;
export type IApiClassRefSingleDefFn = () => Type;
export type IApiClassRefSingle = IApiClassRefSingleDef|IApiClassRefSingleDefFn;
export type IApiClassRefSingleListDef = [Type];
export type IApiClassRefSingleListDefFn = [() => Type]|(() => [Type]);
export type IApiClassRefSingleList = IApiClassRefSingleListDef|IApiClassRefSingleListDefFn;
export type IApiClassRefListDef = Type[];
export type IApiClassRefListDefFn = [() => Type[]]|(() => Type[]);
export type IApiClassRefList = IApiClassRefListDef|IApiClassRefListDefFn;

export type IApiClassRef = IApiClassRefSingle|IApiClassRefList|IApiClassRefSingleList;