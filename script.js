document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. BULLETPROOF LOADER DISMISSAL
  // =========================================
  const loader = document.getElementById("loader");

  const hideLoader = () => {
    if (loader && !loader.classList.contains("hidden")) {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }
  };

  // 1. Try hiding when full page loads
  window.addEventListener("load", hideLoader);

  // 2. HARD SAFETY NET: Force hide after 1.2s regardless of external files/audio status
  setTimeout(hideLoader, 1200);


  // =========================================
  // 2. DAY / NIGHT THEME TOGGLE
  // =========================================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("night-theme")) {
        body.classList.remove("night-theme");
        body.classList.add("day-theme");
        themeToggle.textContent = "☀️";
      } else {
        body.classList.remove("day-theme");
        body.classList.add("night-theme");
        themeToggle.textContent = "🌙";
      }
    });
  }

  // =========================================
  // 3. AMBIENT PARTICLES CANVAS (Petals & Sparkles)
  // =========================================
  const canvas = document.getElementById("ambientCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.3,
      isPetal: Math.random() > 0.5
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        if (p.isPetal) {
          ctx.fillStyle = `rgba(244, 182, 194, ${p.opacity})`;
          ctx.ellipse(p.x, p.y, p.size * 1.5, p.size, Math.PI / 4, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // =========================================
  // 4. AUDIO & MUSIC CONTROLS
  // =========================================
  const bgAudio = document.getElementById("bgAudio");
  const musicToggle = document.getElementById("musicToggle");
  const musicPrompt = document.getElementById("musicPrompt");

  if (bgAudio && musicToggle && musicPrompt) {
    let hasInteracted = false;
    musicPrompt.classList.add("visible");

    const startAudio = () => {
      bgAudio.play().then(() => {
        musicToggle.classList.add("playing");
      }).catch(err => console.log("Audio autoplay prevented by browser:", err));
      
      musicPrompt.classList.remove("visible");
      hasInteracted = true;
    };

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        startAudio();
        document.removeEventListener("click", handleFirstInteraction);
      }
    };
    document.addEventListener("click", handleFirstInteraction);

    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bgAudio.paused) {
        startAudio();
      } else {
        bgAudio.pause();
        musicToggle.classList.remove("playing");
        musicPrompt.classList.remove("visible");
      }
    });
  }

  // =========================================
  // 5. EMERGENCY MODAL
  // =========================================
  const emergencyBtn = document.getElementById("emergencyBtn");
  const emergencyModal = document.getElementById("emergencyModal");
  const emergencyClose = document.getElementById("emergencyClose");

  if (emergencyBtn && emergencyModal && emergencyClose) {
    emergencyBtn.addEventListener("click", () => emergencyModal.classList.add("active"));
    emergencyClose.addEventListener("click", () => emergencyModal.classList.remove("active"));
    emergencyModal.addEventListener("click", (e) => {
      if (e.target === emergencyModal) emergencyModal.classList.remove("active");
    });
  }

  // =========================================
  // 6. CHAPTER 2 — LETTERS MODAL
  // =========================================
  const noteModal = document.getElementById("noteModal");
  const noteModalText = document.getElementById("noteModalText");
  const noteModalClose = document.getElementById("noteModalClose");
  const envelopes = document.querySelectorAll(".envelope");

  if (noteModal && noteModalText && noteModalClose) {
    envelopes.forEach((envelope) => {
      envelope.addEventListener("click", () => {
        const message = envelope.getAttribute("data-message");
        if (message) {
          noteModalText.textContent = message;
          noteModal.classList.add("active");
        }
      });
    });

    noteModalClose.addEventListener("click", () => noteModal.classList.remove("active"));
    noteModal.addEventListener("click", (e) => {
      if (e.target === noteModal) noteModal.classList.remove("active");
    });
  }

  // =========================================
  // 7. CHAPTER 3 — SMILE JAR
  // =========================================
  const smileJar = document.getElementById("smileJar");
  const smileJarOutput = document.getElementById("smileJarOutput");

  const smileMessages = [
    "You have a laugh that brightens up an entire room.",
    "Remember that time we couldn't stop laughing over nothing?",
    "You are so much stronger than you give yourself credit for.",
    "Somewhere, someone is smiling right now just because they met you.",
    "Be extra gentle with yourself today.",
    "Your kindness is a superpower, don't forget it.",
    "Sending you a big warm hug right now! 🤗",
    "You're allowed to just take a break and breathe.",
    "Everything is going to turn out okay. Promise."
  ];

  if (smileJar && smileJarOutput) {
    smileJar.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * smileMessages.length);
      smileJar.style.transform = "scale(0.85)";
      setTimeout(() => {
        smileJar.style.transform = "scale(1)";
        smileJarOutput.textContent = smileMessages[randomIndex];
      }, 150);
    });
  }

  // =========================================
  // 8. CHAPTER 3 — GUIDED BREATHING
  // =========================================
  const breatheCircle = document.getElementById("breatheCircle");
  const breatheText = document.getElementById("breatheText");
  let breathingInterval = null;
  let isBreathing = false;

  if (breatheCircle && breatheText) {
    breatheCircle.addEventListener("click", () => {
      if (isBreathing) {
        clearInterval(breathingInterval);
        isBreathing = false;
        breatheCircle.classList.remove("expanding", "contracting");
        breatheText.textContent = "breathe";
        return;
      }

      isBreathing = true;
      let cycle = 0;

      const runBreathingCycle = () => {
        if (cycle === 0) {
          breatheText.textContent = "in...";
          breatheCircle.classList.add("expanding");
          breatheCircle.classList.remove("contracting");
        } else if (cycle === 1) {
          breatheText.textContent = "hold...";
        } else if (cycle === 2) {
          breatheText.textContent = "out...";
          breatheCircle.classList.remove("expanding");
          breatheCircle.classList.add("contracting");
        } else if (cycle === 3) {
          breatheText.textContent = "hold...";
        }
        cycle = (cycle + 1) % 4;
      };

      runBreathingCycle();
      breathingInterval = setInterval(runBreathingCycle, 4000);
    });
  }

  // =========================================
  // 9. CHAPTER 3 — "WRITE IT, DON'T SEND IT" JOURNAL
  // =========================================
  const journalInput = document.getElementById("journalInput");
  const journalSaveBtn = document.getElementById("journalSaveBtn");
  const journalDeleteBtn = document.getElementById("journalDeleteBtn");
  const journalStatus = document.getElementById("journalStatus");

  if (journalInput && journalSaveBtn && journalDeleteBtn && journalStatus) {
    const savedEntry = localStorage.getItem("aditi_journal_entry");
    if (savedEntry) {
      journalInput.value = savedEntry;
      journalStatus.textContent = "loaded your previously saved note 💭";
    }

    journalSaveBtn.addEventListener("click", () => {
      const text = journalInput.value.trim();
      if (text) {
        localStorage.setItem("aditi_journal_entry", text);
        journalStatus.textContent = "saved safely in your browser ✨";
      } else {
        journalStatus.textContent = "nothing written to save yet!";
      }
    });

    journalDeleteBtn.addEventListener("click", () => {
      journalInput.value = "";
      localStorage.removeItem("aditi_journal_entry");
      journalStatus.textContent = "cleared! let it all go 🌸";
    });
  }

  // =========================================
  // 10. CHAPTER 3 — POPULATE 100 TINY NOTES
  // =========================================
  const meadowContainer = document.getElementById("meadowNotes");
  const tinyNotes = [
    "you matter", "take a breath", "proud of you", "one step at a time",
    "you are loved", "soft hearts win", "drink water", "let it go",
    "you are worthy", "unwind today", "it's okay to feel", "keep going",
    "bright future ahead", "you are safe", "be kind to yourself", "rest up",
    "trust the timing", "give it time", "shine bright", "you are enough"
  ];

  if (meadowContainer) {
    for (let i = 0; i < 100; i++) {
      const noteSpan = document.createElement("span");
      noteSpan.className = "kindness-note";
      noteSpan.textContent = tinyNotes[i % tinyNotes.length];
      meadowContainer.appendChild(noteSpan);
    }
  }

  // =========================================
  // 11. CHAPTER 5 — INTERACTIVE NIGHT SKY STARS
  // =========================================
  const starContainer = document.getElementById("starContainer");
  const starWords = [
    "resilient", "loved", "bright", "worthy", "gentle",
    "strong", "peaceful", "unbreakable", "hopeful", "beautiful"
  ];

  if (starContainer) {
    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div");
      star.className = "interactive-star";
      star.innerHTML = "✨";

      star.style.top = `${Math.random() * 85 + 5}%`;
      star.style.left = `${Math.random() * 90 + 5}%`;

      const wordSpan = document.createElement("span");
      wordSpan.className = "star-word";
      wordSpan.textContent = starWords[i % starWords.length];
      star.appendChild(wordSpan);

      starContainer.appendChild(star);
    }
  }

  // =========================================
  // 12. WATER REMINDER TOAST
  // =========================================
  const waterToast = document.getElementById("waterToast");
  const waterToastClose = document.getElementById("waterToastClose");

  if (waterToast && waterToastClose) {
    setTimeout(() => { waterToast.classList.add("show"); }, 10000);
    waterToastClose.addEventListener("click", () => { waterToast.classList.remove("show"); });
  }

  // =========================================
  // 13. SCROLL REVEAL ANIMATIONS
  // =========================================
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  reveals.forEach((element) => revealOnScroll.observe(element));
});
const PASSWORD = "Noor se bhara tara";

const unlockButton = document.getElementById("unlockButton");

const passwordInput = document.getElementById("passwordInput");

const lockScreen = document.getElementById("lockScreen");

const wrongPassword = document.getElementById("wrongPassword");

unlockButton.onclick = () => {

    if(passwordInput.value===PASSWORD){

        lockScreen.classList.add("lock-hidden");

    }

    else{

        wrongPassword.textContent =
        "Hmm... I don't think this letter belongs to you. 🤍";

        document
        .querySelector(".lock-card")
        .classList.add("shake");

        setTimeout(()=>{

            document
            .querySelector(".lock-card")
            .classList.remove("shake");

        },350);

    }

};

passwordInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        unlockButton.click();

    }

});
