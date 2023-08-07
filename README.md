<p align="center" style="font-size: 40px;">NestJS OpenApi Extended Decorators</p>

<p align="center">Extended decorator functions for the @nestjs/swagger module</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@marxlnfcs/nest-swagger-decorators" target="_blank"><img src="https://img.shields.io/npm/v/@marxlnfcs/nest-swagger-decorators.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/nest-swagger-decorators" target="_blank"><img src="https://img.shields.io/npm/l/@marxlnfcs/nest-swagger-decorators.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/nest-swagger-decorators" target="_blank"><img src="https://img.shields.io/npm/dm/@marxlnfcs/nest-swagger-decorators.svg" alt="NPM Downloads" /></a>
    <a href="https://www.npmjs.com/package/@marxlnfcs/nest-swagger-decorators" target="_blank"><img src="https://img.shields.io/bundlephobia/min/@marxlnfcs/nest-swagger-decorators?label=size" alt="Package Size" /></a>
</p>

## Installation
```
npm i @marxlnfcs/nest-swagger-decorators
```

## Usage
### Controller
```javascript
@ApiController('/', {
    tags: [ ... ],
    tagGroups: [ ... ],
    header: { ... },
    params: { ... },
    query: { ... },
})
export class AppController {}

@ApiController({
    path: '/',
    tags: [ ... ],
    tagGroups: [ ... ],
    header: { ... },
    params: { ... },
    query: { ... },
})
export class AppController {}

// Controller will not be added to the documentation. Equals to @ApiExcludeController
@ApiController('/', false)
export class AppController {}
```

### Routes
```javascript
@ApiController('/')
export class AppController {

    @ApiGet('/', { ... })
    @ApiGet({ path: '/', ... })
    @ApiGet('/', false) // Endpoint will not be added to the documentation. Equals to @ApiExcludeEndpoint
    ping(){ ... }

}
```

### Exceptions
```javascript
@ApiController('/')
export class AppController {
    
    @ApiGet('/')
    @ApiNotFoundException()
    @ApiUnauthorizedException()
    ping(){ ... }
    
}
```

### TagGroups
```javascript
@ApiController('/')
@TagGroups(...)
export class AppController {

	@ApiGet('/', { ... })
    @ApiTagGroups(...)
	ping(){ ... }

}
```

### Retrieve TagGroups
```javascript
import {getApiTagGroups} from "@marxlnfcs/nest-swagger-decorators";

const tagGroups = getApiTagGroups();

/**
 * RETURNS:
 * [
 *  {
 *    name: string,
 *    tags: string[]
 *  },
 *  ...
 * ]
 */
```