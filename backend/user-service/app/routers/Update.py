from fastapi import APIRouter

Update = APIRouter(prefix="")

@Update.put("/")
def get_abc():
    return {"message": "Đây là /users/abc"}

# @Get.post("/x")
# def get_abc_x():
#     return {"message": "Đây là /users/abc/x"}

# @Get.o("/y")
# def get_abc_y():
#     return {"message": "Đây là /users/abc/y"}
