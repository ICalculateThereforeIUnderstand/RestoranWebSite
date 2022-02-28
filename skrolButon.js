
class SkrolButton {
	constructor(podaci=[]) {
		this.elementi = podaci.map((el)=>{return document.querySelector(el)});
	}
}
