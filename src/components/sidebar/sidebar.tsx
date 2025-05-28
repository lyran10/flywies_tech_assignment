import React, { useState } from 'react'
import { Newspaper, RefreshCcw, Laptop, Map, FileQuestion} from "lucide-react"
import { List } from './list'
import { useNavigate } from 'react-router-dom'

const list = [
    {
        id : "article",
        value : "Article",
        icon : <Newspaper strokeWidth={1.5} />,
        navigate : "admin/article",
        nestedList : null 
    },
    {
        id : "auto_DealerShip",
        value : "Auto DealerShip",
        icon : <RefreshCcw strokeWidth={1.5} />,
        navigate : "admin/auto_dealerShip",
        nestedList : null 
    },
      {
        id : "career_Section",
        value : "Career Section",
        icon : <Laptop strokeWidth={1.5} />,
        nestedList : [
            {
                id : "career",
                value : "Career",
                icon : <></>,
                translate : "translate-x-[15px]",
                navigate : "admin/career",
                nestedList : null 
            },
            {
                id : "Career_Openings",
                value : "Career Openings",
                icon : <></>,
                translate : "translate-x-[15px]",
                navigate : "admin/careerOpenings",
                nestedList : null 
            },
               {
                id : "Career_Openings_Category",
                value : "Career Openings Category",
                icon : <></>,
                translate : "translate-x-[15px]",
                navigate : "admin/careerOpeningsCategory",
                nestedList : null 
            },
        ] 
    },
     {
        id : "country_State_City",
        value : "Country, state, city",
        icon : <Map strokeWidth={1.5} />,
        navigate : "admin/CityStateCountry",
        nestedList : null 
    },
       {
        id : "faq",
        value : "Faq",
        icon : <FileQuestion strokeWidth={1.5} />,
        navigate : "admin/faq",
        nestedList : null 
    },
]

export const Sidebar = () => {
    const navigate = useNavigate()
    const [listItems, setListItems] = useState<Record<string, boolean>>({})

    const handleItems = (e : React.MouseEvent<HTMLDivElement>, id : string, url : string) => {
        e.stopPropagation()
        setListItems({...listItems, [id] : !listItems[id]})
        if(url) navigate(url)
    }

  return (
    <aside className='w-[15%] bg-[rgba(255,255,255,1)] h-full px-3 py-1 border-t border-slate-300'>
        <nav className='flex flex-col justify-start items-center gap-5 w-full mt-5'>
          <List listItems={listItems} onClick={handleItems} data={list}/>
        </nav>
    </aside>
  )
}