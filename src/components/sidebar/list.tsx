import React from 'react'
import { ChevronDown } from "lucide-react"

type Props = {
    data : any[],
    onClick : (e : React.MouseEvent<HTMLDivElement>, value : string, url : string) => void,
    listItems : Record<string, boolean>,
}

export const List = ({data, onClick, listItems} : Props) => {
  return (
    data && data.length && data.map(({id, value, icon, nestedList, translate, navigate}  : any) => {
        return (
            <div id={id} onClick={(e : React.MouseEvent<HTMLDivElement>) => onClick(e, id, navigate)} key={id} className={`flex flex-col justify-start items-start gap-2 w-full cursor-pointer`}>
                <div className={`${translate} relative w-full flex justify-between items-center text-[14px] font-semibold`}>
                    <div className={`flex gap-2 w-full`}>
                        {icon && icon}
                        {value}
                    </div>
                  {nestedList && nestedList.length && (<ChevronDown className={` ${listItems[id] ? "rotate-180" : "rotate-0"}`} strokeWidth={1.5} size={15}/>)}
                </div>
                {
                    listItems[id] && nestedList && nestedList.length
                    ?
                    <div className='text-gray-400 flex flex-col gap-2 w-full'>
                    <List listItems={listItems} onClick={onClick} data={nestedList}/>
                    </div>
                    :
                    null
                }
            </div>
        )
    })
  )
}
