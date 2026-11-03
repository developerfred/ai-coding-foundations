# Exemplos Bom vs Ruim

Códigos gerados por IA comparados lado a lado: o que evitar e o que usar.

## Exemplo 1 — Consulta a banco de dados

### ❌ Ruim (gerado por IA, inseguro)

```javascript
async function buscarUsuario(id) {
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`;
  return await db.query(sql);
}
```

**Por que é ruim:** SQL Injection. O `id` é interpolado diretamente na query.

### ✅ Bom (revisado por humano)

```javascript
async function buscarUsuario(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('ID inválido');
  }
  const sql = 'SELECT * FROM usuarios WHERE id = $1';
  return await db.query(sql, [id]);
}
```

**Por que é bom:** parâmetro preparado ($1) previne SQL injection; validação de entrada.

---

## Exemplo 2 — Tratamento de erro

### ❌ Ruim

```javascript
async function processarPedido(pedido) {
  const resposta = await api.enviar(pedido);
  return resposta.dados;
}
```

**Por que é ruim:** sem try/catch. Se a API falhar, o erro sobe sem tratamento.

### ✅ Bom

```javascript
async function processarPedido(pedido) {
  try {
    const resposta = await api.enviar(pedido);
    return resposta.dados;
  } catch (erro) {
    console.error('Falha ao processar pedido:', erro.message);
    throw new Error('Nao foi possível processar o pedido');
  }
}
```

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
