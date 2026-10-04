// import React from 'react'
import { useState } from "react"
import { FiUpload } from "react-icons/fi"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { styles } from '../assets/dummyadmin(1)'
import axios from 'axios'
const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  })
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }))
    }
  }
 
  const Category = ["Breakfast", "Lunch", "Dinner", "Maxican", "Italian", "Desserts", "Drinks"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  // const handleHearts = () => setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return;
        payload.append(key, val)
      })

       await axios.post('https://builder-ai-website.onrender.com/api/items', payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: ''
      })
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message);
    }
  }
  return (
    <div className="bg-black/90 h-screen">
      <div className="flex justify-center items-center p-5">
        <div className="border bg-amber-400/20 text-white rounded w-full flex items-center flex-col pt-3 ">
          <h1 className='text-xl text-amber-400 items-center mb-4'>Add New Menu Items</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <label htmlFor="image"
                className='border-dashed border-2 cursor-pointer w-50 h-50 border-amber-500 rounded-2xl flex bg-amber-50/40 flex-col items-center justify-center hover:bg-amber-300/20 hover:scale-105 transition-all duration-300' >
                {formData.preview ? (
                  <img alt="preview" src={formData.preview} className="w-full h-full object-cover rounded-2xl" onClick={handleImage} />
                ) : (
                  <div className=' flex flex-col items-center'>
                    <FiUpload className="text-2xl text-amber-600 " />
                    <p className="text-xs mt-4 text-amber-900">Click to upload product image</p>
                  </div>
                )
                }
              </label>
            </div>
            <input accept="image/*" name="" type="file" id='image' className="hidden" onChange={handleImage} required />
            <div className="flex flex-col w-full pl-4">
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} className='border outline-0 rounded p-1 pl-2' placeholder="Enter Product Name..." onChange={handleInputChange} required />

            </div>
            <div className="flex flex-col w-full pl-4">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} type="text" className='border outline-0 rounded p-1 pl-2' placeholder="Enter Description.." required />

            </div>

            <div className="flex  pl-4 gap-10">
              <div className="flex flex-col mt-2">
                <label >Price</label>
                <div className="flex items-center border rounded pl-1">
                  <FaIndianRupeeSign className="text-amber-500" />
                  <input type="number" name="price" value={formData.price} placeholder="Enter Price..." onChange={handleInputChange} className=' outline-0  p-1 pl-2 w-full' required />
                </div>
              </div>
              <div className=" flex flex-col gap-1 p-2 w-1/2">
                <label>Category</label>
                <select className="border rounded p-1 pl-2  outline-0 bg-amber-400/80" onChange={handleInputChange}
                  value={formData.category} name="category" >
                  <option selected  value=" " >Select Category </option>
                  {Category.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex  pl-4 gap-10">
              <div>
                <label >Rating</label>
                <div className="flex gap-1 " >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <CiStar className={`text-3xl transition-all duration-200 cursor-pointer ${star <= formData.rating ? "text-amber-500" : ""}`}
                      key={star} onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          rating: star
                        }))
                      } />
                  ))}
                  <div>{ }</div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label>Popularity</label>
                <div className="flex items-center gap-2">
                  <CiHeart className="text-amber-500 text-3xl" />
                  <input onChange={handleInputChange} type="number" name="hearts" value={formData.hearts} placeholder="Enter Like..." className={styles.inputField + `pl-10 sm:pl-12`} min='0' step="0.01" required />
                </div>
              </div>
            </div>

            <button type="submit" className="border p-2 mt-2 w-full rounded-2xl bg-amber-400 hover:shadow-[1px_2px_12px_1px] hover:bg-amber-400/50 hover:scale-95 transition-all duration-300 mb-2">
              Add Items
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItems