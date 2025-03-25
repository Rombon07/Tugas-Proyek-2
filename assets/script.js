let allData = [];
let displayedRows = 10;

document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

async function loadCSV() {
    const response = await fetch('assets/real_estate.csv'); // Pastikan file dapat diakses
    const data = await response.text();
    const rows = data.trim().split('\n'); // Buang spasi berlebih dan pecah per baris

    if (rows.length < 2) return; // Pastikan ada data selain header

    allData = rows.slice(1).map(row => { 
        const cells = row.split(',').map(cell => cell.trim()); // Hapus spasi berlebih
        return cells.length === 6 ? cells : cells.slice(0, 6); // Pastikan jumlah kolom benar
    });

    displayData(displayedRows);
}

function displayData(limit) {
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = '';
    allData.slice(0, limit).forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${index + 1}</td>` + row.map(cell => `<td>${cell}</td>`).join('');
        tableBody.appendChild(tr);
    });

    const loadMoreBtn = document.getElementById('load-more');
    if (limit >= allData.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

document.getElementById('load-more').addEventListener('click', () => {
    displayedRows = allData.length;
    displayData(displayedRows);
});

loadCSV();
