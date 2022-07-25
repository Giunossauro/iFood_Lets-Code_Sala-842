/*

*/

const uuu = {
	_nome: "fulana",
	getNome: function(){
		return this._nome;
	}
}
 
Object.defineProperty(uuu,"nome",{
	get: function () {
		return this._nome;
	},
	set: function (valor) {
		this._nome = valor;
	}
});

uuu.nome = "fulane";
console.log(uuu.nome);