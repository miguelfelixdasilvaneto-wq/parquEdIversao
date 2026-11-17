function CalcularIdade(dataNascimento, dataVisita = new Date()) {

    const nascimento = new Date(dataNascimento);
    const visita = new Date(dataVisita);

    const diferenca = visita - nascimento;

    const idade = Math.ceil(
        diferenca / (1000 * 60 * 60 * 24 * 365.2425)
    );

    return idade;
}


function VerificarFaixaEtaria(idade) {

    if (idade < 18) {
        return "Criança";
    }

    if (idade <= 25) {
        return "Jovem Adulto";
    }

    if (idade < 65) {
        return "Adulto";
    }

    return "Idoso";
}


function CalcularMetrosParaCentimetros(altura) {

    return altura * 100;

}


module.exports = {
    CalcularIdade,
    VerificarFaixaEtaria,
    CalcularMetrosParaCentimetros
};
