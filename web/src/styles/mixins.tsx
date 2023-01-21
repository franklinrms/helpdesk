import { css } from 'styled-components';

const mixins = {
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,

    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,

    resetList: css`
        list-style: none;
        padding: 0;
        margin: 0;
    `,
};

export default mixins;
