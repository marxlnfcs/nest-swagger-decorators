import {getApiMetadataTagGroups, getApiMetadataTags} from "../metadata";

export type ApiTagGroup = { name: string; tags: string[]; }
const tagGroupControllers: any[] = [];

/** @internal */
export function addApiTagGroupController(...controllers: any[]){
	tagGroupControllers.push(...controllers.filter(c => !!c));
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

	// create array for tagGroups
	const tagGroups: ApiTagGroup[] = [];

	// process controllers
	tagGroupControllers.map(controller => {

		// get groups and tags from controller
		const controllerGroups: string[] = [ ...getApiMetadataTagGroups(controller), ...getApiMetadataTagGroups(controller?.constructor) ];
		const controllerTags: string[] = getApiMetadataTags(controller);

		// add groups
		controllerGroups.map(groupName => {
			if(!tagGroups.filter(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase()).length){
				tagGroups.push({ name: groupName, tags: [] });
			}
		});

		// add tags
		controllerGroups.map(groupName => {
			const group = tagGroups.find(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase());
			controllerTags.map(tag => {
				if(!group.tags.filter(t => t.trim().toLowerCase() === tag.trim().toLowerCase()).length){
					group.tags.push(tag);
				}
			})
		});

		// process controller properties
		Object.getOwnPropertyNames(controller).map(prop => Object.getOwnPropertyDescriptor(controller, prop)).map(descriptor => {

			// get groups and tags from descriptor
			const propertyGroups: string[] = getApiMetadataTagGroups(controller, descriptor);
			const propertyTags: string[] = getApiMetadataTags(controller, descriptor);

			// add groups
			propertyGroups.map(groupName => {
				if(!tagGroups.filter(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase()).length){
					tagGroups.push({ name: groupName, tags: [] });
				}
			});

			// add tags
			([ ...controllerGroups, ...propertyGroups ]).map(groupName => {
				const group = tagGroups.find(g => g.name.trim().toLowerCase() === groupName.trim().toLowerCase());
				propertyTags.map(tag => {
					if(!group.tags.filter(t => t.trim().toLowerCase() === tag.trim().toLowerCase()).length){
						group.tags.push(tag);
					}
				})
			});

		});

	});

	// return tagGroups
	return tagGroups;

}