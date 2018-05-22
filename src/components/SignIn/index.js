import React, {
  Component
} from 'react';
import {
  withRouter
} from 'react-router-dom';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import message from 'antd/lib/message';

import {
  SignUpLink
} from '../SignUp';
import {
  PasswordForgetLink
} from '../PasswordForget';
import {
  auth,
  db
} from '../../firebase';
import * as routes from '../../constants/routes';

const FormItem = Form.Item;

const SignInPage = ({
    history
  }) =>
  <div>
    <SignInForm history={history} />
  </div>

const showerror = (value) => {
  message.error(value.message);
};

const SignInForm = Form.create()(class SignInForm extends Component {


  componentDidMount() {
    window.addEventListener('beforeunload', window.gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 40,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn
    }));
  }

  onSignIn = () => {
    const {
      history
    } = this.props;

    auth.doSignInGoogle()
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          db.doCreateUser(res.additionalUserInfo.profile.name, '', res.additionalUserInfo.profile.picture)
            .then(() => {
              history.push(routes.HOME);
            })
            .catch(error => {
              showerror(error);
            });
        } else {
          history.push(routes.HOME);
        }
      })
  }
  handleSubmit = (event) => {
    const {
      history
    } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      event.preventDefault();
      if (!err) {
        auth.doSignInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            history.push(routes.HOME);
          })
          .catch(error => {
            showerror(error);
          });
      }
    })
  }

  render() {
    const {
      form
    } = this.props;
    const {
      getFieldDecorator
    } = form;
    return (
      <div className="form-login">
        <div style={{ textAlign: 'center',marginBottom:'20px' }}><Avatar size="large" icon="user" /></div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              initialValue: (process.env.NODE_ENV === 'production') ? '' : 'newuser@mail.com',
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              initialValue: (process.env.NODE_ENV === 'production') ? '' : 'newuser@mail.com',
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign in
            </Button>
          </FormItem>
          <FormItem>
            <div id="my-signin2"></div>
          </FormItem>
          <PasswordForgetLink />
          <SignUpLink />
        </Form>   
      </div>
    );
  }
});

export default withRouter(SignInPage);

export {
  SignInForm,
};