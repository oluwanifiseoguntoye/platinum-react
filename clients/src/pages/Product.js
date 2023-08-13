import React from 'react';
import { ProductList } from '../helpers/ProductList';
import ProductDetail from '../components/ProductDetail';
import { useParams } from 'react-router-dom';
import '../styles/product.css';

function Product() {
  const { id } = useParams();

  console.log('id:', id);

  const product = ProductList.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product">
      <div className="productContainer">
        <ProductDetail
          key={product.id}
          image={product.image}
          backimage={product.backimage}
          name={product.name}
          information={product.information}
          price={product.price}
          normal={product.normal}
          productId={product.id} 
        />
      </div>
    </div>
  );
}

export default Product;