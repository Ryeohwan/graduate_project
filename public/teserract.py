import pytesseract
from PIL import Image

# pytesseract.pytesseract.tesseract_cmd = R'C:\Program Files\Tesseract-OCR\tesseract'
str = pytesseract.image_to_string(Image.open('C:/Users/ahnrh/OneDrive/바탕 화면/graduate_project/public/image/paper.png'), lang='kor')

list_a = [i.replace(' ','') for i in str]
i = 0
for i in range(0,len(list_a)-1):
    if list_a[i] == '':
        list_a.remove('')
    elif list_a[i] == '\n':
        list_a.remove('\n')

print(list_a)