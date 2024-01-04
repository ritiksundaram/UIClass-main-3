import csv
import json

csv_file_path = './TestCSV2.csv'
json_file_path = 'output_json_file.json'

with open(csv_file_path, 'r') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            print(row[''])