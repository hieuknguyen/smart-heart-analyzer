import streamlit as st

st.set_page_config(page_title="Heart Disease Chatbot")

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

MODEL_PATH = r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\healthy-chatbot-checkpoint"

@st.cache_resource(show_spinner=True)
def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)
    return tokenizer, model

tokenizer, model = load_model()

def chat(prompt):
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

st.title("Heart Disease AI Chatbot")
st.write("Ask questions about heart disease. The AI will respond in short, clear advice.")

user_input = st.text_input("You:", "")

if st.button("Send") and user_input.strip() != "":
    prompt = f"User: {user_input}\nAI:"
    with st.spinner("AI is thinking..."):
        response = chat(prompt)
    st.markdown(response)