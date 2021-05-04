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
                    ? (<button type="button" onClick={supportHandler}>
                        <img src="/images/logo.png" style={{ width: "20px", height: "20px" }} alt="" />
                    </button>)
                    : (
                        <Card>
                            <Card.Body>
                                <Row><strong>Support</strong>
                                    <button type="button" onClick={closeHandler}>X</button></Row>
                                <ul ref={uiMessagesRef}>
                                    {messages.map((msg, index) => (
                                        <li key={index}>
                                            <strong>{`${msg.name}:`}</strong> {msg.body}
                                        </li>
                                    ))
                                    }
                                </ul>
                                <div>
                                    <form onSubmit={submitHandler} className="row">
                                        <input
                                            type="text"
                                            placeholder="...Type Here..."
                                            value={messageBody}
                                            onChange={(e) => setMessageBody(e.target.value)} />
                                        <button type="submit">Send</button>
                                    </form>
                                </div>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    );
}