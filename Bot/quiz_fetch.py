import requests
url = "https://jsonplaceholder.typicode.com/posts/1"

def get_Quiz_byID(id, url):
  payload = {"id": id}
  response = requests.get(url, params=payload)      
  response_json = response.json()    
  return response_json
def get_random_questions(url):
  response = requests.get(url)      
  response_json = response.json()    
  return response_json

def add_question(url, question):
  response = requests.post(url, question)
  return response.status_code
def add_quiz():
  pass