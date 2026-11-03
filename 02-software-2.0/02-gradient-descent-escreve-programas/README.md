# Gradient Descent Escreve Programas

No Software 2.0, o "código" são os parâmetros (pesos) de um modelo, ajustados por otimização (gradient descent) para minimizar uma função de perda (loss).

## Analogia com micrograd

No [micrograd](https://github.com/karpathy/micrograd) de Karpathy, você constrói uma rede neural pequena do zero, com backpropagation. O gradient descent ajusta os pesos para que a rede aprenda a classificar dados.

O mesmo princípio está por trás dos LLMs: o gradient descent (ou variantes como Adam) ajusta bilhões de parâmetros durante o treino para prever o próximo token.

## O que isso significa para você

O código gerado por IA é resultado de otimização estatística, não de raciocínio determinístico. Por isso:

- Pode funcionar na maioria dos casos, mas falhar em casos de borda.
- Pode conter vulnerabilidades de segurança.
- Pode usar APIs obsoletas ou inexistentes.

Sua função: **revisar, testar e assumir responsabilidade**.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
