/*!
 * Bootstrap Form Validator by apalfrey & luc122c
 * https://github.com/apalfrey/bootstrap-form-validator
 * License: MIT
 */

( function( $ ) {
	if ( typeof moment !== 'function' ) {
		console.warn( 'Bootstrap Form Validator requires Moment to be installed in order to use the date/time validations' );
	}

	const methods = {
		required: function() {
			let field_info = info.field_info;
			if ( field_info.required && field_info.type !== 'radio' && field_info.type !== 'checkbox' ) {
				if ( field_info.val == '' || field_info.val === undefined || field_info.val === null ) {
					console.log( '%cRequired', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'error', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cRequired', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'error', true ] );
					return true;
				}
			} else {
				if ( field_info.type !== 'radio' && field_info.type !== 'checkbox' ) {
					console.log( '%cNot Required', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'error', true ] );
				}
			}

			return true;
		},
		required_radio: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'radio' && $.inArray( field_info.name, info.radios ) === -1 ) {
				info.radios.push( field_info.name );

				let radio_group = $( 'input[name="' + field_info.name + '"]' ),
					required = false;

				$( radio_group ).each( function() {
					if ( $( this ).prop( 'required' ) ) {
						required = true;
					}
				} );

				if ( required ) {
					if ( !$( radio_group ).is( ':checked' ) ) {
						console.log( '%cRequired', 'color:red;' );
						radio_group.each( function( index, element ) {
							info.errors.push( [ element, field_info.name, 'invalid', false ] );
						} );
						info.valid = false;
						return false;
					} else {
						console.log( '%cRequired', 'color:green;' );
						radio_group.each( function( index, element ) {
							info.errors.push( [ element, field_info.name, 'invalid', true ] );
						} );
						return true;
					}
				}
			}

			return true;
		},
		required_checkbox: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'checkbox' && $.inArray( field_info.name, info.checkboxes ) === -1 ) {
				info.checkboxes.push( field_info.name );

				let checked = $( 'input[name="' + field_info.name + '"]:checked' ).length,
					check_group = $( 'input[name="' + field_info.name + '"]' ),
					min = parseInt( $( 'input[name="' + field_info.name + '"][min]' ).attr( 'min' ) ),
					max = parseInt( $( 'input[name="' + field_info.name + '"][max]' ).attr( 'max' ) ),
					required = false;

				$( check_group ).each( function() {
					if ( $( this ).prop( 'required' ) ) {
						required = true;
					}
				} );

				if ( required && checked <= 0 ) {
					console.log( '%cRequired', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else if ( checked > max || checked < min ) {
					console.log( '%cMin/Max', 'color:red;' );
					$( check_group ).each( function( index, element ) {
						info.errors.push( [ element, field_info.name, 'min-max', false ] );
					} );
					info.valid = false;
					return false;
				} else {
					console.log( '%cRequired & Min/Max', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					$( check_group ).each( function( index, element ) {
						info.errors.push( [ element, field_info.name, 'min-max', true ] );
					} );
					return true;
				}

			}

			return true;
		},
		number: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'number' && field_info.val !== '' ) {
				if ( isNaN( field_info.val ) ) {
					console.log( '%cNumber', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cNumber', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		min_max: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'number' && field_info.val !== '' && ( !isNaN( field_info.min ) || !isNaN( field_info.max ) ) ) {
				field_info.val = parseInt( field_info.val );
				field_info.min = parseInt( field_info.min );
				field_info.max = parseInt( field_info.max );

				if ( field_info.val < field_info.min || field_info.val > field_info.max ) {
					console.log( '%cNumber Min/Max', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cNumber Min/Max', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max', true ] );
					return true;
				}
			}

			return true;
		},
		email: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'email' && field_info.val !== '' ) {
				if ( !regex.email.test( field_info.val ) ) {
					console.log( '%cEmail', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cEmail', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		url: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'url' && field_info.val !== '' ) {
				if ( !regex.url.test( field_info.val ) ) {
					console.log( '%cURL', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cURL', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		date_time: function() {
			let field_info = info.field_info;
			if ( field_info.data_type !== undefined && field_info.data_type !== '' && field_info.val !== '' && typeof moment === 'function' ) {
				let format = 'YYYY-MM-DD',
					type = '';
				if ( field_info.data_type == 'date' ) {
					format = 'YYYY-MM-DD';
					type = 'Date';
				} else if ( field_info.data_type == 'time' ) {
					format = 'HH:mm:ss';
					type = 'Time';
				} else if ( field_info.data_type == 'date-time' ) {
					format = 'YYYY-MM-DD HH:mm:ss';
					type = 'Date/Time';
				}

				if ( field_info.data_val !== undefined && field_info.data_val !== '' ) {
					format = field_info.data_val;
				}

				let date_time_valid = moment( field_info.val, format, true ).isValid();

				if ( !date_time_valid ) {
					console.log( '%c' + type, 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%c' + type, 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		file_type: function() {
			let field_info = info.field_info;
			if ( field_info.type == 'file' && field_info.val !== '' && field_info.accept !== undefined && field_info.accept !== '' ) {
				let accepted = field_info.accept.split( ',' ).map( function( mime ) {
						return mime.trim();
					} ),
					file_valid = true;

				$.each( field_info.files, function( file_index, element ) {
					if ( $.inArray( element.type, accepted ) === -1 ) {
						$.each( accepted, function( accept_index, value ) {
							if ( !element.name.endsWith( value ) ) {
								file_valid = false;
							}
						} );
					}
				} );

				if ( !file_valid ) {
					console.log( '%cFile', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cFile', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		pattern: function() {
			let field_info = info.field_info;
			if ( field_info.pattern !== undefined && field_info.pattern !== '' && field_info.val !== '' ) {
				let pattern_regex = new RegExp( field_info.pattern );

				if ( field_info.data_val !== undefined && field_info.data_val !== '' ) {
					pattern_regex = new RegExp( field_info.pattern, field_info.data_val );
				}

				if ( !pattern_regex.test( field_info.val ) ) {
					console.log( '%cPattern', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cPattern', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'invalid', true ] );
					return true;
				}
			}

			return true;
		},
		min_max_select: function() {
			let field_info = info.field_info;
			if ( field_info.node_name == 'select' && field_info.multiple ) {
				if ( !isNaN( field_info.min ) || !isNaN( field_info.max ) ) {
					field_info.min = parseInt( field_info.min );
					field_info.max = parseInt( field_info.max );
					if ( field_info.val && ( field_info.val.length < field_info.min || field_info.val.length > field_info.max ) ) {
						console.log( '%cSelect Min/Max', 'color:red;' );
						info.errors.push( [ field_info.node, field_info.name, 'min-max', false ] );
						info.valid = false;
						return false;
					} else {
						console.log( '%cSelect Min/Max', 'color:green;' );
						info.errors.push( [ field_info.node, field_info.name, 'min-max', true ] );
						return true;
					}
				}
			}

			return true;
		},
		min_max_length: function() {
			let field_info = info.field_info;
			if ( ( !isNaN( field_info.minlength ) || !isNaN( field_info.maxlength ) ) && field_info.val !== '' ) {
				field_info.minlength = parseInt( field_info.minlength );
				field_info.maxlength = parseInt( field_info.maxlength );

				if ( typeof field_info.minlength !== 'number' || isNaN( field_info.minlength ) ) {
					field_info.minlength = 0;
				}

				if ( typeof field_info.maxlength !== 'number' || isNaN( field_info.maxlength ) ) {
					field_info.maxlength = '';
				}

				let length_regex = new RegExp( '^.{' + field_info.minlength + ',' + field_info.maxlength + '}$' );

				if ( !length_regex.test( field_info.val ) && field_info.val.length !== 0 ) {
					console.log( '%cMin/Max Length', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max-length', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cMin/Max Length', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max-length', true ] );
					return true;
				}
			}

			return true;
		},
		exact_select: function() {
			let field_info = info.field_info;
			if ( field_info.node_name == 'select' && field_info.multiple ) {
				if ( !isNaN( field_info.data_length ) && field_info.val !== '' ) {
					field_info.data_length = parseInt( field_info.data_length );

					if ( field_info.val && field_info.val.length !== field_info.data_length ) {
						console.log( '%cSelect Length', 'color:red;' );
						info.errors.push( [ field_info.node, field_info.name, 'length', false ] );
						info.valid = false;
						return false;
					} else {
						console.log( '%cSelect Length', 'color:green;' );
						info.errors.push( [ field_info.node, field_info.name, 'length', true ] );
						return true;
					}
				}
			}

			return true;
		},
		exact_length: function() {
			let field_info = info.field_info;
			if ( field_info.node_name !== 'select' ) {
				if ( !isNaN( field_info.data_length ) && field_info.val !== '' ) {
					field_info.data_length = parseInt( field_info.data_length );

					if ( String( field_info.val ).length !== field_info.data_length ) {
						console.log( '%cExact Length', 'color:red;' );
						info.errors.push( [ field_info.node, field_info.name, 'length', false ] );
						info.valid = false;
						return false;
					} else {
						console.log( '%cExact Length', 'color:green;' );
						info.errors.push( [ field_info.node, field_info.name, 'length', true ] );
						return true;
					}
				}
			}

			return true;
		},
		min_max_word: function() {
			let field_info = info.field_info;
			if ( ( !isNaN( field_info.data_min_word ) || !isNaN( field_info.data_max_word ) ) && field_info.val !== '' ) {
				field_info.data_min_word = parseInt( field_info.data_min_word );
				field_info.data_max_word = parseInt( field_info.data_max_word );

				let words = field_info.val.split( /\s+/ ),
					word_count = 0;

				$.each( words, function( index, word ) {
					if ( word !== '' ) {
						word_count++;
					}
				} );

				if ( ( field_info.data_min_word !== 0 && word_count < field_info.data_min_word ) || ( field_info.data_max_word !== 0 && word_count > field_info.data_max_word ) ) {
					console.log( '%cMin/Max Word', 'color:red;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max-word', false ] );
					info.valid = false;
					return false;
				} else {
					console.log( '%cMin/Max Word', 'color:green;' );
					info.errors.push( [ field_info.node, field_info.name, 'min-max-word', true ] );
					return true;
				}
			}

			return true;
		},
		match: function() {
			let field_info = info.field_info;
			if ( field_info.match !== undefined ) {
				let match_field = $( field_info.match );

				if ( field_info.val !== '' || match_field.val() !== '' ) {
					if ( field_info.val !== match_field.val() ) {
						console.log( '%cValue Match', 'color:red;' );
						info.errors.push( [ field_info.node, field_info.name, 'match', false ] );
						info.errors.push( [ match_field, match_field.attr( 'name' ), '', false ] );
						info.valid = false;
						return false;
					} else {
						console.log( '%cValue Match', 'color:green;' );
						info.errors.push( [ field_info.node, field_info.name, 'match', true ] );
						info.errors.push( [ match_field, match_field.attr( 'name' ), '', true ] );
						return true;
					}
				}
			}

			return true;
		},
	};

	var info = {
		valid: true,
		radios: [],
		checkboxes: [],
		ignore: [
			'submit', 'reset'
		],
		errors: [],
		field_info: {},
	};

	const regex = {
		email: new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ),
		url: new RegExp( /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i ),
	};

	$.fn.bootstrap_validate = function( method ) {
		console.groupCollapsed( 'Validation: ' + new Date().toUTCString() );

		if ( typeof $.fn.affix == 'function' ) {
			$( '.help-block' ).addClass( 'hidden' );
			$( '.help-block' ).closest( '.form-group' ).removeClass( 'has-error has-success' );
		} else {
			$( '.form-feedback' ).addClass( 'd-none' ).removeClass( 'invalid-feedback d-block' );
			this.removeClass( 'is-valid is-invalid' );
		}

		info = {
			valid: true,
			radios: [],
			checkboxes: [],
			ignore: info.ignore,
			errors: [],
			field_info: {},
		};

		this.each( function( key, node ) {
			info.field_info = {
				node: $( node ),
				name: $( node ).attr( 'name' ),
				val: $( node ).val(),
				type: $( node ).attr( 'type' ),
				node_name: $( node ).prop( 'nodeName' ).toLowerCase(),
				required: $( node ).prop( 'required' ),
				min: $( node ).attr( 'min' ),
				max: $( node ).attr( 'max' ),
				data_type: $( node ).attr( 'data-type' ),
				data_val: $( node ).attr( 'data-value' ),
				minlength: $( node ).attr( 'minlength' ),
				maxlength: $( node ).attr( 'maxlength' ),
				data_length: $( node ).attr( 'data-length' ),
				data_min_word: $( node ).attr( 'data-min-word' ),
				data_max_word: $( node ).attr( 'data-max-word' ),
				pattern: $( node ).attr( 'pattern' ),
				accept: $( node ).attr( 'accept' ),
				files: $( node ).prop( 'files' ),
				match: $( node ).attr( 'data-match' ),
				multiple: $( node )[ 0 ].hasAttribute( 'multiple' ),
			};

			let field_valid = true;

			if ( $.inArray( info.field_info.type, info.ignore ) !== -1 ) {
				return true;
			}

			if ( info.field_info.type == 'radio' || info.field_info.type == 'checkbox' ) {
				info.field_info.val = '';
			}

			console.group( info.field_info.name );

			if ( methods[ method ] ) {
				field_valid = methods[ method ]();
			} else {
				$.each( methods, function( name ) {
					if ( field_valid ) {
						field_valid = methods[ name ]();
					}
				} );
			}

			console.groupEnd();
		} );

		console.groupEnd();

		$.each( info.errors, function( index, data ) {
			let field = data[ 0 ],
				error_name = data[ 1 ],
				error_id = data[ 2 ],
				success = data[ 3 ];

			error_name = error_name.split( /[\[\]]/ );
			error_name = error_name.filter( function( str ) {
				return str !== '';
			} );
			error_name = error_name.join( '-' );
			error_id = '#' + error_name + '-' + error_id;

			if ( typeof $.fn.affix === 'function' ) {
				if ( !success ) {
					$( error_id ).removeClass( 'hidden' );
					$( error_id ).closest( '.form-group' ).addClass( 'has-error' ).removeClass( 'has-success' );
				} else if ( success ) {
					$( error_id ).addClass( 'hidden' );
					$( error_id ).closest( '.form-group' ).addClass( 'has-success' ).removeClass( 'has-error' );
				}
			} else {
				if ( !success ) {
					$( error_id ).addClass( 'invalid-feedback d-block' ).removeClass( 'd-none' );
					$( field ).addClass( 'is-invalid' ).removeClass( 'is-valid' );
				} else if ( success ) {
					$( error_id ).addClass( 'd-none' ).removeClass( 'invalid-feedback d-block' );
					$( field ).addClass( 'is-valid' ).removeClass( 'is-invalid' );
				}
			}
		} );

		return info.valid;
	};

	if ( typeof String.prototype.endsWith === 'undefined' ) {
		String.prototype.endsWith = function( suffix ) {
			return this.indexOf( suffix, this.length - suffix.length ) !== -1;
		};
	}
}( jQuery ) );
