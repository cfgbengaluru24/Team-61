# import extract_frames from splitter
# from frame_extraction import split_image
# from attention import get_head_pose
# from labeler import scan
import cv2
import os
import json
# from datetime import *
from PIL import Image
import numpy as np
import os
import subprocess

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import dill as pickle
import cv2
import mediapipe as mp
import numpy as np
import easyocr
reader = easyocr.Reader(['en'])

threshold=0
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
app = Flask(__name__)

def extract_frames(video_path, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the video file
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    # Get the frame rate of the video
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Calculate the interval in frames (assuming 1 frame per second)
    interval = int(fps)

    frame_count = 0
    saved_frame_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if frame_count % interval == 0:
            frame_name = os.path.join(output_folder, f"frame_{saved_frame_count:04d}.jpg")
            cv2.imwrite(frame_name, frame)
            saved_frame_count += 1

        frame_count += 1

    cap.release()
    print(f"Extracted {saved_frame_count} frames to '{output_folder}'")




def split_image(image_path, output_prefix):
    # Open the image
    img = Image.open(image_path)

    # Convert image to numpy array
    img_array = np.array(img)

    # Get image dimensions
    height, width, _ = img_array.shape

    # Define the grid (3x3 in this case)
    rows, cols = 2, 3

    # Calculate the height and width of each cell
    cell_height = height // rows
    cell_width = width // cols

    # Split the image into cells
    for i in range(rows):
        for j in range(cols):
            # Calculate the boundaries of the current cell
            top = i * cell_height
            bottom = (i + 1) * cell_height
            left = j * cell_width
            right = (j + 1) * cell_width

            # Extract the cell
            cell = img_array[top:bottom, left:right]

            # Convert back to image and save
            cell_img = Image.fromarray(cell)
            cell_img.save(f"output/{output_prefix}_{i}_{j}.png")


def get_head_pose(image):
    image = cv2.imread(image)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image_rgb)

    if results.multi_face_landmarks:
        face_landmarks = results.multi_face_landmarks[0]

        nose = face_landmarks.landmark[1]
        left_ear = face_landmarks.landmark[234]
        right_ear = face_landmarks.landmark[454]


        nose_x = nose.x
        left_ear_x = left_ear.x
        right_ear_x = right_ear.x

        # Determine head position
        if nose_x +threshold< left_ear_x:
            # print(nose,left_ear,right_ear)
            # print("Looking Left")
            return 0
        elif nose_x+threshold > right_ear_x:
            # print("nose:",nose,"Left",left_ear,"right",right_ear)
            # print("Looking Right")
            return 0


        else:
            # print(nose,left_ear,right_ear)
            # print("Looking Straight")
            return 1

    return 0


def scan(image_path):
  # for i in path:
  #   image_path = f
    results = reader.readtext(image_path)

# Extract and print the text
    for result in results:
      return result[1]
# extract_frames(r"C:\Users\spars\Downloads\video1646573752.mp4",'frames')
def func():
  extract_frames(r"C:\Users\spars\Downloads\video1646573752.mp4", 'frames')
  logs = {}
  output = []
  for i in os.listdir('frames'):
    print(logs)

    split_image(f'frames/{i}','out')

    for j in os.listdir('output'):
       im = f'output/{j}'
       if scan(im) not in logs.keys():
           logs[str(scan(im))] = 1
       else:
           logs[str(scan(im))] += get_head_pose(im)
       with open('output.txt','w') as file:
           # output.append(logs)
           file.write(str(logs))

@app.route("/test")

# result = subprocess.run(['ls', '-l'], capture_output=True, text=True)

# exec(python)
def final():
    func()
    return "The code is being processed, you can view the live output at /output route"
@app.route("/output")
def read():
    with open('output.txt', 'r') as file:
        obj = file.read()
        return jsonify(obj)


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
