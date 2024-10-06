import { useEffect } from 'react';
import AppRouter from './routes';

import '~/styles/globalStyle.scss';
import { useStore } from './hook/store';
function App() {
    const setLogin = useStore((state) => state.setLogin);
    useEffect(() => {
        localStorage?.login && setLogin();
    }, []);
    return <AppRouter />;
}

export default App;
