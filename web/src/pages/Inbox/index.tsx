import React from 'react';
import Chat from '../../components/Chat';
import Header from '../../components/Header';
import Requests from '../../components/Requests';
import * as S from './styled';

export default function Inbox(): JSX.Element {
    return (
        <S.Container>
            <Header />
            <div>
                <Requests />
                <Chat />
            </div>
        </S.Container>
    );
}
