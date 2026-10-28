// Interactive Controller for Nina's 1st Birthday Landing Page

document.addEventListener('DOMContentLoaded', () => {
    initMusicControls();
    initMainAvatar();
    renderTimeline();
    initCandleInteraction();
    initWishesSystem();
    initShareAndScroll();
    initPhotoUploader();
});

// ----------------------------------------------------
// 1. Music Player & Sound Controller
// ----------------------------------------------------
function initMusicControls() {
    const playBtn = document.getElementById('music-toggle-btn');
    const discIcon = document.getElementById('music-disc');
    const songTitleEl = document.getElementById('current-song-title');
    const nextSongBtn = document.getElementById('next-song-btn');
    const customAudioInput = document.getElementById('custom-audio-input');

    let isPlaying = false;

    function updatePlayState(playing) {
        isPlaying = playing;
        if (playing) {
            discIcon.classList.remove('spin-music-paused');
            discIcon.classList.add('spin-music');
            playBtn.innerHTML = `
                <svg class="w-5 h-5 text-pink-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
                <span class="text-xs font-bold text-pink-600">Đang phát</span>
            `;
        } else {
            discIcon.classList.add('spin-music-paused');
            playBtn.innerHTML = `
                <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <span class="text-xs font-bold text-pink-600">Bật nhạc</span>
            `;
        }
    }

    playBtn.addEventListener('click', () => {
        const active = window.musicBox.toggle();
        updatePlayState(active);
    });

    const uploadMp3Btn = document.getElementById('upload-mp3-btn');

    if (uploadMp3Btn && customAudioInput) {
        uploadMp3Btn.addEventListener('click', (e) => {
            e.stopPropagation();
            customAudioInput.click();
        });

        customAudioInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const fileName = file.name.replace(/\.[^/.]+$/, "");
                window.musicBox.loadCustomAudio(file, fileName);
                if (songTitleEl) songTitleEl.textContent = fileName;
                updatePlayState(true);
                showNotification(`Đang phát nhạc: ${fileName} 🎵`);
            }
        });
    }

    if (nextSongBtn) {
        nextSongBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newTitle = window.musicBox.switchSong();
            if (songTitleEl) songTitleEl.textContent = newTitle;
            if (!isPlaying) {
                window.musicBox.start();
                updatePlayState(true);
            }
        });
    }

    // Auto prompt on first user touch anywhere to enable music smoothly (respects mobile browser autoplay policies)
    const firstInteractionHandler = () => {
        // Just warm up AudioContext
        if (window.musicBox && window.musicBox.ctx && window.musicBox.ctx.state === 'suspended') {
            window.musicBox.ctx.resume();
        }
        document.removeEventListener('click', firstInteractionHandler);
        document.removeEventListener('touchstart', firstInteractionHandler);
    };
    document.addEventListener('click', firstInteractionHandler, { once: true });
    document.addEventListener('touchstart', firstInteractionHandler, { once: true });
}

