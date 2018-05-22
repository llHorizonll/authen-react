import React from 'react';
import Avatar from 'antd/lib/avatar';
import Checkbox from 'antd/lib/checkbox';

const List = ({
  user,
  click
}) => {

  const onChange = (e) => {
    click(e.target.name, e.target.checked);
  }

  const getList = (user = []) => {
    if (user.length > 0) {
      return user.map((item, index) => {
        return (
          <div className="list-user" key={index}
               style={{ color: item.color, cursor: 'pointer' }}       
            >
            <Checkbox 
              key={index}
              name={item.username} 
              checked={item.show}
              onChange={onChange}
              style={{ color: item.color }}
            >               
              {item.photo ?
              <Avatar src={item.photo} /> :
              <Avatar icon="user" />
              }
              <span className="list-title">{item.username}</span>
            </Checkbox>
          </div>
        )
      })
    }
  }

  const listItems = getList(user)

  return (
    <div style={{ paddingLeft: '10px' }}>
      {listItems} 
    </div>
  )
}

export default List;