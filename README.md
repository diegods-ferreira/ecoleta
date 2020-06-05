<h1 align="center">Ecoleta</h1>
<blockquote align="center">Uma aplicação para a realizar a aproximação entre os pontos de coleta de resíduos e aqueles que desejam descartá-los, com back-end construído com <b>Node</b> e o front-end web e mobile feitos com <b>React</b> e <b>React Native</b>, respectivamente.</blockquote>

<p align="center"><img src="https://github.com/diegods-ferreira/ecoleta/blob/master/prints/ecoleta-capa.png?raw=true" width="80%"></p>




<h3 align="center">Versão Web (<a href="https://github.com/diegods-ferreira/ecoleta/tree/master/server">server</a>)</h3>
<p>Alguns <i>scripts</i> já foram preparados para simplificar a inicialização do servidor <b>Node.js</b> da API no back-end.</p>
<p>Portanto, conforme o arquivo ```package.json```, para iniciar o servidor em ```http://localhost:3333```, basta o seguinte comando dentro da pasta ```server/```:</p>
<p>```npm run dev```</p>




<h3 align="center">Versão Web (<a href="https://github.com/diegods-ferreira/ecoleta/tree/master/web">web</a>)</h3>
<p align="center"><img src="https://github.com/diegods-ferreira/ecoleta/blob/master/prints/web.gif?raw=true" width="80%"></p>
<p>O <i>front-end</i> da aplicação foi construído com <b>React</b>. Para que as funcionalidades sejam carregadas e executadas da forma correta, é necessário que o caminho de acesso à API esteja definido corretamente no arquivo ```api.ts```, o qual está localizado em ```/web/src/services/```.</p>
<p>Para iniciar o <i>front-end</i>, basta executar o seguinte comando dentro da pasta ```web/```:</p>
<p>```npm start```</p>




<h3 align="center">Versão Mobile (<a href="https://github.com/diegods-ferreira/ecoleta/tree/master/mobile">mobile</a>)</h3>
<p align="center"><img src="https://github.com/diegods-ferreira/ecoleta/blob/master/prints/mobile.gif?raw=true" width="40%"></p>
<p>A aplicação <i>mobile</i> do Ecoleta foi construída com <b>React Native</b>, com a ajuda do <i>Expo</i>.</p>
<p>Assim como na aplicação web, aqui também será necessário verificar alguns caminhos de acesso à API para que todas as funcionalidades sejam executadas da forma correta.</p>
<p>Lembrando que, por se tratar de uma aplicação mobile, não há como ela acessar o endereço <i>http://localhost:3333</i> no qual o servidor da API possa estar em execução.</p>
<p>Uma solução é utilizar o endereço de IP na rede local da máquina em que o servidor está rodando. Esse endereço pode ser alterado no arquivo ```api.ts```, o qual encontra-se no diretório ```/mobile/src/services/```.</p>
<p>Para iniciar o app com o Expo, basta executar o seguinte comando dentro da pasta ```mobile/```:</p>
<p>```npm start```</p>
<p>Uma página página do <i>Expo</i> será aberta no seu browser padrão. Espere que o código QR apareça no canto inferior esquerdo da tela. Por fim, basta acessar o app do Expo* no seu celular (ou emulador), ler o código QR ou entrar com o endereço que aparece logo acima e testar a aplicação.</p>
<h6>* O app do Expo pode ser baixado pela Play Store e App Store.</h6>