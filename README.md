# Project Overview

This project provides a RESTful API to clients for managing books, users, purchases, and carts. It is built using NestJS, a powerful Node.js framework for building efficient, reliable, and scalable server-side applications. The architecture follows a microservices approach, utilizing RabbitMQ as the message broker for communication between services.

## How to Run

To run the project, follow these steps:

1. **Clone the Repository**: 
   ```
   git clone https://github.com/S0T12/bookstore-gateway.git
   ```

2. **Install Dependencies**:
   ```
   cd <project-folder>
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables. You may refer to `.env.example` for the required variables.

4. **Start the Application**:
   ```
   npm run start:dev
   ```
   This command will start the application in development mode, enabling hot-reloading for code changes.

5. **Access the API**:
   Once the application is running, you can access the API endpoints through `http://localhost:3000`.

## Algorithms Used

### Authentication and Authorization
- **JWT Authentication**: JSON Web Tokens (JWT) are used for authenticating users. When a user logs in, a JWT token is generated and provided to the client, which is then used for subsequent authenticated requests.
- **Role-based Access Control**: The application implements role-based access control to restrict access to certain endpoints based on user roles. Roles such as `admin` and `superAdmin` are defined, and corresponding guards ensure only authorized users can access protected routes.

### Data Management
- **CRUD Operations**: The application follows a CRUD (Create, Read, Update, Delete) approach for managing resources such as books, users, and purchases. Each resource has corresponding endpoints for performing these operations.
- **Search and Filtering**: Algorithms are implemented to allow users to search for books based on title, author, genre, and year of publication. These algorithms enable efficient retrieval of relevant data from the database.

### Cart Management
- **Add to Cart**: When a user adds an item to their cart, the application updates the cart data accordingly, associating the item with the user's purchase.
- **Remove from Cart**: Users can remove items from their cart, which triggers an update to the cart data, removing the specified item from the user's purchase.
- **Clear Cart**: The application provides functionality to clear a user's entire cart, removing all items associated with the user's purchase.

## Scenarios

1. **User Registration and Login**:
   - A new user registers with the application by providing necessary details such as username, email, and password.
   - Upon successful registration, the user receives a JWT token, which is used for subsequent authenticated requests.
   - Existing users can log in using their credentials, and upon successful authentication, receive a JWT token.

2. **Managing Books**:
   - Users can perform CRUD operations on books, including creating, reading, updating, and deleting books.
   - Algorithms allow users to search for books based on various criteria such as title, author, genre, and year of publication.

3. **User Management**:
   - Administrators can view a list of all users and their details, including username, email, and role.
   - Role-based access control ensures that only authorized users (e.g., admins, superAdmins) can access user-related endpoints.

4. **Purchase Management**:
   - Users can create new purchases and view details of their existing purchases.
   - Cart management functionality allows users to add items to their cart, remove items, or clear their entire cart.

5. **Authentication and Authorization**:
   - Access to certain endpoints is restricted based on user roles. For example, only admins and superAdmins can perform certain user management tasks.
   - JWT tokens are validated to ensure that only authenticated users can access protected routes.
