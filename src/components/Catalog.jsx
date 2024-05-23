import React, { useState } from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import Navbar from './Navbar';
import Header from './Header';
import './style.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Array of product objects with id, name, price, image, and description properties
const products = [
  {
    id: 1,
    name: 'Jack & Jones-Denim Jacket for Men',
    price: 15.99,
    image: "https://assets.ajio.com/medias/sys_master/root/20230505/xa4o/6454a28842f9e729d768b217/-473Wx593H-469265979-darkblue-MODEL.jpg",
    description: 'The Jack & Jones Denim Jacket is a classic piece that will never go out of style. It is made from durable denim and features a comfortable fit. This jacket is perfect for everyday wear and can be dressed up or down. It is also a great layering piece for the colder months. The jacket is made from 100% cotton denim and has a regular fit. It has a button-down closure and two front pockets and two chest pockets. It is available in a variety of colors, including blue, black, and white.',
  },
  {
    id: 2,
    name: 'Roadster-Casual Checked Shirt for Men',
    price: 19.99,
    image: "https://assets.myntassets.com/h_480,q_100,w_360/v1/assets/images/1376224/2018/9/12/a6202dad-ca02-4005-aa95-c379962438f41536757429138-Roadster-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-6081536757428888-1.jpg",
    description: 'Red, black and cream-coloured checked casual shirt, has a spread collar, button placket, long sleeves, a chest pocket, curved hem Regular fit The model is wearing a size 40 Cozy up with this in-style Roadster shirt this season. When you are going out on a dinner date, match this checked piece with chinos and a pair of easy loafers. 100% cotton Machine-wash',
  },
  {
      id: 3,
      name: 'Orchid Blues-Olive Cargo Pant for Women',
      price: 42.99,
      image: "https://assets.ajio.com/medias/sys_master/root/20230602/STfU/64792f66d55b7d0c63365635/-473Wx593H-461455469-olive-MODEL.jpg",
      description: 'Orchid Blues is a clothing brand that sells a variety of clothing for women, including cargo pants. Their cargo pants are made from high-quality materials and are designed to be both stylish and functional. They come in a variety of colors and styles, so you can find the perfect pair to match your wardrobe. Orchid Blues cargo pants are perfect for everyday wear, as well as for travel and outdoor activities. They are comfortable, durable, and stylish, making them a great choice for any woman. If you are looking for a pair of high-quality, stylish, and functional cargo pants, then Orchid Blues is a great brand to consider. Their cargo pants are perfect for any woman who wants to look her best while also being comfortable and practical.',
    },
    {
      id: 4,
      name: 'Levis-Shirt for Men',
      price: 100,
      image: "https://assets.adidas.com/images/h_600,f_auto,q_auto,fl_lossy,c_fill,g_auto/91847e9f3ac5443c9d5b478cf8800dcc_9366/Argentina_2024_Home_Authentic_Jersey_White_IP8388_HM3_hover.jpg",
      description: 'ARGENTINA 2024 HOME AUTHENTIC JERSEY',
    },
    {
      id: 5,
      name: 'HRX-Running T-shirtfor Women',
      price: 54.99,
      image: "https://lowpricesaree.in/wp-content/uploads/2022/01/hrx-by-hrithik-roshan-women-jet-black-rapid-dry-running-t-shirt.jpg",
      description: 'Set a new record every time you go for a run in the HRX Women’s Running T-shirt. The Rapid Dry and Anti microbial technology wick always sweat and keep body odor at bay to minimize distractions and keep you focused on crossing the finish line.',
    },
    {
      id: 6,
      name: 'Adidas-Herz Fur Hoodie for Women',
      price: 52.99,
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e7ec5ac5b258424c9202afa801034615_9366/Indigo_Herz_Fur_Hoodie_Blue_IJ9087_HM1.jpg",
      description: 'Welcome to a new age of originality. Inspired by the adidas Originals-owned NFT, the Indigo Herz Drop is an invitation to self-express without limitations. No matter which world you are in.  Hoodies are comfy, but even great things can get better. The adidas Indigo Herz Fur Hoodie levels up the cozy factor with faux fur that is inspired by its namesake and peach-soft to the touch. Classic details — like a hood and the iconic 3-Stripes — create a signature silhouette that easily pairs with everything in your wardrobe.',
    },
    {
      id: 7,
      name: 'Zued Simon-Trendy Suit for Women',
      price: 74.99,
      image: "https://images.squarespace-cdn.com/content/v1/576b1e056a4963de8dd40b7e/1618347608908-G8WNDCCIUXWVHLZV5DEF/Dauss+Miller+Photographer_20180920_1002FCG.jpg?format=2500w",
      description: 'This trending outfit is a stylish and comfortable ensemble that is perfect for any occasion.  This outfit is made with high-quality materials and features a flattering design that will make you look and feel your best. Whether you are running errands, going out on the town, or just lounging around the house,this trending outfit is the perfect choice for you.',
    },
    {
      id: 8,
      name: 'Zara-TankTop Pant for Women',
      price: 39.99,
      image: "https://www.j-dphoto.com/images/uploaded/mal_01335__.jpg",
      description: 'This tank top pant from Zara is a versatile and comfortable piece that can be dressed up or down. It is made from a soft, breathable fabric that will keep you cool and comfortable all day long. The tank top style is flattering on all body types, and the pant length is perfect for a variety of occasions.',
    },
    {
      id: 9,
      name: 'Adidas-City Escape Full-Zip Hoodie for Men',
      price: 80,
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/973990c708fe4b90a5a01ffc9b1a8fe2_9366/City_Escape_Full-Zip_Hoodie_Green_IS9284_21_model.jpg",
      description: 'Get ready for city adventures with this adidas full-zip hoodie. It is made from special fabric that is comfy and repels water, so you can move around easily even if it is drizzling. Perfect for city explorers who like to stand out, it keeps you feeling cozy whether you are walking around town or chilling in a café. Plus, it is made from 100% recycled materials, which means we are helping the planet by reusing stuff and using fewer new resources.',
    },
    {
      id: 10,
      name: 'Roadster-Regular Men Jeans',
      price: 79.99,
      image: "https://5.imimg.com/data5/ECOM/Default/2022/9/JE/XA/VP/148827935/28-8275705-roadster-original-imafgwg5pudqfrnj-500x500.jpg",
      description: ' Roadster is a popular brand of jeans for men that offers a variety of styles to suit different needs and occasions. Whether you are looking for a pair of jeans to wear to work, to the gym, or on a night out, Roadster has a style that is perfect for you.  Roadster jeans are made from high-quality denim that is both durable and comfortable. The jeans are also designed to flatter a variety of body types, so you are sure to find a pair that fits you perfectly.  In addition to their stylish designs, Roadster jeans are also known for their affordable prices. You can find a great pair of Roadster jeans for less than $200, making them a great option for budget-minded shoppers.',
    },
    {
      id: 11,
      name: 'Traveler Tote-Blazer for Women',
      price: 69.99,
      image: "https://media.licdn.com/dms/image/C4E22AQEuBT_j7UgQ5Q/feedshare-shrink_800/0/1673945772495?e=2147483647&v=beta&t=ybx9SdxtG1lle8O55hiJGSLbMd-0-W97Iv-vnMmJ8jw",
      description: 'Traveler Tote Lavender Blazer: A stylish and versatile blazer in a flattering lavender color. Perfect for work, travel, or any other occasion.  This blazer is made from high-quality materials and features a classic design. It is perfect for both formal and informal occasions. The lavender color is both stylish and flattering, and it will look great with any outfit. This blazer is also very versatile and can be dressed up or down, making it a must-have for any wardrobe.',
    },
    {
      id: 12,
      name: 'Adidas-Primegreen Essentials Warm-up Slim 3-Stripes Track Jacket for Women',
      price: 66,
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/b4d57309e66f4bf7b5e7a03b89191104_9366/Primegreen_Essentials_Warm-Up_Slim_3-Stripes_Track_Jacket_Pink_IR6147_21_model.jpg",
      description: ' Introducing the Primegreen Essentials Warm-up Slim 3-Stripes Track Jacket–where style meets sustainability. Crafted with Primegreen technology, this sleek jacket offers warmth and mobility in a slim fit design. Featuring iconic adidas 3-Stripes detailing, it is made from 100% recycled polyester, making it both fashionable and eco-friendly. Perfect for any urban adventure or workout session.',
    },
    {
      id: 13,
      name: 'Premium one shoulder sculpted maxi dress in pink',
      price: 110,
      image: "https://images.asos-media.com/products/asos-design-premium-one-shoulder-sculpted-maxi-dress-in-pink/206106205-1-rose?$n_960w$&wid=952&fit=constrain",
      description: 'Introducing "The Main Event"-a statement piece that sure to turn heads. This single-shoulder top features a striking draped stitched design that exudes elegance and sophistication. With a convenient zip-back fastening and side split detail, it offers both style and ease of wear.  Designed in a regular fit, it flatters the figure while providing comfort and flexibility. The smooth stretch fabric ensures a sleek silhouette and all-day comfort.  Modelled here by a stunning individual standing at 170.5cm tall, wearing a UK size 8/ EU size 36/ US size 4, this top is versatile and chic for any occasion.  Made from 97% polyester and 3% elastane, "The Main Event" embodies quality craftsmanship and attention to detail. Add this glamorous piece to your wardrobe for a touch of effortless glamour.',
    },
    {
      id: 14,
      name: 'Nike Oversized Hooded Jacket for Women',
      price: 109.99,
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3dd64a65-fc33-4e99-8d61-0da0a3977be2/sportswear-everything-wovens-oversized-hooded-jacket-brJxZ6.png",
      description: 'Designed with simplicity and functionality in mind, the adjustable waist means you can tighten the jacket for a more tailored fit or wear it loose for easy layering. Plus, we added a water-repellent coating to the crinkled fabric so you are always ready for the rain. It is got everything you need to cover up in style. Colour Shown: Platinum Violet/Sail',
    },
    {
      id: 15,
      name: 'Nike-Water-Repellent Puffer Gilet for Men',
      price: 119.95,
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/46f81c53-b5db-43de-9995-754dc4bb3780/sportswear-club-primaloft-water-repellent-puffer-gilet-ZnTxhn.png",
      description: 'Bring the warmth with this classic puffer gilet design. It is equipped with PrimaLoft® Thermoplume insulation and water-repellent Ripstop fabric to help you fight off the chill from those cold, rainy days. Pull it on over your favourite flannel or hoodie and face the cool weather with confidence. Colour Shown: Midnight Navy/White',
    },
    {
      id: 16,
      name: 'Pull&Bear-Linen stripe grandad neck shirt in ecru for Men',
      price: 29.99,
      image: "https://images.asos-media.com/products/pullbear-linen-stripe-grandad-neck-shirt-in-ecru/206431348-2?$n_640w$&wid=634&fit=constrain",
      description: 'Introducing our waist-up dressing staple: a timeless piece with a modern twist. Featuring a classic stripe design and a sophisticated grandad collar, this shirt is perfect for any occasion. The button placket and long sleeves add a touch of elegance, while the regular fit ensures comfort and style. Our model wears a size Medium for the perfect fit. Crafted from a breathable linen-cotton blend, it is both stylish and comfortable, making it a must-have addition to your wardrobe.',
    },
    {
      id: 17,
      name: 'Calvin Klein-Cotton Silk Jumper for Men',
      price: 109,
      image: "https://calvinklein-eu.scene7.com/is/image/CalvinKleinEU/K10K113159_LJ4_main?$b2c_updp_recommendations_767$",
      description: 'Introducing our eco-conscious jumper crafted from 80% certified organic cotton, ensuring it is grown without synthetic pesticides, fertilizers, or genetically modified seeds for a more sustainable choice. Made from a luxurious cotton-silk blend, this jumper offers a comfortable regular fit with a classic crew neckline and rib-knit detailing on the neckline, cuffs, and hem. Finished with a Calvin Klein rubberized logo tab on the chest, it adds a touch of branded style to your wardrobe. Available in extended sizes, this versatile piece is perfect for all body types. Our model stands at 1.89m (6ft 2in) tall and wears a size M for the ideal fit. Care instructions: Machine washable and fits true to size. Made in Tunisia, this jumper is a stylish and responsible addition to any wardrobe.',
    },
    {
      id: 18,
      name: 'Calvin Klein-Boyfriend Monogram T-Shirt for Women',
      price: 55,
      image: "https://calvinklein-eu.scene7.com/is/image/CalvinKleinEU/J20J223279_YAF_main?$b2c_updp_recommendations_767$",
      description: 'Introducing our effortlessly chic boyfriend fit t-shirt, designed for comfort and style. This classic piece features a crew neckline and short sleeves, perfect for everyday wear.  With an uneven vented hem adding a touch of modern flair, it is finished with a glossy Calvin Klein logo print on the chest for a signature touch.  Crafted from a soft blend of 69% modal, 27% polyester, and 5% elastane, this tee offers the perfect balance of stretch and breathability.  Our model, standing at 1.76m (5ft 9in) tall, wears a size S for the ideal fit.  Machine washable and true to size, this versatile tee is made in Cambodia, offering both style and sustainability to your wardrobe.',
    },
    {
      id: 19,
      name: 'Cider-Knit Solid Cami Split Midi Dress & Crop Top for Women',
      price: 22,
      image: "https://img1.shopcider.com/product/1668971822000-dMQe7D.jpg?x-oss-process=image/resize,w_1400,m_lfit/quality,Q_80/interlace,1",
      description: 'Introducing our versatile and chic maxi dress, designed for both workdays and holidays alike. With a flattering mid-rise waistline and elegant square neckline, this dress offers a timeless silhouette.  Crafted from 100% polyester with high stretch, it ensures both comfort and durability. The solid pattern and split detail add a touch of sophistication to your look.  For care instructions, simply handwash and dry flat, avoiding bleach and high heat ironing.  Effortlessly stylish and practical, this maxi dress is a must-have addition to your wardrobe.',
    },
    {
      id: 20,
      name: 'Micheal Kors Mens-Logo Tape Recycled Polyester Puffer Jacket',
      price: 269,
      image: "https://michaelkors.scene7.com/is/image/MichaelKors/CF3204T35P-0001_1?wid=1300",
      description: 'Engineered to keep you warm and stylish, this quilted puffer jacket is made from 100% recycled polyester. The sizable hood is trimmed with sporty logo tape that extends along the interior portion of the zip-up silhouette. Play up the athletic sensibility by pairing it with a sweatshirt and the matching joggers.',
    },
    {
      id: 21,
      name: 'Polo Ralph Lauren-Cable-Knit Cotton Crewneck Cardigan for Women',
      price: 199,
      image: "https://www.optimized-rlmedia.io/is/image/PoloGSI/s7-1470157_alternate10?$rl_4x5_pdp$",
      description: 'Introducing our sleek and stylish slim-fit sweater, designed to elevate your wardrobe effortlessly.  Crafted to hit at the hip, this sweater offers a modern silhouette. With a rib-knit crewneck and buttoned placket featuring grosgrain trim, it exudes sophistication.  The long sleeves with rib-knit cuffs and hem add a touch of coziness to this chic piece, while the signature embroidered Pony on the left chest adds a classic touch of elegance.  Made from a blend of cotton and viscose, this sweater offers both comfort and durability. It is machine washable or suitable for dry cleaning, making maintenance a breeze.  Available in various sizes, our model stands at 178 cm and wears a size small for the perfect fit.  Elevate your style effortlessly with this versatile sweater, perfect for any occasion.',
    },
    {
      id: 22,
      name: 'GAP-Crinkle Cotton Lace 3/4 Sleeve Midi Dress for Women',
      price: 70,
      image: "https://cdn.platform.next/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/K90671s.jpg",
      description: 'Introducing our effortlessly chic midi dress, crafted from soft cotton crinkle gauze for ultimate comfort and style.  Featuring a flattering V-neckline and elegant three-quarter sleeves with delicate lace detailing at the hem, this dress is perfect for any occasion.  The button front adds a touch of sophistication, while the lace detailing at the hem adds a feminine flair.  Made from 100% cotton, this dress is not only stylish but also easy to care for – simply machine washable for your convenience.  Elevate your wardrobe with this versatile and comfortable midi dress, designed to keep you looking and feeling fabulous all day long.',
    },
    {
      id: 23,
      name: 'GAP-Belted Denim Jumpsuit for Women',
      price: 65,
      image: "https://cdn.platform.next/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/K78126s.jpg",
      description: ' Introducing our classic denim jumpsuit, designed for a flattering fit and timeless style.  Crafted from a blend of 94% cotton, 5% recycled materials, and 1% elastane, this jumpsuit offers a vintage denim feel with just the right amount of stretch.  Fitted at the top, cinched at the waist, and straight through the hip and thigh, it features a straight leg silhouette for a sleek look.  In a light indigo wash, this jumpsuit boasts a point collar, long sleeves with button cuffs, and button front closure. Complete with patch pockets at the chest and front slant pockets, as well as back patch pockets and a tie-belt at the waist, it is as functional as it is stylish.  As part of our water-saving Washwell Programme, this jumpsuit is responsibly made, helping to conserve millions of litres of water since 2016.  Elevate your denim collection with this versatile and eco-conscious jumpsuit, perfect for any occasion.',
    },
    {
      id: 24,
      name: 'GAP-Soft Stripe Pyjama Bottoms for Men',
      price: 35,
      image: "https://cdn.platform.next/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/K70893s.jpg",
      description: 'Soft cotton weave. elasticised drawstring waist. Certain styles have allover prints. Machine washable. 100% Cotton.',
    },
    {
      id: 25,
      name: 'Polo Ralph Lauren-Mesh-Knit Cotton Quarter-Zip Jumper for Men',
      price: 189,
      image: "https://www.optimized-rlmedia.io/is/image/PoloGSI/s7-1497354_alternate10?$rl_4x5_pdp$",
      description: 'Introducing our classic yet contemporary quarter-zip sweater, tailored for a regular fit that is wider at the chest while maintaining a sleek silhouette.  Crafted from 100% cotton, this sweater offers both comfort and style. With a rib-knit mockneck and quarter-zip placket, it exudes sophistication and versatility.  The long sleeves feature rib-knit cuffs for added warmth, while the rib-knit hem adds a touch of refinement.  Complete with the signature embroidered Pony on the left chest, this sweater is a timeless addition to any wardrobe.  Available in various sizes, our model stands at 185 cm and wears a size medium for the perfect fit.  Elevate your look with this effortlessly stylish quarter-zip sweater, perfect for any occasion.',
    },
    
  // Add more products as needed
];


