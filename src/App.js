import React, { useState } from 'react';
import './App.css';

// --- A mesma mágica de antes para carregar as imagens ---
const imagesContext = require.context('./tutorial-images', true, /\.(png|jpe?g|svg|gif|webp)$/i);
const tutorialImages = imagesContext.keys()
    .map(imagesContext)
    .filter(path => typeof path === 'string')
    .sort((a, b) => { // Ordenamos diretamente aqui
      const getName = (url) => url.split('/').pop().split('?')[0];
      return getName(a).localeCompare(getName(b));
    });
// --- Fim da mágica ---


function App() {
  // --- A Ferramenta do React: O Estado (State) ---
  // 'currentIndex' é o número do slide que estamos a ver. Começamos no 0 (o primeiro).
  // 'setCurrentIndex' é a função que usamos para mudar de slide.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para ir para o slide anterior
  const goToPrevious = () => {
    // Verifica se estamos no primeiro slide. Se sim, vai para o último. Senão, volta 1.
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? tutorialImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Função para ir para o próximo slide
  const goToNext = () => {
    // Verifica se estamos no último slide. Se sim, volta para o primeiro. Senão, avança 1.
    const isLastSlide = currentIndex === tutorialImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Função para ir para um slide específico (usado pelos pontinhos)
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Se não houver imagens, não mostra nada
  if (tutorialImages.length === 0) {
    return (
      <div className="App">
        <h1>Adicione imagens na pasta `src/tutorial-images` para começar!</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tutorial de Deploy na DigitalOcean</h1>
        <p>Use as setas para navegar entre os passos</p>
      </header>
      
      <main className="carousel-container">
        {/* Setas de Navegação */}
        <div className="arrow left-arrow" onClick={goToPrevious}>&#10094;</div>
        <div className="arrow right-arrow" onClick={goToNext}>&#10095;</div>

        {/* Slide Principal com a Imagem */}
        <div className="carousel-slide">
          {/* A key={currentIndex} é um truque para forçar o React a re-renderizar o elemento,
              o que ajuda a disparar a nossa animação CSS de fade-in. */}
          <img 
            key={currentIndex}
            src={tutorialImages[currentIndex]} 
            alt={`Passo ${currentIndex + 1}`} 
            className="tutorial-image" 
          />
          <div className="slide-counter">
            {currentIndex + 1} / {tutorialImages.length}
          </div>
        </div>

        {/* Pontinhos de Navegação */}
        <div className="dots-container">
          {tutorialImages.map((slide, slideIndex) => (
            <div 
              key={slideIndex}
              className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
              onClick={() => goToSlide(slideIndex)}
            >
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;