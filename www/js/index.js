function closeInformation(sender) {
    sender.parentNode.classList.add("invisible");
}


function showInformation(cultureId) {
    Array.from(document.querySelectorAll("#information-cards .information-card")).forEach(e => e.classList.add("invisible"));
    document.getElementById("info_"+cultureId).classList.remove("invisible");
}

/* Cultural Actors */

function generateCulturalActorsInformationCards() {
    var card = document.getElementById("info_template");;
    var latLngSchool = {lat: selectedSchool["fields"]["latitude"], lng: selectedSchool["fields"]["longitude"]};
    var newCards = acteursCulturels.map(function (acteur) {
        var newCard = card.cloneNode(true);
        var latLngActeur = {lat: acteur["fields"]["latitude"], lng: acteur["fields"]["longitude"]};
        var distance = Math.round(map.distance(latLngSchool, latLngActeur));
        newCard.dataset.distance = distance;
        newCard.dataset.types = acteur["fields"]["Type"];
        newCard.id = "info_"+acteur["id"];
        Array.from(newCard.children).forEach(function (child) {
            if (child.className == "information-card__tags") {
                var types = acteur["fields"]["Type"] || [];
                child.innerHTML= types.map(type => '<span class="tag">'+type+'</span>').join("");
            } else if(child.className == "information-card__title") {
                child.innerHTML = acteur["fields"]["Nom"];                    
            } else if(child.className == "information-card__description") {
                child.innerHTML = acteur["fields"]["Description"] || "";
            } else if(child.className == "information-card__infos") {
                var distanceString = "";
                if(distance > 10000) {
                    distanceString = "à "+Math.round(distance/1000)+" km";
                } else if(distance > 1000) {
                    distanceString = "à "+Math.round(distance/100)/10+" km";
                } else {
                    distanceString = "à "+Math.round(distance/10)*10+" m";
                }
                child.innerHTML = "<b>Adresse :</b> "+acteur["fields"]["Adresse Postal"]+" ( "+distanceString+" )";
            } else if(child.className == "information-card__table") {
                var tableActions = child.querySelector(".information-card__table__actions");
                var actions = eacActionsForcultureId(acteur["id"]);
                tableActions.innerHTML = actions.map(action =>
                    "<tr> \
                         <td>"+action["fields"]["Nom"]+"</td> \
                         <td>"+action["fields"]["Nom Etablissement"]+"</td> \
                         <td>"+action["fields"]["Eleves"]+" élèves</td> \
                     </tr>"     
                 ).join("");
                 newCard.querySelector(".information-card__subtitle").innerHTML = "Liste des actions EAC ("+actions.length+" actions)";
                 var students = actions.reduce( (acc, e) => acc + Number(e["fields"]["Eleves"]), 0);
                 newCard.querySelector(".information-card__table__students").innerHTML = students+" élèves";
            }
        });
        return newCard;
    });
    var informationCards = document.getElementById("information-cards");
    newCards.forEach(function (card) {
        informationCards.appendChild(card);
    });
}

/* Action EAC */
function eacActionsForcultureId(cultureId){
    return projectEAC.filter(e => e["fields"]["Acteurs Culturels"] != undefined && e["fields"]["Acteurs Culturels"].indexOf(cultureId) != -1);
}