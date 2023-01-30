import styled from 'styled-components';

export const ContainerChat = styled.div`
    background-color: ${({ theme }) => theme.colors.surface_primary};
    width: 100%;
    height: 100%;
    position: relative;

    .header {
        ${({ theme }) => theme.mixins.flexBetween};
        padding: 0 20px;
        width: 100%;
        height: 60px;
        border-right: 1px solid ${({ theme }) => theme.colors.surface_primary};
        background-color: ${({ theme }) => theme.colors.background};
    }

    .customerInfo {
        p {
            color: ${({ theme }) => theme.colors.gray_100};
            font-weight: 500;
        }
        span {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.gray_300};
        }
    }

    form {
        ${({ theme }) => theme.mixins.flexBetween};
        border-right: 1px solid ${({ theme }) => theme.colors.surface_primary};
        width: 100%;
        padding: 10px 20px;
        background-color: ${({ theme }) => theme.colors.background};

        input {
            outline: none;
            width: 100%;
            line-height: 160%;
            font-size: 18px;
            color: ${({ theme }) => theme.colors.text};
            padding: 10px 20px;
            border: none;
            background-color: ${({ theme }) => theme.colors.background};
        }

        button {
            ${({ theme }) => theme.mixins.flexCenter};
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: ${({ theme }) => theme.colors.surface_secondary};
            transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

            &:hover {
                background-color: ${({ theme }) =>
                    theme.colors.surface_tertiary};
            }
        }
    }
`;

export const ContainerMessages = styled.ul`
    height: calc(100vh - 120px - 70px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => theme.colors.surface_primary};

    ::-webkit-scrollbar {
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

    .message,
    .messageAuthor {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        div {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background-color: ${({ theme }) => theme.colors.surface_secondary};
            border-radius: 8px;
            max-width: 60%;
            margin-bottom: 20px;
            align-items: flex-start;
            gap: 4px;
            span {
                color: ${({ theme }) => theme.colors.gray_300};
                font-size: 14px;
            }
        }
    }
    .messageAuthor {
        align-items: flex-end;
        div {
            align-items: flex-end;
            background-color: ${({ theme }) => theme.colors.background};
        }
    }
`;
