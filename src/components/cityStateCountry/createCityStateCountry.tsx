import React, { useEffect, useState } from 'react'
import { Input } from '../common/input'
import { Button } from '../common/button'
import axios from 'axios'
import { URL } from './cityStateCountry'
import { useContextApi } from '../../context/context'


export const CreateCityStateCountry = () => {
  const {setMsg} = useContextApi()
  // const [state, formAction, isPending] = useActionState<any,any>(handleSubmit, { errors: {}});
  const [countries, setCountries] = useState<any[]>([])
  const [countryId, setCountryId] = useState("")
  const [states, setStates] = useState<any[]>([])
  const [stateId, setStateId] = useState("")
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

    const getCountries = async() => {
    try {
    const {data} = await axios.get(`${URL}/api/v1/admin/cityStateCountry/getCountry`)
    setCountries(data.data)
    console.log(data)
    } catch (error : unknown) {
      const err = error as {message? : string}
      setMsg({status : "error", content : err.message as string, bg : "bg-red-500"}) 
    }
  }

    const getState = async() => {
    try {
    const {data} = await axios.get(`${URL}/api/v1/admin/cityStateCountry/getState?country=${countryId}`)
    setStates(data.data)
    console.log(data.data)
    } catch (error : unknown) {
      const err = error as {message? : string}
      setMsg({status : "error", content : err.message as string, bg : "bg-red-500"}) 
    }
  }

  useEffect(() => {
    getCountries()
  },[])
   useEffect(() => {
    if(countryId){
      getState()
    }else{
      setStates([])
    }
  },[countryId])
  
  async function handleSubmit (e : React.FormEvent) {
  e.preventDefault()
  setIsLoading(true)
  const errs : any = {}
  if (!countryId) errs["countryId"] = "Country is required.";
  if (!stateId) errs["stateId"] = "State is required.";
  if (!city) errs["city"] = "City is required.";

  if (Object.keys(errs).length > 0) {
    setErrors(errs)
    setIsLoading(false)
    return
  }

  try {
    const {data} = await axios.post(`${URL}/api/v1/admin/cityStateCountry/cities`,{selectCity : city, state : stateId, country : countryId, type : "city"});
    setMsg({ status: "success", content: data.message || data.msg, bg : "bg-green-500" })
    setCity("")
    setCountryId("")
    setStateId("")
  } catch (error: unknown) {
    const err = error as { message?: string, response? : any };
    setMsg({status : "error", content : err.response.data.message as string || err.message || "", bg : "bg-red-500"}) 
  }
   setIsLoading(false)
   
};

  return (
    <>
       <header className='font-bold text-[1.2rem]'>City State Country</header>
        <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='flex flex-col w-full'>
            <label>Country</label>
            <select className='p-2 bg-slate-300 rounded-md' onChange={(e : React.ChangeEvent<HTMLSelectElement>) => setCountryId(e.target.value)} name="country" id="countrySelect">
              <option value="">Select Country</option>
              {
                countries.length && (
                  countries.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>{item.selectCity}</option>
                    )
                  })
                )
              }
            </select>
             {!countryId && errors.countryId ? <span className='text-[13px] text-red-500'>{errors.countryId}</span> : null} 
          </div>

           <div className="flex flex-col w-full">
             <label>State</label>
            <select className='p-2 bg-slate-300 rounded-md' onChange={(e : React.ChangeEvent<HTMLSelectElement>) => setStateId(e.target.value)}  name="state" id="stateSelect">
              <option value="">Select State</option>
             {
              states.length && (
                 states.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>{item.selectCity}</option>
                    )
                  })
              )
            }
            </select>
             {!stateId && errors.stateId ? <span className='text-[13px] text-red-500'>{errors.stateId}</span> : null} 
           </div>
            <Input tag="input" label='City' labelClasses='font-semibold' className='bg-slate-300' width='w-full' type="text" placeholder='Enter City' name="city" value={city} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}>
              {!city && errors.city ? <span className='text-[13px] text-red-500'>{errors.city}</span> : null} 
            </Input>
           <Button id="createButton" type={"submit"} className='py-1 px-2 w-auto text-white rounded-md bg-[rgba(48,169,185,1)]'>{isLoading ? "Creating..." : "Create"}</Button>
        </form>
    </>
  )
}