/****** FILE: cms/javascript/CMSMain.js *****/
;

/****** FILE: cms/javascript/CMSMain.EditForm.js *****/

(function($){$.entwine('ss',function($){$('.cms-edit-form :input[name=ClassName]').entwine({onchange:function(){alert(ss.i18n._t('CMSMAIN.ALERTCLASSNAME'));}});$('.cms-edit-form input[name=Title]').entwine({onmatch:function(){var self=this;self.data('OrigVal',self.val());var form=self.closest('form');var urlSegmentInput=$('input:text[name=URLSegment]',form);var liveLinkInput=$('input[name=LiveLink]',form);if(urlSegmentInput.length>0){self._addActions();this.bind('change',function(e){var origTitle=self.data('OrigVal');var title=self.val();self.data('OrigVal',title);if(urlSegmentInput.val().indexOf(urlSegmentInput.data('defaultUrl'))===0&&liveLinkInput.val()==''){self.updateURLSegment(title);}else{$('.update',self.parent()).show();}
self.updateRelatedFields(title,origTitle);self.updateBreadcrumbLabel(title);});}
this._super();},onunmatch:function(){this._super();},updateRelatedFields:function(title,origTitle){this.parents('form').find('input[name=MetaTitle], input[name=MenuTitle]').each(function(){var $this=$(this);if($this.val()==origTitle){$this.val(title);if($this.updatedRelatedFields)$this.updatedRelatedFields();}});},updateURLSegment:function(title){var urlSegmentInput=$('input:text[name=URLSegment]',this.closest('form'));var urlSegmentField=urlSegmentInput.closest('.field.urlsegment');var updateURLFromTitle=$('.update',this.parent());urlSegmentField.update(title);if(updateURLFromTitle.is(':visible')){updateURLFromTitle.hide();}},updateBreadcrumbLabel:function(title){var pageID=$('.cms-edit-form input[name=ID]').val();var panelCrumb=$('span.cms-panel-link.crumb');if(title&&title!=""){panelCrumb.text(title);}},_addActions:function(){var self=this;var updateURLFromTitle;updateURLFromTitle=$('<button />',{'class':'update ss-ui-button-small','text':ss.i18n._t('URLSEGMENT.UpdateURL'),'click':function(e){e.preventDefault();self.updateURLSegment(self.val());}});updateURLFromTitle.insertAfter(self);updateURLFromTitle.hide();}});$('.cms-edit-form .parentTypeSelector').entwine({onmatch:function(){var self=this;this.find(':input[name=ParentType]').bind('click',function(e){self._toggleSelection(e);});this.find('.TreeDropdownField').bind('change',function(e){self._changeParentId(e);});this._changeParentId();this._toggleSelection();this._super();},onunmatch:function(){this._super();},_toggleSelection:function(e){var selected=this.find(':input[name=ParentType]:checked').val();if(selected=='root')this.find(':input[name=ParentID]').val(0);else this.find(':input[name=ParentID]').val(this.find('#Form_EditForm_ParentType_subpage').data('parentIdValue'));this.find('#Form_EditForm_ParentID_Holder').toggle(selected!='root');},_changeParentId:function(e){var value=this.find(':input[name=ParentID]').val();this.find('#Form_EditForm_ParentType_subpage').data('parentIdValue',value);}});$('.cms-edit-form #CanViewType, .cms-edit-form #CanEditType, .cms-edit-form #CanCreateTopLevelType').entwine({onmatch:function(){var dropdown;if(this.attr('id')=='CanViewType')dropdown=$('#Form_EditForm_ViewerGroups_Holder');else if(this.attr('id')=='CanEditType')dropdown=$('#Form_EditForm_EditorGroups_Holder');else if(this.attr('id')=='CanCreateTopLevelType')dropdown=$('#Form_EditForm_CreateTopLevelGroups_Holder');this.find('.optionset :input').bind('change',function(e){var wrapper=$(this).closest('.middleColumn').parent('div');if(e.target.value=='OnlyTheseUsers'){wrapper.addClass('remove-splitter');dropdown['show']();}
else{wrapper.removeClass('remove-splitter');dropdown['hide']();}});var currentVal=this.find('input[name='+this.attr('id')+']:checked').val();dropdown[currentVal=='OnlyTheseUsers'?'show':'hide']();this._super();},onunmatch:function(){this._super();}});$('.cms-edit-form .Actions #Form_EditForm_action_print').entwine({onclick:function(e){var printURL=$(this[0].form).attr('action').replace(/\?.*$/,'')
+'/printable/'
+$(':input[name=ID]',this[0].form).val();if(printURL.substr(0,7)!='http://')printURL=$('base').attr('href')+printURL;window.open(printURL,'printable');return false;}});$('.cms-edit-form .Actions #Form_EditForm_action_rollback').entwine({onclick:function(e){var form=this.parents('form:first'),version=form.find(':input[name=Version]').val(),message='';if(version){message=ss.i18n.sprintf(ss.i18n._t('CMSMain.RollbackToVersion'),version);}else{message=ss.i18n._t('CMSMain.ConfirmRestoreFromLive');}
if(confirm(message)){return this._super(e);}else{return false;}}});$('.cms-edit-form .Actions #Form_EditForm_action_archive').entwine({onclick:function(e){var form=this.parents('form:first'),version=form.find(':input[name=Version]').val(),message='';message=ss.i18n.sprintf(ss.i18n._t('CMSMain.Archive'),version);if(confirm(message)){return this._super(e);}else{return false;}}});$('.cms-edit-form .Actions #Form_EditForm_action_restore').entwine({onclick:function(e){var form=this.parents('form:first'),version=form.find(':input[name=Version]').val(),message='',toRoot=this.data('toRoot');message=ss.i18n.sprintf(ss.i18n._t(toRoot?'CMSMain.RestoreToRoot':'CMSMain.Restore'),version);if(confirm(message)){return this._super(e);}else{return false;}}});$('.cms-edit-form .Actions #Form_EditForm_action_delete').entwine({onclick:function(e){var form=this.parents('form:first'),version=form.find(':input[name=Version]').val(),message='';message=ss.i18n.sprintf(ss.i18n._t('CMSMain.DeleteFromDraft'),version);if(confirm(message)){return this._super(e);}else{return false;}}});$('.cms-edit-form .Actions #Form_EditForm_action_unpublish').entwine({onclick:function(e){var form=this.parents('form:first'),version=form.find(':input[name=Version]').val(),message='';message=ss.i18n.sprintf(ss.i18n._t('CMSMain.Unpublish'),version);if(confirm(message)){return this._super(e);}else{return false;}}});$('.cms-edit-form.changed').entwine({onmatch:function(e){this.find('button[name=action_save]').button('option','showingAlternate',true);this.find('button[name=action_publish]').button('option','showingAlternate',true);this._super(e);},onunmatch:function(e){var saveButton=this.find('button[name=action_save]');if(saveButton.data('button'))saveButton.button('option','showingAlternate',false);var publishButton=this.find('button[name=action_publish]');if(publishButton.data('button'))publishButton.button('option','showingAlternate',false);this._super(e);}});$('.cms-edit-form .Actions button[name=action_publish]').entwine({onbuttonafterrefreshalternate:function(){if(this.button('option','showingAlternate')){this.addClass('ss-ui-action-constructive');}
else{this.removeClass('ss-ui-action-constructive');}}});$('.cms-edit-form .Actions button[name=action_save]').entwine({onbuttonafterrefreshalternate:function(){if(this.button('option','showingAlternate')){this.addClass('ss-ui-action-constructive');}
else{this.removeClass('ss-ui-action-constructive');}}});$('.cms-edit-form.CMSPageSettingsController input[name="ParentType"]:checked').entwine({onmatch:function(){this.redraw();this._super();},onunmatch:function(){this._super();},redraw:function(){var treeField=$('.cms-edit-form.CMSPageSettingsController #Form_EditForm_ParentID_Holder');if($(this).attr('id')=='Form_EditForm_ParentType_root')treeField.slideUp();else treeField.slideDown();},onclick:function(){this.redraw();}});if($('.cms-edit-form.CMSPageSettingsController input[name="ParentType"]:checked').attr('id')=='Form_EditForm_ParentType_root'){$('.cms-edit-form.CMSPageSettingsController #Form_EditForm_ParentID_Holder').hide();}});}(jQuery));;

