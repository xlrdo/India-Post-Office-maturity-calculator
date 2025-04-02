// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Format number as currency
function formatCurrency(number) {
    return '₹' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Calculate RD (Recurring Deposit)
function calculateRD() {
    const monthlyAmount = parseFloat(document.getElementById('rd-amount').value);
    const years = parseInt(document.getElementById('rd-term').value);
    
    if (isNaN(monthlyAmount) || monthlyAmount <= 0) {
        alert('Please enter a valid deposit amount');
        return;
    }
    
    // RD interest rate: 7.1%
    const ratePerQuarter = 7.1 / 4 / 100;
    const months = years * 12;
    
    let total = 0;
    for (let i = 0; i < months; i++) {
        let quartersPassed = Math.floor((months - i - 1) / 3);
        total += monthlyAmount * Math.pow(1 + ratePerQuarter, quartersPassed);
    }
    
    const totalDeposited = monthlyAmount * months;
    const interestEarned = total - totalDeposited;
    
    document.getElementById('rd-deposited').textContent = formatCurrency(totalDeposited);
    document.getElementById('rd-interest').textContent = formatCurrency(interestEarned);
    document.getElementById('rd-maturity').textContent = formatCurrency(total);
    document.getElementById('rd-results').style.display = 'block';
}

// Calculate FD (Fixed Deposit)
function calculateFD() {
    const principal = parseFloat(document.getElementById('fd-amount').value);
    const term = parseInt(document.getElementById('fd-term').value);
    
    if (isNaN(principal) || principal <= 0) {
        alert('Please enter a valid deposit amount');
        return;
    }
    
    // FD interest rates: 1-2yr: 6.9%, 3-5yr: 7.0%
    let rate;
    if (term <= 2) {
        rate = 6.9;
    } else {
        rate = 7.0;
    }
    
    const ratePerQuarter = rate / 4 / 100;
    const quarters = term * 4;
    
    const maturityAmount = principal * Math.pow(1 + ratePerQuarter, quarters);
    const interestEarned = maturityAmount - principal;
    
    document.getElementById('fd-principal').textContent = formatCurrency(principal);
    document.getElementById('fd-interest').textContent = formatCurrency(interestEarned);
    document.getElementById('fd-maturity').textContent = formatCurrency(maturityAmount);
    document.getElementById('fd-results').style.display = 'block';
}

// Calculate SCSS (Senior Citizen Savings Scheme)
function calculateSCSS() {
    const principal = parseFloat(document.getElementById('scss-amount').value);
    
    if (isNaN(principal) || principal <= 0 || principal > 1500000) {
        alert('Please enter a valid amount between ₹1,000 and ₹15,00,000');
        return;
    }
    
    // SCSS interest rate: 8.2%
    const annualRate = 8.2 / 100;
    const quarterlyInterest = principal * (annualRate / 4);
    const annualInterest = quarterlyInterest * 4;
    const totalInterest = annualInterest * 5; // 5 years
    
    document.getElementById('scss-principal').textContent = formatCurrency(principal);
    document.getElementById('scss-quarterly').textContent = formatCurrency(quarterlyInterest);
    document.getElementById('scss-annual').textContent = formatCurrency(annualInterest);
    document.getElementById('scss-total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('scss-results').style.display = 'block';
}

// Calculate PPF (Public Provident Fund)
function calculatePPF() {
    const annualInvestment = parseFloat(document.getElementById('ppf-amount').value);
    const years = parseInt(document.getElementById('ppf-term').value);
    
    if (isNaN(annualInvestment) || annualInvestment < 500 || annualInvestment > 150000) {
        alert('Please enter a valid amount between ₹500 and ₹1,50,000');
        return;
    }
    
    // PPF interest rate: 7.1%
    const rate = 7.1 / 100;
    let balance = 0;
    let totalInvestment = 0;
    
    for (let year = 1; year <= years; year++) {
        totalInvestment += annualInvestment;
        balance = (balance + annualInvestment) * (1 + rate);
    }
    
    const interestEarned = balance - totalInvestment;
    
    document.getElementById('ppf-invested').textContent = formatCurrency(totalInvestment);
    document.getElementById('ppf-interest').textContent = formatCurrency(interestEarned);
    document.getElementById('ppf-maturity').textContent = formatCurrency(balance);
    document.getElementById('ppf-results').style.display = 'block';
}

// Calculate KVP (Kisan Vikas Patra)
function calculateKVP() {
    const principal = parseFloat(document.getElementById('kvp-amount').value);
    
    if (isNaN(principal) || principal <= 0) {
        alert('Please enter a valid investment amount');
        return;
    }
    
    // KVP interest rate: 7.5%
    const rate = 7.5 / 100;
    
    // Calculate doubling period: ln(2)/ln(1+r)
    const doublingPeriod = Math.log(2) / Math.log(1 + rate);
    const years = Math.floor(doublingPeriod);
    const months = Math.round((doublingPeriod - years) * 12);
    
    const maturityAmount = principal * 2; // Double the amount
    
    document.getElementById('kvp-principal').textContent = formatCurrency(principal);
    document.getElementById('kvp-doubling').textContent = `${years} years and ${months} months`;
    document.getElementById('kvp-maturity').textContent = formatCurrency(maturityAmount);
    document.getElementById('kvp-results').style.display = 'block';
}

// Calculate NSC (National Savings Certificate)
function calculateNSC() {
    const principal = parseFloat(document.getElementById('nsc-amount').value);
    
    if (isNaN(principal) || principal <= 0) {
        alert('Please enter a valid investment amount');
        return;
    }
    
    // NSC interest rate: 7.7%
    const rate = 7.7 / 100;
    const term = 5; // 5 years fixed
    
    const maturityAmount = principal * Math.pow(1 + rate, term);
    const interestEarned = maturityAmount - principal;
    
    document.getElementById('nsc-principal').textContent = formatCurrency(principal);
    document.getElementById('nsc-interest').textContent = formatCurrency(interestEarned);
    document.getElementById('nsc-maturity').textContent = formatCurrency(maturityAmount);
    document.getElementById('nsc-results').style.display = 'block';
}

// Calculate MIS (Monthly Income Scheme)
function calculateMIS() {
    const principal = parseFloat(document.getElementById('mis-amount').value);
    
    if (isNaN(principal) || principal <= 0 || principal > 900000) {
        alert('Please enter a valid amount between ₹1,000 and ₹9,00,000');
        return;
    }
    
    // MIS interest rate: 7.4%
    const annualRate = 7.4 / 100;
    const monthlyInterest = principal * (annualRate / 12);
    const annualInterest = monthlyInterest * 12;
    const totalInterest = annualInterest * 5; // 5 years
    
    document.getElementById('mis-principal').textContent = formatCurrency(principal);
    document.getElementById('mis-monthly').textContent = formatCurrency(monthlyInterest);
    document.getElementById('mis-annual').textContent = formatCurrency(annualInterest);
    document.getElementById('mis-total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('mis-results').style.display = 'block';
}