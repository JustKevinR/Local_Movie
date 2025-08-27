const container = document.getElementById('services-container');
const starredToggle = document.getElementById('starredToggle');

let services = [
  {
    name: "Cineby",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Watch Parties"],
    web_logo: "https://www.cineby.app/logo.png",
    link: "https://www.cineby.app/"
  },
  {
    name: "Bitcine",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Watch Parties"],
    web_logo: "https://www.bitcine.app/logo.svg",
    link: "https://www.bitcine.app/"
  },
  {
    name: "Xprime",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Watch Parties"],
    web_logo: "https://xprime.tv/logo.webp",
    link: "https://xprime.tv/"
  },
  {
    name: "Flixer",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Watch Parties"],
    web_logo: "https://flixer.su/assets/images/logo.png",
    link: "https://flixer.su/"
  },
  {
    name: "SpencerDEVS",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Watch Parties"],
    web_logo: "https://watch.spencerdevs.xyz/images/spenflix-logo.png",
    link: "https://watch.spencerdevs.xyz/"
  },
   {
    name: "FlickyStream",
    star: false,
    features: ["Movies", "TV", "Anime"],
    web_logo: "https://i.postimg.cc/JnZQCVbC/New-Project-9.png",
    link: "https://flickystream.net/"
  },
   {
    name: "FilmCave",
    star: false,
    features: ["Movies", "TV", "Anime", "Auto-Next"],
    web_logo: "https://filmcave.net/uploads/filmcave.png",
    link: "https://filmcave.net/"
  },
   {
    name: "PopcornMovie",
    star: false,
    features: ["Movies", "TV", "Anime"],
    web_logo: "https://popcornmovies.org/static/img/logo-1723617006.png",
    link: "https://popcornmovies.org/"
  }
  ,
   {
    name: "Vidjoy",
    star: false,
    features: ["Movies", "TV", "Anime", "Auto-Next"],
    web_logo: "https://vidjoy.pro/_next/image?url=%2Fvidjoy_logo.png&w=1920&q=75",
    link: "https://vidjoy.pro/"
  },
   {
    name: "SmashyStream",
    star: false,
    features: ["Movies", "TV", "Anime"],
    web_logo: "https://smashystream.xyz/logo.png",
    link: "https://smashystream.xyz/"
  },
   {
    name: "Yflix",
    star: true,
    features: ["Movies", "TV", "Anime", "Auto-Next", "Single-Server"],
    web_logo: "https://yflix.to/assets/uploads/2f505f3de3c99889c1a72557f3e3714fc0c457b0.png",
    link: "https://yflix.to/"
  },
   {
    name: "Qstream",
    star: true,
    features: ["Movies", "TV", "Anime", "Single-Server"],
    web_logo: "https://qstream.pages.dev/img/logo.png",
    link: "https://qstream.pages.dev/"
  }
];

// Load saved stars from localStorage
const savedStars = JSON.parse(localStorage.getItem('starredServices') || '{}');
services.forEach(svc => {
  if (savedStars.hasOwnProperty(svc.name)) svc.star = savedStars[svc.name];
});

function renderServices(servicesList, onlyStarred=false) {
  container.innerHTML = '';

  // Sort: starred first
  let sorted = [...servicesList].sort((a,b) => b.star - a.star);
  if (onlyStarred) sorted = sorted.filter(s => s.star);

  sorted.forEach(service => {
    const card = document.createElement('a');
    card.className = 'service-card';
    card.href = service.link;
    card.target = '_blank';
    
    card.innerHTML = `
      <div class="card-header">
        <img src="${service.web_logo}" alt="${service.name} Logo">
      </div>
      <h2>${service.name}</h2>
      <p>${service.features.join(' | ')}</p>
      <span class="star-icon" data-name="${service.name}">${service.star ? '⭐' : '☆'}</span>
    `;
    
    container.appendChild(card);
  });

  // Add toggle star functionality
  document.querySelectorAll('.star-icon').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const name = el.dataset.name;
      const svc = services.find(s => s.name === name);
      svc.star = !svc.star;
      el.textContent = svc.star ? '⭐' : '☆';

      // Save updated star status to localStorage
      const starsToSave = {};
      services.forEach(s => starsToSave[s.name] = s.star);
      localStorage.setItem('starredServices', JSON.stringify(starsToSave));

      // Re-render to keep starred items at front
      renderServices(services, starredToggle.checked);
    });
  });
}

// Starred filter toggle
starredToggle.addEventListener('change', () => {
  renderServices(services, starredToggle.checked);
});

// Initial render
renderServices(services);
