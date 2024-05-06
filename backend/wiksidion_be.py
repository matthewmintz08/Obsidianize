from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins='*')

url = "https://en.wikipedia.org/w/api.php"

@app.route('/api/search', methods=['POST'])
def search_wikipedia():
    data = request.get_json()
    search_term = data.get('searchTerm')
    params = {
        "action": "parse",
        "page":search_term,
        "format": "json"
    }
    response = requests.get(url, params)
    print(response.json())
    if response.ok:
        search_results = response.json()
        
        return search_results
    else:
        return jsonify({'error': 'Failed to fetch search results'}), 500

if __name__ == '__main__':
    app.run(debug=True)