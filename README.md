# Produting Project

Produting is an application that allows users to manage products in a dynamic and interactive way. It offers both public and private functionality, with a focus on ease of use and security.

---

### 🌐 Live

You can check out the live version of the Produting app here:  
[Produting App](http://produting-9fb14.firebaseapp.com)

---

### ⚙️ Technology Stack

- **Firebase** as Backend-as-a-Service (BAAS)
- **Cloud Firestore SDK** for database management

---

### 💡 Project Idea

The **Produting** app allows users to interact with products in the following ways:

#### **Public (Unauthorized Users):**
- **Home Page**: Users can explore the catalog of products.
- **About Page**: Information about the app.
- **Register Page**: Users can create an account.
- **Login Page**: Users can log in to access private functionality.
- **Catalog Page**: Users can view catalog list of all products with details. You can add them to favourites as well.

#### **Private (Authorized Users):**
- **Product Management**: Authorized users can:
  - Add new products.
  - Edit and delete their created products.
  - View all products they have created.
- **My Product Page**: Each authorized user has a personalized page where they can manage their own products.

---

### 🛠️ Functionality

The app includes essential features to ensure a smooth user experience:

- **User Authentication**: Secure login and registration for authorized users.
- **Product CRUD Operations**: Create, Read, Update, Delete products.
- **Error Handling**: Input fields validation and API error handling to ensure proper feedback to users.
- **Favorites**: Unauthorized users can view product details and add items to their favorites.

---

### 🔧 Client Project Setup

To run the project locally, follow these steps:
First you need to have Angular 19.0.0
1. **Install dependencies**:  
   ```bash
   npm install
2. ```bash
    	ng serve --open
3. ```bash
    ng build --configuration production
📁 Project Structure
The project follows a modular structure, where each feature is encapsulated in its respective component.

📄 License
Distributed under the MIT License. See LICENSE for more information.

👥 Contributing
If you'd like to contribute to the development of this project, feel free to fork the repository and submit a pull request with your changes!

👨‍💻 Author
Created with ❤️ by Tsvetomir Genov

✨ Credits
This project uses Firebase for its backend, providing a fast and scalable solution for the app's user authentication and database management.

Feel free to explore and get involved in making Produting even better!
