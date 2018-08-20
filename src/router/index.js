import React from 'react';
import Home from '../components/Dashboard';
import InboundList from '../components/Inbound/List';
import InboundDetail from '../components/Inbound/Detail';

const routes = [
    {
        path: '/',
        exact: true,
        activeClassName: "active",
        component: Home
    },
    {
        path: '/inbound',
        exact: true,
        component: InboundList
    },
    {
        path: '/inbound/:id',
        exact: true,
        component: InboundDetail
    },
    
]

export default routes;

//sidebar: () => <div>shoelaces!</div>, for menu in sidebar