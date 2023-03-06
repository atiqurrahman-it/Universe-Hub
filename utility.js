//when data load  this function call 
const dataIsLoaderSpinner=(isSpinnerLoader)=>{
  const loaderContainer=document.getElementById('loadingSpinner')
  if(isSpinnerLoader){
      loaderContainer.classList.remove('d-none')
  }else{
      loaderContainer.classList.add('d-none')
  }
}

// if phone item not found && item phone fond 
// if contain add or remove 
const itemIsFound=(isFound)=>{
    const errorContainer=document.getElementById('itemNotfound')
    if(isFound){
        errorContainer.classList.remove('d-none')
    }else{
        errorContainer.classList.add('d-none')
    }
}

// data sort button show & hidden
const SortByDataBtn=(SortByDataBtnId)=>{
  const SortByDataBtnElement=document.getElementById('SortByDataBtn')
  if(SortByDataBtnId){
      SortByDataBtnElement.classList.remove('d-none')
  }else{
      SortByDataBtnElement.classList.add('d-none')
  }
}

const sortButtonDisable=(isDisable)=>{
  const sortBtn=document.getElementById('SortByDataBtn')
  if(isDisable){
    sortBtn.setAttribute('disabled',true);

  }else{
    sortBtn.removeAttribute('disabled');
  }

}


// show btn add & remove
const ShowAllBtn=(isShowBtn)=>{
    const showBtnContainer=document.getElementById('showBtnContainer')
    if(isShowBtn){
        showBtnContainer.classList.remove('d-none')
    }else{
        showBtnContainer.classList.add('d-none')
    }

}

// ------------------------------------ main function -------------


// data sort by date 
const SortBYdata=(data)=>{
  // sort button disable 
  sortButtonDisable(true)

  const sortArray=data.sort(function(a,b){
      var dateA = new Date(a.published_in).getTime();
      var dateB = new Date(b.published_in).getTime();
      return dateA < dateB ? 1 : -1; 
    });
   if(data.length<=6){
       displayData(sortArray,6)
   }else{
      displayData(sortArray)
   }
}



// remove  Element 
const removeElement=(elementId)=>{
  const removeElement=document.getElementById(elementId)
  removeElement.innerText=''
}
 

const createElementForCard=(universe)=>{
    console.log(universe)
    const cardContainer=document.getElementById('cardContainer')
    const div=document.createElement('div')
    div.classList.add('col')
    div.innerHTML=`
  
    <div class="card h-100">
     <img src="${universe.image}" style="max-height:170px;" class="card-img-top img-fluid" alt="Img Not Found"/>
      <div class="card-body">
        <h5 class="card-title">Features</h5>
        <div class="card-text">
          <ol>
            ${ universe.features ? `${universe.features.map(fname=>`
            <li> ${fname}</li>
            `).join('')}`: `<li> Feature not Found </li>` }
          </ol>
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="row">
            <div class="col-10">
              <h5>${universe.name ? `${universe.name}`:'name not found '}</h5>
              <p>
                <span><i class="fa-regular fa-calendar"></i></span>
                ${universe.published_in ? `${universe.published_in}`:'date not found'}
              </p>
            </div>
            <div class="col-2">
              <a href="#" onclick="universeDetailsLoad('${universe.id}')" data-bs-toggle="modal" data-bs-target="#universeModal">
                <i class="fa-solid fa-arrow-right text-danger ms-3 pt-4"></i>
              </a>
            </div>
         </div>
       </div>
    </div>
 
  `
  cardContainer.appendChild(div)
}



const universeDetailsDisplay=(data)=>{
    console.log(data)
    const universeModalContainerElement=document.getElementById('universeModalContainer')
    universeModalContainerElement.innerHTML=`
    <div class="col border border-danger-subtle p-3">
    <div class="row">
      <div class="col-12">
       ${data.description ? `${data.description}` :`description not Available`}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
      
     ${data.pricing ? `<div class="row row-cols-1 row-cols-lg-3 g-2 g-lg-3 my-4 fs-3">
     <div class="col text-success">
         ${data.pricing[0].price==='No cost' || data.pricing[0].price==='0' ? ' <th>free of cost / basic</th>' :`<th scope="col">${data.pricing[0].price} ${data.pricing[0].plan}</th>`}
     </div>
     <div class="col text-warning">
       ${data.pricing[1].price==='No cost' ? ' <th>free of cost/ pro</th>' :`<th scope="col">${data.pricing[1].price} ${data.pricing[1].plan}</th>`}

     </div>
     <div class="col text-danger">
         ${data.pricing[2].price==='No cost' ? ' <th>free of cost</th>' :`<th scope="col">${data.pricing[2].price} ${data.pricing[2].plan}</th>`}
     </div>
   </div>`: `
   <div class="row row-cols-1 row-cols-lg-3 g-2 g-lg-3 my-4 fs-3">
   <div class="col text-success">
     Free of Cost/ Basic
   </div>
   <div class="col text-warning">
   Free of Cost/ Pro
   </div>
   <div class="col text-danger">
   Free of Cost/ Enterprise
   </div>
 </div>
   `}
             
    </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h6>Features</h6>
        <ul>
        ${data.features? `${Object.keys(data.features).map(e => `<li>${data.features[e].feature_name}</li>`).join('')}`:`feature not found `}
        </ul>
      </div>
      <div class="col-md-6">
        <h6>Integrations</h6>
        <ul>
        ${data.integrations? ` ${data.integrations.map(fname=>`
        <li> ${fname}</li>
      `).join('')}`: ` No Data found `}
        </ul>
      </div>
    </div>
  </div>
  <div class="col">
     <div class="imgContainer">
     <img src="${data.image_link[0]? `${data.image_link[0]}`:`${data.image_link[1]}`}" class="img-fluid  position-relative" alt="" />
     ${data.accuracy.score? `<button style="margin-left:-140px; margin-top:5px;" class="btn btn-danger position-absolute" > ${data.accuracy.score*100}% accuracy </button>
     ` : ''}
     </div>

     <h5 class="mt-3">${data.input_output_examples? `${data.input_output_examples[0].input}`: 'Data Not  found'}?</h5>
  
     <p class="mb-3">
     ${data.input_output_examples ? `${data.input_output_examples[1].output}`: 'No ! Not  Yet! Take a Break!!! '}
     </p>

  </div>
    `
}

