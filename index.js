import { SkrolajElemente, SkrolButon} from "./skrolajElemente.js";


window.onload = function() {
	
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
	
	let podaci = [[".slika", 0, 50, -0.1, "background", 0], [".slika1", 0, 150, -0.1, "background", 0], [".povjest-sofre-el2", 111111, 55, -0.02, "top", 20],
	              [".jelovnik", 111111, 60, -0.02, "top", 15], [".slastice", 111111, 110, -0.02, "top", 40], [".rezervacije", 111111, 130, -0.015, "top", 65]];  
	// prvo selektor, zatim pocetna x, y pozicija, te brzina u odnosu na scroll
	let sc = new SkrolajElemente(podaci, 768);
	
	//setTimeout(()=>{sc.pocisti()}, 2000);	

	let podaci1 = [[".scroll-button", 300, 100, "button"], [".navbar-custom", 170, 170, "navbar"]];
	let sb = new SkrolButon(podaci1);
	
	let klb = document.querySelector("#klik-button");
	klb.addEventListener("click", (el)=>{
		el.preventDefault();
		el.stopPropagation();
	});
}
