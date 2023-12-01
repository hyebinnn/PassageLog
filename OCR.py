import sys
import pytesseract
import cv2



def OCR(img_name):
    config = ('-l kor+eng --oem 3 --psm 6')

    path = './uploads/'
    img_path = path + img_name
    print(img_path)

    try:
        img = cv2.imread(img_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        gray = cv2.medianBlur(gray, 3)
        raw_text = pytesseract.image_to_string(gray, config=config) 
    
        return raw_text
    
    except Exception as e:
        sys.stderr.write(f"An error: {e} \n")
        return None

if __name__ == '__main__':
    res = OCR(sys.argv[1])
    if res:
        print(res)