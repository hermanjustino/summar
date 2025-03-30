#!/bin/bash

# Navigate to project root
cd /summar

# Create component directories
mkdir -p src/components/auth
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/posts

# Create pages directory
mkdir -p src/pages

# Create hooks, services and utils directories
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/utils

# Create auth component files
touch src/components/auth/Login.js
touch src/components/auth/Register.js
touch src/components/auth/AuthForm.js

# Create common component files
touch src/components/common/Button.js
touch src/components/common/Modal.js
touch src/components/common/Card.js
touch src/components/common/Loader.js

# Create additional content components
touch src/components/content/ContentList.js
touch src/components/content/ContentItem.js
touch src/components/content/ContentDetail.js

# Create layout components
touch src/components/layout/Header.js
touch src/components/layout/Footer.js
touch src/components/layout/Sidebar.js

# Create post components
touch src/components/posts/PostList.js
touch src/components/posts/PostItem.js
touch src/components/posts/PostForm.js

# Create page components
touch src/pages/Dashboard.js
touch src/pages/Library.js
touch src/pages/Generated.js
touch src/pages/Profile.js
touch src/pages/NotFound.js

# Create additional context files
touch src/context/AuthContext.js
touch src/context/ThemeContext.js

# Create hooks
touch src/hooks/useAuth.js
touch src/hooks/useLocalStorage.js
touch src/hooks/useMediaQuery.js

# Create service files
touch src/services/api.js
touch src/services/auth.js
touch src/services/storage.js

# Create utility files
touch src/utils/formatters.js
touch src/utils/validators.js
touch src/utils/constants.js

echo "Project structure created successfully!"
