import db from '../data/data';

const employees = db.getEmployees();

describe('Data Filtering', () => {
	it('can filter employees who know JavaScript', () => {
		// find all employees who have 'JavaScript' skill
		let JSDevs;

		expect(JSDevs.length).toEqual(633);
	});

	it('can filter European employees', () => {
		// find all European employees (non-US)
		let Europeans;

		expect(Europeans.length).toEqual(1059);
	});

	it('can filter French permanent employees', () => {
		// find all French permanent employees
		let FrenchPermanents;

		expect(FrenchPermanents.length).toEqual(37);
	});

	it('can filter Polish contractor employees', () => {
		// find all Polish contractor employees
		let PolishContractors;

		expect(PolishContractors.length).toEqual(221);
	});

	it('can filter FullStack developer employees', () => {
		// find all fullstack developer employees
		// fullstack developer is a Frontend (JS _AND_ HTML) & (Java _OR_ .net)
		let FullStackDevs;

		expect(FullStackDevs.length).toEqual(442);
	});

	it('can filter FullStack developers with pretty small (3000-5000) salary', () => {
		// find all fullstack developers with pretty small (3000-5000) salary
		let theseGuys;

		expect(theseGuys.length).toEqual(102);
	});

	it('can filter employees having at least n skills', () => {
		// find all employees who have at least 3 of following skills:
		// ['redux', 'react', 'Angular', 'AngularJS', 'rxjs']
		let FPDevs;

		expect(FPDevs.length).toEqual(93);
	});

	it('can filter employees having at least n skills from location', () => {
		// find all employees who have at least 3 of following skills:
		// ['redux', 'react', 'Angular', 'AngularJS', 'rxjs']
		// and are located in:
		// office: 'Warszawa'
		let FPDevsFromWarszawa;

		expect(FPDevsFromWarszawa.length).toEqual(1);
	});

});
