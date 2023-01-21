import styled from 'styled-components';

export const RequestsContainer = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid ${({ theme }) => theme.colors.surface_tertiary};
    padding: 0 20px;

    height: 100%;

    overflow-y: auto;
    overflow-x: hidden;
`;
