$(function() {
	$('select').selectize();

	//Выбор файла
	$(".file-upload:not(.multiple) input[type=file]").change(function () {
		var filename = $(this).val().replace(/.*\\/, "");
		$(this).parents('.file-upload').find(".file-upload__name").text(filename);
		$(this).parents('.file-upload').find('.js-remove-file').show();
	});

	//Удалить файл
	$('.file-upload:not(.multiple) .js-remove-file').on('click', function(e){
		e.preventDefault();
		$fwrap = $(this).parents('.file-upload');
		$fwrap.find("input[type=file]").val('');
		$fwrap.find(".file-upload__name").text('Файл не выбран');
		$fwrap.find('.js-remove-file').hide();
	})

	//Выбор нескольких файлов !!!У каждого инпута должно быть уникальное имя!!!
	var storedFiles = {};

	$(".file-upload.multiple input[type=file]").change(function (e) {
		var name = $(this).attr('name');

		if (!name) {
			console.error('Инпуту нужно добавить имя');
			return null;
		}

		if (!(name in storedFiles)) {
			storedFiles[name] = [];
		}

		var files = e.target.files;
		var filesArr = Array.prototype.slice.call(files);
		var that = this;

		filesArr.forEach(function (f) {
			storedFiles[name].push(f);

			var reader = new FileReader();
			reader.onload = function (e) {
				var item = document.createElement('li');

				item.classList.add('file-upload__item');
				item.innerText = f.name
				item.dataset.file = f.name;

				$(item).append('<a href="#" class="file-upload__remove js-remove-file">'
					+ '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">'
					+ '<rect y="7.27264" width="10.2851" height="1.02851" transform="rotate(-45 0 7.27264)" fill="#002C5F" />'
					+ '<rect x="0.727295" width="10.2851" height="1.02851" transform="rotate(45 0.727295 0)" fill="#002C5F" />'
					+ '</svg>'
					+ '</a>')

				$(that).parents('.file-upload').find('.file-upload__list').append(item);
			}
			reader.readAsDataURL(f);
		});

		$(this).parents('.file-upload').find('.file-upload__name').hide();
	});

	//Удалить файл
	$(document).on('click', '.js-remove-file', function (e) {
		e.preventDefault();
		var file = $(this).parent('.file-upload__item').data("file"),
			name = $(this).parents('.file-upload').find('.file-upload__input').attr("name");

		for (var i = 0; i < storedFiles[name].length; i++) {
			if (storedFiles[name][i].name === file) {
				storedFiles[name].splice(i, 1);
				break;
			}
		}

		if (storedFiles[name].length === 0) {
			$(this).closest('.file-upload').find('.file-upload__name').show();
		}

		$(this).parent().remove();
	})

	//Календарь
	$(".df-datepicker input").datepicker({
		inline: true
	});


	//Настройки календаря
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
			'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
		dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		weekHeader: 'Нед',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		selectOtherMonths: true,
		showOtherMonths: true
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$('.mobile-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.sidebar__list').slideToggle(50);
	});

	$(window).on('resize', function(){
		if ( $(window).width() > 992 ) {
			$('.mobile-btn').removeClass('active');
			$('.sidebar__list').removeAttr('style');
		}
	});
});
