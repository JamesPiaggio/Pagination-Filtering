/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
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

// resetPageLinks function
const resetPageLinks = () => {
    // Removes current Pagination links
    document.getElementsByClassName("pagination")[0].innerHTML = ' '; 
    pageDiv.removeChild(document.querySelector('.pagination'));
}

// searchList function
const searchList = (searchField, list) => {
    for (let i = 0; i < list.length; i++) {
        const student = list[i];
        const name = student.firstElementChild.children[1];
        if (searchField.length !== 0 && name.textContent.toLowerCase().includes(searchField.value.toLowerCase())) {
            searchResults.push(student);
        } else {
            student.style.display = 'none';
            }
    }
    appendPageLinks(searchResults);
    if (searchField.value === '') {
        searchResults = [];
        resetPageLinks();
        appendPageLinks(studentItem);
    }
    
}

// showPage function
const showPage = (list, page) => {
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = page * itemsPerPage;
    for(let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        }
    }  
    document.querySelector('.pagination').addEventListener('click', (e) => {
        const pageLink = event.target;
        const activeLink = document.querySelector('.active');
        activeLink.className = '';
        pageLink.className = 'active';
        showPage(list, pageLink.textContent);    
    });
}

// appendPageLinks function
const appendPageLinks = (list) => {
    const pageAmount = Math.ceil(list.length / itemsPerPage);
    // Pagination div
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.className = 'pagination';
    pageDiv.appendChild(div);
    for (let i = 0; i < pageAmount; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        div.appendChild(ul);
        a.href = '#';
        a.textContent = i + 1;
        li.appendChild(a);
        ul.appendChild(li);
    }
    div.appendChild(ul);
    pageDiv.appendChild(document.querySelector('.pagination'));
    ul.firstElementChild.firstElementChild.className = 'active';   
    showPage(list, 1);
}

// Event Listeners
searchDiv.addEventListener('click', (e) => {
    resetPageLinks();
    searchList(searchField, studentItem);
    });


searchDiv.addEventListener('keyup', () => {
    resetPageLinks();
    searchList(searchField, studentItem);
});

appendPageLinks(studentItem);