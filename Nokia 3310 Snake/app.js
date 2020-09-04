document.addEventListener('DOMContentLoaded', () => {
	/////////////////////////////  Variables
	const score_span = document.querySelector('.score span');
	const squares_div = document.querySelectorAll('.grid__squares');
	const apple_div = document.querySelectorAll('.grid__squares div');
	const start_button = document.querySelector('.start');
	const select = document.querySelector('.levels-filter');

	const width = 20;
	let score, currentIndex, currentSnake, appleIndex, speed, intervalTime, interval, direction;
	score = 0;
	currentIndex = 0; // so first div in our grid
	currentSnake = [ 2, 1, 0 ];
	appleIndex = 0; // so first div in our grid
	speed = 0.9;
	intervalTime = 0;
	interval = 0;
	direction = 0;

	// /////////////////////////// eventListeners
	document.addEventListener('keydown', control);

	// ///////////////////////////// Functions

	// function deals with ove outcome of the snake
	function moveOutComes() {
		//  deals with snake hit the border or hit self
		if (
			(currentSnake[0] + width >= width * width && direction === width) || // if snake hits bottm wall
			(currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top wall
			squares_div[currentSnake[0] + direction].classList.contains('snake') // if snake hits himself
		) {
			return clearInterval(interval);
		}

		const tail = currentSnake.pop(); // rmove last part of snake
		squares_div[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head

		//  deals with snake getting apple
		if (squares_div[currentSnake[0]].children[0].classList.contains('apple')) {
			squares_div[currentSnake[0]].children[0].classList.remove('apple');
			squares_div[tail].classList.add('snake');
			currentSnake.push(tail);
			randomApple();
			score++;
			score_span.innerHTML = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutComes, intervalTime);
		}

		squares_div[currentSnake[0]].classList.add('snake');
	}
	function startGame() {
		// removing the snake and the apple
		squares_div.forEach((cur) => cur.classList.remove('snake'));
		apple_div.forEach((cur) => cur.classList.remove('apple'));
		score = 0;
		randomApple();
		direction = 1;
		clearInterval(interval);
		score_span.innerHTML = score;
		switch (select.value) {
			case 'hard':
				intervalTime = 100;
				break;
			case 'medium':
				intervalTime = 250;
				break;
			case 'easy':
				intervalTime = 500;
		}
		currentSnake = [ 2, 1, 0 ];
		currentIndex = 0;
		currentSnake.forEach((cur) => squares_div[cur].classList.add('snake'));
		interval = setInterval(moveOutComes, intervalTime);
	}

	// generate random apple function
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares_div.length);
		} while (squares_div[appleIndex].classList.contains('snake'));
		squares_div[appleIndex].children[0].classList.add('apple');
	}

	// keyCode [up(38), right(39), down(40), left(37)]
	function control(e) {
		squares_div[currentIndex].classList.remove('snake'); // we are removing class of snake

		switch (e.keyCode) {
			case 38:
				direction = -width;
				break;
			case 39:
				direction = 1;
				break;
			case 40:
				direction = +width;
				break;
			case 37:
				direction = -1;
		}
	}

	start_button.addEventListener('click', startGame);
});
