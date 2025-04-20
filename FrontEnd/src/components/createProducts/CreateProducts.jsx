import React from 'react'
import './createProducts.scss'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useProductStore } from '../../store/useProductStore';

const CreateProducts = () => {
const {createProduct}=useProductStore()
  const [newProduct, setNewProducts] = React.useState({
    name: "",
    description: "",
    price: "",
    category:"",
    image: "",
  })
  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      await createProduct(newProduct)
      setNewProducts({
        name: "",
        description: "",
        price: "",
        category:"",
        image: "",
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
  const catogories=["Biriyani","Dosa","Chciken Parotta","Putt","Uppma","Appam"]
  return (
    <div className='cr--products--main'>
      <div className='cr--products--container'>
        <h2>Create Products</h2>
        <div className='cr--products--form'>
          <form onSubmit={handleSubmit}>
            <div className='cr--products--input'>
              <label htmlFor='name'>Product Name</label>
              <input type='text'  id='name' name='name' value={newProduct.name} onChange={handleChange}/>
            </div>
            <div className='cr--products--input'>
              <label htmlFor='description'>Product Description</label>
              <textarea  id='description' name='description' value={newProduct.description} onChange={handleChange}/>
            </div>
            <div className='cr--products--input'>
              <label htmlFor='price'>Product Price</label>
              <input type='number'  id='price' name='price' value={newProduct.price} onChange={handleChange} step="0.05"/>
            </div>
            <div className='cr--products--input'>
              <label htmlFor='category'>Category</label>
              <select id='category' name='category' value={newProduct.category} onChange={handleChange}>
                <option value="">Select A Category</option>
                {catogories.map((cat)=>(
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            
              
            </div>
            <div className='cr--products--input'>
             
              <input type='file' name='image' id="image" className="sr-only"  onChange={handleChangeImage} accept='image/*'/>
              <label htmlFor='image' className='file-input'>
                <AddPhotoAlternateIcon style={{width:"20px",height:"20px",display:"inline-block"}}/>
              Upload Image</label>
            </div>
            <button type='submit' >Create Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProducts