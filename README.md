# WELCOME TO MY FINAL YEAR PROJECT

This repository has been created to store my final year project. You may edit it as you like, but please do not remove the default topics or the project members list. These need to stay as currently defined in order for your supervisor to be able to find your project.

# A Study in Human Computer Interaction in a clothing E-commerce experience

This e-commerce system combines three interfaces to create a user-friendly online fashion store shopping experience: a React app used to build a webpage interface for browsing on computers, a React Native used to build a mobile app interface for on-the-go shopping, both of these interfaces are backed by Firebase, our database interface. 
It simply allows users to browse products, view product details, add the desired items to the cart, and complete the checkout process.


# Getting Started

## Dependencies

The project relies on the following key dependencies:
- React: A popular JavaScript library for developing user interfaces. This framework follows a component-based architecture, allowing developers to create reusable UI components and efficiently manage the state and rendering of those components.
- React Native: A framework for building native mobile apps using JavaScript and React.
- Expo: A platform for building and deploying React Native apps.
- Firebase: A backend platform for mobile app interface and web-app interface, providing authentication, database, and storage services.

## Configuration

Before running the application, make sure to configure the database. To do so you have to set up a Firebase project and obtain the necessary configuration files and API keys.

## Known Issues

The application may not work correctly with older versions of Expo. Make sure to use the specified version of Expo Go app (2.28.6) for optimal compatibility.

## Contributing

Contributions to the project are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.


## FIREBASE DATABASE INTERFACE

One of the interfaces of our e-commerce system is the Firebase database, which serves as the backend for storing and managing data. 
Firebase is a great platform provided by Google that offers a bunch of tools and services for building web and mobile applications.

As my project is mostly front-end based that requires minimal back-end work I have chosen Firebase for my project because it's super easy to use, provides real-time data synchronisation, and integrates easily with React and React Native.

**Key Features of Firebase Database:**

1. Real-time Data Synchronisation: It enables real-time data synchronisation across all connected devices. Any changes made to the data are instantly updated and reflected in the application, giving users a smooth experience.

2. Scalability and Performance: Firebase is built to handle large-scale applications with tons of traffic and data usage.

3. Security and Authentication: Firebase takes security seriously and offers robust features to keep your app and data safe. It supports various authentication methods, like email/password, Google Sign-In, making sure only authorised users can access the application.

**Troubleshooting and Safety Measures:**

1. Continuous Operation: One thing to keep in mind is that if you leave the Firebase database open for a long time, it might stop working. To prevent this, make sure to close the database connection when you're not using it and have proper error handling in place.

2. Security Rules: Firebase has these cool security rules that let you control who can read and write to your database. It's super important to set these rules correctly to prevent any unauthorised access and keep your data safe. Make sure to review and update the security rules regularly to stay one step ahead of any potential vulnerabilities.

3. Authentication Data Protection: To keep your authentication data safe from bad cookies and unauthorised access, it's a good idea to regularly edit the Firebase rules.

**Frequent Issues encountered:**
My localhost http://localhost:19007 stopped working due to a 'FirebaseError: Quota exceeded error in product.js:12'. This error indicates that the Firebase quota limit has been reached, and further requests cannot be processed until the quota resets or is increased.

To resolve this issue, you can try the following:
1. Check your Firebase plan and quota limits to see if you have exceeded the allowed usage.
2. Optimise your database queries and reduce unnecessary reads and writes to minimise quota consumption.
3. Consider upgrading your Firebase plan to a higher tier with increased quota limits if necessary.
4. Reach out to Firebase support for further assistance if the issue persists.


## USER GUIDE FOR THE WEB-APP INTERFACE

Here are some steps to help you to explore the web-app and enjoy your personal shopping experience!

### Deployment Instructions for the Web-App Interface

Make sure to run the following command in your terminal to compile this code successfully:
1. Firstly, clone the repository: `git clone <repository-url>`.
2. Then, navigate to the project directory: `cd project`.
3. To download all the necessary dependencies run: `npm install --force` and `npm install react-toastify`.
4. To not encounter any issues with react-scripts, such as errors messages saying " 'react-scripts' is not installed"  run: `npm i react-scripts`.
5. Start the development server: `npm start`.
6. The web-app should now be ready to go.


### Navigating the Web-App Interface

1. **Webpack Compilation:**
Once the webpack is compiled successfully, the web-app is ready to view in the browser.

2. **Sign In:**
Log in to your account using your Google account or any other preferred email in the provided prompt.

3. **Home Screen:**
After successful login, the web-app will display the home screen.

4. **Navigation:**
You can utilize search functionalities to find desired products. A "Home" button is available at the top for easy navigation back to the home page.

5. **Cart Management:**
Use the "Cart" button to view selected products. Then the selected items will be added to the cart for checkout. Additionally, the user has an overview of the total amount to pay during checkout.

6. **Logout:**
Use the "Logout" button to log out of your account. This will take you back to the "Sign in" or "Log in" page.


## USER GUIDE FOR THE MOBILE-APP INTERFACE
Steps to enjoy and experience an optimal online shopping experience on your Android device!

### Deployment Instructions for the Mobile-App Interface

Make sure to run the following command in your terminal to compile this code successfully:
1. Firstly, clone the repository: `git clone <repository-url>`.
2. Then, navigate to the project directory.
3. To download all the necessary dependencies run: `npm install --force`.
4. To not encounter any issues with react-scripts, such as error messages saying " 'react-scripts' is not installed"  run: `npm i react-scripts`.
5. Start the development server: `npm start`.
6. Download and install this version of the 'Expo Go' app on your Android device. This is the link provided: ` https://apk.support/download-app/host.exp.exponent/189/2.28.6 `.
7. Open the installed 'Expo Go' app on your Android device and scan the QR code displayed in the terminal.
8. If you do not have access on the Android device you can also open a web version of the mobile-app interface created. Simply from one of the information displayed on your terminal once compiled the code, would be to press 'w'.

### Navigating the Mobile-App Interface

1. **Mobile app Compilation:**
Once the app is compiled successfully, the terminal will display the generated QR code that will be scanned by your Android device where you have installed 'Expo Go' app.
As an alternative to use an Android device, the application can be open on a web browser too if we would press the command press 'w'.

2. **Login and Registration**
Once the app has been launched, you will be prompted to log in or create a new account:
- To log in, enter your registered email address and password.
- If you don't have an account, tap on the 'Register' button and follow the instructions to create a new account.

3. **Home Screen**
After successful login, you will be directed to the home screen that will display a list of featured products. You can also scroll through the products or use the search bar at the top to find specific items.

4. **Product Details**
To view the details of a product just simply tap on it. The product details screen shows information such as the product name, brand, price, description, available sizes and quantity.
Once you have chosen your desired product, tap on the "Add to Cart" button to add the product to your shopping cart.

5. **Shopping Cart**
To access the screen that displays a list of the things you have added, tap the cart symbol in the bottom navigation bar to go to your shopping cart.
In this screen you can also remove the items that you no longer wish to purchase. Once you are happy with the items in your cart you can finally proceed with the checkout, by tapping on the "Checkout" button.

6. **Checkout Process**
To initiate the checkout process will be seen in the 'Cart Screen', navigate to the checkout screen where you can review the details of your order, including the total amount and the total quantity of the items. Once finalised your purchase tap on the 'Place Order' button. 

7. **Order Screen**
Following the above steps, you will know that your order has been confirmation. A unique order number also be generated, displaying the time of your purchase to validate your transaction.

7. **Profile and Settings**
To access your profile, simply tap on the profile icon located in the bottom navigation bar. Once in the 'Profile Screen', you'll have the ability to view and make edits to your personal information. When you're ready to log out of the application, simply locate and tap on the 'Logout' button within the 'Profile Screen'.

9. **Troubleshooting**
If you encounter any issues with the app, try closing and relaunching it. Make sure you have a stable internet connection.



### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## We hope you enjoy using the Online Fashion Store application created. Happy shopping!
