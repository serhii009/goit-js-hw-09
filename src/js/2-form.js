const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// 1. Створюємо порожній об'єкт (структура за замовчуванням)
let formData = { email: "", message: "" };

// 2. ІНІЦІАЛІЗАЦІЯ: Читаємо сховище ТА заповнюємо поля ДО обробників
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    
    // Оновлюємо об'єкт formData актуальними даними
    formData = { ...formData, ...parsedData };
    
    // Заповнюємо поля форми фізично
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  } catch (error) {
    console.error("Помилка парсингу даних з localStorage:", error);
  }
}

// 3. ОБРОБНИКИ ПОДІЙ: Тепер, коли форма готова, додаємо логіку
form.addEventListener("input", onFormInput);
form.addEventListener("submit", onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    return alert("Будь ласка, заповніть усі поля!");
  }

  console.log("Фінальні дані:", formData);
  
  // Очищення
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: "", message: "" }; // Скидаємо об'єкт до початкового стану
}
