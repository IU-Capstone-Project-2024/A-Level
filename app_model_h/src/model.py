import torch
import torch.nn as nn
from src.kan import KANLinear
from transformers import RobertaTokenizerFast, RobertaModel


class Model(nn.Module):
    def __init__(self, pretrained_name='distilroberta-base'):
        super(Model, self).__init__()

        self.tokenizer = RobertaTokenizerFast.from_pretrained(pretrained_name)
        self.model = RobertaModel.from_pretrained(pretrained_name)

        self.embedding_size = self.model.embeddings.word_embeddings.embedding_dim

        self.fc = nn.Sequential(
            KANLinear(in_features=self.embedding_size * 2, out_features=self.embedding_size),
            KANLinear(in_features=self.embedding_size, out_features=self.embedding_size),
            KANLinear(in_features=self.embedding_size, out_features=self.embedding_size // 2),
            KANLinear(in_features=self.embedding_size // 2, out_features=5),
        )

    def forward(self, x: list[str]):
        encoded_batch = self.tokenizer(x, padding=True, truncation=True, return_tensors='pt')
        encoded_batch.to(self.model.device)

        out = self.model(**encoded_batch).last_hidden_state

        out = torch.concatenate([out[:, 0, :], out[:, -1, :]], dim=1)

        out = self.fc(out)

        del encoded_batch
        return out
