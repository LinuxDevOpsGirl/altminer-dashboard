function preload() {
  data = loadJSON("data.json")
}

function setup() {
  createCanvas(600, 276);
  frameRate(0.1);
  latestprice = data["price"][data["price"].length - 1];
  pricechart = new PriceChart(60, 10);
  balancechart = new BalanceChart(60, 150);
  config = loadJSON("config.json")
  data = loadJSON("data.json", show)
  stroke(255);
  textAlign(RIGHT);
}

function draw() {
  data = loadJSON("data.json", show)

}

function show() {
  background(42);
  noStroke();
  document.getElementById("earned").innerHTML = "€" + floor((data["balance"][data["balance"].length - 1] * data["price"][data["price"].length - 1]) * 100) / 100;
  if ((data["price"][data["price"].length - 1] - data["price"][0]) / data["price"][0] > 0) {
    document.getElementById("price-percent").innerHTML = "▲ %" + Math.floor((data["price"][data["price"].length - 1] - data["price"][0]) / data["price"][0] * 10000) / 100
    document.getElementById("price-percent").style.color = "#00ff00"
  } else {
    document.getElementById("price-percent").innerHTML = "▼ %" + Math.floor((data["price"][data["price"].length - 1] - data["price"][0]) / data["price"][0] * 10000) / 100
    document.getElementById("price-percent").style.color = "#ee0000"
  }
  if (data["online"] == true) {
    document.getElementById("on-off").innerHTML = "online"
    document.getElementById("on-off-circle").innerHTML = "#<circle id=\"\"cx=\"4\"cy=\"4\"r=\"4\"stroke=\"black\"stroke-width=\"1\"fill=\"#00ff00\"/> <span id=\"on-off\"style=\"color: #ffffff\"> online </span>"
  } else {
    document.getElementById("on-off").innerHTML = "offline"
    document.getElementById("on-off-circle").fill = "#<circle id=\"\"cx=\"4\"cy=\"4\"r=\"4\"stroke=\"black\"stroke-width=\"1\"fill=\"#ff0000\"/> <span id=\"on-off\"style=\"color: #ffffff\"> offline </span>"
  }
  document.getElementById("address").innerHTML = "address: " + config["address"] + " |"
  document.getElementById("coin").innerHTML = "coin: " + config["crypto"]
  document.getElementById("price").innerHTML = "€" + data["price"][data["price"].length - 1]
  document.getElementById("hashrate").innerHTML = data["hashrate"][data["hashrate"].length - 1] + " kh/s"
  pricechart.show();
  balancechart.show();
}


function PriceChart(x, y) {
  this.latestprice = data["price"][data["price"].length - 1];

  this.show = function() {
    for (var i = 0; i < data["price"].length; i++) {
      data["price"][i] = parseFloat(data["price"][i]);
    }
    stroke(0, 255, 0);
    highest = 0;
    lowest = Infinity;
    for (var i = 0; i < data["price"].length; i++) {
      if (data["price"][i] > highest) {
        highest = data["price"][i];
      }
      if (data["price"][i] < lowest) {
        lowest = data["price"][i];
      }
    }
    max = highest + highest / 10;
    min = lowest - highest / 10;
    changedprice = [];
    for (var i = 0; i < data["price"].length; i++) {
      changedprice[i] = 1 - (data["price"][i] - min) / (max - min);
    }
    for (var i = 0; i < data["price"].length; i++) {
      line((i * 5) + x, (changedprice[i] * 100) + y, ((i + 1) * 5) + x, (changedprice[i + 1] * 100) + y);
    }

    stroke(100);
    line(x, y, 500 + x, y);
    stroke(100);
    line(x, y + 100, 500 + x, y + 100);
    fill(255);
    textSize(10);
    for (var i = 0; i < 6; i++) {
      noStroke();
      text("€" + (lowest + Math.floor(((highest - lowest)) * (i * 20) * 1) / 100), x - 5, y + 5 + ((5 - i) * 20));
      stroke(100);
      line(x, y + (i * 20), 500 + x, y + (i * 20));
    }
    if (data["price"][data["price"].length - 1] > data["price"][0]) {
      fill(0, 255, 0)
    }
  }
}

function BalanceChart(x, y) {

  this.show = function() {
    for (var i = 0; i < data["balance"].length; i++) {
      data["balance"][i] = parseFloat(data["balance"][i]);
    }
    stroke(0, 100, 255)
    highest = 0;
    lowest = Infinity;
    for (var i = 0; i < data["balance"].length; i++) {
      if (data["balance"][i] > highest) {
        highest = data["balance"][i];
      }
      if (data["balance"][i] < lowest) {
        lowest = data["balance"][i];
      }
    }
    max = highest + highest / 10;
    min = lowest - highest / 10;
    changedbalance = [];
    for (var i = 0; i < data["balance"].length; i++) {
      changedbalance[i] = 1 - (data["balance"][i] - min) / (max - min);
    }
    for (var i = 0; i < data["balance"].length; i++) {
      line((i) + x, (changedbalance[i] * 100) + y, ((i + 1)) + x, (changedbalance[i + 1] * 100) + y);
    }
    stroke(100);
    line(x, y, 500 + x, y);
    line(x, y + 100, 500 + x, y + 100);
    fill(255);
    textSize(10);
    for (var i = 0; i < 6; i++) {
      noStroke();
      text(Math.floor(lowest * 100) / 100 + Math.round(((highest - lowest)) * (i * 20) * 1) / 100 + " " + config["crypto"], x - 5, y + 5 + ((5 - i) * 20));
      stroke(200);
      line(x, y + (i * 20), 500 + x, y + (i * 20));
    }
  }
}