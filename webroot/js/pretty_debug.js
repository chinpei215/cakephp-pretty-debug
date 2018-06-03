DEBUGKIT.loader.register({
	init: function() {
		var $ = DEBUGKIT.$;

		var $toolbar = $('#debug-kit-toolbar');
		var $panelTabs = $toolbar.find('li.panel-tab > a');
		var $panelContents = $toolbar.find('div.panel-content');
		var $historyLinks = $toolbar.find('a.history-link');

		var round = function precisionRound(num, p) {
			var factor = Math.pow(10, p);
			return Math.round(num * factor) / factor;
		}

		var percentage = function(num, denom) {
			num = parseInt(num);
			denom = parseInt(denom);
			if (num == 0) {
				return '0';
			}
			return round((num / denom) * 100, 4) + '%';
		}

		$panelContents.each(function() {
			var $content = $(this);
			var $a = $content.prev('a');
			var $button = $content.children('a.panel-toggle');

			$h1 = $('<h1>').text($a.text());
			$content.prepend($h1);
			$('<a class="panel-close">×</a>').appendTo($h1).on('click', function() {
				$a.click();
			});
		});

		$historyLinks.on('click', function() {
			if ($(this).attr('id') != 'history-restore-current') {
				$toolbar.addClass('toolbar-history');
			} else {
				$toolbar.removeClass('toolbar-history');
			}
		});

		$historyLinks.each(function() {
			if ($(this).attr('id') != 'history-restore-current') {
				if ($(this).text().charAt(0) != '/') {
					$(this).text('/' + $(this).text());
				}
			}
		});

		$panelTabs.on('click', function() {
			$panelContents.css('transition', '');

			var $content = $(this).next($panelTabs);
			if ($(this).is('.active') || !$panelTabs.is('.active')) {
				$content.css('transition', 'top 0.25s');
			}

			if (!$(this).is('.active') && $content.is('#timer-tab')) {
				$content.find('.debug-kit-graph-bar').each(function() {
					var width = $(this).css('width');
					if (0 > width.indexOf('px')) {
						return;
					}
					var $bar = $(this).children('.debug-kit-graph-bar-value');
					$bar.css('width', percentage($bar.css('width'), width));
					$bar.css('margin-left', percentage($bar.css('margin-left'), width));
					$(this).css('width', '100%');
				});
			}
		});

		$('#sql_log-tab').on('click', 'a.explain-link', function(e) {
			var $form = $(this).parents('.sql-log-panel-query-log').children('form');
			$form.find('input[name*=sql]').val( $(this).attr('data-sql') );
			$form.find('input[name*=hash]').val( $(this).attr('data-hash') );
			$form.find('.sql-explain-link').trigger('click');
			return false;
		});

	}
});
