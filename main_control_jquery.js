//Definición de componentes
var FilmList = can.Control.extend({
	//Nombre que daremos como plugin de jQuery
	pluginName: 'film_list',

	//Las opciones por defecto siempre van a defaults en primer parámetro
	defaults: {
		firstElement:{
			'titulo':'Default Title',
			'pais':'Default Country'
		},
		list_template: 'list_template'
	}
},{
	//variables públicas
	list: null,
	Element: null,
	//métodos públicos
	init: function(element, options){
		//el objeto this.element es el elemento HTML seleccionado al hacer el init
		//el objeto this.options son las opciones por defecto sobrescritas con los parámetros
		
		this.Element = can.Map.extend({});

		var e = new this.Element(this.options.firstElement);

		this.list = new can.List();
		this.list.push(e);

		this.element.html(
			can.view(this.options.list_template, {thelist: this.list})
		);
	},
	//Eventos
	'a.close click': function(a, event){
		this.list.splice(a.attr("data-index"),1);
	},
	'h3.title click': function(h3, event){
		this.list[ h3.attr("data-index") ].attr('titulo', window.prompt('nuevo título')  );
	},

	//Métodos específicos
	addFilm: function(o){
		this.list.push(
			new this.Element(o)
		);
	},
	change: function(callback){
		this.list.bind("change", callback);
	},

	//Cambios en la ruta
	'film/:id route': function(data){
		$("#content h3").removeClass("selected");
		$("#content h3[data-index="+data.id+"]").addClass("selected");

		console.log("Nueva película",data);
	}
});

//Carga de la página
$(document).ready(function($) {
	//Escuchamos las rutas definidas para nuestro control
	can.route("film/:id");
	can.route.ready();

	$("#content").film_list({
		firstElement:{
			'titulo':'Kunfu Panda',
			'pais': 'China'
		}
	});
	
	$("#addElement").click(function(){
		//Cambiamos de ruta
		location.hash = can.route.url({id:1});

		$("#content").film_list( "addFilm" ,{
			'titulo':'Pocoyo',
			'pais':'USA'
		});
	});

	$("#content").film_list("change", function(e,a,h){
		console.log(a,h);
	});
});