/****** FILE: cms/javascript/CMSMain.AddForm.js *****/

(function($){$.entwine('ss',function($){$(".cms-add-form .parent-mode :input").entwine({onclick:function(e){if(this.val()=='top'){var parentField=this.closest('form').find('#Form_AddForm_ParentID_Holder .TreeDropdownField')
parentField.setValue('');parentField.setTitle('');}}});$(".cms-add-form").entwine({ParentID:0,ParentCache:{},onadd:function(){var self=this;this.find('#Form_AddForm_ParentID_Holder .TreeDropdownField').bind('change',function(){self.updateTypeList();});this.find(".SelectionGroup.parent-mode").bind('change',function(){self.updateTypeList();});this.updateTypeList();},loadCachedChildren:function(parentID){var cache=this.getParentCache();if(typeof cache[parentID]!=='undefined')return cache[parentID];else return null;},saveCachedChildren:function(parentID,children){var cache=this.getParentCache();cache[parentID]=children;this.setParentCache(cache);},updateTypeList:function(){var hints=this.data('hints'),parentTree=this.find('#Form_AddForm_ParentID_Holder .TreeDropdownField'),parentMode=this.find("input[name=ParentModeField]:checked").val(),metadata=parentTree.data('metadata'),id=(metadata&&parentMode==='child')?(parentTree.getValue()||this.getParentID()):null,newClassName=metadata?metadata.ClassName:null,hintKey=(newClassName&&parentMode==='child')?newClassName:'Root',hint=(typeof hints[hintKey]!=='undefined')?hints[hintKey]:null,self=this,defaultChildClass=(hint&&typeof hint.defaultChild!=='undefined')?hint.defaultChild:null,disallowedChildren=[];if(id){if(this.hasClass('loading'))return;this.addClass('loading');this.setParentID(id);if(!parentTree.getValue())parentTree.setValue(id);disallowedChildren=this.loadCachedChildren(id);if(disallowedChildren!==null){this.updateSelectionFilter(disallowedChildren,defaultChildClass);this.removeClass('loading');return;}
$.ajax({url:self.data('childfilter'),data:{'ParentID':id},success:function(data){self.saveCachedChildren(id,data);self.updateSelectionFilter(data,defaultChildClass);},complete:function(){self.removeClass('loading');}});return false;}else{disallowedChildren=(hint&&typeof hint.disallowedChildren!=='undefined')?hint.disallowedChildren:[],this.updateSelectionFilter(disallowedChildren,defaultChildClass);}},updateSelectionFilter:function(disallowedChildren,defaultChildClass){var allAllowed=null;this.find('#Form_AddForm_PageType li').each(function(){var className=$(this).find('input').val(),isAllowed=($.inArray(className,disallowedChildren)===-1);$(this).setEnabled(isAllowed);if(!isAllowed)$(this).setSelected(false);if(allAllowed===null)allAllowed=isAllowed;else allAllowed=allAllowed&&isAllowed;});if(defaultChildClass){var selectedEl=this.find('#Form_AddForm_PageType li input[value='+defaultChildClass+']').parents('li:first');}else{var selectedEl=this.find('#Form_AddForm_PageType li:not(.disabled):first');}
selectedEl.setSelected(true);selectedEl.siblings().setSelected(false);var buttonState=this.find('#Form_AddForm_PageType li:not(.disabled)').length?'enable':'disable';this.find('button[name=action_doAdd]').button(buttonState);this.find('.message-restricted')[allAllowed?'hide':'show']();}});$(".cms-add-form #Form_AddForm_PageType li").entwine({onclick:function(e){this.setSelected(true);},setSelected:function(bool){var input=this.find('input');if(bool&&!input.is(':disabled')){this.siblings().setSelected(false);this.toggleClass('selected',true);input.prop('checked',true);}else{this.toggleClass('selected',false);input.prop('checked',false);}},setEnabled:function(bool){$(this).toggleClass('disabled',!bool);if(!bool)$(this).find('input').attr('disabled','disabled').removeAttr('checked');else $(this).find('input').removeAttr('disabled');}});$(".cms-page-add-button").entwine({onclick:function(e){var tree=$('.cms-tree'),list=$('.cms-list'),parentId=0;if(tree.is(':visible')){var selected=tree.jstree('get_selected');parentId=selected?$(selected[0]).data('id'):null;}else{var state=list.find('input[name="Page[GridState]"]').val();if(state)parentId=parseInt(JSON.parse(state).ParentID,10);}
var data={selector:this.data('targetPanel'),pjax:this.data('pjax')},url;if(parentId){extraParams=this.data('extraParams')?this.data('extraParams'):'';url=$.path.addSearchParams(ss.i18n.sprintf(this.data('urlAddpage'),parentId),extraParams);}else{url=this.attr('href');}
$('.cms-container').loadPanel(url,null,data);e.preventDefault();this.blur();}});});}(jQuery));;

