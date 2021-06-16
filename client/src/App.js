/*
*   Author: Trevor Frame
*   Date: 03/31/2021
*   Description: React app to start.
*/
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

//Semantic goes above because we will change app.css which
//will override semantic
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import { BrowserFPProvider } from './context/browserFPId';
import AuthRoute from './util/AuthRoute';

import Title from './components/Title';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import SingleArticle from './pages/SingleArticle';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Privacy from './pages/Privacy';
import ArticlesByTopic from './pages/ArticlesByTopic';

//Everything inside AuthProvider will have access to the context of 
//AuthProvider
function App() {

  return (
    <AuthProvider>
      <BrowserFPProvider>
        <Router>
          <Container>
            <Title />
            <MenuBar />
          </Container>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create-article' component={CreateArticle} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/articles/:articleId' component={SingleArticle} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/privacy' component={Privacy} />
          <Route exact path='/explore' component={ArticlesByTopic} />
          <Route exact path='/build' component={ArticlesByTopic} />
          <Route exact path='/parent' component={ArticlesByTopic} />
          <Route exact path='/eat-drink' component={ArticlesByTopic} />
          <Route exact path='/play' component={ArticlesByTopic} />
          <Footer />
        </Router>
      </BrowserFPProvider>
    </AuthProvider>
  );
}

export default App;
