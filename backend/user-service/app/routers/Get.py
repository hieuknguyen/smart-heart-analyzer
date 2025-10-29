from fastapi import APIRouter
from snowflake import SnowflakeGenerator
Get = APIRouter(prefix="")

@Get.get("/")
def get_abc():
    return {"message": "Đây là /users/abc",
            "number": 123}

@Get.get("/x")
def get_abc_x():
    id = next(SnowflakeGenerator(1))

    return {
        "id": id,
        "name": "Nguyễn Trung Hiếu",
        "list": [1, 2, 3, 4, 5],
        "dict": {"a": 1, "b": 2, "c": {"d": {"e": 5, "f": 6,"h":{"g": 4.5554545, "i": True}}}}
            }

@Get.get("/y")
def get_abc_y():
    return {"message": "Đây là /users/abc/y"}
