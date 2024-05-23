import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useUserAuth } from "../context/UserAuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import { db } from '../firebase'; // Ensure correct import of your Firestore instance
import app from '../firebase';

// Component responsible for rendering and managing the user's cart
const CartPage = () => {
  const { logOut, user } = useUserAuth();
  const [cartItems, setCartItems] = useState([]); // State to manage the cart items

  useEffect(() => {

     // Function to fetch cart items from Firestore
    const fetchCartItems = async () => {

      try {
        console.log("testing")
        // Retrieve cart items from Firestore
        await getDocs(collection(db, "cart"))
          .then((querySnapshot) => {
            // Extract data from query snapshot and update state
            const newData = querySnapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))

            setCartItems(newData.map((item) => ({ id: item.id, data: item })));
          })
        console.log("testing")

      } catch (error) {
        console.error('Error fetching cart items:', error); // Handle error if fetching cart items fails
      }
    };

    fetchCartItems(); // Call fetchCartItems function when component mounts
  }, []);

  // Function to handle checkout process
  const handleCheckout = async () => {
    try {
      // Clear cart items locally
      setCartItems([]);

      // Get all documents from "cart" collection in Firestore
      const querySnapshot = await getDocs(collection(db, "cart"));

      // Iterate through each document and delete it
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Display toast for successful purchase
      toast.success('Purchase successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error handling checkout:', error); // Handle error if checkout process fails
    }
  };



  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="mt-4 mb-3">Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group">
              {cartItems.map((item) => (
                item.data.uid === user.uid ? (
                  <li key={item.id} className="list-group-item">
                    <div className="row">
                      <div className="col-md-8">
                        {/* Display cart item details */}
                        <img
                          src={item.data.productImage}
                          alt={item.data.productName}
                          className="img-fluid w-50"
                        />
                        <h5>{item.data.productName}</h5>
                        <p>Price: £{item.data.productPrice}</p>
                      </div>
                      {/* Additional columns for more details or actions */}
                      <div className="col-md-4 text-right">
                        {/* Add actions or additional details here */}
                      </div>
                    </div>
                  </li>
                ) : null
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>

                <p>Total Items: {cartItems.filter(item => item.data.uid === user.uid).length}</p>
                {/* Calculate total price from cartItems */}
                <p>Total Price: £{cartItems
                  .filter(item => item.data.uid === user.uid) // Filter based on uid matching id
                  .reduce((total, item) => total + item.data.productPrice, 0)
                  .toFixed(2)}
                </p>

                <button className="btn btn-primary btn-block" onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CartPage;
