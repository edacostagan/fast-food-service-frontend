import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, tap } from 'rxjs';
import { MenuEntity } from 'src/app/domain/models/entities/menu.entity';
import { IMenuRegister } from 'src/app/domain/models/interfaces/menu.interfaces';
import { MenuApiService } from 'src/app/infrastructure/services/menu.service';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.css']
})
export class MenuOptionComponent {

  newOptionForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private builder: FormBuilder,
    private menuService: MenuApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }


  /**
   * Method that is executed at the initialization of the component,
   * creates the register form and sets the validators for the data added
   * also sets the current page Url for future uses
   *
   * @memberof RegisterPageComponent
   */
  ngOnInit(): void {
    this.newOptionForm = this.builder.group({
      menuName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      menuDescription: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      menuImageUrl: ['', [Validators.required, Validators.maxLength(300)]],
      menuPrice: ['', [Validators.required, Validators.min(1)]],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  /**
   * Getter that simplifies the process of getting the controls of the form
   *
   * @readonly
   * @memberof MenuOptionComponent
   */
  get fc() {
    return this.newOptionForm.controls;
  }



  submit() {
    this.isSubmitted = true;

    if (this.newOptionForm.invalid) return;

    const fv = this.newOptionForm.value;

    const newMenu: IMenuRegister = {
      menuName: fv.menuName,
      menuDescription: fv.menuDescription,
      menuImageUrl: fv.menuImageUrl,
      menuPrice: fv.menuPrice
    }


    this.menuService.addNewMenuOption(newMenu)
      .subscribe((menu: MenuEntity) => {

        this.toastrService.success(
          `${menu.menuName} has been created!`,
          'New Menu Added!');

        this.router.navigateByUrl(this.returnUrl);
      })
  }


}
