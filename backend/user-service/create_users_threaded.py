import requests
import json
from concurrent.futures import ThreadPoolExecutor
import random
import string
import time

def generate_random_name(length=8):
    return ''.join(random.choices(string.ascii_lowercase, k=length))

def generate_random_email():
    name = generate_random_name()
    domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com']
    return f"{name}@{random.choice(domains)}"

def generate_random_names():
    first_names = [
        'Anh', 'Binh', 'Cuong', 'Dung', 'Em', 'Huong', 'Hai', 'Khanh', 'Lan', 'Mai',
        'Nam', 'Oanh', 'Phuong', 'Quang', 'Son', 'Thuy', 'Tuan', 'Van', 'Xuan', 'Yen'
    ]
    last_names = [
        'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Dang', 'Bui', 'Do',
        'Ho', 'Ngo', 'Duong', 'Ly', 'Dao', 'Dinh', 'Trinh', 'Mai', 'Vo', 'Huynh'
    ]
    return random.choice(first_names), random.choice(last_names)

def create_user(user_data):
    url = "http://localhost:3000/users/"
    try:
        print(f"\nAttempting to create user with data:")
        print(json.dumps(user_data, indent=2))
        
        response = requests.post(url, json=user_data)
        print(f"\nResponse status: {response.status_code}")
        
        if response.status_code == 201:
            result = response.json()
            print(f"Response data: {json.dumps(result, indent=2)}")
            return True
        else:
            print(f"Error details: {response.text}")
            return False
    except Exception as e:
        return False

def generate_users(count=100):
    users = []
    for i in range(count):
        first_name, last_name = generate_random_names()
        email = generate_random_email()
        user = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "password": "123456"  # Simple password for test users
        }
        print(f"Generating user {i+1}: {user}")
        users.append(user)
    return users

def create_users_batch(users):
    success_count = 0
    for user in users:
        if create_user(user):
            success_count += 1
        time.sleep(0.1)  # Small delay to prevent overwhelming the server
    return success_count

def main():
    print("Generating 100 random users...")
    all_users = generate_users(1000)
    
    # Chia users thành 4 phần bằng nhau
    batch_size = len(all_users) // 5
    user_batches = [
        all_users[i:i + batch_size] 
        for i in range(0, len(all_users), batch_size)
    ]

    print(f"Starting creation with 4 threads...")
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(create_users_batch, user_batches))
    
    total_success = sum(results)
    end_time = time.time()
    
    print(f"\nCreation completed!")
    print(f"Total successful creations: {total_success}/100")
    print(f"Total time taken: {end_time - start_time:.2f} seconds")

if __name__ == "__main__":
    main()



    