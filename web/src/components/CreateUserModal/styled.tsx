import styled from 'styled-components';

interface modalProps {
    modalIsOpen: boolean;
}

export const ModalContainer = styled.div`
    display: ${({ modalIsOpen }: modalProps) =>
        modalIsOpen ? 'block' : 'none'};
    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;

        background-color: ${({ theme }) => theme.colors.surface_primary};
        padding: 6rem;
        border-radius: 8px;
        box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
        z-index: 10;

        h2 {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 20px;
            color: ${({ theme }) => theme.colors.green_500};
        }

        form {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-direction: column;
            gap: 24px;
        }
        h1 {
            margin-bottom: 20px;
        }
        input {
            width: 100%;
            height: 50px;
            font-size: 16px;
            background: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.white};
            padding: 0px 1em;
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
        div {
            ${({ theme }) => theme.mixins.flexCenter};
            gap: 8px;
        }
        .container {
            display: block;
            height: 1.5em;
            width: 1.5em;
            cursor: pointer;
            position: relative;
        }
        input[type='checkbox'] {
            position: absolute;
            transform: scale(0);
        }
        input[type='checkbox']:checked ~ .checkmark {
            transform: rotate(45deg) translateY(-6px);
            width: 14px;
            margin-left: 5px;
            border-color: ${({ theme }) => theme.colors.green_300};
            border-width: 5px;
            border-top-color: transparent;
            border-left-color: transparent;
            border-radius: 0;
        }

        .checkmark {
            display: block;
            width: inherit;
            height: inherit;
            border: 2px solid ${({ theme }) => theme.colors.green_500};
            border-radius: 6px;
            transition: all 0.375s;
        }
        .button {
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
            margin-top: 30px;

            &:disabled {
                background: ${({ theme }) => theme.colors.green_700};
                color: ${({ theme }) => theme.colors.text};
            }
        }
        .error {
            border: 2px solid ${({ theme }) => theme.colors.red};
            color: ${({ theme }) => theme.colors.red};
        }
    }
    .close-modal {
        position: absolute;
        top: 1.2rem;
        right: 2rem;
        color: ${({ theme }) => theme.colors.gray_300};
        cursor: pointer;
        border: none;
        background: none;
        transition: color 0.2s;

        &:active {
            transform: scale(0.9);
        }

        &:hover {
            color: ${({ theme }) => theme.colors.gray_100};
        }
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(3px);
        z-index: 5;
    }
`;
