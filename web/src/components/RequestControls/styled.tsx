import styled, { css } from 'styled-components';

interface ButtonProps {
    status: string;
    theme: any;
}

export const Container = styled.div`
    ${({ theme }) => theme.mixins.flexBetween};
    gap: 20px;
`;

export const Button = styled.button`
    ${({ theme }) => theme.mixins.flexCenter};
    gap: 10px;
    ${({ theme, status }: ButtonProps) => css`
        color: ${status === 'DONE'
            ? theme.colors.green_300
            : theme.colors.secondary};
    `};
    background-color: ${({ theme }) => theme.colors.surface_secondary};
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: 700;
    transition: background 0.2s ease 0s, color 0.2s ease 0s;
    border-radius: 8px;
    white-space: nowrap;

    &:hover {
        background-color: ${({ theme }) => theme.colors.surface_tertiary};
    }
`;
