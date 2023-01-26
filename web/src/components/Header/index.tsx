import React, { useContext } from 'react';
import * as S from './styled';
import logo from '../../assets/logo.svg';
import UserContext from '../../context/UserContext';
import { SignOut, UserPlus } from 'phosphor-react';

export default function Header(): JSX.Element {
    const { user, setModalIsOpen } = useContext(UserContext);
    return (
        <S.Container>
            <img src={logo} alt="logo" />

            <div>
                {user.role === 'ADMIN' && (
                    <button
                        type="button"
                        onClick={() => {
                            setModalIsOpen(true);
                        }}
                    >
                        <UserPlus size={24} weight="bold" />
                    </button>
                )}
                <span>{user.name}</span>
                <button
                    type="button"
                    onClick={() => {
                        sessionStorage.clear();
                        window.location.href = '/';
                    }}
                >
                    <SignOut size={24} weight="bold" />
                </button>
            </div>
        </S.Container>
    );
}
