import { PLATFORM } from 'aurelia-pal';
import { bindable, bindingMode, inject, customAttribute } from 'aurelia-framework';
@inject(Element)
@customAttribute('ckeditor')

export class CkEditorAttribute {
    id
    @bindable({ defaultBindingMode: bindingMode.twoWay }) instance
    @bindable config
    constructor(private element) {
        this.id = generateQuickGuid()
    }
    attached() {
        console.log('cof', this.config)
        this.element.setAttribute('id', this.id)
        var $s = require('scriptjs');
        $s('../../../assets/bower_components/ckeditor/ckeditor.js', () => {
            PLATFORM.global.CKEDITOR.replace(this.id, this.config).on('change', (e) => {
                this.element.value = e.editor.getData()
                this.element.dispatchEvent(new Event('change'));
            });
            this.instance = PLATFORM.global.CKEDITOR.instances[this.id]
        });


    }
   

    detached() {
        if (PLATFORM.global.CKEDITOR.instances[this.id]) PLATFORM.global.CKEDITOR.instances[this.id].destroy();
    }
}
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}