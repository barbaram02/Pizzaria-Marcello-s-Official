- O layout.tsx define o que é fixo/reutilizado (header, sidebar, footer, etc).

- O page.tsx (ou page.tsx dentro de subpastas) define o que é variável naquela rota.

- O Next pega automaticamente o que está no page.tsx e injeta dentro do {children} do layout.tsx.


--- Sobre o Prisma: 
ORM = Object-Relational Mapping

Em português: Mapeamento Objeto-Relacional.

É uma camada que conecta seu código (objetos, classes) ao banco de dados relacional (como PostgreSQL, MySQL, SQL Server), sem precisar escrever muito SQL manualmente.