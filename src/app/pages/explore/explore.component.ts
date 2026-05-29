import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/general/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-explore',
  imports: [
    CommonModule,
    SearchBarComponent,

],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',

})
export class ExploreComponent {
  public test(SearchTerm: string) {
    console.log(SearchTerm);
  }
}
