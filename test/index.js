import React from 'react';
import { Route, IndexRoute } from 'react-router';
import reactRouterToArray from '../src/index';
import test from 'tape';

const FakeComponent = () => {
  return <div>hi</div>
};

test('loads a basic react-router component', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route path="/" component={FakeComponent}>
      {/* just to test comments */}
      <IndexRoute component={FakeComponent} />
      <Route path="about" component={FakeComponent}>
        <Route path="home" component={FakeComponent} />
      </Route>
      <Route path="users" component={FakeComponent} />
    </Route>
  );

  t.equal(output.join(), [
    '/', '/about', '/about/home', '/users'
  ].join());
});

test('loads a plain react-router', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    {
      path: '/',
      component: FakeComponent,
      indexRoute: { component: FakeComponent },
      childRoutes: [
        {path: 'about', component: FakeComponent, childRoutes: [
          {path: 'home', component: FakeComponent}
        ]},
        {path: 'users', component: FakeComponent}
      ]
    }
  );

  t.equal(output.join(), [
    '/', '/about', '/about/home', '/users'
  ].join());
});

test('loads an array of react-router components', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route path="/" component={FakeComponent}>
      <IndexRoute component={FakeComponent} />,
      {[
        <Route path="about" component={FakeComponent}>
          <Route path="home" component={FakeComponent} />
        </Route>,
        <Route path="users" component={FakeComponent} />
      ]}
    </Route>
  );

  t.equal(output.join(), [
    '/', '/about', '/about/home', '/users'
  ].join());
});

test('loads an array of plain routes', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    [
      {path: 'about', component: FakeComponent, childRoutes: [
        {path: 'home', component: FakeComponent}
      ]},
      {path: 'users', component: FakeComponent}
    ]
  );

  t.equal(output.join(), [
    '/about', '/about/home', '/users'
  ].join());
});

test('ignores dynamic routes', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route path="/" component={FakeComponent}>
      <Route path="about" component={FakeComponent}>
        <Route path="home" component={FakeComponent} />
        <Route path="/home/:userId" component={FakeComponent} />
      </Route>
      <Route path="users" component={FakeComponent} />
    </Route>
  );

  t.equal(output.join(), [
    '/', '/about', '/about/home', '/users'
  ].join());
});

test('ignores static inside dynamic routes', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route path="/" component={FakeComponent}>
      <Route path="about" component={FakeComponent}>
        <Route path="home" component={FakeComponent} />
        <Route path="/home/:userId" component={FakeComponent}>
          <Route path="home2" component={FakeComponent} />
        </Route>
      </Route>
      <Route path="users" component={FakeComponent} />
    </Route>
  );

  t.equal(output.join(), [
    '/', '/about', '/about/home', '/users'
  ].join());
});

test('ignores no match route', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route path="/" component={FakeComponent}>
      <Route path="about" component={FakeComponent} />
      <Route path="*" component={FakeComponent} />
    </Route>
  );

  t.equal(output.join(), [
    '/', '/about'
  ].join());
});
