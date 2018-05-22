import React, {
  Component
} from 'react';
import Layout from 'antd/lib/layout';
import message from 'antd/lib/message';
import moment from 'moment';
import withAuthorization from '../Session/withAuthorization';

import List from '../Shared/List';
import Navbar from '../Shared/Navbar';
import Calendar from '../Shared/Calendar';
import {
  db
} from '../../firebase';
import {
  service
} from '../../service';
import './home.css';
const {
  Content,
  Sider
} = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: {
        defaultView: 'month',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
      },
      btnsearch: false,
      collapsed: false,
      displayColorPicker: false,
      searchvalue: '',
      data: '',
      datasearch: '',
      datatemp: '',
      userlist: '',
      usercolor: '',
      show: true,
    }
  }

  componentDidMount() {

    db.onceGetUsers().then(arr => {
      let u = arr.filter((item) => {
        if (this.props.authUser.displayName === item.username) {
          this.setState({
            usercolor: item.color
          })
          item.show = true;
        }
        return item
      })
      this.setState({
        userlist: u
      })
    });

    db.getEventList().then(arr => {
      let r = arr.filter((item) => {
        if (this.props.authUser.displayName === item.username) {
          item.show = true;
        } else {
          item.show = false;
        }
        if (item.start) {
          item.start = moment(item.start.toDate()).format('YYYY-MM-DD');
        }
        if (item.end) {
          item.end = moment(item.end.toDate()).format('YYYY-MM-DD')
        }
        return item
      })
      this.setState(() => ({
        data: r.filter(item => (item.show) ? item : ''),
        datasearch: r,
        datatemp: r.slice(),
      }))
    })
  }

  toggleOpencolor = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }

  toggleClosecolor = () => {
    this.setState({
      displayColorPicker: false
    })
  }

  toggleNavmenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleChangecolor = (color) => {
    this.setState({
      usercolor: color.hex
    })

    let newdata = this.state.data.filter(item => {
      if (this.props.authUser.displayName === item.username) {
        item.color = color.hex
        db.doUpdateColorEvent(item.id, {
          color: item.color
        })
      }
      return item;
    });

    let newdatauser = this.state.userlist.filter(item => {
      if (this.props.authUser.displayName === item.username) {
        item.color = color.hex
        db.doUpdateColorUser(item.id, {
          color: item.color
        })
      }
      return item;
    });

    this.setState({
      data: newdata,
      userlist: newdatauser
    })

    // FIXME: UPDATE COLOR TO SERVICE

    // eventService.update(newdata).then(res => {
    //   this.setState({
    //     data: res,
    //   })
    // })

    // userService.update(newdatauser).then(res => {
    //   this.setState({
    //     userlist: res,
    //     user: JSON.parse(localStorage.getItem('user')),
    //   })
    // })
  }

  toggleBtnsearch = () => {
    this.setState({
      btnsearch: !this.state.btnsearch,
    });
    if (this.state.btnsearch) {
      this.setState({
        calendar: {
          defaultView: 'month',
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
        },
        searchvalue: ''
      });
    }
  }

  searchevent = (e) => {
    if (!e.target.value) {
      e.target.value = ''
    }
    let result = service.searchevent(this.state.datasearch, e.target.value);
    this.setState({
      data: result.filter(item => (item.show) ? item : ''),
    })
    this.setState({
      calendar: {
        defaultView: 'listMonth',
        header: {
          left: 'title',
          center: '',
          right: 'prev,next'
        },
      },
      searchvalue: e.target.value
    })
    if (e.target.value === '') {
      this.setState({
        calendar: {
          defaultView: 'month',
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
        },
        searchvalue: e.target.value
      })
      this.setState({
        data: this.state.datasearch.filter(item => (item.show) ? item : ''),
      })
    }
  }

  handleCheckbox(name, value) {
    this.setState({
      userlist: this.state.userlist.filter((item) => {
        if (item.username === name) {
          item.show = value;
        }
        return item
      }),
      datasearch: this.state.datasearch.filter((item) => {
        if (item.username === name) {
          item.show = value;
        }
        return item
      }),
      data: this.state.datasearch.filter(item => (item.show) ? item : ''),
    });
  }

  addEvent({
    title = '',
    startdate = '',
    enddate = '',
    description = ''
  }) {
    let newevent = {
      title: title,
      start: startdate._d,
      end: (enddate.add(1, 'days'))._d,
      description: description,
      username: this.props.authUser.displayName,
      color: this.state.usercolor,
    }
    db.doCreateEvent(newevent).then(() => {
        db.getEventList().then(arr => {
          let r = arr.filter((item) => {
            if (this.props.authUser.displayName === item.username) {
              item.show = true;
            } else {
              item.show = false;
            }
            if (item.start) {
              item.start = moment(item.start.toDate()).format('YYYY-MM-DD');
            }
            if (item.end) {
              item.end = moment(item.end.toDate()).format('YYYY-MM-DD')
            }
            return item
          })
          let newarr = service.arrayUnique(this.state.datasearch.filter(item => (item.show) ? item : '')
            .concat(r.filter(item => (item.show) ? item : '')))
          this.setState(() => ({
            data: newarr,
            datasearch: newarr,
            datatemp: newarr.slice(),
          }))
        })
      })
      .catch(error => {
        message.error(error, 1);
      });
  }

  updateEvent(e, ne) {
    let newevent = {
      title: ne.title,
      start: ne.startdate._d,
      end: (ne.enddate.add(1, 'days'))._d,
      description: ne.description,
      username: this.props.authUser.displayName,
      color: this.state.usercolor,
    }
    db.doUpdateEvent(e.id, newevent).then(() => {
        db.getEventList().then(arr => {
          let r = arr.filter((item) => {
            if (this.props.authUser.displayName === item.username) {
              item.show = true;
            } else {
              item.show = false;
            }
            if (item.start) {
              item.start = moment(item.start.toDate()).format('YYYY-MM-DD');
            }
            if (item.end) {
              item.end = moment(item.end.toDate()).format('YYYY-MM-DD')
            }
            return item
          })
          let newarr = this.state.datasearch.filter(item =>
              (this.props.authUser.displayName !== item.username && item.show) ? item : '')
                .concat(r.filter(item => (item.show) ? item : ''))
          this.setState(() => ({
            data: newarr,
            datasearch: newarr,
            datatemp: newarr.slice(),
          }))
        })
      })
      .catch(error => {
        message.error(error, 1);
      });
  }

  deleteEvent(e) {
    db.doRemoveEvent(e.id).then(() => {
        db.getEventList().then(arr => {
          arr.filter((item) => {
            if (this.props.authUser.displayName === item.username) {
              item.show = true;
            } else {
              item.show = false;
            }
            if (item.start) {
              item.start = moment(item.start.toDate()).format('YYYY-MM-DD');
            }
            if (item.end) {
              item.end = moment(item.end.toDate()).format('YYYY-MM-DD')
            }
            return item
          })
          let delarr = this.state.datasearch
            .filter(item => (item.show) ? item : '')
            .filter(item => item.id !== e.id)
          this.setState(() => ({
            data: delarr,
            datasearch: delarr,
            datatemp: delarr.slice(),
          }))
        })
      })
      .catch(error => {
        message.error(error, 1);
      });
  }

  render() {
    const navbarProps = {
      usercolor: this.state.usercolor,
      displayColorPicker: this.state.displayColorPicker,
      opencolor: this.toggleOpencolor.bind(this),
      closecolor: this.toggleClosecolor.bind(this),
      changecolor: this.toggleChangecolor.bind(this),
      collapsed: this.state.collapsed,
      toggle: this.toggleNavmenu.bind(this),
      search: this.searchevent.bind(this),
      togglesearch: this.toggleBtnsearch.bind(this),
      btnsearch: this.state.btnsearch,
      searchvalue: this.state.searchvalue,
      user: this.props.authUser.displayName,
    }
    const siderProps = {
      width: 200,
      trigger: null,
      collapsedWidth: 0,
      collapsible: true,
      collapsed: this.state.collapsed,
    }
    const calendarProps = {
      data: [{
        events: this.state.data,
        color: this.state.data.color,
        textColor: "white",
      }],
      updateEvent: this.updateEvent.bind(this),
      addEvent: this.addEvent.bind(this),
      deleteEvent: this.deleteEvent.bind(this),
      fullcalendarprop: this.state.calendar,
      user: this.props.authUser.displayName,
    }
    return (
      <div className="App">
        <Layout>
          <Navbar {...navbarProps} />
          <Layout>
            <Sider
              style={{ background: '#fff', borderRight: '1px solid #ddd', boxShadow: '2px 0px 2px #ddd' }}
              {...siderProps}
            >
            <List user={this.state.userlist} 
                  click={this.handleCheckbox.bind(this)}
            />
            </Sider>
            <Layout>
              <Content style={{ background: '#fff', padding: 20, margin: 0, }}>
                <Calendar {...calendarProps} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);