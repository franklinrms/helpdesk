import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaperPlaneRight } from 'phosphor-react';
import { io } from 'socket.io-client';
import UserContext from '../../context/UserContext';
import api, { baseURL } from '../../lib/api';
import * as S from './styled';
import theme from '../../styles/theme';
import formattedDate from '../../lib/formattedDate';

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
    console.log('🚀 ~ file: index.tsx:26 ~ Chat ~ requestId', requestId);
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

    if (requestId === undefined) return <div> Selecione o chamado</div>;

    return (
        <S.ContainerChat>
            <div className="details">
                <p>Chat</p>
            </div>
            <S.ContainerMessages>
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={
                            message.userId === user.userId
                                ? 'messageAuthor'
                                : 'message'
                        }
                    >
                        <div>
                            <span>{formattedDate(message.createdAt)}</span>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </S.ContainerMessages>
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
                    placeholder="Digite sua mensagem aqui..."
                    onChange={event => {
                        setNewMessage(event.target.value);
                    }}
                />
                <button type="submit">
                    <PaperPlaneRight
                        size={24}
                        color={theme.colors.text}
                        weight="bold"
                    />
                </button>
            </form>
        </S.ContainerChat>
    );
}
