import requests
import json
import datetime

url = "https://api.coingecko.com/api/v3/simple/price"
params = {
    "ids": "bitcoin,ethereum", 
    "vs_currencies": "usd" 
}

def get_crypto_prices():
    try:
        response = requests.get(url, params=params)
        response.raise_for_status() 
        prices = response.json()
        return prices
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")

def process_data(data):
    if data:
        print("Precios de Criptomonedas:")
        for crypto, price_info in data.items():
            print(f"{crypto.capitalize()}: ${price_info['usd']} USD")

        filename = f"crypto_prices_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, 'w') as file:
            json.dump(data, file, indent=4)
        print(f"Datos guardados en {filename}")
    else:
        print("No se recibieron datos para procesar.")

if __name__ == "__main__":
    prices = get_crypto_prices()
    process_data(prices)
