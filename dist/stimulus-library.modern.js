import{Controller as e}from"stimulus";import{useWindowResize as t,useMutation as s,useIntersection as a,useDebounce as n,useHover as i,useClickOutside as r}from"stimulus-use";class l extends e{connect(){this.loadContent()}loadContent(){let e=this.hasReplaceTarget?this.replaceTarget:this.element;fetch(this.endpointValue).then(e=>e.text()).then(t=>{let s=document.createElement("div");s.innerHTML=t,e.replaceWith(s);let a=new CustomEvent("ajax:success",{detail:""});e.dispatchEvent(a)}).catch(t=>{e.replaceWith("Sorry, this content failed to load");let s=new CustomEvent("ajax:error",{detail:""});e.dispatchEvent(s)}).finally(()=>{let t=new CustomEvent("ajax:complete",{detail:""});e.dispatchEvent(t)})}}l.targets=["replace"],l.values={endpoint:String};class o extends e{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.addEventListener("change",this.boundHandler))}disconnect(){this.element.querySelectorAll("input, select, textarea").forEach(e=>e.removeEventListener("change",this.boundHandler))}handler(e){this.element.dispatchEvent(new CustomEvent("submit",{bubbles:!0,cancelable:!0}))}}class h extends e{constructor(){super(...arguments),this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;e.style.resize="none",e.style.boxSizing="border-box",t(this),setTimeout(this.boundHandler,1e3),e.addEventListener("input",this.boundHandler),e.addEventListener("focus",this.boundHandler)}windowResize(){this.handler()}handler(){this.autosize(this.element)}autosize(e){let t=e.offsetHeight-e.clientHeight;e.style.height="auto",e.style.height=e.scrollHeight+t+"px"}}class c extends e{constructor(){super(...arguments),this.boundHandler=this.updateCharCount.bind(this)}connect(){this.updateCharCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateCharCount(){let e=this.inputTarget.value.length;this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}c.targets=["input","output"],c.values={min:Number,max:Number},c.classes=["error"];class d extends e{constructor(){super(...arguments),this.supported=!1}connect(){this.supported=document.queryCommandSupported("copy"),this.hasRemoveUnusedValue&&this.removeUnusedValue&&(this.supported&&this.hasFallbackTarget?this.fallbackTarget.remove():this.hasCopyTarget&&this.copyTarget.remove())}select(e){e&&e.preventDefault(),this.sourceTarget.select()}copy(e){e&&e.preventDefault(),this.sourceTarget.select(),this.supported&&document.execCommand("copy")}}d.targets=["button","copy","fallback"],d.values={removeUnused:Boolean};class u extends e{connect(){let e=this.messageValue;window.onbeforeunload=()=>null==e||e,window.addEventListener("popstate",this.handlePopstate),window.addEventListener("submit",()=>{window.removeEventListener("popstate",this.handlePopstate),window.onbeforeunload=null})}handlePopstate(e){return!1}}u.values={message:String};class g extends e{connect(){console.log("Debug Controller",this.testTargets)}}g.targets=["test"];class p extends e{constructor(){super(...arguments),this.initialValue=null,this.boundHandler=this.handler.bind(this)}connect(){let e=this.element;this.initialValue=this.isInputElement(e)&&this.isCheckable(e)?e.checked:e.value,e.addEventListener("input",this.boundHandler),e.addEventListener("change",this.boundHandler)}disconnect(){let e=this.element;e.removeEventListener("input",this.boundHandler),e.removeEventListener("change",this.boundHandler)}restore(){let e=this.element;this.isInputElement(e)&&this.isCheckable(e)?e.checked=this.initialValue:e.value=this.initialValue}handler(e){let t=this.element;this.initialValue!==t.value?t.setAttribute("data-dirty","true"):t.removeAttribute("data-dirty")}isCheckable(e){return"radio"===e.type||"checkbox"===e.type}isInputElement(e){return"INPUT"===e.tagName}}class m extends e{connect(){this.toggle()}toggle(){this.hasDisablerTarget&&this.disablerTarget.checked?this.disableInputs():this.enableInputs()}disableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!0})}enableInputs(){this.disableTargets.forEach((e,t)=>{e.disabled=!1})}}m.targets=["disabler","disable"];class b extends e{dismiss(){this.element.remove()}}class v extends e{connect(){s(this,{element:this.element,childList:!0})}mutate(e){let t;t=this.hasScopeSelectorValue?this.element.querySelectorAll(this.scopeSelectorValue):this.element.children,0===t.length?(this.hasNotEmptyClass&&this.element.classList.remove(this.notEmptyClass),this.hasEmptyClass&&this.element.classList.add(this.emptyClass),this.element.dispatchEvent(new CustomEvent("dom:empty",{bubbles:!0,cancelable:!0}))):(this.hasNotEmptyClass&&this.element.classList.add(this.notEmptyClass),this.hasEmptyClass&&this.element.classList.remove(this.emptyClass),this.element.dispatchEvent(new CustomEvent("dom:not-empty",{bubbles:!0,cancelable:!0})))}}v.classes=["empty","notEmpty"],v.values={scopeSelector:String};class E extends e{connect(){this.toggle()}toggle(){this.hasEnablerTarget&&this.enablerTarget.checked?this.enableInputs():this.disableInputs()}disableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!0})}enableInputs(){this.enableTargets.forEach((e,t)=>{e.disabled=!1})}}E.targets=["enabler","enable"];class T extends e{connect(){let e=this.element;e.onerror=()=>{this.hasPlaceholderValue?e.src=this.placeholderValue:e.style.display="none"}}}T.values={placeholder:String};class f extends l{connect(){this.options={element:this.element,threshold:.3},"IntersectionObserver"in window?[this.observe,this.unobserve]=a(this,this.options):this.loadContent()}appear(e){let t=this.element;""===t.src&&e.target===t&&e.isIntersecting&&(this.loadContent(),this.unobserve&&this.unobserve())}}class w extends e{constructor(){super(...arguments),this.maxSelections=0,this.boundHandleInputs=this.handleInputs.bind(this)}connect(){this.inputTargets.forEach(e=>e.addEventListener("change",this.boundHandleInputs))}disconnect(){this.inputTargets.forEach(e=>e.removeEventListener("change",this.boundHandleInputs))}handleInputs(e){let t=this.inputTargets.reduce((e,t)=>t.checked?e+1:e,0),s=e.target;t>this.maxSelections?(e.preventDefault(),s.checked=!1,s.dispatchEvent(new CustomEvent("change",{bubbles:!0,cancelable:!0})),s.dispatchEvent(new CustomEvent("limited-selection:too-many",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=this.messageValue)):(s.dispatchEvent(new CustomEvent("limited-selection:selection",{bubbles:!0,cancelable:!0,detail:{target:s}})),this.hasErrorTarget&&(this.errorTarget.innerHTML=""))}}w.targets=["input","error"],w.values={max:Number,message:String};class C extends e{constructor(){super(...arguments),this.boundCheckPasswordsMatch=this.checkPasswordsMatch.bind(this)}connect(){this.passwordTargets.forEach(e=>e.addEventListener("change",this.boundCheckPasswordsMatch))}disconnect(){this.passwordTargets.forEach(e=>e.removeEventListener("change",this.boundCheckPasswordsMatch))}allPasswordsMatch(){let e=new Set(this.passwordTargets.map(e=>e.value));return e.has("")||1==e.size}checkPasswordsMatch(){this.allPasswordsMatch()?(this.element.dispatchEvent(new CustomEvent("password-confirm:match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.remove(this.errorClass))):(this.element.dispatchEvent(new CustomEvent("password-confirm:no-match")),this.hasErrorClass&&this.passwordTargets.forEach(e=>e.classList.add(this.errorClass)))}}C.targets=["password"],C.classes=["error"];class L extends e{connect(){}peak(e){e&&e.preventDefault(),this.passwordTarget.type="text"}hide(e){e&&e.preventDefault(),this.passwordTarget.type="password"}toggle(e){e&&e.preventDefault(),"password"===this.passwordTarget.type?this.peak():this.hide()}}L.targets=["password"];class x extends e{constructor(){super(...arguments),this.boundMessageReceived=this.messageReceived.bind(this)}connect(){window.addEventListener("message",this.boundMessageReceived)}disconnect(){window.removeEventListener("message",this.boundMessageReceived)}messageReceived(e){let t=e.data;t.hasOwnProperty("name")&&"iframe-body"===t.name&&t.hasOwnProperty("height")&&this.resize(t.height)}resize(e){this.element.style.height=`${e}px`}}class y extends e{connect(){window.self!==window.top&&(t(this),n(this,{}),this.postUpdate())}windowResize(e){this.postUpdate()}postUpdate(){let e={name:"iframe-body",height:this.getHeight()};window.parent.postMessage(e,"*")}getHeight(){const e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)}}y.debounces=["postUpdate"];class H extends e{constructor(){super(...arguments),this.timeout=null}connect(){this.timeout=setTimeout(()=>this.element.remove(),1e3*this.secondsValue)}disconnect(){this.timeout&&clearTimeout(this.timeout)}}H.values={seconds:Number};class V extends e{connect(){var e;let t=document.querySelector(this.targetValue);if(null==t)return void this.element.dispatchEvent(new CustomEvent("teleport:error",{bubbles:!0,cancelable:!0}));let s=this.element.cloneNode(!0);switch(s.removeAttribute(`${this.identifier}-insert-adjacent-html-value`),s.setAttribute("data-controller",(null==(e=s.getAttribute("data-controller"))?void 0:e.replace(new RegExp(`(^|s)${this.identifier}($|s)`),""))||""),s.removeAttribute(`data-controller${this.identifier}-insert-adjacent-html-value`),this.insertValue){case"beforebegin":case"beforeend":case"afterend":case"afterbegin":t.insertAdjacentHTML(this.insertValue,s.outerHTML);break;case"replaceOuter":t.outerHTML=s.outerHTML;break;case"replaceInner":t.innerHTML=s.outerHTML;break;case"prepend":t.insertAdjacentHTML("afterbegin",s.outerHTML);break;case"append":t.insertAdjacentHTML("beforeend",s.outerHTML)}}}V.values={target:String,insert:String};class M extends e{connect(){if(this.toggleTargets.forEach("on"===this.initialValue?e=>this.elementOn(e):e=>this.elementOff(e)),(this.hasMouseEnterValue||this.hasMouseLeaveValue)&&i(this),this.hasClickAwayValue&&this.clickAwayValue&&r(this),!this.hasClassValue)throw new Error("data-toggle-class-class-value must not be empty")}clickOutside(){this.toggleTargets.forEach(e=>{this.elementWasToggled(e)&&(this.elementToggleStatus(e),this.elementToggle(e))})}mouseEnter(){if(this.hasMouseEnterValue)switch(this.mouseEnterValue){case"on":this.on();break;case"off":this.off();break;case"toggle":this.toggle()}return{}}mouseLeave(){if(this.hasMouseLeaveValue)switch(this.mouseLeaveValue){case"on":this.off();break;case"off":this.on();break;case"toggle":this.toggle()}return{}}on(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOn(e)})}off(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementOff(e)})}toggle(e){this.toggleTargets.forEach(e=>{this.elementToggleStatus(e),this.elementToggle(e)})}elementWasToggled(e){return"true"==e.dataset.toggled}elementToggleStatus(e){this.elementWasToggled(e)?delete e.dataset.toggled:e.dataset.toggled="true"}elementToggle(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t))}elementOn(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!0))}elementOff(e){this.classValue.split(" ").forEach(t=>e.classList.toggle(t,!1))}}M.targets=["toggle"],M.values={class:String,mouseEnter:String,mouseLeave:String,clickAway:Boolean,initial:Boolean};class k extends e{constructor(){super(...arguments),this.boundHandler=this.updateWordCount.bind(this)}connect(){this.updateWordCount(),this.inputTarget.addEventListener("input",this.boundHandler)}disconnect(){this.inputTarget.removeEventListener("input",this.boundHandler)}updateWordCount(){let e=0,t=this.inputTarget.value.match(/\S+/g);e=t&&t.length||0,this.outputTarget.innerText=e.toString(),this.hasErrorClass&&(this.isValidCount(e)?this.outputTarget.classList.remove(this.errorClass):this.outputTarget.classList.add(this.errorClass))}isValidCount(e){let t=0,s=99999;return this.hasMinValue&&(t=this.minValue),this.hasMaxValue&&(s=this.maxValue),e>=t&&e<=s}}k.targets=["input","output"],k.values={min:Number,max:Number},k.classes=["error"];export{l as AsyncBlockController,o as AutoSubmitFormController,h as AutosizeController,c as CharCountController,d as ClipboardController,u as ConfirmNavigationController,g as DebugController,p as DetectDirtyController,m as DisableInputsController,b as DismissableController,v as EmptyDomController,E as EnableInputsController,T as FallbackImageController,f as LazyBlockController,w as LimitedSelectionCheckboxesController,C as PasswordConfirmController,L as PasswordPeekController,y as ResponsiveIframeBodyController,x as ResponsiveIframeWrapperController,H as SelfDestructController,V as TeleportController,M as ToggleClassController,k as WordCountController};
//# sourceMappingURL=stimulus-library.modern.js.map