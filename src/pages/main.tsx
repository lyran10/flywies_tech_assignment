import { Sidebar } from '../components/sidebar/sidebar'
import { Navbar } from '../components/navbar/navbar'
import { Wavy } from '../components/wavy'
import { Outlet } from 'react-router-dom'
import { Toast } from '../components/common/toast'

export const Main = () => {
  return (
    <main className='relative w-screen h-screen overflow-hidden'>
        <Navbar/>
        <div className='flex justify-start items-start w-full h-[90%]'>
        <Sidebar />
        <div className='w-[85%] h-full flex justify-center items-start relative'>
          <Wavy/>
          <Outlet/>
        </div>
        </div>
        <Toast/>
    </main>
  )
}
