'use strict';
'require form';
'require poll';
'require rpc';
'require view';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: [ 'name' ],
	expect: { '': {} }
});

return view.extend({
	render: function() {
		var map = new form.Map('leigod-acc', _('Leigod Accelerator'),
			_('Manage the accelerator with the Leigod mobile app.'));
		var section = map.section(form.NamedSection, 'main', 'leigod');
		var status = section.option(form.DummyValue, '_status', _('Service status'));
		status.rawhtml = true;
		status.cfgvalue = function() {
			return '<span id="leigod-status">' + _('Collecting data…') + '</span>';
		};
		var enabled = section.option(form.Flag, 'enabled', _('Enable'));
		enabled.rmempty = false;
		poll.add(function() {
			return L.resolveDefault(callServiceList('leigod-acc'), {}).then(function(res) {
				var el = document.getElementById('leigod-status');
				var instance = res['leigod-acc'] && res['leigod-acc'].instances;
				if (el)
					el.textContent = instance && Object.keys(instance).some(function(k) {
						return instance[k].running;
					}) ? _('Running') : _('Stopped');
			});
		});
		return map.render();
	}
});
