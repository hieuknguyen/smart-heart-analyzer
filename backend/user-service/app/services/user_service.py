# ham thao tac co so du lieu
from app.schemas.user import UserCreate, UserResponse, UserUpdate, UserLogin, Usertoken
from app.database.database import execute_query
from passlib.context import CryptContext
from typing import Optional, List, Dict
from pydantic import EmailStr
from snowflake import SnowflakeGenerator
from datetime import datetime, timedelta
from jose import JWTError, jwt

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
    async def create(user: UserCreate) -> Optional[Dict]:
        try:
            gen = SnowflakeGenerator(1)
            id = f"{next(gen)}"
            hashed_password = UserService.hash_password(user.password)
            ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = UserService.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
            insert_query = """INSERT INTO users (id, email, first_name, last_name, hashed_password, is_active, is_verified,token, token_expires_at) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            await execute_query(
                insert_query, 
                (id, user.email, user.first_name, user.last_name, hashed_password, True, False,access_token, datetime.utcnow() + access_token_expires)
            )
            user_data = await UserService.get_user_by_id(id)
            print(f"\n User data after creation: {user_data} \n")
            return UserResponse(**user_data)
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
    async def edit_profile(user_id: str, profile_update: UserUpdate) -> Optional[UserResponse]:
        existing_user = await UserService.get_user_by_id(user_id)
        if not existing_user:
            return None
        update_fields = profile_update.model_dump(exclude_unset=True)
        update_fields.pop("is_active", None)
        if "email" in update_fields:
            email_owner = await UserService.get_user_by_email(update_fields["email"])
            if email_owner and email_owner["id"] != user_id:
                raise ValueError("Email đã tồn tại")
        if not update_fields:
            return UserResponse(**existing_user)
        set_clause = ", ".join(f"{field} = %s" for field in update_fields.keys())
        query = f"UPDATE users SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE id = %s"
        values = tuple(update_fields.values()) + (user_id,)
        await execute_query(query, values)
        updated_user = await UserService.get_user_by_id(user_id)
        return UserResponse(**updated_user) if updated_user else None
    
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
    async def login(user: UserLogin) -> Optional[Dict]:
        try:
            query = "SELECT * FROM users WHERE email = %s"
            result = await execute_query(query, (user.email,), fetch=True)
            
            if not result:
                return None
            result = result[0]
            if not UserService.verify_password(user.password, result["hashed_password"]):
                return None
             
            
            ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = UserService.create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
            update_query = "UPDATE users SET token = %s, token_expires_at = %s WHERE email = %s"
            await execute_query(update_query, (access_token, datetime.utcnow() + access_token_expires, user.email))

            result["token"] = access_token
            result["token_expires_at"] = datetime.utcnow() + access_token_expires
            print(result)
            return UserResponse(**result)
        except Exception as e:
            return {"error": str(e)}
    
    @staticmethod
    async def login_with_token(token: Usertoken) -> Optional[Dict]:
        try:
            query = "SELECT * FROM users WHERE token = %s"
            result = await execute_query(query, (token.token,), fetch=True)
            if not result:
                return None
            result = result[0]
            if result["token_expires_at"] is None or result["token_expires_at"] < datetime.utcnow():
                return None 
            ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            update_query = "UPDATE users SET token_expires_at = %s WHERE email = %s"
            await execute_query(update_query, (datetime.utcnow() + access_token_expires, result["email"]))
            result["token_expires_at"] = datetime.utcnow() + access_token_expires
            print(result)
            return UserResponse(**result)
        except Exception as e:
            return {"error": str(e)}
        
    @staticmethod
    async def change_password(user_id: str, old_password: str, new_password: str) -> None:
        """
        Đổi mật khẩu người dùng theo id.
        Ném lỗi khi không tìm thấy user hoặc mật khẩu cũ không khớp.
        """
        result = await UserService.get_user_by_id(user_id)
        if not result:
            raise LookupError("User not found")
        if not UserService.verify_password(old_password, result["hashed_password"]):
            raise PermissionError("Mật khẩu cũ không đúng")

        new_hashed_password = UserService.hash_password(new_password)
        query = "UPDATE users SET hashed_password = %s WHERE id = %s"
        await execute_query(query, (new_hashed_password, user_id))
    
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        SECRET_KEY = "your_secret_key_very_secret"
        ALGORITHM = "HS256"
        ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
