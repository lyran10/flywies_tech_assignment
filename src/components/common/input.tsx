import React from 'react'

type Props = {
    tag : any
    label? : string,
    labelClasses? : string,
    width : string,
    className? : string,
    type : string
    name : string
    value? : string
    defaultValue? : string
    placeholder : string
    onChange? : (e : React.ChangeEvent<HTMLInputElement>) => void,
    children? : React.ReactNode
}
// rgba(245,246,250,1)
export const Input = ({tag="input", width, label="", labelClasses="", className="", children, ...props} : Props) => {
  const Input = tag
  return (
    <div className={`${width} relative`}>
        {label && (<label className={labelClasses}>{label}</label>)}
        <Input {...props} className={`p-2 rounded-md w-full bg-[rgba(245,246,250,1)] outline-none ${className}`}/>
        {children}
    </div>
  )
}
