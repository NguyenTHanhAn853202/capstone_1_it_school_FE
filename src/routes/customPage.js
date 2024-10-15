import React from 'react';
import Home from '~/pages/Home';
import Lading from '~/pages/Lading';
import { pathname } from './pathname';
const ForgotPassword = React.lazy(() => import('~/components/ForgotPassword'));
const VerifyCode = React.lazy(() => import('~/components/ForgotPasswordOtp'));
const Profile = React.lazy(() => import('~/pages/Profile'));
const VerifyCodeSeccesfully = React.lazy(() => import('~/components/VerifyCodeSuccesfully'));
const ChangePassowrd = React.lazy(() => import('~/pages/ChangePassword'));

export const publicPath = [
    { pathname: pathname.HOME, Element: Home },
    { pathname: pathname.EXPERIENCE, Element: Lading, noLayout: true },
    { pathname: pathname.FORGOT_PASSWORD, Element: ForgotPassword },
    { pathname: pathname.VERIFY_CODE, Element: VerifyCode },
    { pathname: pathname.PROFILE, Element: Profile },
    { pathname: pathname.VERIFY_CODE_SUCCESFULLY, Element: VerifyCodeSeccesfully },
    { pathname: pathname.CHANGE_PASSWORD, Element: ChangePassowrd },
];

export const privatePath = [];
