import styled from 'styled-components';

export const Container = styled.div`
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    height: 100vh;
    padding: 0 30px;
`;