/****** FILE: cms/javascript/CMSPageHistoryController.js *****/

(function($){$.entwine('ss',function($){$('#Form_VersionsForm').entwine({onmatch:function(){this._super();},onunmatch:function(){this._super();},onsubmit:function(e,d){e.preventDefault();var id,self=this;id=this.find(':input[name=ID]').val();if(!id)return false;var button,url,selected,to,from,compare,data;compare=(this.find(":input[name=CompareMode]").is(":checked"));selected=this.find("table input[type=checkbox]").filter(":checked");if(compare){if(selected.length!=2)return false;to=selected.eq(0).val();from=selected.eq(1).val();button=this.find(':submit[name=action_doCompare]');url=ss.i18n.sprintf(this.data('linkTmplCompare'),id,from,to);}
else{to=selected.eq(0).val();button=this.find(':submit[name=action_doShowVersion]');url=ss.i18n.sprintf(this.data('linkTmplShow'),id,to);}
$('.cms-container').loadPanel(url,'',{pjax:'CurrentForm'});}});$('#Form_VersionsForm input[name=ShowUnpublished]').entwine({onmatch:function(){this.toggle();this._super();},onunmatch:function(){this._super();},onchange:function(){this.toggle();},toggle:function(){var self=$(this);var form=self.parents('form');if(self.attr('checked')){form.find('tr[data-published=false]').show();}else{form.find("tr[data-published=false]").hide()._unselect();}}});$("#Form_VersionsForm tbody tr").entwine({onclick:function(e){var compare,selected;compare=this.parents("form").find(':input[name=CompareMode]').attr("checked"),selected=this.siblings(".active");if(compare&&this.hasClass('active')){this._unselect();return;}
else if(compare){if(selected.length>1){return alert(ss.i18n._t('ONLYSELECTTWO','You can only compare two versions at this time.'));}
this._select();if(selected.length==1){this.parents('form').submit();}
return;}
else{this._select();selected._unselect();this.parents("form").submit();}},_unselect:function(){this.removeClass('active');this.find(":input[type=checkbox]").attr("checked",false);},_select:function(){this.addClass('active');this.find(":input[type=checkbox]").attr("checked",true);}})});})(jQuery);;

