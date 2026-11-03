/*
 * Copyright 2026 codingsh <codingsh@pm.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Ponto de entrada do projeto final.
 * Este arquivo deve ser revisado por você linha por linha.
 */

const express = require('express');
const app = express();
app.use(express.json());

// Rotas e lógica vão aqui — revise cada uma

module.exports = app;

// Só inicia o servidor quando executado diretamente (não durante testes)
if (require.main === module) {
  const PORTA = process.env.PORTA || 3000;
  app.listen(PORTA, () => {
    console.log(`Projeto final rodando em http://localhost:${PORTA}`);
  });
}
