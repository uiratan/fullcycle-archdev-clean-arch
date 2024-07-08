# fullcycle-archdev-clean-arch baseadp em fullcycle-archdev-ddd-tatical-patterns

# Agregados
- Customer => Address (VO)
- Order => OrderItem
- Product

# Tests

## Install
### Test runner (Jest)
```sh
npm i -D jest @types/jest ts-node --save-dev
```

### Transpiler (Vercel)
```sh
npm i -D @swc/jest @swc/cli @swc/core
```

## Initialize Jest
```sh
npx jest --init
```

## UUID
```sh
npm i -D uuid @types/uuid --save-dev
```

## Sequelize
```sh
npm install sequelize reflect-metadata sequelize-typescript
```

## SQLite
```sh
npm install sqlite3
```

## Express
```sh
npm i express @types/express dotenv
```

## Nodemon
```sh
npm i nodemon
```

## Supertest
```sh
npm i -D @types/supertest
```

# Desafio: Use cases para Product
Da mesma forma que fizemos a criação dos use cases realizando as operações: "create", "find", "list", "update" para "Customer", faça:

Crie as operações mencionadas acima para nossa entidade: "Product".
Implemente os testes de unidade e integração nos quatro use cases.

[Branch do desafio](https://github.com/uiratan/fullcycle-archdev-clean-arch/tree/product-usecase)

# Desafio: Endpoint para Products
Da mesma forma que fizemos a listagem dos nossos Customers em nossa API, repita o mesmo processo e realize a listagem de Products. Não deixe de realizar o teste automatizado end-to-end.

[Branch do desafio](https://github.com/uiratan/fullcycle-archdev-clean-arch/tree/api-product)