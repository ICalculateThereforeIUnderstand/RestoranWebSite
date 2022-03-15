import { SkrolajElemente, SkrolButon} from "../skrolajElemente.js";
import Skrol from "../skrol.js";

window.onload = function() {
	console.log("sve je u najboljem redu...");
	

	let ell = document.querySelector("html");
	document.addEventListener("keydown", function(e) {
		if (e.code == "KeyS") {
			console.log(window.scrollX + " / " + window.scrollY);
		}
		if (e.code === "KeyR") {
			console.log("sirina/visina prozora su " + ell.clientWidth + " / " + ell.clientHeight);
			console.log(Math.random());
		}
	});
	
	let podaci = [[".povjest-sofre-el", 0, 20, -0.03, "top", 20], [".povjest-sofre-el3", 0, 90, -0.03, "top", 70]];  
	// prvo selektor, zatim pocetna x, y pozicija, te brzina u odnosu na scroll
	let sc = new SkrolajElemente(podaci, 768);
	
	let podaci1 = [[".scroll-button", 300, 100, "button"], [".navbar-custom", 170, 170, "navbar"]];
	let sb = new SkrolButon(podaci1);
	
	let klb = document.querySelector("#klik-button");
	klb.addEventListener("click", (el)=>{
		el.preventDefault();
		el.stopPropagation();
	});
	
	let scb = new Skrol(".scroll-button", "body", "ease-in-out", "1000msec");
}
