window.turnstileCallback = function (token) {
  document.querySelector(
    'input[name="cf_turnstile_token"]'
  ).value = token;
};

