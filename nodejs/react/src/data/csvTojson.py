import pandas as pd
import numpy as np
import datetime
import os

currentPath = os.getcwd()
filename = 'src/data/수성구_고기'

# csv파일 열기
fullname = os.path.join(currentPath , filename)

csvFile = pd.read_csv(fullname + '.csv')

for i in range(len(csvFile)):
    print(i)