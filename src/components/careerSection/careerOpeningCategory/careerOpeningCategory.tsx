import { useEffect, useRef, useState } from 'react'
import { TableContainer } from '../../tableContainer/tableContainer'
import axios from 'axios'
import { Button } from '../../common/button'
import { useContextApi } from '../../../context/context'
import { BackDrop } from '../../common/backDrop'
import { CreateCareerOpeningCategory } from './createOpeningCategory'
import { EditCareerOpeningCategory } from './editCareerOpeningCategory'

export const URL = import.meta.env.VITE_API_URL

export const CareerOpeningCategory = () => {
  const timerRef = useRef<any | null>(null);
  const { setMsg } = useContextApi()
  const [fetchedData, setFetchedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [selectedId, setSelectedId] = useState("")
  
  const handleData = async() => {
    setIsLoading(true)
    try {
    const {data} = await axios.get(`${URL}/api/v1/admin/CareerOpeningCategory/allCareerOpeningCategory`)
    setFetchedData(data.data.docs || data.data)
    } catch (error : unknown) {
     const err = error as { message?: string, response? : any };
     setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
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
  const {data} = await axios.delete(`${URL}/api/v1/admin/CareerOpeningCategory/deleteCareerOpeningCategory/${id}`)
    setFetchedData([...fetchedData.filter((item : any) => item._id !== id)])
    setMsg({status : "success", content : data.message || data.msg, bg : "bg-green-500"}) 
  } catch (error : unknown) {
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
  }
  setDeleteLoading(false)
  setSelectedId("")
  
}

   useEffect(() => {
      clearTimeout(timerRef.current)
      if(!openEdit && !openCreate){
        timerRef.current = setTimeout(() => {
            handleData()
        },1000)
      }else{
       if(!openEdit && !openCreate) handleData()
      }
      return () => clearTimeout(timerRef.current)
    },[openEdit, openCreate])

const displayHeader = () => {
  let headers = ["Title", "Type", "Operations"]
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

    if(fetchedData && !fetchedData.length){
      return <tr><td>No Data</td></tr>
  }

  if(fetchedData && fetchedData.length){
      return fetchedData.map((item : any, index : number) => {
          return (
              <tr key={index} className={`border-b border-slate-300`}>
                 <td className="text-left p-2">
                     <div className='w-4 h-4 bg-slate-300 m-auto'></div>
                 </td>
                  <td className="text-left p-2">{item.title}</td>
                  <td className="text-left p-2">{item.type}</td>
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
    header="Career opening category"
    displayHeader={displayHeader}
    displayBody={displayBody || []}
    openCreateArticle={handleOpenCreate}
    />
  {
    openEdit && (
    <BackDrop close={closeEdit}>
       <EditCareerOpeningCategory id={selectedId}/>
    </BackDrop>
    )
  }

    {
    openCreate && (
    <BackDrop close={closeCreate}>
       <CreateCareerOpeningCategory />
    </BackDrop>
    )
  }
    </>
  )
}