import db from '../data/data';

const employees = db.getEmployees();

import { getUniqueReducer } from './lib/operators/unique';
import { flattenReducer } from './lib/reducers';

import { lazyReduce } from './lib/fp-fundamentals';
import {
	sumReducer, concatReducer,
	sumReducerMapped
} from './lib/reducers';
import {
	arithmeticMean, lazyArithmeticMean,
	geometricMean, lazyGeometricMean,
	median, lazyMedian
} from './lib/mean';

import { isPolish, isItalian, isEuropean, isContractor, salaryBetween } from './lib/employees';

describe('Lazy Reducers', () => {

	it('summing up numbers', () => {
		const myLazySum = lazyReduce(sumReducer, 0)
		expect(myLazySum(1)).toEqual(1);
		expect(myLazySum(5)).toEqual(6);
		expect(myLazySum(10)).toEqual(16);
		expect(myLazySum(30)).toEqual(46);
	});

	it('concatenating strings', () => {
		const myLazyConcat = lazyReduce(concatReducer, '')
		expect(myLazyConcat('to')).toEqual(' to');
		expect(myLazyConcat('be')).toEqual(' to be');
		expect(myLazyConcat('or')).toEqual(' to be or');
		expect(myLazyConcat('not')).toEqual(' to be or not');
		expect(myLazyConcat('to')).toEqual(' to be or not to');
		expect(myLazyConcat('be')).toEqual(' to be or not to be');
	});

	it('summing up employee salary sum', () => {
		const employeeSalaryLazySum = lazyReduce(sumReducerMapped(e => e.salary), 0)
		
		const employeeSalarySum = employees.slice(0, 10).reduce(sumReducerMapped(e => e.salary), 0)
		expect(employeeSalarySum).toEqual(53338);
		
		let sum;
		for (let e of employees.slice(0, 10)) {
			sum = employeeSalaryLazySum(e);
		}
		expect(sum).toEqual(53338);
	});

	it('retrieving unique skills of employees: Italian, contractors, earning 9000-10000 (inclusive)', () => {
		const uniqueSkills = employees
			.filter(isItalian)
			.filter(isContractor)
			.filter(salaryBetween(9000, 10000))
			// these 2 operators are RxJS/flatMap
				.map(e => e.skills)
				.reduce(flattenReducer, [])
			.reduce(getUniqueReducer(), [])

		const checkSkills = ['Java', 'JVM', 'JSP', 'Hibernate', 'JavaScript', 'CoffeeScript', 'react', 'redux', 'Angular', 'AngularJS', 'jQuery', 'HTML','data structures', 'scrum', 'MVC', 'Scalability', 'scala', 'spring', 'algorithms', 'testing', 'sql', 'Security', 'C#', '.net', 'EntityFramework', 'OData', 'VisualStudio', 'MongoDB', 'SOA', 'IIS', 'Rx.net', 'VSTS', 'TypeScript', 'CSS'];
		const checkSkillsSet = new Set(checkSkills);
		expect(uniqueSkills.length).toEqual(checkSkills.length);
		uniqueSkills.forEach(s => {
			expect(checkSkillsSet.has(s)).toBeTruthy(`skill "${s}" should have been retrieved`);
		})
	});
	
	describe('Arithmetic Mean', () => {

		it('arithmetic mean of numbers', () => {
			const numbersMean = arithmeticMean();
			expect(numbersMean([1, 5, 12, 42])).toEqual(15);
		});

		const salaryMean = arithmeticMean(e => e.salary);

		it('arithmetic mean of Polish employees salary', () => {
			const salaryMeanPL = salaryMean(employees.filter(isPolish));
			expect(salaryMeanPL).toEqual(5520.5162037037035);
		});

		it('arithmetic mean of European employees salary', () => {
			const salaryMeanEU = salaryMean(employees.filter(isEuropean));
			expect(salaryMeanEU).toEqual(5483.05193578848);
		});

		it('arithmetic mean of all employees salary', () => {
			const salaryMeanALL = salaryMean(employees);
			expect(salaryMeanALL).toEqual(5498.4836003051105);
		});

	});

	describe('Lazy Arithmetic Mean', () => {

		it('lazy arithmetic mean of numbers', () => {
			const myLazyNumbersMean = lazyArithmeticMean();
			expect(myLazyNumbersMean(1)).toEqual(1);
			expect(myLazyNumbersMean(5)).toEqual(3);
			expect(myLazyNumbersMean(12)).toEqual(6);
			expect(myLazyNumbersMean(42)).toEqual(15);
		});

		it('lazy arithmetic mean of Polish employees salary', () => {
			const lazySalaryMeanPL = lazyArithmeticMean(e => e.salary);
			let sumPL;
			for (let e of employees.filter(isPolish)) {
				sumPL = lazySalaryMeanPL(e);
			}
			expect(sumPL).toEqual(5520.5162037037035);
		});

		it('lazy arithmetic mean of European employees salary', () => {
			const lazySalaryMeanEU = lazyArithmeticMean(e => e.salary);
			let sumEU;
			for (let e of employees.filter(isEuropean)) {
				sumEU = lazySalaryMeanEU(e);
			}
			expect(sumEU).toEqual(5483.05193578848);
		});

		it('lazy arithmetic mean of all employees salary', () => {
			const lazySalaryMeanALL = lazyArithmeticMean(e => e.salary);
			let sumALL;
			for (let e of employees) {
				sumALL = lazySalaryMeanALL(e);
			}
			expect(sumALL).toEqual(5498.4836003051105);
		});

	});

	describe('Rounded Arithmetic Mean', () => {

		it('rounded arithmetic mean of all employees salary', () => {
			const salaryMean = arithmeticMean(e => e.salary, 4);
			const salaryMeanALL = salaryMean(employees);
			expect(salaryMeanALL).toEqual(5498.4836);
		});

		it('rounded lazy arithmetic mean of all employees salary', () => {
			const lazySalaryMeanALL = lazyArithmeticMean(e => e.salary, 4);
			let sumALL;
			for (let e of employees) {
				sumALL = lazySalaryMeanALL(e);
			}
			expect(sumALL).toEqual(5498.4836);
		});

	});

	describe('Median', () => {

		it('median of numbers', () => {
			const numbersMedian = median();
			expect(numbersMedian([1, 5, 12, 42])).toEqual(8.5);
			expect(numbersMedian([1, 42, 5, 12])).toEqual(8.5);
			expect(numbersMedian([1, 5, 12, 42, 60])).toEqual(12);
			expect(numbersMedian([12, 42, 1, 60, 5])).toEqual(12);
		});

		const salaryMedian = median(e => e.salary);

		it('arithmetic mean of Polish employees salary', () => {
			const salaryMedianPL = salaryMedian(employees.filter(isPolish));
			expect(salaryMedianPL).toEqual(5477.5);
		});

		it('arithmetic mean of European employees salary', () => {
			const salaryMedianEU = salaryMedian(employees.filter(isEuropean));
			expect(salaryMedianEU).toEqual(5451);
		});

		it('arithmetic mean of all employees salary', () => {
			const salaryMedianALL = salaryMedian(employees);
			expect(salaryMedianALL).toEqual(5473);
		});

	});

	describe('Lazy Median', () => {

		it('lazy median of numbers', () => {
			const myLazyNumbersMedian = lazyMedian();
			expect(myLazyNumbersMedian(5)).toEqual(5);
			expect(myLazyNumbersMedian(1)).toEqual(3);
			expect(myLazyNumbersMedian(60)).toEqual(5);
			expect(myLazyNumbersMedian(42)).toEqual(23.5);
			expect(myLazyNumbersMedian(12)).toEqual(12);
		});

		it('lazy median of all employees salary', () => {
			const lazyMedianALL = lazyMedian(e => e.salary);
			let sumALL;
			for (let e of employees) {
				sumALL = lazyMedianALL(e);
			}
			expect(sumALL).toEqual(5473);
		});
	});
});
