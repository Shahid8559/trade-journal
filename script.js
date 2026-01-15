const addTradeBtn = document.getElementById("addTradeBtn");
const tradeModal = document.getElementById("tradeModal");
const closeModal = document.querySelector(".close");
const tradeForm = document.getElementById("tradeForm");
const tradesTable = document.getElementById("tradesTable").querySelector("tbody");
const winRateEl = document.getElementById("winRate");
const expectancyEl = document.getElementById("expectancy");

let trades = [];

// Open modal
addTradeBtn.addEventListener("click", () => tradeModal.style.display = "block");
closeModal.addEventListener("click", () => tradeModal.style.display = "none");
window.addEventListener("click", e => { if(e.target == tradeModal) tradeModal.style.display = "none"; });

// Add trade
tradeForm.addEventListener("submit", e => {
    e.preventDefault();
    const trade = {
        date: document.getElementById("date").value,
        pair: document.getElementById("pair").value,
        direction: document.getElementById("direction").value,
        entry: parseFloat(document.getElementById("entry").value),
        exit: parseFloat(document.getElementById("exit").value),
        profit: parseFloat(document.getElementById("profit").value),
        notes: document.getElementById("notes").value
    };
    trades.push(trade);
    updateTable();
    tradeForm.reset();
    tradeModal.style.display = "none";
});

// Update Table & Stats
function updateTable() {
    tradesTable.innerHTML = "";
    let wins = 0;
    let totalProfit = 0;

    trades.forEach((t, index) => {
        const row = tradesTable.insertRow();
        row.insertCell(0).textContent = t.date;
        row.insertCell(1).textContent = t.pair;
        row.insertCell(2).textContent = t.direction;
        row.insertCell(3).textContent = t.entry;
        row.insertCell(4).textContent = t.exit;
        row.insertCell(5).textContent = t.profit;
        row.insertCell(6).textContent = t.notes;
        const actionCell = row.insertCell(7);
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => { trades.splice(index, 1); updateTable(); };
        actionCell.appendChild(delBtn);

        if(t.profit > 0) wins++;
        totalProfit += t.profit;
    });

    const winRate = trades.length ? ((wins / trades.length) * 100).toFixed(2) : 0;
    const expectancy = trades.length ? (totalProfit / trades.length).toFixed(2) : 0;
    winRateEl.textContent = winRate + "%";
    expectancyEl.textContent = expectancy;
}
