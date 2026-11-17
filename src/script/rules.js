const dadosParque = require("./rules.json");

function VerificarRequisitos(dadosPessoa, nomeBrinquedo) {

    const pessoa = JSON.parse(dadosPessoa);

    const brinquedos = dadosParque.Parque[0].Brinquedos;

    const regras = dadosParque.Parque[1].Restricoes[0].Regras;

    const brinquedo = brinquedos.find(
        item => item.nome.toLowerCase() === nomeBrinquedo.toLowerCase()
    );

    if (!brinquedo) {
        return {
            permitido: false,
            mensagem: "Brinquedo inválido!"
        };
    }

    for (const nomeRegra of brinquedo.regras) {

        const regraEncontrada = regras.find(
            item => item.nome === nomeRegra
        );

        if (!regraEncontrada) {
            return {
                permitido: false,
                mensagem: "Regra não encontrada!"
            };
        }

        const valor = nomeRegra === "Idade"
            ? pessoa.idade
            : pessoa.altura;

        const resultado = regraEncontrada.regra.match(
            /^X\s*(>=|<=|>|<|==)\s*(\d+(\.\d+)?)$/
        );

        if (!resultado) {
            return {
                permitido: false,
                mensagem: "Regra inválida!"
            };
        }

        const operador = resultado[1];
        const limite = Number(resultado[2]);

        let aprovado = false;

        switch (operador) {
            case ">":
                aprovado = valor > limite;
             break;

            case ">=":
                aprovado = valor >= limite;
                break;

            case "<":
                aprovado = valor < limite;
                break;

            case "<=":
                aprovado = valor <= limite;
                break;

            case "==":
                aprovado = valor === limite;
                break;
        }

        if (!aprovado) {
            return {
                permitido: false,
                mensagem: `Requisito de ${nomeRegra} não atendido!`
            };
        }
    }

    return {
        permitido: true,
        mensagem: "Todos os requisitos foram atendidos!"
    };
}

module.exports = VerificarRequisitos;
