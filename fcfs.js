const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let processos = [];

function createDinamicArray(processos) {
  const array = [];
  const emptyArray = new Array(processos.length);
  for (let index of emptyArray) {
    array.push(0);
  }
  return array;
}

function waitingTime(processos) {
  const dinamicArray = createDinamicArray(processos);
  const tempo_servico = dinamicArray;
  tempo_servico[0] = 0;
  const wt = dinamicArray;
  const tempo_servico2 = [];
  tempo_servico2.push(0);

  for (let x = 1; x <= processos.length - 1; x++) {
    console.log(tempo_servico[x], "--", tempo_servico[x - 1]);
    tempo_servico[x] = tempo_servico2[x - 1] + processos[x - 1][1];
    tempo_servico2.push(tempo_servico[x]);

    wt[x] = tempo_servico[x] - processos[x][0];
    if (wt[x] < 0) {
      wt[x] = 0;
    }
  }

  return wt;
}

function turnAroundTime(processos) {
  const dinamicArray = createDinamicArray(processos);
  const tat = dinamicArray;
  const wt = waitingTime(processos);
  for (let x = 0; x <= processos.length - 1; x++) {
    tat[x] = processos[x][1] + wt[x];
  }
  return tat;
}

function averageWt(processos) {
  const wt = waitingTime(processos).reduce((acc, val) => acc + val);
  const averageWt = wt / processos.length;
  return averageWt;
}

function averageTat(processos) {
  const tat = turnAroundTime(processos).reduce((acc, val) => acc + val);
  const tatAverage = tat / processos.length;
  return tatAverage;
}

function main(processos) {
  console.log(
    "Process\tBurst Time\tArrival Time\tWaiting Time\tTurn-Around Time\tCompletion Time\n\n"
  );

  const wt = waitingTime(processos);
  const tat = turnAroundTime(processos);
  const avgWT = averageWt(processos);
  const avgTat = averageTat(processos);

  for (let proc = 0; proc < processos.length; proc++) {
    console.log(
      `${proc}\t\t${processos[proc][1]}\t\t${processos[proc][0]}\t\t${
        wt[proc]
      }\t\t${tat[proc]}\t\t${tat[proc] + processos[proc][0]}\n`
    );
  }

  console.log(`Average Waiting Time: ${avgWT}`);
  console.log(`Average Turn-Around Time: ${avgTat}`);
}

async function run(qtdProcessos) {
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

  main(processosFormatados);
}

async function* questions(qtd) {
  try {
    for (let i = 0; i < qtd; i++) {
      yield new Promise((resolve) =>
        rl.question("Arrival Time: ", (av) => {
          rl.question("Burst Time: ", (bt) => resolve([av, bt]));
        })
      );
    }
  } finally {
    rl.close();
  }
}

rl.question("Quantidade de processos: ", (qtd) => {
  run(qtd);
});
