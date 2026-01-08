import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    classname="",
    ...props
}, ref) {
    const id=useId();
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pb-2' htmlFor={id}></label> }
        <select id={id} {...props} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}>
            {options?.map((option)=>(
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default forwardRef(Select)