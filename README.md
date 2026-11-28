# Atualização — Filmes do Studio Ghibli

Aplicativo em React Native que mostra filmes do Studio Ghibli. Você pode marcar filmes como favoritos; eles ficam salvos no aparelho e continuam lá quando o aplicativo for aberto novamente.

## O que o aplicativo faz

- Busca e mostra filmes da API do Studio Ghibli.
- Permite adicionar e remover filmes dos favoritos.
- Tem uma tela de catálogo e outra de favoritos.
- Salva os favoritos localmente com AsyncStorage.

## Tecnologias

- JavaScript
- React Native 0.88
- Expo SDK 58
- Expo Router, para navegar entre as telas
- React Native Paper, para os componentes visuais
- AsyncStorage, para salvar os favoritos no aparelho
- [Studio Ghibli API](https://ghibliapi.dev/films/), para obter os filmes

## O que é necessário

- Node.js e npm
- Expo Go instalado no celular ou um emulador Android configurado
- Conexão com a internet para carregar os filmes

## Como instalar e executar

No terminal, entre na pasta do projeto e instale as dependências:

```bash
cd meu-app2
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Escaneie o QR code com o Expo Go. Para iniciar no emulador Android, pressione `a` no terminal do Expo.

Para abrir a versão web:

```bash
npm run web
```

## Organização das telas

- `App.js`: catálogo de filmes e ação de favoritar.
- `src/app/_layout.js`: configura o React Native Paper e a navegação.
- `src/app/favoritos.js`: tela que mostra e remove os favoritos.
