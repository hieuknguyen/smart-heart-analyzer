from pybloom_live import BloomFilter
import hashlib
from bitarray import bitarray


class Bloom:
    def __init__(self, capacity=100000, k=7):
        self.capacity = capacity
        self.k = k
        self.bit_array = bitarray(capacity)
        self.bit_array.setall(0)
        

    def add(self, email: str):
        for h in self.hash_email_multi(email):
            self.bit_array[h] = 1

    def  check(self, email: str) -> bool:
        return all(self.bit_array[h] == 1 for h in self.hash_email_multi(email))
    
    def hash_email_multi(self, email: str):
        digest = hashlib.sha256(email.encode()).digest()
        hashes = []
        for i in range(self.k):
            part = digest[i*4:(i+1)*4]
            h = int.from_bytes(part, "big") % self.capacity
            hashes.append(h)
        # print(hashes)
        return hashes



