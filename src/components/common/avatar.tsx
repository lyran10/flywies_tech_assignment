import React from 'react'

type Props = {
    className : string,
    children? : React.ReactNode
}

export const Avatar = ({className, children} : Props) => {
  return (
    <div className={`rounded-full flex justify-center items-center ${className}`}>
        {children}
    </div>
  )
}
