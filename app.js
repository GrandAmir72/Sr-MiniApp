let allData = [];
let teamA = [];
let teamB = [];
let matchDate = "";
function uploadFile() {
  let input = document.getElementById("fileUploader").files[0];
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(input);
}
ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        allData = JSON.parse(json_object);
      });
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function calcItems() {
  document.getElementById("showData").style.display = "block";
  document.getElementById("showAllAction").style.display = "block";
  let logoTeamA = URL.createObjectURL(
    document.getElementById("logoTeamA").files[0]
  );
  let logoTeamB = URL.createObjectURL(
    document.getElementById("logoTeamB").files[0]
  );
  matchDate = document.getElementById("matchDatePicker").value;
  document.getElementById("matchDate").innerText = matchDate;
  document.getElementById("teamLogoA").src = logoTeamA;
  document.getElementById("teamLogoA").style.visibility = "visible";
  document.getElementById("teamLogoB").src = logoTeamB;
  document.getElementById("teamLogoB").style.visibility = "visible";
  let nameOfTeamA = document.getElementById("nameOfTeamA").value;
  let nameOfTeamB = document.getElementById("nameOfTeamB").value;
  matchDate = document.getElementById("matchDatePicker").value;
  document.getElementById("titleEvent").innerText =
    document.getElementById("eventTitle").value;
  for (let i = 0; i < allData.length; i++) {
    const element = allData[i];
    if (element.team === nameOfTeamA) {
      teamA.push(element);
    } else if (element.team === nameOfTeamB) {
      teamB.push(element);
    }
  }
  biuldUpTeams(teamA, "A");
  biuldUpTeams(teamB, "B");
}
function biuldUpTeams(teamImport, teamProity) {
  let team = {
    nameOfTeam: "",
    numberOfGoals: 0,
    goals: [],
    numberOfAssist: 0,
    assists: [],
    numberOfSkillMoves: 0,
    skillMoves: [],
    numberOfWoodwork: 0,
    woodworks: [],
    numberOfDefence: 0,
    defences: [],
    numberOfSave: 0,
    saves: [],
    numberOfDuel: 0,
    duels: [],
    numberOfPassing: 0,
    passings: [],
    numberOfFunnySpecialMoments: 0,
    funnySpecialMoments: [],
    numberOfGKMoves: 0,
    GKMoves: [],
    numberOfFoul: 0,
    fouls: [],
    numberOfShot: 0,
    shots: [],
    numberOfOutPfPlay: 0,
    outOfPlays: [],
    numberOfPossession: 0,
    possessions: [],
    numberOfPenalty: 0,
    penaltys: [],
  };
  for (let i = 0; i < teamImport.length; i++) {
    const element = teamImport[i];
    team.nameOfTeam = element.team.toUpperCase();
    switch (element.tag) {
      case "goal":
        team.numberOfGoals += 1;
        team.goals.push(element);
        break;
      case "assist":
        team.numberOfAssist += 1;
        team.assists.push(element);
        break;
      case "pass":
        team.numberOfPassing += 1;
        team.passings.push(element);
        break;
      case "Funny/Special moments":
        team.numberOfFunnySpecialMoments += 1;
        team.funnySpecialMoments.push(element);
        break;
      case "GK moves":
        team.numberOfGKMoves += 1;
        team.GKMoves.push(element);
        break;
      case "skill":
        team.numberOfSkillMoves += 1;
        team.skillMoves.push(element);
        break;
      case "defence":
        team.numberOfDefence += 1;
        team.defences.push(element);
        break;
      case "save":
        team.numberOfSave += 1;
        team.saves.push(element);
        break;
      case "duel":
        team.numberOfDuel += 1;
        team.duels.push(element);
        break;
      case "Foul":
        team.numberOfFoul += 1;
        team.fouls.push(element);
        break;
      case "out of play":
        team.numberOfOutPfPlay += 1;
        team.outOfPlays.push(element);
        break;
      case "possession":
        team.numberOfPossession += 1;
        team.possessions.push(element);
        break;
      case "penalty":
        team.numberOfPenalty += 1;
        team.penaltys.push(element);
        break;
    }
  }
  // let btnOfLinks;
  // let x;
  let tags = [
    "goal",
    "assist",
    "passing",
    "shot",
    "funnySpecialMoment",
    "GKMove",
    "skillMove",
    "defence",
    "save",
    "duel",
    "foul",
    "outOfPlay",
    "possession",
    "penalty",
  ];
  switch (teamProity) {
    case "A":
      document.getElementById("teamNameA").innerText = team.nameOfTeam;
      document.getElementById("goalOfTeamA").innerText = team.numberOfGoals;
      document.getElementById("AllActionGoalOfTeamA").innerText =
        team.numberOfGoals;
      document.getElementById("AllActionAssistOfTeamA").innerText =
        team.numberOfAssist;
      document.getElementById("AllActionDefenceOfTeamA").innerText =
        team.numberOfDefence;
      document.getElementById("AllActionDuelOfTeamA").innerText =
        team.numberOfDuel;
      document.getElementById("AllActionFoulOfTeamA").innerText =
        team.numberOfFoul;
      document.getElementById("AllActionFunnySpecialMomentsOfTeamA").innerText =
        team.numberOfFunnySpecialMoments;
      document.getElementById("AllActionGKMovesOfTeamA").innerText =
        team.numberOfGKMoves;
      document.getElementById("AllActionOutPfPlayOfTeamA").innerText =
        team.numberOfOutPfPlay;
      document.getElementById("AllActionPassingOfTeamA").innerText =
        team.numberOfPassing;
      document.getElementById("AllActionPenaltyOfTeamA").innerText =
        team.numberOfPenalty;
      document.getElementById("AllActionPossessionOfTeamA").innerText =
        team.numberOfPossession;
      document.getElementById("AllActionSaveOfTeamA").innerText =
        team.numberOfSave;
      document.getElementById("AllActionShotOfTeamA").innerText =
        team.numberOfShot;
      document.getElementById("AllActionSkillMovesOfTeamA").innerText =
        team.numberOfSkillMoves;
        
      let btnOfLinksGoals = document.createElement("button");
      btnOfLinksGoals.setAttribute("class", "btn btn-outline-info");
      btnOfLinksGoals.setAttribute("data-bs-toggle", "modal");
      btnOfLinksGoals.setAttribute("data-bs-target"," #goals");
      let xGoals = document.createTextNode("Video links");
      btnOfLinksGoals.appendChild(xGoals);
      document.getElementById("showBtnLinksGoals").appendChild(btnOfLinksGoals);
      modalCreator(team.goals, 'goals');

      let btnOfLinksAssists = document.createElement("button");
      btnOfLinksAssists.setAttribute("class", "btn btn-outline-info");
      btnOfLinksAssists.setAttribute("data-bs-toggle", "modal");
      btnOfLinksAssists.setAttribute("data-bs-target"," #assists");
      let xAssists = document.createTextNode("Video links");
      btnOfLinksAssists.appendChild(xAssists);
      document.getElementById("showBtnLinksAssist").appendChild(btnOfLinksAssists);
      modalCreator(team.assists, 'assists');
      break;
    case "B":
      document.getElementById("teamNameB").innerText = team.nameOfTeam;
      document.getElementById("goalOfTeamB").innerText = team.numberOfGoals;
      document.getElementById("AllActionGoalOfTeamB").innerText =
        team.numberOfGoals;
      document.getElementById("AllActionAssistOfTeamB").innerText =
        team.numberOfAssist;
      document.getElementById("AllActionDefenceOfTeamB").innerText =
        team.numberOfDefence;
      document.getElementById("AllActionDuelOfTeamB").innerText =
        team.numberOfDuel;
      document.getElementById("AllActionFoulOfTeamB").innerText =
        team.numberOfFoul;
      document.getElementById("AllActionFunnySpecialMomentsOfTeamB").innerText =
        team.numberOfFunnySpecialMoments;
      document.getElementById("AllActionGKMovesOfTeamB").innerText =
        team.numberOfGKMoves;
      document.getElementById("AllActionOutPfPlayOfTeamB").innerText =
        team.numberOfOutPfPlay;
      document.getElementById("AllActionPassingOfTeamB").innerText =
        team.numberOfPassing;
      document.getElementById("AllActionPenaltyOfTeamB").innerText =
        team.numberOfPenalty;
      document.getElementById("AllActionPossessionOfTeamB").innerText =
        team.numberOfPossession;
      document.getElementById("AllActionSaveOfTeamB").innerText =
        team.numberOfSave;
      document.getElementById("AllActionShotOfTeamB").innerText =
        team.numberOfShot;
      document.getElementById("AllActionSkillMovesOfTeamB").innerText =
        team.numberOfSkillMoves;
      let btnOfLinksGoalAway = document.createElement("button");
      btnOfLinksGoalAway.setAttribute("class", "btn btn-outline-info");
      btnOfLinksGoalAway.setAttribute("data-bs-toggle", "modal");
      btnOfLinksGoalAway.setAttribute("data-bs-target", "#goals");
      let xGoalAway = document.createTextNode("Video links");
      btnOfLinksGoalAway.appendChild(xGoalAway);
      document.getElementById("showBtnLinksGoalsAway").appendChild(btnOfLinksGoalAway);
      modalCreator(team.goals, "goals");

      let btnOfLinksAssistAway = document.createElement("button");
      btnOfLinksAssistAway.setAttribute("class", "btn btn-outline-info");
      btnOfLinksAssistAway.setAttribute("data-bs-toggle", "modal");
      btnOfLinks.setAttribute("data-bs-target"," #assists");
      let xAssistAway = document.createTextNode("Video links");
      btnOfLinksAssistAway.appendChild(xAssistAway);
      document.getElementById("showBtnLinksAssistAway").appendChild(btnOfLinksAssistAway);
      modalCreator(team.assists, 'assists');
      break;
  }
}

