import os
from flask import Flask, request
from flask_cors import CORS, cross_origin
import dill as pickle
import cv2
import mediapipe as mp
import numpy as np
# threshold=0
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

cap = cv2.VideoCapture(0)
app1 = Flask(__name__)

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
            print("Looking Left")
            return "Looking Left"
        elif nose_x+threshold > right_ear_x:
            # print("nose:",nose,"Left",left_ear,"right",right_ear)
            print("Looking Right")
            return "Looking Right"


        else:
            # print(nose,left_ear,right_ear)
            print("Looking Straight")
            return "Looking Straight"

    return "No Face Detected"
@app1.route("/test")
def func():
    att = []
    for i in os.listdir('images'):
        att.append(get_head_pose(f'images/{i}'))
    return att

if __name__ == "__main__":
    app1.run(debug=True, port=8000, host="0.0.0.0")
# with open('function.pkl', 'wb') as file:
    # Serialize the function
ser = pickle.dumps(get_head_pose)# for i in os.listdir('frames'):
# print(get_head_pose(''))
# print(get_head_pose('t2.jpg'))
# while cap.isOpened():
#     success, image = cap.read()
#     if not success:
#         print("Ignoring empty camera frame.")
#         continue
#
#     image = cv2.flip(image, 1)
#
#
#     head_pose = get_head_pose(image)
#
#
#     if head_pose != "Looking Straight":
#         cv2.putText(image, "Attention Missing!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
#
#     cv2.putText(image, f"Head Pose: {head_pose}", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#
#     cv2.imshow('MediaPipe Face Mesh', image)
#     if cv2.waitKey(5) & 0xFF == 27:
#         break
#
# cap.release()
# cv2.destroyAllWindows()