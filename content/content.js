// Keywords that usually indicate checkout pages
const checkoutKeywords = [
  "checkout",
  "cart",
  "payment",
  "bag",
  "basket"
];

const currentURL = window.location.href.toLowerCase();

// Only continue if the URL looks like a checkout page
const isCheckoutPage = checkoutKeywords.some(keyword =>
  currentURL.includes(keyword)
);

if (isCheckoutPage) {
  fetch(chrome.runtime.getURL("content/panel.html"))
    .then(response => response.text())
    .then(html => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);

      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("content/panel.js");
      document.body.appendChild(script);
    });
}