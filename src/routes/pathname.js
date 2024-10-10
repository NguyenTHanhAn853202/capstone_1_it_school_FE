import React from 'react';

// const Home =  React.lazy(()=> import("~/pages/Home"))
import Home from '~/pages/Home';
import Lading from '~/pages/Lading';
import LoginRegister from '~/pages/LoginRegister';
const ForgotPassword = React.lazy(() => import('~/components/ForgotPassword'));
const VerifyCode = React.lazy(() => import('~/components/ForgotPasswordOtp'));
const Profile = React.lazy(() => import('~/pages/Profile'));

export const publicPath = [
    { pathname: '/', Element: Home },
    { pathname: '/experience', Element: Lading, noLayout: true },
    { pathname: '/forgot-password', Element: ForgotPassword },
    { pathname: '/verify-code', Element: VerifyCode },
    { pathname: '/profile', Element: Profile },
];

export const privatePath = [];
