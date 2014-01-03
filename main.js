//Variables globales
var mylist;
var Element;

$(document).ready(function($) {
	//Creamos un objeto asociativo observable
	Element = can.Map.extend({});

	var e = new Element({
		'titulo':'El penalti más largo del mundo',
		'pais':'España'
	});

	//Creamos una lista observable
	mylist = new can.List();
	mylist.push(e);

	//Cargamos una vista handlebars con la lista
	//la sintaxis mustache en las vistas viene por defecto en CanJS,
	//para usar Handlebars se necesita cargar su librería JS.
	$("#content").html(
		can.view('list_template',{thelist: mylist})
	);

	//Añadimos un elemento al hacer clic en el botón
	$("#addElement").click(function(){
		mylist.push(
			new Element({
				'titulo':'Otro título',
				'pais':'USA'
			})
		);
	});

	//Cuando hay cambios lo mostramos en los logs
	mylist.bind("change", function(e,a,h){
		console.log(a,h);
	});
});