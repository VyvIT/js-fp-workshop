export const negate = (boolFn) => (item, idx, arr) => !boolFn(item, idx, arr)

export const hasGmailAccount = e => e.email.includes('gmail.com')

export const salaryLTE = value =>
  e => e.salary <= value

export const salaryGTE = value =>
  e => e.salary >= value

export const salaryBetween = (min, max) => {
  const lessThanMax = salaryLTE(max)
  const moreThanMin = salaryGTE(min)
  return e => lessThanMax(e) && moreThanMin(e)
}

export const salaryBelow5000 = e => e.salary < 5000

// EMPLOYEE NATIONALITY

// plain function:
// (that's actual logic to be done)
const _hasNationality = (nationality, employee) =>
  employee.nationality === nationality;

// closures enable us to produce functions simpler to call by remembering some values
// before the actual call is made:
const hasNationality = (nationality) =>
    (employee) => employee.nationality === nationality

export const isGerman = hasNationality('DE')
export const isAmerican = hasNationality('US')
export const isBritish = hasNationality('UK')
export const isFrench = hasNationality('FR')
export const isPolish = hasNationality('PL')
export const isDutch = hasNationality('NL')
export const isSpanish = hasNationality('ES')
export const isItalian = hasNationality('IT')

export const isEuropean = negate(isAmerican)

// EMPLOYEE OFFICE

export const fromOffice = (office) =>
  (employee) => employee.office[0] === office

// EMPLOYEE CONTRACT

const hasContractType = (contractType) =>
  (employee) => employee.contractType === contractType

export const isContractor = hasContractType('contract')
export const isPermanent = hasContractType('permanent')

// EMPLOYEE SKILLS

export const hasSkill = (skill) =>
  (employee) => employee.skills.includes(skill)

export const knowsHTML = hasSkill("HTML")
export const knowsJavaScript = hasSkill("JavaScript")
export const knowsJava = hasSkill("Java")
export const knowsDotNet = hasSkill(".net")

export const or = (...predicateFns) =>
  (item, idx, arr) => predicateFns.some(fn => fn(item, idx, arr))

export const and = (...predicateFns) =>
  (item, idx, arr) => predicateFns.every(fn => fn(item, idx, arr))

export const isFrontendDev = and(knowsHTML, knowsJavaScript)
export const isBackendDev = or(knowsJava, knowsDotNet)
export const isFullStack = and(isFrontendDev, isBackendDev)
