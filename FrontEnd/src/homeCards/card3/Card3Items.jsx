import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Card3Items = ({items,handleOpen}) => {

  return (
    <div className='bottom--items'>
        <div className="pic">
            <img src={items.image} alt="" />
        </div>
        <div className="pic--status">
            <h4>{items.name}</h4>
            <p><span className='star1'><img src="/Resourses/star-rating-svgrepo-com.svg" alt="" />
    </span>{items.rating} <span style={{fontSize:"14px",color:"grey"}}>(45-50 mins)</span></p>
    

    <button onClick={handleOpen} className='add--btn'><ShoppingCartIcon sx={{fontSize:"20px"}}/>  <span >Add</span> </button>
        </div>
    </div>
  )
}

export default Card3Items