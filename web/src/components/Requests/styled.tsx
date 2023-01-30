import styled, { css } from 'styled-components';

interface FilterProps {
    filter: string;
    theme: any;
}

export const RequestsContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid ${({ theme }) => theme.colors.surface_primary};
    padding: 30px 20px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .details {
        ${({ theme }) => theme.mixins.flexBetween};

        h3 {
            font-size: 20px;
            font-weight: 700;
            line-height: 160%;
            color: ${({ theme }) => theme.colors.gray_100};
        }
        span {
            line-height: 160%;
            font-size: 16px;
        }
    }

    .filters {
        ${({ theme }) => theme.mixins.flexBetween};
        margin-top: 15px;
        margin-bottom: 20px;

        button {
            ${({ theme }) => theme.mixins.flexCenter};
            background-color: ${({ theme }) => theme.colors.surface_primary};
            border: 1px solid ${({ theme }) => theme.colors.surface_primary};
            font-weight: 500;
            width: 48%;
            line-height: 160%;
            color: ${({ theme }) => theme.colors.gray_300};
            padding: 8px 12px;
            gap: 10px;
            border-radius: 4px;
            text-transform: uppercase;
            transition: color 0.2s ease 0s, transform 0.2s ease 0s;

            &:active {
                transform: scale(0.95);
            }
        }
        .selected {
            ${({ theme, filter }: FilterProps) => css`
                color: ${filter === 'DONE'
                    ? theme.colors.green_300
                    : theme.colors.secondary};
                border-color: ${filter === 'DONE'
                    ? theme.colors.green_300
                    : theme.colors.secondary};
            `};
        }
    }

    ::-webkit-scrollbar {
        display: none;
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 10px;
    }
    ::-webkit-scrollbar-corner {
        background: none;
        border: none;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.surface_tertiary};
        border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
        border: none;
    }

    &:hover {
        ::-webkit-scrollbar {
            display: block;
        }
    }
`;
