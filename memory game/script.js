document.addEventListener('DOMContentLoaded', () => {
	// card options
	const cardArray = [
		{
			name: 'Elephant',
			img: 'images/image_1.jpg'
		},
		{
			name: 'Elephant',
			img: 'images/image_1.jpg'
		},
		{
			name: 'Lion',
			img: 'images/image_2.jpg'
		},
		{
			name: 'Lion',
			img: 'images/image_2.jpg'
		},
		{
			name: 'Satellite',
			img: 'images/image_3.jpg'
		},
		{
			name: 'Satellite',
			img: 'images/image_3.jpg'
		},
		{
			name: 'Palace',
			img: 'images/image_4.jpg'
		},
		{
			name: 'Palace',
			img: 'images/image_4.jpg'
		},
		{
			name: 'Mosque',
			img: 'images/image_5.jpg'
		},
		{
			name: 'Mosque',
			img: 'images/image_5.jpg'
		},
		{
			name: 'Flower',
			img: 'images/image_6.jpg'
		},
		{
			name: 'Flower',
			img: 'images/image_6.jpg'
		},
		{
			name: 'ship',
			img: 'images/image_7.jpg'
		},
		{
			name: 'ship',
			img: 'images/image_7.jpg'
		},
		{
			name: 'rocket',
			img: 'images/image_8.jpg'
		},
		{
			name: 'rocket',
			img: 'images/image_8.jpg'
		},
		{
			name: 'deer',
			img: 'images/image_9.jpg'
		},
		{
			name: 'deer',
			img: 'images/image_9.jpg'
		},
		{
			name: 'panda',
			img: 'images/image_10.jpg'
		},
		{
			name: 'panda',
			img: 'images/image_10.jpg'
		}
	];

	cardArray.sort(() => 0.5 - Math.random());

	const grid = document.querySelector('.grid');
	const resultDisplay = document.querySelector('h3 span');
	let cardsChosen = [];
	let cardsChosenId = [];
	let cardsWon = [];

	// create baord
	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			let card = document.createElement('img');
			card.setAttribute('src', 'images/block.jpg');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);
			grid.appendChild(card);
		}
	}

	// check for match
	function checkForMatch() {
		let cards = document.querySelectorAll('img');
		const optionOneId = cardsChosenId[0];
		const optionTwoId = cardsChosenId[1];
		if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] !== cardsChosenId[1]) {
			cards[optionOneId].setAttribute('src', 'images/white.png');
			cards[optionTwoId].setAttribute('src', 'images/white.png');

			// to make the white image unclickable
			cards[optionOneId].removeEventListener('click', flipCard);
			cards[optionTwoId].removeEventListener('click', flipCard);
			cardsWon.push(cardsChosen);
		} else {
			cards[optionOneId].setAttribute('src', 'images/block.jpg');
			cards[optionTwoId].setAttribute('src', 'images/block.jpg');
		}
		cardsChosen = [];
		cardsChosenId = [];
		resultDisplay.textContent = cardsWon.length;
		if (cardsWon.length === cardArray.length / 2) resultDisplay.textContent = 'Congratulation! You Found Them All!';
	}

	// flip your card
	function flipCard() {
		let cardId = this.getAttribute('data-id');
		// if (cardsChosen.length >= 2) {}
		cardsChosen.push(cardArray[cardId].name);
		cardsChosenId.push(cardId);
		if (cardsChosen.length < 3) this.setAttribute('src', cardArray[cardId].img);
		if (cardsChosen.length === 2) setTimeout(checkForMatch, 500);
	}

	createBoard();
});
