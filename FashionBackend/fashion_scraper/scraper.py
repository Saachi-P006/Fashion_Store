# scraper_fashion.py
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random

def scrape_category(url, gender, category_name):
    """
    Scrape a category page for products.
    url: the category URL you want to scrape
    gender: "Men" or "Women" (you pick based on category)
    category_name: category like "Dress", "Shoes", etc.
    """
    products = []
    headers = {
        "User‑Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "html.parser")

    # Example selector — change this to match target site
    for item in soup.select(".product‑card"):
        name = item.select_one(".product‑name").get_text(strip=True)
        price_raw = item.select_one(".product‑price").get_text(strip=True)
        # Clean price (remove currency symbols, commas etc)
        price = float("".join(ch for ch in price_raw if (ch.isdigit() or ch=='.')))
        image = item.select_one("img")["src"]
        link = item.select_one("a")["href"]
        products.append({
            "name": name,
            "category": category_name,
            "price": price,
            "image": image,
            "url": link,
            "gender": gender
        })

    return products

def main():
    all_products = []

    # add as many category URLs as you like
    # Example:
    all_products.extend(scrape_category("https://example‑fashion‑site.com/women/dresses", "Women", "Dress"))
    all_products.extend(scrape_category("https://example‑fashion‑site.com/men/shoes", "Men", "Shoes"))

    # Convert to DataFrame and save
    df = pd.DataFrame(all_products)
    df.to_csv("fashion_data.csv", index=False)
    print(f"✅ Scraped {len(all_products)} products. Saved to fashion_data.csv")

if __name__ == "__main__":
    main()
