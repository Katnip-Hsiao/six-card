
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

  const titles1 = ["信仰持盾者", "勇毅先锋官", "秩序掌舵者", "燃力实践家", "中枢协同者", "睿思策划人"];
  const quotes1 = [
    "你不是在喊口号，而是在每一个孤独的时刻也不放下信仰的火光。",
    "你是那个站在第一个山坡的人，用实际行动为他人扫清路径。",
    "规则不是枷锁，而应像这个世界的信任契约。",
    "没人比你更知道坚持意味着什么。",
    "你是团队作战的引擎，所有齿轮因你而顺畅。",
    "你能看见角落的曙光，也愿意幻想成真地为人所用。"
  ];
  const titles2 = ["秩序引路人", "协作成长者", "愿景萌芽者", "稳进守航者", "蓄势奋进者", "创意探索者"];
  const quotes2 = [
    "你用理性与自律，为团队铺出一条既稳又进的路。",
    "你安静扎根，不争不抢，却始终朝着光亮的方向生长。",
    "你不急于证明自己，而是悄悄积蓄能量，等待那场属于你的发光时刻。",
    "哪怕只是一点点改进，你也愿意默默坚持，让变化悄然发生。",
    "你用沉默思考，用细节表达，把每一次前行都藏在不声不响的努力里。",
    "你不随风起舞，也不等人喝彩，只在自己的节奏里稳稳前行。"
  ];

  const high = avg >= 70;
  const idx = maxIndex;
  document.getElementById("titleArea").innerText = "🏅 称号：" + (high ? titles1[idx] : titles2[idx]);
  document.getElementById("quote").innerText = high ? quotes1[idx] : quotes2[idx];
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
