# Sử dụng image gốc
FROM python:3.13-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file từ máy host vào container
COPY requirements.txt .

# Cài đặt dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

