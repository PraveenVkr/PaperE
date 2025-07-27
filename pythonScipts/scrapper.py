import os
import re
import csv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from requests.auth import HTTPBasicAuth

BASE_URL = "http://dspace.spit.ac.in"
LOGIN_PAGE_URL = BASE_URL + "/xmlui/login"
LISTING_URL = BASE_URL + "/xmlui/handle/123456789/6/recent-submissions"
USERNAME = "spit"     # Replace with your username
PASSWORD = "DSpace"   # Replace with your password
MAX_OFFSET = 100
STEP = 20

session = requests.Session()
session.auth = HTTPBasicAuth(USERNAME, PASSWORD)
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36"
})

def get_submission_links(offset):
    url = f"{LISTING_URL}?offset={offset}" if offset > 0 else LISTING_URL
    resp = session.get(url)
    if resp.status_code != 200:
        print(f"[!] Failed to fetch submissions page at offset {offset}")
        return []
    soup = BeautifulSoup(resp.text, 'html.parser')
    links = []
    for a in soup.select('.artifact-title > a[href]'):
        href = a['href']
        title = a.get_text(strip=True)
        links.append((urljoin(BASE_URL, href), title))
    return links

def parse_title(title):
    m = re.match(r"sem\s*(\d+(?:-\d+)?)\s*-\s*(.+)", title, re.I)
    if m:
        sem = f"sem {m.group(1)}"
        subject = m.group(2).strip()
    else:
        sem = "unknown"
        subject = title.strip()
    return sem, subject

def extract_pdf_links(item_url):
    resp = session.get(item_url)
    if resp.status_code != 200:
        print(f"[!] Failed to fetch item page: {item_url}")
        return []
    soup = BeautifulSoup(resp.text, 'html.parser')

    pdf_links = []
    for a in soup.find_all('a', href=True):
        href = a['href'].lower()
        if 'bitstream' in href and '.pdf' in href:
            full_url = urljoin(BASE_URL, a['href'])
            pdf_links.append(full_url)

    if not pdf_links:
        print(f"[!] No PDFs found at {item_url}")
    else:
        print(f"[+] Found {len(pdf_links)} PDFs at {item_url}:")
        for link in pdf_links:
            print(f"    {link}")

    return pdf_links



def scrape_metadata():
    data = []
    id_counter = 1
    for offset in range(0, MAX_OFFSET + 1, STEP):
        print(f"\n--- Fetching submissions offset {offset} ---")
        items = get_submission_links(offset)
        if not items:
            print("[*] No more items found, stopping.")
            break
        for item_url, title in items:
            sem, subject = parse_title(title)
            pdfs = extract_pdf_links(item_url)
            for pdf_url in pdfs:
                data.append({
                    "id": id_counter,
                    "semester": sem,
                    "subject": subject,
                    "paper_title": title,
                    "pdf_url": pdf_url
                })
                id_counter += 1
    return data

def save_to_csv(rows, filename="papers_metadata.csv"):
    fieldnames = ["id", "semester", "subject", "paper_title", "pdf_url"]
    with open(filename, "w", newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
    print(f"[+] Saved metadata to {filename}")

def main():
    rows = scrape_metadata()
    save_to_csv(rows)

if __name__ == "__main__":
    main()
