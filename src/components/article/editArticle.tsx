import React, { useState, type FormEvent } from 'react'
import { Input } from '../common/input'
import { Button } from '../common/button'
import axios from 'axios'
import { URL } from './article'
import { useContextApi } from '../../context/context'

type Props = {
  id : string
}

export const EditArticle = ({id} : Props) => {
  const {setMsg} = useContextApi()
  const [FormData, setFormData] = useState<{title : string, description : string}>({title : "", description : ""})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handlechange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...FormData, [e.target.name] : e.target.value})
  }
  
  const handleSubmit = async(e : FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const errs : any = {}
    if(!FormData.title){
      errs["title"] =  "Title Required."
    }
    if(!FormData.description){
      errs["description"] =  "Description Required."
    }
    
    if(Object.keys(errs).length){
      setErrors(errs)
      setIsLoading(false)
      return
    } 

    try {
    const {data} = await axios.put(`${URL}/api/v1/admin/Article/updateArticle/${id}`, FormData)
    setMsg({status : "success", content : data.message || data.msg, bg : "bg-green-500"}) 
    } catch (error : unknown) {
      const err = error as { message?: string, response? : any };
      setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
    }
    setIsLoading(false)
  }

  return (
    <>
       <header className='font-bold text-[1.2rem]'>Article</header>
        <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
           <Input tag="input" label='Title' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter title' name="title" value={FormData.title} onChange={handlechange}>
           {!FormData.title && errors.title ? <span className='text-[13px] text-red-500'>{errors.title}</span> : null} 
           </Input>
           <Input tag="textarea" label='Description' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter Description' name="description" value={FormData.description} onChange={handlechange}>
            {!FormData.description && errors.description ? <span className='text-[13px] text-red-500'>{errors.description}</span> : null} 
            </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isLoading ? "Saving..." : "Save"}</Button>
        </form>
    </>
  )
}
