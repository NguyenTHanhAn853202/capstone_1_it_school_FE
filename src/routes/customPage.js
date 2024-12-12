import React, { lazy } from 'react';
import Lading from '~/pages/Lading';
import { pathname } from './pathname';
import UploadQuestion from '~/pages/UploadQuestion';
const AccountManagement = lazy(() => import('~/pages/AccountManagement'));
const AcceptInstructor = lazy(() => import('~/pages/AcceptInstuctor'));
const InstructorRegister = lazy(() => import('~/pages/InstructorRegister'));
const CreatePost = React.lazy(() => import('../pages/CreatePost'));
const DetailPost = React.lazy(() => import('~/pages/DetailPost'));
const Post = React.lazy(() => import('~/pages/Post'));
const Chat = React.lazy(() => import('~/pages/Chat'));
const MyCourse = React.lazy(() => import('~/pages/MyCourse'));
const Store = React.lazy(() => import('~/pages/Store'));
const HomePage = React.lazy(() => import('~/pages/HomePage'));
const Lesson = React.lazy(() => import('~/pages/Lesson'));
const FormEditLesson = React.lazy(() => import('~/pages/FormEditLesson'));
const EditCourse = React.lazy(() => import('~/pages/EditCourse'));
const CreateCourse = React.lazy(() => import('~/pages/CreateCourse'));
const ForgotPassword = React.lazy(() => import('~/components/ForgotPassword'));
const VerifyCode = React.lazy(() => import('~/components/ForgotPasswordOtp'));
const Profile = React.lazy(() => import('~/pages/Profile'));
const VerifyCodeSeccesfully = React.lazy(() => import('~/components/VerifyCodeSuccesfully'));
const ChangePassowrd = React.lazy(() => import('~/pages/ChangePassword'));
const CourseInformation = React.lazy(() => import('~/pages/CourseInformation'));
const CourseManagement = React.lazy(() => import('~/pages/CourseManagement'));

export const publicPath = [
    { pathname: pathname.HOME, Element: HomePage },
    { pathname: pathname.EXPERIENCE, Element: Lading, noLayout: true },
    { pathname: pathname.FORGOT_PASSWORD, Element: ForgotPassword },
    { pathname: pathname.VERIFY_CODE, Element: VerifyCode },
    { pathname: pathname.PROFILE, Element: Profile },
    { pathname: pathname.VERIFY_CODE_SUCCESFULLY, Element: VerifyCodeSeccesfully },
    { pathname: pathname.CHANGE_PASSWORD, Element: ChangePassowrd, noLayout: true },
    { pathname: pathname.UPLOADQUESTION, Element: UploadQuestion },
    { pathname: pathname.COURSEINFORMATION + '/:id', Element: CourseInformation },
    { pathname: pathname.STORE, Element: Store },
    { pathname: pathname.POST, Element: Post },
    { pathname: pathname.POSTDETAIL + '/:id', Element: DetailPost },
    { pathname: pathname.INSTRUCTOR, Element: InstructorRegister },
];

export const privatePath = [
    { pathname: pathname.CHAT, Element: Chat },
    { pathname: pathname.LESSON + '/:id', Element: Lesson },
    { pathname: pathname.MYCOURSE, Element: MyCourse },
    { pathname: pathname.CREATEPOST, Element: CreatePost },
];

export const instructorPath = [
    { pathname: pathname.CREATECOURSE, Element: CreateCourse },
    { pathname: pathname.EDITCOURSE + '/:id', Element: EditCourse },
    { pathname: pathname.EDITLESSON + '/:id', Element: FormEditLesson },
    { pathname: pathname.COURSEMANAGEMENT, Element: CourseManagement },
];

export const adminPath = [
    { pathname: pathname.ACCEPT_INSTRUCTOR, Element: AcceptInstructor },
    { pathname: pathname.ACCOUNT_MANAGEMENT, Element: AccountManagement },
];
