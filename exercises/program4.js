/*
    4) Rezolvați un sistem liniar de 4 ecuații cu 4 necunoscute prin metoda lui Gauss. 
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
            td.textContent = value.toFixed(3);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    card.appendChild(table);
    output.appendChild(card);
}

function gaussSolve(A, b) {
    const n = A.length;

    const M = A.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i++) {
        
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
                maxRow = k;
            }
        }
        [M[i], M[maxRow]] = [M[maxRow], M[i]];

        // Eliminare
        for (let k = i + 1; k < n; k++) {
            const factor = M[k][i] / M[i][i];
            for (let j = i; j <= n; j++) {
                M[k][j] -= factor * M[i][j];
            }
        }
    }

    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += M[i][j] * x[j];
        }
        x[i] = (M[i][n] - sum) / M[i][i];
    }

    return x;
}

const A = [
    [2, -1, 1, 3],
    [1, 3, 2, -2],
    [3, 1, 4, 4],
    [4, 2, 2, 1]
];

const b = [10, 5, 20, 11];

printMatrix(A, "Matricea A (coeficienți)");
printText("Vectorul b:");
printText(b.join(" "));

const x = gaussSolve(A, b);
printText("Soluția sistemului:");
printText("x1 = " + x[0].toFixed(3) + ", x2 = " + x[1].toFixed(3) + ", x3 = " + x[2].toFixed(3) + ", x4 = " + x[3].toFixed(3));
