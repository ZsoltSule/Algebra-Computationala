/*
    14) Folosind algoritmul lui Euclid calculați cmmdc (d) pentru două numere naturale date
    (a,b), scrieți o combinație liniară a celor trei (a,b,d), afișați fracția continuă asociată lui a/b. 
*/

function printText(text) {
    const output = document.getElementById("output");
    const card = document.createElement("div");
    card.className = "result-card";
    const p = document.createElement("p");
    p.textContent = text;
    card.appendChild(p);
    output.appendChild(card);
}

function extendedEuclid(a, b) {
    if (b === 0) {
        return { d: a, x: 1, y: 0 };
    }
    const next = extendedEuclid(b, a % b);
    return {
        d: next.d,
        x: next.y,
        y: next.x - Math.floor(a / b) * next.y
    };
}

function continuedFraction(a, b) {
    const terms = [];
    while (b !== 0) {
        terms.push(Math.floor(a / b));
        let temp = a % b;
        a = b;
        b = temp;
    }
    return terms;
}

function computeAll(a, b) {
    printText(`Numerele date: a = ${a}, b = ${b}`);

    const ext = extendedEuclid(a, b);
    const d = ext.d;
    printText(`CMMDC(a, b) = ${d}`);

    printText(`Combinația liniară: ${a}·(${ext.x}) + ${b}·(${ext.y}) = ${d}`);

    const cf = continuedFraction(a, b);
    printText("Fracția continuă a lui a/b este: [" + cf.join(", ") + "]");
}

computeAll(252, 198);

