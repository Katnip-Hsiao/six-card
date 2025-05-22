
window.onload = () => {
  const name = localStorage.getItem("sixCardName") || "未命名战士";
  document.getElementById("displayName").textContent = name;

  const scores = [80, 70, 60, 85, 90, 75]; // 模拟值，可替换为实际
  const labels = ["有理想", "敢担当", "守纪律", "肯奋斗", "善协作", "勇创新"];

  new Chart(document.getElementById("radarChart"), {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: "战力值",
        data: scores,
        fill: true,
        backgroundColor: "rgba(0,123,255,0.2)",
        borderColor: "#007bff",
        pointBackgroundColor: "#007bff"
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { stepSize: 20 }
        }
      }
    }
  });

  const maxIndex = scores.indexOf(Math.max(...scores));
  const title = [
    "信仰持盾者", "责任开拓者", "铁纪守望者",
    "结果推进者", "协同链接者", "变革引领者"
  ][maxIndex];
  const quotes = [
    "你不是在喊口号，而是在每一个孤独的时刻也不放下信仰的火光。",
    "任务面前不退缩，你是团队中最可靠的脊梁。",
    "不逾矩不妄动，因你，秩序始终有据可依。",
    "你是永不熄火的引擎，把普通的事做到极致。",
    "你牵起所有人的手，共同奔赴更大的愿景。",
    "你是站在风口浪尖的那个人，试错也不回头。"
  ];
  document.getElementById("titleArea").textContent = "🎖 称号：" + title;
  document.getElementById("quoteArea").textContent = "💬 " + quotes[maxIndex];
}

function saveImage() {
  html2canvas(document.querySelector("#cardArea")).then(canvas => {
    const link = document.createElement("a");
    link.download = "战力卡.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
