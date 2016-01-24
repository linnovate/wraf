"use strict";


class FormSearch extends HTMLElement {

    createdCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `<form class="form-search" name="form-search">
					<input type="search" name="search" placeholder="הכנס מילת חיפוש...">
					<button>חפש</button>
		    	</form>`;
    }

}

document.registerElement('form-search', FormSearch);
