


const universeLoadingData=(dataLimit)=>{
    //start  loader
    dataIsLoaderSpinner(true)


     // sort button show 
     SortByDataBtn(true)
    // sort button 
    sortButtonDisable(false)

   
    url=`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayData(data.data.tools,dataLimit) 
    })
    .catch(error=>console.log(error))
}

//display data 
const displayData=(universeData,dataLimit)=>{

    // if phone item is empty
    if(universeData.length===0){
        itemIsFound(true)
        ShowAllBtn(false)
        

    }else{
        itemIsFound(false)

        if(dataLimit && universeData.length>=dataLimit){
            universeData=universeData.splice(0,dataLimit)
            ShowAllBtn(true)

        }else{
            ShowAllBtn(false)
        }
    }
  
    // short  
    document.getElementById('SortByDataBtn').addEventListener('click',function(){
        SortBYdata(universeData)
    })


    // before item delete 
    // then new item add 
    removeElement('cardContainer')
   
    universeData.forEach(universe=>{
        createElementForCard(universe)
    })

    //stop loader
    dataIsLoaderSpinner(false)

}


// phoneDetails
const  universeDetailsLoad=(id)=>{
   
    // let url=`https://openapi.programming-hero.com/api/ai/tool/${(id<10)? `0${id}` : `${id}`}`
    let url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        universeDetailsDisplay(data.data)
    })
    .catch(error=>{console.log(error)})
}


//  not the best way to load show all  
document.getElementById('showBtn').addEventListener('click',function(){
    universeLoadingData()
    
})

universeLoadingData(6)
