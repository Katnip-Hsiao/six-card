const questions = [
  {
    label: "你对公司愿景的认可度？",
    left: "非常不认可",
    right: "非常认可"
  },
  {
    label: "面对困难任务时你的选择？",
    left: "打退堂鼓",
    right: "主动请缨"
  },
  {
    label: "你对卸油作业的熟悉度？",
    left: "完全不熟悉",
    right: "非常规范"
  },
  {
    label: "看到非油还差5%你会？",
    left: "与我无关",
    right: "下月做得更好"
  },
  {
    label: "你的工作风格更偏向？",
    left: "单打独斗",
    right: "合作完成"
  },
  {
    label: "你更偏爱哪类创意？",
    left: "简单直白",
    right: "新颖独特"
  }
];

const titles1 = ["信仰持盾者", "勇毅先锋官", "秩序掌舵者", "燃力实践家", "中枢协调者", "睿思策划人"];
const quotes1 = [
  "你不是在喊口号，而是在每一个孤独的时刻也不放下信仰的火光。",
  "你是那个敢于第一个出发的人，用实际行动为他人扫清路径。",
  "规则不是束缚，而是你给这个世界的信任契约。",
  "没人比你更知道坚持意味着什么。",
  "你是团队信赖的引擎，所有结论因你而顺畅。",
  "你能看见别人看不见的角度，也能给幻想落地为真。"
];

const titles2 = ["扶弱引路人", "协作汇组织者", "愿景萌芽者", "稳进导航者", "慧劳奋斗苗", "创意探索者"];
const quotes2 = [
  "你用清晰的边界感，为团队划出一条稳健可行的轨道。",
  "你是一种不动声色的坚信，复杂的系统因你而有机流动。",
  "虽然指针正在放缓前进，但你点燃的火光，足以照亮开始。",
  "你是那种一如既往如一，安静地完成每一次倾尽。",
  "你从不拒绝琐碎的磨合，让每一次出错都有显著成长。",
  "你的思维不设限，从大胆想法到现实转化，你始终在路上。"
];

function generate() {
  const name = document.getElementById("nameInput").value.trim() || "这位同事";
  const sliders = document.querySelectorAll("input[type=range]");
  const scores = Array.from(sliders).map(s => parseInt(s.value));
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  const maxIndex = scores.indexOf(Math.max(...scores));
  const isHigh = avg >= 70;

  document.getElementById("titleArea").innerText = `🏅 称号：${isHigh ? titles1[maxIndex] : titles2[maxIndex]}`;
  document.getElementById("quote").innerText = isHigh ? quotes1[maxIndex] : quotes2[maxIndex];
  drawChart(scores, name);
  document.getElementById("result").style.display = "block";
}

function drawChart(scores, name) {
  const ctx = document.getElementById("chart").getContext("2d");
  if (window.radarChart) window.radarChart.destroy();
  window.radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ["理想", "担当", "纪律", "奋斗", "协作", "创新"],
      datasets: [{
        label: `${name} 战力值`,
        data: scores,
        backgroundColor: "rgba(0,123,255,0.3)",
        borderColor: "#007bff",
        borderWidth: 2,
        pointBackgroundColor: "#007bff"
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: { stepSize: 20 }
        }
      }
    }
  });
}

function saveCard() {
  html2canvas(document.querySelector("#result")).then(canvas => {
    const link = document.createElement("a");
    link.download = "战力图.png";
    link.href = canvas.toDataURL();
    link.click();
    alert("如图片未自动保存，请点击右上角菜单并选择【分享到微信/保存图片】");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.getElementById("sliders");
  questions.forEach((q, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "range-wrapper";
    wrapper.innerHTML = `
      <span>${q.left}</span>
      <input type="range" min="0" max="100" value="50" id="q${i}" oninput="this.nextElementSibling.innerText=this.value">
      <span>50</span>
    `;
    const label = document.createElement("label");
    label.innerText = q.label;
    sliderContainer.appendChild(label);
    sliderContainer.appendChild(wrapper);
  });
});
