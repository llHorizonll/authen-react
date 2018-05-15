import React, {
  Component
} from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';
import Modalbody from '../../Shared/Modal';
import moment from 'moment';
import './fullcalendar.css';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add Event',
      oktext: 'Create',
      visible: false,
      confirmLoading: false,
      removeLoading: false,
      startdate: moment(),
      enddate: moment(),
      event: '',
    }
  }

  render() {
    const showModalselect = (s, e) => {
      if (s && e) {
        this.setState({
          visible: true,
          startdate: s,
          enddate: e.subtract(1, 'days'),
          event: '',
          title: 'Add Event',
          oktext: 'Create',
        });
      } else {
        this.setState({
          visible: true,
          event: '',
          startdate: moment(),
          enddate: moment(),
          title: 'Add Event',
          oktext: 'Create',
        });
      }
    }

    const showModalevent = (event) => {
      if (this.props.user === event.username) {
        this.setState({
          visible: true,
          title: "Update Event",
          oktext: "Update",
          event: event,
          startdate: event.start,
          enddate: (event.end) ? event.end.subtract(1, 'days') : event.start
        });
      } else {
        // TODO: ADD CARD VIEW INFO SAME GOOGLE CALENDAR DESIGN
        message.error('You don’t have permission to edit this event', 1);
      }
    }

    const handleCreate = () => {
      this.setState({
        visible: false, 
        confirmLoading: true,
      });
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        (this.state.oktext === 'Create') ? this.props.addEvent(values): this.props.updateEvent(this.state.event,
          values)
        form.resetFields();
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 1000);
      });
    }

    const handleRemove = () => {
      this.setState({
        removeLoading: true,
      });
      const form = this.formRef.props.form;
      this.props.deleteEvent(this.state.event);
      form.resetFields();
      setTimeout(() => {
        this.setState({
          visible: false,
          removeLoading: false,
        });
      }, 1000);
    }

    const handleCancel = () => {
      const form = this.formRef.props.form;
      form.resetFields();
      this.setState({
        visible: false,
      });
    }

    const saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

    const calendarProps = {
      eventSources: this.props.data,
      selectable: true,
      select: function (start, end) {
        showModalselect(start, end)
      },
      eventClick: function (event) {
        showModalevent(event)
      },
      eventRender: function (event, element) {
        if (event.title === '') {
          element.find('.fc-title').append('(No title)');
        }
      }
      // locale: 'th'
    }

    const modalProps = {
      confirmLoading: this.state.confirmLoading,
      removeLoading: this.state.removeLoading,
      title: this.state.title,
      oktext: this.state.oktext,
      visible: this.state.visible,
      onCancel: handleCancel,
      onRemove: handleRemove,
      onCreate: handleCreate,
      startDate: this.state.startdate,
      endDate: this.state.enddate,
      event: this.state.event,
    }

    return (
      <div>
        <FullCalendar
          id="example-component"
          header={this.props.fullcalendarprop.header}
          defaultView={this.props.fullcalendarprop.defaultView}
          {...calendarProps}
          navLinks={true} // can click day/week names to navigate views
          editable={false}
          eventLimit={true} // allow "more" link when too many events
          contentHeight={800} 
        />
        <Button onClick={showModalselect}
          className="fab-button"
          type="primary" shape="circle" icon="plus" size="large" />
        <Modalbody
          wrappedComponentRef={saveFormRef}
          {...modalProps}
        />
      </div >
    );
  }
}