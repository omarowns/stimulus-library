import{Controller as e}from"stimulus";import t from"dialog-polyfill";import s from"camelcase";function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e}).apply(this,arguments)}class n extends e{constructor(e){return super(e),new Proxy(this,{get:(e,t)=>{let s=Reflect.get(e,t),i=this;if(function(e){switch(e){case"application":case"element":case"constructor":case"initialize":case"log":case"data":case"valueDescriptorMap":case"identifier":return!1}return!(/^_.*?$/.test(e)||/^.*?Target(s)?$/.test(e)||/^.*?Value$/.test(e)||/^.*?ValueChanged$/.test(e)||/^.*?Class$/.test(e))}(t.toString())){if("function"==typeof s)return new Proxy(s,{apply:(e,s,n)=>(i.log(t.toString(),{args:n}),Reflect.apply(e,s,n))});this.log(t.toString())}return s}})}dispatch(e,t,s={}){let i=Object.assign({},{bubbles:!0,cancelable:!0,detail:{target:e}},s);i.detail.target&&(i.detail.target=e);let n=new CustomEvent(t,i);e.dispatchEvent(n)}log(e,t={}){if(!this.application.debug)return;let s=console;s.groupCollapsed(`%c${this.identifier} %c#${e}`,"color: #3B82F6","color: unset"),s.log(i({element:this.element},t)),s.groupEnd()}}class a extends n{initialize(){this._handleVisibility=this._handleVisibility.bind(this)}connect(){window.addEventListener("focus",this._handleVisibility),window.addEventListener("blur",this._handleVisibility),document.addEventListener("visibilitychange",this._handleVisibility),this._handleVisibility()}disconnect(){window.removeEventListener("focus",this._handleVisibility),window.removeEventListener("blur",this._handleVisibility),document.removeEventListener("visibilitychange",this._handleVisibility)}appear(){this.dispatch(this.element,"appearance:appear")}away(){this.dispatch(this.element,"appearance:away")}_handleVisibility(){this._documentIsActive()?this.appear():this.away()}_documentIsActive(){return"visible"==document.visibilityState&&document.hasFocus()}}class r extends n{get _errorMessage(){return this.hasErrorMessageValue?this.errorMessageValue:"This content failed to load"}connect(){this.loadContent()}loadContent(){let e=this.hasReplaceTarget?this.replaceTarget:this.element;fetch(this.endpointValue).then(e=>e.text()).then(t=>{let s=document.createElement("div");if(s.innerHTML=t,this.hasSelectorValue){let t=s.querySelectorAll(this.selectorValue);e.replaceWith(...t)}else e.replaceWith(...s.children);let i=new CustomEvent("ajax:success",{detail:""});e.dispatchEvent(i)}).catch(t=>{e.replaceWith(this._errorMessage);let s=new CustomEvent("ajax:error",{detail:""});e.dispatchEvent(s)}).finally(()=>{let t=new CustomEvent("ajax:complete",{detail:""});e.dispatchEvent(t)})}}r.targets=["replace"],r.values={endpoint:String,errorMessage:String,selector:String};class l extends n{initialize(){this.handler=this.handler.bind(this)}connect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.addEventListener("change",this.handler))}disconnect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.removeEventListener("change",this.handler))}handler(e){this.element.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))}}const o=(e,t)=>{const s=e[t];return"function"==typeof s?s:(...e)=>{}},h=(e,t,s)=>{let i=e;return!0===s?i=`${t.identifier}:${e}`:"string"==typeof s&&(i=`${s}:${e}`),i},c=(e,t,s)=>{const{bubbles:i,cancelable:n,composed:a}=t||{bubbles:!0,cancelable:!0,composed:!0};return t&&Object.assign(s,{originalEvent:t}),new CustomEvent(e,{bubbles:i,cancelable:n,composed:a,detail:s})},d={dispatchEvent:!0,eventPrefix:!0},u=(e,t={})=>{const{dispatchEvent:s,eventPrefix:i}=Object.assign({},d,t),n=(null==t?void 0:t.element)||e.element,a=e.disconnect.bind(e),r=new IntersectionObserver(t=>{const[a]=t;a.isIntersecting?(t=>{if(e.isVisible=!0,o(e,"appear").call(e,t),s){const s=h("appear",e,i),a=c(s,null,{controller:e,entry:t});n.dispatchEvent(a)}})(a):e.isVisible&&(t=>{if(e.isVisible=!1,o(e,"disappear").call(e,t),s){const s=h("disappear",e,i),a=c(s,null,{controller:e,entry:t});n.dispatchEvent(a)}})(a)},t),l=()=>{r.observe(n)},u=()=>{r.unobserve(n)};return Object.assign(e,{isVisible:!1,disconnect(){u(),a()}}),l(),[l,u]},m={events:["click","touchend"],onlyVisible:!0,dispatchEvent:!0,eventPrefix:!0},g={debug:!1,logger:console};class p{constructor(e,t={}){var s,i,n;this.log=(e,t)=>{this.debug&&(this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${e}`,"color: #3B82F6","color: unset"),this.logger.log(Object.assign({controllerId:this.controllerId},t)),this.logger.groupEnd())},this.debug=null!==(i=null!==(s=null==t?void 0:t.debug)&&void 0!==s?s:e.application.stimulusUseDebug)&&void 0!==i?i:g.debug,this.logger=null!==(n=null==t?void 0:t.logger)&&void 0!==n?n:g.logger,this.controller=e,this.controllerId=e.element.id||e.element.dataset.id,this.controllerInitialize=e.initialize.bind(e),this.controllerConnect=e.connect.bind(e),this.controllerDisconnect=e.disconnect.bind(e)}}class v extends p{constructor(e,t={}){super(e,t),this.observe=()=>{this.targetElement.addEventListener("mouseenter",this.onEnter),this.targetElement.addEventListener("mouseleave",this.onLeave)},this.unobserve=()=>{this.targetElement.removeEventListener("mouseenter",this.onEnter),this.targetElement.removeEventListener("mouseleave",this.onLeave)},this.onEnter=()=>{o(this.controller,"mouseEnter").call(this.controller),this.log("mouseEnter",{hover:!0})},this.onLeave=()=>{o(this.controller,"mouseLeave").call(this.controller),this.log("mouseLeave",{hover:!1})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}class b extends p{constructor(e,t={}){super(e,t),this.observe=()=>{try{this.observer.observe(this.targetElement,this.options)}catch(e){this.controller.application.handleError(e,"At a minimum, one of childList, attributes, and/or characterData must be true",{})}},this.unobserve=()=>{this.observer.disconnect()},this.mutation=e=>{o(this.controller,"mutate").call(this.controller,e),this.log("mutate",{entries:e})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.options=t,this.observer=new MutationObserver(this.mutation),this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}const f=e=>{const t=t=>{const{innerWidth:s,innerHeight:i}=window,n={height:i||Infinity,width:s||Infinity,event:t};o(e,"windowResize").call(e,n)},s=e.disconnect.bind(e),i=()=>{window.addEventListener("resize",t),t()},n=()=>{window.removeEventListener("resize",t)};return Object.assign(e,{disconnect(){n(),s()}}),i(),[i,n]},E=(e,t=200)=>{let s=null;return function(){const i=arguments,n=this,a=()=>e.apply(n,i);s&&clearTimeout(s),s=setTimeout(a,t)}};class w extends n{initialize(){this._handler=this._handler.bind(this)}connect(){let e=this.element;e.style.resize="none",e.style.boxSizing="border-box",e.addEventListener("input",this._handler),e.addEventListener("focus",this._handler),f(this),requestAnimationFrame(this._handler)}windowResize(){this._handler()}_handler(){this.autosize(this.element)}autosize(e){let t=e.offsetHeight-e.clientHeight;e.style.height="auto",e.style.height=e.scrollHeight+t+"px"}}class V extends n{initialize(){this._updateCharCount=this._updateCharCount.bind(this)}connect(){this._updateCharCount(),this.inputTarget.addEventListener("input",this._updateCharCount)}disconnect(){this.inputTarget.removeEventListener("input",this._updateCharCount)}_updateCharCount(){let e=this.inputTarget.value.length;this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this._isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}_isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}V.targets=["input","output"],V.values={min:Number,max:Number},V.classes=["error"];class y extends n{get checked(){return this.checkboxTargets.filter(e=>e.checked)}get unchecked(){return this.checkboxTargets.filter(e=>!e.checked)}initialize(){this.toggle=this.toggle.bind(this),this.refresh=this.refresh.bind(this)}connect(){requestAnimationFrame(()=>{this.hasSelectAllTarget&&(this.selectAllTarget.addEventListener("change",this.toggle),this.checkboxTargets.forEach(e=>e.addEventListener("change",this.refresh)),this.refresh())})}disconnect(){this.hasSelectAllTarget&&(this.selectAllTarget.removeEventListener("change",this.toggle),this.checkboxTargets.forEach(e=>e.removeEventListener("change",this.refresh)))}toggle(e){e.preventDefault();let t=e.target;this.checkboxTargets.forEach(e=>e.checked=t.checked)}refresh(){const e=this.checkboxTargets.length,t=this.checked.length;this.selectAllTarget.checked=t>0,this.selectAllTarget.indeterminate=t>0&&t<e}}y.targets=["selectAll","checkbox"];class C extends n{constructor(){super(...arguments),this.supported=!1}connect(){this.supported=document.queryCommandSupported("copy"),this.hasRemoveUnusedValue&&this.removeUnusedValue&&(this.supported&&this.hasFallbackTarget?this.fallbackTarget.remove():this.hasCopyTarget&&this.copyTarget.remove())}select(e){e&&e.preventDefault(),this.sourceTarget.select()}copy(e){e&&e.preventDefault(),this.sourceTarget.select(),this.supported&&document.execCommand("copy")}}function T(e){return"A"==e.nodeName}function S(e){return"FORM"==e.nodeName}function L(e){return"INPUT"==e.nodeName}function k(e){return L(e)&&("radio"===e.type||"checkbox"===e.type)}C.targets=["button","copy","fallback"],C.values={removeUnused:Boolean};class x extends n{get message(){return this.hasMessageValue?this.messageValue:"Are you sure?"}initialize(){this.confirm=this.confirm.bind(this)}connect(){requestAnimationFrame(()=>{let e=this.element;if(S(e))e.addEventListener("submit",this.confirm);else{if(!T(e))throw new Error("Can't handle confirmation on attached element");e.addEventListener("click",this.confirm)}})}confirm(e){window.confirm(this.message)||(e.preventDefault(),this.dispatch(this.element,"confirm:cancelled"))}}x.values={message:String};class _ extends n{connect(){let e=this.messageValue;window.onbeforeunload=()=>null==e||e,window.addEventListener("popstate",this.handlePopstate),window.addEventListener("submit",()=>{window.removeEventListener("popstate",this.handlePopstate),window.onbeforeunload=null})}handlePopstate(e){return!1}}_.values={message:String};class I extends n{connect(){console.log("Debug Controller",this,this.testTargets)}}I.targets=["test"];class M extends n{constructor(){super(...arguments),this.initialValue=null}initialize(){this.checkDirty=this.checkDirty.bind(this)}connect(){let e=this.element;this.initialValue=k(e)?e.checked:e.value,e.addEventListener("input",this.checkDirty),e.addEventListener("change",this.checkDirty)}disconnect(){let e=this.element;e.removeEventListener("input",this.checkDirty),e.removeEventListener("change",this.checkDirty)}restore(){let e=this.element;k(e)?e.checked=this.initialValue:e.value=this.initialValue}checkDirty(e){let t=this.element;this.initialValue!==t.value?t.setAttribute("data-dirty","true"):t.removeAttribute("data-dirty")}}class O extends n{connect(){this.toggle()}toggle(){this.hasDisablerTarget&&this.disablerTarget.checked?this.disableInputs():this.enableInputs()}disableInputs(){let e=this.hasClearValue&&this.clearValue;this.disableTargets.forEach((t,s)=>{e&&(t.value=""),t.disabled=!0})}enableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!1})}}O.targets=["disabler","disable"],O.values={clear:Boolean};class D extends n{dismiss(){this.element.remove()}}class A extends n{connect(){((e,t={})=>{new b(this,t)})(0,{element:this.element,childList:!0}),this.checkEmpty()}mutate(e){this.checkEmpty()}checkEmpty(){let e;e=this.hasScopeSelectorValue?this.element.querySelectorAll(this.scopeSelectorValue):this.element.children,0===e.length?(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.element.dispatchEvent(new CustomEvent("dom:empty",{bubbles:!0,cancelable:!0}))):(this.hasNotEmptyClass&&this.notEmptyClass.split(" ").forEach(e=>this.element.classList.add(e)),this.hasEmptyClass&&this.emptyClass.split(" ").forEach(e=>this.element.classList.remove(e)),this.element.dispatchEvent(new CustomEvent("dom:not-empty",{bubbles:!0,cancelable:!0,detail:{count:e.length}})))}}A.classes=["empty","notEmpty"],A.values={scopeSelector:String};class z extends n{connect(){this.toggle()}toggle(){this.hasEnablerTarget&&this.enablerTarget.checked?this.enableInputs():this.disableInputs()}disableInputs(){let e=this.hasClearValue&&this.clearValue;this.enableTargets.forEach((t,s)=>{e&&(t.value=""),t.disabled=!0})}enableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!1})}}z.targets=["enabler","enable"],z.values={clear:Boolean};class H extends n{connect(){let e=this.element;e.onerror=()=>{this.hasPlaceholderValue?e.src=this.placeholderValue:e.style.display="none"}}}H.values={placeholder:String};class $ extends n{get formID(){if(this.hasIdValue)return this.idValue;let e=this.element.id;if(""!==e)return e;throw new Error(`No ID value to uniquely identify this form. Please either specify data-${this.identifier}-id-value or give this form an 'id' attribute. `)}get formIdentifier(){return`${location.href} ${this.formID}`}get formElements(){return this.element.elements}get formData(){let e={[this.formIdentifier]:{}};for(const t of this.formElements){let s=t;s.name.length>0&&(L(s)&&"checkbox"==s.type?e[this.formIdentifier][s.name]=s.checked:L(s)&&"radio"==s.type?s.checked&&(e[this.formIdentifier][s.name]=s.value):e[this.formIdentifier][s.name]=s.value)}return e}get restoreOnLoad(){return!this.hasRestoreOnLoadValue||this.restoreOnLoadValue}get clearOnSubmit(){return!this.hasClearOnSubmitValue||this.clearOnSubmitValue}initialize(){this._clear=this._clear.bind(this)}connect(){requestAnimationFrame(()=>{if(!S(this.element))throw new Error("Expected controller to be mounted on a form element.");this.restoreOnLoad&&this.restore(),this.clearOnSubmit&&this.element.addEventListener("submit",this._clear)})}disconnect(){this.clearOnSubmit&&this.element.removeEventListener("submit",this._clear)}_clear(){localStorage.removeItem(this.formIdentifier),this.dispatch(this.element,"form-save:cleared")}clear(e){e&&e.preventDefault(),this._clear()}save(e){e.preventDefault(),localStorage.setItem(this.formIdentifier,JSON.stringify(this.formData[this.formIdentifier])),this.dispatch(this.element,"form-save:save:success")}restore(e){if(e&&e.preventDefault(),localStorage.getItem(this.formIdentifier)){const e=JSON.parse(localStorage.getItem(this.formIdentifier));for(const t of this.formElements){let s=t;s.name in e&&(L(s)&&"checkbox"==s.type?s.checked=e[s.name]:L(s)&&"radio"==s.type?s.value==e[s.name]&&(s.checked=!0):s.value=e[s.name])}this.dispatch(this.element,"form-save:restore:success")}else this.dispatch(this.element,"form-save:restore:empty")}}$.values={id:String,restoreOnLoad:Boolean,clearOnSubmit:Boolean};class N extends n{get threshold(){return this.hasThresholdValue?this.thresholdValue.split(",").map(e=>Number.parseFloat(e.trim())).filter(e=>e>=0&&e<=1):[0,1]}connect(){u(this,{threshold:this.threshold,element:this.element})}appear(e){this.dispatch(this.element,"intersection:appear",{cancelable:!0,bubbles:!0,detail:{element:this.element}})}disappear(e){this.dispatch(this.element,"intersection:disappear",{cancelable:!0,bubbles:!0,detail:{element:this.element}})}}N.values={threshold:String};class R extends r{connect(){let e=this.element;"IntersectionObserver"in window?[this.observe,this.unobserve]=u(this,{element:e,threshold:.3}):this.loadContent()}appear(e){e.target===this.element&&e.isIntersecting&&(this.loadContent(),this.unobserve&&this.unobserve())}}const j="scrollBehavior"in document.documentElement.style;let P;async function F(e,{behavior:t="smooth",block:s="start",inline:i="nearest"}={}){"smooth"!=t||j||await async function(){const{polyfill:e}=await import("smoothscroll-polyfill");P||(P=!0,e())}(),e.scrollIntoView({behavior:t,block:s,inline:i})}function W(e){if(!e)return null;const t=getComputedStyle(e).overflowY;return"visible"!==t&&"hidden"!==t&&e.scrollHeight>=e.clientHeight?e:W(e.parentElement)||document.body}class q extends n{constructor(){super(...arguments),this._dialog=null}get src(){return this.hasSrcValue?this.srcValue:this.element.src}get srcSet(){return this.hasSrcSetValue?this.srcSetValue:this.element.srcset}get sizes(){return this.hasSizesValue?this.sizesValue:this.element.sizes}get modalClassName(){return this.hasModalClass?this.modalClass:"image-lightbox-dialog"}get imageClassName(){return this.hasImageClass?this.imageClass:"image-lightbox-image"}initialize(){this.open=this.open.bind(this),this.close=this.close.bind(this)}connect(){}open(){let e=this.element;if(this._dialog)return;this._dialog=document.createElement("dialog");let s=document.createElement("img");s.className=this.imageClassName,s.src=this.src,s.srcset=this.srcSet,s.sizes=this.sizes,this._dialog.appendChild(s),e.insertAdjacentElement("afterend",this._dialog),t.registerDialog(this._dialog),this._dialog.className=this.modalClassName,this._dialog.showModal(),F(this._dialog,{behavior:"smooth",block:"end"}).catch(()=>this._dialog.scrollIntoView(!1)),this._dialog.addEventListener("click",this.close),this._dialog.addEventListener("cancel",this.close),this._dialog.addEventListener("close",this.close)}close(){this._dialog&&(this._dialog.close(),this._dialog.remove(),this._dialog=null,F(this.element,{behavior:"smooth",block:"end"}).catch(()=>this.element.scrollIntoView(!1)))}}q.values={src:String,srcSet:String,sizes:String},q.classes=["modal","image"];class B extends n{initialize(){this.handleInputs=this.handleInputs.bind(this)}connect(){this.inputTargets.forEach(e=>e.addEventListener("change",this.handleInputs))}disconnect(){this.inputTargets.forEach(e=>e.removeEventListener("change",this.handleInputs))}handleInputs(e){let t=this.inputTargets.reduce((e,t)=>t.checked?e+1:e,0),s=e.target;t>this.maxValue?(e.preventDefault(),s.checked=!1,s.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!0})),s.dispatchEvent(new CustomEvent("limited-selection:too-many",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=this.messageValue)):(s.dispatchEvent(new CustomEvent("limited-selection:selection",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=""))}}B.targets=["input","error"],B.values={max:Number,message:String};class U extends n{get wrapperClass(){return this.hasWrapperSelectorValue?this.wrapperClassValue:"nested-fields"}get insertMode(){return this.hasInsertModeValue?this.insertModeValue:"beforeend"}connect(){this.checkStructure()}add(e){e&&e.preventDefault();const t=this.templateTarget.innerHTML.replace(/NEW_RECORD/g,this.generateID());this.targetTarget.insertAdjacentHTML(this.insertMode,t)}remove(e){e.preventDefault();const t=e.target.closest(`.${this.wrapperClass}`);if(null==t)throw new Error(`#remove was clicked from outside of a child record. Could not find an ancestor with class .${this.wrapperClass}`);if("true"===t.dataset.newRecord)t.remove();else{t.style.display="none";let e=t.querySelector("input[name*='_destroy']");if(null==e)throw new Error("Could not find a hidden input with name '_destroy'. NestedForm cannot remove an already persisted record without it.");e.value="1"}}generateID(){return(new Date).getTime().toString()+Math.random().toString().slice(2)}checkStructure(){if(this.templateTarget.innerHTML.indexOf("NEW_RECORD"))throw new Error("Could not find 'NEW_RECORD' in the provided template. Please make sure you've passed `child_index: 'NEW_RECORD'` to `fields_for`")}}U.targets=["target","template"],U.values={insertMode:String,wrapperClass:String};class J extends n{initialize(){this.checkPasswordsMatch=this.checkPasswordsMatch.bind(this)}connect(){this.passwordTargets.forEach(e=>e.addEventListener("change",this.checkPasswordsMatch))}disconnect(){this.passwordTargets.forEach(e=>e.removeEventListener("change",this.checkPasswordsMatch))}allPasswordsMatch(){let e=new Set(this.passwordTargets.map(e=>e.value));return e.has("")||1==e.size}checkPasswordsMatch(){let e=this.element;this.allPasswordsMatch()?(e.dispatchEvent(new CustomEvent("password-confirm:match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.remove(this.errorClass))):(e.dispatchEvent(new CustomEvent("password-confirm:no-match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.add(this.errorClass)))}}J.targets=["password"],J.classes=["error"];class Y extends n{peak(e){e&&e.preventDefault(),this.passwordTarget.type="text"}hide(e){e&&e.preventDefault(),this.passwordTarget.type="password"}toggle(e){e&&e.preventDefault(),"password"===this.passwordTarget.type?this.peak():this.hide()}}Y.targets=["password"];class G extends n{initialize(){this.messageReceived=this.messageReceived.bind(this)}connect(){window.addEventListener("message",this.messageReceived)}disconnect(){window.removeEventListener("message",this.messageReceived)}messageReceived(e){let t=e.data;t.hasOwnProperty("name")&&"iframe-body"===t.name&&t.hasOwnProperty("height")&&this.resize(t.height)}resize(e){this.element.style.height=`${e}px`}}class K extends n{connect(){var e,t,s;window.self!==window.top&&(f(this),t={},null===(s=(e=this).constructor.debounces)||void 0===s||s.forEach(s=>{if("string"==typeof s&&(e[s]=E(e[s],null==t?void 0:t.wait)),"object"==typeof s){const{name:i,wait:n}=s;if(!i)return;e[i]=E(e[i],n||(null==t?void 0:t.wait))}}),this.postUpdate())}windowResize(e){this.postUpdate()}postUpdate(){let e={name:"iframe-body",height:this.getHeight()};window.parent.postMessage(e,"*")}getHeight(){const e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)}}K.debounces=["postUpdate"];class Q extends n{_cleanupSelf(){this.cleanup(this.element)}cleanup(e){var t,i,n;e.dataset.controller=(null==(t=e.dataset.controller)?void 0:t.replaceAll(new RegExp(`(s|^)${this.identifier}(s|$)`,"g"),""))||"",""==e.dataset.controller&&delete e.dataset.controller;let a=new RegExp(`(s|^)${this.identifier}\\..+?(s|$)`,"g");e.dataset.target=(null==(i=e.dataset.target)?void 0:i.replaceAll(a,""))||"",delete e.dataset[s(`${this.identifier}-target`)],""==e.dataset.target&&delete e.dataset.target,e.dataset.action=(null==(n=e.dataset.target)?void 0:n.replaceAll(a,""))||"",delete e.dataset[s(`${this.identifier}-action`)],""==e.dataset.action&&delete e.dataset.action;let r=this.constructor.values;r&&Object.keys(r).forEach(t=>delete e.dataset[s(`${this.identifier}-${t}-value`)]);let l=this.constructor.classes;l&&Object.keys(l).forEach(t=>delete e.dataset[s(`${this.identifier}-${t}-class`)])}}class X extends Q{connect(){requestAnimationFrame(()=>{F(this.element,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>this.element.scrollIntoView()),this._cleanupSelf()})}}X.values={behavior:String,block:String,inline:String};class Z extends n{scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:W(this.element),null!=t&&F(t,{behavior:"smooth",block:"end"}).catch(()=>t.scrollIntoView(!1))}}Z.values={mode:String};class ee extends n{scroll(){let e=document.querySelector(this.selectorValue);e?F(e,{behavior:this.hasBehaviorValue?this.behaviorValue:"smooth",block:this.hasBlockValue?this.blockValue:"center",inline:this.hasInlineValue?this.inlineValue:"center"}).catch(()=>e.scrollIntoView()):console.warn(`Could not find target for '${this.selectorValue}'`)}}ee.values={selector:String,behavior:String,block:String,inline:String};class te extends n{scroll(e){let t;e&&e.preventDefault(),t="document"==(this.hasModeValue?this.modeValue:"document")?document.body:W(this.element),null!=t&&F(t,{behavior:"smooth",block:"start"}).catch(()=>t.scrollIntoView(!1))}}te.values={mode:String};class se extends n{constructor(){super(...arguments),this.timeout=null}connect(){requestAnimationFrame(()=>{this.timeout=setTimeout(()=>this.element.remove(),1e3*this.secondsValue)})}disconnect(){this.timeout&&clearTimeout(this.timeout)}}se.values={seconds:Number};class ie extends n{constructor(){super(...arguments),this._magicElement=null}get _mode(){return this.hasModeValue?this.modeValue:"top"}createMagicElement(){if(null===this._magicElement)switch(this._magicElement=document.createElement("div"),this._mode){case"top":this.element.insertAdjacentElement("beforebegin",this._magicElement);break;case"bottom":this.element.insertAdjacentElement("afterend",this._magicElement)}}connect(){let e=this.element;this.createMagicElement(),new IntersectionObserver(t=>{t.forEach(t=>{t.target===this._magicElement&&(0===t.intersectionRatio?e.classList.add(this.hasStuckClass?this.stuckClass:"stuck"):1===t.intersectionRatio&&e.classList.remove(this.hasStuckClass?this.stuckClass:"stuck"))})},{threshold:[0,1]}).observe(this._magicElement)}}ie.classes=["stuck"],ie.values={mode:String};class ne extends Q{connect(){if(!this.hasInsertValue)throw new Error("`insert` value was not specified");requestAnimationFrame(()=>{this.hasImmediateValue&&this.immediateValue&&this.execute()})}execute(e){e&&e.preventDefault();let t=document.querySelector(this.targetValue);if(null==t)return void this.element.dispatchEvent(new CustomEvent("teleport:error",{bubbles:!0,cancelable:!0}));let s=this.element.cloneNode(!0);switch(this.cleanup(s),this.insertValue){case"beforebegin":case"beforeend":case"afterend":case"afterbegin":t.insertAdjacentHTML(this.insertValue,s.outerHTML);break;case"replaceOuter":t.outerHTML=s.outerHTML;break;case"replaceInner":t.innerHTML=s.outerHTML;break;case"prepend":t.insertAdjacentHTML("afterbegin",s.outerHTML);break;case"append":t.insertAdjacentHTML("beforeend",s.outerHTML);break;default:throw new Error("`insert` value was not specified")}this.element.remove()}}ne.values={target:String,insert:String,immediate:Boolean};class ae extends n{connect(){if(!this.hasClassValue)throw new Error("data-toggle-class-class-value must not be empty");(this.hasMouseEnterValue||this.hasMouseLeaveValue)&&((e,t={})=>{new v(this,t)})(),this.hasClickAwayValue&&this.clickAwayValue&&((e,t={})=>{const{onlyVisible:s,dispatchEvent:i,events:n,eventPrefix:a}=Object.assign({},m,t),r=n=>{const r=(null==t?void 0:t.element)||e.element;if(!(r.contains(n.target)||!function(e){const t=e.getBoundingClientRect(),s=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth;return t.top<=s&&t.top+t.height>=0&&t.left<=i&&t.left+t.width>=0}(r)&&s)&&(e.clickOutside&&e.clickOutside(n),i)){const t=h("click:outside",e,a),s=c(t,n,{controller:e});r.dispatchEvent(s)}},l=e.disconnect.bind(e);Object.assign(e,{disconnect(){null==n||n.forEach(e=>{window.removeEventListener(e,r,!1)}),l()}}),null==n||n.forEach(e=>{window.addEventListener(e,r,!1)})})(this),requestAnimationFrame(()=>{this.hasInitialValue&&this.toggleTargets.forEach("on"===this.initialValue?e=>this.elementOn(e):e=>this.elementOff(e))})}clickOutside(){this.toggleTargets.forEach(e=>{this.elementWasToggled(e)&&(this.elementToggleStatus(e),this.elementToggle(e))})}mouseEnter(){if(this.hasMouseEnterValue)switch(this.mouseEnterValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}mouseLeave(){if(this.hasMouseLeaveValue)switch(this.mouseLeaveValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}on(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOn(e)})}off(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOff(e)})}toggle(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementToggle(e)})}elementWasToggled(e){return"true"==e.dataset.toggled}elementToggleStatus(e){this.elementWasToggled(e)?delete e.dataset.toggled:e.dataset.toggled="true"}elementToggle(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t))}elementOn(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!0))}elementOff(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!1))}}ae.targets=["toggle"],ae.values={class:String,mouseEnter:String,mouseLeave:String,clickAway:Boolean,initial:String};class re extends n{toggle(e){e&&e.preventDefault();let t=this._getFrame().src;null==t||t!==this._getSrc()?this._setSrc():this._clear()}setSrc(e){e&&e.preventDefault(),this._setSrc()}clear(e){e&&e.preventDefault(),this._clear()}_setSrc(){let e=this._getFrame();this.hasLoadingMessageValue&&(e.innerHTML=this.loadingMessageValue),e.src=this._getSrc()}_clear(){let e=this._getFrame();e.src="",e.innerHTML=""}_getFrame(){let e=document.getElementById(`${this.frameIdValue}`);if(null==e)throw new Error(`Could not find frame with ID '${this.frameIdValue}'`);if("TURBO-FRAME"!=e.nodeName)throw new Error(`Element targeted by ID '${this.frameIdValue}'`);return e}_getSrc(){let e=this.element;if(this.hasSrcValue)return this.srcValue;if(T(e))return e.href;throw new Error("No link given to drive frame to")}}re.values={frameId:String,src:String,loadingMessage:String};class le extends n{initialize(){this.updateWordCount=this.updateWordCount.bind(this)}connect(){this.updateWordCount(),this.inputTarget.addEventListener("input",this.updateWordCount)}disconnect(){this.inputTarget.removeEventListener("input",this.updateWordCount)}updateWordCount(){let e=0,t=this.inputTarget.value.match(/\S+/g);e=t&&t.length||0,this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}le.targets=["input","output"],le.values={min:Number,max:Number},le.classes=["error"];export{a as AppearanceController,r as AsyncBlockController,l as AutoSubmitFormController,w as AutosizeController,V as CharCountController,y as CheckboxSelectAllController,C as ClipboardController,x as ConfirmController,_ as ConfirmNavigationController,I as DebugController,M as DetectDirtyController,O as DisableInputsController,D as DismissableController,A as EmptyDomController,z as EnableInputsController,H as FallbackImageController,$ as FormSaveController,N as IntersectionController,R as LazyBlockController,q as LightboxImageController,B as LimitedSelectionCheckboxesController,U as NestedFormController,J as PasswordConfirmController,Y as PasswordPeekController,K as ResponsiveIframeBodyController,G as ResponsiveIframeWrapperController,X as ScrollIntoFocusController,Z as ScrollToBottomController,ee as ScrollToController,te as ScrollToTopController,se as SelfDestructController,ie as StickyController,ne as TeleportController,ae as ToggleClassController,re as TurboFrameRCController,le as WordCountController};
//# sourceMappingURL=stimulus-library.modern.js.map
