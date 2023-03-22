## Electroware (Atualmente em desenvolvimento)
Electroware é um projeto pessoal baseado em um marketplace, criado com Javascript (no backend), ReactJS, Typescript e Node (Express) + MongoDB. Também utilizei UML para tentar estruturar a relação entre dados e objetos o máximo possível.
Provavelmente é o projeto que mais venho me dedicando. Nele, tentei reunir recursos comuns os quais um e-commerce possui: criação de contas, anúncios de produtos, histórico de compras, lista de desejos, carrinhos de compras, etc.

### Observações
- Tanto a API quanto a interface estão inclusas nesse repositório.
- Backend decidi desenvolver em Javascript pois a API foi a primeira de larga escala (por assim dizer) que fiz. Pretendo passar para Typescript o quanto antes.
- Creio que devido a sua complexidade, esse projeto irá se tornar bem interessante para refatorar, portanto, pretendo manter e atualiza-lo de acordo com a experiência que eu obter no futuro.


### Fotos do Projeto



## Como Testar (NodeJS necessário)
1 - Clone o repositório:
``` git clone https://github.com/luc-silva/electroware ```

2 - Vá para o diretório o qual o repositório foi baixado

3 - Baixe as dependências do repositório, server e client
``` 
cd electroware
npm install
cd server
npm install
cd ..
cd client
npm install
```

4 - Volte para a raiz do repositório (electroware/)
```
cd ..
```

5 - Inicie o servidor
```
npm run server
```

6 - Abra um novo terminal e inicie o client
```
npm run client
```

Após os passos, o website deve abrir em seu navegador padrão. Dúvidas, entre em contato através do [LinkedIn](https://linkedin.com/in/silva-luc)

## Planos
- Passar o backend para typescript
- Refatorar o código fonte
- Hospedar o servidor e client do pŕojeto

### Créditos:
- [CSS Reset](https://meyerweb.com/eric/tools/css/reset/)
- [Valorax Font (Fonte usada no logo)](https://befonts.com/valorax-font.html)
