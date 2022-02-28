
export class SkrolButon {
	constructor(podaci=[]) {
		// ova klasa prima u konstruktor polje [css-selektor, offset1, offset2, vrsta], gdje css-selektor oznacava element, a offset1 zadaje trenutak kada element postaje vidljiv
		// offset2 zadaje offset kada element prestaje biti vidljiv. za vrsta "button" postavljamo button, za "navbar" postavljamo
		// promjenjivi navbar u ovisnosti o scrollu
		this.elementi = podaci.map((el)=>{
		    let e = document.querySelector(el[0]);
		    let e1, e2;
		    if (el[3] === "navbar") {
				e1 = document.querySelector(el[0]+"-logo1");
			    e2 = document.querySelector(el[0]+"-logo2");
			    if (e1 === null) console.log("logo1 nije pronaden");
			    if (e2 === null) console.log("logo2 nije pronaden");
			}
		    		    
		    if (e === null) {
				console.log("element sa selektorom " + el[0] + " nije pronaden");
				return null;
			}
			e.addEventListener("click", this.skrolaj);
			
			if (el[3] === "navbar")  return [[e, e1, e2], el[1], el[2], true, el[3]];
			return [e, el[1], el[2], false, el[3]];
		});
		this.updejtSw = true;
		this.root = document.querySelector(':root');
		
		this.updejtaj = this.updejtaj.bind(this);
		this.listener = document.addEventListener("scroll", this.updejtaj);
		this.updejtaj();
	}
	
	skrolaj() {
		window.scrollTo(0,0);
	}
	
	updejtaj() {
		if (this.updejtSw) {
			this.updejtSw = false;
			window.requestAnimationFrame(() => {
				this.postavi();
				this.updejtSw = true;
			});
		}
	}
	
	postavi() {
		let l = this.elementi.length;
		let offset = window.scrollY;
		for (let i = 0; i < l; i++) {
			//let sw = this.elementi[i][3];
			if (this.elementi[i][3]) {
				if (offset < this.elementi[i][2]) {
					if (this.elementi[i][4] === "button") {
					    this.elementi[i][0].style.display = "none";
					} else {
						this.elementi[i][0][0].style.backgroundColor = "rgba(0,0,0,0.4)";
						this.elementi[i][0][1].style.display = "block";
						this.elementi[i][0][2].style.display = "none";
						this.root.style.setProperty("--neaktivan-boja", "white");
						this.root.style.setProperty("--aktivan-boja", "#34e5eb");
					}
					this.elementi[i][3] = false;
				}
			} else {
				if (offset > this.elementi[i][1]) {
					if (this.elementi[i][4] === "button") {
					    this.elementi[i][0].style.display = "flex";
					} else {
						this.elementi[i][0][0].style.backgroundColor = "rgba(255,255,255,0.8)";
						this.elementi[i][0][1].style.display = "none";
						this.elementi[i][0][2].style.display = "block";
						this.root.style.setProperty("--neaktivan-boja", "black");
						this.root.style.setProperty("--aktivan-boja", "#cf6b00");
					}
					this.elementi[i][3] = true;
				}
			}
		}
	}
	
	pocisti() {
		document.removeEventListener("scroll", this.updejtaj);
		this.elementi.forEach((el)=>{el[0].removeEventListener("click", this.skrolaj)});
	}
}

export class SkrolajElemente {
	constructor(podaci=[], minWindowSize=550) {
		// u podaci pohranjujemo elemente u obliku [css-selektor, x-offset, y-offset, brzina pomaka u odnosu na scroll, y-offsetPoc za male ekrane kada je paralaksa iskljucena]
		// minWindowSize zadaje minimalnu sirinu windowa za koju ce postojati scroll paralaksa, ispod nje je ova klasa iskljucena
		this.updejtSw = true;
		this.aktivanSw = true;
		this.minWindowSize = minWindowSize;
		this.ell = document.querySelector("html");
		
		this.polje = podaci.map((el)=>{
		    let e = document.querySelector(el[0]);
		    if (e === null) {
				console.log("element sa selektorom " + el[0] + " nije pronaden");
				return null;
			}
		    console.log(e);
		    return [e, el[1], el[2], el[3], el[4], el[5]];	
		});
		this.provjeri();
		this.postavi();
		
		this.updejtaj = this.updejtaj.bind(this);
		this.provjeri = this.provjeri.bind(this);
		this.listener = document.addEventListener("scroll", this.updejtaj);
		this.listener1 = window.addEventListener("resize", this.provjeri);
	}
	
	provjeri() {
		let sirina = this.ell.clientWidth;
		if (sirina > this.minWindowSize && !this.aktivanSw) {
			this.aktivanSw = true;
			this.postavi();
			return true;
		}
		if (sirina < this.minWindowSize && this.aktivanSw) {
			this.aktivanSw = false;
			this.vratiNaNulu();
		}
	}
	
	vratiNaNulu() {
		console.log("Vracam na nulu");
		this.polje.forEach((el)=>{ if (el[4] === "background") {
		    el[0].style.backgroundPosition = "0px " + el[5] + "px";	
		    } else if (el[4] === "top") {
				el[0].style.top = (el[5]) + "%"; 
			} else {console.log("GRESKA! Pogresna opcija.")}
		})
	}
	
	updejtaj() {
		//console.log("scrolnuli smo " + this.i);
		if (this.updejtSw) {
			this.updejtSw = false;
			window.requestAnimationFrame(() => {
				this.postavi();
				//console.log(this.i++);
				this.updejtSw = true;
			});
		}
	}
	
	postavi() {
		if (!this.aktivanSw) return false;
		let l = this.polje.length;
		let pomakY = window.scrollY;
		//console.log("Broj elemenata za postaviti je " + l + ", a pomak je " + pomakY);
		this.polje.forEach((el)=>{ if (el[4] === "background") {
		    el[0].style.backgroundPosition = el[1] + "px " + (el[2] + pomakY * el[3]) + "px"; 
		    } else if (el[4] === "top") {
				el[0].style.top = (el[2] + pomakY * el[3]) + "%"; 
			} else {console.log("GRESKA! Pogresna opcija.")}	
		})
	}
	
	pocisti() {
		document.removeEventListener("scroll", this.updejtaj);
		window.removeEventListener("resize", provjeri);
	}
}
