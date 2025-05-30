import { Avatar } from '../common/avatar'
import { Input } from '../common/input'
import { Search, Bell } from "lucide-react"
import { useContextApi } from '../../context/context'
import { UserProfilePopup } from './userProfilePopup'

export const Navbar = () => {
    const { search, handleChange } = useContextApi();

  return (
    <nav className='w-full h-[10%] bg-[rgba(255,255,255,1)] flex justify-between items-center shadow-xl'>
        <div className=' w-0 lg:w-[15%] h-full border-r border-gray-300'>
        </div>
        <div className='w-full lg:w-[85%] h-full border-r border-gray-300 flex justify-end items-center px-5'>
            <div className='flex justify-around items-center w-full lg:w-[80%]'>
             <Input tag="input" className='pl-10' type="text" name="search" width='w-[40%]' value={search} onChange={handleChange} placeholder='Search' >
              <Search className='absolute top-1 bg-[rgba(245,246,250,1)] rounded-md p-1' size={30}/>
             </Input>
             <div>
                <div className='flex justify-center items-center'>
                    <div className='relative -translate-x-[50px]'>
                       <Avatar className='w-4 h-4 text-[10px] bg-red-600 absolute bottom-4 -right-1 text-white font-semibold'>2</Avatar>
                       <Bell className='text-[rgba(72,128,255,1)]'/>
                    </div>
                   <UserProfilePopup/>s
                </div>
                
             </div>
            </div>
        </div>
    </nav>
  )
}
