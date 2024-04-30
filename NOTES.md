solideat-backend/
├── config/        # Configuration files (database connection, etc.)
│   └── db.js
├── controllers/   # Folder for controllers handling user requests
│   └── ...        # Specific controller files (e.g., userController.js, restaurantController.js)
├── models/        # Folder for Mongoose data models
│   └── ...        # Model files (e.g., User.js, Restaurant.js)
├── routes/        # Folder for API endpoints
│   └── ...        # Specific route files (e.g., userRoutes.js, restaurantRoutes.js)
├── middleware/    # Folder for any middleware functions (e.g., authentication)
│   └── ...        # Middleware files (e.g., authMiddleware.js)
├── utils/         # Folder for utility functions (optional)
│   └── ...        # Utility files (e.g., passwordHashing.js)
├── app.js          # Main application entry point
├── package.json    # Project dependencies
└── index.js        # (Optional) Alternative entry point (can be removed)