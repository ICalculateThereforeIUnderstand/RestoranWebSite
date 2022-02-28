import { SkrolButon} from "../skrolajElemente.js";

window.onload = function() {
	console.log("sve je u najboljem redu...");
	
	let podaci1 = [[".scroll-button", 300, 100, "button"], [".navbar-custom", 170, 170, "navbar"]];
	let sb = new SkrolButon(podaci1);
	
	let klb = document.querySelector("#klik-button");
	klb.addEventListener("click", (el)=>{
		el.preventDefault();
		el.stopPropagation();
	});
}
