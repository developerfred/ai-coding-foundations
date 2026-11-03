# Leitura de Código Gerado por IA

Aprenda a ler, entender e julgar o código que uma IA produz — antes de copiar e colar no seu projeto.

## Por que ler código gerado é diferente

Quando você escreve código, você conhece cada decisão. Quando a IA gera, você herda decisões que não tomou. Isso significa:

- Pode haver bugs sutis que não aparecem à primeira vista.
- Pode haver dependências desatualizadas ou inexistentes.
- Pode haver falhas de segurança (injeção, exposição de segredos, etc.).
- O código pode funcionar no exemplo da IA, mas falhar no seu contexto.

## Passo a passo para ler código gerado

1. **Leia do começo ao fim sem editar.** Não corrija nada ainda. Só entenda.
2. **Identifique entradas e saídas.** O que entra? O que sai? Quais efeitos colaterais?
3. **Pergunte: "Por que essa linha existe?"** Se você não consegue responder, marque para revisar.
4. **Busque por padrões perigosos:** `eval`, `innerHTML`, `shell_exec`, senhas hardcoded, `any` em TypeScript, etc.
5. **Rode os testes.** Se não houver testes, escreva um antes de usar.
6. **Execute em ambiente isolado.** Nunca rode código gerado diretamente em produção.

## Exemplo ruim vs exemplo bom

### ❌ Código gerado pela IA (problemas ocultos)

```javascript
// Gerado por IA: "função para salvar usuário no banco"
async function salvarUsuario(usuario) {
  const sql = `INSERT INTO usuarios (nome, email) VALUES ('${usuario.nome}', '${usuario.email}')`;
  const resultado = await db.query(sql);
  return resultado;
}
```

**Problemas:**
- **SQL Injection**: variáveis interpoladas diretamente na query.
- Sem validação de entrada (`usuario.nome` pode ser undefined).
- Sem tratamento de erro (`try/catch`).
- Sem retorno informativo em caso de falha.

### ✅ Código revisado por você

```javascript
async function salvarUsuario(usuario) {
  if (!usuario || !usuario.nome || !usuario.email) {
    throw new Error('Nome e email são obrigatórios');
  }

  try {
    const sql = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING id';
    const resultado = await db.query(sql, [usuario.nome, usuario.email]);
    return resultado.rows[0];
  } catch (erro) {
    console.error('Falha ao salvar usuario:', erro.message);
    throw erro;
  }
}
```

**O que mudou:**
- Uso de parâmetros ($1, $2) — prevenção de SQL injection.
- Validação de entrada antes de qualquer operação.
- `try/catch` para tratamento de erro.
- Retorno consistente (`resultado.rows[0]`).

---

## Checklist de revisão de código gerado

- [ ] Eu entendo o que cada linha faz?
- [ ] Há vulnerabilidades de segurança?
- [ ] As entradas são validadas?
- [ ] Há tratamento de erro?
- [ ] O código roda no meu ambiente?
- [ ] Existem testes?
- [ ] Consegui explicar isso para outro desenvolvedor?

> **Regra de ouro:** se você não consegue explicar o código, não o use.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
