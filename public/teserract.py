import pytesseract
from PIL import Image

# pytesseract.pytesseract.tesseract_cmd = R'C:\Program Files\Tesseract-OCR\tesseract'
str = pytesseract.image_to_string(Image.open('C:/Users/ahnrh/OneDrive/바탕 화면/graduate_project/public/image/paper.jpg'), lang='kor')

list_a = [i.replace(' ','') for i in str]
list_b = []
wrong_list = ['_','|','(',')','[',']','@','$','^','\\','/','※','*','′',',','%','~','>','<','、','-','=','.','…','”']
for i in range(len(list_a)):
    if list_a[i] != '':
        if list_a[i] not in wrong_list:
            list_b.append(list_a[i])
check = ''
for i in range(len(list_b)):
    check += list_b[i]

final_list = check.split()
print(final_list)
# success to extract words