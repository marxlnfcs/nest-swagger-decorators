import { ApiClassProperty, ApiController, ApiGet, ApiOneOfProperty, ApiStringProperty } from "../src";
import {getApiTagGroups} from "../src/lib/stores/tags.store";

export class Model1 {
  @ApiStringProperty()
  type1: string;
}

export class Model2 {
  @ApiStringProperty()
  type2: string;
}

export class Response1 {
  @ApiOneOfProperty(() => [Model1, Model2])
  @ApiOneOfProperty([() => [Model1, Model2]])
  model: any;
}

export class Response2 {
  @ApiClassProperty(() => [Model2])
  model: any;
}

@ApiController({
  tags: ['Tag1'],
  tagGroups: ['Global', 'Controller1']
})
export class Controller1 {
  @ApiGet({
    tags: ['Tag2'],
    tagGroups: ['Global'],
    response: Response1,
  })
  route1() {}

  @ApiGet({
    tags: ['Tag3'],
    response: Response2,
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
      expect(groups.length).toBeTruthy();
    });
  });

});