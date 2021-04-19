// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let processos = [];

function createDinamicArray(qnt) {
  const array = [];
  const emptyArray = new Array(qnt);
  for (let index of emptyArray) {
    array.push(0);
  }
  return array;
}

function hiperPeriodo(processos, qnt) {
  let temp = 0;
  for (let i = 0; i < qnt; i++) {
    if (processos[i][3] > temp) {
      temp = processos[i][3];
    }
    return temp;
  }
}

function escolherMenorDeadline(processos, qnt, deadlines) {
  let menorDeadline = 10000;
  let escolhido = -1;

  for (let i = 0; i < qnt; i++) {
    if (deadlines[i] < menorDeadline) {
      menorDeadline = deadlines[i];
      escolhido = i;
    }
  }
  return escolhido;
}

function edf(processos, qnt) {
  console.log(processos);
  let relogio = 0;
  let deadlines = createDinamicArray(qnt);
  for (let i = 0; i < qnt; i++) {
    deadlines[i] = processos[i][2];
  }
  let periodos = createDinamicArray(qnt);
  for (let i = 0; i < qnt; i++) {
    periodos[i] = processos[i][3];
  }

  console.log("Processos:", processos);
  console.log("Deadlines: ", deadlines);
  console.log("Periodos: ", periodos, "\n");

  let contador = createDinamicArray(qnt);

  while (true) {
    let escolhido = escolherMenorDeadline(processos, qnt, deadlines);
    console.log(`Processo Escolhido: ${escolhido}`);
    if (periodos[escolhido] >= relogio) {
      relogio += processos[escolhido][1];
      console.log(`Processo: P${escolhido} executando...`);
      console.log(
        `Burst Time do Processo P${escolhido}: ${processos[escolhido][1]}`
      );
      console.log(`Relogio: ${relogio}`);

      console.log(`Deadline ANTERIOR do Processo : ${deadlines[escolhido]}`);
      deadlines[escolhido] += processos[escolhido][3];
      console.log(
        `Deadline do Processo P${escolhido} Atualizada: ${deadlines[escolhido]}`
      );

      console.log(`Periodo ANTERIOR do Processo: ${periodos[escolhido]}`);
      periodos[escolhido] += processos[escolhido][3];
      console.log(
        `Periodo do Processo P${escolhido} Atualizado: ${periodos[escolhido]}\n`
      );
      contador[escolhido] += 1;
    }

    if (relogio >= 20) break;
  }

  for (let i = 0; i < qnt; i++) {
    console.log(`O Processo P${i} Executou ${contador[i]} vezes`);
  }
}

// 0  1  2  3
// id bt dl p
//id = identidade; bt = burst time; dl = deadline; p = periodo

const processos = [
  [0, 3, 7, 20],
  [1, 2, 4, 5],
  [2, 2, 8, 10],
];

const qnt = processos.length;
edf(processos, qnt);

// async function run(qtdProcessos) {
//   for await (const answer of questions(qtdProcessos)) {
//     processos.push(answer);
//     if (answer == "done") break;
//   }

//   const processosFormatados = processos.map((proc) =>
//     proc.map((p) => {
//       if (isNaN(p)) {
//         return p;
//       }
//       return Number(p);
//     })
//   );

//   console.log(processosFormatados);

//   edf(processosFormatados, qtdProcessos);
// }

// async function* questions(qtd) {
//   try {
//     for (let i = 0; i < qtd; i++) {
//       yield new Promise((resolve) =>
//         rl.question("Burst Time: ", (bt) => {
//           rl.question("Deadline:", (dl) => {
//             rl.question("Periodo: ", (p) => resolve([i, bt, dl, p]));
//           });
//         })
//       );
//     }
//   } finally {
//     rl.close();
//   }
// }

// rl.question("Quantidade de processos: ", (qtd) => {
//   run(qtd);
// });
