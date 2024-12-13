"use client"
import { update } from '@/redux/features/testSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function page() {
    const nm = useSelector((state)=>state.test.testiState);
    const dispatch = useDispatch();
  return (<>
    <div>state:   {nm}</div>
    <button onClick={()=>{dispatch(update(0))}}>Current time</button>
    </>)
}

export default page