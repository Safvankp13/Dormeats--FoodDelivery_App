import React, { useEffect, useState } from 'react'
import './ViewProducts.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';
import { useProductStore } from '../../store/useProductStore';
import Modal from '../../Models/Modal';
const ViewProducts = () => {
  const [nav,setNav]=useState('name')
  const catogories=["Biriyani","Dosa","Chciken Parotta","Putt","Uppma","Appam"]
  const tabs=['name','image','price','description','category']
 const {products,getProducts,updateProduct,deleteProduct}=useProductStore()
const[edit,setEdit]=useState(null)

  const [newProduct, setNewProducts] = React.useState({
    name: "",description: "",price: "",category:"",image: "",
  })
 useEffect(() => {
    if (!products || products.length === 0) {
      getProducts();
    }
  }, [products, getProducts]);

  useEffect(() => {
    if (edit) {
      setNewProducts({
        name: edit.name || "",
        description: edit.description || "",
        price: edit.price || "",
        category: edit.category || "",
        image: edit.image || ""
      });
    }
  }, [edit]); 

  const handleSubmit =async (e) => {
    e.preventDefault()
    const updatedFields = {};
    Object.keys(newProduct).forEach((key) => {
      if (newProduct[key] !== edit[key]) {
        updatedFields[key] = newProduct[key] || null; 
      }
    });
  
    try {
      await updateProduct(edit.id,updatedFields)
      setEdit(null)
      setNav('name')
      setNewProducts({
        name: "",description: "",price: "",category:"",image: "",
      })

      
    } catch (error) {
      console.log("Error creating Product")
    }
    
  }
  const handleChange = (e) => {
    setNewProducts({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      reader.onloadend =()=>{
        setNewProducts({...newProduct,image:reader.result})
      }
      reader.readAsDataURL(file)
    }
  };
 
  return (
    <div className='view--products'>
       <table>
        <thead>
            <tr>
                <th scope='col'>Product</th>
                <th scope='col'>Price</th>
                <th scope='col'>Description</th>
                <th scope='col'>Category</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Delete </th>

            </tr>
        </thead>
        <tbody>
            {products?.map(item=>(
                <tr key={item.id}>
                    <td>
                        <div className='item--flex'>
                            <div className='item--img'><img src={item.image} alt={item.name} /></div>
                            <div> {item.name}</div>
                        </div>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td><div onClick={()=>setEdit(item)} style={{position:"relative"}}><EditIcon fontSize='small' /></div></td>
                    <td><div ><DeleteOutlineIcon fontSize='small' className='delete-icon' onClick={()=>deleteProduct(item.id)}/></div></td>
                </tr>
            ))}
        </tbody>
        <tfoot>
  <tr>
    <td colSpan="3"><strong>Total Products:</strong></td>
    <td colSpan="3">{products?.length}</td>
  </tr>
</tfoot>
       </table>
{edit&&<Modal onClose={() => {setEdit(null) ;setNav('name');}}>
          <div className='edit--form--flex'>
          <div className="top">
           {tabs.map((tab) => (
            <button key={tab} className={`tab ${nav === tab ? "active" : ""}`} onClick={() => setNav(tab)}>{tab}</button>
            ))}</div>
          <div className="bottom">
            {nav === "image" && (
              <div className='bottom--edit'>
                <label htmlFor="image">Image</label>
                <div style={{display:"flex"}}><input type="file" id="image" name="image" accept="image/*" onChange={handleChangeImage} style={{width:"45%"}}/ >  <img src={newProduct.image} alt="preview" /></div>
              
              </div>
            )}
            {nav === "name" && (
              <div className='bottom--edit'>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} />
              </div>
            )}
            {nav === "price" && (
              <div className='bottom--edit'>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} />
              </div>
            )}
            {nav === "description" && (
              <div className='bottom--edit'>
                <label htmlFor="description">Description</label>
                <textarea  id='description' name='description' value={newProduct.description} style={{padding:"10px",color:"rgb(43, 43, 43)"}} onChange={handleChange}/>
              </div>
            )}
            {nav === "category" && (
              <div className='bottom--edit'>
              <label htmlFor='category'>Category</label>
              <select id='category' name='category' value={newProduct.category} onChange={handleChange}>
                <option value="">Select A Category</option>
                {catogories.map((cat)=>(
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              </div>
            )}
            <div className="bottom--buttons"> 
            <button className='btn' onClick={handleSubmit}><SaveAsIcon className="icon" style={{color:"rgb(55, 55, 55)"}}/> Change</button>
            <button className='btn' onClick={() => {setEdit(null);setNav('name');}}><CancelIcon className="icon" style={{color:"rgb(220, 2, 42)"}}/> Cancel</button></div>
           

          </div>
         
          </div>
        </Modal>}
    </div>
  )
}

export default ViewProducts