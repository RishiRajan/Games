let url =
  "https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games"; //ink with cors added to avoid in dev phase
// let url = "https://www.freetogame.com/api/games";

let fetchItems = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    console.log(response.status);
    resstatus = response.status;
    throw new Error(`Error! status: ${response.status}`);
  }
};

// Main fetch
fetchItems(url)
  .then((gameList) => {
    cardBuilder(gameList);
  })
  .catch((error) => {
    console.log(error);
  });

//------------------------------- Create element fucntion ----------------------------------------------


let cardBuilder = (response) =>{

    let j =0;
    let currentRowId = "row0";
    for (i in response){

      if( j %3 ===0){
        currentRowId = "row"+j;
        createElement("div", "row", currentRowId, "rootdiv");
      }

      


      createElement("div", "card mb-3 col-lg-3", "tempcard" + j, currentRowId);


      let tempImage = createElement("img", "card-img-top", 0, "tempcard" + j);
      tempImage.src = response[i].thumbnail;

      
      // createElement("div", "row g-0", "tempg" + j, "tempcard" + j);
      
      // createElement("div", "col-md-8", "tempmd8" + j, "tempg" + j);
      createElement("div", "card-body", "tempCardBody" + j, "tempcard" + j);
      let tempheading = createElement(
        "h5",
        "card-title",
        0,
        "tempCardBody" + j,
      );
      tempheading.innerHTML = response[i].title;
      

      tempPara = createElement("p", "card-text", 0, "tempCardBody" + j);
      tempPara.innerHTML = response[j].short_description;

      tempButton = createElement("button","btn btn-lg btn-primary","tempButton"+j,"tempCardBody" + j);
      tempButton.innerHTML ="Checkout";
      document.getElementById("tempButton" + j).onclick = function (e) {
        // e.preventDefault();
        location.href = response[j].game_url;
      };

      j += 1;
    }

}



//--------------------------------------------------------------------------------------------------------
let createElement = (type, className, id, parentid) => {
  let element = document.createElement(type);
  element.className = className;
  element.id = id;
  if (parentid) document.getElementById(parentid).append(element);
  else document.body.append(element);
  return element;
};
