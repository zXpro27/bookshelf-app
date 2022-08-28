const searchBox = document.querySelector('.search-box'),
  searchValue = document.querySelector('.search-bar');

// event bubbling
searchBox.addEventListener('click', (e) => {
  // search bar
  if (e.target.className === 'search-icon') {
    e.preventDefault();
    e.target.parentElement.parentElement.classList.add('icon');
    e.target.classList.add('icon');

    setTimeout(() => {
      e.target.parentElement.setAttribute('type', 'button');
    }, 200);

    setTimeout(() => {
      e.target.parentElement.parentElement.classList.remove('icon');
      e.target.classList.remove('icon');
      e.target.parentElement.removeAttribute('type');
    }, 9000);
  }

  if (e.target.parentElement.hasAttribute('type')) {
    const searchCard = document.querySelectorAll('.card-body');
    const searchBar = document.querySelector('.search-bar');
    const getTitle = searchBar.value.toUpperCase();
    
    for (let i = 0; i < searchCard.length; i++) {
      const txtValue = searchCard[i].textContent || searchCard[i].innerText;
      
      if (txtValue.toUpperCase().indexOf(getTitle) > -1) {
        searchCard[i].style.display = ''
      } else {
        searchCard[i].style.display = 'none';
      }
    }
  }
  
  searchValue.value = '';
});
