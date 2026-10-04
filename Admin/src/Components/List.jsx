// import React from 'react'

import { useEffect, useState } from "react"
import { styles } from "../assets/dummyadmin(1)"
import { FiStar, FiTrash2 } from "react-icons/fi";
import axios from 'axios';

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/items/')
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  //DeleteItems
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`https://builder-ai-website.onrender.com/api/items/${itemId}`);
      setItems(prev => prev.filter(item => item._id !== itemId));
     

    } catch (error) {
      console.error("Error Delete the data :", error.message);
    }
  }

  const renderStars = (rating) => {
    [...Array(5)].map((i) => (
      <FiStar className={`text-xl ${i < rating ? "text-amber-400" : "text-amber-100/30"}`} />
    ))
  }

  if (loading) {
    return (
      <div className={styles.pageWrapper.replace(/bg-gradient-to-br.*/, "").concat('flex items-center justify-center')}>
        Loading Menu...
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.cardContainer}>
          <h2 className={styles.title}>Mange Menu Items</h2>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Rating</th>
                  <th className={styles.th}>Hearts</th>
                  <th className={styles.thCenter}>Delete</th>
                </tr>
              </thead>

              <tbody >
                {items.map((item) => (
                  <tr className={`${items.tr}border rounded-2xl `} key={item._id}>
                    <td className={styles.imgCell}>
                      <img src={item.imageUrl} alt={item.name} className="h-30 w-30 rounded-2xl" />
                    </td>
                    <td className={styles.nameCell + "  "}>

                      <div className='space-y-1 '>
                        <p className="text-amber-50 text-sm">{item.name}</p>
                        <p className="text-amber-50/30 text-xs ">{item.description}</p>
                      </div>
                    </td>
                    <td className="text-lg text-amber-300">₹{item.price}</td>
                    <td className={styles.categoryCell}>{item.category}</td>
                    <td className="text-lg text-amber-300/50 ">
                    <div className="flex gap-1">
                      {renderStars(item.rating)}
                    </div>
                    {item.rating}
                    </td>
                    <td className="text-lg text-amber-300/50">{item.hearts}</td>
                  <td >
                    <button className="absolute right-20 cursor-pointer" onClick={()=>handleDelete(item._id)}> 
                      <FiTrash2 className="text-xl text-amber-500"/>
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       
          {items.length === 0 && (
            <div className={styles.emptyState}
            >No items found in the menu</div>
          )}
        
        </div>
      </div>
    </div>
  )
}

export default List