const display = document.querySelector('.display');
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

        function appendToDisplay(value) {
            display.value += value;
        }

        function appendOperation(func) {
            display.value += func + ')';
        }

        function clearDisplay() {
            display.value = '';
        }

        function backspace() {
            display.value = display.value.slice(0, -1);
        }

        function handlePercentage() {
            try {
                const parts = display.value.split(/([+\-*/])/);
                const lastNumber = parseFloat(parts[parts.length-1]);
                const percentage = lastNumber / 100;
                
                if (parts.length > 1) {
                    const operator = parts[parts.length-2];
                    const base = parseFloat(parts[parts.length-3]);
                    display.value = parts.slice(0, -3).join('') + (base * percentage);
                } else {
                    display.value = percentage;
                }
            } catch {
                display.value += '%';
            }
        }

        function calculate() {
            try {
                let expression = display.value;
                
                // Handle remaining percentages
                expression = expression.replace(/%/g, '*0.01');
                
                const result = math.evaluate(expression);
                
                if (typeof result === 'number') {
                    if (!isFinite(result)) throw 'Infinity Error';
                    display.value = parseFloat(result.toFixed(10)).toString();
                }
                
                history.unshift({ 
                    expression: display.value,
                    result: result 
                });
                localStorage.setItem('calcHistory', JSON.stringify(history.slice(0, 10)));
                updateHistory();
            } catch (error) {
                handleErrors(error);
            }
        }

        function handleErrors(error) {
            const errors = {
                'SyntaxError': 'Invalid syntax',
                'Infinity Error': 'Result too large',
                'ReferenceError': 'Undefined function',
                'default': 'Calculation error'
            };
            
            display.value = errors[error.name] || errors['default'];
            setTimeout(clearDisplay, 2000);
        }

        function updateHistory() {
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = history.slice(0, 10).map(item => 
                `<div class="history-item">
                    <div>${item.expression}</div>
                    <div style="color: #98fb98">= ${item.result}</div>
                </div>`
            ).join('');
        }

        function clearHistory() {
            history = [];
            localStorage.removeItem('calcHistory');
            updateHistory();
        }

        // Initialize history on load
        updateHistory();
    </script>
    <!-- Include math.js library for safe evaluations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.7.0/math.js">
