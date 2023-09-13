import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-basic',
  templateUrl: './filter-basic.component.html',
  styleUrls: ['./filter-basic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class FilterBasicComponent {
  // filtros
  @Input() data_filtros:any;
  @Input() filtros_a_usar:any;
  models:any = false;
  empresa_id = 1;
  ngOnInit(){
    console.log(this.filtros_a_usar);
    
    if(this.filtros_a_usar){
      let models:any = {};
      this.filtros_a_usar.forEach((el:any,index:any) => {
        if(el.name == "empresa_id"){
          this.empresa_id = el.value;
        }
        
        models[el.name] = el.value; 
      })

      this.models = models;
      
    }
  }

  btnSearch(){
    
    if(!this.models || Object.keys(this.models).length == 0){
      return false;
    }
    return true;
  }
  

}
