# app.py
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Root route - just to confirm backend is running
@app.route("/")
def index():
    return "✅ Fashion Backend is running! Use /products, /clothing, /men, or /women"

# Fetch all products
@app.route("/products")
def get_products():
    response = requests.get("https://fakestoreapi.com/products")
    data = response.json()
    return jsonify(data)

# Fetch only clothing (both men & women)
@app.route("/clothing")
def get_clothing():
    womens_resp = requests.get("https://fakestoreapi.com/products/category/women's clothing")
    womens = womens_resp.json()
    mens_resp = requests.get("https://fakestoreapi.com/products/category/men's clothing")
    mens = mens_resp.json()
    return jsonify(womens + mens)

# Optional: Fetch only men clothing
@app.route("/men")
def get_men():
    response = requests.get("https://fakestoreapi.com/products/category/men's clothing")
    return jsonify(response.json())

# Optional: Fetch only women clothing
@app.route("/women")
def get_women():
    response = requests.get("https://fakestoreapi.com/products/category/women's clothing")
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
