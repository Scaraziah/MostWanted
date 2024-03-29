"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person); 
    mainMenu(person, people);
    break;
    case "family":
    // TODO: get person's family
    displayParents(person,people);
    displaySpouse(person, people);
    displaySiblings(person,people);
    mainMenu(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person, people);
    // displayPeople(arrDescen);
    mainMenu(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars).toLowerCase();
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's height?", chars);
  let foundPerson = people.filter(function(person){  
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", chars);
  let foundPerson = people.filter(function(person){  
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);
  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the trait they entered
  return foundPerson;
}


function searchByTrait(people){
  let resultTrait = people;
  do{
    let searchTrait = promptFor('What trait would you like to search?\nGender\nWeight\nEye Color\nHeight\nOccupation',chars).toLowerCase();
    switch(searchTrait){ 
      case 'gender':
      resultTrait = searchByGender(resultTrait);
      displayPeople(resultTrait);
        break;
      case 'weight':
        resultTrait =   searchByWeight(resultTrait);
        displayPeople(resultTrait);
        break;
      case 'eye color':
        resultTrait = searchByEyeColor(resultTrait);
        displayPeople(resultTrait);
        break;
      case "height":
        resultTrait = searchByHeight(resultTrait);
        displayPeople(resultTrait);
        break;  
      case "occupation":
        resultTrait = searchByOccupation(resultTrait);
        displayPeople(resultTrait);
        break;
      default:
    }
  }
  while(resultTrait.length > 1);
  return resultTrait
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayFamilyInfo(foundPerson, relationship){
  if(foundPerson.length < 1){
    alert("This person has no " + relationship + ".");
  }
  else{
  alert(foundPerson.map(function(person){
   return relationship + ": " + person.firstName + " " + person.lastName;
 }).join("\n"));
}}

function displaySpouse(person, people){
  let foundPerson = people.filter(function(el){
    if(el.currentSpouse === person[0].id){
      return true;
    }
    else{
      return false;
    }
  })
    displayFamilyInfo(foundPerson,"Spouse")
}

function displaySiblings(person, people){
  let foundPerson = people.filter(function(el){
    if(el.parents[0] == undefined || el.id == person[0].id || person[0].parents[0] == undefined)

      return false;
    else if(el.parents[0] === person[0].parents[0] || el.parents[0] === person[0].parents[1] 
      || el.parents[1] === person[0].parents[0] || el.parents[1] === person[0].parents[1]){
        return true;
    }
    else{
      return false;
    }
  })
    displayFamilyInfo(foundPerson,"Sibling")
}
 
function displayDescendants(person, people){
  let foundPerson = people.filter(function(el){
    if(el.parents[0] == undefined || el.id == person[0].id)
      return false;
      else if(el.id == person[0].parents[0] || el.id == person[0].parents[1])
      return true;
  })
  displayFamilyInfo(foundPerson,"Descendants")
}

function displayParents(person, people){
  let foundPerson = people.filter(function(el){
    if(el.id == person[0].parents[0] || el.id == person[0].parents[1]){
      return true;
    }
    else{
      return false;
    }
  })
    displayFamilyInfo(foundPerson,"Parent")
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  let personInfo = "First Name " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "occupation: " + person[0].occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);

}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
