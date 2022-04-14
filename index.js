// Your code here parse readme carefully 
const createEmployeeRecord = function(row){   //Argument:populates a firstName field from the 0th element
    console.log(row)
    return { //javascript object w/ keys
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    } //Loads `Array` elements into corresponding `Object` properties.
}

const createEmployeeRecords = function(array){ //creates two records
    return array.map(function(row) {//array of objects, creates two records
        return createEmployeeRecord(row) //using createEmployeeRecord and accumulates to a new array
    }) 
} //converts each nested array into an employee record

const createTimeInEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),//derived from the argument
        date,
    })
    return employeeRecord
}// add an Object w/ keys  to the timeInEvents on the record Object: type:, hour:, date: 

const createTimeOutEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date, 
    })
    return employeeRecord
}

const hoursWorkedOnDate = function(employeeRecord, dateStamp){
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === dateStamp
    })
    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return(outEvent.hour - inEvent.hour) /100 //hours worked, integer
}

const wagesEarnedOnDate = function(employeeRecord, dateStamp){
    let rawWages = hoursWorkedOnDate(employeeRecord, dateStamp)
    * employeeRecord.payPerHour
    return parseFloat(rawWages.toString())
}

const allWagesFor = function(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)
    return payable
}

const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

