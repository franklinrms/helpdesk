import React from 'react';
import Chat from '../../components/Chat';
import CreateUserModal from '../../components/CreateUserModal';
import Header from '../../components/Header';
import Requests from '../../components/Requests';
import * as S from './styled';

export default function Inbox(): JSX.Element {
    return (
        <>
            <Header />
            <CreateUserModal />
            <S.Container>
                <Requests />
                <Chat />
            </S.Container>
        </>
    );
}
