import React, {
  Component
} from 'react';
import {
  withRouter, Link
} from 'react-router-dom';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import message from 'antd/lib/message';

import {
  auth
} from '../../firebase';
import * as routes from '../../constants/routes';

const FormItem = Form.Item;

const PasswordForgetPage = ({
    history
  }) =>
  <div>
    <PasswordForgetForm history={history} />
  </div>

const showerror = (value) => {
  message.error(value.message);
};

const PasswordForgetForm = Form.create()(class PasswordForgetForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (event) => {

    const {
      history
    } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      event.preventDefault();
      if (!err) {
        console.log(values.email)
        auth.doPasswordReset(values.email)
          .then((r) => {
            message.success("Password reset request sent please check your email", 7);
            setTimeout(history.push(routes.SIGN_IN), 8000);
          })
          .catch(error => {
            showerror(error);
          });
      }
    })
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
    return (
      <div className="form-pw-forgot">
        <div style={{ textAlign: 'center',marginBottom:'20px' }}><Avatar size="large" icon="user" /></div>
        <h1 style={{textAlign: 'center'}}>Password Reset</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid Email!',
              }, {
                required: true, message: 'Please input your Email!',
              }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Send
            </Button>
          </FormItem>
        </Form>   
      </div>

      // <form onSubmit={this.onSubmit}>
      //   <input
      //     value={this.state.email}
      //     onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <button disabled={isInvalid} type="submit">
      //     Reset My Password
      //   </button>

      //   { error && <p>{error.message}</p> }
      // </form>
    );
  }
})

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default withRouter(PasswordForgetPage);

export {
  PasswordForgetForm,
  PasswordForgetLink,
};