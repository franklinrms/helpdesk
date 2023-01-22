import React, { useState } from 'react';
import { Envelope, Key } from 'phosphor-react';
import * as S from './styled';
import bg from '../../assets/auth-page-bg.svg';
import api from '../../lib/api';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [deniedUser, setDeniedUser] = useState(false);
    const navigate = useNavigate();

    const onSubmitForm = async (): Promise<void> => {
        try {
            const { data } = await api.post('/login', { email, password });

            const token = JSON.stringify(data);
            sessionStorage.setItem('94c8aa2452bccd82ee129b46f7c4be79', token);

            void useAuth();
            navigate('/inbox/');
        } catch (error) {
            // setDeniedUser(true);
        }
    };

    return (
        <S.Container bg={bg}>
            <S.Form
                onSubmit={event => {
                    event.preventDefault();
                    void onSubmitForm();
                }}
            >
                <div>
                    <Envelope size={22} weight="bold" />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <Key size={22} weight="bold" />
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={email === '' || password === ''}
                >
                    Entrar
                </button>
            </S.Form>
        </S.Container>
    );
}
