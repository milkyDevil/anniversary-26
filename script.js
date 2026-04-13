const terminal = document.getElementById("terminal");

const messages = [
  "Initializing Anniversary Build...",
  "...",
  "Boot sequence started...",
  "Loading modules: 12%",
  "Loading modules: 37%",
  "Loading modules: 68%",
  "Loading modules: 92%",
  "Loading modules: 100%",
  "...",
  "sudo access-love --paps",
  "Access granted ❤️",
  "...",
  "Booting LoveOS v15.0.0...",
  "...",
  "Loading memory modules...",
  "...",
  "Accessing archive: 22-04-2011",
  "...",
  "Event detected:",
  "He kissed me.",
  "...",
  "System decision:",
  '"Now you are my boyfriend."',
  "...",
  "Response:",
  '"Okay."',
  "...",
  "LoveOS initialized successfully ❤️",
  "-----------------------------",
  "Running diagnostics...",
  "...",
  "Issues found:",
  "- Fights",
  "- Overthinking",
  "...",
  "Applying custom rules...",
  "Never stop talking",
  "Angry words = invalid input",
  "Trust > everything",
  "...",
  "System stabilized.",
  "-----------------------------",
  "Loading core module: Paps",
  "...",
  "Capabilities:",
  "- Can learn anything",
  "- 100% chill human",
  "...",
  "System impact:",
  "Anxiety ↓",
  "Peace ↑",
  "...",
  "-----------------------------",
  "v12.0.0 detected...",
  "Year: 2021",
  "...",
  "Status update: Wife 💍",
  "Uninstall option: Disabled",
  "...",
  "-----------------------------",
  "System stats:",
  "Uptime: 15 years",
  "Downtime: 0",
  "...",
  "Final evaluation...",
  "...",
  "Result:",
  "You are my default setting ❤️",
  "...",
  "Happy Anniversary Paps",
  "v15.0.0 – Stable Release",
  "No resets. No replacements. No refunds.",
  "...",
  "--------------------------------",
  "Press anywhere to restart ❤️",
];

let lineIndex = 0;
let typingSpeed = 25;
let fastMode = false;
let finished = false;

/* 🔊 Sound */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.frequency.value = 800;
  gain.gain.value = 0.02;

  osc.start();
  osc.stop(audioCtx.currentTime + 0.02);
}

/* 👆 Tap behavior */
document.body.addEventListener("click", () => {
  if (finished) {
    restart();
  } else {
    fastMode = true;
    typingSpeed = 5;
  }
});

function restart() {
  terminal.innerHTML = "";
  lineIndex = 0;
  typingSpeed = 25;
  fastMode = false;
  finished = false;
  typeLine();
}

function typeLine() {
  if (lineIndex >= messages.length) {
    finished = true;
    addCursor();
    return;
  }

  const lineText = messages[lineIndex];
  const line = document.createElement("div");
  line.className = "line";

  const prompt = document.createElement("span");
  prompt.className = "prompt";
  prompt.textContent = "paps@loveos:~$";

  const text = document.createElement("span");

  line.appendChild(prompt);
  line.appendChild(text);
  terminal.appendChild(line);

  let charIndex = 0;

  const typing = setInterval(() => {
    text.textContent += lineText[charIndex];
    playTick();

    charIndex++;

    if (charIndex === lineText.length) {
      clearInterval(typing);
      lineIndex++;

      terminal.scrollTop = terminal.scrollHeight;

      let delay = lineText === "..." ? 500 : 1000;
      if (fastMode) delay = 200;

      setTimeout(typeLine, delay);
    }
  }, typingSpeed);
}

function addCursor() {
  const line = document.createElement("div");
  line.className = "line";

  const prompt = document.createElement("span");
  prompt.className = "prompt";
  prompt.textContent = "paps@loveos:~$";

  const cursor = document.createElement("span");
  cursor.className = "cursor";

  line.appendChild(prompt);
  line.appendChild(cursor);
  terminal.appendChild(line);
}

typeLine();
