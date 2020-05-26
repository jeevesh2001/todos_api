$(document).ready(function() {
	// show todos
	$.getJSON('/api/todos').then(addTodos);

	// create todo
	$('#todoInput').keypress(function(event) {
		const userInput = $('#todoInput').val();
		if (event.which == 13 && userInput != '') createTodo(userInput);
	});

	// update todo
	$('.list').on('click', 'li', function() {
		updateTodo($(this));
	});

	// remove todo
	$('.list').on('click', 'span', function(e) {
		e.stopPropagation();
		removeTodo($(this).parent());
	});
});

//================== helper functions ========================
const addTodos = (todos) => {
	// add todos to page here
	todos.forEach((todo) => {
		addTodo(todo);
	});
};

const createTodo = (userInput) => {
	// send request to create new todo
	$.post('/api/todos', {
		name: userInput
	})
		.then(function(newTodo) {
			addTodo(newTodo);
			$('#todoInput').val('');
		})
		.catch(function(err) {
			console.log(err);
		});
};

const addTodo = (todo) => {
	let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) {
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
};

const removeTodo = (todo) => {
	const clickedId = todo.data('id');
	const deleteUrl = 'api/todos/' + clickedId;
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
		.then(function(data) {
			todo.remove();
		})
		.catch(function(err) {
			console.log(err);
		});
};

const updateTodo = (todo) => {
	const updateUrl = 'api/todos/' + todo.data('id');
	let isDone = !todo.data('completed');
	let updateData = { completed: isDone };
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	}).then(function(updatedTodo) {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	});
};
