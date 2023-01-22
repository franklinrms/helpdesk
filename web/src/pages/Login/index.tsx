import React, { useState } from 'react';
import { Envelope, Key } from 'phosphor-react';
import * as S from './styled';
import bg from '../../assets/auth-page-bg.svg';

export default function Login(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <S.Container bg={bg}>
            <S.Form>
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
