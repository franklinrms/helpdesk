import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import UserContext from '../../context/UserContext';
import api, { baseURL } from '../../lib/api';

interface MessageType {
    id: string;
    message: string;
    requestId: string;
    userId: string;
    createdAt: string;
}

export default function Chat(): JSX.Element {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { user } = useContext(UserContext);

    const location = useLocation();
    const requestId = location.pathname.split('/')[3];
    const socket = io(baseURL);

    const getMessages = async (): Promise<void> => {
        try {
            const { data } = await api.get(`requests/${requestId}`);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void getMessages();
    }, []);

    socket.emit('request_id', requestId);

    socket.on('message', (data: MessageType) => {
        setMessages([...messages, data]);
    });

    const onSubmitMessage = (): void => {
        socket.emit('message', {
            message: newMessage,
            requestId,
            userId: user.userId,
        });
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map(message => (
                    <div key={message.id}>
                        <p>{message.message}</p>
                        <p>{message.createdAt}</p>
                    </div>
                ))}
            </div>
            <hr />
            <form
                onSubmit={event => {
                    event.preventDefault();
                    onSubmitMessage();
                }}
            >
                <input
                    type="text"
                    value={newMessage}
                    required
                    onChange={event => {
                        setNewMessage(event.target.value);
                    }}
                />
                <button type="submit">enviar</button>
            </form>
        </div>
    );
}
