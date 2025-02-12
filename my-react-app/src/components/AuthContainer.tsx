// Imports from react
import { Outlet } from 'react-router-dom'


// Export default
export default () => {
    return (
        <div className=' flex h-screen min-h-[700px]'>
            <div className='flex m-auto justify-center items-center h-full'>
                <Outlet />
            </div>
        </div>
    )
}