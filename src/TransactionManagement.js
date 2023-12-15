import React, { useState } from 'react';
import ProdManagement from './ProductManagement';
import { DataGrid } from '@mui/x-data-grid';

const TransManagement = ({prodList, setProdList, cart, setCart, order, setOrder}) => {
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [prodName, setProdName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  // const [products, setProdList,] = useState([
  //   { id: 1, name: 'Mens T-shirt', price: 100.99, stock: 10, image: 'path/to/tshirt-image.jpg' },
  //   { id: 2, name: 'Unisex Plain Jogger Pants', price: 200, stock: 10, image: 'path/to/pants-image.jpg' },
  //   { id: 3, name: 'Shoes', price: 1500, stock: 10, image: 'path/to/shoes-image.jpg' },
  //   { id: 4, name: 'Bags', price: 1900, stock: 10, image: 'path/to/bags-image.jpg' },
  // ]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      const existingItemIndex = cart.findIndex((item) => item.productId === product.productId);
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setMessage('Item added to cart!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setMessage('Sorry, this product is out of stock.');
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };

  const buyProducts = () => {
    const orderedItems = cart.map((item) => ({
      productId: item.productId,
      prodName: item.prodName,
      price: item.price,
      quantity: item.quantity,
    }));
  
    setOrder([...order, ...orderedItems]);  // Corrected line
  
    setProdList((prevProducts) =>
      prevProducts.map((p) => {
        const orderedItem = orderedItems.find((item) => item.productId === p.productId);
        return orderedItem ? { ...p, stock: p.stock - orderedItem.quantity } : p;
      })
    );
  
    setCart([]);
    setMessage('Thank you for your purchase!');
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log('this is order', order);
  };
  
  
  

  

  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', marginBottom: '10px' }}>Available Products:</h2>
        <table className="table table-responsive">
          <thead className="text-center">
            <tr>
              <th scope="col" className="bg-primary text-white">Product ID</th>
              <th scope="col" className="bg-primary text-white">Name</th>
              <th scope="col" className="bg-primary text-white">Price</th>
              <th scope="col" className="bg-primary text-white">Stock</th>
              <th scope="col" className="bg-primary text-white">Category</th>
              <th scope="col" className="bg-primary text-white">Action</th>
            </tr>
                 
        </thead>
          <tbody id="tbodyproducts" className="text-center">
            {console.log(prodList)}
            {prodList.map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.prodName}</td>
                <td>₱{parseFloat(product.price).toFixed(2)}</td>
                <td>{parseInt(product.stock)}</td>
                <td>{product.prodCategory}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



      </div>
      <h2 style={{ fontSize: '40px', marginRight: '70px', marginBottom: '200px' }}>Cart:</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '25px' }}>
        {cart.map((cartItem, index) => (
          <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', height: '250px' }}>
            <div style={{ marginRight: '20px' }}>
              <img src={cartItem.image} alt={cartItem.name} style={{ width: '50px', height: '50px' }} />
            </div>
            <div>
              {cartItem.prodName} - ₱{parseFloat(cartItem.price).toFixed(2)} | Quantity:
              {/* <button onClick={() => decreaseQuantity(cartItem.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginRight: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>-</button> */}
              <span style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '3px',
                margin: '0 5px',
              }}>
                {cartItem.quantity}
              </span>
              {/* <button onClick={() => increaseQuantity(cartItem.id)}
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginLeft: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>+</button> */}

              <button onClick={() => buyProducts() }
                style={{ margin: '7px', borderRadius: '10px', fontSize: '20px' }}>
                Buy Now
              </button>
              {/* <button onClick={() => buyProducts()}>
                Cancel
              </button> */}
            </div>
          </li>
        ))}
      </ul>

      {/* Notification */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: '9999'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default TransManagement;
