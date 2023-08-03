import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ image, name, id }) {
  return (
    <div className="productItem">
      <Link to={`/product/${id}`}>
        <img src={image} alt="Product" />
        <h1 className="label">{name}</h1>
      </Link>
    </div>
  );
}

export default ProductItem;