# objcov
Watch a javascript object and get statistics about how it has been used within your code.

A great tool for code coverage checking a config/schema driven application.

## Installation
```bash
npm install --save-dev objcov
```

## Usage
```javascript
const objcov = require('objcov');

const config = {
  people: [{
    id: 1,
    firstName: 'Suzie',
    lastName: 'Bloggs'
  }, {
    id: 2,
    firstName: 'Joe',
    lastName: 'Bloggs'
  }],

  one: 1
}

const watchedConfig = objcov.watch(config);

if (watchedConfig.one === 1) {
  // Touch the first item
  JSON.stringify(watchedConfig.people[0]);
}

const coverageCheck = objcov.check(config);

console.log(coverageCheck);

/*
{
  touched: [
    'one',
    'people.0.toJSON',
    'people.0.id',
    'people.0.firstName',
    'people.0.lastName'
  ],
  all: [
    'people.0.id',
    'people.0.firstName',
    'people.0.lastName',
    'people.1.id',
    'people.1.firstName',
    'people.1.lastName',
    'one'
  ],
  untouched: ['people.1.id', 'people.1.firstName', 'people.1.lastName'],
  percentTouched: 0.43
}
*/
```