function modalCreator(arrayTag, tag) {
  console.log(arrayTag);
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", tag);
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", `${tag}Label`);
  modal.setAttribute("aria-hidden", "true");
  let modalDialog = document.createElement("div");
  modalDialog.setAttribute("class", "modal-dialog");
  let modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");
  let modalHeader = document.createElement("div");
  modalHeader.setAttribute("class", "modal-header");
  let modalTitle = document.createElement("h5");
  modalTitle.setAttribute("class", "modal-title");
  modalTitle.setAttribute("id", `${tag}Label`);
  modalTitle.innerText = tag.toUpperCase();
  let modalBody = document.createElement("div");
  modalBody.setAttribute("class", "modal-body");
  for (let i = 0; i < arrayTag.length; i++) {
    const ele = arrayTag[i].download_link;
    btnOfLinks = document.createElement("a");
    btnOfLinks.setAttribute("class", "btn btn-outline-info w-50 highLightBtns");
    btnOfLinks.href = ele;
    x = document.createTextNode(tag + (i + 1));
    let brEle = document.createElement("br");
    btnOfLinks.appendChild(x);
    modalBody.appendChild(btnOfLinks);
    modalBody.appendChild(brEle);
  }
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.append(modalDialog);
  document.body.appendChild(modal);
}
