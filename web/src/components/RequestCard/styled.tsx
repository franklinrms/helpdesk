import styled from 'styled-components';
import { StatusType } from '.';

interface CardProps {
    status: StatusType;
    theme: any;
}

export const LinkCard = styled.a`
    .selected {
        transform: translateX(25px);
        /* background-color: ${({ theme }) => theme.colors.surface_tertiary}; */
    }
`;

export const Card = styled.div`
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.surface_primary};
    border-radius: 8px;
    padding: 20px 24px;
    position: relative;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 8px;
        height: 100%;
        border-radius: 8px 0 0 8px;
        ${({ theme, status }: CardProps) => theme.mixins.status[status]};
    }

    .content {
        p {
            font-size: 18px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.gray_100};
            line-height: 160%;
        }
    }

    span {
        ${({ theme }) => theme.mixins.flexCenter};
        gap: 4px;
        line-height: 160%;
    }

    .status {
        ${({ theme }) => theme.mixins.flexCenter};
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.surface_secondary};
    }
`;
