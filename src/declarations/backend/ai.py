from openai import OpenAI
from flask import  Flask, jsonify, send_file
import requests
from io import BytesIO
from dotenv import  load_dotenv
import os

load_dotenv()

app = Flask()
API_KEY = os.getenv("APIKEY")

