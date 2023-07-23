import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { primaryColor } from '../utils/colors'

const CustomButton = ({text,color,textColor,type, className,onClick,loading=false,href}) => {
    return (
        <a target='_blank' href={href}>
<Button  type={type??"submit"} onClick={onClick} className={"border-0 py-2 m-1 "+className}
         style={{backgroundColor:color??primaryColor,textColor:textColor??"white"}} >
             {loading&&<Spinner size='sm'/>} {text}</Button>
        </a>
        
        
    )
}

export default CustomButton
