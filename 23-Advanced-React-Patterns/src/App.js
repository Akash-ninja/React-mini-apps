import { useState } from "react"
import { faker } from "@faker-js/faker"
import "./styles.css"

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  }
})

const companies = Array.from({ length: 20 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  }
})

function ProductItem({ product }) {
  return (
    <li className='product'>
      <p className='product-name'>{product.productName}</p>
      <p className='product-price'> &#8377;{product.price}</p>
      <p className='product-description'>{product.description}</p>
    </li>
  )
}

function List({ title, items = [] }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const displayItems = isCollapsed ? items.slice(0, 3) : items

  function toggleOpen() {
    setIsOpen((open) => !open)
    setIsCollapsed(false)
  }

  return (
    <div className='list-container'>
      <div className='heading'>
        <h2>{title}</h2>

        <button onClick={toggleOpen}>
          {isOpen ? <span> &or;</span> : <span>&and; </span>}
        </button>
      </div>

      {isOpen && (
        <ul className='list'>
          {displayItems.map((item) => (
            <ProductItem key={item.productName} product={item} />
          ))}
        </ul>
      )}

      <button onClick={() => setIsCollapsed((collapse) => !collapse)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className='col-2'>
        <List title='Products' items={products} />
      </div>
    </div>
  )
}
