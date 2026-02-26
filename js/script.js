let contadorErros = 0;
let primeiraExecucao = true;

function compilar() {
  const codigo = document.getElementById("editor").value;
  const terminal = document.getElementById("terminal");
  const contador = document.getElementById("contador");

  terminal.className =
    "bg-black text-gray-300 p-4 text-sm h-40 overflow-auto whitespace-pre-line";
  terminal.innerText = "Compilando...\n";

  setTimeout(() => {
    try {
      const codigoExecutavel = codigo
        .replace("export default", "")
        .replace("export", "");

      const Pizza = new Function(`
${codigoExecutavel}
return typeof Pizza !== 'undefined' ? Pizza : null;
`)();

      if (typeof Pizza !== "function")
        throw new Error("Classe Pizza não encontrada.");

      const pizzaTeste = new Pizza(30, 2);
      const peso = pizzaTeste.getPesoUnitario();

      const raioCorreto = 30 / 2;
      const areaCorreta = Math.PI * raioCorreto * raioCorreto;
      const volumeCorreto = areaCorreta * 2;
      const pesoEsperado = volumeCorreto * 0.85;

      if (Math.abs(peso - pesoEsperado) > 0.01)
        throw new Error("Teste Falhou: cálculo incorreto.");

      executarPrograma();
    } catch (e) {
      contadorErros++;
      contador.innerText = `Erros: ${contadorErros}`;
      terminal.className =
        "bg-black text-red-500 p-4 text-sm h-40 overflow-auto whitespace-pre-line";
      terminal.innerText = e.message;

      if (primeiraExecucao) {
        mostrarModalErro();
        primeiraExecucao = false;
      } else {
        mostrarAvisoTopo();
      }
    }
  }, 1500);
}

function executarPrograma() {
  const terminal = document.getElementById("terminal");

  terminal.className =
    "bg-black text-green-400 p-4 text-sm h-40 overflow-auto whitespace-pre-line";

  terminal.innerText = "Executando testes...\n";

  setTimeout(() => (terminal.innerText += "Teste estrutural: OK ✅\n"), 800);
  setTimeout(() => (terminal.innerText += "Teste matemático: OK ✅\n"), 1600);

  setTimeout(() => {
    terminal.innerText += "\nTodos os testes passaram.\n";
    revelarTimeline();
  }, 2400);
}

/* 🔥 MOSTRA TIMELINE SEM APAGAR O BODY */
function revelarTimeline() {
  confetti({ particleCount: 400, spread: 120, origin: { y: 0.6 } });

  setTimeout(() => {
    document.getElementById("editorSection").classList.add("hidden");
    document.getElementById("timelineSection").classList.remove("hidden");
    window.scrollTo(0, 0);

    ativarTimelineAnimacao();
  }, 800);
}

/* 🔥 ANIMAÇÃO SCROLL TIMELINE */
function ativarTimelineAnimacao() {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((item) => observer.observe(item));
}

/* 🔥 CARTA 3D */
function abrirCarta3D() {
  document.body.innerHTML = `
  <div class="flex items-center justify-center h-screen bg-black text-white scene">

    <div class="fullscreen-overlay" id="overlay"></div>

    <div class="envelope-wrapper" id="env">

      <div class="flap"></div>

      <div class="envelope bg-purple-700">
          <div class="carta flex flex-col justify-center items-center text-center p-16" id="cartaFinal">

            <div id="miniAlbum" class="relative w-full h-64 mt-8">
            
            <img src="./img/turma.png"
            class="album-img absolute w-56"
            style="left:28%; top:20%; --rot:15deg">
            
            <img src="./img/posjogo.jpeg"
            class="album-img absolute w-56 "
            style="right:25%; top:10%; --rot:-16deg">
            </div>

            <h2 class="text-4xl font-bold mb-6 tracking-wide">
              Professor...
            </h2>

            <p class="text-xl max-w-2xl leading-relaxed mb-8">
              Ainda não acabou o ano.
              Ainda temos projetos, prova e mais alguns bugs garantidos.
              
              Mas independente disso, queremos saber uma coisa. 
            </p>

            <h3 class="text-3xl font-bold mb-10">
              Aceita ser nosso Regente?
            </h3>

            <div class="flex gap-10">
              <button onclick="respostaFinal()"
                class="bg-green-600 hover:bg-green-700 transition px-10 py-4 rounded-xl text-xl font-semibold shadow-lg">
                Sim
              </button>

              <button onclick="respostaFinal()"
                class="bg-blue-600 hover:bg-blue-700 transition px-10 py-4 rounded-xl text-xl font-semibold shadow-lg">
                Claro que sim
              </button>
            </div>

          </div>
      </div>
    </div>
  </div>
  `;

  const env = document.getElementById("env");
  const carta = document.getElementById("cartaFinal");
  const overlay = document.getElementById("overlay");

  setTimeout(() => env.classList.add("open-flap"), 1000);
  setTimeout(() => env.classList.add("raise-paper"), 2200);
  setTimeout(() => env.classList.add("front-paper"), 3400);

  setTimeout(() => {
    overlay.classList.add("active");
    carta.classList.add("fullscreen-card");
  }, 4600);

  setTimeout(() => {
  const fotos = document.querySelectorAll(".album-img");
  fotos.forEach((foto, i) => {
    setTimeout(() => {
      foto.classList.add("show");
    }, i * 400);
  });
}, 5200);
}

function respostaFinal() {

  document.body.innerHTML = `
  <div class="fixed inset-0 bg-black text-green-400 font-mono flex items-center justify-center">

    <div class="bg-[#111] p-10 rounded-2xl shadow-2xl w-[700px] max-w-full">

      <div id="fakeTerminal" class="text-lg leading-relaxed whitespace-pre font-mono"></div>

      <div id="finalMessage" class="mt-10 text-center text-white text-2xl font-semibold opacity-0 transition duration-1000">
        ✔ Deploy realizado com sucesso.
      </div>

    </div>

  </div>
  `;

  const terminal = document.getElementById("fakeTerminal");
  const mensagem = document.getElementById("finalMessage");

  const texto = `git add .
git commit -m "Adicionando novo regente"
git push -u origin main

remote: Regência aceita.
`;

  let i = 0;

  function digitar() {
    if (i < texto.length) {
      terminal.innerText += texto[i];
      i++;
      setTimeout(digitar, 35);
    } else {
      mensagem.classList.remove("opacity-0");
      confetti({ particleCount: 800, spread: 140, origin: { y: 0.6 } });
    }
  }

  digitar();
}

/* MODAL ERRO */
function mostrarModalErro() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white z-50";

  modal.innerHTML = `
  <div class="bg-[#1e1e1e] p-8 rounded-xl text-center max-w-md">
    <h2 class="text-2xl mb-4 text-red-400">⚠ Problema Detectado</h2>
    <p>O código contém erros ou falhou nos testes.</p>
    <button onclick="this.parentElement.parentElement.remove()"
      class="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
      Entendido
    </button>
  </div>`;

  document.body.appendChild(modal);
}

function mostrarAvisoTopo() {
  const aviso = document.createElement("div");
  aviso.className =
    "fixed top-5 right-5 bg-red-600 px-4 py-2 rounded shadow-lg text-white z-50";

  aviso.innerText = "Ainda existem problemas no código.";
  document.body.appendChild(aviso);

  setTimeout(() => aviso.remove(), 3000);
}
