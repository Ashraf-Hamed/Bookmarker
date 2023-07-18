var SiteName  = document.getElementById('SiteName');
var urlName  = document.getElementById('URL');
var addBtn  = document.getElementById('add');
var tbody  = document.getElementById('tbody');
var feedback = document.getElementById('feedback');
var urlfeedback = document.getElementById('urlfeedback');


addBtn.addEventListener('click', () => {
    addTask()
})


Container =[] ;
currentvalue = '' ;

if (localStorage.getItem("task") != null) {
    var Container = JSON.parse(localStorage.getItem("task"));
    displayTask(Container);
  }
  else
   {
    Container = [];
   }

function addTask() {

    if(taskNameRegex() && siteUrlRegex() == true) {
        var item = {
            name : SiteName.value,
            url : urlName.value 
        }
    
        Container.push(item);
        localStorage.setItem("task", JSON.stringify(Container));
        displayTask(Container)
        removetask()
        feedback.innerHTML = '';
        urlfeedback.innerHTML = '';
    }
    else {
        notValidation()
    }
   
    
}


function displayTask(task) {
 
    row = "";

    for(var i=0; i<task.length; i++) {
        row += `
               <tr>
               <td>${[i+1]}</td>
               <td class="hightlight">${task[i].name}</td>
               <td><button class="btn btn-success" id= "sweetAlert" onclick = "visit(${i})" ><i class="fa-sharp fa-solid fa-eye"></i> Visit</button></td>
               <td><button class="btn btn-danger"  onclick = "deletTask(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
               </tr>
        `
    }
    tbody.innerHTML = row;
}

function removetask() {
    SiteName.value = "" ;
    urlName.value = "" ;
}


function deletTask(index) {

    Container.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(Container));
    displayTask(Container);
}



function visit (index) {
    
    for(var i=0; i < Container.length; i++)  {
        var url = `${Container[index].url}` ; 
        location.assign(url);
        
    }
    
}



function searchtask (term) {

    var matchTerm = [];
    for (var i = 0; i < Container.length; i++) {
      if ( Container[i].name.toLowerCase().includes(term.value.toLowerCase()) === true ) {
        matchTerm.push( Container[i] )
      }
    }
    console.log(matchTerm);
    displayTask(matchTerm);
    var hightlight = document.getElementsByClassName('hightlight')
    for (var i = 0; i < hightlight.length; i++) {
        hightlight[i].innerHTML = hightlight[i].innerHTML.replace(new RegExp(term.value, 'gi'), `<span>${term.value}</span>`)
    }
}





// validation

function taskNameRegex() {
    var regex = /^[A-Z][a-z0-9]{2,15}$/ ;
    return (regex.test(SiteName.value))
}


function siteUrlRegex () {
   var urlsRe = /https?:\/\/(www.)?\w+.(net|com|org)/ig;
    
    return (urlsRe.test(urlName.value))
}


function notValidation() {
    if(!taskNameRegex()) {
        if(SiteName.value == '') {
            feedback.innerHTML = 'Site name is required'
        }else {
            feedback.innerHTML = "Not Matching SiteName , please Start With Capital letter and [2:10] Small letters"
        }
    }
    else if (!siteUrlRegex()) {

        if(urlName.value == '') {
            urlfeedback.innerHTML = 'URlname is required'
        }
        else 
        {
            urlfeedback.innerHTML = "Not Matching SiteName , please Start include URLs like https://www.freecodecamp.net/com"
        }
    }
}