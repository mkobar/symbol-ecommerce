import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "th[sortable]",
  host: {
    "[class.asc]": "direction === 'asc'",
    "[class.desc]": "direction === 'desc'",
    "(click)": "rotate()",
  },
})
export class TableSortableDirective {}
