import React from 'react';
import { ProductList } from '../helpers/ProductList';
import ProductItem from '../components/ProductItem';
import '../styles/home.css';

function Home() {
  return (
    <div className="product">
      <div className="productList">
        {ProductList.map((product, key) => {
          return (
            <ProductItem
              key={key}
              id={product.id}
              image={product.image}
              name={product.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;