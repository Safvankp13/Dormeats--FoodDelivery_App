import React from 'react'

function CardMiddleItems({items}) {
  return (
    
    <div className='middleItem'>
        <img src={items.image} alt="" />
        <div className="item--details">
          <h5>{items.name}</h5>
        <p><span className='star1'><img src="/Resourses/star-rating-svgrepo-com.svg" alt="" />
    </span>{items.rating}</p>
        </div>
    </div>
  )
}

export default CardMiddleItems