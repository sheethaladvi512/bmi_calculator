var currentUnit = 'metric';

function switchUnit(u) {
  currentUnit = u;

  if (u === 'metric') {
    document.getElementById('btnM').className = 'tbtn on';
    document.getElementById('btnI').className = 'tbtn';
    document.getElementById('secMetric').style.display = 'block';
    document.getElementById('secImp').style.display = 'none';
  } else {
    document.getElementById('btnI').className = 'tbtn on';
    document.getElementById('btnM').className = 'tbtn';
    document.getElementById('secImp').style.display = 'block';
    document.getElementById('secMetric').style.display = 'none';
  }

  document.getElementById('resultBox').style.display = 'none';
  clearErrors();
}

function calcBMI() {
  clearErrors();
  var bmi = 0;
  var valid = true;

  if (currentUnit === 'metric') {
    var hVal = document.getElementById('hcm').value.trim();
    var wVal = document.getElementById('wkg').value.trim();

    if (!hVal || parseFloat(hVal) <= 0) {
      document.getElementById('wHcm').classList.add('err');
      valid = false;
    }
    if (!wVal || parseFloat(wVal) <= 0) {
      document.getElementById('wWkg').classList.add('err');
      valid = false;
    }
    if (!valid) return;

    var hm = parseFloat(hVal) / 100;
    bmi = parseFloat(wVal) / (hm * hm);

  } else {
    var ftVal  = document.getElementById('hft').value.trim();
    var inVal  = document.getElementById('hin').value.trim();
    var lbsVal = document.getElementById('lbs').value.trim();
    var totalIn = (parseFloat(ftVal) || 0) * 12 + (parseFloat(inVal) || 0);

    if (totalIn <= 0) {
      document.getElementById('wHft').classList.add('err');
      document.getElementById('wHin').classList.add('err');
      valid = false;
    }
    if (!lbsVal || parseFloat(lbsVal) <= 0) {
      document.getElementById('wLbs').classList.add('err');
      valid = false;
    }
    if (!valid) return;

    bmi = (parseFloat(lbsVal) / (totalIn * totalIn)) * 703;
  }

  displayResult(bmi);
}

function displayResult(bmi) {
  var cat, advice, color;

  if (bmi < 18.5) {
    cat    = 'Underweight';
    color  = '#60a5fa';
    advice = 'Your BMI is below the healthy range. Consider speaking with a healthcare provider about nutrition and healthy weight gain.';
  } else if (bmi < 25) {
    cat    = 'Normal weight';
    color  = '#4ade80';
    advice = "You're in the healthy BMI range. Keep maintaining balanced meals, regular activity, and good sleep.";
  } else if (bmi < 30) {
    cat    = 'Overweight';
    color  = '#facc15';
    advice = 'Your BMI is slightly above the healthy range. Small, consistent changes to diet and activity can make a real difference.';
  } else {
    cat    = 'Obese';
    color  = '#f87171';
    advice = 'Your BMI indicates obesity. A healthcare professional can help you build a safe, personalised plan.';
  }

  document.getElementById('bmiNum').textContent  = bmi.toFixed(1);
  document.getElementById('bmiNum').style.color  = color;
  document.getElementById('bmiCat').textContent  = cat;
  document.getElementById('adviceBox').textContent = advice;
  document.getElementById('adviceBox').style.borderLeftColor = color;

  var pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 2), 98);
  document.getElementById('needle').style.left = pct + '%';
  document.getElementById('needle').style.boxShadow =
    '0 0 0 3px #13162a, 0 0 0 5px ' + color;

  document.getElementById('resultBox').style.display = 'block';
}

function resetCalc() {
  document.getElementById('hcm').value = '';
  document.getElementById('wkg').value = '';
  document.getElementById('hft').value = '';
  document.getElementById('hin').value = '';
  document.getElementById('lbs').value = '';
  document.getElementById('resultBox').style.display = 'none';
  clearErrors();
}

function clearErrors() {
  ['wHcm', 'wWkg', 'wHft', 'wHin', 'wLbs'].forEach(function(id) {
    document.getElementById(id).classList.remove('err');
  });
}