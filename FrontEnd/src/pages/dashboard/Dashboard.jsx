import React from 'react'
import './Dashboard.scss'
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateProducts from '../../components/createProducts/CreateProducts';
import ViewProducts from '../../components/viewProduct/ViewProducts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddMenu from '../../components/Menu/AddMenu';
import ViewMenu from '../../components/Menu/viewMenu';

const tabs=[
    {id:"products",label:"products",icon:InventoryIcon},
    {id:"create Product",label:"create products",icon:AddBoxIcon},
    {id:"view Menu",label:"View Menu",icon:MenuBookIcon},
    {id:"Add Menu",label:"Add Menu",icon:RestaurantMenuIcon},

    
    ]

const Dashboard = () => {
    const [active, setActive] = React.useState("products")
   

     
  return (
    <div className='dash--main'>
        <div className="dash--flex">
            <h1>Admin Dashboard</h1>
            <div className="tab--container">
                {tabs.map((tab)=>(
                    <button key={tab.id} className={`tab ${active===tab.id?"active active-animate":""}`} onClick={()=>setActive(tab.id)}>{tab.label}</button>
                ))}
            </div>
            <div className="dash--elements">
                {active==="products"&&<ViewProducts/>}
                {active==="create Product"&&<CreateProducts/>}
                {active==="Add Menu"&&<AddMenu/>}
                {active==="view Menu"&&<ViewMenu/>}
            </div>
        </div>
    </div>
  )
}

export default Dashboard