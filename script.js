document.addEventListener('DOMContentLoaded', function() {
    const consoleScreen = document.getElementById('consoleScreen');
    const mainContent = document.getElementById('mainContent');
    const typingText = document.getElementById('typingText');
    const continueText = document.getElementById('continueText');
    
    const consoleText = `EFEKT.FUN`;
    
    let charIndex = 0;
    const typeSpeed = 150;
    
    function typeText() {
        if (charIndex < consoleText.length) {
            typingText.innerHTML += consoleText[charIndex];
            charIndex++;
            setTimeout(typeText, typeSpeed);
        } else {
            continueText.style.display = 'block';
        }
    }
    
    setTimeout(typeText, 500);
    
    consoleScreen.addEventListener('click', function() {
        consoleScreen.style.opacity = '0';
        consoleScreen.style.transition = 'opacity 1s ease-out';
        
        setTimeout(() => {
            consoleScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            
            initMainPage();
        }, 1000);
    });
    
    function initMainPage() {
        document.addEventListener('mousemove', function(e) {
            const stars = document.querySelector('.stars');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            stars.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });

        const bioPanel = document.querySelector('.bio-panel');
        bioPanel.style.opacity = '0';
        bioPanel.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            bioPanel.style.transition = 'all 0.8s ease';
            bioPanel.style.opacity = '1';
            bioPanel.style.transform = 'translateY(0)';
        }, 300);

        const socialBtns = document.querySelectorAll('.social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        function createRandomStars() {
            const body = document.body;
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.background = 'white';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animation = 'twinkle ' + (Math.random() * 4 + 2) + 's infinite linear';
            star.style.zIndex = '1';
            
            body.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 10000);
        }

        setInterval(createRandomStars, 2000);

        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        if (!playPauseBtn || !volumeSlider || !backgroundMusic) {
            console.error('Nie można znaleźć elementów kontroli muzyki w initMainPage');
            return;
        }
        
        console.log('Elementy kontroli muzyki znalezione w initMainPage:', { playPauseBtn, volumeSlider, backgroundMusic });
        
        backgroundMusic.volume = 0.15;
        volumeSlider.value = 15;
        
        backgroundMusic.play().then(() => {
            playPauseBtn.classList.add('playing');
            console.log('Muzyka automatycznie włączona w initMainPage');
        }).catch(error => {
            console.log('Autoplay prevented by browser, trying alternative method w initMainPage');
            setTimeout(() => {
                backgroundMusic.play().then(() => {
                    playPauseBtn.classList.add('playing');
                    console.log('Muzyka włączona alternatywną metodą w initMainPage');
                }).catch(err => {
                    console.log('Autoplay still blocked, user interaction required w initMainPage');
                });
            }, 100);
        });
        
        playPauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Kliknięto przycisk play/pause w initMainPage');
            console.log('Muzyka paused:', backgroundMusic.paused);
            console.log('Muzyka currentTime:', backgroundMusic.currentTime);
            
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    playPauseBtn.classList.add('playing');
                    console.log('Muzyka włączona w initMainPage');
                }).catch(error => {
                    console.error('Błąd podczas włączania muzyki w initMainPage:', error);
                });
            } else {
                backgroundMusic.pause();
                playPauseBtn.classList.remove('playing');
                console.log('Muzyka zatrzymana w initMainPage');
            }
        });
        
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            backgroundMusic.volume = volume;
            console.log('Głośność ustawiona na:', volume * 100 + '% w initMainPage');
        });
        
        document.addEventListener('click', function() {
            if (backgroundMusic.paused && !playPauseBtn.classList.contains('playing')) {
                backgroundMusic.play().then(() => {
                    playPauseBtn.classList.add('playing');
                    console.log('Muzyka włączona po kliknięciu w initMainPage');
                }).catch(error => {
                    console.log('Autoplay prevented by browser');
                });
            }
        }, { once: true });
    }
});
