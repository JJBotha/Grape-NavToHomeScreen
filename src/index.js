//search 'implement' for outsystems sections
import loadComponents from './components';
import loadBlocks from './blocks';

export default (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };
	var blockManager = editor.BlockManager;
	var domComps = editor.DomComponents;
	var dType = domComps.getType('default');
	var dModel = dType.model;
	var dView = dType.view;
	
	// Add components
	loadComponents(editor, options);

	// Add navigation block
	blockManager.add('NAVIGATE_SCREEN', {
		id: 'initiateJob',
		label: 'Navigate to screen',
		content:{
			content:'<div class="my-block fa fa-paint-brush">screen name</div>',
			type:'NAVIGATE_SCREEN'
		},
	});
	
	//component traits
	domComps.addType('NAVIGATE_SCREEN', {
		model: dModel.extend({
			defaults: Object.assign({}, dModel.prototype.defaults, {
				traits: [
					{
						type: 'screenName',
						label: 'Screen name',
					},
					{
						type: 'screenSelectorButton',
						label: '',
						name: ''
					},		  
				], 
			}),
		}, {
		  isComponent: function(el) {
			if(el.tagName == 'INPUT'){
			  return {type: 'input'};
			}
		  },
		}),

		view: dView,
	});
	
	editor.TraitManager.addType('screenSelectorButton', {
		events: {
			'click': 'selectScreen' , // trigger parent onclick method on click
		},
		
		selectScreen: function(){
			var flowTemplate = prompt("screen name: ");
			//implement
			//$('#"+ navigateToScreenButton.Id +"').trigger('click');
			//implement - after selection update trait value:
			const traitEl = document.querySelector('input[type="screenName"]');	//implement these 2 lines in outsystems javascript after screen selection popup is closed.
			traitEl && grapesjs.$(traitEl).val(flowTemplate).trigger('change');	
		},
		getInputEl() {
            var button = document.createElement('button');
            button.id = 'btnScreenSelector';
			button.classList.add('actionButton');
            button.appendChild(document.createTextNode('Select a screen'));
			
            return button;
		
		},
	});
	
	
  loadBlocks(editor, options);

};
