from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MODEL_PATH = r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\healthy-chatbot-checkpoint"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)
class ChatRequest(BaseModel):
    prompt: str

def generate_response(prompt: str) -> str:
    inputs = tokenizer(prompt, return_tensors="pt")
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_length=300,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    text = text.replace(prompt, "").strip()

    lines = [line.strip() for line in text.split("AI:") if line.strip()]
    formatted = "\n".join([f"- {line}" for line in lines])
    return formatted