/****** FILE: cms/javascript/CMSMain.Tree.js *****/

(function($){$.entwine('ss.tree',function($){$('.cms-tree').entwine({fromDocument:{'oncontext_show.vakata':function(e){this.adjustContextClass();}},adjustContextClass:function(){var menus=$('#vakata-contextmenu').find("ul ul");menus.each(function(i){var col="1",count=$(menus[i]).find('li').length;if(count>20){col="3";}else if(count>10){col="2";}
$(menus[i]).addClass('col-'+col).removeClass('right');$(menus[i]).find('li').on("mouseenter",function(e){$(this).parent('ul').removeClass("right");});});},getTreeConfig:function(){var self=this,config=this._super(),hints=this.getHints();config.plugins.push('contextmenu');config.contextmenu={'items':function(node){var menuitems={'edit':{'label':ss.i18n._t('Tree.EditPage','Edit page',100,'Used in the context menu when right-clicking on a page node in the CMS tree'),'action':function(obj){$('.cms-container').entwine('.ss').loadPanel(ss.i18n.sprintf(self.data('urlEditpage'),obj.data('id')));}}};if(!node.hasClass('nochildren')){menuitems['showaslist']={'label':ss.i18n._t('Tree.ShowAsList'),'action':function(obj){$('.cms-container').entwine('.ss').loadPanel(self.data('urlListview')+'&ParentID='+obj.data('id'),null,{tabState:{'pages-controller-cms-content':{'tabSelector':'.content-listview'}}});}};}
var pagetype=node.data('pagetype'),id=node.data('id'),allowedChildren=node.find('>a .item').data('allowedchildren'),menuAllowedChildren={},hasAllowedChildren=false;$.each(allowedChildren,function(klass,title){hasAllowedChildren=true;menuAllowedChildren["allowedchildren-"+klass]={'label':'<span class="jstree-pageicon"></span>'+title,'_class':'class-'+klass,'action':function(obj){$('.cms-container').entwine('.ss').loadPanel($.path.addSearchParams(ss.i18n.sprintf(self.data('urlAddpage'),id,klass),self.data('extraParams')));}};});if(hasAllowedChildren){menuitems['addsubpage']={'label':ss.i18n._t('Tree.AddSubPage','Add page under this page',100,'Used in the context menu when right-clicking on a page node in the CMS tree'),'submenu':menuAllowedChildren};}
menuitems['duplicate']={'label':ss.i18n._t('Tree.Duplicate'),'submenu':[{'label':ss.i18n._t('Tree.ThisPageOnly'),'action':function(obj){$('.cms-container').entwine('.ss').loadPanel($.path.addSearchParams(ss.i18n.sprintf(self.data('urlDuplicate'),obj.data('id')),self.data('extraParams')));}},{'label':ss.i18n._t('Tree.ThisPageAndSubpages'),'action':function(obj){$('.cms-container').entwine('.ss').loadPanel($.path.addSearchParams(ss.i18n.sprintf(self.data('urlDuplicatewithchildren'),obj.data('id')),self.data('extraParams')));}}]};return menuitems;}};return config;}});$('.cms-tree a.jstree-clicked').entwine({onmatch:function(){var self=this,panel=self.parents('.cms-panel-content'),scrollTo;if(self.offset().top<0||self.offset().top>panel.height()-self.height()){scrollTo=panel.scrollTop()+self.offset().top
+(panel.height()/2);panel.animate({scrollTop:scrollTo},'slow');}}});});}(jQuery));;

