import {getApiMetadataTagGroups, getApiMetadataTags} from "../metadata";

export type ApiTagGroup = { name: string; tags: string[]; }
const tagGroupControllers: any[] = [];

/** @internal */
export function addApiTagGroupController(...controllers: any[]){
	tagGroupControllers.push(...controllers.filter(c => !!c));
}

export function getApiTagGroups(order?: string[]): ApiTagGroup[] {

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

	// create sorted tagGroups
	const tagGroupsSorted: ApiTagGroup[] = [];

	// add ordered items first
	for(let o of (order || []).filter(o => !!o) as unknown as string[]){
		tagGroups.filter(g => g.name.trim().toLowerCase() === o.trim().toLowerCase()).map(group => {
			if(!tagGroupsSorted.filter(g => g.name.trim().toLowerCase() === group.name.trim().toLowerCase())){
				tagGroupsSorted.push(group);
			}
		});
	}

	// add unordered groups to array
	tagGroups.sort((a, b) => a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase())).map(group => {
		if(!tagGroupsSorted.filter(g => g.name.trim().toLowerCase() === group.name.trim().toLowerCase())){
			tagGroupsSorted.push(group);
		}
	})

	// return tagGroups
	return tagGroupsSorted;

}