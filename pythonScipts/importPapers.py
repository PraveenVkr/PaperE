#!/usr/bin/env python3
"""
Script to import papers CSV data into MySQL database.
Handles semester expansion (e.g., 'sem 6-8' becomes separate rows for 6, 7, 8).
"""

from mysql.connector import Error
import re
import sys
import pandas as pd
import mysql.connector

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'papers_db',
    'user': 'papers_user',
    'password': 'paperspass123',
    'port': 3306
}

def extract_semester_numbers(semester_str):
    """Extract semester numbers from strings like 'sem 6-8', 'sem 3', etc."""
    if pd.isna(semester_str) or semester_str == 'unknown':
        return []
    
    # Remove 'sem' and clean up
    clean_str = str(semester_str).replace('sem', '').strip()
    
    # Handle ranges like "6-8"
    if '-' in clean_str:
        parts = clean_str.split('-')
        if len(parts) == 2:
            try:
                start = int(parts[0].strip())
                end = int(parts[1].strip())
                return list(range(start, end + 1))
            except ValueError:
                return []
    else:
        # Handle single numbers
        try:
            return [int(clean_str)]
        except ValueError:
            return []

def expand_semester_data(df):
    """Expand rows with semester ranges into individual semester rows"""
    expanded_rows = []
    
    for _, row in df.iterrows():
        semester_numbers = extract_semester_numbers(row['semester'])
        
        if semester_numbers:
            # Create a row for each semester number
            for sem_num in semester_numbers:
                new_row = row.copy()
                new_row['semester_number'] = sem_num
                new_row['original_semester'] = row['semester']
                expanded_rows.append(new_row)
        else:
            # If we can't parse semester, skip this row or handle it
            print(f"Warning: Could not parse semester '{row['semester']}' for ID {row['id']}")
            continue
    
    return pd.DataFrame(expanded_rows)

def clean_data(df):
    """Clean and validate the dataframe"""
    # Remove any HTML entities from URLs
    df['pdf_url'] = df['pdf_url'].str.replace('&amp;', '&')
    
    # Clean up subject names
    df['subject'] = df['subject'].str.strip()
    df['paper_title'] = df['paper_title'].str.strip()
    
    # Remove duplicates based on semester_number, subject, and pdf_url
    df_cleaned = df.drop_duplicates(subset=['semester_number', 'subject', 'pdf_url'])
    
    return df_cleaned

def connect_to_database():
    """Create database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            print("Successfully connected to MySQL database")
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def insert_data(connection, df):
    """Insert dataframe data into MySQL table"""
    cursor = connection.cursor()
    
    # Prepare INSERT statement
    insert_query = """
    INSERT INTO papers (original_id, semester, subject, paper_title, pdf_url)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    # Convert dataframe to list of tuples
    data_tuples = []
    for _, row in df.iterrows():
        data_tuples.append((
            int(row['id']),  # original_id
            int(row['semester_number']),  # semester
            row['subject'],
            row['paper_title'],
            row['pdf_url']
        ))
    
    try:
        # Execute batch insert
        cursor.executemany(insert_query, data_tuples)
        connection.commit()
        print(f"Successfully inserted {cursor.rowcount} records")
        
        # Get some statistics
        cursor.execute("SELECT COUNT(*) FROM papers")
        total_count = cursor.fetchone()[0]
        print(f"Total records in database: {total_count}")
        
        cursor.execute("SELECT semester, COUNT(*) FROM papers GROUP BY semester ORDER BY semester")
        semester_counts = cursor.fetchall()
        print("\nRecords per semester:")
        for sem, count in semester_counts:
            print(f"  Semester {sem}: {count} papers")
            
    except Error as e:
        print(f"Error inserting data: {e}")
        connection.rollback()
    finally:
        cursor.close()

def main():
    # Check if CSV file is provided
    if len(sys.argv) != 2:
        print("Usage: python import_papers.py <csv_file_path>")
        print("Example: python import_papers.py papers_metadata.csv")
        sys.exit(1)
    
    csv_file_path = sys.argv[1]
    
    try:
        # Read CSV file
        print(f"Reading CSV file: {csv_file_path}")
        df = pd.read_csv(csv_file_path)
        print(f"Loaded {len(df)} rows from CSV")
        
        # Expand semester data
        print("Expanding semester ranges...")
        expanded_df = expand_semester_data(df)
        print(f"Expanded to {len(expanded_df)} rows")
        
        # Clean data
        print("Cleaning data...")
        cleaned_df = clean_data(expanded_df)
        print(f"After cleaning: {len(cleaned_df)} rows")
        
        # Connect to database
        connection = connect_to_database()
        if not connection:
            sys.exit(1)
        
        # Insert data
        print("Inserting data into database...")
        insert_data(connection, cleaned_df)
        
        print("Data import completed successfully!")
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
            print("Database connection closed")

if __name__ == "__main__":
    main()
