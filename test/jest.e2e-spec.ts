import {ApiController, ApiGet} from "../src";
import {getApiTagGroups} from "../src/lib/stores/tags.store";

@ApiController({
  tags: ['Tag1', 'Tag2'],
  tagGroups: ['Group1', 'Group2']
})
export class Controller1 {
  @ApiGet({
    tags: ['Tag3', 'Tag4'],
    tagGroups: ['Group3', 'Group4']
  })
  route1() {}

  @ApiGet({
    tags: ['Tag5', 'Tag6'],
    tagGroups: ['Group5']
  })
  route2() {}
}

describe('Testing Library', () => {
  const groups = getApiTagGroups();

  // check if tagGroups are equals a special length
  describe('Testing tagGroups', () => {
    it('tagGroups.length should be 5', async () => {
      expect(groups.length).toBe(5);
    });
  });

});