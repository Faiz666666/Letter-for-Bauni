document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. LOADER DISMISSAL
  // =========================================
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    });

    // Fallback: Force hide loader after 2.5 seconds if window 'load' event hangs
    setTimeout(() => {
      if (loader && !loader.classList.contains("hidden")) {
        loader.classList.add("hidden");
        setTimeout(() => { loader.style.display = "none"; }, 600);
      }
    }, 2500);
  }

  // =========================================
  // 2. AUDIO & MUSIC PROMPT CONTROLS
  // =========================================
  const bgAudio = document.getElementById("bgAudio");
  const musicToggle = document.getElementById("musicToggle");
  const musicPrompt = document.getElementById("musicPrompt");

  if (bgAudio && musicToggle && musicPrompt) {
    let hasInteracted = false;

    // Show prompt on initial load
    musicPrompt.classList.add("visible");

    // Play music function
    const startAudio = () => {
      bgAudio.play().then(() => {
        musicToggle.classList.add("playing");
      }).catch(err => console.log("Audio play blocked:", err));
      
      musicPrompt.classList.remove("visible");
      hasInteracted = true;
    };

    // Global listener for first click/tap to trigger background audio
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        startAudio();
        document.removeEventListener("click", handleFirstInteraction);
      }
    };
    document.addEventListener("click", handleFirstInteraction);

    // Explicit music toggle button click
    musicToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering top-level document click twice
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
  // 3. EMERGENCY MODAL
  // =========================================
  const emergencyBtn = document.getElementById("emergencyBtn");
  const emergencyModal = document.getElementById("emergencyModal");
  const emergencyClose = document.getElementById("emergencyClose");

  if (emergencyBtn && emergencyModal && emergencyClose) {
    emergencyBtn.addEventListener("click", () => {
      emergencyModal.classList.add("active");
    });

    emergencyClose.addEventListener("click", () => {
      emergencyModal.classList.remove("active");
    });

    // Close on backdrop click
    emergencyModal.addEventListener("click", (e) => {
      if (e.target === emergencyModal) {
        emergencyModal.classList.remove("active");
      }
    });
  }

  // =========================================
  // 4. CHAPTER 2 — LETTERS MODAL
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

    noteModalClose.addEventListener("click", () => {
      noteModal.classList.remove("active");
    });

    noteModal.addEventListener("click", (e) => {
      if (e.target === noteModal) {
        noteModal.classList.remove("active");
      }
    });
  }

  // =========================================
  // 5. CHAPTER 3 — SMILE JAR
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
      
      // Gentle bounce animation on click
      smileJar.style.transform = "scale(0.85)";
      setTimeout(() => {
        smileJar.style.transform = "scale(1)";
        smileJarOutput.textContent = smileMessages[randomIndex];
      }, 150);
    });
  }

  // =========================================
  // 6. CHAPTER 3 — GUIDED BREATHING CIRCLE
  // =========================================
  const breatheCircle = document.getElementById("breatheCircle");
  const breatheText = document.getElementById("breatheText");
  let breathingInterval = null;
  let isBreathing = false;

  if (breatheCircle && breatheText) {
    breatheCircle.addEventListener("click", () => {
      if (isBreathing) {
        // Stop exercise
        clearInterval(breathingInterval);
        isBreathing = false;
        breatheCircle.classList.remove("expanding", "contracting");
        breatheText.textContent = "breathe";
        return;
      }

      isBreathing = true;
      let cycle = 0; // 0 = In, 1 = Hold, 2 = Out, 3 = Hold

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
      breathingInterval = setInterval(runBreathingCycle, 4000); // 4 seconds per step
    });
  }

  // =========================================
  // 7. CHAPTER 3 — POPULATE 100 TINY NOTES
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
    // Generate 100 notes by looping through the array items
    for (let i = 0; i < 100; i++) {
      const noteSpan = document.createElement("span");
      noteSpan.className = "kindness-note";
      noteSpan.textContent = tinyNotes[i % tinyNotes.length];
      meadowContainer.appendChild(noteSpan);
    }
  }

  // =========================================
  // 8. WATER REMINDER TOAST
  // =========================================
  const waterToast = document.getElementById("waterToast");
  const waterToastClose = document.getElementById("waterToastClose");

  if (waterToast && waterToastClose) {
    // Popup after 10 seconds on page
    setTimeout(() => {
      waterToast.classList.add("show");
    }, 10000);

    waterToastClose.addEventListener("click", () => {
      waterToast.classList.remove("show");
    });
  }

  // =========================================
  // 9. SCROLL REVEAL ANIMATIONS
  // =========================================
  const reveals = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  reveals.forEach((element) => {
    revealOnScroll.observe(element);
  });
});

