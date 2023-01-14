
// user object

var User = {
    name: "",
    surname: ""
};

//student object

var Student = {
    speciality: "",
    group: "",
    addOrChangeData: function(param, value) {
        this[param] = value;
    },
    deleteData: function() {
        this.speciality = "";
        this.group = "";
    }
};

//adding method to a student prototype

var SomeGuy = Student;

SomeGuy.showData = function() {
    console.log('Speciality: ' + this.speciality + '\nGroup: ' + this.group);
};

//progress object

var Progress = {
    ...Student,
    test: "",
    attempt: 0,
    grades: [],
    getAverageGrade: function() {
        var sum = 0;
        for (var i = 0; i < this.grades.length; i++) {
            sum += this.grades[i];
        }
        return sum / this.grades.length;
    },
    showData: function() {
        console.log('Speciality: ' + this.speciality + '\nGroup: ' + this.group
                + '\nTest: ' + this.test + '\nAttempt: ' + this.attempt 
                + '\nGrades: ' + this.grades + '\nAverage grade: ' + this.getAverageGrade());
    } 
};

//student class with getters/setters

class StudentClass {
    constructor(speciality, group) {
        this.speciality = speciality;
        this.group = group;
    }

    set setSpeciality(speciality) {
        this.speciality = speciality;
    }

    set setGroup(group) {
        this.group = group;
    }

    get getSpeciality() {
        return this.speciality;
    }

    get getGroup() {
        return this.group;
    }

    showData() {
        console.log('Speciality: ' + this.speciality + '\nGroup: ' + this.group);
    }

    deleteData() {
        this.speciality = "";
        this.group = "";
    }
}

//TASKS TESTING
//also look into pop.html
//you can see results in browser console

function getStudentSpeciality() {
    Student.speciality = document.querySelector('input[name="speciality"]').value;
    Student.showData();
}

function getStudentGroup() {
    Student.group = document.querySelector('input[name="group"]').value;
    Student.showData();
}

function wipeStudentData() {
    Student.deleteData();
    Student.showData();
}

//user and student copy

function showUserCopy() { //empty

    var UserCopy = {
        ...User
    };

    console.log(UserCopy);
}

function showStudentCopy() {
    var StudentCopy = {
        ...Student
    };
    
    console.log(StudentCopy);
}

//progress object fill

function getProgress() {

    Progress.test = prompt("Введіть назву тесту");
    Progress.attempt = +prompt("Введіть кількість спроб");

    console.log(`Результати з тесту на тему: ${Progress.test}`);

    for(var i = 1; i <= Progress.attempt; i++) {
        Progress.grades[i-1] = +prompt(`Введіть бал за ${i} спробу`);
        console.log(`Спроба № ${i}, бал ${Progress.grades[i-1]}`);
    }

    console.log(`Загальна оцінка: ${Progress.getAverageGrade()}`);
}

//building student class obj

function studentData() {
    var newStudent = new StudentClass(prompt("Введіть спеціальність студента"), 
      prompt("Введіть групу студента"));
    
    console.log('Поточні дані');
    newStudent.showData();

    console.log('Очищення даних');
    newStudent.deleteData();
    newStudent.showData();
}