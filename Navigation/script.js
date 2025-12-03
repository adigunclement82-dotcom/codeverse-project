// ----- Countdown logic -----
// Set your target date/time here (change as needed).
// Example: 60 days from now; you can replace with a fixed date string if you prefer.
(function () {
  // If you want a specific date instead, replace this with:
  // const target = new Date('2026-01-01T00:00:00');
  const now = new Date();
  const future = new Date(now.getTime() + (60 * 24 * 60 * 60 * 1000)); // 60 days from now
  const target = future;

  const monthsEl = document.getElementById('months');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const t = new Date(target) - new Date();
    if (t <= 0) {
      monthsEl.textContent = '00';
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    // compute months roughly (approximate by months difference)
    const now = new Date();
    let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    // if the day of month hasn't been reached yet, subtract 1
    if (target.getDate() < now.getDate()) months = Math.max(0, months - 1);

    const monthsMs = months * 30 * 24 * 60 * 60 * 1000; // rough month ms for display
    let remainder = t - monthsMs;

    // ensure non-negative
    if (remainder < 0) remainder = t;

    const days = Math.floor(remainder / (24 * 60 * 60 * 1000));
    remainder -= days * 24 * 60 * 60 * 1000;

    const hours = Math.floor(remainder / (60 * 60 * 1000));
    remainder -= hours * 60 * 60 * 1000;

    const minutes = Math.floor(remainder / (60 * 1000));
    remainder -= minutes * 60 * 1000;

    const seconds = Math.floor(remainder / 1000);

    monthsEl.textContent = String(months).padStart(2, '0');
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // first call
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  // ----- Accessibility: hamburger toggling (no panel here, placeholder) -----
  const ham = document.querySelector('.hamburger');
  ham.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    // placeholder: you can add panel open logic here
  });
})();
