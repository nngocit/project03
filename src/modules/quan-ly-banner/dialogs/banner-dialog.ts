import { Banner, bannerValidationRules } from './../models/banner';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class InsertOrUpdateBanner {
  users
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    switch (this.bannerDto.ID) {
      case 0:
        return "Thêm mới banner";

      default:
        return "Cập nhật banner";
    }
  }
  bannerDto: Banner;
  async activate(dto: Banner) {
    logger.info('dto', dto);
    this.bannerDto = dto
    this.users = await new Promise((rs, rj) => fetch('https://api.github.com/users').then(res => rs(res.json()))
    )

  }
  save() {
    this.validationcontroller.validate({ object: this.bannerDto, rules: bannerValidationRules }).then((result) => {
      if (result.valid) {
        this.dialogcontroller.ok(this.bannerDto);
      }
    })
  }

}
