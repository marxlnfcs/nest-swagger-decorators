import {applyDecorators, Controller} from "@nestjs/common";
import {IApiControllerOptions} from "../interfaces/options.model";
import {ApiExcludeController, ApiHeader, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {extractOptions, extractPath, isArray, isFalse, isObject} from "../utils";
import {ApiTagGroups} from "./tag-group.decorator";
import { IApiRouteLike } from "../interfaces/types.model";

export function ApiController(options?: IApiControllerOptions|false): ClassDecorator;
export function ApiController(prefix: IApiRouteLike, options?: Omit<IApiControllerOptions, 'path'>|false): ClassDecorator;
export function ApiController(prefixOrOptions: IApiRouteLike|IApiControllerOptions|false, opts?: IApiControllerOptions|false): ClassDecorator {
  return function(target: Function) {

    // resolve path and options
    const options = extractOptions<IApiControllerOptions>(prefixOrOptions, opts);
    const path = extractPath(prefixOrOptions, options ? options.path : null);

    // create array for decorators
    const decorators: any[] = [];

    // add controller to decorators
    decorators.push(Controller(path));

    // exclude controller if options equals FALSE
    if(isFalse(options)){
      decorators.push(ApiExcludeController());
    }

    // add swagger decorators
    if(!isFalse(options)){

      // set tags
      if(isArray(options?.tags)){
        decorators.push(ApiTags(...options.tags));
      }

      // set tagGroup
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

      // set params
      if(isObject(options.query)){
        Object.entries(options.query).map(([fieldName, declaration]) => {
          decorators.push(ApiQuery(Object.assign(declaration || {}, {
            name: fieldName
          })));
        });
      }

    }

    // apply decorators
    applyDecorators(...decorators)(target);

  }
}