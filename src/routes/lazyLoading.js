import { Suspense } from 'react';

function LazyLoading({ children }) {
    return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}

export default LazyLoading;
