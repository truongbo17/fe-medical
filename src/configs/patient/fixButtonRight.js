export default function fixButtonRight() {
  if (
    Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    ) < 900
  ) {
    document
      .getElementsByClassName("right-area")[0]
      .setAttribute("hidden", true);
  } else {
    document.getElementsByClassName("right-area")[0].removeAttribute("hidden");
  }
}
