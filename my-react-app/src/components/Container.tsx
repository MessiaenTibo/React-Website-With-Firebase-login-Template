import { Outlet } from 'react-router-dom';

export default () => {

    return (
        <div>
            <h1 >Container</h1>
            <Outlet />
        </div>
    );
};
