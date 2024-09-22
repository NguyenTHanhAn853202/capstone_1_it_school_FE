import React from 'react';

// const Home =  React.lazy(()=> import("~/pages/Home"))
import Home from '~/pages/Home';
import Lading from '~/pages/Lading';

export const publicPath = [
    { pathname: '/', Element: Home },
    { pathname: '/login', Element: Home },
    { pathname: '/experience', Element: Lading },
];

export const privatePath = [];
