
const cards = {
    ouro: ["1", "2", "3", "4", "5", "6", "7", "11", "12", "13", "1", "2", "3", "4", "5", "6", "7", "11", "12", "13"],//Vermelho
    copas: ["1", "2", "3", "4", "5", "6", "7", "11", "12", "13", "1", "2", "3", "4", "5", "6", "7", "11", "12", "13"],//Vermelho
    espada: ["1", "2", "3", "4", "5", "6", "7", "11", "12", "13", "1", "2", "3", "4", "5", "6", "7", "11", "12", "13"],//Preto
    paus: ["1", "2", "3", "4", "5", "6", "7", "11", "12", "13", "1", "2", "3", "4", "5", "6", "7", "11", "12", "13"]//Preto
}


document.addEventListener("DOMContentLoaded", () => {
    //document.getElementById("row1").appendChild(new Card({ number: 2, cardType: "espada" }).getObj())
    new Card({ number: 1, cardType: "copas" }).iniGame();
})

document.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("Id", event.target.id);
    event.dataTransfer.setData("OriginalPlace", event.target.parentNode.id);
    event.dataTransfer.setData("teste", event.target);

});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.parentNode.className == "row") {
        const data = event.dataTransfer.getData("Id");
        if (event.target.id.split("-")[0] == ((new Number(data.split("-")[0])) + 1) || event.target.classList[1] == "inv") {
            event.target.parentNode.appendChild(new Card({ number: data.split("-")[0], cardType: data.split("-")[1] }).getObj());
            document.getElementById(event.dataTransfer.getData("OriginalPlace")).querySelector(`[id='${data}']`).remove();
        }

    }
});

class Card {

    constructor({ number, cardType }) {
        this.number = number;
        this.cardType = cardType;
    }


    iniGame() {

        for (var i = 1; i <= 10; i++) {
            for (let j = 0; j <= 4; j++) {
                if (Math.floor(Math.random() * 10 < 7)) { continue; }
                var pick = this.pickRandomCard();
                if (!pick) return;
                document.getElementById(`row${i}`).appendChild(pick.getObj());
            }
        }
    }

    pickRandomCard() {
        {
            // justBlack
            if (cards.espada.length > 0) {
                let randomEspadaNumber = Math.floor(Math.random() * cards.espada.length);
                console.log(randomEspadaNumber);
                var result = new Card({ number: cards.espada[randomEspadaNumber], cardType: "espada" });
                cards.espada.splice(randomEspadaNumber, 1);
                return result;
            } else {
                return false;
            }

        }
    }
    getCardSrc() {
        if (["copas", "espada", "ouro", "paus"].findIndex((element) => element == this.cardType) >= 0 && ((this.number > 0 && this.number < 14))) {
            return `./assets/cards/${this.cardType}/${this.number}.svg`
        }
        throw "Carta inválida: " + this.number + "-" + this.cardType;
    }

    getObj() {
        const card = document.createElement("img")
        card.src = this.getCardSrc();
        card.classList = "card";
        card.id = `${this.number}-${this.cardType}`;
        card.alt = `${this.number}-${this.cardType}`;
        card.draggable = true;
        return card;
    }
}/**
Copas - Coração 
Ouro - Diamante
Paus - Trevo
Espada - Espada 
 */
