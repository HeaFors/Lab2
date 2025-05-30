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

  // Завантаження коментарів з API
  fetch("https://jsonplaceholder.typicode.com/posts/4/comments")
    .then(response => {
      console.log('API response status:', response.status); // Дебаг: статус відповіді
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched data:', data); // Дебаг: виводимо отримані дані
      const section = document.createElement("section");
      section.classList.add("comments-section");
      section.innerHTML = "<h3>Відгуки роботодавців</h3>";
      if (data.length > 0) {
        data.forEach(comment => {
          const commentCard = document.createElement("div");
          commentCard.classList.add("comment-card");
          commentCard.innerHTML = `
            <div class="comment-avatar"></div>
            <div class="comment-content">
              <span class="comment-name">${comment.name}</span>
              <p class="comment-body">${comment.body}</p>
            </div>
          `;
          section.appendChild(commentCard);
        });
      } else {
        console.log('No comments found in the API response');
      }
      // Вставляємо секцію коментарів перед футером
      document.body.insertBefore(section, footer);
      console.log('Section added before footer'); // Дебаг: підтвердження додавання
    })
    .catch(error => {
      console.error('Error fetching comments:', error); // Дебаг: виводимо помилки
    });

  // Показ модального вікна через 1 хвилину
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('modal').style.display = 'block';
    }, 60000);
  });

  // Закриття модального вікна
  document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
  });

  // Функція для визначення часу
  function isDayTime() {
    const now = new Date();
    const hours = now.getHours();
    console.log('Current hour:', hours, 'isDayTime:', hours >= 7 && hours < 21);
    return hours >= 7 && hours < 21; // Денна тема з 07:00 до 21:00
  }

  // Функція для оновлення теми
  function setTheme(isDark) {
    const body = document.body;
    const toggleCheckbox = document.querySelector('.toggle-checkbox');
    console.log('Setting theme to:', isDark ? 'dark' : 'light', 'body classes:', body.className);
    if (isDark) {
      body.classList.remove('light');
      body.classList.add('dark');
      toggleCheckbox.checked = true;
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      toggleCheckbox.checked = false;
      localStorage.setItem('theme', 'light');
    }
  }

  // Автоматичне встановлення теми при завантаженні
  document.addEventListener('DOMContentLoaded', function () {
    const toggleCheckbox = document.querySelector('.toggle-checkbox');
    const savedTheme = localStorage.getItem('theme');
    console.log('DOM loaded, savedTheme:', savedTheme, 'isDayTime:', isDayTime());
    if (savedTheme) {
      setTheme(savedTheme === 'dark');
    } else {
      setTheme(!isDayTime()); // Застосовує денну тему, якщо isDayTime() = true
    }
    toggleCheckbox.addEventListener('change', function () {
      setTheme(toggleCheckbox.checked);
    });
  });

  // Оновлення теми щогодини
  setInterval(() => {
    console.log('Checking theme at:', new Date().toLocaleTimeString(), 'isDayTime:', isDayTime());
    setTheme(!isDayTime());
  }, 3600000); // 1 година