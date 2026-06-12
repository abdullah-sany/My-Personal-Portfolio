export const smoothScrollTo = (
  elementId: string,
  event?: React.MouseEvent,
  onComplete?: () => void,
) => {
  if (event) {
    event.preventDefault();
  }
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });

    // Add temporary highlight effect
    const originalBg = element.style.backgroundColor;
    element.style.transition = "background-color 0.8s ease";
    element.style.backgroundColor = "rgba(0, 122, 255, 0.08)";

    setTimeout(() => {
      element.style.backgroundColor = originalBg;
      setTimeout(() => {
        element.style.transition = "";
      }, 800);

      if (onComplete) {
        onComplete();
      }
    }, 1000); // Approximate scroll complete time
  }
};
