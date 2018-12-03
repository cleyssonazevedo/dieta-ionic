# dieta-ionic
Criação de aplicação para a *Faculdade Sumaré* para conclusão do 5º semestre.
Ele está rodando com versão mínima de SDK 19 que é a versão Android 4.4

## Como Rodar
1. Esse projeto necessita das seguintes dependências:
    * Node,
    * NPM,
    * Java 8,
    * Android Studio com SDK

2. Com todas as dependências e variáveis de ambiente, rode os comandos dentro da pasta do projeto:
    * npm install -g ionic cordova
    * npm install

3. Depois disso, você pode rodar atráves do navegador ou do modo desenvolvedor, para rodar no navegador use o comando:
``` ionic serve ``` ou ```npm start```
ou use o comando 
```ionic cordova run android``` ou ```npm run start:android```

4. Para criar um APK, rode o comando
```ionic cordova build android```
ou
```npm run build```

No final, ele irá gerar e mostrar o caminho do APK, lembrando que este não é o de PROD, pois precisa de chave da loja Android.