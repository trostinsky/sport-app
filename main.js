const AVATAR_DEFAULT = 'https://a.wattpad.com/useravatar/calicocat1013.128.610848.jpg';
let container = document.body;

const error = (name, text) => {
	let err = new Error(text);
	err.name = name;
	throw err;
}

class Login{
	constructor(){
		this.render();
	}
	logIn(e){
		// request -> response -> create new User(data)
		new Staff({
			name: "Gleb",
			gender: true
		});
	}
	render(){
		container.innerHTML = `
		<div class="login">
			<input type="text" placeholder="Login">
			<button class="login-button">Login</button>
		</div>`;
		document.querySelector(".login-button")
		.addEventListener("click", this.logIn);
	}
}
new Login();



class User{
	constructor(data = {}){
		this.setSettings(data);
		// this.render();
	}
	static validate(data){
		if(typeof data.name !== 'string' 
			|| data.name.length < 2
			|| typeof data.gender !== "boolean"){
			error("Validation", "Неправильные данные");
		}
	}
	setSettings(data = {}){
		User.validate(data);
		this.avatar = data.avatar || AVATAR_DEFAULT;
		this.name = data.name;
		this.gender = data.gender;
	}
	logOut(){
		// Очищать localStorage
	}
	render(){
		const renderAge = () => {
			if(typeof this.age === 'number' 
				&& !isNaN(this.age)
				&& this.age > 12
				&& this.age < 150){
				return `<div class="age">${this.age}</div>`;
			} else {
				return '';
			}
		}
		let userMarkup = `
		<div class="user">
			<div class="avatar">
				<img src="${this.avatar}"/>
			</div>
			<div class="name">${this.name}</div>
			<div class="gender">${this.gender}</div>
			${renderAge()}
		</div>`;
		container.innerHTML = userMarkup;
	}
}

class Staff extends User{
	constructor(data){
		super(data); // this.render();
		this.sportsmanList = data.sportsmanList || [];
		this.qualification = data.qualification || 'No qualification';
		this.rank = data.rank || 0;
		this.render();
	}
	acceptSportsman(sportsman){
		this.sportsmanList.push(sportsman);
		this.render();
	}
	dismissSportsman(index){
		this.render();
	}
	getPayment(){
		this.render();
	}
	render(){
		super.render();
		const renderSportmanList = () => {
			let markup = ``;
			this.sportsmanList.map((sportsman) => {
				markup += `
					<div class="sportsman-block">
						<div class="name">
							${sportsman.name}
						</div>
						<div class="arrow"></div>
						<div class="extend">
							Дописать расширенный вариант
							При открытии стрелки
						</div>
					</div>
				`;
			})
			return markup;
		}
		let userContainer = document.querySelector(".user");
		// let staffContainer = document.createElement("div");
		// staffContainer.classList.add("staff");
		// userContainer.appendChild(staffContainer);
		userContainer.innerHTML += `
			<div class="qualification">${this.qualification}</div>
			<div class="rank">${this.rank}</div>
			<div class="sportsman-list">
				${renderSportmanList()}
			</div>
		`;
	}
}