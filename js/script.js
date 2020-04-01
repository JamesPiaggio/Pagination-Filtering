// Global variables
const studentItem = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector('.page');
let searchResults = [];
const itemsPerPage = 10;

// Appends searchbar to html
const searchDiv = document.createElement('div');
const searchField = document.createElement('input');
const searchButton = document.createElement('button');
document.querySelector('.page-header').appendChild(searchDiv);
searchDiv.appendChild(searchField);
searchDiv.appendChild(searchButton);

// Adds attributes to searchbar
searchDiv.className = 'student-search';
searchButton.textContent = 'Search';
searchField.placeholder = 'Search for students...';

// Creates no results message
const messageDiv = document.createElement('div');
const noResult = document.createElement('h3');
noResult.textContent = 'Sorry, there are no results...'
messageDiv.appendChild(noResult);
pageDiv.appendChild(messageDiv);
messageDiv.style.display = 'none';

// resetPageLinks function
const resetPageLinks = () => {
    // Removes current Pagination links
    document.getElementsByClassName("pagination")[0].innerHTML = ' '; 
    pageDiv.removeChild(document.querySelector('.pagination'));
}

// searchList function
const searchList = (list) => {
    // For loop to compare search input to student list
    for (let i = 0; i < list.length; i++) {
        const student = list[i];
        // Sets student's h3 Element
        const name = student.firstElementChild.children[1];
        if (searchField.length !== 0 && name.textContent.toLowerCase().includes(searchField.value.toLowerCase())) {
            searchResults.push(student);
        } else {
            student.style.display = 'none';
            }
    }
    // Show no result message if searchResults is empty
    if (searchResults.length === 0) {
        messageDiv.style.display = 'block';
    } else {
        messageDiv.style.display = 'none';
    }
    appendPageLinks(searchResults);
    // Resets searchResults
    searchResults = [];
}

// Event Listeners for searchDiv
searchDiv.addEventListener('click', (e) => {
    resetPageLinks();
    searchList(studentItem);
    });


searchDiv.addEventListener('keyup', () => {
    resetPageLinks();
    searchList(studentItem);
});

// appendPageLinks function
const appendPageLinks = (list) => {
    // Example: Math.ceil(54 / 10) = 6
    const pageAmount = Math.ceil(list.length / itemsPerPage);
    // Creates Pagination div
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.className = 'pagination';
    pageDiv.appendChild(div);
    // Creates page links depending on pageAmount
    for (let i = 0; i < pageAmount; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        div.appendChild(ul);
        a.href = '#';
        a.textContent = i + 1;
        li.appendChild(a);
        ul.appendChild(li);
        // Gives first pagination link the class 'active'
        ul.firstElementChild.firstElementChild.className = 'active';
    }
    div.appendChild(ul);
    pageDiv.appendChild(document.querySelector('.pagination'));
    showPage(list, 1);
}

// showPage function
const showPage = (list, page) => {
    // Example: (2 * 10) - 10 = 10
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    // Example: 2 * 10 = 20
    const endIndex = page * itemsPerPage;
    // For loop to select the students to show on page
    for(let i = 0; i < list.length; i++) {
        // If student index is between startIndex and endIndex, show
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        }
    }  
    // Pagination event listener to show corresponding page when link is 'clicked'
    document.querySelector('.pagination').addEventListener('click', (e) => {
        // Link selected
        const pageLink = event.target;
        // Active link
        const activeLink = document.querySelector('.active');
        // Removes 'active' class from activeLink and gives to pageLink
        activeLink.className = '';
        pageLink.className = 'active';
        showPage(list, pageLink.textContent);    
    });
}

// Initial pagination
appendPageLinks(studentItem);