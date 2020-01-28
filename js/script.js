/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
// Global variables
const studentItem = document.querySelectorAll('.student-item');
const itemsPerPage = 10;



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
    const pageDiv = document.querySelector('.page');
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
        
    })
}
appendPageLinks(studentItem);

