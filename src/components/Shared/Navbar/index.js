import React from 'react';

import AuthUserContext from '../../Session/AuthUserContext';

import {
  Layout,
  Input,
  Icon,
  Avatar,
  Menu,
  Dropdown
} from 'antd';
import {
  CirclePicker
} from 'react-color';
import styled from 'styled-components';
import SignOutButton from '../../SignOut';

const {
  Header
} = Layout;
const Span = styled.span `
    line-height: 42px;
    cursor:pointer;
`
const popover = {
  position: 'absolute',
  zIndex: '5',
  right: '20px',
  top: '50px',
  background: 'rgb(255, 255, 255)',
  boxShadow: 'rgba(0, 0, 0, 0.25) 1px 1px 4px 3px',
  borderRadius: '4px',
  padding: '20px',
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
}
const menu = (
  <Menu>
    <Menu.Item>
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

// TODO: ADD CHANGE COLOR FOR USER

const Navbar = ({
  displayColorPicker,
  opencolor,
  closecolor,
  changecolor,
  maincolor,
  collapsed,
  toggle,
  search,
  searchvalue,
  btnsearch,
  togglesearch
}) => {
  const suffix = searchvalue ? <Icon type="close-circle" onClick={search} /> : null;
  return (
    <div>
      <Header
        className="header"
        style={{
          padding: 0,
          width: '100%',
          borderBottom: '1px solid #ddd',
          boxShadow: '0px 2px 2px 0px #ddd'
        }}>
        <div className="button" onClick={toggle}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </div>
        <div className="rightWarpper">
          {btnsearch ?
            <div style={{ marginTop: '-9px' }}>
              <Input
                placeholder="Search"
                suffix={suffix}
                value={searchvalue}
                onChange={search}
                style={{ width: 400 }}
              />
            </div> : ''}
          {!btnsearch ?
            <div className="button" onClick={togglesearch}>
              <Icon type="search" />
            </div> :
            <div className="button" onClick={togglesearch}>
              <Icon type="arrow-left" />
            </div>
          }
          <div className="button" onClick={opencolor}>
            <Icon className="trigger" type="setting" />
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Span>
              <Avatar icon="user" />
              <AuthUserContext.Consumer>
                {authUser =>
                  <span className="list-title" style={{ color: 'red' }}>{authUser.displayName}</span>
                }
              </AuthUserContext.Consumer>
            </Span>
          </Dropdown>
          {/* <Avatar icon="user" /> {user} */}
        </div>
      </Header >
      {displayColorPicker ? <div style={popover}>
        <div style={cover} onClick={closecolor} />
        <CirclePicker width="220px" color={maincolor} onChange={changecolor} />
      </div> : null}
    </div>
  )
}

export default Navbar;