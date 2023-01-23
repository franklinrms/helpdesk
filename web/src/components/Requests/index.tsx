import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import UserContext from '../../context/UserContext';
import api, { baseURL } from '../../lib/api';
import RequestCard from '../RequestCard';
import * as S from './styled';

export interface RequestType {
    id: string;
    title: string;
    status: 'NEW' | 'IN_PROGRESS' | 'DONE';
    customerId: string;
    createdAt: string;
}

export default function Requests(): JSX.Element {
    const [requests, setRequests] = useState([]);
    const [isSelectedFilter, setIsSelectedFilter] = useState('IN_PROGRESS');

    const socket = io(baseURL);
    const { userAuth } = useContext(UserContext);

    useEffect(() => {
        userAuth();
    }, []);

    const getRequests = async (): Promise<void> => {
        try {
            const { data } = await api.get('request');
            setRequests(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void getRequests();
    }, []);

    socket.on('request_update', () => {
        void getRequests();
    });

    if (requests.length === 0) return <div>sem requisições</div>;

    return (
        <S.RequestsContainer filter={isSelectedFilter}>
            <div className="details">
                <h3>Solicitações</h3>
                <span>{requests.length}</span>
            </div>

            <div className="filters">
                <button
                    type="button"
                    className={
                        isSelectedFilter === 'IN_PROGRESS' ? 'selected' : ''
                    }
                    onClick={() => {
                        setIsSelectedFilter('IN_PROGRESS');
                    }}
                >
                    em andamento
                </button>
                <button
                    type="button"
                    className={isSelectedFilter === 'DONE' ? 'selected' : ''}
                    onClick={() => {
                        setIsSelectedFilter('DONE');
                    }}
                >
                    finalizados
                </button>
            </div>

            {requests.map((request: RequestType) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </S.RequestsContainer>
    );
}
