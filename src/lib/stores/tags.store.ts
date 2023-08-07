import {DECORATORS} from "@nestjs/swagger/dist/constants";
import {getApiMetadataTagGroups} from "../metadata";

export type ApiTagGroup = { name: string; tags: string[]; }
const tagGroupControllers: any[] = [];

/** @internal */
export function addApiTagGroupController(controller: any){
	if(!tagGroupControllers.includes(controller)){
		tagGroupControllers.push(controller);
	}
}

// export function addApiTagGroup(groupName: string, tags: string[]): void {
// 	if(!tagGroupsStore.filter(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase()).length){
// 		tagGroupsStore.push({ name: groupName, tags: [] });
// 	}
// 	const group = tagGroupsStore.find(g => g.name.trim().toLowerCase() === group.trim().toLowerCase());
// 	for(let tag of tags){
// 		if(!group.tags.filter(t => t.trim().toLowerCase() === tag.trim().toLowerCase()).length){
// 			group.tags.push(tag);
// 		}
// 	}
// 	group.tags = group.tags.sort();
// }

export function getApiTagGroups(): ApiTagGroup[] {
	const tagGroups: ApiTagGroup[] = [];
	tagGroupControllers.map(controller => {
		try{
			getApiMetadataTagGroups(controller).map(group => {
				if(!tagGroups.filter(g => g.name.trim().toLowerCase() === group.trim().toLowerCase()).length){
					tagGroups.push({ name: group, tags: [] });
				}
			})
			Object.getOwnPropertyNames(controller).map((property) => {
				try{
					const descriptor = Object.getOwnPropertyDescriptor(controller, property);
					(Reflect.getMetadata(DECORATORS.API_TAGS, descriptor.value) || []).map((tag: string) => tagGroups.map(group => {
						if(!group.tags.filter(t => t.trim().toLowerCase() === tag.trim().toLowerCase()).length){
							group.tags.push(tag);
						}
					}));
				}catch{
					// ignore
				}
			});
		}catch{
			// ignore
		}
	});
	return tagGroups;
}