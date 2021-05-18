toChat
============

Um chat P2P em tempo real usando Clean architecture Node, Gun e React

---

## Mockup do projeto e camadas da aplicação
Link do projeto no figma, com os os protótipos das telas e a estrutura das camadas da arquitetura da aplicação.

https://www.figma.com/file/fiLFlPr8zpJRF6NGXvmeLl/toChat?node-id=0%3A1

---

## Buildando o ambiente de dev
Para buildar a aplicação, você precisa entar na pasta raiz do projeto e rodar:

```bash
sudo make dev-build
```
OBS: Esse comando além de buildar, inicia a aplicação

## Levantando a aplicação após build
Para rodar a aplicação, você precisa entar na pasta raiz do projeto e rodar:

```bash
sudo make dev-up
```

Após rodar o build do docker, a aplicação estará rodando em:

Backend: http://localhost:3333

Frontend: http://localhost:3000

---

## Testes
rodar nas pastas: ./front-end e ./back-end

```bash
// Coletar coverage
yarn test:ci

// Rodar os testes alterados
yarn test:watch
```

---

### Todo
- [ ] 100% de cobertura backend
- [ ] 100% de cobertura frontend
- [ ] Adicionar logout
- [ ] Melhorar a adaptação do Gun
