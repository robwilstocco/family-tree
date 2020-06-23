import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import NewTree from './pages/NewTree';
import Tree from './pages/Tree';
import NewPerson from './pages/NewPerson';

export default function Routes(){
  return(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/newtree" component={NewTree}/>
      <Route path="/tree" component={Tree}/>
      <Route path="/newperson" component={NewPerson}/>
    </Switch>
  </BrowserRouter>
  );
}