import React from 'react';
import Chat from '../../components/Chat';
import Requests from '../../components/Requests';

export default function Inbox(): JSX.Element {
    return (
        <div>
            <Requests />
            <Chat />
        </div>
    );
}
