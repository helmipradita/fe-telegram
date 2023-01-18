import ScrollToBottom from 'react-scroll-to-bottom';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import assets1 from './../assets/assets1.png';
import assets2 from './../assets/assets2.png';
import { Col, Form, Row } from 'react-bootstrap';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="container-fluid">
      <Row>
        <Col md={3} className="side_chat">
          <h3 className="mt-4 mb-4 text-primary">Telegram</h3>
          <Form.Control type="email" placeholder="Type your message" />
          <Row className="d-flex align-items-center justify-content-center flex-direction-column mt-5">
            <Col>
              <h5>All</h5>
            </Col>
            <Col>
              <h5>Important</h5>
            </Col>
            <Col>
              <h5>Unread</h5>
            </Col>
          </Row>
          <div className="mt-4">
            <div className="row">
              <div className="col mb-4 d-flex align-items-center ">
                <img src={assets1} alt="assets" />
                <h5 style={{ paddingLeft: '10px' }}>Theresa Webb</h5>
              </div>
              <div className="col mb-4 d-flex align-items-center ">
                <img src={assets2} alt="assets" />
                <h5 style={{ paddingLeft: '10px' }}>Calvin Flores</h5>
              </div>
              <div className="col mb-4 d-flex align-items-center ">
                <img src={assets1} alt="assets" />
                <h5 style={{ paddingLeft: '10px' }}>Theresa Webb</h5>
              </div>
            </div>
          </div>
        </Col>
        <Col md={9} className="mt-4">
          <div className="chat-window">
            <div className="chat-header">
              <p>Live Chat</p>
            </div>
            <div className="chat-body">
              <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                  return (
                    <div
                      className="message"
                      id={username === messageContent.author ? 'you' : 'other'}
                    >
                      <div>
                        <div className="message-content">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{messageContent.time}</p>
                          <p id="author">{messageContent.author}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === 'Enter' && sendMessage();
                }}
              />
              <button onClick={sendMessage}>&#9658;</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Chat;