// Product Component
const ProductCard = ({ product, addToCart }) => {
  const { user } = useUserAuth();
  const { id, name, price, image } = product;


  // Function to handle adding product to cart
  const handleAddToCart = async () => {
    try {
      console.log(user.uid)
      const productData = { // Creating data to be added to Firestore
        uid: user.uid,
        productId: id,
        productName: name,
        productPrice: price,
        productImage: image,
        // Add other product details if needed
      };
      console.log(id);
      console.log(productData)

      await addDoc(collection(db, "cart"), productData); // Adding product data to 'cart' collection in Firestore




      console.log("Document written with ID: ", id);
      // Get a reference to the 'cart' collection in Firestore


      toast.success('Add to cart successfully!', { // Toast notification for successful addition to cart
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error); // Handling error if product addition to cart fails
    }
  };


  return (
    <>

      {/* Product card layout */}
      <div class="product-grid">
        <div class="product-image">
          <a href="#" class="image">
            {/* Product image */}
            <img class="img-1" src={image} alt={name} />
            <img class="img-2" src={image} alt={name} />
          </a>
          {/* Product action icons */}
          <ul class="product-links">
            <li><a href="#"><i class="fa fa-heart"></i></a></li>
            <li><a href="#"><i class="fa fa-random"></i></a></li>
            <li><a><i class="fa fa-shopping-cart" onClick={handleAddToCart}></i></a></li>
          </ul>
          {/* Product view link */}
          <a href="#" class="product-view"><i class="fa fa-search"></i></a>
        </div>
        <div class="product-content">
          {/* Product rating */}
          <ul class="rating">
            <li class="fas fa-star"></li>
            <li class="fas fa-star"></li>
            <li class="fas fa-star"></li>
            <li class="fas fa-star"></li>
            <li class="fas fa-star disable"></li>
            <li class="disable">(1 reviews)</li>
          </ul>
          {/* Product name */}
          <h3 class="title"><a href="#">{name}</a></h3>
           {/* Product price */}
          <div class="price"> £{price}</div>
        </div>
      </div>

    </>
  );
};

// Home Page Component
const HomePage = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Filtering products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <div class="row d-flex justify-content-center mt-5" >
          <div className="row mt-4">
            <div className="col-md-12">
              {/* Search input */}
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="row mt-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-md-4 mb-3">
                    {/* Product card */}
                    <ProductCard product={product} addToCart={addToCart} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              {/* Content for sidebar or additional details */}
            </div>
          </div>


        </div>

      </div>
      {/* Toast notification container */}
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

export default HomePage;