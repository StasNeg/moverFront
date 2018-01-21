import {Routes, RouterModule} from "@angular/router";
import {MoveMainAddressComponent} from "./move-main-adress/move-main-address.component";
import {NgModule} from "@angular/core";
import {RoomItemsMainMenuComponent} from "./room-items-main-menu/room-items-maim-menu.component";


const appRoutes: Routes = [
  {path: 'address', component: MoveMainAddressComponent},
  {path: '', component: MoveMainAddressComponent},
  {path:'room', component:RoomItemsMainMenuComponent}

];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
  }

)
export class AppRoutingModule{

}
