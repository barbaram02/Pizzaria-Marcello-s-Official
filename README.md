# 🍕 Pizzaria Marcello’s Official

O **Pizzaria Marcello’s Official** é um sistema interno desenvolvido para otimizar o atendimento e o controle de pedidos dentro da pizzaria.
A aplicação disponibiliza um **dashboard completo**, permitindo que os funcionários visualizem todos os pedidos abertos em tempo real, com **detalhamento de mesa, quantidade de itens e total de cada pedido**.
Além disso, o sistema oferece funcionalidades administrativas, como **criação de novas categorias de produtos** e **cadastro de novos itens**, facilitando a gestão do cardápio diretamente pelo dashboard.

A aplicação está **deployada no Vercel**, garantindo acesso rápido e confiável, e utiliza a **Neon como banco de dados na nuvem**, em conjunto com **PostgreSQL**, para gerenciamento seguro e escalável dos dados.


---

## 🌐 Deploy  
Acesse a aplicação online no Vercel:  
[**Pizzaria Marcello’s Official**](https://pizzaria-marcello-s-official-front.vercel.app/)

---

## 🚀 Funcionalidades principais

* Abertura e fechamento de mesas
* Adição e remoção de pedidos
* Visualização em tempo real dos pedidos da cozinha
* Autenticação segura com JWT
* Separação entre áreas: atendimento e cozinha
* Dashboard dinâmico e intuitivo

---

## 🧰 Tecnologias utilizadas

### **Backend**

* Node.js
* Express
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT para autenticação
* Dotenv para variáveis de ambiente

### **Frontend**

* Next.js
* React
* TypeScript
* SCSS / CSS Modules
* Axios para consumo da API

---

## ⚙️ Estrutura do projeto

```
Pizzaria-Marcello-s-Official/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── next.config.js
└── README.md
```

---

## 🧩 Como executar o projeto localmente

### **1. Clonar o repositório**

```bash
git clone https://github.com/barbaram02/Pizzaria-Marcello-s-Official.git
cd Pizzaria-Marcello-s-Official
```

### **2. Configurar o Backend**

```bash
cd backend
# Usando npm
npm install

# Ou com Yarn
yarn install
```

Crie um arquivo `.env` na raiz do backend com as variáveis necessárias:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pizzaria"
JWT_SECRET="seu_token_secreto"
PORT=8000
```

Inicie o servidor:

```bash
# Com npm
npm run dev

# Ou com Yarn
yarn dev
```

O backend estará disponível em:
👉 **[http://localhost:8000](http://localhost:8000)**

---

### **3. Configurar o Frontend**

```bash
cd ../frontend
# Usando npm
npm install

# Ou com Yarn
yarn install
```

Crie um arquivo `.env.local` na raiz do frontend (ajuste conforme necessário):

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Inicie o frontend:

```bash
# Com npm
npm run dev

# Ou com Yarn
yarn dev
```

Acesse no navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔒 Autenticação

O projeto utiliza **JWT (JSON Web Token)** para autenticação segura.
Após o login, o token é retornado e armazenado localmente pelo cliente para autorizar futuras requisições.

---

## 👩‍💻 Desenvolvido por

**Bárbara Marcello**
📧 [github.com/barbaram02](https://github.com/barbaram02)

---

## 🪪 Licença

Este projeto está sob a licença **MIT**<br>
Uso permitido apenas como exemplo para estudo;
