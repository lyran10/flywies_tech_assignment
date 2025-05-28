import { Button } from '../common/button'
import { Avatar } from '../common/avatar'
import { ChevronDown  } from "lucide-react"

export const UserProfilePopup = () => {
  return (
    <div className='relative'>
        <Button id="userButton" type="button" className=' gap-3'>
            <Avatar className='w-7 h-7 bg-slate-300'></Avatar>
            <div className='flex justify-start items-start flex-col'>
                <span className='text-[0.8rem] font-semibold'>user</span>
                <div className='flex justify-between items-center gap-2'>
                    <span className='text-[0.7rem] text-slate-400 font-semibold'>Admin</span>
                    <Avatar className='w-3 h-3 border border-gray-500 text-gray-500'><ChevronDown strokeWidth={1.5} /></Avatar>
                </div>
        </div>
        </Button>
    </div> 
  )
}
