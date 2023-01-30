import styled from 'styled-components';

export const Container = styled.div`
    ${({ theme }) => theme.mixins.flexBetween};
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    height: calc(100vh - 60px);
    max-height: 100vh;
    padding: 0 20px;
`;
