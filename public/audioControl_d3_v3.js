let audioContext;
let analyser;
let dataArray;
let source;
let stream;
let isMicOn = false;
const data = [];
const maxDataPoints = 300;
let notificationVisible = false;

const svg = d3.select(".chart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xScale = d3.scaleLinear().range([0, innerWidth]);
const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

const line = d3
  .line()
  .x((d, i) => xScale(i))
  .y((d) => yScale(d.volume));

const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

g.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${innerHeight})`);

g.append("g").attr("class", "y-axis");

function updateChart() {
  xScale.domain([0, maxDataPoints - 1]);

  const segments = data.map((d, i) => ({
    x1: xScale(i),
    y1: yScale(d.volume),
    x2: xScale(i + 1),
    y2: i < data.length - 1 ? yScale(data[i + 1].volume) : yScale(d.volume),
    color: d.volume <= 30 ? "green" : d.volume <= 70 ? "yellow" : "red",
  }));

  const lines = g.selectAll(".segment").data(segments);

  lines
    .enter()
    .append("line")
    .attr("class", "segment")
    .merge(lines)
    .attr("x1", (d) => d.x1)
    .attr("y1", (d) => d.y1)
    .attr("x2", (d) => d.x2)
    .attr("y2", (d) => d.y2)
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", 2);

  lines.exit().remove();

  g.select(".x-axis").call(
    d3
      .axisBottom(xScale)
      .ticks(10)
      .tickFormat((d, i) =>
        data[i] ? d3.timeFormat("%H:%M:%S")(data[i].time) : "",
      ),
  );

  g.select(".y-axis").call(d3.axisLeft(yScale));
}

//bootstrap component retrieved from https://getbootstrap.com/docs/5.3/components/alerts/
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  notificationVisible = true;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  wrapper.querySelector(".btn-close").addEventListener("click", () => {
    notificationVisible = false;
  });

  alertPlaceholder.append(wrapper);
};

async function* updateVolumeGenerator() {
  while (isMicOn) {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const averageVolume = sum / dataArray.length;
    const roundedVolume = Math.round(averageVolume);
    if (roundedVolume > 80 && !notificationVisible) {
      appendAlert("Noise level is above 80 dB!", "success");
    }

    document.getElementById("volume").innerText = `Volume: ${roundedVolume}`;
    if (data.length >= maxDataPoints) data.shift();
    data.push({ time: new Date(), volume: roundedVolume });

    updateChart();

    await new Promise((resolve) => setTimeout(resolve, 1000 / 60)); // Update at ~60 FPS
    yield;
  }
}

async function startMicrophone() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    const volumeGenerator = updateVolumeGenerator();
    async function runGenerator() {
      for await (const _ of volumeGenerator) {
      }
    }

    runGenerator();
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
}

function stopMicrophone() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }
  isMicOn = false;
  document.getElementById("volume").innerText = "Volume: 0";
  updateChart();
}

document.getElementById("toggle-mic").addEventListener("click", function () {
  if (isMicOn) {
    stopMicrophone();
    this.innerHTML =
      '<i class="bi bi-mic-fill"></i> <span id="toggle-mic-text">Start Microphone</span>';
    this.className = "btn btn-dark mt-3";
  } else {
    isMicOn = true;
    startMicrophone();
    this.innerHTML =
      '<i class="bi bi-mic-mute-fill"></i> <span id="toggle-mic-text">Stop Microphone</span>';
    this.className = "btn btn-light mt-3";
  }
});
