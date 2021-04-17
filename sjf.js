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
  const tempoServico = dinamicArray;
  const wt = dinamicArray;
  const tempo_servico2 = [];
  tempo_servico2.push(0);

  for (let x = 1; x <= processos.length - 1; x++) {
    tempoServico[x] = tempo_servico2[x - 1] + processos[x - 1][2];
    tempo_servico2.push(tempoServico[x]);
    wt[x] = tempoServico[x] - processos[x][1];
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
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

function averageTat(processos) {
  const tat = turnAroundTime(processos).reduce((acc, val) => acc + val);
  const tatAverage = tat / processos.length;
  return tatAverage;
}

function averageWt(processos) {
  const wt = waitingTime(processos).reduce((acc, val) => acc + val);
  const averageWt = wt / processos.length;
  return averageWt;
}

function sjf(processos) {
  for (let i = 0; i < processos.length; i++) {
    for (let j = 0; j < processos.length - 1; j++) {
      if (processos[j][2] > processos[j + 1][2]) {
        const processJ = processos[j];
        const processJ1 = processos[j + 1];
        processos[j] = processJ1;
        processos[j + 1] = processJ;
      }
    }
  }

  return processos;
}

function main(processos) {
  console.log(
    ":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::"
  );

  const wt = waitingTime(processos);
  const tat = turnAroundTime(processos);
  const avgWT = averageWt(processos);
  const avgTat = averageTat(processos);

  console.log(
    "| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n"
  );

  for (let proc = 0; proc < processos.length; proc++) {
    console.log(
      `${processos[proc][0]}\t\t\t${processos[proc][2]}\t\t\t${
        processos[proc][1]
      }\t\t\t${wt[proc]}\t\t\t${tat[proc]}\t\t\t${
        tat[proc] + processos[proc][1]
      }\n`
    );
  }

  console.log(`Average Waiting Time: ${avgWT}`);
  console.log(`Average Turn-Around Time: ${avgTat}`);

  console.log("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n");

  const processosSJF = sjf(processos);
  const wtSJF = waitingTime(processosSJF);
  const tatSJF = turnAroundTime(processosSJF);
  const avgWtSJF = averageWt(processosSJF);
  const avgTatSJF = averageTat(processosSJF);

  console.log(
    "| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n"
  );
  for (let proc = 0; proc < processosSJF.length; proc++) {
    console.log(
      `${processosSJF[proc][0]}\t\t\t${processosSJF[proc][2]}\t\t\t${
        processosSJF[proc][1]
      }\t\t\t${wtSJF[proc]}\t\t\t${tatSJF[proc]}\t\t\t${
        tatSJF[proc] + processosSJF[proc][1]
      }\n`
    );
  }

  console.log(`Average Waiting Time: ${avgWtSJF}`);
  console.log(`Average Turn-Around Time: ${avgTatSJF}`);
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
          rl.question("Burst Time: ", (bt) => resolve([`P${i + 1}`, av, bt]));
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
