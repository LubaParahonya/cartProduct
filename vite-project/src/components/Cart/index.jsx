import React from 'react'
import './style.scss'
import { TiDeleteOutline } from "react-icons/ti";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";


const Cart = ({card, increase, decrease, deleteProduct} ) => {
  return (
   <>
   {card ? card.map(el => (
        <div className='boxCartItem'>
        <div className='leftbox'>
        <div className='boximage'><img className='imageProduct'src={el.url} alt="logo"/></div>
        <div className='title'>{el.title}</div>
        </div>
        <div className='rightBox'>
        <div className='groupButton'>
          <GoChevronUp onClick={()=>increase(el.id)}/>
          <div>{el.count}</div>
          <GoChevronDown onClick={()=>decrease(el.id)}/>
        </div>
        <div>{el.count*el.price}</div>
        <TiDeleteOutline onClick={()=> deleteProduct(el.id)} className='delete'/>
        </div>
      </div>
      )): null}
   </>
  )
}

export default Cart
