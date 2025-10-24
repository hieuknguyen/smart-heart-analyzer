# ham thao tac co so du lieu
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.database.database import execute_query
from passlib.context import CryptContext
from typing import Optional, List, Dict
from pydantic import EmailStr
from snowflake import SnowflakeGenerator

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    async def get_user_by_email(email: str) -> Optional[Dict]:
        query = "SELECT * FROM users WHERE email = %s"
        result = await execute_query(query, (email,), fetch=True)
        return result[0] if result else None
    
    @staticmethod    
    async def get_all_email() -> List[str]:
        try:
            query = "SELECT email FROM users"
            result = await execute_query(query, fetch=True)
            return [user['email'] for user in result] if result else []
        except Exception as e:
            print(f"Error getting all emails: {e}")
            return []
    
    @staticmethod
    async def get_user_by_username(username: str) -> Optional[Dict]:
        query = "SELECT * FROM users WHERE username = %s"
        result = await execute_query(query, (username,), fetch=True)
        return result[0] if result else None
    
    @staticmethod
    async def get_user_by_id(user_id: str) -> Optional[Dict]:
        print(f"\n get_user_by_id called with user_id: {user_id} \n")
        query = "SELECT * FROM users WHERE id = %s"
        result = await execute_query(query, (user_id,), fetch=True)
        print(f"\n get_user_by_id result: {result} \n")
        return result[0] if result else None
    
    @staticmethod
    async def create_user(user: UserCreate) -> Optional[Dict]:
        try:
            gen = SnowflakeGenerator(1)
            id = f"{next(gen)}"
            hashed_password = UserService.hash_password(user.password)
            insert_query = """INSERT INTO users (id, email, first_name, last_name, hashed_password, is_active, is_verified) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s)"""
            await execute_query(
                insert_query, 
                (id, user.email, user.first_name, user.last_name, hashed_password, True, False)
            )
            user_data = await UserService.get_user_by_id(id)
            print(f"\n User data after creation: {user_data} \n")
            return user_data
        except Exception as e:
            print(f"❌ Lỗi khi tạo user: {e}")
            raise e
    
    @staticmethod
    async def update_user(user_id: str, user_update: UserUpdate) -> Optional[Dict]:
        update_fields = user_update.model_dump(exclude_unset=True)
        if not update_fields:
            return await UserService.get_user_by_id(user_id)
            
        set_clause = ", ".join(f"{field} = %s" for field in update_fields.keys())
        values = tuple(update_fields.values()) + (user_id,)
        
        query = f"UPDATE users SET {set_clause} WHERE id = %s"
        await execute_query(query, values)
        
        return await UserService.get_user_by_id(user_id)
    
    @staticmethod
    async def delete_user(user_id: str) -> bool:
        query = "DELETE FROM users WHERE id = %s"
        affected_rows = await execute_query(query, (user_id,))
        return affected_rows > 0
    
    @staticmethod
    async def get_all_users() -> List[UserResponse]:
        query = "SELECT * FROM `users` ORDER By users.auto_id ASC"
        results = await execute_query(query, fetch=True)
        
        # Filter out invalid users and handle validation errors
        valid_users = []
        for user in results:
            try:
                valid_users.append(UserResponse(**user))
            except Exception as e:
                print(f"⚠️ Skipping invalid user record: {user.get('email', 'N/A')} - {str(e)}")
                continue
        
        return valid_users

    @staticmethod
    async def clean_invalid_users() -> int:
        """Remove users with invalid email addresses"""
        query = "DELETE FROM users WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'"
        affected_rows = await execute_query(query)
        print(f"🧹 Cleaned {affected_rows} invalid user records")
        return affected_rows

    @staticmethod
    async def login(email: EmailStr, password: str) -> Optional[Dict]:
        try:
            query = "SELECT * FROM users WHERE email = %s"
            result = await execute_query(query, (email,), fetch=True)
            if not result:
                return None
            user = result[0]
            if not UserService.verify_password(password, user["hashed_password"]):
                return None
            return user
        except Exception as e:
            print(f"❌ Lỗi khi đăng nhập: {e}")
            return None