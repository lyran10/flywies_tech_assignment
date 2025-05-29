import { useEffect, useState } from "react"
import { useContextApi } from "../../context/context"

export const Toast = () => {
const {msg, setMsg} = useContextApi()
const [show, setShow] = useState<boolean>(false)

useEffect(() => {
    if(msg.content){
    setShow(true)
    let showTimer = setTimeout(() => { setShow(false) },4000)
    let msgTimer = setTimeout(() => { setMsg({status : "", content : "", bg : ""}) },4500)

    return () =>{
    clearTimeout(showTimer)
    clearTimeout(msgTimer)
    }  
    }
},[msg])
  
  return (
    <div className={`flex gap-3 absolute right-0 top-10 w-[250px] p-3 ${msg.bg} ${show ? "translate-x-0" : "translate-x-[500px]"} z-[20000] text-white rounded-l-md duration-300`}>
    <span>{msg.content}</span>
    </div>
  )
}