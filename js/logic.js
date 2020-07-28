let noSquare = 6;
let statusWin = false;
const sModes = ["RGB", "CMYK", "HEX"];
let sMode = sModes[Math.floor(Math.random() * 3)];
const modes = document.querySelectorAll(".mode");
const levels = document.querySelectorAll(".level");
const squares = document.querySelectorAll(".square");

document.querySelector("body").onload = () => {
    reset();
    document.getElementById(
        "description"
    ).innerHTML = `Choose the matching coloured square with this <strong>${sMode}</strong> colour code.`;
    if (sMode === "RGB") {
        document.getElementById("colorDisplay").textContent = RGB();
    } else if (sMode === "CMYK") {
        document.getElementById("colorDisplay").textContent = CMYK();
    } else {
        document.getElementById("colorDisplay").textContent = HEX();
    }
};

document.getElementById("reColor").addEventListener("click", (e) => {
    e.preventDefault();
    reset();
    if (sMode === "RGB") {
        document.getElementById("colorDisplay").textContent = RGB();
    } else if (sMode === "CMYK") {
        document.getElementById("colorDisplay").textContent = CMYK();
    } else {
        document.getElementById("colorDisplay").textContent = HEX();
    }
});

for (const mode of modes) {
    mode.addEventListener("click", (e) => {
        e.preventDefault();
        reset();
        if (mode.textContent === "RGB") {
            sMode = "RGB";
            document.getElementById("colorDisplay").textContent = RGB();
        } else if (mode.textContent === "CMYK") {
            sMode = "CMYK";
            document.getElementById("colorDisplay").textContent = CMYK();
        } else {
            sMode = "HEX";
            document.getElementById("colorDisplay").textContent = HEX();
        }
        document.getElementById(
            "description"
        ).innerHTML = `Choose the matching coloured square with this <strong>${sMode}</strong> colour code.`;
    });
}

for (const level of levels) {
    level.addEventListener("click", (e) => {
        e.preventDefault();
        if (level.textContent === "Easy") {
            document.getElementById("hard").style.display = "none";
            noSquare = 3;
        } else {
            document.getElementById("hard").style.display = "block";
            noSquare = 6;
        }
        document.getElementById("reColor").click();
    });
}

const RGB = () => {
    const squares = document.querySelectorAll(".square");
    const colors = [];
    for (const square of squares) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        colors.push([r, g, b]);
    }
    const pos = Math.floor(Math.random() * noSquare);
    return colors[pos][0] + " , " + colors[pos][1] + " , " + colors[pos][2];
};

const CMYK = () => {
    const squares = document.querySelectorAll(".square");
    const colors = [];
    for (const square of squares) {
        let c = Math.floor(Math.random() * 100);
        let m = Math.floor(Math.random() * 100);
        let y = Math.floor(Math.random() * 100);
        let k = Math.floor(Math.random() * 100);
        let r = 255 * (1 - c / 100) * (1 - k / 100);
        let g = 255 * (1 - m / 100) * (1 - k / 100);
        let b = 255 * (1 - y / 100) * (1 - k / 100);
        square.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        colors.push([c, m, y, k]);
    }
    const pos = Math.floor(Math.random() * noSquare);
    return (
        colors[pos][0] + " , " + colors[pos][1] + " , " + colors[pos][2] + " , " + colors[pos][3]
    );
};

const HEX = () => {
    const squares = document.querySelectorAll(".square");
    const colors = [];
    for (const square of squares) {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        square.style.backgroundColor = "#" + n.slice(0, 6);
        colors.push("#" + n.slice(0, 6));
    }
    const pos = Math.floor(Math.random() * noSquare);
    return colors[pos];
};

const right = (rtSquare) => {
    statusWin = true;
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.style.backgroundColor = rtSquare.style.backgroundColor;
    }
    document.getElementById("msgWin").style.display = "block";
    document.getElementById("reColor").classList.remove("btn-primary");
    document.getElementById("reColor").classList.add("btn-success");
    document.getElementById("reColor").textContent = "Play Again!";
};

const wrong = (square) => {
    square.style.backgroundColor = "inherit";
};

for (const square of squares) {
    square.addEventListener("click", () => {
        if (sMode === "RGB") {
            let col = square.style.backgroundColor;
            col = col.replace("rgb(", "").replace(")", "").replace(/ /g, "").replace(/,/g, " , ");
            if (col === document.getElementById("colorDisplay").textContent) {
                right(square);
            } else {
                wrong(square);
            }
        } else if (sMode === "CMYK") {
            let col = document.getElementById("colorDisplay").textContent;
            col = col.replace(/ /g, "").split(",");
            let c = Number(col[0]);
            let m = Number(col[1]);
            let y = Number(col[2]);
            let k = Number(col[3]);
            let r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
            let g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
            let b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
            if (square.style.backgroundColor === "rgb(" + r + ", " + g + ", " + b + ")") {
                right(square);
            } else {
                wrong(square);
            }
        } else {
            let col = square.style.backgroundColor;
            col = col.replace("rgb(", "").replace(")", "").replace(/ /g, "").split(",");
            let r = parseInt(col[0], 10).toString(16);
            let g = parseInt(col[1], 10).toString(16);
            let b = parseInt(col[2], 10).toString(16);
            r = r.length == 1 ? "0" + r : r;
            g = g.length == 1 ? "0" + g : g;
            b = b.length == 1 ? "0" + b : b;
            if ("#" + r + g + b === document.getElementById("colorDisplay").textContent) {
                right(square);
            } else {
                wrong(square);
            }
        }
    });
}

for (const square of squares) {
    square.addEventListener("dblclick", () => {
        if (statusWin === true) {
            document.getElementById("reColor").click();
        }
    });
}

const reset = () => {
    document.getElementById("msgWin").style.display = "none";
    document.getElementById("reColor").classList.add("btn-primary");
    document.getElementById("reColor").classList.remove("btn-success");
    document.getElementById("reColor").textContent = "Refresh Colours";
    statusWin = false;
};

// ----------------------------- DARK MODE ------------------------------

const dmOptions = {
    bottom: "12px",
    right: "16px",
    left: "unset",
    time: "0.4s",
    mixColor: "#fff",
    backgroundColor: "#fff",
    buttonColorDark: "#1a001a",
    buttonColorLight: "#ffffcc",
    saveInCookies: false,
    label: "🌓",
    autoMatchOsTheme: true,
};
