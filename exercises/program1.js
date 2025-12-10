/*
    1) Verificați dacă inversa unei matrici triunghiulare este tot triunghiulară. 
    Verificați dacă produsul a două matrici triunghiulare este tot matrice triunghiulară. 
*/

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

function printText(text) {
    const output = document.getElementById("output");
    const card = document.createElement("div");
    card.className = "result-card";
    const p = document.createElement("p");
    p.textContent = text;
    card.appendChild(p);
    output.appendChild(card);
}

function isUpperTriangular(matrix) {
    const n = matrix.length;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (matrix[i][j] !== 0) return false;
        }
    }
    return true;
}

function isLowerTriangular(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (matrix[i][j] !== 0) return false;
        }
    }
    return true;
}

function matrixType(matrix) {
    if (isUpperTriangular(matrix)) return "superioară";
    if (isLowerTriangular(matrix)) return "inferioară";
    return "nu este triunghiulară";
}

function inverseMatrix(matrix) {
    const n = matrix.length;
    let I = matrix.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));

    for (let i = 0; i < n; i++) {
        if (matrix[i][i] === 0) throw "Matricea nu este inversabilă!";
        const diag = matrix[i][i];
        for (let j = 0; j < n; j++) {
            matrix[i][j] /= diag;
            I[i][j] /= diag;
        }
        for (let k = 0; k < n; k++) {
            if (k === i) continue;
            const factor = matrix[k][i];
            for (let j = 0; j < n; j++) {
                matrix[k][j] -= factor * matrix[i][j];
                I[k][j] -= factor * I[i][j];
            }
        }
    }
    return I;
}

function multiplyMatrices(A, B) {
    const n = A.length;
    const C = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

const A = [
    [2, 1, 3],
    [0, 1, 4],
    [0, 0, 5]
];

const B = [
    [1, 2, 0],
    [0, 1, 1],
    [0, 0, 2]
];

printMatrix(A, "Matricea A");
printMatrix(B, "Matricea B");

try {
    const A_inv = inverseMatrix(A.map(row => [...row]));
    printMatrix(A_inv, "Inversa lui A");
    printText("Inversa lui A este triunghiulară superioară? " + isUpperTriangular(A_inv));
    printText("Inversa lui A este triunghiulară inferioară? " + isLowerTriangular(A_inv));
} catch (err) {
    printText("Eroare: " + err);
}

const C = multiplyMatrices(A, B);
printMatrix(C, "Produsul A × B");
printText("Produsul A × B este triunghiulară superioară? " + isUpperTriangular(C));
printText("Produsul A × B este triunghiulară inferioară? " + isLowerTriangular(C));
