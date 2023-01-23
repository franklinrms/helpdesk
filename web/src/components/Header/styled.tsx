import styled from 'styled-components';

export const Container = styled.header`
    ${({ theme }) => theme.mixins.flexBetween};
    height: 60px;
    width: 100%;
    padding: 0 30px;
    background-color: ${({ theme }) => theme.colors.surface_primary};

    div {
        ${({ theme }) => theme.mixins.flexCenter};
        gap: 20px;

        button {
            ${({ theme }) => theme.mixins.flexCenter};
            padding: 10px;
            transition: all 0.2s ease 0s, color 0.2s ease 0s;

            &:active {
                transform: scale(0.9);
            }
        }

        svg {
            color: ${({ theme }) => theme.colors.gray_300};
        }
    }
`;
