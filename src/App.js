import './App.css'; // Importing CSS file for styling
import {Container,Row,Col} from 'react-bootstrap' // Importing Container, Row, and Col components from React Bootstrap
import Login from './components/Login' // Importing Login component
import Signup from './components/Signup.jsx' // Importing Signup component
import Home from './components/Home'; // Importing Home component
import {Routes,Route} from 'react-router-dom' // Importing Routes and Route components from React Router
import ProtectedRoute from './components/ProtectedRoute' // Importing ProtectedRoute component
import {UserAuthContextProvider} from './context/UserAuthContext' // Importing UserAuthContextProvider from user authentication context
import CartPage from './components/CartPage.jsx'; // Importing CartPage component
import HomePage from './components/Catalog.jsx'; // Importing HomePage component
import Navbar from './components/Navbar.jsx'; // Importing Navbar component

// This is a functional component responsible for rendering the entire application UI
function App() {
  return (
   
    
      <Row>
        <Col>
        {/* Wrapping components in UserAuthContextProvider to provide user authentication context */}
        <UserAuthContextProvider>
        
        <Routes>
        {/* Routes for different pages */}

        <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage/></ProtectedRoute>}/>

          <Route path="/" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
        </Routes>
        </UserAuthContextProvider>
        </Col>
      </Row>
   
  );
}

export default App; // Exporting App component