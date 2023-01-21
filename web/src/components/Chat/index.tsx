import React, { useState } from 'react';
import { io } from 'socket.io-client';

export default function Chat(): JSX.Element {
    const [newMessage, setNewMessage] = useState('');
    const requestId = 'c806751c-ab45-4f2b-a074-e8a02c7fc73f';

    const socket = io('http://localhost:3030');

    socket.emit('request_id', { requestId });

    socket.on('message', data => {
        console.log('data', data);
    });

    const onsubmit = event => {
        if (event.key === 'Enter') {
            socket.emit('message', {
                message: newMessage,
                requestId,
                userId: '100cd77f-a837-4247-a1e3-1f90ff6e7440',
            });
            setNewMessage('');
        }
    };
    return (
        <div>
            <input
                type="text"
                value={newMessage}
                onChange={event => {
                    setNewMessage(event.target.value);
                }}
                onKeyDown={onsubmit}
            />
        </div>
    );
}
