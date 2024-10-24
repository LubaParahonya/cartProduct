import { useEffect, useState } from 'react'
import './index.scss'
import Product from './components/Product'
import { v4 as uuidv4 } from "uuid";
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([])
  const [card, setCard] = useState([])
  const [sum, setSum] = useState(0)
  const [current, setCurrent] = useState({
    quantity: card.reduce((sum, cur) => {return sum + cur.count}, 0),
    price: card.reduce((sum, cur) => {return sum + cur.price}, 0)
  })

const getApi = async () => {
  try{
    const response = await fetch('https://lubaparahonya.github.io/api-free/api.json')
  .then((response) => response.json());
  const mapDefaultList = (response) => {
    return response.map((el) => {
        el.count = 1;
        return el;
    })
}
  setProducts(mapDefaultList(response))

  }catch(error){
        console.log(error);
      }
}

useEffect(()=>{
  getApi();
}, [])

useEffect(()=>{
  setCurrent({
    quantity: card.reduce((sum, cur) => {return sum + cur.count}, 0),
    price: card.reduce((sum, cur) => { return sum + cur.price * cur.count}, 0)
  })
},[card])

const addProduct =(id) =>  {
  const result = products.filter(el=> el.id === id)
  if(card.find(el => el.id === id)){
    increase(id)
  }else{
    setCard([...card, ...result])
    setSum(sum + result[0].price)
  }
}

const deleteProduct = (id) => {
  const result = card.filter(el => el.id !== id)
  setCard(result)
  const deleteProducts = products.filter(el => el.id === id)
  setSum( sum - deleteProducts[0].price) 
}

const increase = (id) => {
  setCard((card) => {
    return card.map(el => {
      if(el.id === id){
        return {
          ...el,
          count: el.count+=0.5
        };
      }
      return el

    })
  })

}

const decrease = (id) => {
  setCard((card) => {
    return card.map(el => {
      if(el.id === id){
        return {
          ...el,
          count: el.count - 0.5 > 1 ? el.count -= 0.5 : 1
        };
      }
      return el

    })
  })

}

  return (
    <div className='mainBox'>
    <div className='main'>
    {products.map(el => {
      const {url, title, price, count, id} = el
      return ( 
      <Product 
       key={uuidv4()}
        url={url}
        title={title}
        price={price}
        count={count}
        addProduct={addProduct}
        id={id}
        />
      )
    })}
    </div>
    <div className='card'>
      <div className='nameCard'>Корзина товара</div>
      <div className='boxHeader'>
        <div className='itemMenu'>Наименование</div>
        <div className='itemMenu'>Количество</div>
        <div className='itemMenu'>Стоимость</div>
      </div>
      <Cart card={card}
      increase={increase}
      decrease={decrease}
      deleteProduct={deleteProduct}/>
      <div className='boxFooter'>
      <div>Количество:{current.quantity}</div>
      <div>Сумма:{current.price}</div>
      </div>
    </div>
    </div>
  )
}

export default App
