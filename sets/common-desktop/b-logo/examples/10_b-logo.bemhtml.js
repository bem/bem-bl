var BEMHTML = (function(exports) {var __r8,__r10,__r12,__r14,__r16,__r18,__r20,__r22,__r24,__r26;exports.apply = apply;function apply(c) {
var __this = this;
if(this['block'] === 'b-logo' && this['elem'] === 'icon' && this['_mode'] === 'default') {{var ctx = this['ctx'];{"";var __r46 = this['_mode'];(this['_mode']='');var __r47 = ctx['elem'];(ctx['elem']=undefined);var __r48 = ctx['block'];(ctx['block']='b-icon');var __r49 = ctx['mix'];(ctx['mix']=[({'block': 'b-logo','elem': 'icon'})]);this.apply();(this['_mode']=__r46);(ctx['elem']=__r47);(ctx['block']=__r48);(ctx['mix']=__r49);""}};return}
if(this['block'] === 'b-logo' && this['elem'] === 'link' && this['_mode'] === 'default') {{var ctx = this['ctx'],content = (ctx['content'] || ctx['icon']);(ctx['icon'] && (ctx['icon']['block']='b-logo'));if((ctx['content'] instanceof Array)){for(var c in ctx['content']){(ctx['content'][c]['elem'] && (ctx['content'][c]['block']='b-logo'))}}else{undefined}{"";var __r41 = this['_mode'];(this['_mode']='');var __r42 = ctx['elem'];(ctx['elem']=undefined);var __r43 = ctx['block'];(ctx['block']='b-link');var __r44 = ctx['content'];(ctx['content']=content);var __r45 = ctx['mix'];(ctx['mix']=[({'block': 'b-logo','elem': 'link'})]);this.apply();(this['_mode']=__r41);(ctx['elem']=__r42);(ctx['block']=__r43);(ctx['content']=__r44);(ctx['mix']=__r45);""}};return}
if((! (! this['elem'])) === false && this['block'] === 'b-icon' && this['_mode'] === 'attrs') {{var ctx = this['ctx'],a = ({'src': '//yandex.st/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif','alt': ''}),props = ['alt','width','height'],p;(ctx['url'] && (a['src']=ctx['url']));while((p=props.shift())){(ctx[p] && (a[p]=ctx[p]))}return a};return}
if((! (! this['elem'])) === false && this['block'] === 'b-icon' && this['_mode'] === 'tag') {return 'img';return}
if((! (! this['elem'])) === false && this['block'] === 'b-link' && this['_mode'] === 'attrs') {{var ctx = this['ctx'],a = ({'href': ctx['url']}),props = ['title','target'],p;while((p=props.shift())){(ctx[p] && (a[p]=ctx[p]))}return a};return}
if((! (! this['elem'])) === false && this['block'] === 'b-link' && this['_mode'] === 'tag') {return 'a';return}
if(this['block'] === 'b-page' && this['elem'] === 'favicon' && this['_mode'] === 'attrs') {return ({'rel': 'shortcut icon','href': this['ctx']['url']});return}
if(this['block'] === 'b-page' && this['elem'] === 'favicon' && this['_mode'] === 'tag') {return 'link';return}
if(this['block'] === 'b-page' && this['elem'] === 'favicon' && this['_mode'] === 'bem') {return false;return}
if(this['block'] === 'b-page' && this['elem'] === 'js' && this['_mode'] === 'attrs' && (! this['ctx']['url']) === false) {return ({'src': this['ctx']['url']});return}
if(this['block'] === 'b-page' && this['elem'] === 'js' && this['_mode'] === 'tag') {return 'script';return}
if(this['block'] === 'b-page' && this['elem'] === 'js' && this['_mode'] === 'bem') {return false;return}
if(this['block'] === 'b-page' && this['elem'] === 'css' && (! this['ctx']['url']) === false && this['_mode'] === 'attrs') {return ({'rel': 'stylesheet','href': this['ctx']['url']});return}
if(this['block'] === 'b-page' && this['elem'] === 'css' && (! this['ctx']['url']) === false && this['_mode'] === 'tag') {return 'link';return}
if(this['block'] === 'b-page' && this['elem'] === 'css' && this['_mode'] === 'default' && (! this['ctx'].hasOwnProperty('ie')) === false && (! (! this['ctx']['_ieCommented'])) === false) {{var hideRule = ((! this['ctx']['ie'])?['gt IE 7','<!-->','<!--']:[this['ctx']['ie'],'','']);{"";var __r37 = this['_mode'];(this['_mode']='');var __r38 = this['ctx'],__r39 = __r38['_ieCommented'];(__r38['_ieCommented']=true);var __r40 = this['ctx'];(this['ctx']=[(('<!--[if ' + hideRule[(0)]) + ']>'),hideRule[(1)],this['ctx'],hideRule[(2)],'<![endif]-->']);this.apply();(this['_mode']=__r37);(__r38['_ieCommented']=__r39);(this['ctx']=__r40);""}};return}
if(this['block'] === 'b-page' && this['elem'] === 'css' && this['_mode'] === 'tag') {return 'style';return}
if(this['block'] === 'b-page' && this['elem'] === 'css' && this['_mode'] === 'bem') {return false;return}
if(this['block'] === 'b-page' && this['elem'] === 'meta' && this['_mode'] === 'attrs') {return this['ctx']['attrs'];return}
if(this['block'] === 'b-page' && this['elem'] === 'meta' && this['_mode'] === 'tag') {return 'meta';return}
if(this['block'] === 'b-page' && this['elem'] === 'meta' && this['_mode'] === 'bem') {return false;return}
if(this['block'] === 'b-page' && this['elem'] === 'body' && this['_mode'] === 'tag') {return 'body';return}
if(this['block'] === 'b-page' && this['elem'] === 'head' && this['_mode'] === 'tag') {return 'head';return}
if(this['block'] === 'b-page' && this['elem'] === 'head' && this['_mode'] === 'bem') {return false;return}
if((! (! this['elem'])) === false && this['block'] === 'b-page' && this['_mode'] === 'default') {{this['_buf'].push('<!DOCTYPE html>');{"";var __r35 = this['_mode'];(this['_mode']='');var __r36 = this['ctx'];(this['ctx']=({'tag': 'html','attrs': ({'xmlns:fb': 'http://ogp.me/ns/fb#'}),'cls': 'i-ua_js_no i-ua_css_standard','content': [({'elem': 'head','content': [({'tag': 'meta','attrs': ({'charset': 'utf-8'})}),({'tag': 'meta','attrs': ({'http-equiv': 'X-UA-Compatible','content': 'IE=EmulateIE7, IE=edge'})}),({'tag': 'title','content': this['ctx']['title']}),(this['ctx']['favicon']?({'elem': 'favicon','url': this['ctx']['favicon']}):''),this['ctx']['meta'],({'block': 'i-ua'}),this['ctx']['head']]}),({'elem': 'body','mix': [this['ctx']],'content': [this['ctx']['content']]})]}));this.apply();(this['_mode']=__r35);(this['ctx']=__r36);""}};return}
if(this['block'] === 'i-jquery' && this['elem'] === 'core' && this['_mode'] === 'default') {{"";var __r33 = this['_mode'];(this['_mode']='');var __r34 = this['ctx'];(this['ctx']=({'block': 'b-page','elem': 'js','url': 'http://yandex.st/jquery/1.6.2/jquery.min.js'}));this.apply();(this['_mode']=__r33);(this['ctx']=__r34);""};return}
if((! (! this['elem'])) === false && this['block'] === 'i-ua' && this['_mode'] === 'content') {return [';(function(d,e,c,r){','e=d.documentElement;','c="className";','r="replace";','e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");','if(d.compatMode!="CSS1Compat")','e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")','})(document);'].join('');return}
if((! (! this['elem'])) === false && this['block'] === 'i-ua' && this['_mode'] === 'bem') {return false;return}
if((! (! this['elem'])) === false && this['block'] === 'i-ua' && this['_mode'] === 'tag') {return 'script';return}
if((! (! this['_start'])) === false) {{var BEM = ({}),toString = Object['prototype']['toString'],SHORT_TAGS = ({'area': (1),'base': (1),'br': (1),'col': (1),'command': (1),'embed': (1),'hr': (1),'img': (1),'input': (1),'keygen': (1),'link': (1),'meta': (1),'param': (1),'source': (1),'wbr': (1)});(function (BEM,undefined){var MOD_DELIM = '_',ELEM_DELIM = '__',NAME_PATTERN = '[a-zA-Z0-9-]+';var buildModPostfix = (function (modName,modVal,buffer){buffer.push(MOD_DELIM,modName,MOD_DELIM,modVal)});var buildBlockClass = (function (name,modName,modVal,buffer){buffer.push(name);(modVal && buildModPostfix(modName,modVal,buffer))});var buildElemClass = (function (block,name,modName,modVal,buffer){buildBlockClass(block,undefined,undefined,buffer);buffer.push(ELEM_DELIM,name);(modVal && buildModPostfix(modName,modVal,buffer))});(BEM['INTERNAL']=({'NAME_PATTERN': NAME_PATTERN,'MOD_DELIM': MOD_DELIM,'ELEM_DELIM': ELEM_DELIM,'buildModPostfix': (function (modName,modVal,buffer){var res = (buffer || []);buildModPostfix(modName,modVal,res);return (buffer?res:res.join(''))}),'buildClass': (function (block,elem,modName,modVal,buffer){var typeOf = (typeof modName);if((typeOf == 'string')){if(((typeof modVal) != 'string')){(buffer=modVal);(modVal=modName);(modName=elem);(elem=undefined)}else{undefined}}else{if((typeOf != 'undefined')){(buffer=modName);(modName=undefined)}else{if((elem && ((typeof elem) != 'string'))){(buffer=elem);(elem=undefined)}else{undefined}}};undefined;if((! ((elem || modName) || buffer))){return block}else{undefined};undefined;var res = (buffer || []);(elem?buildElemClass(block,elem,modName,modVal,res):buildBlockClass(block,modName,modVal,res));return (buffer?res:res.join(''))}),'buildModsClasses': (function (block,elem,mods,buffer){var res = (buffer || []);if(mods){var modName;for(modName in mods){if(mods.hasOwnProperty(modName)){var modVal = mods[modName];res.push(' ');(elem?buildElemClass(block,elem,modName,modVal,res):buildBlockClass(block,modName,modVal,res))}else{undefined}}}else{undefined};undefined;return (buffer?res:res.join(''))}),'buildClasses': (function (block,elem,mods,buffer){var res = (buffer || []);(elem?buildElemClass(block,elem,undefined,undefined,res):buildBlockClass(block,undefined,undefined,res));this.buildModsClasses(block,elem,mods,buffer);return (buffer?res:res.join(''))})}))})(BEM);var buildEscape = (function (){var ts = ({'"': '&quot;','&': '&amp;','<': '&lt;','>': '&gt;'}),f = (function (t){return (ts[t] || t)});return (function (r){(r=new RegExp(r,'g'));return (function (s){return ('' + s).replace(r,f)})})})(),ctx = ({'ctx': this,'_start': true,'apply': apply,'_buf': [],'_': ({'isArray': (function (obj){return (toString.call(obj) === '[object Array]')}),'isSimple': (function (obj){var t = (typeof obj);return ((t === 'string') || (t === 'number'))}),'isShortTag': (function (t){return SHORT_TAGS.hasOwnProperty(t)}),'extend': (function (o1,o2){if(((! o1) || (! o2))){return (o1 || o2)}else{undefined};undefined;var res = ({}),n;for(n in o1){(o1.hasOwnProperty(n) && (res[n]=o1[n]))};undefined;for(n in o2){(o2.hasOwnProperty(n) && (res[n]=o2[n]))};undefined;return res}),'xmlEscape': buildEscape('[&<>]'),'attrEscape': buildEscape('["&<>]')}),'BEM': BEM,'isFirst': (function (){return (this['position'] === (1))}),'isLast': (function (){return (this['position'] === this['_listLength'])})});ctx.apply();return ctx['_buf'].join('')};return}
if(this['_mode'] === 'content') {return this['ctx']['content'];return}
if(this['_mode'] === 'mix') {return undefined;return}
if(this['_mode'] === 'bem') {return undefined;return}
if(this['_mode'] === 'jsAttr') {return undefined;return}
if(this['_mode'] === 'js') {return undefined;return}
if(this['_mode'] === 'cls') {return undefined;return}
if(this['_mode'] === 'attrs') {return undefined;return}
if(this['_mode'] === 'tag') {return undefined;return}
if(this['_mode'] === 'default') {{var _this = this,BEM = _this['BEM'],v = this['ctx'],buf = this['_buf'],tag;(tag=(((((("" , (__r8=this['_mode'])) , (this['_mode']='tag')) , (__r9=apply.call(__this))) , (this['_mode']=__r8)) , "") , __r9));(((typeof tag) != 'undefined') || (tag=v['tag']));(((typeof tag) != 'undefined') || (tag='div'));if(tag){var jsParams,js;if((this['block'] && (v['js'] !== false))){(js=(((((("" , (__r12=this['_mode'])) , (this['_mode']='js')) , (__r13=apply.call(__this))) , (this['_mode']=__r12)) , "") , __r13));(js=(js?this['_'].extend(v['js'],((js === true)?({}):js)):((v['js'] === true)?({}):v['js'])));(js && ((jsParams=({}))[BEM['INTERNAL'].buildClass(this['block'],v['elem'])]=js))}else{undefined};undefined;buf.push('<',tag);var isBEM = (((((("" , (__r14=this['_mode'])) , (this['_mode']='bem')) , (__r15=apply.call(__this))) , (this['_mode']=__r14)) , "") , __r15);(((typeof isBEM) != 'undefined') || (isBEM=(((typeof v['bem']) != 'undefined')?v['bem']:(v['block'] || v['elem']))));var cls = (((((("" , (__r16=this['_mode'])) , (this['_mode']='cls')) , (__r17=apply.call(__this))) , (this['_mode']=__r16)) , "") , __r17);(cls || (cls=v['cls']));var addJSInitClass = (v['block'] && jsParams);if((isBEM || cls)){buf.push(' class="');if(isBEM){BEM['INTERNAL'].buildClasses(this['block'],v['elem'],(v['elemMods'] || v['mods']),buf);var mix = (((((("" , (__r18=this['_mode'])) , (this['_mode']='mix')) , (__r19=apply.call(__this))) , (this['_mode']=__r18)) , "") , __r19);(v['mix'] && (mix=(mix?mix.concat(v['mix']):v['mix'])));if(mix){var i = (0),l = mix['length'],mixItem,hasItem,block;while((i < l)){(mixItem=mix[i++]);((hasItem=(mixItem['block'] || mixItem['elem'])) , (block=(mixItem['block'] || _this['block'])));(hasItem && buf.push(' '));BEM['INTERNAL'][(hasItem?'buildClasses':'buildModsClasses')](block,(mixItem['elem'] || (mixItem['block']?undefined:_this['elem'])),(mixItem['elemMods'] || mixItem['mods']),buf);if(mixItem['js']){((jsParams || (jsParams=({})))[BEM['INTERNAL'].buildClass(block,mixItem['elem'])]=((mixItem['js'] === true)?({}):mixItem['js']));(addJSInitClass || (addJSInitClass=(block && (! mixItem['elem']))))}else{undefined}}}else{undefined}}else{undefined};undefined;(cls && buf.push((isBEM?' ':''),cls));(addJSInitClass && buf.push(' i-bem'));buf.push('"')}else{undefined};undefined;if(jsParams){var jsAttr = (((((("" , (__r22=this['_mode'])) , (this['_mode']='jsAttr')) , (__r23=apply.call(__this))) , (this['_mode']=__r22)) , "") , __r23);buf.push(' ',(jsAttr || 'onclick'),'="return ',this['_'].attrEscape(JSON.stringify(jsParams)),'"')}else{undefined};undefined;var attrs = (((((("" , (__r24=this['_mode'])) , (this['_mode']='attrs')) , (__r25=apply.call(__this))) , (this['_mode']=__r24)) , "") , __r25);(attrs=this['_'].extend(attrs,v['attrs']));if(attrs){var name;for(name in attrs){buf.push(' ',name,'="',this['_'].attrEscape(attrs[name]),'"')}}else{undefined}}else{undefined}if(this['_'].isShortTag(tag)){buf.push('/>')}else{(tag && buf.push('>'));var content = (((((("" , (__r26=this['_mode'])) , (this['_mode']='content')) , (__r27=apply.call(__this))) , (this['_mode']=__r26)) , "") , __r27);if((content || (content === (0)))){var isBEM = (this['block'] || this['elem']);{"";var __r28 = this['_notNewList'];(this['_notNewList']=false);var __r29 = this['position'];(this['position']=(isBEM?(1):this['position']));var __r30 = this['_listLength'];(this['_listLength']=(isBEM?(1):this['_listLength']));var __r31 = this['ctx'];(this['ctx']=content);var __r32 = this['_mode'];(this['_mode']='');apply.call(__this);(this['_notNewList']=__r28);(this['position']=__r29);(this['_listLength']=__r30);(this['ctx']=__r31);(this['_mode']=__r32);""};undefined;undefined;undefined}else{undefined};undefined;(tag && buf.push('</',tag,'>'))}};return}
if((! (! this['_mode'])) === false && (! this['_'].isSimple(this['ctx'])) === false) {{this['_listLength']--;this['_buf'].push(this['ctx'])};return}
if((! (! this['_mode'])) === false && (! (! this['ctx'])) === false) {this['_listLength']--;return}
if((! (! this['_mode'])) === false && (! this['_'].isArray(this['ctx'])) === false) {{var v = this['ctx'],l = v['length'],i = (0),prevPos = this['position'],prevNotNewList = this['_notNewList'];if(prevNotNewList){(this['_listLength']+=(l - (1)))}else{(this['position']=(0));(this['_listLength']=l)}(this['_notNewList']=true);while((i < l)){{"";var __r7 = this['ctx'];(this['ctx']=v[i++]);apply.call(__this);(this['ctx']=__r7);""};undefined}undefined;(prevNotNewList || (this['position']=prevPos))};return}
if((! (! this['_mode'])) === false && (! true) === false) {{var vBlock = this['ctx']['block'],vElem = this['ctx']['elem'],block = (this['_currBlock'] || this['block']);{"";var __r0 = this['_mode'];(this['_mode']='default');var __r1 = this['block'];(this['block']=(vBlock || (vElem?block:undefined)));var __r2 = this['_currBlock'];(this['_currBlock']=((vBlock || vElem)?undefined:block));var __r3 = this['elem'];(this['elem']=this['ctx']['elem']);var __r4 = this['mods'];(this['mods']=((vBlock?this['ctx']['mods']:this['mods']) || ({})));var __r5 = this['elemMods'];(this['elemMods']=(this['ctx']['elemMods'] || ({})));{((this['block'] || this['elem'])?(this['position']=((this['position'] || (0)) + (1))):this['_listLength']--);apply.call(__this);undefined;undefined}(this['_mode']=__r0);(this['block']=__r1);(this['_currBlock']=__r2);(this['elem']=__r3);(this['mods']=__r4);(this['elemMods']=__r5);""}undefined};return}
};return exports})(typeof exports === "undefined"? {} : exports);BEMHTML = BEMHTML.apply;