// def waiting_time(processos):
//     # definindo a qnt. tempo de servico baseado na qnt de processos
//     tempo_servico = [0] * len(processos)
//     # definindo tamanho da waiting list
//     wt = [0] * len(processos)
//     for x in range(1, len(processos)):
//         tempo_servico[x] = (tempo_servico[x-1] + processos[x-1][2])
//         wt[x] = tempo_servico[x] - processos[x][1]
//         if (wt[x] < 0):
//             wt[x] = 0
//     return wt

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

  for (let x = 1; x <= processos.length - 1; x++) {
    tempoServico[x] = tempoServico[x - 1] + processos[x - 1][2];
    wt[x] = tempoServico[x] - processos[x][1];
    if (wt[x] < 0) {
      wt[x] = 0;
    }
  }
  return wt;
}

// def turn_around_time(processos):
//     # turnaround time = burstTime + waitingTime
//     tat = [0] * len(processos)
//     wt = waiting_time(processos)
//     for x in range(len(processos)):
//         tat[x] = processos[x][2] + wt[x]
//     return tat

function turnAroundTime(processos) {
  const dinamicArray = createDinamicArray(processos);
  const tat = dinamicArray;
  const wt = waitingTime(processos);
  for (let x = 0; x <= processos.length - 1; x++) {
    tat[x] = processos[x][2] + wt[x];
  }
  return tat;
}

// def average_tat(processos):
//         tat = sum(turn_around_time(processos))
//         # Retornando o tempo medio
//         # Soma_dos_tat / qnt.Processos
//         return (tat/len(processos))

// def average_wt(processos):
//     wt = sum(waiting_time(processos))
//     return (wt / len(processos))

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

// def SJF(processos):
//     # Ordenando por Job(Burst time) mais curto
//     for i in range(0, len(processos)):
//         for j in range(0, len(processos) - 1):
//             if processos[j][2] > processos[j+1][2]:
//                 processos[j], processos[j+1] = processos[j+1], processos[j]
//     return processos

function sjf(processos) {
  for (let i = 0; i <= processos.length - 1; i++) {
    for (let j = 0; j <= processos.length - 2; j++) {
      if (processos[j][2] > processos[j + 1][2]) {
        processos[j] = processos[j + 1];
        processos[j + 1] = processos[j];
      }
    }
  }
  return processos;
}

console.log(
  ":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::"
);

// processos = []
// qnt_processos = int(input("Quantidade de processos: "))
// for x in range(qnt_processos):
//     pid = f"P{x}"
//     at = int(input("Arrival Time: "))
//     bt = int(input("Burst Time: "))
//     processos.append([pid, at, bt])

const processos = [
  ["P1", 3, 4],
  ["P2", 5, 6],
];

// wt = waiting_time(processos)
// tat = turn_around_time(processos)
// avg_wt = average_wt(processos)
// avg_tat = average_tat(processos)
// print("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n")
// for proc in range(len(processos)):
//     print(f"{processos[proc][0]}\t\t\t{processos[proc][2]}\t\t\t{processos[proc][1]}\t\t\t{wt[proc]}\t\t\t{tat[proc]}\t\t\t{tat[proc] + processos[proc][1]}\n")

const wt = waitingTime(processos);
const tat = turnAroundTime(processos);
const avgWT = averageWt(processos);
const avgTat = averageTat(processos);

console.log(
  "| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n"
);

console.log(`Average Waiting Time: ${avgWT}`);
console.log(`Average Turn-Around Time: ${avgTat}`);

console.log(processos);

console.log("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n");

// processos = SJF(processos)
// wt = waiting_time(processos)
// tat = turn_around_time(processos)
// avg_wt = average_wt(processos)
// avg_tat = average_tat(processos)
// print(processos)

const processosSJF = sjf(processos);
const wtSJF = waitingTime(processos);
const tatSJF = turnAroundTime(processos);
const avgWtSJF = averageWt(processos);
const avgTatSJF = averageTat(processos);

console.log(processosSJF);
console.log(`Average Waiting Time: ${avgWtSJF}`);
console.log(`Average Turn-Around Time: ${avgTatSJF}`);
