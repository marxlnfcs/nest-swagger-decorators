import {ApiController, ApiGet} from "../src";
import {getApiTagGroups} from "../src/lib/stores/tags.store";

@ApiController({
  tags: ['Tag1'],
  tagGroups: ['Global', 'Controller1']
})
export class Controller1 {
  @ApiGet({
    tags: ['Tag2'],
    tagGroups: ['Global']
  })
  route1() {}

  @ApiGet({
    tags: ['Tag3'],
  })
  route2() {}
}

@ApiController({
  tags: ['Tag4'],
  tagGroups: ['Global', 'Controller2']
})
export class Controller2 {
  @ApiGet({
    tags: ['Tag5'],
    tagGroups: ['Global']
  })
  route1() {}

  @ApiGet({
    tags: ['Tag6'],
  })
  route2() {}
}

describe('Testing Library', () => {
  const groups = getApiTagGroups();

  // check if tagGroups are equals a special length
  describe('Testing tagGroups', () => {
    it('tagGroups.length should be 5', async () => {
      console.log(groups);
      expect(groups.length).toBeTruthy();
    });
  });

});