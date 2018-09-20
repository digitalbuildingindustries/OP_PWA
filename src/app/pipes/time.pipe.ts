import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any): any {
    let result;
    if (value == null) {
      return 0;
    }
    else {
      let edit;
      result = 0;

      if (value.includes("PT")) {
        edit = value.split("PT")[1];
      }
      if (value.includes("P") && !value.includes("PT")) {
        edit = value.split("P")[1];
      }

      if (edit.includes("DT")) {
        result = parseInt(edit.split("DT")[0]) * 24;
        edit = edit.split("DT")[1];
      }
      if (edit.includes("D") && !edit.includes("DT")) {
        result = parseInt(edit.split("D")[0]) * 24;
        edit = edit.split("D")[1];
      }
      if (edit.includes("T") && !edit.includes("DT") && !edit.includes("M") && !edit.includes("S")) {
        result = parseInt(edit.split("T")[0]) * 24;
        edit = edit.split("T")[1];
      }
      if (edit.includes("H")) {
        result = result + parseInt(edit.split("H")[0]);
        edit = edit.split("H")[1];
      }
      if (edit.includes("M")) {
        result = result + (parseInt(edit.split("M")[0])/60)
        edit = edit.split("M")[1];
      }
      if (edit.includes("S")) {
        result = result + (parseInt(edit.split("S")[0])/3600);
      }
    }
    return result + " ";

  }

}
