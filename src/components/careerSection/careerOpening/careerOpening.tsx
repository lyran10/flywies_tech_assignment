import { useEffect, useRef, useState } from 'react'
import { TableContainer } from '../../tableContainer/tableContainer'
import axios from 'axios'
import { Button } from '../../common/button'
import { useContextApi } from '../../../context/context'
import { BackDrop } from '../../common/backDrop'
import { CreateCareerOpenings } from './createCareeropening'
import { EditCareerOpenings } from './editCareerOpenings'
// import { EditCareer } from './editCareer'
// import { CreateCareer } from './createCareer'

export const URL = import.meta.env.VITE_API_URL

export const CareerOpenings = () => {
  const timerRef = useRef<any | null>(null);
  const { search, setMsg } = useContextApi()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<{start : number, end : number}>({start : 1, end : 10})
  const [disable, setDisable] = useState<{next : boolean, prev : boolean}>({next : false, prev : false})
  const [totalDocs, setTotalDocs] = useState(0)
  const [fetchedData, setFetchedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const next = () => {
    setPage((p) => p+1)
  }

  const prev = () => {
    setPage((p) => p-1)
  }
  
  const handleData = async() => {
    setIsLoading(true)
    try {
    const {data} = await axios.get(`${URL}/api/v1/admin/allCareerOpening?search=${search}&fromDate=&toDate=&page=${page}&limit=10`)
    console.log(data)
    setFetchedData(data.data.docs)
    setDisable({next : data.data.hasNextPage ? false : true, prev : data.data.hasPrevPage ? false : true})
    setLimit({
    start: (page - 1) * 10 + 1,
    end: (page - 1) * 10 + data.data.docs.length,
  });
    setTotalDocs(data.data.totalDocs)
    } catch (error : unknown) {
      const err = error as {message? : string}
      setMsg({status : "error", content : err.message as string, bg : "bg-red-500"}) 
    }
    setIsLoading(false)
  }

  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

   const closeCreate = () => {
    setOpenCreate(false)
  }

  const handleOpenEdit = (id : string) => {
      setOpenEdit(true)
      setSelectedId(id)
  }

  const closeEdit = () => {
    setOpenEdit(false)
  }

const handleDeleteArticle = async(id : string) => {
  setDeleteLoading(true)
  setSelectedId(id)
  try {
  const {data} = await axios.delete(`${URL}/api/v1/admin/deleteCareerOpening/${id}`)
  if(data.msg === "deleted") setMsg({status : "success", content : "Deleted Successfully.", bg : "bg-green-500"}) 
  } catch (error : unknown) {
    const err = error as {message? : string}
    setMsg({status : "error", content : err.message as string, bg : "bg-red-500"}) 
  }
  setDeleteLoading(false)
  setSelectedId("")
  setFetchedData([...fetchedData.filter((item : any) => item._id !== id)])
}

   useEffect(() => {
      clearTimeout(timerRef.current)
      if(search && !openEdit && !openCreate){
        timerRef.current = setTimeout(() => {
            handleData()
        },1000)
      }else{
       if(!openEdit && !openCreate) handleData()
      }
      return () => clearTimeout(timerRef.current)
    },[page, search, openEdit, openCreate])

const displayHeader = () => {
  let headers = ["Location", "Title", "Description", "Operations"]
  return(
      headers.map((item) => {
          return(
              <th key={item} className={`${item === "Operations" ? "text-center" : "text-left"}  p-2`}>{item}</th>
          )
      })
      )
}

const displayBody = () => {
   if(isLoading){
      return <tr className='absolute w-full h-[300px] flex justify-center items-center'>
                <td>Loading...</td>
             </tr>
    }

    if(!fetchedData.length){
      return <tr><td>No Data</td></tr>
  }

  if(fetchedData.length){
      return fetchedData.map((item : any, index : number) => {
          return (
              <tr key={index} className={`border-b border-slate-300`}>
                 <td className="text-left p-2">
                     <div className='w-4 h-4 bg-slate-300 m-auto'></div>
                 </td>
                  <td className="text-left p-2">{item.location}</td>
                  <td className="text-left p-2">{item.title}</td>
                  <td className="text-left p-2">{item.description}</td>
                  <td className="text-center p-2 flex justify-center items-center gap-2">
                    <Button id="edit" type="button" onClick={() => handleOpenEdit(item._id)} className='text-[rgba(60,179,113,1)] px-4 py-1 bg-[rgba(60,179,113,0.1)]'>Edit</Button>
                    <Button id="" type="button" onClick={() => handleDeleteArticle(item._id)} className='text-[rgba(255,0,0,1)] px-4 py-1 bg-[rgba(255,0,0,0.1)]'>{selectedId === item._id && deleteLoading ? "Deleting..." : "Delete"}</Button>
                  </td>
              </tr>
          )
      })
  }
}

  return (
    <>
    <TableContainer 
    header="Career openings"
    next={next}
    prev={prev}
    disable={disable}
    limit={limit}
    totalDocs={totalDocs}
    displayHeader={displayHeader}
    displayBody={displayBody || []}
    openCreateArticle={handleOpenCreate}
    />
  {
    openEdit && (
    <BackDrop close={closeEdit}>
       <EditCareerOpenings id={selectedId}/>
    </BackDrop>
    )
  }

    {
    openCreate && (
    <BackDrop close={closeCreate}>
       <CreateCareerOpenings />
    </BackDrop>
    )
  } 
    </>
  )
}