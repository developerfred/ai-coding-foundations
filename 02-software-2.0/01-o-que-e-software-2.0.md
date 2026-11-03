# O que é Software 2.0?

Software 1.0 = você escreve regras explícitas (if/else, funções).  
Software 2.0 = você reúne dados e deixa o gradient descent (ou um LLM) escrever o programa para você.

Andrej Karpathy resume: **"Gradient descent can write code better than you"**.

## Diferença principal

| Software 1.0 | Software 2.0 |
|--------------|--------------|
| Humanos escrevem lógica | Humanos curam dados e prompts |
| Regras explícitas | Pesos de rede neural / pesos do modelo |
| Depurável linha a linha | Caixa preta (embora interpretável em partes) |
| Compilado/interpretado | Treinado/fine-tunado |

## Por que LLMs geram código útil

LLMs são treinados em bilhões de linhas de código público. Eles aprendem padrões, sintaxe e convenções. Isso não significa que "entendem" o código — significa que predizem o próximo token com base em estatísticas.

> **Limitação**: um LLM pode gerar código que parece correto mas tem bugs sutis, falhas de segurança ou dependências inexistentes. Cabe a você revisar.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
