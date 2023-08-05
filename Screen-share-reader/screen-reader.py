import cv2
import pytesseract
import pygetwindow as gw
import pyautogui
import numpy as np
import keyboard
import pyttsx3
import simpleaudio as sa
import sys
import datetime
import os

# Get the path of the current script
script_path = os.path.abspath(__file__)
script_dir = os.path.dirname(script_path)

# Construct relative file path
output_path = os.path.join(script_dir, "audio.wav")
filename = datetime.datetime.now()

# Convert to string in common format
timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
filename = os.path.join(script_dir, f"file/{timestamp}.txt")

# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'E:\Tesseract\tesseract.exe'

# Initialize the pyttsx3 engine
engine = pyttsx3.init()

# Variable to track if speech is paused
is_paused = False

# Variable to hold the play object
play_obj = None

def read_aloud(text):
    global play_obj
    if not is_paused:
        output_file=output_path

        engine.save_to_file(text, output_file)
        engine.runAndWait()

        # Load the audio file
        wave_obj = sa.WaveObject.from_wave_file(output_file)

        # Stop the playback if already playing
        if play_obj is not None:
            play_obj.stop()

        # Play the audio
        play_obj = wave_obj.play()
screenshot_size = 5
while True:
    # Check if the user pressed the specific key combination (e.g., alt + S) to take a screenshot
    if keyboard.is_pressed('alt') and keyboard.is_pressed('x'):
        # Capture the screen of the activated application
        # screenshot = pyautogui.screenshot()
        # frame = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)

        x, y = pyautogui.position()

        # Calculate screenshot region
        left = x-200
        top = max(0, y - 20)
        right = pyautogui.size().width
        bottom = min(pyautogui.size().height,y+70)

        # Capture screenshot
        screenshot = pyautogui.screenshot(region=(left, top, right - left, bottom - top))
        frame = cv2.cvtColor(np.array(screenshot), cv2.COLOR_RGB2BGR)
        # Convert the frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Use Tesseract to perform OCR on the image
        text = pytesseract.image_to_string(gray)

        # Read the text aloud
        read_aloud(text)

        # Display the image and recognized text
        cv2.imshow('Image', frame)
        print("Recognized Text: ", text)

        with open(filename, 'a') as file:
            # Write content to the file
            file.write(text)

    # Check if the user pressed the specific key (e.g., P) to pause or resume the audio
    if keyboard.is_pressed('p') or keyboard.is_pressed('P'):
        is_paused = not is_paused
        if is_paused:
            if play_obj is not None:
                play_obj.stop()

    # Break the loop if the Esc key is pressed
    if cv2.waitKey(1) == 27:  # 27 is the ASCII value of the Esc key
        # Close the window
        cv2.destroyAllWindows()
        # End the program immediately
        sys.exit()