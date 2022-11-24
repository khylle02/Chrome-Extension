let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveInputEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("dlt-btn");
const tabBtn = document.getElementById("tab-btn");
const leedsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leedsFromLocalStorage)

if(leedsFromLocalStorage){
    myLeads = leedsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {        
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads.length = [];
    render(myLeads)
})

saveInputEl.addEventListener('click', function (){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
})



