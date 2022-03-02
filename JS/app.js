    // -----spinner add start----------
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
  }
//   const toggleSearchResult = displayStyle => {
//     document.getElementById('phone-details').style.display = displayStyle;
//   }
//   -----spinner add end----------
    // ------------Display Search Phone---------
const searchPhone = () => {
    // console.log('hello');
    const searchField = document.getElementById('search-field');
    const error = document.getElementById('error');
    //  display spinner 
    toggleSpinner('block');
    
    // toggleSearchResult('none');
    let searchText = searchField.value;
    // console.log(searchText);
   searchField.value='';
if(searchText == "" || searchText<=0){
  
  searchField.value = '';
    error.innerHTML=`
    <div class="card p-3 text-center" style="width: 25rem; height: 15rem;">
    <div class="card-body">
      <h5 class="card-title mt-5">Please Search Phone Name, try again</h5>
      
    </div>
  </div>
    `; 
    
    toggleSpinner('none');
    // toggleSpinner('none') 
}

else{ 
    error.innerHTML = '';
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
    // --------see all button-------------- 
    const seeAllButton = document.getElementById('seeall-button');
    console.log(seeAllButton,"hello");

    searchResult.textContent = '';
    if(phones==""){ 
        error.innerHTML=`
        <div class="card p-3 text-center" style="width: 25rem; height: 15rem;">
        
        <div class="card-body">
          <h5 class="card-title mt-5">No Phone Found,Please try again</h5>
          
        </div>
      </div>
        `;  
        toggleSpinner('none');
    }
        // console.log(phone);
     else{
        phones?.slice(0,20).forEach(phone => {
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-3 text-center" style="width: 18rem;">
            <img  src="${phone.image}" class="card-img-top w-50 ms-5" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
              <button onclick="phoneDetails('${phone.slug}')" class="btn seeDetails btn-primary">See Details</button>
            </div>
          </div>
            `
            searchResult.appendChild(div);
            toggleSpinner('none'); 
        });
        // toggleSearchResult('block');
     }
    }






    // --------------Phone Details api part start -------------- 
    const phoneDetails = id => {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        // console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
        // searchResult.innerHTML="";
    }
// --------------Phone Details part end -------------- 
// --------------Phone Details dainamic part start -------------- 
    const displayPhoneDetails = phoneId => {
        // console.log(phoneId);  
        toggleSpinner('block')    
     const phoneDetailsId = document.getElementById('phone-details');
       phoneDetailsId.textContent = ''; 
       const div = document.createElement('div')
       div.classList.add('card');
       div.innerHTML = `
       <div style="width: 25rem; class="card " >
   <div class=" p-3 phonecard">
    <img src="${phoneId.image}" class="card-img-top defaultcard" alt="...">
    <div class="card-body ">
      <h4 class="text-primary">PhoneName: <span class="othertext">${phoneId.name}</span> </h4>
      <h5 class="text-primary text-center">Brand: <span class="othertext">${phoneId.brand}</span></h5>
      <h5 class="text-center text-primary">ReleaseDate: <span class="othertext">${phoneId.releaseDate? phoneId.releaseDate: 'Release data no found!'}</span></h5>
      <div class="d-flex justify-content-between align-content-center">
      <div>
      <h6 class="text-primary ms-3 fw-bold ">Main Feature: 
      <ul class="phone-feature">
      <li><span class="othertext">Storage:</span> ${phoneId.mainFeatures.storage}</li>
      <li><span class="othertext">DisplaySize:</span> ${phoneId.mainFeatures.displaySize}</li>
      <li><span class="othertext">ChipSet: </span> ${phoneId.mainFeatures.chipSet}</li>
      <li><span class="othertext">Memory: </span> ${phoneId.mainFeatures.memory}</li>
      </ul>
      </h6>
      </div>
     <div>
     <h6 class="ms-3 text-primary  fw-bold ">Others Details: 
     <ul class="phone-feature">
     <li><span class="othertext">WLAN:</span> ${phoneId.others?.WLAN? phoneId.others.WLAN: 'not found' }</li>
     <li><span class="othertext">Bluetooth:</span> ${phoneId.others?.Bluetooth? phoneId.others.Bluetooth: 'not found'}</li>
     <li><span class="othertext">GPS:</span> ${phoneId.others?.GPS? phoneId.others.GPS: 'not found'}</li>
     <li><span class="othertext">NFC: </span>${phoneId.others?.NFC? phoneId.others.NFC:'not found'}</li>
     <li><span class="othertext">USB: </span>${phoneId.others?.USB? phoneId.others.USB:'not found'}</li>
     <li><span class="othertext">Radio:</span> ${phoneId.others?.Radio? phoneId.others.Radio:'not found'}</li>
     </ul>
     </h6>
     </div>
      </div>
      
    </div>
   </div>
  </div>

  <h6 class="ms-5 text-primary  fs-5 fw-bold ">Sensore: 
  <ul class="phone-feature ">
  <span class="othertext">${phoneId.mainFeatures.sensors[0]}</span> 
  <li><span class="othertext">${phoneId.mainFeatures.sensors[1]}</span> </li>
  <li><span class="othertext">${phoneId.mainFeatures.sensors[2]}</span> </li>
  <li><span class="othertext">${phoneId.mainFeatures.sensors[3]}</span> </li>
  <li><span class="othertext"> ${phoneId.mainFeatures.sensors[4]}</span></li>
  <li><span class="othertext">${phoneId.mainFeatures.sensors[5]}</span> </li>
 
  </ul>
  </h6>
       `
      
       phoneDetailsId.appendChild(div);
       toggleSpinner('none');
       
    }
     
  
   // --------------Phone Details dainamic part end -------------- 
   