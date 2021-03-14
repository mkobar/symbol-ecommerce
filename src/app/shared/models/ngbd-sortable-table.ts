import { Input, Output, EventEmitter } from "@angular/core";

export class NgbdSortableHeader {
  rotateDirection: { [key: string]: SortDirection } = {
    asc: "desc",
    desc: "",
    "": "asc",
  };
  @Input() sortable: SortColumn = "";
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = this.rotateDirection[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

export interface Country {
  id: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

export type SortColumn = keyof Country | "";
export type SortDirection = "asc" | "desc" | "";

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
