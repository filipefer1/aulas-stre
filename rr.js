const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let processos = [];

function roundRobin(processos, quantum, qntProcessos) {
  const btRestante = createDinamicArray(qntProcessos);
  const wt = createDinamicArray(qntProcessos);

  for (let i = 0; i <= qntProcessos - 1; i++) {
    btRestante[i] = processos[i][2];
  }

  let tempo = 0;
  let overhead = 1;

  while (true) {
    let finalizados = true;
    for (let i = 0; i <= qntProcessos - 1; i++) {
      tempo += overhead;

      if (btRestante[i] > 0) {
        finalizados = false;

        if (btRestante[i] > quantum) {
          tempo += quantum;
          btRestante[i] -= quantum;
        } else {
          tempo += btRestante[i];
          wt[i] = tempo - processos[i][2];
          btRestante[i] = 0;
        }
      }
    }
    if (finalizados === true) {
      break;
    }
  }
  return wt;
}

function createDinamicArray(qtdProcessos) {
  const array = [];
  const emptyArray = new Array(qtdProcessos);
  for (let index of emptyArray) {
    array.push(0);
  }
  return array;
}

function turnAroundTime(processos, wt, qtdProcessos) {
  const dinamicArray = createDinamicArray(processos);
  const tat = dinamicArray;
  for (let x = 0; x <= qtdProcessos - 1; x++) {
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

function averageWt(wt, qtdProcessos) {
  const waitingTime = wt.reduce((acc, val) => acc + val);

  const averageWt = waitingTime / qtdProcessos;
  return averageWt;
}

function averageTat(tat, qtdProcessos) {
  const turnaroundTime = tat.reduce((acc, val) => acc + val);
  const tatAverage = turnaroundTime / qtdProcessos;
  return tatAverage;
}

function main(qtdProcessos, processos, quantum) {
  const wt = roundRobin(processos, quantum, qtdProcessos);
  const tat = turnAroundTime(processos, wt, qtdProcessos);
  const avgTat = averageTat(tat, qtdProcessos);
  const avgWt = averageWt(wt, qtdProcessos);

  console.log(
    `WT = [${wt}]\nTAT = [${tat}]\nAVG_TAT = ${avgTat}\nAVG_WT = ${avgWt}`
  );

  console.log(
    "| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n"
  );

  for (let i = 0; i <= qtdProcessos - 1; i++) {
    console.log(
      `${processos[i][0]}\t\t\t${processos[i][2]}\t\t\t${processos[i][1]}\t\t\t${wt[i]}\t\t\t         ${tat[i]}\t\t\t\n`
    );
  }

  console.log(`Average Waiting Time: ${avgWt}`);
  console.log(`Average Turn-Around Time: ${avgTat}`);
}

async function run(qtdProcessos, quantum) {
  for await (const answer of questions(qtdProcessos)) {
    processos.push(answer);
    if (answer == "done") break;
  }

  const processosFormatados = processos.map((proc) =>
    proc.map((p) => {
      if (isNaN(p)) {
        return p;
      }
      return Number(p);
    })
  );

  main(qtdProcessos, processosFormatados, quantum);
}

async function* questions(qtd) {
  try {
    for (let i = 0; i < qtd; i++) {
      yield new Promise((resolve) =>
        rl.question("Arrival Time: ", (av) => {
          rl.question("Burst Time: ", (bt) => resolve([`P${i}`, av, bt]));
        })
      );
    }
  } finally {
    rl.close();
  }
}

rl.question("Quantidade de processos: ", (qtd) => {
  rl.question("Informe o Quantum: ", (qt) => {
    run(qtd, +qt);
  });
});
