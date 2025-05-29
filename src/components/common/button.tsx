import React from 'react'

type Props = {
    id : string
    type : "submit" | "reset" | "button" | undefined,
    onClick? : (e : React.MouseEvent<HTMLButtonElement>) => void,
    className? : string
    disabled? : boolean
    children? : React.ReactNode
}

export const Button = ({children, className="", ...props} : Props) => {
  return (
    <button {...props} className={`flex justify-center items-center ${className} outline-none border-none cursor-pointer`}>
        {children}
    </button>
  )
}
