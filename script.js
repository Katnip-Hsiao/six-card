window.onload = function () {
  const name = localStorage.getItem("nickname") || "未命名战士";
  document.getElementById("nicknameTitle").innerText = name + " 的六边形战力图";
  const scores = [1, 2, 3, 4, 5, 6].map(i =>
    parseInt(localStorage.getItem("score" + i)) || 0
  );
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const maxIndex = scores.indexOf(Math.max(...scores));
  const labels = ["有理想", "敢担当", "守纪律", "肯奋斗", "善协作", "勇创新"];
  new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: labels,
      datasets: [{
        label: "战力值",
        data: scores,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)"
      }]
    },
    options: {
      scales: { r: { beginAtZero: true, max: 100 } },
      responsive: true,
    }
  });
  const titles = ["信仰持盾者", "勇毅先锋官", "守序律法师", "燃力实践家", "中枢协调者", "睿思策划人"];
  const quotes = [
    "你不是在喊口号，而是在每一个孤独的时刻也不放下信仰的火光。",
    "你是那个敢于第一个出发的人，用实际行动为他人扫清路径。",
    "规则不是束缚，而是你给这个世界的信任契约。",
    "没人比你更知道坚持意味着什么。",
    "你是团队衔接的引擎，所有齿轮因你而顺畅。",
    "你的看见角度不同的维度，也能给幻想落地为真。"
  ];
  document.getElementById("titleArea").innerText = "🏅 称号：" + titles[maxIndex];
  document.getElementById("quote").innerText = quotes[maxIndex];
};

function saveImage() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    link.download = "六边形战力卡.png";
    link.href = canvas.toDataURL();
    link.click();
    alert("图片已生成！如无法保存，请点击右上角“…” → 选择‘在浏览器中打开’后再操作。");
  });
}
