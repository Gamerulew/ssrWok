import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'wok-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
  entity?: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  @Input() displayedColumns: string[] = [];
  // Paginator
  pageEvent: PageEvent | null = null;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  constructor() { }

  ngOnInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

}
