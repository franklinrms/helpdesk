import styled from 'styled-components';

export const Container = styled.div`
    h1 {
        ${({ theme }) => theme.mixins.flexBetween};
        height: 60px;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.surface_primary};
    }
    & > div {
        ${({ theme }) => theme.mixins.flexBetween};
        width: 100%;
        height: calc(100vh - 60px);
        max-height: 100vh;
        padding: 0 30px;
    }
`;
