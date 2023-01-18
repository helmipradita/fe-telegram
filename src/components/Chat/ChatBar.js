import React, { useState, useEffect } from 'react';
import style from './ChatBar.module.css';
import { Image } from 'react-bootstrap';

// import Profile2 from '../../../../assets/Profile2.jpg';
const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className={style.sidebar}>
      <h2 style={{ color: '#7e98df', fontWeight: '700' }}>Chat App</h2>
      <div className="row">
        <div className="flex">
          {/* <img className="" src={Profile2}></img> */}
          <h4 className="self-center flex">asasasasas</h4>
        </div>
      </div>
      <div className="grid">
        <h4 className={style.header}>Online Users</h4>
        <div className={style.users}>
          {users.map((user) => (
            <div className="card w-96 bg-base-100 shadow-sm rounded-lg">
              <div className="card-body flex flex-row ">
                <div>{/* <img src={Profile2} /> */}</div>
                <div>
                  <p className="p-3" key={user.socketID}>
                    {user.userName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-auto">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default ChatBar;
