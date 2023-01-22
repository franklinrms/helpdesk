import styled from 'styled-components';

export const Container = styled.div`
    ${({ theme }) => theme.mixins.flexCenter};
    width: 100%;
    height: 100vh;

    background: url(${({ bg }: { bg: string }) => bg}) no-repeat fixed;
    background-size: contain;
    background-position: right;
`;

export const Form = styled.form`
    ${({ theme }) => theme.mixins.flexCenter};
    background-color: ${({ theme }) => theme.colors.surface_primary};
    flex-direction: column;
    width: 100%;
    max-width: 480px;
    border-radius: 8px;
    padding: 64px;
    gap: 24px;

    div {
        position: relative;
        flex: 1 1 0%;
        width: 100%;

        svg {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            transition: color 0.2s ease 0s;
            color: ${({ theme }) => theme.colors.gray_300};
        }
        input {
            width: 100%;
            height: 50px;
            font-size: 16px;
            background: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.white};
            padding: 0px 1em 0px 2.65em;
            border-radius: 8px;
            border: 2px solid ${({ theme }) => theme.colors.background};
            outline: none;

            ::placeholder {
                color: ${({ theme }) => theme.colors.gray_300};
            }
        }
        input:focus {
            border: 2px solid ${({ theme }) => theme.colors.green_500};
        }

        .error {
            border: 2px solid ${({ theme }) => theme.colors.red};
        }
    }
    button {
        width: 100%;
        height: 50px;
        background: ${({ theme }) => theme.colors.green_500};
        color: ${({ theme }) => theme.colors.white};
        font-size: 16px;
        font-weight: 700;
        border-radius: 8px;
        transition: background 0.2s ease 0s, color 0.2s ease 0s;
        font-size: 16px;
        text-transform: uppercase;

        &:disabled {
            background: ${({ theme }) => theme.colors.green_700};
        }
    }
`;
