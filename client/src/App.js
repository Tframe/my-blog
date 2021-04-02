/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: React app to start.
*/

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

//Semantic goes above because we will change app.css which
//will override semantic
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Title from './components/Title';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

//Everything inside AuthProvider will have access to the context of 
//AuthProvider
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Title />
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
