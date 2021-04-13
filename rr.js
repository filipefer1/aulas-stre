const readline = require("readline");
const util = require("util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

let processos = [];

async function userInput() {
  let qtdProcessos;
  let at;
  let bt;
  // console.log("Quantidade de processos:");
  // rl.on("line", (line) => {
  //   console.log(`Received: ${line}`);
  // });

  // rl.close();

  try {
    const qtd = await question("Quantidade de processos? ");
    rl.close();
  } catch (error) {
    console.log(error);
  }

  // readline.question("Quantidade de processos:", (qtd) => {
  //   qtdProcessos = qtd;
  //   teste();

  //   // for (let i = 0; i <= qtd; i++) {
  //   //   readline.question("Arrival time:", (at) => {
  //   //     readline.question("Burst Time: ", (bt) => {
  //   //       processos.push([at, bt]);
  //   //     });
  //   //   });
  //   // }
  //   readline.close();
  // });
}

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

// def round_robin(processos, quantum, qnt_processos):
//     # Criando uma lista de Burst Time restante dos processos
//     bt_restante = [0] * qnt_processos
//     # Criando uma lista de Waiting Time
//     wt = [0] * qnt_processos
//     # Copiando BurstTime dos processos para o bt_restante
//     for i in range(qnt_processos):
//         bt_restante[i] = processos[i][2]

//     tempo = 0 # Tempo total que será adicionado ao WaitingTime
//     overhead = 1 # Valor hipotetico para o tempo gasto na troca de contexto entre processos

//     while True:
//         # Variavel de Controle, verifica se os processos foram
//         # finalizados ou não
//         finalizados = True
//         for i in range(qnt_processos):
//             tempo += overhead # Para cada troca de contexto entre os processos, Adicionar ao Tempo Total

//             # Se for maior que 0, ainda há processos a serem
//             # Finalizados
//             if bt_restante[i] > 0:
//                 finalizados = False
//                 # Se o tempo restante for maior que Quantum
//                 if bt_restante[i] > quantum:
//                     # Somar quantum ao tempo de processamento
//                     tempo += quantum
//                     # Retirar do BurstTime restante o Tempo(quantum)
//                     # que ja foi processado
//                     bt_restante[i] -= quantum
//                 else: # Caso o tempo restante seja menor que quantum
//                     # Somar ao tempo, o tempo restante de bt
//                     tempo += bt_restante[i]
//                     # WaitingTime = tempo_total - burst_time do processo
//                     wt[i] = tempo - processos[i][2]
//                     # Zerando burst time
//                     bt_restante[i] = 0
//         # Se todos os Processos foram concluídos
//         if (finalizados == True):
//             break
//     return wt # Retornar Lista de WaitingTime

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

function main() {
  const processos = [
    ["P1", 3, 4],
    ["P2", 5, 6],
  ];

  const quantum = 5;
  const qtdProcessos = qtdProcesssF();
  console.log(qtdProcessos);

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

  // for proc in range(len(processos)):
  //     console.log(f"{processos[proc][0]}\t\t\t{processos[proc][2]}\t\t\t{processos[proc][1]}\t\t\t{wt[proc]}\t\t\t         {tat[proc]}\t\t\t\n")

  console.log(`Average Waiting Time: ${avgWt}`);
  console.log(`Average Turn-Around Time: ${avgTat}`);
}

let qtdProcessos;
rl.on("line", (line) => {
  qtdProcessos = line;
});

console.log(qtdProcessos);

// userInput();
