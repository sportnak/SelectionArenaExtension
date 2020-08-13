class StorageManager {
  static getFighters(callback) {
    chrome.storage.local.get(["fighters"], function ({ fighters }) {
      callback((fighters || []).map((x) => new Fighter(x, "get")));
    });
  }

  static insertFighter(name, callback) {
    console.log("insert:");
    StorageManager.getFighters(function (fighters) {
      console.log("insert2:", fighters);
      if (
        fighters &&
        fighters.length &&
        fighters.find((x) => x.name === name)
      ) {
        name += ` (${fighters.filter((x) => x.name === name).length})`;
      }

      StorageManager.setFighters(
        fighters.concat(new Fighter({ name }, "insert")),
        callback,
        "insert"
      );
    });
  }

  static editFighter(fighter, callback) {
    StorageManager.getFighters(function (fighters) {
      if (fighters && fighters.length) {
        StorageManager.setFighters(
          fighters.map((x) => (x.name === fighter.name ? fighter : x)),
          callback
        );
      }
    });
  }

  // Private
  static setFighters(fighters, callback, source) {
    console.log(fighters, source);
    chrome.storage.local.set({ fighters }, callback);
  }

  static removeFighter(name, callback) {
    console.log("remove:");
    StorageManager.getFighters(function (fighters) {
      StorageManager.setFighters(
        fighters.filter((x) => x.name !== name),
        () => {
          if (callback) {
            callback();
          }
          StorageManager.updateFighters();
        },
        "remove"
      );
    });
  }

  static updateFighters(errorMessages) {
    if (errorMessages) {
      const message = document.createElement("div");
      message.textContent = errorMessages.join("\n");
      const errors = document.getElementById("errors");
      errors.appendChild(message);
      return;
    } else {
      const errors = document.getElementById("errors");
      errors.innerHTML = "";
    }

    const startFight = document.getElementById("start-fight");
    const listContainer = document.getElementById("list-fighters");
    StorageManager.getFighters(function (fighters) {
      listContainer.innerHTML = "";
      if (!fighters || !fighters.length) {
        startFight.disabled = true;
        const noEl = document.createElement("div");
        noEl.textContent = "No fighters in this arena!";
        listContainer.appendChild(noEl);
      } else {
        startFight.disabled = false;
        const children = fighters.map((fighter) => {
          return fighter.getElement();
        });
        children.forEach((x) => listContainer.appendChild(x));
      }
    });
  }
}
