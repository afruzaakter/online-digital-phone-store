    // ------------Display Search Phone---------
const searchPhone = () => {
    // console.log('hello');
    const searchField = document.getElementById('search-field');
    const error = document.getElementById('error');

    let searchText = searchField.value;
    // console.log(searchText);

if(searchText == ""){
    error.innerText='Please Search Phone Name,try again';
}
else if(searchText<=0){
    error.innerText='Please Search phone name,try again';
}
else{ 
    error.innerText = '';
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data));
    searchField.value = '';
}
}

    const displayPhone = phones => {
        // console.log(phones);
        
    const  searchResult = document.getElementById('search-result');
    // console.log(searchResult);
    searchResult.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
      const div = document.createElement('div')
      div.classList.add('col');
      div.innerHTML = `
      <div class="card p-3 text-center" style="width: 18rem;">
      <img  src="${phone.image}" class="card-img-top w-50 ms-5" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        <button class="btn btn-primary">Details</button>
      </div>
    </div>
      `
      searchResult.appendChild(div);

    });

    }