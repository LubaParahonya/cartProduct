import React from 'react'
import './style.scss'
import { IoAdd } from "react-icons/io5";

const Product = ({url, title, price, count, addProduct, id} ) => {
  return (
    <div className='boxCart'>
        <div className='boximage'><img className='imageProduct'src={url} alt="logo"/></div>
        <div className='title'>{title}</div>
        <div className='price'>{price}</div>
        <div className='groupButton'>
        <div className='addInCard'><IoAdd onClick={()=> addProduct(id)}/></div>
        </div>
      </div>
  )
}

export default Product
