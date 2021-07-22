import Blocks from '../Blocks';

const blocks = {
    path: '/blocks',
    component: Blocks,
    exact: true
};

const transactions = {
    path: '/transactions',
    component: Blocks,
    exact: true
};

export default routes = [
    blocks,
    transactions
];
