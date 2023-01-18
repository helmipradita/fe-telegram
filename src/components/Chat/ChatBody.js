import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ChatBody.module.css';
// import Hover from '../../../../assets/Hover.png';
const ChatBody = ({ listchat, login }) => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const handleLeaveChat = () => {
    localStorage.removeItem('name');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className={style.Header}>
        <h3 className="text-[#7e98df] font-semibold"> {name}</h3>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1"></label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleLeaveChat}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>

      <div className={style.chatContainer}>
        {listchat.map((item, index) => (
          <div key={index}>
            {item.sender === login.data.name ? (
              <div className={style.chats}>
                <div className="chat chat-end">
                  <p className={style.senderName}>You</p>
                  <div className="chat-bubble chat-bubble-success">
                    <p>{item.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.chats}>
                <p>{item.name}</p>
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-secondary">
                    <p>{item.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* {messages.map((message) =>
          message.name === localStorage.getItem("name") ? (
            <div className={style.chats} key={message.id}>
              <div className="chat chat-end">
                <p className={style.senderName}>You</p>
                <div className="chat-bubble chat-bubble-success">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={style.chats} key={message.id}>
              <p>{message.name}</p>
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          )
        )} */}
      </div>
    </>
  );
};

export default ChatBody;
