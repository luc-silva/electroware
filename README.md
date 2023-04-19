# Electroware (Atualmente em desenvolvimento)

Electroware é um projeto pessoal baseado em um marketplace, criado com Javascript (no backend), ReactJS, Typescript e Node (Express) + MongoDB. Também utilizei UML para tentar estruturar a relação entre dados e objetos o máximo possível.

Backend foi implementado seguindo a arquitetura REST, utilizando uma biblioteca ODM (Mongoose) para realizar a interação no banco de dados.

Provavelmente é o projeto que mais venho me dedicando. Nele, tentei reunir recursos comuns os quais um e-commerce possui: criação de contas, anúncios de produtos, histórico de compras, lista de desejos, carrinhos de compras, etc.

![electroware-uml](https://user-images.githubusercontent.com/100732316/233129328-6f0f1f9c-975f-4bdf-a38e-4bbebe485a77.png)


## Observações

- Tanto a API quanto a interface estão inclusas nesse repositório.
- Creio que devido a sua complexidade, esse projeto irá se tornar bem interessante para refatorar, portanto, pretendo manter e atualiza-lo de acordo com a experiência que eu obter no futuro.
- Alguma sugestão de melhoria, erro notado, ou ideias, por favor, abra um [issue](https://github.com/luc-silva/electroware/issues).

## Fotos do Projeto

## Como Testar (NodeJS necessário)

1 - Clone o repositório:
``` git clone https://github.com/luc-silva/electroware ```

2 - Vá para o diretório o qual o repositório foi baixado

3 - Baixe as dependências do repositório, server e client

```bash
cd electroware
npm install
cd server
npm install
cd ..
cd client
npm install
```

4 - Volte para a raiz do repositório (electroware/)

```bash
cd ..
```

5 - Inicie o servidor

```bash
npm run server
```

6 - Abra um novo terminal e inicie o client

```bash
npm run client
```

Após os passos, o website deve abrir em seu navegador padrão. Dúvidas, entre em contato através do [LinkedIn](https://linkedin.com/in/silva-luc) ou abra um [issue](https://github.com/luc-silva/electroware/issues).

## Planos

- Hospedar o servidor e client do projeto

### Créditos

- [CSS Reset](https://meyerweb.com/eric/tools/css/reset/)
- [Valorax Font (Fonte usada no logo)](https://befonts.com/valorax-font.html)
- [Caixas - Banner 1](https://unsplash.com/@shutter_speed_)
- [Notebook, Tablet e Celular - Banner 2](https://www.freepik.com/free-psd/digital-devices-screen-editable_16303836.htm#page=4&query=eletronics&position=34&from_view=search&track=sph)
