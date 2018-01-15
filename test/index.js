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

test('loads children of undefined routes', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route>
      <Route path="/" component={FakeComponent}>
        <Route>
          <Route path="about" component={FakeComponent} />
        </Route>
      </Route>
    </Route>
  );

  t.equal(output.join(), ['/', '/about'].join());
})

test('loads children of undefined plain routes', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    [
      {childRoutes: [
        {
          path: '/', component: FakeComponent,
          childRoutes: [
            {childRoutes: [
              {path: 'about', component: FakeComponent}
            ]}
          ]
        }
      ]}
    ]
  );

  t.equal(output.join(), ['/', '/about'].join());
})

test('loads chidren that have deep paths', function(t) {
  t.plan(1);

  let output = reactRouterToArray(
    <Route>
      <Route path="one">
        <IndexRoute component={FakeComponent} />
        <Route path="two/three/four" component={FakeComponent} />
        <Route path="two/three/five" component={FakeComponent} />
        <Route path="two/three/six" component={FakeComponent} />
      </Route>
    </Route>
  );

  t.equal(output.join(), [
    '/one', '/one/two/three/four', '/one/two/three/five', '/one/two/three/six'
  ].join());
})
