const products = [
    { id: 1, name: 'Product A', price: 10 },
    { id: 3, name: 'Product C', price: 20 },
    { id: 2, name: 'Product B', price: 15 }
    // Add more products as needed
];

// Function to display products in the table
function displayProducts(products) {
    const tbody = document.getElementById('productsBody');
    tbody.innerHTML = '';
    products.forEach(function(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initial display of products
displayProducts(products);

// Function to sort the table
function sortTable(column) {
    const tbody = document.getElementById('productsBody');
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    // Determine the sorting order (ascending or descending)
    const sortOrder = tbody.getAttribute('data-sort-order') || 'asc'; //basically setting the default sort order to ascending

    // Sort the rows based on the clicked column
    rows.sort(function(a, b) {
        const valueA = a.getElementsByTagName('td')[column].textContent.trim();//[td,td][0,1 etc]
        const valueB = b.getElementsByTagName('td')[column].textContent.trim();

        if (column === 2) {
            // Sort numerically for the price column
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;//returna value of a-b
        } else {
            // Sort alphabetically for other columns
            return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
    });


    // Clear the existing table body
    tbody.innerHTML = '';

    // Append the sorted rows to the table body
    for (var i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

    // Toggle the sorting order
    tbody.setAttribute('data-sort-order', sortOrder === 'asc' ? 'desc' : 'asc');
}

// Function to filter the table
function filterProducts(x) {
    const searchTerm = x.target.value.toLowerCase();
    const listItems = document.querySelectorAll('#productsBody tr');
    
    listItems.forEach(function(item){
        item.style.display = 'revert';

        if (!item.innerText.toLowerCase().includes(searchTerm)) {
            item.style.display = 'none';
        }
    })
}