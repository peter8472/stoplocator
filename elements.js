import {updateStatus} from './util.js'
class BusStopElement extends HTMLElement {
    
    constructor() {
        super();
        var shadow = this.attachShadow({mode: "open"});
        
        const style = document.createElement('style');
        style.textContent = `
      .btable {
        position: relative;
        display: table-row;
      }`
        this.name = document.createElement('td');
        this.code = document.createElement('td');
        this.name.setAttribute('class', "wrapper");
        this.code.setAttribute('class', "wrapper");
        
        
        shadow.appendChild(this.name);
        shadow.appendChild(this.code);
        
    }
    // attributeChangedCallback(name, oldValue,newValue) {
    //     var at = this.getAttribute("value")
    //     wrapper.innerText = at;
    //     alert(name)
    // }
    makeCell(value) {
        let x = document.createElement("td")
        x.innerText = value;
        return x;
    }
    connectedCallback() {
        var name = this.getAttribute("stop_name");
        this.setAttribute("class", "btable");
        var code = this.getAttribute("stop_code");
        this.name.appendChild(this.makeCell(name))
        this.code.appendChild(this.makeCell(code))
    }
}
customElements.define("bus-stop", BusStopElement);
updateStatus("loading status")