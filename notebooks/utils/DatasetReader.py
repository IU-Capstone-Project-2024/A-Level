import os
import pandas as pd
from string import punctuation
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


class DatasetReader:
    def __init__(self, encode_labels=False, test_size=None):
        self.encode_labels = encode_labels
        self.test_size = test_size

    def read(self, *filenames) -> pd.DataFrame:
        data = [self._read_file(filename) for filename in filenames]
        data = pd.concat(data, ignore_index=True)

        if self.test_size is not None:
            return train_test_split(data, train_size=self.test_size)

        return data

    def read_file(self, filename) -> pd.DataFrame:
        data = self._read_file(filename)
        if self.test_size is not None:
            return train_test_split(data, train_size=self.test_size)

        return data

    def _read_file(self, filename) -> pd.DataFrame:
        data = pd.read_csv(filename)
        data = data[data['Topic'] != 'Unit2'][['Questions', 'Topic']]

        data['Questions'] = data['Questions'].map(str.lower)

        if self.encode_labels:
            data['Topic'] = data['Topic'].map(lambda x: '_'.join(x.split()))
            data['Topic'] = LabelEncoder().fit_transform(data['Topic'])

        return data

    def read_dir(self, dir_name):
        csv_files = []
        for path, subdirs, files in os.walk(dir_name):
            for file in files:
                if file.endswith('.csv'):
                    csv_files.append(os.path.join(path, file))

        return self.read(*csv_files)


if __name__ == '__main__':
    reader = DatasetReader(encode_labels=True)
    print(reader.read_dir('../../data').describe())

