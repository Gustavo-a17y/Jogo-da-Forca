(function(){
  const WORDS = [
["BRASÍLIA","Capital do Brasil"],
["WASHINGTON","Capital dos Estados Unidos"],
["OTTAWA","Capital do Canadá"],
["CIDADE DO MÉXICO","Capital do México"],
["BUENOS AIRES","Capital da Argentina"],
["SANTIAGO","Capital do Chile"],
["MONTEVIDÉU","Capital do Uruguai"],
["ASSUNÇÃO","Capital do Paraguai"],
["LIMA","Capital do Peru"],
["BOGOTÁ","Capital da Colômbia"],
["QUITO","Capital do Equador"],
["CARACAS","Capital da Venezuela"],
["LONDRES","Capital do Reino Unido"],
["PARIS","Cidade da Torre Eiffel"],
["MADRI","Capital da Espanha"],
["LISBOA","Capital de Portugal"],
["ROMA","Cidade do Coliseu"],
["BERLIM","Capital da Alemanha"],
["AMSTERDÃ","Capital dos Países Baixos"],
["BRUXELAS","Sede da União Europeia"],
["VIENA","Capital da Áustria"],
["ATENAS","Berço da democracia"],
["DUBLIN","Capital da Irlanda"],
["OSLO","Capital da Noruega"],
["ESTOCOLMO","Capital da Suécia"],
["HELSINQUE","Capital da Finlândia"],
["COPENHAGUE","Capital da Dinamarca"],
["PRAGA","Capital da República Tcheca"],
["VARSÓVIA","Capital da Polônia"],
["BUDAPESTE","Capital da Hungria"],
["MOSCOU","Capital da Rússia"],
["KIEV","Capital da Ucrânia"],
["ANCARA","Capital da Turquia"],
["CAIRO","Cidade das pirâmides do Egito"],
["RABAT","Capital do Marrocos"],
["ARGEL","Capital da Argélia"],
["TÚNIS","Capital da Tunísia"],
["NAIRÓBI","Capital do Quênia"],
["PRETÓRIA","Uma das capitais da África do Sul"],
["ADIS ABEBA","Capital da Etiópia"],
["PEQUIM","Capital da China"],
["TÓQUIO","Maior área metropolitana do mundo"],
["SEUL","Capital da Coreia do Sul"],
["PYONGYANG","Capital da Coreia do Norte"],
["NOVA DÉLHI","Capital da Índia"],
["ISLAMABAD","Capital do Paquistão"],
["CABUL","Capital do Afeganistão"],
["BANGCOC","Capital da Tailândia"],
["HANÓI","Capital do Vietnã"],
["JACARTA","Capital da Indonésia"],
["MANILA","Capital das Filipinas"],
["KUALA LUMPUR","Capital da Malásia"],
["SINGAPURA","Cidade-estado asiática"],
["TAIPÉ","Capital de Taiwan"],
["ULAN BATOR","Capital da Mongólia"],
["RIAD","Capital da Arábia Saudita"],
["DOHA","Capital do Catar"],
["ABU DHABI","Capital dos Emirados Árabes Unidos"],
["MASCATE","Capital de Omã"],
["TEERÃ","Capital do Irã"],
["BAGDÁ","Capital do Iraque"],
["DAMASCO","Capital da Síria"],
["AMÃ","Capital da Jordânia"],
["BEIRUTE","Capital do Líbano"],
["JERUSALÉM","Cidade sagrada para três religiões"],
["TEL AVIV","Importante cidade de Israel"],
["CANBERRA","Capital da Austrália"],
["WELLINGTON","Capital da Nova Zelândia"],
["SUVA","Capital de Fiji"],
["PORT MORESBY","Capital de Papua-Nova Guiné"],
["HAVANA","Capital de Cuba"],
["SANTO DOMINGO","Capital da República Dominicana"],
["SAN JOSÉ","Capital da Costa Rica"],
["CIDADE DO PANAMÁ","Capital do Panamá"],
["SAN SALVADOR","Capital de El Salvador"],
["TEGUCIGALPA","Capital de Honduras"],
["MANÁGUA","Capital da Nicarágua"],
["GUATEMALA","Capital da Guatemala"],
["REYKJAVIK","Capital da Islândia"],
["LUXEMBURGO","Capital e país possuem o mesmo nome"],
["BELGRADO","Capital da Sérvia"],
["SOFIA","Capital da Bulgária"],
["BUCARESTE","Capital da Romênia"],
["ZAGREB","Capital da Croácia"],
["LJUBLJANA","Capital da Eslovênia"],
["BRATISLAVA","Capital da Eslováquia"],
["VILNIUS","Capital da Lituânia"],
["RIGA","Capital da Letônia"],
["TALIN","Capital da Estônia"],
["CHISINAU","Capital da Moldávia"],
["GEORGETOWN","Capital da Guiana"],
["PARAMARIBO","Capital do Suriname"],
["LA PAZ","Sede do governo da Bolívia"],
["SUCRE","Capital constitucional da Bolívia"],
["PORTO PRÍNCIPE","Capital do Haiti"],
["KINGSTON","Capital da Jamaica"],
["NASSAU","Capital das Bahamas"],
["VATICANO","Menor Estado do mundo"],
["RAMALA","Centro administrativo da Palestina"],
["DACA","Capital de Bangladesh"],
  ];
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const MAX_LIVES = 6;
  function shuffle(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const deck = shuffle(WORDS);
  let index = 0;
  let score = 0;
  let word = "";
  let hint = "";
  let guessed = new Set();
  let wrongCount = 0;
  let over = false;
  const els = {
    rig: document.getElementById("rig"),
    word: document.getElementById("word"),
    hint: document.getElementById("hint"),
    keyboard: document.getElementById("keyboard"),
    wordNum: document.getElementById("wordNum"),
    wordTotal: document.getElementById("wordTotal"),
    scoreCount: document.getElementById("scoreCount"),
    overlay: document.getElementById("overlay"),
    modal: document.getElementById("modal"),
    modalTitle: document.getElementById("modalTitle"),
    modalText: document.getElementById("modalText"),
    nextBtn: document.getElementById("nextBtn"),
  };
  els.wordTotal.textContent = deck.length;
  function buildRig(){
   els.rig.innerHTML = `
  <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="150" x2="100" y2="150" stroke="#A78BFA" stroke-width="6" stroke-linecap="round"/>
    <line x1="40" y1="150" x2="40" y2="18" stroke="#A78BFA" stroke-width="6" stroke-linecap="round"/>
    <line x1="40" y1="18" x2="112" y2="18" stroke="#A78BFA" stroke-width="6" stroke-linecap="round"/>
    <line x1="40" y1="38" x2="62" y2="18" stroke="#A78BFA" stroke-width="6" stroke-linecap="round"/>
    <line x1="112" y1="18" x2="112" y2="34" stroke="#A78BFA" stroke-width="5" stroke-linecap="round"/>
    <circle id="part0" class="part" cx="112" cy="47" r="13" fill="none" stroke="#FFD23F" stroke-width="5"/>
    <line id="part1" class="part" x1="112" y1="60" x2="112" y2="96" stroke="#FF4D8D" stroke-width="5" stroke-linecap="round"/>
    <line id="part2" class="part" x1="112" y1="70" x2="97" y2="86" stroke="#FF4D8D" stroke-width="5" stroke-linecap="round"/>
    <line id="part3" class="part" x1="112" y1="70" x2="127" y2="86" stroke="#FF4D8D" stroke-width="5" stroke-linecap="round"/>
    <line id="part4" class="part" x1="112" y1="96" x2="99" y2="118" stroke="#06D6A0" stroke-width="5" stroke-linecap="round"/>
    <line id="part5" class="part" x1="112" y1="96" x2="125" y2="118" stroke="#06D6A0" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  }
  function normalize(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function startWord(){
    if(index >= deck.length){
      showEndOfDeck();
      return;
    }
    const pick = deck[index];
    word = pick[0];
    hint = pick[1];
    guessed = new Set();
    wrongCount = 0;
    over = false;
    els.overlay.classList.remove("show");
    els.wordNum.textContent = index + 1;
    els.scoreCount.textContent = score;
    buildRig();
    els.hint.textContent = "Dica: " + hint;
    renderWord();
    buildKeyboard();
  }
  function showEndOfDeck(){
    els.modal.className = "modal win";
    els.modalTitle.textContent = "Você completou todas as palavras! 🎉";
    els.modalText.innerHTML = "Placar final: <b>" + score + "</b> de <b>" + deck.length + "</b>";
    els.nextBtn.textContent = "Jogar novamente";
    els.overlay.classList.add("show");
    els.nextBtn.focus();
    launchConfetti();
    els.nextBtn.onclick = () => { index = 0; score = 0; startWord(); };
  }
  function renderWord(){
    els.word.innerHTML = "";
    word.split("").forEach(ch => {
      if(ch === " "){
        const s = document.createElement("div");
        s.className = "letter-slot space";
        els.word.appendChild(s);
        return;
      }
      const slot = document.createElement("div");
      slot.className = "letter-slot";
      const normCh = normalize(ch);
      if(guessed.has(normCh)){
        slot.textContent = ch;
        slot.classList.add("reveal");
      }
      els.word.appendChild(slot);
    });
  }
  function buildKeyboard(){
    els.keyboard.innerHTML = "";
    const rows = [
      ALPHABET.slice(0,9),
      ALPHABET.slice(9,18),
      ALPHABET.slice(18,26).concat(["Ç"])
    ];
    rows.forEach(rowLetters => {
      const row = document.createElement("div");
      row.className = "kb-row";
      rowLetters.forEach(letter => {
        const btn = document.createElement("button");
        btn.className = "key";
        btn.textContent = letter;
        btn.addEventListener("click", () => handleGuess(letter, btn));
        row.appendChild(btn);
      });
      els.keyboard.appendChild(row);
    });
  }
  function handleGuess(letter, btnEl){
    if(over || guessed.has(letter)) return;
    guessed.add(letter);
    btnEl.disabled = true;
    const normWord = normalize(word);
    if(normWord.includes(letter)){
      btnEl.classList.add("correct");
      renderWord();
      checkWin();
    } else {
      btnEl.classList.add("wrong");
      const part = document.getElementById("part" + wrongCount);
      if(part) part.classList.add("show");
      wrongCount++;
      if(wrongCount >= MAX_LIVES){
        loseWord();
      }
    }
  }
  function checkWin(){
    const normWord = normalize(word);
    const allGuessed = normWord.split("").every(ch => ch === " " || guessed.has(ch));
    if(allGuessed){
      winWord();
    }
  }
  function winWord(){
    over = true;
    score++;
    els.modal.className = "modal win";
    els.modalTitle.textContent = "Você acertou! 🎉";
    els.modalText.innerHTML = "A palavra era <b>" + word + "</b>";
    els.nextBtn.textContent = index + 1 >= deck.length ? "Ver placar final" : "Próxima palavra";
    els.overlay.classList.add("show");
    els.nextBtn.focus();
    disableKeyboard();
    launchConfetti();
    els.nextBtn.onclick = () => { index++; startWord(); };
  }
  function loseWord(){
    over = true;
    els.modal.className = "modal lose";
    els.modalTitle.textContent = "Ah, não! 💥";
    els.modalText.innerHTML = "A palavra era <b>" + word + "</b>";
    els.nextBtn.textContent = index + 1 >= deck.length ? "Ver placar final" : "Próxima palavra";
    els.overlay.classList.add("show");
    els.nextBtn.focus();
    disableKeyboard();
    els.nextBtn.onclick = () => { index++; startWord(); };
  }
  function disableKeyboard(){
    document.querySelectorAll(".key").forEach(k => k.disabled = true);
  }
  function launchConfetti(){
    const colors = ["#FF4D8D","#FFD23F","#06D6A0","#FF8C42","#A78BFA"];
    for(let i=0;i<40;i++){
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random()*100 + "vw";
      piece.style.background = colors[Math.floor(Math.random()*colors.length)];
      piece.style.animationDuration = (2 + Math.random()*1.5) + "s";
      piece.style.animationDelay = (Math.random()*0.4) + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }
  function findKey(letter){
    return Array.from(document.querySelectorAll(".key")).find(b => b.textContent === letter);
  }
  document.addEventListener("keydown", (e) => {
    // Enter ou espaço avançam para a próxima palavra quando o modal está aberto
    if((e.key === "Enter" || e.key === " ") && els.overlay.classList.contains("show")){
      e.preventDefault();
      els.nextBtn.click();
      return;
    }
    const letter = e.key.toUpperCase();
    if(ALPHABET.includes(letter) || letter === "Ç"){
      e.preventDefault();
      const btn = findKey(letter);
      if(btn && !btn.disabled){
        btn.classList.add("key-pressed");
        handleGuess(letter, btn);
      }
    }
  });
  document.addEventListener("keyup", (e) => {
    const letter = e.key.toUpperCase();
    if(ALPHABET.includes(letter) || letter === "Ç"){
      const btn = findKey(letter);
      if(btn) btn.classList.remove("key-pressed");
    }
  });
  startWord();
})();