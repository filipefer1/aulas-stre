const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const processos = [];

async function run(qtd) {
  for await (const answer of questions(qtd)) {
    processos.push(answer);
    if (answer == "done") break;
  }

  console.log(processos);
}

async function* questions(qtd) {
  try {
    for (let i = 0; i < qtd; i++) {
      yield new Promise((resolve) =>
        rl.question("Arrival Time:", (av) => {
          rl.question("Burst Time:", (bt) => resolve([av, bt]));
        })
      );
    }
  } finally {
    rl.close();
  }
}

rl.question("qtd processos:", (qtd) => {
  run(qtd);
});
