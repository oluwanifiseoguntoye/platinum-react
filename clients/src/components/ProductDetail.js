import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ image, name, price, information, normal, productId }) {

const informationArray = Object.entries(information);
const normalArray = Object.entries(normal);


  return (
    <div className="productDetail">
        <div className="productImage">
          <img src={image} alt="Product" />
        </div>
        <div className="productInfo" >
          <h1>{name}</h1>
          <p> ${price}.00 CAD + Shipping </p>
          <div className="productSmallerInfo">
            <ul>
              {informationArray.map(([key, value]) => (
              <li key={key}>{value}</li>
              ))}
            </ul>
          </div>
          <div className="productNormalInfo">
            {normalArray.map(([key, value]) => (
            <h1 key={key}>{value}</h1>
            ))}
          </div>
          <Link to={`/product/${productId}/order`}>
          <button className='buyNowButton'>Buy Now</button>
          </Link>
      </div>

    </div>
  );
}

export default ProductItem;