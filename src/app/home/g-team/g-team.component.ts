import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-g-team',
  templateUrl: './g-team.component.html',
  styleUrls: ['./g-team.component.scss']
})
export class GTeamComponent {
  team:any
  constructor(private api:AuthUserService){}
  ngOnInit() {
    this.api.levelMember().subscribe((res: any) => {
      console.log('gteam', res);

  
      
  
  })

}
}