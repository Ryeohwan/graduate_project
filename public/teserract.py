import pytesseract
from PIL import Image

# pytesseract.pytesseract.tesseract_cmd = R'C:\Program Files\Tesseract-OCR\tesseract'
str = pytesseract.image_to_string(Image.open('C:/Users/ahnrh/OneDrive/바탕 화면/graduate_project/public/image/paper.png'), lang='kor')
print(str)

# I have to