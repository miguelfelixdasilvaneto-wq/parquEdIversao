const {
    CalcularIdade,
    VerificarFaixaEtaria,
    CalcularMetrosParaCentimetros
} = require("./src/scripts/calculadoras");

const VerificarRequisitos = require("./src/rules/rules");


const args = process.argv.slice(2);


// Verificar quantidade de argumentos
if (args.length !== 6) {
    console.log("Erro: informe os 6 argumentos!");
    process.exit(1);
}


// Receber os argumentos
const [
    nome,
    dataNascimento,
    altura,
    brinquedo,
    dataVisita,
    acompanhante
] = args;


// Verificar datas
const nascimento = new Date(dataNascimento);
const visita = new Date(dataVisita);

if (
    isNaN(nascimento.getTime()) ||
    isNaN(visita.getTime()) ||
    nascimento > visita
) {
    console.log("Data inválida!");
    process.exit(1);
}


// Calcular informações
const idade = CalcularIdade(dataNascimento, dataVisita);

const faixaEtaria = VerificarFaixaEtaria(idade);

const alturaCM = CalcularMetrosParaCentimetros(Number(altura));


// Mostrar informações
console.log("\n===== PARQUE DE DIVERSÃO =====");

console.log("Nome:", nome);
console.log("Data de nascimento:", dataNascimento);
console.log("Idade:", idade);
console.log("Faixa etária:", faixaEtaria);
console.log("Altura:", alturaCM, "cm");
console.log("Brinquedo:", brinquedo);
console.log("Data da visita:", dataVisita);


// Verificar altura
if (!Number.isFinite(Number(altura)) || Number(altura) <= 0) {
    console.log("Altura inválida!");
    process.exit(1);
}


// Verificar acompanhante
if (
    (faixaEtaria === "Criança" || faixaEtaria === "Idoso") &&
    acompanhante.trim() === ""
) {
    console.log("\nEntrada negada!");
    console.log("É necessário estar acompanhado.");
    process.exit(1);
}


// Mostrar acompanhante
if (faixaEtaria === "Criança" || faixaEtaria === "Idoso") {
    console.log("Acompanhante:", acompanhante);
}


// Criar objeto da pessoa
const pessoa = {
    nome: nome,
    idade: idade,
    altura: alturaCM
};


// Transformar objeto em JSON
const dadosPessoa = JSON.stringify(pessoa);


// Verificar requisitos do brinquedo
const resultado = VerificarRequisitos(
    dadosPessoa,
    brinquedo
);


// Resultado final
console.log("\n===== RESULTADO =====");

console.log(resultado.mensagem);

if (!resultado.permitido) {
    console.log("Acesso negado!");
    process.exit(1);
}

console.log("Acesso permitido! Bom divertimento!");
console.log(`
       O
      /|\\
      / \\
   BEM-VINDO!
`);
