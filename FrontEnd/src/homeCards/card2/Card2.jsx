import React from 'react'
import Card2Items from './Card2Items'
import "./card2.scss"
import { useProductStore } from '../../store/useProductStore'
function Card2() {
    const {products}=useProductStore()
  return (
    <div className='card2--main'>
        <div className='card-2-h3'>  <h3>Choose What You Like</h3></div>
    <div className='card2'>
      
    
        {products.map((item)=>(
        <Card2Items key={item.id} items={item}/>
        ))}

    </div>
    </div>
  )
}

export default Card2