import React, { Component } from 'react'
import './Header.css';
import { Input, Menu, Container } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import Auth from '../Auth/Auth';

class Header extends Component {
    constructor(props) {
        super(props);
        this.authenticated = this.authenticated.bind(this);
        this.logout = this.logout.bind(this);
    }

    authenticated() {
        if (this.props.isAuthenticated) {
            return (
                <Menu.Item name='logout' onClick={() => this.logout} />
            )
        } else {
            return (
            <Menu.Item name='login' as={NavLink} to='/Register' />
            )
        }
    }

    logout() {
        if (this.props.isAuthenticated) {
            Auth.logout();
        }
    }

    
    render() {
        const { match, location, history } = this.props;
        
        if (location.pathname === '/home') {
            return (
            <Container>
                <Menu inverted pointing secondary stackable>
                    <Menu.Item name='home' as={NavLink} to='/home' />
                    <Menu.Item name='projects' as={NavLink} to='/projects' />
                    <Menu.Item name='volunteers' as={NavLink} to='/volunteers' />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' placeholder='Search...' />
                        </Menu.Item>

                       <this.authenticated></this.authenticated>
                    </Menu.Menu>
                </Menu>
            </Container>
            )
        } else {
            return (
                <Container>
                    <Menu stackable>
                        <Menu.Item name='home' as={NavLink} to='/home' />
                        <Menu.Item name='projects' as={NavLink} to='/projects' />
                        <Menu.Item name='volunteers' as={NavLink} to='/volunteers' />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Input icon='search' placeholder='Search...' />
                            </Menu.Item>
    
                            <this.authenticated></this.authenticated>
                        </Menu.Menu>
                    </Menu>
                </Container>
            )
        }

        
    }
}

const ShowTheLocationWithRouter = withRouter(Header)
export default ShowTheLocationWithRouter;