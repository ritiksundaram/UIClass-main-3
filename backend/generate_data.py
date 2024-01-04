import json
import schedule
import time
import random

#List of the indexes for the gym
LOCATIONS = ["floor1-cardio","floor2-weights"]

def create_data_point(current_data):
    
    #Takes in the current data and updates it with a new value
    #Can change logic, will get the last value and return a random value near it
    last_point = current_data[len(current_data)-1]
    
    #Gets between 20% more or less
    new_point = int(last_point + (last_point * random.uniform(-0.2, 0.2)))
    
    return current_data.append(new_point)
    
#DONT NEED TO GENERATE DATA
#IGNORE
# def generate_data():
#     data = {}
#     with open('./data.json', 'r') as data_file:
#         data = json.load(data_file)
    
#     #Go through the locations and get the array associated with it, updating it
#     for loc in LOCATIONS:
#         #ADD CODE FOR IF LOC DOESN'T EXIST
        
#         #Gets the current info from the gym
#         current_data = data[loc]
        
#         #Adds new info to the location
#         new_data = create_data_point(current_data)
        
#         #Update data
#         data[loc] = new_data
        
        
    
#     with open('./data.json', 'w') as data_file:
#         json.dump(data, data_file)

# generate_data()

# schedule.every(5).minutes.do(generate_data)

while True:
    schedule.run_pending()
    time.sleep(1)
