import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import right from '../../components/Chat/ChatBody.module.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../assets/Menu.png';
import { Card, Dropdown, Form, Tab, Tabs } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';

const Home = () => {
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  const [message, setMessage] = useState();
  const [login, setLogin] = useState({});
  const [list, setList] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState({});
  const [activeChat, setActiveChat] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const self = user;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = user;
    const token = user.token;

    setLogin(user);

    console.log(data, 'ini data');

    const users_id = user.id;

    axios
      .get(process.env.REACT_APP_BACKEND_API_HOST + `/users/all/${users_id}`, {
        'content-type': 'multipart/form-data',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_API_HOST);
    socket.on('send-message-response', (response) => {
      // set receiver
      const receiver = JSON.parse(localStorage.getItem('receiver'));
      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
      }
    });
    setSocketIo(socket);
  }, []);

  const SubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const receiver = JSON.parse(localStorage.getItem('receiver'));

    // list history saat submit message
    const payload = {
      sender: user.username,
      receiver: receiver.username,
      message,
    };

    setListchat([...listchat, payload]);

    const data = {
      sender: user.id,
      receiver: activeReceiver.id,
      message,
    };

    socketio.emit('send-message', data);

    setMessage('');
  };

  const selectReceiver = (item) => {
    setListchat([]);
    setActiveReceiver(item);
    setActiveChat(2);

    //set receiver
    localStorage.setItem('receiver', JSON.stringify(item));
    socketio.emit('join-room', login);

    const data = {
      sender: login.id,
      receiver: item.id,
    };

    socketio.emit('chat-history', data);
  };
  console.log(self, 'ini dari user payload');

  const handleLeaveChat = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="row">
      <div
        className="left col-md-3 d-flex align-items-start justify-content-center flex-direction-column pt-5"
        style={{
          paddingLeft: '30px',
          height: '100vh',
          overflowX: 'hidden',
        }}
      >
        <div className="header">
          <div className="row">
            <div className="col-md-9">
              <h3 style={{ color: '#7E98DF' }}>Telegram App</h3>
            </div>
            <div className="col-md-3" style={{ paddingLeft: '10px' }}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  <img style={{}} src={Menu} alt="menu icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/edit">Edit profile </Dropdown.Item>
                  <Dropdown.Item onClick={handleLeaveChat}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="col-md-8 offset-md-2 mt-4 " align="center" style={{}}>
            <img width={150} height={150} src={user.photo} alt="asset icon" />
            <p className="mt-2">
              <b>{user.username}</b>
            </p>
          </div>

          <div className="chats">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="all" title="All">
                {list.map((user) => (
                  <Card className="mt-2">
                    <Card.Body
                      key={user.id}
                      onClick={() => selectReceiver(user)}
                    >
                      <div className="row ">
                        <div className="col-md-3">
                          <img
                            width={50}
                            height={50}
                            src={user.photo}
                            alt="users photos"
                          />
                        </div>
                        <div className="col-md-9">{user.username}</div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Tab>
              <Tab eventKey="important" title="Important">
                Lorem ipsum important
              </Tab>
              <Tab eventKey="unread" title="Unread">
                Lorem ipsum unread
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <div
        className="right col-md-9"
        style={{
          backgroundColor: 'white',
        }}
      >
        <div className="chat-window">
          <div className="chat-header">
            <p
              style={{
                backgroundColor: 'ghostwhite',
                color: '#7E98DF',
                fontSize: '20px',
              }}
            >
              Live Chat
            </p>
          </div>
          <div className={right.chatContainer}>
            <ScrollToBottom className="message-container">
              {listchat.map((item) => (
                <div key={item.id}>
                  {item.sender === login.username ? (
                    <div className="">
                      <Card className="mt-2 col-md-7 offset-md-5">
                        <Card.Body key={item.id}>
                          <div className="row ">
                            <p className="text-secondary"> {item.sender}</p>
                            <p>{item.message}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : (
                    <div className="">
                      <Card align="left" className="mt-2 col-md-7 ">
                        <Card.Body key={item.id}>
                          <div className="row ">
                            <p className="text-secondary"> {item.sender}</p>
                            <p>{item.message}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <div className="container">
            <form className="row" onSubmit={SubmitMessage}>
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Type your messages...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
