import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import api from '../../lib/api';
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
    // const [test, setTest] = useState(0);
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

    // socket.on('message', () => {
    //     setTest(test + 1);
    // });

    if (requests.length === 0) return <div>sem requisições</div>;

    return (
        <S.RequestsContainer>
            {/* <h1>{test}</h1> */}
            {requests.map((request: RequestType) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </S.RequestsContainer>
    );
}
