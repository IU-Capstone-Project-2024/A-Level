import pymupdf
import re


class Parser(object):
    def __init__(self):
        self.search_regex = r'\([a-z]\)(.+?)\([0-9]+\)'
        self.search_pattern = re.compile(self.search_regex)

        self.clean_regex = r'\([a-z]\)'
        self.clean_pattern = re.compile(self.clean_regex)

        self.dot_fixer_regex = r' \.'
        self.dot_fixer_pattern = re.compile(self.dot_fixer_regex)

    def __process_content(self, page):
        return page.replace('\n', '\\n').replace('\t', '\\t')

    def __process_questions(self, text):
        text = text.strip().replace('\\n', ' ').replace('\\t', ' ')
        text = self.clean_pattern.sub('', text)

        text = self.dot_fixer_pattern.sub('.', text)

        return ' '.join(text.split())

    def parse_questions(self, filepath: str) -> list[str]:
        file = pymupdf.open(filepath)

        file_content = ''.join(page.get_text() for page in file)
        match = self.search_pattern.findall(self.__process_content(file_content))

        return list(map(self.__process_questions, match))

    def __call__(self, filepath: str) -> list[str]:
        return self.parse_questions(filepath)


if __name__ == '__main__':
    import os

    path = '../data/pdf'

    for filename in os.listdir(path):
        if not filename.endswith('.pdf'):
            continue

        filepath = f'{path}/{filename}'
        parser = Parser()

        questions = parser(filepath)
        print(filename, len(questions), end='\n' + '-' * 40 + '\n')

        for i, question in enumerate(questions, 1):
            print(f'Question {i}:', question, sep='\n', end='\n\n')

        print('=' * 100)
