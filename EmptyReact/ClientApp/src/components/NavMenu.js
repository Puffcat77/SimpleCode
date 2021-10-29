import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { FetchComponent } from '../Utils/DataFetcher';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      hasToken: FetchComponent.hasToken()
    };
  }

  componentDidMount() {
    this.setState({
      collapsed: this.state.collapsed,
      hasToken: FetchComponent.hasToken()
    });
  }

  handleLogClick(e) {
    e.preventDefault();
    if (this.state.hasToken)
      FetchComponent.logout(() => { window.location.href = '/' });
    else
      window.location.href = '/login';
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed,
      hasToken: this.state.hasToken
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">EmptyReact</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Employees</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login" onClick={e => this.handleLogClick(e)}>{this.state.hasToken? 'Logout': 'Login'}</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
