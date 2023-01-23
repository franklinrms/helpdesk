import React from 'react';
import { CircleWavyCheck, Hourglass } from 'phosphor-react';
import * as S from './styled';
import api, { baseURL } from '../../lib/api';
import { io } from 'socket.io-client';

interface RequestControlsProps {
    requestId: string;
}

export default function RequestControls({
    requestId,
}: RequestControlsProps): JSX.Element {
    const socket = io(baseURL);
    const onOrderUpdate = async (type: string): Promise<void> => {
        try {
            await api.patch(`request/${requestId}/${type}`);
            socket.emit('request_update', 'update');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <S.Container>
            <S.Button
                status="IN_PROGRESS"
                onClick={() => {
                    void onOrderUpdate('progress');
                }}
            >
                <Hourglass size={22} weight="bold" />
                <span>em andamento</span>
            </S.Button>
            <S.Button
                status="DONE"
                onClick={() => {
                    void onOrderUpdate('done');
                }}
            >
                <CircleWavyCheck size={22} weight="bold" />
                <span>finalizado</span>
            </S.Button>
        </S.Container>
    );
}
