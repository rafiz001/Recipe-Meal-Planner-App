"use client"
import {setMaxReadyTime,setMaxReadyTimeAvailable,setQuery,setCuisine,setDiet, fetchSearch, setPagination, setTrigger} from '@/redux/features/searchSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import Image from 'next/image'
import Link from 'next/link';
function page() {
  const [showFilter,setShowFilter] = useState(false);
  const [paginate,setPaginate] = useState({current:1,total:1});
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const cuisines = ["african", "asian", "american", "british", "cajun", "caribbean", "chinese", "eastern european", "european", "french", "german", "greek", "indian", "irish", "italian", "japanese", "jewish", "korean", "latin american", "mediterranean", "mexican", "middle eastern", "nordic", "southern", "spanish", "thai", "vietnamese"];
  const diets = ["gluten free", "ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", "pescetarian", "paleo", "primal", "low fodmap", "whole30"]
  useEffect(()=>{
    setPaginate({current: Math.ceil((search.offset+1)/search.number), total: Math.ceil(search.data.totalResults/search.number)})
  },[search.data])
  useEffect(()=>{
    if(search.trigger && search.query!=""){dispatch(fetchSearch());dispatch(setTrigger(false));}
  },[search.trigger])
  return (<>

    <section className='mt-4'>
      <div className='flex justify-center '>

        <div className='w-[100%] md:w-[50%]'>
          <div className='flex gap-1'>
            <input type="text" placeholder='Type your query...' className='flex-[9] p-2 border border-green-500 outline-none' value={search.query} onChange={(e)=>dispatch(setQuery(e.target.value))} />
            <button onClick={()=>setShowFilter(!showFilter)} className={`${showFilter?'bg-green-500 text-white':''} flex-[2] flex justify-center items-center border border-green-500 outline-none`}><HiOutlineFilter />Filter</button>
          </div>
          <div className={`${showFilter?'':'hidden'}`} >
            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className=" text-gray-600 mx-2">Cuisine type:</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            
            <div className='flex flex-wrap'>
              {cuisines.map((values, key) => {
                return <label key={key} className='w-1/2 md:w-1/3 capitalize'><input type='checkbox' checked={search.cuisine.indexOf(values)>-1?true:false}  onChange={((e)=>dispatch(setCuisine(values)))} value={values} className='capitalize'  /> {values}</label>
              })}
            </div>
            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className=" text-gray-600 mx-2">Diet restrictions:</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            
            <div className='flex flex-wrap'>
              {diets.map((values, key) => {
                return <label key={key} className='w-1/2 md:w-1/3 capitalize'><input type='checkbox' checked={search.diet.indexOf(values)>-1?true:false}  onChange={((e)=>dispatch(setDiet(values)))} value={values} className='capitalize' /> {values}</label>
              })}
            </div>
          
            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className=" text-gray-600 mx-2">Preparation time(Maximum):</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className='flex justify-center' >
            <div  >
              <label><input type="radio" onChange={(e)=>dispatch(setMaxReadyTimeAvailable(!Boolean(e.target.value)))} checked={search.maxReadyTime.isAvailable?false:true} name='isPrepTime' /> Not specific</label> <br/>
              <label><input type="radio" onChange={(e)=>dispatch(setMaxReadyTimeAvailable(Boolean(e.target.value)))} checked={search.maxReadyTime.isAvailable?true:false} name='isPrepTime' /> As specified:   
            <input value={search.maxReadyTime.value} onChange={(e)=>dispatch(setMaxReadyTime(e.target.value))} type="number" name="" id="" min={1} max={999} className='ml-3 border border-green-500 outline-none'/> Minutes</label>
            </div>
            </div>
           
            <br />

          </div>
          
          <button onClick={()=>dispatch(dispatch(setPagination({trigger:true, value:1})))} className='mt-1 w-full bg-green-500 text-white py-3 flex justify-center items-center '> <HiOutlineSearch /> Search</button>
        </div>
      </div>
    </section>


    <section className='flex flex-wrap justify-center '>

      {!search.loading && search.data.results.length>0 && search.data.results.map((value,key)=><Link href={"/details/"+value.id}
      key={key} className='w-full md:w-[40%] border border-green-500 m-1'>
      <p className='text-center bg-green-500 text-white'>
      {value.title}
      </p>
      <div className='flex justify-center'>
      <Image  src={value.image} width={312} height={231} alt=''/>
      </div>
      </Link>)}

      {search.loading && <div>Loading...</div>}

      
    </section>
    <div >
    { search.data.results.length>0 &&
        <div className='flex justify-evenly'>
        <button className='border border-green-500 px-2 py-1' disabled={paginate.current<=1?true:false} onClick={()=>dispatch(setPagination({trigger:true, value:paginate.current-1}))}>Previous</button>
        <div>
        <input className='border border-green-500 outline-none' type="number" onChange={(e)=>{dispatch(setPagination({trigger:false, value:e.target.value}))}} value={Math.ceil((search.offset+1)/search.number)}  min={1} max={999}/>/{Math.ceil(search.data.totalResults/search.number)}
        <button className='border border-green-500 px-2 py-1 ml-2' onClick={()=>dispatch(setPagination({trigger:true, value:null}))}>Go</button>
        </div>
        <button className='border border-green-500 px-2 py-1' disabled={paginate.current>=paginate.total?true:false} onClick={()=>dispatch(setPagination({trigger:true, value:paginate.current+1}))}>Next</button>
        </div>

    }
    
</div>
  </>)
}

export default page