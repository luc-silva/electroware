# Electroware

Electroware é um projeto pessoal baseado em um marketplace, criado com ReactJS, Typescript, Express e MongoDB. Também utilizei UML para tentar estruturar a relação entre dados e objetos o máximo possível e Insomnia para testar os endpoints.

O projeto iniciou-se em um único repositório, mas decidi separar em submodulos para ter maior controle sobre versões diferentes da API e do client, bem como a integração da aplicação como um todo com diferentes ferramentas.

Ao instalar todas as depêndencias, você pode subir containers da API e client com o docker compose!

Backend foi implementado seguindo a arquitetura REST, utilizando uma biblioteca ODM (Mongoose) para realizar a interação no banco de dados.

Provavelmente é o projeto que mais venho me dedicando. Nele, tentei reunir recursos comuns os quais um e-commerce possui: criação de contas, anúncios de produtos, histórico de compras, lista de desejos, carrinhos de compras, descontos, etc.

![electroware](https://github.com/luc-silva/electroware/assets/100732316/cfb01756-c2e8-4cb8-8e93-add14a625741)

## Observações

- Creio que devido a sua complexidade, esse projeto irá se tornar bem interessante para refatorar, portanto, pretendo manter e atualiza-lo de acordo com a experiência que eu obter no futuro.
- Alguma sugestão de melhoria, erro notado, ou ideias, por favor, abra um [issue](https://github.com/luc-silva/electroware/issues).


## Como Testar 

### Método 1 (Necessário Docker e um sistema linux)
1 - Clone o repositório:

```bash
git clone https://github.com/luc-silva/electroware --recursive
```

2 - Vá para a pasta do projeto:

```bash
cd electroware
```

3 - Baixe as dependências do server e client:

```bash
cd ./client-react; npm install  && cd .. && cd ./API-typescript; npm install
```

4 - Inicialize os containers e aguarde:

```bash
sudo docker compose up -d
```

5 - Abra a página localhost de sua máquina na porta 3000.


### Método 2 (Necessário: NodeJS)
1 - Clone o repositório:

```bash
git clone https://github.com/luc-silva/electroware --recursive
```

2 - Vá para a pasta do projeto:

```bash
cd electroware
```

3 - Baixe as dependências do server e client:

```bash
cd ./client-react; npm install  && cd .. && cd ./API-typescript; npm install
```

3.1 - Caso falhe, talvez a flag recursive não tenha sido usado ao clonar o repositório. nesse caso, utilize esse comando dentro do repositório principal:

```bash
git submodule init && git submodule update
```

4 - Inicialize o servidor client e a API

```bash
npm start 
```

5 - Inicie a API

```bash
npm run server
```

6 - Abra um novo terminal e inicie o client

```bash
npm run client
```

## Fotos do Projeto

![electroware (1)](https://user-images.githubusercontent.com/100732316/234309814-7e2b9aae-4a41-463d-ab5d-45ba1e016f5a.png)
![electroware (2)](https://user-images.githubusercontent.com/100732316/234309859-ff7ddb2c-8728-4882-a296-a109be9f9e6b.png)
![electroware (3)](https://user-images.githubusercontent.com/100732316/234309891-df85c401-c88f-463c-bc6d-1842fd70a0ac.png)
![electroware (4)](https://user-images.githubusercontent.com/100732316/234309916-c6a7460f-df87-430e-af11-c0d9a9da10bb.png)
![electroware (5)](https://user-images.githubusercontent.com/100732316/234309948-c30b82f0-cdf6-45d4-9c9d-4e0869a00480.png)
![electroware (6)](https://user-images.githubusercontent.com/100732316/234309978-337a4567-be52-4fa8-a7c6-a102706d1ade.png)
![electroware (7)](https://user-images.githubusercontent.com/100732316/234310008-e1eaae21-3586-40b5-a021-13dec2cfc0b9.png)
![electroware (8)](https://user-images.githubusercontent.com/100732316/234310041-abd4cf30-a3f2-466d-817c-43190226ebc7.png)



Após os passos, o website deve abrir em seu navegador padrão. Dúvidas, entre em contato através do [LinkedIn](https://linkedin.com/in/silva-luc) ou abra um [issue](https://github.com/luc-silva/electroware/issues).

## Planos

- Refatorar.
- Criar feature de compartilhamento de coleções.
- Terminar de documentar a API.
- Fazer deploy no amazon AWS.
- Criar testes unitários/integração.
- Criar uma versão em Java da API.

## Créditos

- [CSS Reset](https://meyerweb.com/eric/tools/css/reset/)
- [Valorax Font (Fonte usada no logo)](https://befonts.com/valorax-font.html)
- [Caixas - Banner 1](https://unsplash.com/@shutter_speed_)
- [Notebook, Tablet e Celular - Banner 2](https://www.freepik.com/free-psd/digital-devices-screen-editable_16303836.htm#page=4&query=eletronics&position=34&from_view=search&track=sph)
- [Cão - Banner 3](https://www.freepik.com/free-photo/adorable-white-little-puppy_14724888.htm#from_view=detail_alsolike)