// ----------------------------------------------------
// 2. Render 12 Months Journey Cards
// ----------------------------------------------------
function renderTimeline() {
    const container = document.getElementById('timeline-cards-container');
    if (!container) return;

    container.innerHTML = '';

    window.MONTHS_DATA.forEach((item, index) => {
        const isEven = index % 2 === 1;
        const savedPhoto = localStorage.getItem(`nina_photo_month_${item.month}`);
        const defaultIllustration = window.MONTH_ILLUSTRATIONS[item.month] || '';

        const card = document.createElement('div');
        card.className = `relative flex flex-col md:flex-row items-center gap-6 mb-12 md:mb-16 ${
            isEven ? 'md:flex-row-reverse' : ''
        }`;

        card.innerHTML = `
            <!-- Month Timeline Indicator Dot -->
            <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white font-bold items-center justify-center shadow-lg shadow-pink-200 z-10 border-4 border-white text-sm">
                ${item.month}T
            </div>

            <!-- Polaroid Photo Container (Half width on desktop, full width on mobile) -->
            <div class="w-full md:w-5/12 flex justify-center">
                <div class="polaroid-card w-full max-w-sm p-3.5 bg-white shadow-xl rounded-2xl relative group">
                    <div class="washi-tape ${item.month % 2 === 0 ? 'washi-tape-pink' : ''}"></div>
                    
                    <!-- Image Preview Area -->
                    <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-rose-50 border border-pink-100 flex items-center justify-center cursor-pointer shadow-inner photo-preview-box" data-month="${item.month}">
                        <div id="photo-display-${item.month}" class="w-full h-full flex items-center justify-center">
                            ${
                                savedPhoto 
                                ? `<img src="${savedPhoto}" alt="Bé Nina tháng thứ ${item.month}" class="w-full h-full object-cover">`
                                : defaultIllustration
                            }
                        </div>

                        <!-- Hover/Tap Overlay Buttons -->
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 md:transition-opacity flex items-center justify-center gap-2 p-3">
                            <button onclick="triggerPhotoUpload(${item.month})" class="bg-white/90 hover:bg-white text-pink-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Đổi ảnh thật
                            </button>
                            <button onclick="openLightbox(${item.month})" class="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                </svg>
                                Phóng to
                            </button>
                        </div>
                    </div>

                    <!-- Polaroid Footer Label -->
                    <div class="pt-3 pb-1 px-1 flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-pink-500 uppercase tracking-wider">Tháng ${item.month}</span>
                            <p class="font-handwriting text-lg text-gray-700 font-bold leading-none">Nina Minh Thư</p>
                        </div>
                        <span class="text-xs text-gray-400 bg-rose-50 px-2 py-0.5 rounded-full font-medium">${item.time.split(' - ')[0]}</span>
                    </div>

                    <!-- Mobile Direct Change Photo Button -->
                    <div class="mt-2 md:hidden flex justify-between gap-2 border-t border-dashed border-pink-100 pt-2">
                        <button onclick="triggerPhotoUpload(${item.month})" class="w-full text-center text-xs py-1.5 bg-rose-50 hover:bg-rose-100 text-pink-600 font-semibold rounded-lg flex items-center justify-center gap-1">
                            📷 Chạm để tải ảnh bé lên
                        </button>
                    </div>
                </div>
            </div>

            <!-- Content Details Card -->
            <div class="w-full md:w-5/12">
                <div class="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100 hover:border-pink-300 transition-all">
                    <!-- Badges -->
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <span class="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                            <span>${item.icon}</span> Tháng ${item.month}: ${item.badge}
                        </span>
                        <span class="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
                            ⭐ ${item.highlight}
                        </span>
                    </div>

                    <!-- Title -->
                    <h3 class="font-heading text-xl md:text-2xl font-bold text-gray-800 mb-2">
                        ${item.title}
                    </h3>

                    <!-- Weight & Height stats box -->
                    <div class="flex items-center gap-4 bg-gradient-to-r from-rose-50/80 to-amber-50/80 p-2.5 rounded-xl text-xs text-gray-600 mb-3 border border-rose-100">
                        <div class="flex items-center gap-1">
                            <span class="text-base">⚖️</span>
                            <span>Cân nặng: <strong class="text-pink-600">${item.weight}</strong></span>
                        </div>
                        <div class="w-px h-4 bg-rose-200"></div>
                        <div class="flex items-center gap-1">
                            <span class="text-base">📏</span>
                            <span>Chiều cao: <strong class="text-pink-600">${item.height}</strong></span>
                        </div>
                    </div>

                    <!-- Heartfelt Narrative Description -->
                    <p class="text-gray-600 leading-relaxed text-sm text-justify">
                        ${item.description}
                    </p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ----------------------------------------------------
// 2.1 Main Centered Avatar Controller
// ----------------------------------------------------
function initMainAvatar() {
    const avatarDisplay = document.getElementById('avatar-display');
    const avatarContainer = document.getElementById('main-avatar-container');
    const changeBtn = document.getElementById('change-avatar-btn');
    const avatarInput = document.getElementById('avatar-file-input');

    if (!avatarDisplay) return;

    function renderAvatar() {
        const savedAvatar = localStorage.getItem('nina_avatar_photo');
        if (savedAvatar) {
            avatarDisplay.innerHTML = `<img src="${savedAvatar}" alt="Bé Nina" class="w-full h-full object-cover rounded-full">`;
        } else {
            avatarDisplay.innerHTML = window.NINA_MAIN_AVATAR || '';
        }
    }

    renderAvatar();

    const triggerUpload = () => {
        if (avatarInput) avatarInput.click();
    };

    if (avatarContainer) avatarContainer.addEventListener('click', triggerUpload);
    if (changeBtn) changeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerUpload();
    });

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressed = canvas.toDataURL('image/jpeg', 0.85);
                    try {
                        localStorage.setItem('nina_avatar_photo', compressed);
                        renderAvatar();
                        safeConfetti({
                            particleCount: 50,
                            spread: 60,
                            origin: { y: 0.3 }
                        });
                        showNotification("Đã cập nhật ảnh đại diện của bé Nina! 👑💖");
                    } catch (err) {
                        console.error(err);
                        showNotification("Không thể lưu ảnh vào bộ nhớ tạm trình duyệt!");
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
            avatarInput.value = '';
        });
    }
}

// ----------------------------------------------------
// 3. Photo Upload & Local Storage Management
// ----------------------------------------------------
let activeUploadMonth = null;

function initPhotoUploader() {
    const fileInput = document.getElementById('photo-file-input');
    if (!fileInput) return;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file || !activeUploadMonth) return;

        // Resize & compress image using canvas to ensure fast localStorage save
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1000;
                const MAX_HEIGHT = 1000;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

                try {
                    localStorage.setItem(`nina_photo_month_${activeUploadMonth}`, compressedDataUrl);
                    
                    // Update preview in UI
                    const displayEl = document.getElementById(`photo-display-${activeUploadMonth}`);
                    if (displayEl) {
                        displayEl.innerHTML = `<img src="${compressedDataUrl}" alt="Bé Nina tháng thứ ${activeUploadMonth}" class="w-full h-full object-cover">`;
                    }

                    // Confetti burst for celebrating photo upload
                    safeConfetti({
                        particleCount: 40,
                        spread: 60,
                        origin: { y: 0.7 }
                    });

                    showNotification(`Đã lưu ảnh tháng thứ ${activeUploadMonth} của bé Nina! 📸💖`);
                } catch (err) {
                    console.error("Storage full or error:", err);
                    showNotification("Bộ nhớ trình duyệt đầy, nhưng ảnh đã hiển thị tạm thời!");
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);

        // Reset input
        fileInput.value = '';
    });
}

window.triggerPhotoUpload = function(month) {
    activeUploadMonth = month;
    const fileInput = document.getElementById('photo-file-input');
    if (fileInput) fileInput.click();
};

window.openLightbox = function(month) {
    const savedPhoto = localStorage.getItem(`nina_photo_month_${month}`);
    const modal = document.getElementById('lightbox-modal');
    const modalContent = document.getElementById('lightbox-content');
    const modalCaption = document.getElementById('lightbox-caption');
    const monthData = window.MONTHS_DATA.find(m => m.month === month);

    if (!modal || !modalContent) return;

    if (savedPhoto) {
        modalContent.innerHTML = `<img src="${savedPhoto}" class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl">`;
    } else {
        modalContent.innerHTML = `<div class="w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">${window.MONTH_ILLUSTRATIONS[month]}</div>`;
    }

    if (modalCaption && monthData) {
        modalCaption.innerHTML = `
            <h4 class="font-heading text-lg font-bold text-white">Tháng thứ ${month}: ${monthData.title}</h4>
            <p class="text-sm text-pink-200">${monthData.weight} • ${monthData.height}</p>
        `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeLightbox = function() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

function safeConfetti(opts) {
    if (typeof confetti === 'function') {
        try {
            confetti(opts);
        } catch (e) {
            console.warn("Confetti error", e);
        }
    }
}
function initCandleInteraction() {
    const blowBtn = document.getElementById('blow-candle-btn');
    const flameEl = document.getElementById('candle-flame');
    const cakeContainer = document.getElementById('cake-interactive-box');
    const wishResultModal = document.getElementById('birthday-wish-modal');
    let isBlown = false;

    if (!blowBtn || !flameEl) return;

    blowBtn.addEventListener('click', () => {
        if (!isBlown) {
            // Blow out candle
            flameEl.classList.remove('candle-flame');
            flameEl.innerHTML = `<div class="w-2 h-4 bg-gray-400 rounded-full candle-smoke"></div>`;
            isBlown = true;
            blowBtn.innerHTML = `
                <span class="text-lg">🕯️</span>
                <span>Thắp Nến Lại</span>
            `;

            // Play celebratory chime chord
            if (window.musicBox) {
                window.musicBox.playCelebrationChord();
            }

            // Fire golden confetti explosions
            fireCelebrationConfetti();

            // Show congratulatory modal
            setTimeout(() => {
                if (wishResultModal) {
                    wishResultModal.classList.remove('hidden');
                    wishResultModal.classList.add('flex');
                }
            }, 800);
        } else {
            // Relight candle
            flameEl.innerHTML = '';
            flameEl.classList.add('candle-flame');
            isBlown = false;
            blowBtn.innerHTML = `
                <span class="text-lg">🎂</span>
                <span>Ước & Thổi Nến Mừng Nina 1 Tuổi</span>
            `;
            showNotification("Đã thắp lại nến! Hãy nhắm mắt và ước thêm điều may mắn nhé! ✨");
        }
    });
}

function fireCelebrationConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.6 }
    };

    function fire(particleRatio, opts) {
        safeConfetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f472b6', '#f43f5e', '#fef08a'] });
    fire(0.2, { spread: 60, colors: ['#ec4899', '#fbbf24', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#f472b6', '#a855f7'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

window.closeWishModal = function() {
    const modal = document.getElementById('birthday-wish-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// ----------------------------------------------------
// 5. Wishes Guestbook System
// ----------------------------------------------------
function initWishesSystem() {
    const wishesList = document.getElementById('wishes-list');
    const wishForm = document.getElementById('wish-submit-form');
    const authorInput = document.getElementById('wish-author-name');
    const roleSelect = document.getElementById('wish-author-role');
    const contentInput = document.getElementById('wish-content-text');

    // Retrieve saved wishes or use defaults
    let storedWishes = [];
    try {
        const raw = localStorage.getItem('nina_custom_wishes');
        if (raw) storedWishes = JSON.parse(raw);
    } catch (e) {
        storedWishes = [];
    }

    const allWishes = [...storedWishes, ...window.DEFAULT_WISHES];

    function renderWishes() {
        if (!wishesList) return;
        wishesList.innerHTML = '';

        allWishes.forEach((w) => {
            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow relative flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2.5">
                            <div class="w-10 h-10 rounded-full ${w.avatarColor || 'bg-pink-100 text-pink-600'} font-bold flex items-center justify-center text-sm shadow-inner">
                                ${w.author.charAt(0)}
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800 text-sm leading-tight">${w.author}</h4>
                                <span class="text-xs text-pink-500 font-medium">${w.role || 'Người thân'}</span>
                            </div>
                        </div>
                        <span class="text-[11px] text-gray-400">${w.date || 'Gần đây'}</span>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">${w.content}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs text-gray-400">
                    <button onclick="reactWish(this)" class="flex items-center gap-1 text-pink-500 hover:text-pink-600 font-semibold transition-transform active:scale-125">
                        <span>💖</span> <span class="like-count">1</span> Yêu thích
                    </button>
                    <span class="text-pink-300">#MungNina1Tuoi</span>
                </div>
            `;
            wishesList.appendChild(card);
        });
    }

    renderWishes();

    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const author = authorInput.value.trim();
            const role = roleSelect.value;
            const content = contentInput.value.trim();

            if (!author || !content) {
                alert("Vui lòng nhập tên và lời chúc yêu thương cho bé Nina nhé!");
                return;
            }

            const newWish = {
                id: Date.now(),
                author: author,
                role: role,
                date: "Vừa xong",
                avatarColor: "bg-rose-100 text-rose-600",
                content: content
            };

            storedWishes.unshift(newWish);
            allWishes.unshift(newWish);

            try {
                localStorage.setItem('nina_custom_wishes', JSON.stringify(storedWishes));
            } catch (err) {
                console.error(err);
            }

            renderWishes();

            // Clear form
            authorInput.value = '';
            contentInput.value = '';

            safeConfetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.8 }
            });

            showNotification(`Cảm ơn ${author} đã gửi lời chúc ngọt ngào cho bé Nina! 💖`);
        });
    }
}

window.reactWish = function(btn) {
    const countEl = btn.querySelector('.like-count');
    if (countEl) {
        let current = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = current + 1;
        btn.classList.add('text-rose-600');
    }
};

// ----------------------------------------------------
// 6. Share & Navigation
// ----------------------------------------------------
function initShareAndScroll() {
    const shareBtn = document.getElementById('share-card-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: "Thiệp Sinh Nhật 1 Tuổi - Bé Nina (Nguyễn Ngọc Minh Thư)",
                text: "Chúc mừng sinh nhật 1 tuổi bé Nina! Cùng ngắm nhìn hành trình 12 tháng khôn lớn kỳ diệu của công chúa nhỏ nhé! 🎂💖",
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log('User cancelled or error', err);
                }
            } else {
                // Fallback copy link to clipboard
                navigator.clipboard.writeText(window.location.href);
                showNotification("Đã sao chép liên kết thiệp vào bộ nhớ tạm! Bạn có thể dán vào Zalo/Facebook để gửi ngay! 💌");
            }
        });
    }
}

function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-pink-400/40 animate-bounce';
    toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3800);
}
