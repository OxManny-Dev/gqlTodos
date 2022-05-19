import { useState } from 'react';

import { Routes, Route, Link } from 'react-router-dom';

import { About } from './About';
import { Home } from './Home';
import { UsersContainer } from './Users';
import { SingleUser } from './SingleUser';
import Login from './Login';


function App() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/users'>Users</Link>
      <Routes>
        <Route
          path='/'
          element={<Login/>}
        />
        <Route
          path='/about'
          element={<About/>}
        />
        <Route
          path='/users'
          element={<UsersContainer/>}
        />
        <Route
          path='/users/:userId'
          element={<SingleUser/>}
        />
      </Routes>
    </div>
  );
}

export default App;

