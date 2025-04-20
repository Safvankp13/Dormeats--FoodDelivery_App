import React from 'react'
import { useNavigate } from 'react-router-dom';

function Card2Items({items}) {
  const navigate = useNavigate()

  return (
    <div className='card2--main-2'>
        <div className="flex" onClick={()=>navigate(`category/${items.category}`)}>
            
            <div className="img">
              <img src={items.image} alt="" /></div>
            <span>{items.name}</span>
        </div>

        
    </div>
  )
}

export default Card2Items