// # Calcular Waiting Time
// def waiting_time(processos):
//     #Definindo a quantidade tempos de servico de cada baseado na qnt. de processos
//     tempo_servico = [0] * len(processos)
//     #O tempo de servico é a soma de todos os BurstTime dos Processos anteriores
//     tempo_servico[0] = 0
//     # Definindo tamanho da waiting list
//     wt = [0] * len(processos)

//     for x in range(1, len(processos)):
//         tempo_servico[x] = (tempo_servico[x-1] + processos[x-1][1])
//         wt[x] = tempo_servico[x] - processos[x][0]
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
  const tempo_servico = dinamicArray;
  tempo_servico[0] = 0;
  const wt = dinamicArray;

  for (let x = 1; x <= processos.length - 1; x++) {
    tempo_servico[x] = tempo_servico[x - 1] + processos[x - 1][1];
    wt[x] = tempo_servico[x] - processos[x][0];
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

// # Calcular Turn around Time
// def turn_around_time(processos):
//     #TurnAround Time = BurstTime + WaitingTime
//     tat = [0] * len(processos) # Turn around time
//     wt = waiting_time(processos)
//     for x in range(len(processos)):
//         tat[x] = processos[x][1] + wt[x]
//     return tat

function turnAroundTime(processos) {
  const dinamicArray = createDinamicArray(processos);
  const tat = dinamicArray;
  const wt = waitingTime(processos);
  for (let x = 0; x <= processos.length - 1; x++) {
    tat[x] = processos[x][1] + wt[x];
  }
  return tat;
}

// # Calcular media do waiting time
// def average_wt(processos):
//     qnt_proc = len(processos)
//     wt = sum(waiting_time(processos))
//     return (wt / qnt_proc)

// def average_wt(processos):
//     wt = sum(waiting_time(processos))
//     return (wt / len(processos))

function averageWt(processos) {
  const wt = waitingTime(processos).reduce((acc, val) => acc + val);
  const averageWt = wt / processos.length;
  return averageWt;
}

// # Calcular media do Turnaround time
// def average_tat(processos):
//     qnt_proc = len(processos)
//     tat = sum(turn_around_time(processos))
//     return (tat / qnt_proc)

// def average_tat(processos):
//         tat = sum(turn_around_time(processos))
//         # Retornando o tempo medio
//         # Soma_dos_tat / qnt.Processos
//         return (tat/len(processos))

function averageTat(processos) {
  const tat = turnAroundTime(processos).reduce((acc, val) => acc + val);
  const tatAverage = tat / processos.length;
  return tatAverage;
}

const processos = [
  [1, 2],
  [3, 4],
];

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
