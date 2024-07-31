import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

# URL of the Wikipedia page
url = "https://en.wikipedia.org/wiki/List_of_books_banned_by_governments"

# Fetch the content from the URL
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all headings (countries) and their corresponding tables
    headings = soup.find_all('h2')

    # Initialize a dictionary to store all data
    all_data = {}

    # Loop through each heading
    for heading in headings:
        country_name = heading.text.strip().replace('[edit]', '')
        
        # Find the next table sibling
        next_sibling = heading.find_next_sibling()
        while next_sibling and next_sibling.name != 'table':
            next_sibling = next_sibling.find_next_sibling()

        if next_sibling and next_sibling.name == 'table':
            # Read the table into a DataFrame
            df = pd.read_html(str(next_sibling), flavor='lxml')[0]

            # Convert DataFrame to list of dictionaries
            records = df.to_dict(orient='records')

            # Initialize country data list
            country_data = []

            # Populate country data with the required fields
            for record in records:
                entry = {
                    "title": record.get('Title', ''),
                    "author": record.get('Author', ''),
                    "year_banned": record.get('Year', ''),
                    "note": record.get('Notes', '')
                }
                country_data.append(entry)

            # Add to all_data dictionary
            all_data[country_name] = country_data

    # Save the data to a JSON file
    with open('banned_books_by_country.json', 'w') as json_file:
        json.dump(all_data, json_file, indent=4)

    print("Saved combined data to banned_books_by_country.json")

else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")