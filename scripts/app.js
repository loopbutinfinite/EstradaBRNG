let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let codestackEmail = document.getElementById("codestackEmail");
let personalEmail = document.getElementById("personalEmail");
let randomEntryButton = document.getElementById("randomEntryButton");
let previousEntries = document.getElementById("previousEntries");

//function for grabbing the data from the JSON file
function grabData(){
    return fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
        return data.season8;
    })
};
grabData();

//function for the random entry from the JSON data
function randomEntry(season8){
    let randomizedIndex = Math.floor(Math.random() * season8.length)
    return season8[randomizedIndex];
};

//function for displaying the randomized entry to the DOM
randomEntryButton.addEventListener("click", () => {
    grabData().then((season8) => {
        let randomDirectoryEntry = randomEntry(season8);
        firstName.innerText = `> First Name: ${randomDirectoryEntry.firstName}`;
        lastName.innerText = `> Last Name: ${randomDirectoryEntry.lastName}`;
        codestackEmail.innerText = `> CodeStack Email: ${randomDirectoryEntry.codestackEmail}`;
        personalEmail.innerText = `> Personal Email: ${randomDirectoryEntry.personalEmail}`

        //====Below is to display the previous entries====\\
        //invoke the lastEntries function so it's also tied to button click
        lastEntries(randomDirectoryEntry)
    })
})

//make an array to store the entry into so we can display these in the previous entries
const previousEntriesArray = [];
let previousEntry = randomDirectoryEntry;

//function that will add the entry to the array and display to the previous entries section
function lastEntries(previousEntry){
    //.push adds to the array, here we're adding the entry that just displayed
    previousEntriesArray.push(previousEntry);
    const maxPreviousEntries = 5; 
    //So we can make sure the array and previous entries section only holds a max of 5 entries.
    if (previousEntriesArray.length > 5){
        //The .shift() method will allow us to remove the first item from the array, changing the array, and return now changed array back.
        //This will allow us the remove the oldest entry and repalce it with the newest entry.
        previousEntriesArray.shift();
    }
    previousEntries.innerHTML = " "; //need this to avoid duplicates
    for (let i = previousEntriesArray.length - 1; i >= 0; i--){
        const previousEntry = previousEntriesArray[i];
        const li = document.createElement("li");
        li.innerHTML = `
        <p>> First Name: ${previousEntry.firstName}</p>
        <p>> Last Name: ${previousEntry.lastName}</p>
        <p>> CodeStack Email: ${previousEntry.codestackEmail}</p>
        <p>> Personal Email: ${previousEntry.personalEmail}</p>
        `;
        previousEntries.appendChild(li)
    }
}





//function for displaying the previous entries
// function lastEntry(){
//     const li = document.createElement("li");
//     const lastSeason8Entry = document.createElement("p");
//     firstName.innerText = `First Name: ${randomDirectoryEntry[randomizedIndex].firstName}`
//     lastName.innerText = `Last Name: ${randomDirectoryEntry[randomizedIndex].lastName}`;
//     codestackEmail.innerText = `CodeStack Email: ${randomDirectoryEntry[randomizedIndex].codestackEmail}`;
//     personalEmail.innerText = `Personal Email: ${randomDirectoryEntry[randomizedIndex].personalEmail}`
//     previousEntries.appendChild(lastSeason8Entry);
// }

