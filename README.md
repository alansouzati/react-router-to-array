# react-router-to-array

Convert your react router component to an array with all static routes.
Dynamic routes and their corresponding nested static routes are ignored.
No match (*) route is also ignored. See usage example below.

[![Build Status](https://api.travis-ci.org/alansouzati/react-router-to-array.svg)](https://travis-ci.org/alansouzati/react-router-to-array)

### Install

```sh
npm install react-router-to-array
```

### Usage

```javascript
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import reactRouterToArray from 'react-router-to-array';
// or var reactRouterToArray = require('react-router-to-array');

console.log(reactRouterToArray(
  <Route path="/" component={FakeComponent}>
    {/* just to test comments */}
    <IndexRoute component={FakeComponent} />
    <Route path="about" component={FakeComponent}>
      <Route path="home" component={FakeComponent} />
      <Route path="/home/:userId" component={FakeComponent} />
    </Route>
    <Route path="users" component={FakeComponent} />
    <Route path="*" component={FakeComponent} />
  </Route>)
); //outputs: ['/', '/about', '/about/home', '/users']
```

### Use case

I wrote this library mainly to use in conjuction with [static-site-generator-webpack-plugin](https://www.npmjs.com/package/static-site-generator-webpack-plugin)

### License

[MIT](https://github.com/alansouzati/react-router-to-array/blob/master/LICENSE)
