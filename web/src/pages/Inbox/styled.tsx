import styled from 'styled-components';

export const Container = styled.div`
    & > div {
        ${({ theme }) => theme.mixins.flexBetween};
        width: 100%;
        height: calc(100vh - 60px);
        max-height: 100vh;
        padding: 0 30px;
    }
`;
