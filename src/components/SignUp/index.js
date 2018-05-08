import React, {
  Component
} from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import message from 'antd/lib/message';

import {
  auth,
  db
} from '../../firebase';
import * as routes from '../../constants/routes';

const FormItem = Form.Item;

const SignUpPage = ({
    history
  }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const showerror = (value) => {
  message.error(value.message);
};

const SignUpForm = Form.create()(class SignUpForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (event) => {

    const {
      history,
    } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      event.preventDefault();
      if (!err) {
        auth.doCreateUserWithEmailAndPassword(values.email, values.password)
          .then(authUser => {
            // Create a user in your own accessible Firebase Database too
            db.doCreateUser(authUser.uid, values.username, values.email)
              .then(() => {
                history.push(routes.HOME);
              })
              .catch(error => {
                showerror(error);
              });
          })
          .catch(error => {
            showerror(error);
          });
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {
        force: true
      });
    }
    callback();
  }

  render() {
    const {
      form
    } = this.props;
    const {
      getFieldDecorator
    } = form;

    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   username === '' ||
    //   email === '';

    return (
      <div className="form-register">
        <div style={{ textAlign: 'center',marginBottom:'20px' }}><Avatar size="large" icon="user" /></div>
        <h1 style={{textAlign: 'center'}}>Sign up with your email address</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
               rules: [{
                type: 'email', message: 'The input is not valid Email!',
              }, {
                required: true, message: 'Please input your Email!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
             rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            },{
              min:6
            }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              },{
                min:6
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem style={{textAlign: 'center'}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
            </Button>
            Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>.
          </FormItem>
        </Form>
      </div>
    );
  }
})

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};