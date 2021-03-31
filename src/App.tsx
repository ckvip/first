import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {Layout, Menu} from "antd";
import appRoutes from "./appRoutes";
const { Header, Content, Footer } = Layout;

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
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/names"/>
                            </Route>
                            {appRoutes.map((route: any, i) => (
                                <Route key={i} path={route.path}>
                                    {React.createElement(route.components)}
                                </Route>
                            ))}
                        </Switch>
                    </Content>
                    <Footer>Jimmy learn to react</Footer>
                </Layout>
            </Router>);
    }
}

export default App;
