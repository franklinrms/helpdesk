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

    status: {
        NEW: css`
            background-color: ${({ theme }) => theme.colors.primary};
        `,
        IN_PROGRESS: css`
            background-color: ${({ theme }) => theme.colors.secondary};
        `,
        DONE: css`
            background-color: ${({ theme }) => theme.colors.green_300};
        `,
    },
};

export default mixins;
