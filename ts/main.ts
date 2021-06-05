interface IStudent {
	stu_num: number;
	name: string | null;
	gender: "male" | "female" | "other" | null;
}

interface IClassroom {
	seatsMap: Array<Array<Student>>;
	column: number
	row: number;
}

class Student implements IStudent {
	public stu_num: number;
	public name: string | null;
	public gender: "male" | "female" | "other" | null;
	public where: [number, number];
	constructor(stu_num: number, name?: string, gender?: "male" | "female" | "other") {
		this.stu_num = stu_num;
		this.name = name ?? null;
		this.gender = gender ?? null;
		this.where = [0, stu_num];
		return this;
	}
	public changePlace(where: [number, number]) {
		this.where = where;
	}
}

class Classroom implements IClassroom {
	public seatsMap: Array<Array<Student>>;
	public column: number;
	public row: number;
	constructor(seatArr: [number, number]) {
		this.seatsMap = Array(seatArr[1]).fill(Array(seatArr[0]).fill(new Student(0)));
		this.row = seatArr[0];
		this.column = seatArr[1];
	}
	static solveSeatArr(enrollment: number): [number, number] {
		const column = Math.ceil(Math.sqrt(enrollment));
		const row = (enrollment - enrollment % column) / column + 1;
		return [row, column];
	}
	generate(): void {
		const classField = document.getElementById("classField");
		classField!.style.gridTemplateRows = Array(this.row).fill(`${classField!.clientWidth / this.column * 2 / 3}px`).join(" ")
		classField!.style.gridTemplateColumns = Array(this.column).fill(`${classField!.clientWidth / this.column}px`).join(" ")
		// classField?.setAttribute("grid-template-rows", Array(this.row).fill(`${classField.clientHeight / this.row}px`).join(" "))
		// classField?.setAttribute("grid-template-columns", Array(this.column).fill(`${classField.clientWidth / this.column}px`).join(" "))
		this.seatsMap.forEach((arr, i) => {
			arr.forEach((e, y) => {
				const seat = document.createElement("div");
				const stu_num = document.createElement("div");
				const stu_num_s = document.createElement("p");
				const name = document.createElement("div");
				const name_s = document.createElement("p");
				seat.classList.add("mdc-card");
				seat.classList.add("mdc-card--outlined");
				seat.classList.add("seat");
				seat.setAttribute("gird-row", `${i + 1}`);
				seat.setAttribute("gird-column", `${y + 1}`);
				stu_num_s.textContent = `${e.stu_num}`;
				stu_num.classList.add("stu_num");
				stu_num.appendChild(stu_num_s);
				name_s.textContent = `${e.name}`
				name.classList.add("name");
				name.appendChild(name_s);
				seat.appendChild(stu_num);
				seat.appendChild(name);
				classField?.appendChild(seat);
			})
		})
	}
}

const Main = (() => {
	let enrollment = 35;
	const Students = Array(enrollment).map((a, b) => new Student(b));
	const classroom = new Classroom(Classroom.solveSeatArr(enrollment));
	console.log(classroom)
	classroom.generate();
	window.addEventListener("resize", e => {
		const classField = document.getElementById("classField");
		const [row, column] = Classroom.solveSeatArr(enrollment);
		classField!.style.gridTemplateRows = Array(row).fill(`${classField!.clientWidth / column * 2 / 3}px`).join(" ")
		classField!.style.gridTemplateColumns = Array(column).fill(`${classField!.clientWidth / column}px`).join(" ")
	})
})();