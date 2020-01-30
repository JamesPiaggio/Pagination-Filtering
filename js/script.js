/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
// Global variables
const studentItem = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector('.page');
const searchResults = [];
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
    pageDiv.removeChild(document.querySelector('.pagination'));
    studentItem.style.display = 'none';
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
    return searchResults;
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
}

// appendPageLinks function
const appendPageLinks = (list) => {
    const pageAmount = Math.ceil(list.length / itemsPerPage);
    const div = document.createElement('div');
    div.className = 'pagination';
    pageDiv.appendChild(div);
    const ul = document.createElement('ul');
    div.appendChild(ul);
    for (let i = 0; i < pageAmount; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i + 1;
        li.appendChild(a);
        ul.appendChild(li);
    }
    ul.firstElementChild.firstElementChild.className = 'active';   
    showPage(studentItem, 1);
    div.addEventListener('click', (e) => {
        const pageLink = event.target;
        const activeLink = document.querySelector('.active');
        activeLink.className = '';
        pageLink.className = 'active';
        showPage(studentItem, pageLink.textContent);    
    });
}

// Event Listeners
searchDiv.addEventListener('click', (e) => {
    searchList(searchField, studentItem);
    resetPageLinks();
    appendPageLinks(searchResults);
    showPage(searchResults, 1);
    });


searchDiv.addEventListener('keyup', () => {
    searchList(searchField, studentItem);
    resetPageLinks();
    appendPageLinks(searchResults);
    showPage(searchResults, 1);
});

appendPageLinks(studentItem);