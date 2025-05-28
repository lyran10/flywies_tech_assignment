import React from 'react'
import { createPortal } from 'react-dom'
import {X} from "lucide-react"

type Props = {
    children? : React.ReactNode
    close? : () => void
}


export const BackDrop = ({children, close} : Props) => {
  return createPortal(
    <div className='absolute bg-[rgba(0,0,0,0.6)] top-0 z-[1] h-full w-full flex justify-center items-center'>
      <div className='relative flex justify-start items-start flex-col gap-3 p-3 w-[50%] bg-[#f5f5f5] rounded-md'>
        {children}
        <X onClick={close} className='absolute top-3 right-3 cursor-pointer'/>
      </div>
    </div>,
    document.getElementById("modal")!
  )
}
