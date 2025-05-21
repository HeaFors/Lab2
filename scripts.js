// Зберігаємо дані про браузер і ОС
localStorage.setItem("platform", navigator.platform);
localStorage.setItem("userAgent", navigator.userAgent);

// Виводимо у футері
const footer = document.querySelector("footer");
const platform = localStorage.getItem("platform");
const userAgent = localStorage.getItem("userAgent");

const info = document.createElement("p");
info.textContent = `Платформа: ${platform}, Браузер: ${userAgent}`;
footer.appendChild(info);


// Заміни 1 на свій номер варіанту в журналі
fetch("https://jsonplaceholder.typicode.com/posts/4/comments")
  .then(response => response.json())
  .then(data => {
    const section = document.createElement("section");
    section.innerHTML = "<h3>Відгуки роботодавців</h3>";
    data.forEach(comment => {
      const p = document.createElement("p");
      p.textContent = `${comment.name}: ${comment.body}`;
      section.appendChild(p);
    });
    document.body.appendChild(section);
  });


  // JavaScript: Показуємо модальне вікно через 1 хвилину
window.addEventListener('load', function() {
    // Показуємо модальне вікно через 60 секунд
    setTimeout(function() {
      document.getElementById('modal').style.display = 'block';
    }, 60000); // 60000 мс = 1 хвилина
  });

  // Відкрити через 60 секунд
setTimeout(() => {
  document.getElementById('modal').classList.remove('hidden');
}, 60000);

// Закрити вручну
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

// Синхронізація теми
function updateModalTheme(isDark) {
  const root = document.querySelector(':root');
  root.style.setProperty('--bg-color', isDark ? '#1e1e1e' : '#ffffff');
  root.style.setProperty('--text-color', isDark ? '#ffffff' : '#000000');
}

// Приклад: темна тема активна
updateModalTheme(true); // або false для світлої


document.addEventListener('DOMContentLoaded', function () {
  const toggleCheckbox = document.querySelector('.toggle-checkbox');

  // Check the current theme from localStorage (if previously set)
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleCheckbox.checked = true;
  } else {
    document.body.classList.add('light');
    toggleCheckbox.checked = false;
  }

  toggleCheckbox.addEventListener('change', function () {
    if (toggleCheckbox.checked) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save theme preference
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light'); // Save theme preference
    }
  });
});
  
document.addEventListener('DOMContentLoaded', function () {
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
