import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class ValidParseFormInputService {

  constructor() {
    this.dateValid = true;
    this.point = false;
    this.estimatedTimeValid = true;
    this.remainingTimeValid = true;

  }
  estimatedTimeValid$: Observable<boolean>;
  //TIME VALIDATION
  estimatedTimeOld: any;
  remainingTimeOld: any;
  timeOld: any;
  point: boolean;
  estimatedTimeValid: boolean;
  remainingTimeValid: boolean;
  timeValid: boolean;
  parseTime(s: any, formGroup, formField: any) {

    var value;
    var input
    this.timeValid = true;

    //check if called by estimated or remaining time
    if (formField == 'estimatedTime') {
      value = formGroup.get(formField).value.split(" h")[0];
      this.timeOld = this.estimatedTimeOld;
      //this.timeValid = this.estimatedTimeValid;
      input = document.getElementById('estimatedTime') as HTMLInputElement;
    }
    if (formField == 'remainingHours') {
      value = formGroup.get(formField).value.split(" h")[0];
      this.timeOld = this.remainingTimeOld;
      //this.timeValid = this.remainingTimeValid;
      input = document.getElementById('remainingHours') as HTMLInputElement;
    }

    // cursor Position
    var cursorPosition = input.selectionStart;

    // if still undefined set ''
    if (this.timeOld == undefined) {
      this.timeOld = '';
    }

    // if user input is not a number
    if (s.inputType == "insertText") {
      if (isNaN(s.data) && s.date != ',' && s.date != '.') {
        value = this.timeOld;
      }

      if (s.data == ',' && this.point == false && value.length > 0) {
        value = value + ',';
        this.point = true;
      }
      if (s.data == '.' && this.point == false && value.length > 0) {
        value = value + '.';
        this.point = true;
      }
      if (value.includes(',')) {
        if (value.split(',')[1].length > 2) {
          value = this.timeOld;
        }
        if (value.split(',')[1] == 0) {
          this.timeValid = false;
        }
      }
      if (value.includes('.')) {
        if (value.split('.')[1].length > 2) {
          value = this.timeOld;
        }
        if (value.split('.')[1] == 0) {
          this.timeValid = false;
        }
      }
    }

    // if user pressed delte, delete all content
    if ((s.inputType == "deleteContentBackward" || s.inputType == "deleteContentForward")) {
      value = '';
    }
    // if user want paste, delete all content
    if (s.inputType == "insertFromPaste") { /// JE NACH DEM WO DER CURSOR IST LÖSCHEN ODER NICHT
      value = '';
    }

    // patch the value in the form validation
    formGroup.patchValue({
      [formField]: value + ' h'
    });
    if (value == '') {
      formGroup.patchValue({
        [formField]: value
      });
    }

    this.setCaretPosition(input, value.length);

    this.timeOld = value;
    if (!value.includes('.') && !value.includes(',')) {
      this.point = false;
    }
    if (value == '' || value == undefined) {
      this.timeValid = true;
    }
    if (formField == 'estimatedTime') {
      this.estimatedTimeOld = this.timeOld;
      this.estimatedTimeValid = this.timeValid;
    }
    if (formField == 'remainingHours') {
      this.remainingTimeOld = this.timeOld;
      this.remainingTimeValid = this.timeValid;
    }

  }

  validateTime(s: string) {
    var a = [];
    s = s.split(" h")[0];
    if (String(s).length > 0 && s != null && s != undefined) {
      if (s.includes(",")) {
        a = s.split(",");
      }
      if (s.includes(".")) {
        a = s.split(".");
      }
      if (s == null || s == undefined || s == '') {
        return 'P0Y0M0DT0H0M0S';
      }
      if (!s.includes(".") || !s.includes(",")) {
        return 'P0Y0M0DT' + s + 'H0M0S';
      }

      return 'P0Y0M0DT' + a[0] + 'H' + a[1] + 'M0S';
      // P0Y0M0DT12H111M0S
    }
  }


  // DATE VALIDATION
  dateValid: boolean;
  validateDate(formgroup: FormGroup, startdate: string, duedate: string) {
    let startDate = formgroup.get(startdate).value;
    let dueDate = formgroup.get(duedate).value;
    let valid = true;

    if (startDate && dueDate) {

      if (dueDate._i.year < startDate._i.year) {
        valid = false;
        //  this.worckpackageCreateForm.controls[this.DUEDATE].setErrors({'incrorrect': true});
        //   console.log(this.worckpackageCreateForm.status);
        this.dateValid = false;
        //this.dueDate$.unsubscribe();
        //this.startDate$.unsubscribe();
      }
      if (dueDate._i.year == startDate._i.year && dueDate._i.month < startDate._i.month) {
        valid = false;
        this.dateValid = false;
      }
      if (dueDate._i.year == startDate._i.year && dueDate._i.month == startDate._i.month && dueDate._i.date < startDate._i.date) {
        valid = false;
        this.dateValid = false;
      }
      if (valid) {
        this.dateValid = true;
      }
    } else{
      this.dateValid = true;
    }

  }

  // DATE PARSING
  parseDate(s: any) {
    if (s != null && s != undefined && String(s).length > 0) {
      let year = s._i.year;
      let month = s._i.month;
      let date = s._i.date;

      if (String(month).length == 1) {
        month = '0' + month;
      }
      if (String(date).length == 1) {
        date = '0' + date;
      }
      //console.log(year + "-" + month + "-" + date);
      // return String(year + "-" + month + "-" + date);
      return (year + "" + month + "" + date);
    }
  }


  //PROGRESS VALIDATION
  //percentageDone
  percentageDone: string;
  // save the old output value
  displayedValueOld: any;
  // parse the percentage value to a valid format
  parsePercentage(s: any, formGroup: FormGroup, formField: string): void {

    // get the html element 
    var input = document.getElementById('percentageDone') as HTMLInputElement;
    // cursor Position
    var cursorPosition = input.selectionStart;

    // save the output
    var displayedValue = formGroup.get(formField).value;

    // if input is a character or number 
    if (s.inputType == "insertText") {

      // if input is a number
      if (!isNaN(s.data)) {

        // if input less then 3 cha and less then 10%
        if (displayedValue.length < 4 || (displayedValue.length == 4 && s.data == 0 && displayedValue.split("%")[0] <= 10)) {
          let newValue1 = displayedValue.split("%")[0];
          let newValue2 = displayedValue.split("%")[1];

          if (newValue2 != undefined) {
            displayedValue = newValue1 + newValue2 + '%';
          }
          if (newValue2 == undefined) {
            displayedValue = newValue1 + '%';
          }
          if (newValue1 == 0) {
            displayedValue = '';
          }

        }
      }
      // if input no number, delete this cha at the end
      else { displayedValue = displayedValue.slice(0, -1); }

      // if user want change the input on an explicit location
      if (cursorPosition == 1 && displayedValue.length == 4) {
        displayedValue = displayedValue.charAt(0) + displayedValue.charAt(2) + displayedValue.charAt(3);
      }
      if (cursorPosition == 2 && displayedValue.length == 4) {
        displayedValue = displayedValue.charAt(0) + displayedValue.charAt(1) + displayedValue.charAt(3);
      }

      // no percentage allowed with length > 2 except 100%
      if ((cursorPosition == 3 || cursorPosition == 4) && this.displayedValueOld != '100%') {
        displayedValue = this.displayedValueOld;
      }

      // if no number, delete this cha
      if (isNaN(s.data) && s.inputType != "deleteContentBackward" && s.inputType != "deleteContentForward") {
        displayedValue = this.displayedValueOld;
      }

    }
    // if user pressed delte, delete all content
    if (s.inputType == "deleteContentBackward" || s.inputType == "deleteContentForward") {
      displayedValue = '';
    }
    // if user want paste, delete all content
    if (s.inputType == "insertFromPaste") {
      displayedValue = '';
    }

    // if value is 10%, the user is allowed to insert one more "0"
    if (s.data == 0 && displayedValue == '10%' && (cursorPosition == 3 || cursorPosition == 4) && displayedValue.length == 3) {
      displayedValue = '100%';
    }
    if (displayedValue == undefined) {
      displayedValue = '';
    }
    // if user want change the input on an explicit location if value == 100%
    if (cursorPosition == 1 && displayedValue.length == 5 && this.displayedValueOld == '100%' && displayedValue) {
      displayedValue = displayedValue.charAt(0) + displayedValue.charAt(2) + displayedValue.charAt(4);
    }
    if (cursorPosition == 2 && displayedValue.length == 5 && this.displayedValueOld == '100%') {
      displayedValue = displayedValue.charAt(0) + displayedValue.charAt(1) + displayedValue.charAt(4);
    }
    if (cursorPosition == 3 && displayedValue.length == 5 && this.displayedValueOld == '100%') {
      displayedValue = displayedValue.charAt(0) + displayedValue.charAt(2) + displayedValue.charAt(4);
    }

    // no values >100% with more then 5 chas allowed
    if (displayedValue.length >= 5) {
      displayedValue = this.displayedValueOld;
    }

    // patch the value in the form validation
    formGroup.patchValue({
      [formField]: displayedValue
    });

    // set the caret position
    if (displayedValue.length == 2) {
      this.setCaretPosition(input, 1);
    }
    if (displayedValue.length == 3) {
      this.setCaretPosition(input, 4);
    }
    if (displayedValue == '10%') {
      this.setCaretPosition(input, 2);
    }
    if (displayedValue == '100%') {
      this.setCaretPosition(input, 4);
    }
    // set carret position & value
    cursorPosition = input.selectionStart;
    this.displayedValueOld = displayedValue;

    this.percentageDone = displayedValue.split("%")[0];
  }

  //https://codepen.io/chrisshaw/pen/yNOVaz
  setCaretPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);

      // IE8 and below
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  getPercentageDone() {
    if (this.percentageDone == undefined || this.percentageDone == null) {
      return 0;
    }
    else {
      return this.percentageDone;
    }
  }

}
