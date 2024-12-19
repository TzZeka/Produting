Produting 
Project is hosted at: http://produting-9fb14.firebaseapp.com

Implements Firebase as BAAS & Cloud Firestore SDK.

Idea
Produting app is an application that allows authorized users to create new products. Unauthorized user catalog with details and add to favourites . Authorized users can create, edit and delete  and see their created product and menage them.

Public part
Unauthorized user
User has access to Home page 
User has accees to About page
User has access to Register page.
User has access to Login page.

Private part
Authorized user
User could add a new product.
User has edit/delete access to all created products by themselves.

Each user has his own my-product page, where products are added by clicking "My product".
Functionality
All input fields error-handling.
API error-handling.
Client Project setup
npm install
ng serve --open
Compiles and minifies for production
ng build --configuration production
