import os

# Define the list of page names
pages = [
    "bookings",
    "checkout",
    "favorites",
    "profile",
    "properties",
    "rentals",
    "reviews",
]

# Base directory where the app folder is located
base_dir = "app"

# Loop through each page name
for page in pages:
    # Create the folder inside the app directory
    folder_path = os.path.join(base_dir, page)
    os.makedirs(folder_path, exist_ok=True)

    # Create the page.tsx file with the React component
    file_path = os.path.join(folder_path, "page.tsx")
    with open(file_path, "w") as file:
        file.write(
            f"""import React from 'react';

export default function {page.capitalize()}Page() {{
  return <h1 className="text-3xl">{page.capitalize()} Page</h1>;
}}
"""
        )
