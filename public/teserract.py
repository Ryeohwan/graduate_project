import pytesseract
import wrongs as wr
from PIL import Image

# pytesseract.pytesseract.tesseract_cmd = R'C:\Program Files\Tesseract-OCR\tesseract'
str = pytesseract.image_to_string(Image.open('C:/Users/ahnrh/OneDrive/바탕 화면/graduate_project/public/image/paper.jpg'), lang='kor')

list_a = [i.replace(' ','') for i in str]
list_b = []
wrong_text_list = ['_','|','(',')','[',']','@','$','^','\\','/','※','*','′',',','%','~','>','<','、','-','=','.','…','”','"']
for i in range(len(list_a)):
    if list_a[i] != '':
        if list_a[i] not in wrong_text_list:
            list_b.append(list_a[i])
check = ''
for i in range(len(list_b)):
    check += list_b[i]

final_list = check.split()

order_num = ''
card_num = ''

for i in range(len(final_list)):
    if '주문번호' in final_list[i]:
        order_num = final_list[i]
    elif '카드번호' in final_list[i]:
        card_num = final_list[i]
if order_num == '' and card_num == '':
    for i in range(len(final_list)):
        if final_list[i] in wr.order_wrong:
            order = final_list[i]
        elif final_list[i] in wr.card_wrong:
            card_num = final_list[i]



if order_num == '' and card_num == '':
    print('reupload')
else:
    print(final_list)
    print(f'{order_num}\n{card_num}')


# success to extract words