// Function to add or remove fade class to an element
export function fadeChange(querySelector, fadeInClass, add) {
  const target = document.querySelector(querySelector);
  add ? target.classList.add(fadeInClass) : target.classList.remove(fadeInClass)
}