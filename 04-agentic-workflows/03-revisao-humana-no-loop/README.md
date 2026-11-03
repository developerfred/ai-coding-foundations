# Revisão Humana no Loop

O humano é o responsável final pelo código. O agente é um assistente, não o autor legal.

## Por que a revisão humana é obrigatória

1. **Responsabilidade:** você responde pelo que é entregue.
2. **Segurança:** a IA pode gerar código vulnerável.
3. **Qualidade:** a IA gera código funcional, mas nem sempre elegante ou mantível.
4. **Contexto:** a IA não conhece as regras de negócio da sua empresa.

## Checklist de revisão humana

### Segurança
- [ ] Não há senhas, tokens ou chaves hardcoded.
- [ ] Não há SQL injection (uso de parâmetros preparados).
- [ ] Não há execução de comandos shell sem validação.
- [ ] Entradas do usuário são validadas e sanitizadas.

### Qualidade
- [ ] O código tem comentários explicando decisões importantes.
- [ ] Funções têm nomes descritivos.
- [ ] Não há código duplicado desnecessário.
- [ ] Tratamento de erro está presente.

### Testes
- [ ] Existem testes unitários para os casos principais.
- [ ] Testes cobrem casos de erro e borda.
- [ ] Os testes passam.

### Entendimento
- [ ] Eu consigo explicar o que cada arquivo faz.
- [ ] Eu consigo explicar por que cada decisão foi tomada.
- [ ] Se a IA fosse embora amanhã, eu manteria este código.

---

## O que fazer se encontrar um problema

1. Não corrija silenciosamente.
2. Peça para o agente corrigir (ou corrija você mesmo).
3. Adicione um teste que evite que o problema volte.
4. Documente o problema e a correção no commit.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
