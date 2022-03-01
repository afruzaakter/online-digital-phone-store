    // ------------Display Search Phone---------
const searchPhone = () => {
    // console.log('hello');
    const searchField = document.getElementById('search-field');
    const error = document.getElementById('error');

    let searchText = searchField.value;
    // console.log(searchText);

if(searchText == "" || searchText<=0){
    error.innerText='Please Search Phone Name,try again';
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
    searchResult.textContent = '';
    if(phones==""){
        alert('Show no result found, Please search Phone name , try again')
        
        // error.innerText='Please try again';   
    }
        // console.log(phone);
     else{
        phones?.forEach(phone => {
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-3 text-center" style="width: 18rem;">
            <img  src="${phone.image}" class="card-img-top w-50 ms-5" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
              <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
          </div>
            `
            searchResult.appendChild(div);
        });
     }
   
    }

    const phoneDetails = id => {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        // console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
    }

    const displayPhoneDetails = phoneId => {
        console.log(phoneId);
     const phoneDetailsId = document.getElementById('phone-details');
       phoneDetailsId.textContent = ''; 
       const div = document.createElement('div')
       div.classList.add('card');
       div.innerHTML = `
       
       <div style="width: 18rem; class="card text-center mb-5 p-5" class="phonecard">
       <img src="${phoneId.image}" class="card-img-top defaultcard" alt="...">
       <div class="card-body ">
         <h4>PhoneName:${phoneId.name} </h4>
         <h5 class="card-text">${phoneId.brand}</h5>
         <h6>ReleaseDate:${phoneId.releaseDate}</h6>
         <div class="d-flex justify-content-between align-content-center">
         <div>
         <h5>Main Feture: 
         <ul class="phone-feature">
         <li>Storage: ${phoneId.mainFeatures.storage}</li>
         <li>DisplaySize: ${phoneId.mainFeatures.displaySize}</li>
         <li>ChipSet: ${phoneId.mainFeatures.chipSet}</li>
         <li>Memory: ${phoneId.mainFeatures.memory}</li>
         </ul>
         </h5>
         </div>
        <div>
        <h5>Others: 
        <ul class="phone-feature">
        <li>Storage: ${phoneId.others.WLAN}</li>
        <li>DisplaySize: ${phoneId.others.Bluetooth}</li>
        <li>ChipSet: ${phoneId.others.GPS}</li>
        <li>Memory: ${phoneId.others.NFC}</li>
        <li>Memory: ${phoneId.others.Radio}</li>
        </ul>
        </h5>
        </div>
         </div>
         
       </div>
     </div>

       `
       phoneDetailsId.appendChild(div)
    }


   