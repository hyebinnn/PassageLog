# import ssl

# ssl._create_default_https_context = ssl._create_unverified_context

# import easyocr

# reader = easyocr.Reader(['ch_sim', 'en'])
# result = reader.readtext('Passage.png', detail=0)

# print(result)

import pytesseract
import cv2
import os

def OCR(img_name):
    config = ('-l kor+eng --oem 3 --psm 6')

    path = '/Users/xxizo89/Downloads/'
    os.chdir(path)
    img_path = img_name

    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    gray = cv2.medianBlur(gray, 3)
    raw_text = pytesseract.image_to_string(gray, config=config) 

    # print(raw_text) 

    return raw_text