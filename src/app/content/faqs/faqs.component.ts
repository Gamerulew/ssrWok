import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IFaq} from "../../shared/model/faq.model";

@Component({
  selector: 'wok-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  faqs?: IFaq[] = [];
  faqPage = 'Faq';

  constructor(protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({faq}) => {
      if (faq) {
        this.faqs = faq;
        if (this.faqs && this.faqs.length > 0) {
          this.faqPage = this.faqs[0].page?.toLowerCase();
        }
      }
    });
  }
}
