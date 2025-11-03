# 🍕 Pizzaria Marcello’s Official

O **Pizzaria Marcello’s Official** é um sistema interno desenvolvido para otimizar o atendimento e o controle de pedidos dentro da pizzaria.
O sistema permite que os **funcionários abram mesas, adicionem e fechem pedidos**, enquanto o **pessoal da cozinha** acompanha em tempo real um **dashboard com todas as mesas e os respectivos pedidos**.

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
* Prisma ORM (caso esteja sendo usado)
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
npm install
```

Crie um arquivo `.env` na raiz do backend com as variáveis necessárias:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pizzaria"
JWT_SECRET="seu_token_secreto"
PORT=3333
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em:
👉 **[http://localhost:3333](http://localhost:3333)**

---

### **3. Configurar o Frontend**

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env.local` na raiz do frontend (ajuste conforme necessário):

```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Inicie o frontend:

```bash
npm run dev
```

Acesse no navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Testes

*(Opcional — adicionar quando houver testes implementados)*
Para executar os testes automatizados:

```bash
npm test
```

---

## 📦 Deploy

* O backend pode ser hospedado em plataformas como **Render**, **Railway** ou **Heroku**.
* O frontend pode ser implantado em **Vercel**, **Netlify** ou outro provedor de hospedagem.

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

Este projeto está sob a licença **MIT**.
Sinta-se à vontade para usar, modificar e contribuir!
