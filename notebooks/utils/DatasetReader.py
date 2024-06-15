import os
import pandas as pd
from string import punctuation


class DatasetReader:
    def __init__(self):
        pass

    def read(self, *filenames) -> pd.DataFrame:
        data = [self.read_from_file(filename) for filename in filenames]
        return pd.concat(data, ignore_index=True)

    def read_from_file(self, filename) -> pd.DataFrame:
        data = pd.read_csv(filename)
        data = data[data['Topic'] != 'Unit2'][['Questions', 'Topic']]

        data['Topic'] = data['Topic'].map(lambda x: '_'.join(x.split()))
        data['Questions'] = data['Questions'].map(str.lower)
        return data

    def read_from_dir(self, string):
        raise NotImplemented()


if __name__ == '__main__':
    data = DatasetReader().read('../../data/csv/clean_data.csv',
                                '../../data/parsing/save_my_exams_data.csv')

    print(data)
