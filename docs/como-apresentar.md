# Como apresentar o projeto

## Fluxo principal

1. O usuário acessa a loja PowerPlay.
2. O JavaScript chama a API REST usando `fetch`.
3. A API recebe a requisição no Controller.
4. O Controller chama o Service.
5. O Service usa o Repository.
6. O JPA consulta ou altera o MySQL.
7. A API devolve JSON.
8. O JavaScript atualiza a página.

## Exemplo

GET `/loja/api/v1/produtos`

```text
Navegador
   ↓ fetch()
ProdutoApiController
   ↓
ProdutoService
   ↓
ProdutoRepository
   ↓
MySQL
   ↑
JSON
```

## Tecnologias

HTML/CSS/JS = frontend
Java/Spring Boot = backend
REST/JSON = comunicação
JPA/Repository = persistência
MySQL = banco
Thymeleaf = tela administrativa
