function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let allChars = '';
  if (useUpper) allChars += upper;
  if (useLower) allChars += lower;
  if (useNumbers) allChars += numbers;
  if (useSymbols) allChars += symbols;

  if (allChars.length === 0) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * allChars.length);
    password += allChars[rand];
  }
  return password;
}

function evaluateStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'Weak 🚨';
  if (score === 3 || score === 4) return 'Medium ⚠️';
  return 'Strong 💪';
}

document.getElementById('generate').addEventListener('click', () => {
  const length = parseInt(document.getElementById('length').value);
  const upper = document.getElementById('uppercase').checked;
  const lower = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  const password = generatePassword(length, upper, lower, numbers, symbols);
  document.getElementById('password').value = password;
  document.getElementById('strength-text').textContent = evaluateStrength(password);
});

document.getElementById('copy').addEventListener('click', () => {
  const passInput = document.getElementById('password');
  passInput.select();
  document.execCommand('copy');
  alert('Password copied! ✅');
});