/****** FILE: cms/javascript/SilverStripeNavigator.js *****/

function windowName(suffix){var base=document.getElementsByTagName('base')[0].href.replace('http://','').replace(/\//g,'_').replace(/\./g,'_');return base+suffix;}
(function($){$(document).ready(function(){$('#switchView a.newWindow').on('click',function(e){var w=window.open(this.href,windowName(this.target));w.focus();return false;});$('#SilverStripeNavigatorLink').on('click',function(e){$('#SilverStripeNavigatorLinkPopup').toggle();return false;});$('#SilverStripeNavigatorLinkPopup a.close').on('click',function(e){$('#SilverStripeNavigatorLinkPopup').hide();return false;});$('#SilverStripeNavigatorLinkPopup input').on('focus',function(e){this.select();});});})(jQuery);;

/****** FILE: cms/javascript/SiteTreeURLSegmentField.js *****/

(function($){$.entwine('ss',function($){$('.field.urlsegment:not(.readonly)').entwine({MaxPreviewLength:55,Ellipsis:'...',onmatch:function(){if(this.find(':text').length)this.toggleEdit(false);this.redraw();this._super();},redraw:function(){var field=this.find(':text'),url=decodeURI(field.data('prefix')+field.val()),previewUrl=url;if(url.length>this.getMaxPreviewLength()){previewUrl=this.getEllipsis()+url.substr(url.length-this.getMaxPreviewLength(),url.length);}
this.find('.preview').attr('href',encodeURI(url+field.data('suffix'))).text(previewUrl);},toggleEdit:function(toggle){var field=this.find(':text');this.find('.preview-holder')[toggle?'hide':'show']();this.find('.edit-holder')[toggle?'show':'hide']();if(toggle){field.data("origval",field.val());field.focus();}},update:function(){var self=this,field=this.find(':text'),currentVal=field.data('origval'),title=arguments[0],updateVal=(title&&title!=="")?title:field.val();if(currentVal!=updateVal){this.addClass('loading');this.suggest(updateVal,function(data){field.val(decodeURIComponent(data.value));self.toggleEdit(false);self.removeClass('loading');self.redraw();});}else{this.toggleEdit(false);this.redraw();}},cancel:function(){var field=this.find(':text');field.val(field.data("origval"));this.toggleEdit(false);},suggest:function(val,callback){var self=this,field=self.find(':text'),urlParts=$.path.parseUrl(self.closest('form').attr('action')),url=urlParts.hrefNoSearch+'/field/'+field.attr('name')+'/suggest/?value='+encodeURIComponent(val);if(urlParts.search)url+='&'+urlParts.search.replace(/^\?/,'');$.ajax({url:url,success:function(data){callback.apply(this,arguments);},error:function(xhr,status){xhr.statusText=xhr.responseText;},complete:function(){self.removeClass('loading');}});}});$('.field.urlsegment .edit').entwine({onclick:function(e){e.preventDefault();this.closest('.field').toggleEdit(true);}});$('.field.urlsegment .update').entwine({onclick:function(e){e.preventDefault();this.closest('.field').update();}});$('.field.urlsegment .cancel').entwine({onclick:function(e){e.preventDefault();this.closest('.field').cancel();}});});}(jQuery));;

/****** FILE: cms/javascript/lang/en.js *****/

if(typeof(ss)=='undefined'||typeof(ss.i18n)=='undefined'){if(typeof(console)!='undefined')console.error('Class ss.i18n not defined');}else{ss.i18n.addDictionary('en',{"CMSMAIN.WARNINGSAVEPAGESBEFOREADDING":"You have to save a page before adding children underneath it","CMSMAIN.CANTADDCHILDREN":"You can't add children to the selected node","CMSMAIN.ERRORADDINGPAGE":"Error adding page","CMSMAIN.FILTEREDTREE":"Filtered tree to only show changed pages","CMSMAIN.ERRORFILTERPAGES":"Could not filter tree to only show changed pages<br />%s","CMSMAIN.ERRORUNFILTER":"Unfiltered tree","CMSMAIN.PUBLISHINGPAGES":"Publishing pages...","CMSMAIN.SELECTONEPAGE":"Please select at least 1 page.","CMSMAIN.ERRORPUBLISHING":"Error publishing pages","CMSMAIN.REALLYDELETEPAGES":"Do you really want to delete the %s marked pages?","CMSMAIN.DELETINGPAGES":"Deleting pages...","CMSMAIN.ERRORDELETINGPAGES":"Error deleting pages","CMSMAIN.PUBLISHING":"Publishing...","CMSMAIN.RESTORING":"Restoring...","CMSMAIN.ERRORREVERTING":"Error reverting to live content","CMSMAIN.SAVING":"saving...","CMSMAIN.SELECTMOREPAGES":"You have %s pages selected.\n\nDo you really want to perform this action?","CMSMAIN.ALERTCLASSNAME":"The page type will be updated after the page is saved","CMSMAIN.URLSEGMENTVALIDATION":"URLs can only be made up of letters, digits and hyphens.","AssetAdmin.BATCHACTIONSDELETECONFIRM":"Do you really want to delete %s folders?","AssetTableField.REALLYDELETE":"Do you really want to delete the marked files?","AssetTableField.MOVING":"Moving %s file(s)","CMSMAIN.AddSearchCriteria":"Add Criteria","WidgetAreaEditor.TOOMANY":"Sorry, you have reached the maximum number of widgets in this area","AssetAdmin.ConfirmDelete":"Do you really want to delete this folder and all contained files?","Folder.Name":"Folder name","Tree.AddSubPage":"Add new page here","Tree.Duplicate":"Duplicate","Tree.EditPage":"Edit","Tree.ThisPageOnly":"This page only","Tree.ThisPageAndSubpages":"This page and subpages","Tree.ShowAsList":"Show children as list","CMSMain.ConfirmRestoreFromLive":"Are you sure you want to revert draft to when the page was last published?","CMSMain.RollbackToVersion":"Do you really want to roll back to version #%s of this page?","CMSMain.Archive":"Are you sure you want to archive this page and all of its children pages?\n\nThis page and all of its children will be unpublished and sent to the archive.","CMSMain.Restore":"Are you sure you want to restore this page from archive?","CMSMain.RestoreToRoot":"Are you sure you want to restore this page from archive?\n\nBecause the parent page is not available this will be restored to the top level.","CMSMain.Unpublish":"Are you sure you want to remove your page from the published site?\n\nThis page will still be available in the sitetree as draft.","CMSMain.DeleteFromDraft":"Are you sure you want to remove your page from the draft site?\n\nThis page will remain on the published site.","URLSEGMENT.Edit":"Edit","URLSEGMENT.OK":"OK","URLSEGMENT.Cancel":"Cancel","URLSEGMENT.UpdateURL":"Update URL"});};

/****** FILE: cms/javascript/lang/en.js *****/

if(typeof(ss)=='undefined'||typeof(ss.i18n)=='undefined'){if(typeof(console)!='undefined')console.error('Class ss.i18n not defined');}else{ss.i18n.addDictionary('en',{"CMSMAIN.WARNINGSAVEPAGESBEFOREADDING":"You have to save a page before adding children underneath it","CMSMAIN.CANTADDCHILDREN":"You can't add children to the selected node","CMSMAIN.ERRORADDINGPAGE":"Error adding page","CMSMAIN.FILTEREDTREE":"Filtered tree to only show changed pages","CMSMAIN.ERRORFILTERPAGES":"Could not filter tree to only show changed pages<br />%s","CMSMAIN.ERRORUNFILTER":"Unfiltered tree","CMSMAIN.PUBLISHINGPAGES":"Publishing pages...","CMSMAIN.SELECTONEPAGE":"Please select at least 1 page.","CMSMAIN.ERRORPUBLISHING":"Error publishing pages","CMSMAIN.REALLYDELETEPAGES":"Do you really want to delete the %s marked pages?","CMSMAIN.DELETINGPAGES":"Deleting pages...","CMSMAIN.ERRORDELETINGPAGES":"Error deleting pages","CMSMAIN.PUBLISHING":"Publishing...","CMSMAIN.RESTORING":"Restoring...","CMSMAIN.ERRORREVERTING":"Error reverting to live content","CMSMAIN.SAVING":"saving...","CMSMAIN.SELECTMOREPAGES":"You have %s pages selected.\n\nDo you really want to perform this action?","CMSMAIN.ALERTCLASSNAME":"The page type will be updated after the page is saved","CMSMAIN.URLSEGMENTVALIDATION":"URLs can only be made up of letters, digits and hyphens.","AssetAdmin.BATCHACTIONSDELETECONFIRM":"Do you really want to delete %s folders?","AssetTableField.REALLYDELETE":"Do you really want to delete the marked files?","AssetTableField.MOVING":"Moving %s file(s)","CMSMAIN.AddSearchCriteria":"Add Criteria","WidgetAreaEditor.TOOMANY":"Sorry, you have reached the maximum number of widgets in this area","AssetAdmin.ConfirmDelete":"Do you really want to delete this folder and all contained files?","Folder.Name":"Folder name","Tree.AddSubPage":"Add new page here","Tree.Duplicate":"Duplicate","Tree.EditPage":"Edit","Tree.ThisPageOnly":"This page only","Tree.ThisPageAndSubpages":"This page and subpages","Tree.ShowAsList":"Show children as list","CMSMain.ConfirmRestoreFromLive":"Are you sure you want to revert draft to when the page was last published?","CMSMain.RollbackToVersion":"Do you really want to roll back to version #%s of this page?","CMSMain.Archive":"Are you sure you want to archive this page and all of its children pages?\n\nThis page and all of its children will be unpublished and sent to the archive.","CMSMain.Restore":"Are you sure you want to restore this page from archive?","CMSMain.RestoreToRoot":"Are you sure you want to restore this page from archive?\n\nBecause the parent page is not available this will be restored to the top level.","CMSMain.Unpublish":"Are you sure you want to remove your page from the published site?\n\nThis page will still be available in the sitetree as draft.","CMSMain.DeleteFromDraft":"Are you sure you want to remove your page from the draft site?\n\nThis page will remain on the published site.","URLSEGMENT.Edit":"Edit","URLSEGMENT.OK":"OK","URLSEGMENT.Cancel":"Cancel","URLSEGMENT.UpdateURL":"Update URL"});};

/****** FILE: cms/javascript/lang/en.js *****/

if(typeof(ss)=='undefined'||typeof(ss.i18n)=='undefined'){if(typeof(console)!='undefined')console.error('Class ss.i18n not defined');}else{ss.i18n.addDictionary('en',{"CMSMAIN.WARNINGSAVEPAGESBEFOREADDING":"You have to save a page before adding children underneath it","CMSMAIN.CANTADDCHILDREN":"You can't add children to the selected node","CMSMAIN.ERRORADDINGPAGE":"Error adding page","CMSMAIN.FILTEREDTREE":"Filtered tree to only show changed pages","CMSMAIN.ERRORFILTERPAGES":"Could not filter tree to only show changed pages<br />%s","CMSMAIN.ERRORUNFILTER":"Unfiltered tree","CMSMAIN.PUBLISHINGPAGES":"Publishing pages...","CMSMAIN.SELECTONEPAGE":"Please select at least 1 page.","CMSMAIN.ERRORPUBLISHING":"Error publishing pages","CMSMAIN.REALLYDELETEPAGES":"Do you really want to delete the %s marked pages?","CMSMAIN.DELETINGPAGES":"Deleting pages...","CMSMAIN.ERRORDELETINGPAGES":"Error deleting pages","CMSMAIN.PUBLISHING":"Publishing...","CMSMAIN.RESTORING":"Restoring...","CMSMAIN.ERRORREVERTING":"Error reverting to live content","CMSMAIN.SAVING":"saving...","CMSMAIN.SELECTMOREPAGES":"You have %s pages selected.\n\nDo you really want to perform this action?","CMSMAIN.ALERTCLASSNAME":"The page type will be updated after the page is saved","CMSMAIN.URLSEGMENTVALIDATION":"URLs can only be made up of letters, digits and hyphens.","AssetAdmin.BATCHACTIONSDELETECONFIRM":"Do you really want to delete %s folders?","AssetTableField.REALLYDELETE":"Do you really want to delete the marked files?","AssetTableField.MOVING":"Moving %s file(s)","CMSMAIN.AddSearchCriteria":"Add Criteria","WidgetAreaEditor.TOOMANY":"Sorry, you have reached the maximum number of widgets in this area","AssetAdmin.ConfirmDelete":"Do you really want to delete this folder and all contained files?","Folder.Name":"Folder name","Tree.AddSubPage":"Add new page here","Tree.Duplicate":"Duplicate","Tree.EditPage":"Edit","Tree.ThisPageOnly":"This page only","Tree.ThisPageAndSubpages":"This page and subpages","Tree.ShowAsList":"Show children as list","CMSMain.ConfirmRestoreFromLive":"Are you sure you want to revert draft to when the page was last published?","CMSMain.RollbackToVersion":"Do you really want to roll back to version #%s of this page?","CMSMain.Archive":"Are you sure you want to archive this page and all of its children pages?\n\nThis page and all of its children will be unpublished and sent to the archive.","CMSMain.Restore":"Are you sure you want to restore this page from archive?","CMSMain.RestoreToRoot":"Are you sure you want to restore this page from archive?\n\nBecause the parent page is not available this will be restored to the top level.","CMSMain.Unpublish":"Are you sure you want to remove your page from the published site?\n\nThis page will still be available in the sitetree as draft.","CMSMain.DeleteFromDraft":"Are you sure you want to remove your page from the draft site?\n\nThis page will remain on the published site.","URLSEGMENT.Edit":"Edit","URLSEGMENT.OK":"OK","URLSEGMENT.Cancel":"Cancel","URLSEGMENT.UpdateURL":"Update URL"});};

