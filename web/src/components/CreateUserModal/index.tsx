/* eslint-disable @typescript-eslint/no-misused-promises */
import { X } from 'phosphor-react';
import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import api from '../../lib/api';
import * as S from './styled';

export default function CreateUserModal(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState(false);
    const [deniedUser, setDeniedUser] = useState(false);
    const [success, setSuccess] = useState(false);

    const { modalIsOpen, setModalIsOpen } = useContext(UserContext);

    const onSubmit = async (): Promise<void> => {
        try {
            await api.post('/register', {
                email,
                password,
                name,
                role: admin ? 'ADMIN' : 'HELPER',
            });
            setSuccess(true);
        } catch (error) {
            setDeniedUser(true);
        }
    };
    return (
        <S.ModalContainer modalIsOpen={modalIsOpen}>
            <div className="modal">
                <button
                    className="close-modal"
                    onClick={() => {
                        setModalIsOpen(false);
                    }}
                >
                    <X size={32} weight="bold" />
                </button>

                {success ? (
                    <h2>Usuário cadastrado com sucesso!</h2>
                ) : (
                    <form>
                        <h1>Cadastrar usuário</h1>
                        <input
                            className={deniedUser ? 'error' : ''}
                            type="email"
                            placeholder="Email"
                            required
                            onChange={event => {
                                setEmail(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Nome"
                            required
                            onChange={event => {
                                setName(event.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            onChange={event => {
                                setPassword(event.target.value);
                            }}
                        />
                        <div>
                            <label className="container">
                                <input
                                    type="checkbox"
                                    onChange={event => {
                                        setAdmin(event.target.checked);
                                    }}
                                />
                                <div className="checkmark"></div>
                            </label>
                            <span>Permissões administrativas</span>
                        </div>
                        <button
                            className="button"
                            type="button"
                            disabled={
                                email === '' || password === '' || name === ''
                            }
                            onClick={onSubmit}
                        >
                            Cadastrar
                        </button>
                    </form>
                )}
            </div>
            <div className="overlay"></div>
        </S.ModalContainer>
    );
}
