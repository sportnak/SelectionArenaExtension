let expandedFighters = false;
function addFighter() {
  const fighterName = document.getElementById("fighter-name");
  if (!fighterName || !fighterName.value.trim()) {
    StorageManager.updateFighters(["Fighter requires a name"]);
    return;
  } else {
    StorageManager.insertFighter(fighterName.value, function () {
      StorageManager.updateFighters();
      fighterName.value = "";
    });
  }
}

function register() {
  const plusButton = document.getElementById("plus-fighter");
  if (plusButton) {
    plusButton.addEventListener("click", addFighter);
  }

  const input = document.getElementById("fighter-name");
  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.keyCode === 13) {
        addFighter();
      }
    });
  }

  const listHeader = document.getElementById("list-fighters-header");
  if (listHeader) {
    listHeader.addEventListener("click", function () {
      const list = document.getElementById("list-fighters");
      const listChevron = document.getElementById("list-chevron");
      if (list) {
        if (expandedFighters) {
          expandedFighters = false;
          list.style = "height: 0px; overflow: hidden;";
          listChevron.style = "transform: rotate(0deg)";
        } else {
          StorageManager.getFighters(function (fighters) {
            expandedFighters = true;
            list.style = `height: ${fighters.length * 16 + 16};`;
            listChevron.style = "transform: rotate(180deg)";
          });
        }
      }
    });

    const container = document.getElementById("container");
    document.addEventListener("resize", function () {
      console.log("olo", container.clientHeight);
    });
    container.addEventListener("resize", function () {
      console.log(container.clientHeight);
    });
  }

  const fightButton = document.getElementById("start-fight");
  if (fightButton) {
    fightButton.onclick = () => {
      StorageManager.getFighters(function (fighters) {
        const competition = new Competition(fighters);
        competition.startFight();
      });
    };
  }
}

function getBeforeUnload(element, fighter) {
  return function () {
    element.removeEventListener("click", fighter.delete);
  };
}

register();
StorageManager.updateFighters();
