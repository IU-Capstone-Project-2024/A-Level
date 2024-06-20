import os
import pandas as pd
from string import punctuation
from sklearn.preprocessing import LabelEncoder


class DatasetReader:
    def __init__(self, encode_labels=False):
        self.encode_labels = encode_labels

    def read(self, *filenames) -> pd.DataFrame:
        data = [self.read_file(filename) for filename in filenames]
        return pd.concat(data, ignore_index=True)

    def read_file(self, filename) -> pd.DataFrame:
        data = pd.read_csv(filename)
        data = data[data['Topic'] != 'Unit2'][['Questions', 'Topic']]

        data['Questions'] = data['Questions'].map(str.lower)

        if self.encode_labels:
            data['Topic'] = data['Topic'].map(lambda x: '_'.join(x.split()))
            data['Topic'] = LabelEncoder().fit_transform(data['Topic'])

        return data

    def read_from_dir(self, string):
        raise NotImplemented()


if __name__ == '__main__':
    data1 = DatasetReader(encode_labels=True).read('../../data/csv/clean_data.csv')
    data2 = DatasetReader().read('../../data/csv/clean_data.csv')
    data3 = DatasetReader(encode_labels=True).read_file('../../data/csv/clean_data.csv')

    print(data1[:4], end='\n\n')
    print(data2[:4], end='\n\n')
    print(data3[:4], end='\n\n')
