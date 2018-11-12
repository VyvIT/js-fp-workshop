import db from '../data/data';

import { and, or, negate, atLeast } from './lib/filters'
import {
	knowsJavaScript, hasSkill,
	isEuropean, isFrench, isPolish,
	isPermanent, isContractor,
	isFullStack,
	fromOffice,
	salaryBetween
} from './lib/employees'

// database is defined in `db/employees.json` file
const employees = db.getEmployees();

describe('Data Filtering', () => {
	it('can filter employees who know JavaScript', () => {
		const JSDevs = employees.filter(knowsJavaScript)

		expect(JSDevs.length).toEqual(633);
	});

	it('can filter European employees', () => {
		const Europeans = employees.filter(isEuropean)

		expect(Europeans.length).toEqual(1059);
	});

	it('can filter French permanent employees', () => {
		const isFrenchPermanent = and(isFrench, isPermanent)
		const FrenchPermanents = employees.filter(isFrenchPermanent)

		expect(FrenchPermanents.length).toEqual(37);
	});

	it('can filter Polish contractor employees', () => {
		const isPolishContractor = and(isPolish, isContractor)
		const PolishContractors = employees.filter(isPolishContractor)

		expect(PolishContractors.length).toEqual(221);
	});

	it('can filter FullStack developer employees', () => {
		const FullStackDevs = employees.filter(isFullStack)

		expect(FullStackDevs.length).toEqual(442);
	});

	it('can filter FullStack developers with pretty small (3000-5000) salary', () => {
		const isFullStackWithPrettySmallSalary = and(isFullStack, salaryBetween(3000, 5000))
		const theseGuys = employees.filter(isFullStackWithPrettySmallSalary)

		expect(theseGuys.length).toEqual(97);
	});

	it('can filter employees having at least n skills', () => {
		// ['redux', 'react', 'Angular', 'AngularJS', 'rxjs']
		const hasSkillFns = ['redux', 'react', 'Angular', 'AngularJS', 'rxjs'].map(hasSkill)
		const knows3ModernFrameworks = atLeast(3, ...hasSkillFns)
		const FPDevs = employees.filter(knows3ModernFrameworks)

		expect(FPDevs.length).toEqual(93);
	});

	it('can filter employees having at least n skills from location', () => {
		// ['redux', 'react', 'Angular', 'AngularJS', 'rxjs']
		// office: 'Warszawa'
		const fromWarszawa = fromOffice('Warszawa')
		const knows3ModernFrameworks = atLeast(3, hasSkill('redux'), hasSkill('react'), hasSkill('Angular'), hasSkill('AngularJS'), hasSkill('rxjs'))
		const FPDevsFromWarszawa = employees.filter(and(knows3ModernFrameworks, fromWarszawa))

		expect(FPDevsFromWarszawa.length).toEqual(1);
	});

});
