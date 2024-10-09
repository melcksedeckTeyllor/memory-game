const grid = document.querySelector('.grid');

const servicesProducts = [
    'PagamentoAutomatico',
    'PagamentoAutomaticoResp',
    'GestaoFrotas',
    'GestaoFrotasResp',
    'ControleAbastecimento',
    'ControleAbastecimentoResp',
    'CartaoMulti',
    'CartaoMultiResp',
    'AppSemParar',
    'AppSemPararResp',
    'AbastecimentoAutomatico',
    'AbastecimentoAutomaticoResp',
];

let firstCard = '';
let secondCard = '';

const revealCard = ({ target }) => {
    // Verifica se a carta já está revelada ou desabilitada
    if (target.parentNode.className.includes('reveal-card') || target.parentNode.className.includes('disabled-card')) {
        return; 
    }

    target.parentNode.classList.add('reveal-card');

    
    if (firstCard === '') {
        firstCard = target.parentNode; 
    } else if (secondCard === '') {
        secondCard = target.parentNode; 
        checkCards(); 
    }
};

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards === 12) {
        alert("Parabéns, você conseguiu!")
    }
}

const checkCards = () => {
    const firstService = firstCard.getAttribute('data-servicesProduct');
    const secondService = secondCard.getAttribute('data-servicesProduct');

    
    if (firstService.replace('Resp', '') === secondService.replace('Resp', '') || secondService.replace('Resp', '') === firstService.replace('Resp', '')) {
        
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard.removeEventListener('click', revealCard);
        secondCard.removeEventListener('click', revealCard);
        
        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            
            firstCard = '';
            secondCard = '';
        }, 1000);
    }
};

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const CreateCard = (servicesProduct) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../Assets/${servicesProduct}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-servicesProduct', servicesProduct);

    return card;
};

const loadGame = () => {
    const shuffledArray = servicesProducts.sort(() => Math.random() - 0.5);
    shuffledArray.forEach((servicesProduct) => {
        const card = CreateCard(servicesProduct);
        grid.appendChild(card);
    });
};

loadGame();
