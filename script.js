let currentSize = 16;

function setPreset(size, btn) {
    currentSize = size;
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const overlay = document.getElementById('gridOverlay');
    const percentage = 100 / size;
    overlay.style.backgroundSize = `${percentage}% ${percentage}%`;
}

function toggleGrid() {
    const overlay = document.getElementById('gridOverlay');
    const btn = document.getElementById('gridToggle');
    overlay.classList.toggle('active');
    
    if(overlay.classList.contains('active')) {
        btn.innerText = "GRID: ON";
        btn.classList.add('active');
    } else {
        btn.innerText = "GRID: OFF";
        btn.classList.remove('active');
    }
}

function generatePixelArt() {
    const prompt = document.getElementById('promptInput').value;
    if(!prompt) return alert('Ketik prompt asset-nya dulu ya!');

    const loadingText = document.getElementById('loadingText');
    const resultImage = document.getElementById('resultImage');

    loadingText.style.display = 'block';
    resultImage.style.display = 'none';

    const styleModifier = `, standalone 2d game asset, pixel art style, ${currentSize}x${currentSize} resolution vibe, crisp outline, dark background`;
    const finalPrompt = encodeURIComponent(prompt + styleModifier);
    
    const randomSeed = Math.floor(Math.random() * 99999);
    const apiUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?width=512&height=512&nologo=true&seed=${randomSeed}`;

    resultImage.src = apiUrl;

    resultImage.onload = function() {
        loadingText.style.display = 'none';
        resultImage.style.display = 'block';
    };
}

function downloadImage() {
    const img = document.getElementById('resultImage');
    if(!img.src || img.style.display === 'none') return alert('Belum ada gambar yang dibuat!');
    
    window.open(img.src, '_blank');
}

