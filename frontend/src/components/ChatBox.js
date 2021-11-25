import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Card from '../../node_modules/react-bootstrap/esm/Card';
import Row from '../../node_modules/react-bootstrap/esm/Row';

const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:8888'
        : window.location.host;

export default function ChatBox(props) {

    const { userInfo } = props;
    const [socket, setSocket] = useState(null);

    const uiMessagesRef = useRef(null);

    // open & close chatbox
    const [isOpen, setIsOpen] = useState(false);

    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([
        { name: 'Admin', body: 'Hello there, how can I help you ?' },
    ]);

    useEffect(() => {
        if (uiMessagesRef.current) {
            uiMessagesRef.current.scrollBy({
                top: uiMessagesRef.current.clientHeight,
                left: 0,
                behavior: 'smooth',
            });
        }

        if (socket) {
            socket.emit('onLogin', {
                _id: userInfo._id,
                name: userInfo.name,
                isAdmin: userInfo.isAdmin,
            });
            socket.on('message', (data) => {
                setMessages([...messages, { body: data.body, name: data.name }]);
            });
        }
    }, [messages, isOpen, socket]);

    const supportHandler = () => {
        setIsOpen(true);
        console.log(ENDPOINT);
        const sk = socketIOClient(ENDPOINT);
        setSocket(sk);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert('Error. Type smthing before send.');
        } else {
            setMessages([...messages, { body: messageBody, name: userInfo.name }]);
            // clear input
            setMessageBody('');
            // anti spam
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    name: userInfo.name,
                    isAdmin: userInfo.isAdmin,
                    _id: userInfo._id,
                });
            }, 1000);
        }
    };
    const closeHandler = () => {
        setIsOpen(false);
    };
    return (
        <div className="chatbox">
            {
                !isOpen
                    ? (<button type="button" style={{ position: 'absolute', bottom: '1rem', right: '1rem', borderRadius: '100px', height: '80px', width: '80px' }} onClick={supportHandler}>
                        <img src="/images/logo.png" style={{ width: "50px", height: "50px" }} alt="" />
                    </button>)
                    : (
                        <div style={{ backgroundColor: 'white', border: '0.5px solid', borderRadius: '10px', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                            <div style={{ height: '10%', top: '10px', borderBottom: '1px solid', width: '100%', display: 'flex', alignItems: 'center' }}>
                                <span style={{ paddingLeft: '10px' }}>Support</span>
                                <svg
                                    onClick={closeHandler}
                                    width="16" height="16" fill="currentColor" className='chatbox-exit' viewBox="0 0 16 16" style={{ position: 'absolute', right: '10px' }}>
                                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                </svg>
                            </div>
                            <div style={{ height: '82.5%' }}>
                                <ul ref={uiMessagesRef} style={{}}>
                                    {messages.map((msg, index) => (
                                        <li key={index}>
                                            <strong>{`${msg.name}:`}</strong> {msg.body}
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>
                            <div style={{ height: '7.5%' }}>
                                <form onSubmit={submitHandler} style={{ height: '100%' }}>
                                    <input
                                        type="text"
                                        placeholder="...Type Here..."
                                        value={messageBody}
                                        onChange={(e) => setMessageBody(e.target.value)} />
                                    <button type="submit" style={{ width: '20%', height: '100%' }}>Send</button>
                                </form>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}