# User table schema (không cần SQLAlchemy model nữa)
# Các operation với database sẽ thực hiện thông qua raw SQL queries
# trong services và execute_query function

# Table structure:
# users (
#     auto_id INT AUTO_INCREMENT,
#     id VARCHAR(36) PRIMARY KEY,
#     email VARCHAR(100) UNIQUE NOT NULL,
#     first_name VARCHAR(50),
#     last_name VARCHAR(50),
#     hashed_password VARCHAR(255) NOT NULL,
#     is_active BOOLEAN DEFAULT TRUE,
#     is_verified BOOLEAN DEFAULT FALSE,
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
# )

