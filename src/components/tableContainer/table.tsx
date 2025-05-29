import { type JSX } from 'react'

type  Props = {
  displayHeader : () => JSX.Element[],
  displayBody : () => JSX.Element | JSX.Element[] | undefined, 
}

export const Table = ({displayHeader, displayBody} : Props) => {
  return (
   <div className="rounded-md overflow-y-scroll border border-gray-300 mt-2 h-[80%] bg-[#f5f5f5]">
  <table className="w-full min-w-full h-auto border-collapse bg-[#f5f5f5]">
    <thead className="text-start border-b-[2px] border-slate-500">
      <tr>
        <th className="text-left p-2">
          <div className='w-4 h-4 bg-slate-300 m-auto'></div>
        </th>
        {displayHeader()}
      </tr>
    </thead>
    <tbody className='h-auto overflow-y-scroll'>
        {displayBody()}
    </tbody>

    {/* TableHead and TableBody here */}
  </table>
</div>
  )
}
