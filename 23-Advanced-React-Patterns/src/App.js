import { useState } from "react"
import { faker } from "@faker-js/faker"
import "./styles.css"
import withToggles from "./HOC"

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

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisible] = useState(defaultVisibility)

  return (
    <li
      className='company'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <p className='company-name'>{company.companyName}</p>
      {isVisible && (
        <p className='company-phrase'>
          <strong>About:</strong>
          {company.phrase}
        </p>
      )}
    </li>
  )
}

function ProductItem({ product }) {
  return (
    <li className='product'>
      <p className='product-name'>{product.productName}</p>
      <p className='product-price'> &#8377;{product.price}</p>
      <p className='product-description'>{product.description}</p>
    </li>
  )
}

function List({ title, items = [], render }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(true)

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

      {isOpen && <ul className='list'>{displayItems.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((collapse) => !collapse)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  )
}

export default function App() {
  const ProductListWithToggles = withToggles(ProductList)

  return (
    <div>
      <h1>Render Props Demo</h1>

      {/* Render props passed */}
      {/*  <div className='col-2'>
        <List
          title='Products'
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />

        <List
          title='Companies'
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              defaultVisibility={false}
              company={company}
            />
          )}
        />
      </div> */}

      <div className='col-2'>
        <ProductList title='Products HOC' items={products} />
        <ProductListWithToggles title='Products HOC' items={products} />
      </div>
    </div>
  )
}

// LATER: Let's say we got this component from a 3rd-party library,
// and can't change it. But we still want to add the 2 toggle functionalities to it.
function ProductList({ title, items }) {
  return (
    <ul className='list'>
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  )
}
