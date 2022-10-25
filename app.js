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
  document.getElementById("saveBtn").hidden = false
  document.getElementById("calcBtn").style.display = 'none'
  document.getElementById("operatorSection").style.display = 'none'
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
    if (team.goals.length > 0) {
      document.getElementById("Goals").style.display = "flex"
    }
    if (team.assists.length > 0) {
      document.getElementById("Assist").style.display = "flex"
    }
    if (team.passings.length > 0) {
      document.getElementById("Pass").style.display = "flex"
    }
    if (team.shots.length > 0) {
      document.getElementById("Shot").style.display = "flex"
    }
    if (team.funnySpecialMoments.length > 0) {
      document.getElementById("Fun/Special").style.display = "flex"
    }
    if (team.GKMoves.length > 0) {
      document.getElementById("GK-Moves").style.display = "flex"
    }
    if (team.skillMoves.length > 0) {
      document.getElementById("Skill").style.display = "flex"
    }
    if (team.defences.length > 0) {
      document.getElementById("Defence").style.display = "flex"
    }
    if (team.saves.length > 0) {
      document.getElementById("Save").style.display = "flex"
    }
    if (team.duels.length > 0) {
      document.getElementById("Duel").style.display = "flex"
    }
    if (team.fouls.length > 0) {
      document.getElementById("Foul").style.display = "flex"
    }
    if (team.outOfPlays.length > 0) {
      document.getElementById("OutOfPlay").style.display = "flex"
    }
    if (team.possessions.length > 0) {
      document.getElementById("Possession").style.display = "flex"
    }
    if (team.penaltys.length > 0) {
      document.getElementById("Penalty").style.display = "flex"

    }
  }
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
        if (team.goals.length > 0) {
          btnCreator("goal", "Home");
          modalCreator(team.goals, "goal", "Home");
        }
        if (team.assists.length > 0) {
          btnCreator("assist", "Home");
          modalCreator(team.assists, "assist", "Home");
        }
        if (team.passings.length > 0) {
          btnCreator("pass", "Home");
          modalCreator(team.passings, "pass", "Home");
        }
        if (team.shots.length > 0) {
          btnCreator("shot", "Home");
          modalCreator(team.shots, "shot", "Home");
        }
        if (team.funnySpecialMoments.length > 0) {
          btnCreator("funnySpecialMoment", "Home");
          modalCreator(team.funnySpecialMoments, "funnySpecialMoment", "Home");
        }
        if (team.GKMoves.length > 0) {
          btnCreator("GKMove", "Home");
          modalCreator(team.GKMoves, "GKMove", "Home");
        }
        if (team.skillMoves.length > 0) {
          btnCreator("skillMove", "Home");
          modalCreator(team.skillMoves, "skillMove", "Home");
        }
        if (team.defences.length > 0) {
          btnCreator("defence", "Home");
          modalCreator(team.defences, "defence", "Home");
        }
        if (team.saves.length > 0) {
          btnCreator("save", "Home");
          modalCreator(team.saves, "save", "Home");
        }
        if (team.duels.length > 0) {
          btnCreator("duel", "Home");
          modalCreator(team.duels, "duel", "Home");
        }
        if (team.fouls.length > 0) {
          btnCreator("foul", "Home");
          modalCreator(team.fouls, "foul", "Home");
        }
        if (team.outOfPlays.length > 0) {
          btnCreator("outOfPlay", "Home");
          modalCreator(team.outOfPlays, "outOfPlay", "Home");
        }
        if (team.possessions.length > 0) {
          btnCreator("possession", "Home");
          modalCreator(team.possessions, "possession", "Home");
        }
        if (team.penaltys.length > 0) {
          btnCreator("penalty", "Home");
          modalCreator(team.penaltys, "penalty", "Home");
        }
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
      if (team.goals.length > 0) {
        btnCreator("goal", "Away");
        modalCreator(team.goals, "goal", "Away");
      }
      if (team.assists.length > 0) {
        btnCreator("assist", "Away");
        modalCreator(team.assists, "assist", "Away");
      }
      if (team.passings.length > 0) {
        btnCreator("pass", "Away");
        modalCreator(team.passings, "pass", "Away");
      }
      if (team.shots.length > 0) {
        btnCreator("shot", "Away");
        modalCreator(team.shots, "shot", "Away");
      }
      if (team.funnySpecialMoments.length > 0) {
        btnCreator("funnySpecialMoment", "Away");
        modalCreator(team.funnySpecialMoments, "funnySpecialMoment", "Away");
      }
      if (team.GKMoves.length > 0) {
        btnCreator("GKMove", "Away");
        modalCreator(team.GKMoves, "GKMove", "Away");
      }
      if (team.skillMoves.length > 0) {
        btnCreator("skillMove", "Away");
        modalCreator(team.skillMoves, "skillMove", "Away");
      }
      if (team.defences.length > 0) {
        btnCreator("defence", "Away");
        modalCreator(team.defences, "defence", "Away");
      }
      if (team.saves.length > 0) {
        btnCreator("save", "Away");
        modalCreator(team.saves, "save", "Away");
      }
      if (team.duels.length > 0) {
        btnCreator("duel", "Away");
        modalCreator(team.duels, "duel", "Away");
      }
      if (team.fouls.length > 0) {
        btnCreator("foul", "Away");
        modalCreator(team.fouls, "foul", "Away");
      }
      if (team.outOfPlays.length > 0) {
        btnCreator("outOfPlay", "Away");
        modalCreator(team.outOfPlays, "outOfPlay", "Away");
      }
      if (team.possessions.length > 0) {
        btnCreator("possession", "Away");
        modalCreator(team.possessions, "possession", "Away");
      }
      if (team.penaltys.length > 0) {
        btnCreator("penalty", "Away");
        modalCreator(team.penaltys, "penalty", "Away");
      }

      break;
  }
}

function modalCreator(arrayTag, tag, sits) {
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", tag + sits);
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
function btnCreator(tag, side) {
  let btnKoft = document.createElement("button");
  btnKoft.setAttribute("class", "btn btn-outline-info btn-sm");
  btnKoft.setAttribute("data-bs-toggle", "modal");
  btnKoft.setAttribute("data-bs-target", `#${tag + side}`);
  let x = document.createTextNode("links");
  btnKoft.appendChild(x);
  let btnShow = tag.toProperCase();
  document.getElementById(`showBtnLinks${btnShow + side}`).appendChild(btnKoft);
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function saveToPdf (){
  var fileName =  `${document.getElementById('titleEvent').value}.html`;
  downloadInnerHtml(fileName, 'gameSheet','text/html');
}
function downloadInnerHtml(filename, elId, mimeType) {
  var elHtml = document.getElementById(elId).innerHTML;
  var link = document.createElement('a');
  mimeType = mimeType || 'text/plain';

  link.setAttribute('download', filename);
  link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
  link.click(); 
}