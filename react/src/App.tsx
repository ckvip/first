import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu } from "antd";
import appRoutes from "./appRoutes";
import { connect } from "react-redux";
import { AppState } from './shared/models/appState';

const {Header, Content, Footer} = Layout;

class App extends React.Component {
  render() {
    const linkIndex = appRoutes.findIndex(x => x.path === window.location.pathname);
    const activeLink = linkIndex > -1 ? [linkIndex.toString()] : ['0'];
    return (
      <Router>
        <Layout>
          <Header>
            <img src={logo} className="App-logo" alt="logo"/>
            <Menu theme="dark" mode="horizontal" className="app-menus" defaultSelectedKeys={activeLink}>
              {appRoutes.map((route: any, i) => (
                <Menu.Item key={i}>
                  <Link to={route.path}>{route.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Content>
            <div className="center-container">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/names"/>
                </Route>
                {appRoutes.map((route: any, i) => (
                  <Route key={i} path={route.path} component={route.component}>
                  </Route>
                ))}
              </Switch>
            </div>
          </Content>
          <Footer>Jimmy learn to react</Footer>
        </Layout>
      </Router>);
  }
}

function mapStoreToProps(state: AppState) {
  return {state};
}

export const ConnectedApp = connect(mapStoreToProps)(App);
