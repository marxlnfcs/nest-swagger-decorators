import {addApiMetadataTagGroups} from "../metadata";
import {addApiTagGroupController} from "../stores/tags.store";

export function ApiTagGroups(...groups: string[]): MethodDecorator & ClassDecorator {
	return function (target: any, propertyKey?: string): void {
		addApiMetadataTagGroups(groups, propertyKey ? target : target.prototype);
		addApiTagGroupController(propertyKey ? target : target.prototype);
	}
}