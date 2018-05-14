import React from 'react';
import Avatar from 'antd/lib/avatar';
import Checkbox from 'antd/lib/checkbox';

const List = ({
  data,
  click
}) => {

  const onChange = (e) => {
    click(e.target.name, e.target.checked);
  }

  const getList = (data = []) => {
    if (data.length > 0) {

      return data.map((item, index) => {
        return (
            <div className="list-user" key={index}
               style={{ color: 'red', cursor: 'pointer' }}       
            >
            <Checkbox 
              key={index}
              name={item.username} 
              checked={item.show}
              onChange={onChange}
            >               
              <Avatar icon="user" />
              <span className="list-title">{item.username}</span>
            </Checkbox>
            </div>
        )
      })
    }
  }

  const listItems = getList(data)

  return (
    <div style={{ padding: '10px' }}>
      {listItems} 
    </div>
  )
}

export default List;