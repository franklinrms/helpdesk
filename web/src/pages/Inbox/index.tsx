import React from 'react';
import Chat from '../../components/Chat';
import Requests from '../../components/Requests';
import * as S from './styled';

export default function Inbox(): JSX.Element {
    return (
        <S.Container>
            <h1>header</h1>
            <div>
                <Requests />
                <Chat />
            </div>
        </S.Container>
    );
}
