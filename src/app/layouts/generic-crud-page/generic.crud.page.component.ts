import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'wok-listgrid',
  templateUrl: './generic.crud.page.component.html'
})

export class GenericCrudPageComponent {
  @Input() tableTemplate: TemplateRef<any> | undefined;
  @Input() gridTemplate: TemplateRef<any> | undefined;
  @Input() searchTemplate: TemplateRef<any> | undefined;
  @Input() paginationTemplate: TemplateRef<any> | undefined;

  @Input() itemName!: String;
  @Input() itemlist?: any[];
  @Input() page!: number;
}
