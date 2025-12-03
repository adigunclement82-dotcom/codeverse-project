// Menu overlay auto-open on page load
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("menuOverlay").classList.add("show");
    }, 100);
});

// Close button
document.getElementById("closeMenu").addEventListener("click", () => {
    const overlay = document.getElementById("menuOverlay");
    overlay.classList.remove("show");
    
    // Go back after 2.7 seconds (matches animation time)
    setTimeout(() => {
        window.history.back();
    }, 2700);
});

// Close on link click - navigate immediately
document.querySelectorAll(".main-menu a, .menu-left a").forEach(link => {
    link.addEventListener("click", function(e) {
        // Remove show class to trigger slide-up animation
        document.getElementById("menuOverlay").classList.remove("show");
    });
});
