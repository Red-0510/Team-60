# Team-60 - Introduction


This project aims to enable visually-impaired individuals to know the contents being shared via screen-sharing during online meetings or presentations. Usually, they are unable to know the contents and hence miss out on vital information being shared. Our project fixes this issue by enabling the users to capture screen contents by using appropriate technology (i.e., image-to-text and text-to-speech conversion). Upon clicking a combination of keys, the user can hear the contents being presented on the screen and hence be included in a holistic manner. 

# How you can implement it on your own PC

In order for this project to work on a local PC, a few changes need to be made to the code. These changes are listed below:

  1. Install all the mentioned libraries using the command 'pip install <name of the library>'.
  2. Install the Tesseract ORC exec file and update its path on your local drive in the source code.
  3. This program was originally designed for Zoom meetings. However, it can be used to capture contents from any active window.
  4. On line 33, paste the path from your local drive in the source code.
