import os
import pandas as pd
from string import punctuation


class DatasetReader:
    def __init__(self):
        pass

    def read_from_file(self, filename):
        data = pd.read_csv(filename)
        data = data[data['Topic'] != 'Unit2'][['Questions', 'Topic']]

        data['Topic'] = data['Topic'].map(lambda x: '_'.join(x.split()))
        data['Questions'] = data['Questions'].map(str.lower)
        return data

    def read_from_dir(self, string):
        pass

if __name__ == '__main__':
    data = DatasetReader().read_from_file('../../data/csv/clean_data.csv')
    print(data)
