/* 
    10) Afișați toate cuvintele unui cod a cărui matrice generatoare se cuoaște. 
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

function printMatrix(matrix, name) {
    const output = document.getElementById("output");
    const card = document.createElement("div");
    card.className = "result-card";

    const title = document.createElement("h3");
    title.textContent = name;
    card.appendChild(title);

    const table = document.createElement("table");
    table.className = "matrix-table";

    matrix.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    card.appendChild(table);
    output.appendChild(card);
}

function printWordsTable(rows, name) {
    const output = document.getElementById("output");
    const card = document.createElement("div");
    card.className = "result-card";

    const title = document.createElement("h3");
    title.textContent = name;
    card.appendChild(title);

    const table = document.createElement("table");
    table.className = "matrix-table";

    const thead = document.createElement("tr");
    ["#","Mesaj (m)", "Cuvânt cod (c)"].forEach(h => {
        const th = document.createElement("td");
        th.style.fontWeight = "700";
        th.textContent = h;
        thead.appendChild(th);
    });
    table.appendChild(thead);

    rows.forEach((r, idx) => {
        const tr = document.createElement("tr");
        const tdIdx = document.createElement("td");
        tdIdx.textContent = idx + 1;
        tr.appendChild(tdIdx);

        const tdM = document.createElement("td");
        tdM.textContent = r.m.join("");
        tr.appendChild(tdM);

        const tdC = document.createElement("td");
        tdC.textContent = r.c.join("");
        tr.appendChild(tdC);

        table.appendChild(tr);
    });

    card.appendChild(table);
    output.appendChild(card);
}

function multiplyMessageByG(message, G) {
    const k = message.length;
    const n = G[0].length;
    const c = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let i = 0; i < k; i++) {
            sum += message[i] * G[i][j];
        }
        c[j] = sum % 2;
    }
    return c;
}

function allMessages(k) {
    const total = 1 << k;
    const msgs = [];
    for (let num = 0; num < total; num++) {
        const m = [];
        for (let i = k - 1; i >= 0; i--) {
            m.push((num >> i) & 1);
        }
        msgs.push(m);
    }
    return msgs;
}

const G = [

    [1, 0, 1, 1, 0], 
    [0, 1, 1, 0, 1], 
    [1, 1, 0, 1, 1]  
];

const k = G.length;
const n = G[0].length;

printMatrix(G, "Matricea generator G (" + k + " x " + n + ")");

const messages = allMessages(k);
const words = messages.map(m => {
    const c = multiplyMessageByG(m, G);
    return { m, c };
});

printText("Număr total de mesaje: " + messages.length);
printWordsTable(words, "Toate cuvintele codului (mesaj → cod)");

