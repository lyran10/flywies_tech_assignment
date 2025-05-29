import {type JSX} from 'react'
import { Table } from './table'
import { Button } from '../common/button'
import { ChevronRight, ChevronLeft } from "lucide-react"

type Props = {
  header : string,
  next? : () => void
  prev? : () => void
  disable? : {next : boolean, prev : boolean}
  limit? : {start : number, end : number}
  totalDocs? :number,
  displayHeader : () => JSX.Element[],
  displayBody : () => JSX.Element | JSX.Element[] | undefined, 
  openCreateArticle : () => void
  // urls : {get : string, post : string, delete : string, put : string}
}

export const TableContainer = ({header, prev, next, disable, limit, totalDocs, displayHeader ,displayBody, openCreateArticle} : Props) => {

  return (
    <section className='absolute w-[90%] h-[90%] self-center'>
      <div className='flex justify-between items-center'>
         <header className='font-bold text-[1.5rem]'>{header}</header>
         <Button onClick={openCreateArticle} id='openCreateArticle' type='button' className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>+ new {header}</Button>
      </div>
      <Table displayHeader={displayHeader} displayBody={displayBody}/>
      {
        prev && next && (
        <div className='flex justify-between items-center'>
      <div className='flex justify-center items-center'>
        <span>Showing {limit && limit.start}-{limit && limit.end} of {totalDocs}</span>
      </div>
      <div className='flex justify-center items-center'>
        <Button disabled={disable && disable.prev || false} onClick={prev} id='prev' type='button' className=' bg-[#f5f5f5] shadow-2xl'><ChevronLeft size={20}/></Button>
        <Button disabled={disable && disable.next || false} onClick={next} id='prev' type='button' className=' bg-[#f5f5f5] shadow-2xl'><ChevronRight size={20}/></Button>
      </div>
      </div>
        )
      }
    </section>
  )
}
