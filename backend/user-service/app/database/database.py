from typing import Any, Optional, Union, List
import aiomysql
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MYSQL_CONFIG = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'port': int(os.getenv('MYSQL_PORT', '3306')),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', 'password'),
    'db': os.getenv('MYSQL_DATABASE', 'user_db'),
    'auth_plugin': os.getenv('MYSQL_AUTH_PLUGIN', 'mysql_native_password')
}

# --- Pool connection ---
_pool = None

async def get_pool():
    """Get or create a connection pool"""
    global _pool
    if _pool is None:
        try:
            _pool = await aiomysql.create_pool(**MYSQL_CONFIG, autocommit=True)
            print(_pool)
        except Exception as e:
            print(f"Error creating connection pool: {e}")
            raise
    return _pool

async def initialize_database():
    """Khởi tạo database và kết nối"""
    tmp_config = MYSQL_CONFIG.copy()
    tmp_config.pop('db')
    
    try:
        pool = await aiomysql.create_pool(**tmp_config)
        async with pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SET sql_notes = 0;")
                await cursor.execute(f"CREATE DATABASE IF NOT EXISTS {MYSQL_CONFIG['db']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
                await cursor.execute("SET sql_notes = 1;")
                print(f"✅ Database `{MYSQL_CONFIG['db']}` đã tồn tại hoặc được tạo mới")
    except Exception as e:
        print(f"❌ Lỗi khi tạo database: {e}")
        print("⚠️  Tiếp tục chạy ứng dụng mà không khởi tạo database. Đảm bảo MySQL đang chạy để sử dụng đầy đủ chức năng.")
        # Trong development, chúng ta có thể tiếp tục mà không cần database
        if os.getenv('ENVIRONMENT') != 'development':
            raise e
    finally:
        if 'pool' in locals():
            pool.close()
            await pool.wait_closed()

async def create_tables():
    """Create database tables using raw SQL"""
    try:
        pool = await get_pool()
        async with pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SET sql_notes = 0;")
                # Create users table
                await cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    auto_id INT AUTO_INCREMENT PRIMARY KEY,
                    id VARCHAR(36) NOT NULL UNIQUE,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    first_name VARCHAR(50),
                    last_name VARCHAR(50),
                    hashed_password VARCHAR(255) NOT NULL,
                    is_active BOOLEAN DEFAULT TRUE,
                    is_verified BOOLEAN DEFAULT FALSE,
                    token VARCHAR(255) NULL,
                    token_expires_at DATETIME NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_email (email),
                    INDEX idx_id (id),
                    INDEX idx_auto_id (auto_id)
                ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
            """)
                await cursor.execute("SET sql_notes = 1;")
            await conn.commit()
            print("✅ Đã tạo bảng bằng raw SQL")
    except Exception as e:
        print(f"❌ Lỗi khi tạo bảng: {e}")
        print("⚠️  Tiếp tục chạy ứng dụng mà không tạo bảng. Đảm bảo MySQL đang chạy để sử dụng đầy đủ chức năng.")
        if os.getenv('ENVIRONMENT') != 'development':
            raise e

async def execute_query(query: str, params: Optional[Union[tuple, List[tuple]]] = None, fetch: bool = False) -> Any:
    """Execute a SQL query using the connection pool"""
    pool = await get_pool()
    async with pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cursor:
            try:
                await cursor.execute(query, params or ())
                if fetch:
                    result = await cursor.fetchall()
                    return result
                await conn.commit()
                if cursor.lastrowid:
                    return cursor.lastrowid
                return cursor.rowcount
            except Exception as e:
                await conn.rollback()
                raise e