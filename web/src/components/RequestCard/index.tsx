import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircleWavyCheck, ClockAfternoon, Hourglass } from 'phosphor-react';
import { RequestType } from '../Requests';
import * as S from './styled';
import theme from '../../styles/theme';
import formattedDate from '../../lib/formattedDate';

interface RequestCardProps {
    request: RequestType;
}
export type StatusType = 'NEW' | 'IN_PROGRESS' | 'DONE';

const Icon = (status: StatusType): JSX.Element => {
    const icon = {
        NEW: <Hourglass size={24} weight="bold" color={theme.colors.primary} />,
        IN_PROGRESS: (
            <Hourglass size={24} weight="bold" color={theme.colors.secondary} />
        ),
        DONE: (
            <CircleWavyCheck
                size={24}
                weight="bold"
                color={theme.colors.green_300}
            />
        ),
    };
    return icon[status];
};
export default function RequestCard({
    request,
}: RequestCardProps): JSX.Element {
    const [isSelected, setIsSelected] = useState(false);

    const location = useLocation();
    const requestId = location.pathname.split('/')[3];

    useEffect(() => {
        if (requestId === request.id) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [requestId]);

    return (
        <S.LinkCard href={`/inbox/r/${request.id}`}>
            <S.Card
                status={request.status}
                className={isSelected ? 'selected' : ''}
            >
                <div className="content">
                    <p>{request.title}</p>
                    <span>
                        <ClockAfternoon
                            size={18}
                            weight="bold"
                            color={theme.colors.gray_300}
                        />
                        {formattedDate(request.createdAt)}
                    </span>
                </div>
                <div className="status">{Icon(request.status)}</div>
            </S.Card>
        </S.LinkCard>
    );
}
