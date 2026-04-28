let translations = {};

async function loadLanguage(lang) {
  console.log(`Loading language: ${lang}`);

  localStorage.setItem("lang", lang);

  const response = await fetch(`./Taal/${lang}.json`);
  translations = await response.json();

  let age = "";
  try {
    const ageResponse = await fetch("https://webserver.yourimuldergamedev.nl/Age.php");
    age = await ageResponse.text();
  } catch (err) {
    console.error("Kon leeftijd niet ophalen:", err);
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    let text = translations[key] || key;

    text = text.replace("{age}", age);

    el.innerHTML = text;
  });
}
const savedLang = localStorage.getItem("lang") || "nl";

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(savedLang);
  });
} else {
  loadLanguage(savedLang);
}