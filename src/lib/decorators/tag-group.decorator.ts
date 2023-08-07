import {addApiMetadataTagGroups} from "../metadata";
import {addApiTagGroupController} from "../stores/tags.store";

export function ApiTagGroups(...groups: string[]): MethodDecorator & ClassDecorator {
	return function (target: any, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>): void {
		addApiMetadataTagGroups(groups, target, descriptor);
		addApiTagGroupController(propertyKey ? target : target.prototype);
	}
}