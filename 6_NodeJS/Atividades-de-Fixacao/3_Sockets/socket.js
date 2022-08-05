class Socket{

  constructor(name, thisPort, otherPort){

    this.name = name;
    this.thisPort = thisPort;
    this.otherPort = otherPort;
    this.socket = require('node:dgram').createSocket('udp4');
    this.terminal = require('node:readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.qtdMensagens = 0;
    this.tamTotalDasMensagens = 0;
    this.tamMedDasMensagens = 0;
    
    console.clear();

    this.socket.bind(this.thisPort);
    this.socket.connect(this.otherPort,'localhost',(errConnecting)=>{
      if(!errConnecting){
        setTimeout(()=>{
          this.socket.send(`Olá!`,(_,tamanhoDaMensagem)=>{
            this.contabilizaMensagens(tamanhoDaMensagem);
          });
        },1000);
        return;
      }
      console.log(`Error conecting: ${errConnecting}`);
    });
  
    this.socket.on('listening', () => {
      const address = this.socket.address();
      console.log(`${this.name} running at ${
        address.address}:${address.port
      }\nEnter 'c' (without quotation marks) to disconnect.\n`);
    });
  
    this.socket.on('message', (buffer,rinfo) => {
      const question = buffer.toString();
      const address = this.socket.address();
      console.log(`[${rinfo.address}:${rinfo.port}] (recebido): ${question}`);
      if (this.msgIsToEndConnection(question)){
        this.endConnection();
        return;
      }
      this.terminal.question(`[${address.address}:${address.port}]: `,(answer) => {
        if (this.msgIsToEndConnection(answer)){
          this.endConnection();
          return;
        }
        this.socket.send(answer,(_,tamanhoDaMensagem)=>{
          this.contabilizaMensagens(tamanhoDaMensagem);
        });
      });
    });
  
    this.socket.on('error', (err) => {
      console.log(`---\nsocket error: ${err}\n---`);
      this.socket.close();
    });
  
    this.socket.on('close', (err) => {
      if (err) {
        console.log(`---\nsocket error: ${err}\n---`);
      }
      this.tamMedDasMensagens = (this.tamTotalDasMensagens / this.qtdMensagens);
      console.log(`Foram enviadas ${
        this.qtdMensagens
      } com tamanho médio de ${
        this.tamMedDasMensagens
      } e com tamanho total de ${
        this.tamTotalDasMensagens
      }`);
    });
  }

  msgIsToEndConnection(msg){
    return msg.toUpperCase() === 'C';
  }
  
  endConnection(){
    this.socket.send(`${this.name} disconnected`,(_,tamanhoDaMensagem)=>{
      this.contabilizaMensagens(tamanhoDaMensagem);
    });
    this.socket.disconnect();
    this.socket.close(() => {
      console.log(`${this.name} closed.`);
    });
  }

  contabilizaMensagens(tamanhoDaMensagem){
    this.qtdMensagens++;
    this.tamTotalDasMensagens += tamanhoDaMensagem;
  }
}

module.exports = Socket;
