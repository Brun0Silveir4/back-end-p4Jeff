# Backend - API para Monitoramento com Sensor DHT11


Este projeto é o **back-end** que fornece a API para o sistema de monitoramento ambiental, coletando e disponibilizando dados de **temperatura** e **umidade** do sensor **DHT11**. Utiliza Express para criar o servidor, Firebase Admin para conexão com o banco de dados e outras ferramentas para facilitar o desenvolvimento.


<br>

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express para criação do servidor HTTP
- Firebase Admin para integração com o Firestore (banco de dados)
- CORS para habilitar requisições cross-origin
- dotenv para variáveis de ambiente
- nodemon para desenvolvimento com recarga automática

<br>

## 🧩 Funcionalidades

- Endpoints REST para consulta dos dados coletados
- Integração com Firebase Firestore para armazenamento dos dados do sensor
- Configuração via variáveis de ambiente para maior segurança
- Suporte a requisições de front-ends externos via CORS
<br>

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/Brun0Silveir4/back-end-p4Jeff
cd back-end-p4Jeff
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e defina o nome do seu arquivo de configuração do firebase e coloque o seguinte item:
```bash
FIREBASE_KEY=nome_do_arquivo
```

### 4. Rode a aplicação
```bash
npm run dev
```

<br>

## 🙋‍♂️ Autor

Desenvolvido por Bruno Silveira. Contato:  
• [LinkedIn](https://www.linkedin.com/in/bruno-silveira-dionisio/)  
• [GitHub](https://github.com/Brun0Silveir4)  
• bruno.silveira.dionisio@gmail.com