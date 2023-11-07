export const scrollTo = (elementId: string) => {
  const section = document.getElementById(elementId);

  section?.scrollIntoView({ behavior: "smooth" });
};
