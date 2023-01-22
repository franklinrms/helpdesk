import styled from 'styled-components';

export const RequestsContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid ${({ theme }) => theme.colors.surface_primary};
    padding: 50px 20px;

    height: 100%;

    overflow-y: auto;
    overflow-x: hidden;

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
`;
