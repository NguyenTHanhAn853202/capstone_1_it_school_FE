import React from 'react';

// const Home =  React.lazy(()=> import("~/pages/Home"))
import Home from '~/pages/Home';
import Lading from '~/pages/Lading';
import LoginRegister from '~/pages/LoginRegister';

export const publicPath = [
    { pathname: '/', Element: Home },
    { pathname: '/experience', Element: Lading, noLayout: true },
];

export const privatePath = [];
