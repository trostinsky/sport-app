const AVATAR_DEFAULT = 'https://a.wattpad.com/useravatar/calicocat1013.128.610848.jpg';
let container = document.body;

let dataSportsman = [{
	name: "Test1",
	age: 65,
	avatar: AVATAR_DEFAULT,
	gender: true,
	height: 170,
	weight: 62.5,
	ccal: 0,
	exercise: [],
	trainer: null
},{
	name: "Test2",
	age: 45,
	avatar: AVATAR_DEFAULT,
	gender: false,
	height: 188,
	weight: 83.1,
	ccal: 0,
	exercise: [],
	trainer: null
}];

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
			gender: true,
			sportsmanList: dataSportsman
		});
	}
	render(){
		let button = document.querySelector(".login-button");
		if(button !== null) {
			button.removeEventListener("click", this.logIn);
		}
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

const Exercise = (exercises) => {
	let markup = ``;
	exercises.map((exercise) => {
		markup += `<div class="exercise">
				${exercise.ex.name}
				<p>${exercise.ex.description}</p>
				<p>Count: ${exercise.count}</p>
			</div>`;
	});
	return markup;
};

// Для отрисовки блока спортсменов в Staff
class SportsmanBlock{
	constructor(sportsman, index, renderStaff, trainer = true){
		this.renderStaff = renderStaff;
		this.sportsman = sportsman;
		let button = document.createElement("button");
		button.innerHTML = "Create exercise";
		button.classList.add("create");

		this.markup = `
			<div class="sportsman-block sportsman-block-${index}" 
			data-index="${index}">
				<div class="name">
					${this.sportsman.name}
				</div>
				<div class="arrow"></div>
				<div class="extend">	
					${if(trainer) Exercise(this.sportsman.exercise) else {
						${Menu(this.sportsman.menu)};
					}}
				</div>
			</div>`;
			setTimeout(() => {
				document.querySelector(`.sportsman-block-${index}`).appendChild(button);
				
				// bind нужен для того, чтобы this ссылался на текущий объект SportsmanBlock'a
				button.addEventListener("click", this.addExercise.bind(this));
			
			}, 0)
	}

	// Обработчик события добавления упражнения
	addExercise(){
		this.sportsman.exercise.push({
			ex: {
				name: "Отжимание",
				description: "Упор лежа, сгибание\разгибания рук."
			},
			count: Math.round(Math.random() * 100)
		});

		// Вызываем рендер интерфейса Staff
		this.renderStaff();
	}

	render(){
		return this.markup;
	}
}


class Staff extends User{
	constructor(data){
		super(data); // this.render();
		if(Array.isArray(data.sportsmanList) 
			&& data.sportsmanList.length > 0){
			this.sportsmanList = data.sportsmanList;
		} else {
			this.sportsmanList = [];
		};
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
		// Вызываем render User'a, чтобы отрисовать пол, аватар, имя и возраст
		super.render();

		// Функция отрисовки списка спортсменов
		const renderSportmanList = () => {
			let markup = ``;
			this.sportsmanList.map((sportsman, index) => {
				// Вызываем функцию отрисовки БЛОКА с данными спортсмена
				// this.render - для перерисовки при нажатии на кнопку
				// bind для привязки контекста
				markup += new SportsmanBlock(sportsman, index, this.render.bind(this)).render();

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