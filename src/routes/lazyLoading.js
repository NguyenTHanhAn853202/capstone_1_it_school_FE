import { Spin } from 'antd';
import { Suspense } from 'react';

function LazyLoading({ children }) {
    return (
        <Suspense
            fallback={
                <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
                    <Spin />
                </div>
            }
        >
            {children}
        </Suspense>
    );
}

export default LazyLoading;
