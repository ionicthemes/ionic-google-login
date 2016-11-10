/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from './login';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/element';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from '@angular/core/src/metadata/view';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import12 from '../../node_modules/ionic-angular/components/grid/grid.ngfactory';
import * as import13 from '../../node_modules/ionic-angular/components/button/button.ngfactory';
import * as import14 from 'ionic-angular/config/config';
import * as import15 from '@angular/core/src/linker/element_ref';
import * as import16 from 'ionic-angular/components/app/app';
import * as import17 from 'ionic-angular/util/keyboard';
import * as import18 from '@angular/core/src/zone/ng_zone';
import * as import19 from 'ionic-angular/navigation/view-controller';
import * as import20 from 'ionic-angular/components/tabs/tabs';
import * as import21 from 'ionic-angular/components/grid/grid';
import * as import22 from 'ionic-angular/components/button/button';
import * as import23 from 'ionic-angular/components/content/content';
export class Wrapper_LoginPage {
  context:import0.LoginPage;
  changed:boolean;
  constructor(p0:any) {
    this.changed = false;
    this.context = new import0.LoginPage(p0);
  }
  detectChangesInternal(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this.changed;
    this.changed = false;
    return changed;
  }
}
var renderType_LoginPage_Host:import2.RenderComponentType = (null as any);
class _View_LoginPage_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _LoginPage_0_4:Wrapper_LoginPage;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_LoginPage_Host0,renderType_LoginPage_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    this._el_0 = this.selectOrCreateHostElement('page-login',rootSelector,(null as any));
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_LoginPage0(this.viewUtils,this.injector(0),this._appEl_0);
    this._LoginPage_0_4 = new Wrapper_LoginPage(this.parentInjector.get(import8.NavController));
    this._appEl_0.initComponent(this._LoginPage_0_4.context,([] as any[]),compView_0);
    compView_0.create(this._LoginPage_0_4.context,this.projectableNodes,(null as any));
    this.init(([] as any[]).concat([this._el_0]),[this._el_0],([] as any[]),([] as any[]));
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.LoginPage) && (0 === requestNodeIndex))) { return this._LoginPage_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._LoginPage_0_4.detectChangesInternal(this,this._el_0,throwOnChange);
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_LoginPage_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<any> {
  if ((renderType_LoginPage_Host === (null as any))) { (renderType_LoginPage_Host = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,([] as any[]),{})); }
  return new _View_LoginPage_Host0(viewUtils,parentInjector,declarationEl);
}
export const LoginPageNgFactory:import10.ComponentFactory<import0.LoginPage> = new import10.ComponentFactory<import0.LoginPage>('page-login',viewFactory_LoginPage_Host0,import0.LoginPage);
const styles_LoginPage:any[] = ([] as any[]);
var renderType_LoginPage:import2.RenderComponentType = (null as any);
class _View_LoginPage0 extends import1.AppView<import0.LoginPage> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _Content_0_4:import11.Wrapper_Content;
  _text_1:any;
  _el_2:any;
  _Row_2_3:import12.Wrapper_Row;
  _text_3:any;
  _el_4:any;
  _Col_4_3:import12.Wrapper_Col;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _el_14:any;
  _Row_14_3:import12.Wrapper_Row;
  _text_15:any;
  _el_16:any;
  _Col_16_3:import12.Wrapper_Col;
  _text_17:any;
  _el_18:any;
  /*private*/ _appEl_18:import3.AppElement;
  _Button_18_4:import13.Wrapper_Button;
  _text_19:any;
  _text_20:any;
  _text_21:any;
  _text_22:any;
  _text_23:any;
  /*private*/ _expr_0:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_LoginPage0,renderType_LoginPage,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = this.renderer.createElement(parentRenderNode,'ion-content',(null as any));
    this.renderer.setElementAttribute(this._el_0,'class','login-content');
    this.renderer.setElementAttribute(this._el_0,'padding','');
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = import11.viewFactory_Content0(this.viewUtils,this.injector(0),this._appEl_0);
    this._Content_0_4 = new import11.Wrapper_Content(this.parentInjector.get(import14.Config),new import15.ElementRef(this._el_0),this.renderer,this.parentInjector.get(import16.App),this.parentInjector.get(import17.Keyboard),this.parentInjector.get(import18.NgZone),this.parentInjector.get(import19.ViewController,(null as any)),this.parentInjector.get(import20.Tabs,(null as any)));
    this._appEl_0.initComponent(this._Content_0_4.context,([] as any[]),compView_0);
    this._text_1 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_2 = this.renderer.createElement((null as any),'ion-row',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','top-row');
    this._Row_2_3 = new import12.Wrapper_Row();
    this._text_3 = this.renderer.createText(this._el_2,'\n    ',(null as any));
    this._el_4 = this.renderer.createElement(this._el_2,'ion-col',(null as any));
    this._Col_4_3 = new import12.Wrapper_Col();
    this._text_5 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._el_6 = this.renderer.createElement(this._el_4,'h1',(null as any));
    this.renderer.setElementAttribute(this._el_6,'class','label-logo');
    this._text_7 = this.renderer.createText(this._el_6,'LOGO',(null as any));
    this._text_8 = this.renderer.createText(this._el_4,'\n      ',(null as any));
    this._el_9 = this.renderer.createElement(this._el_4,'p',(null as any));
    this.renderer.setElementAttribute(this._el_9,'class','label-description');
    this._text_10 = this.renderer.createText(this._el_9,'This app helps you discover and buy amezing things all in one place',(null as any));
    this._text_11 = this.renderer.createText(this._el_4,'\n    ',(null as any));
    this._text_12 = this.renderer.createText(this._el_2,'\n  ',(null as any));
    this._text_13 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_14 = this.renderer.createElement((null as any),'ion-row',(null as any));
    this.renderer.setElementAttribute(this._el_14,'class','bottom-row');
    this._Row_14_3 = new import12.Wrapper_Row();
    this._text_15 = this.renderer.createText(this._el_14,'\n    ',(null as any));
    this._el_16 = this.renderer.createElement(this._el_14,'ion-col',(null as any));
    this.renderer.setElementAttribute(this._el_16,'class','login-button');
    this._Col_16_3 = new import12.Wrapper_Col();
    this._text_17 = this.renderer.createText(this._el_16,'\n      ',(null as any));
    this._el_18 = this.renderer.createElement(this._el_16,'button',(null as any));
    this.renderer.setElementAttribute(this._el_18,'block','');
    this.renderer.setElementAttribute(this._el_18,'color','danger');
    this.renderer.setElementAttribute(this._el_18,'ion-button','');
    this._appEl_18 = new import3.AppElement(18,16,this,this._el_18);
    var compView_18:any = import13.viewFactory_Button0(this.viewUtils,this.injector(18),this._appEl_18);
    this._Button_18_4 = new import13.Wrapper_Button((null as any),'',this.parentInjector.get(import14.Config),new import15.ElementRef(this._el_18),this.renderer);
    this._appEl_18.initComponent(this._Button_18_4.context,([] as any[]),compView_18);
    this._text_19 = this.renderer.createText((null as any),'Google Login',(null as any));
    compView_18.create(this._Button_18_4.context,[([] as any[]).concat([this._text_19])],(null as any));
    this._text_20 = this.renderer.createText(this._el_16,'\n    ',(null as any));
    this._text_21 = this.renderer.createText(this._el_14,'\n  ',(null as any));
    this._text_22 = this.renderer.createText((null as any),'\n',(null as any));
    compView_0.create(this._Content_0_4.context,[
      ([] as any[]),
      ([] as any[]).concat([
        this._text_1,
        this._el_2,
        this._text_13,
        this._el_14,
        this._text_22
      ]
      ),
      ([] as any[])
    ]
    ,(null as any));
    this._text_23 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    var disposable_0:Function = this.renderer.listen(this._el_18,'click',this.eventHandler(this._handle_click_18_0.bind(this)));
    this.init(([] as any[]),[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._text_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._text_21,
      this._text_22,
      this._text_23
    ]
    ,[disposable_0],([] as any[]));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import21.Col) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._Col_4_3.context; }
    if (((token === import21.Row) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._Row_2_3.context; }
    if (((token === import22.Button) && ((18 <= requestNodeIndex) && (requestNodeIndex <= 19)))) { return this._Button_18_4.context; }
    if (((token === import21.Col) && ((16 <= requestNodeIndex) && (requestNodeIndex <= 20)))) { return this._Col_16_3.context; }
    if (((token === import21.Row) && ((14 <= requestNodeIndex) && (requestNodeIndex <= 21)))) { return this._Row_14_3.context; }
    if (((token === import23.Content) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 22)))) { return this._Content_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._Content_0_4.detectChangesInternal(this,this._el_0,throwOnChange)) { this._appEl_0.componentView.markAsCheckOnce(); }
    this._Row_2_3.detectChangesInternal(this,this._el_2,throwOnChange);
    this._Col_4_3.detectChangesInternal(this,this._el_4,throwOnChange);
    this._Row_14_3.detectChangesInternal(this,this._el_14,throwOnChange);
    this._Col_16_3.detectChangesInternal(this,this._el_16,throwOnChange);
    const currVal_2:any = '';
    this._Button_18_4.check_block(currVal_2,throwOnChange,false);
    const currVal_3:any = 'danger';
    this._Button_18_4.check_color(currVal_3,throwOnChange,false);
    if (this._Button_18_4.detectChangesInternal(this,this._el_18,throwOnChange)) { this._appEl_18.componentView.markAsCheckOnce(); }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._Button_18_4.context.ngAfterContentInit(); } }
    const currVal_0:any = this._Content_0_4.context._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementClass(this._el_0,'statusbar-padding',currVal_0);
      this._expr_0 = currVal_0;
    }
    this.detectViewChildrenChanges(throwOnChange);
  }
  destroyInternal():void {
    this._Content_0_4.context.ngOnDestroy();
  }
  private _handle_click_18_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.doGoogleLogin()) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_LoginPage0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<import0.LoginPage> {
  if ((renderType_LoginPage === (null as any))) { (renderType_LoginPage = viewUtils.createRenderComponentType('',0,import9.ViewEncapsulation.None,styles_LoginPage,{})); }
  return new _View_LoginPage0(viewUtils,parentInjector,declarationEl);
}