let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;



// console.log(title,price,text,discount,total,count,category,submit)



//get total

function getTotal(){
    if(price.value != ''){
        let result =( +price.value + +taxes.value ) - +discount.value
        total.innerHTML = result;
        total.style.background = '#040';

    }else{
        total.innerHTML = '';
        total.style.background = '#ff0000';
    }
}

//clear inputs

function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    total.innerHTML = '';
    discount.value = '';
    category.value = '';
    count.value = '';
}
//creat 

let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
     datapro = [];
}



submit.onclick = function(){

    let newpro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != ''&& category.value != ''&& newpro.count < 100)
    {
        if(mood === 'create')
        {
           
            if(newpro.count > 1)
            {

                for(let i = 0; i < newpro.count ; i++)
                {
                    datapro.push(newpro)
                }

            } else
            {
               datapro.push(newpro )
            }     
            
        }else
        {
         datapro[  tmp  ] = newpro;
          mood = 'create'
         submit.innerHTML = 'create'
         count.style.display = 'block'
        } 
        cleardata()

    }
   

    

    //save localstorage

    localStorage.setItem('product', JSON.stringify(datapro))
    
    showData()

}




//read

function showData(){

    getTotal()
    let table = '';
    for( let i = 0 ; i < datapro.length; i++ ){
        table +=`
        
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll')
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">deleteAll (${datapro.length })</button>
        `
    }else{
        btnDelete.innerHTML = ``;
    }
}
showData()


//delete

function deleteData(i)
{

   
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData();

}
function deleteAll(){
     alert("all data deleted")
    localStorage.clear()
    // location.reload()
    datapro.splice(0)
    showData()
}

//count

//update

function updateData(i){

    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display='none'
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:'smooth'
    })


}



//search

let searchMood = 'title'


function getsearshMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
       searchMood = 'title'
       search.placeholder = 'search By Title'
    }else{
        searchMood = 'category'
        search.placeholder = 'search By category'
    }
    
    console.log(searchMood)
    
    search.focus()
    search.value = '';
    showData()

}


function searchData(value)
{
    let table = '';
    if(searchMood == 'title'){

        for(let i = 0; i < datapro.length; i++){

            if(datapro[i].title.includes(value.toLowerCase())){

                table +=`
        
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
                </tr>
                `

            }


        }






    }else{
        for(let i = 0; i < datapro.length; i++){

            if(datapro[i].category.includes(value.toLowerCase())){

                table +=`
        
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
                </tr>
                `

            }


        }

    }

    document.getElementById('tbody').innerHTML = table


}













//clean data














