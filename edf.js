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

const processos = [
  [0, 3, 7, 20],
  [1, 2, 4, 5],
  [2, 2, 8, 10],
];

const qnt = processos.length;
edf(processos, qnt);
