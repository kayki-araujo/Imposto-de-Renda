const form = document.querySelector("form");
const table = document.querySelector("table");

const imposto = {
    name: "",
    dep: 0,
    salB: 0,
    getInssRed(){
        if (this.salB <= 1100) {
            return this.salB*0.075;
        } else if (this.salB <= 2203.48){
            return this.salB*0.09;
        } else if (this.salB <= 3305.22){
            return this.salB*0.12;
        } else if (this.salB <= 6433.57) {
            return this.salB*0.14;
        } else {
            return 751.99;
        }
    },
    getIrrfRed(){
        let reduction, aliquota;
        let base = this.salB - this.dep * 189.59 - this.getInssRed();
        if (base <= 1903.98){
            aliquota = 0;
            reduction = 0;
        } else if (base <= 2826.65){
            aliquota = 0.075;
            reduction = 142.8;
        } else if (base <= 3751.05){
            aliquota = 0.15;
            reduction = 354.8;
        } else if (base <= 4664.68){
            aliquota = 0.225;
            reduction = 636.13;
        } else {
            aliquota = 0.275;
            reduction = 869.36;
        }
        return base*aliquota-reduction;
    },
}

const makeTable = () => {
    let tableRow = document.createElement("tr");
    let tableElement = [];
    let innerElement = [
        imposto.name, // nome
        imposto.dep,  // dependetes
        imposto.salB, // salario bruto
        parseFloat(100*imposto.getInssRed()/imposto.salB).toFixed(2) + "%", // % inss
        parseFloat(imposto.getInssRed()).toFixed(2), // inss
        parseFloat(100*imposto.getIrrfRed()/imposto.salB).toFixed(2) + "%", // % irrf
        parseFloat(imposto.getIrrfRed()).toFixed(2), // irrf
        parseFloat(imposto.salB - imposto.getInssRed() - imposto.getIrrfRed()).toFixed(2) // salario liquido
    ];
    for(index in innerElement){
        tableElement[index] = document.createElement("td");
        tableElement[index].innerHTML = innerElement[index];
        tableRow.appendChild(tableElement[index]);
    }
    return tableRow;
}

form.addEventListener("submit", event => {
    event.preventDefault();
    imposto.name = form.querySelector("input[name='name']").value;
    imposto.dep = form.querySelector("input[name='dep']").value;
    imposto.salB = form.querySelector("input[name='salB']").value;
    table.appendChild(makeTable());
    table.style.display = "table";
});