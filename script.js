document.addEventListener("DOMContentLoaded", () => {
  initLetterModal();
  initMusic();
});

// ============== LETTER MODAL ==============
function initLetterModal() {
  const modal = document.getElementById("noteModal");
  const modalText = document.getElementById("noteModalText");
  const closeBtn = document.getElementById("noteModalClose");
  const envelopes = document.querySelectorAll(".envelope");
  if (!modal || !modalText || !closeBtn) return;

  const openModal = (message) => {
    modalText.textContent = message;
    modal.classList.add("open");
  };

  const closeModal = () => {
    modal.classList.remove("open");
  };

  envelopes.forEach((envelope) => {
    envelope.addEventListener("click", () => {
      openModal(envelope.dataset.message);
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ============== MUSIC ==============
function initMusic() {
  const audio = document.getElementById("bgAudio");
  const toggle = document.getElementById("musicToggle");
  const prompt = document.getElementById("musicPrompt");
  if (!audio || !toggle) return;

  const setPlayingState = (isPlaying) => {
    toggle.classList.toggle("playing", isPlaying);
  };

  const tryAutoplay = async () => {
    try {
      await audio.play();
      setPlayingState(true);
    } catch (err) {
      // Autoplay was blocked — show the tap-to-play prompt instead.
      if (prompt) prompt.classList.add("visible");
    }
  };

  // Attempt autoplay as soon as the page loads.
  tryAutoplay();

  // If autoplay was blocked, the first tap anywhere starts the song.
  const startOnFirstTap = () => {
    audio.play().then(() => {
      setPlayingState(true);
      if (prompt) prompt.classList.remove("visible");
    }).catch(() => {});
    document.removeEventListener("click", startOnFirstTap);
  };
  document.addEventListener("click", startOnFirstTap);

  // Manual toggle button, always available afterwards.
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      setPlayingState(true);
    } else {
      audio.pause();
      setPlayingState(false);
    }
    if (prompt) prompt.classList.remove("visible");
  });
}
