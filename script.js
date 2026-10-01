document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    
    // Tab definitions for dynamic header updates
    const pageMeta = {
        'overview': { title: 'Historical Overview', subtitle: 'Examining the dual perspectives of the 1872 Cavite Mutiny' },
        'split-view': { title: 'Split Comparison', subtitle: 'Side-by-side analysis of Spanish and Filipino accounts' },
        'matrix': { title: 'Comparative Matrix', subtitle: 'Granular analytical parameter breakdown' },
        'simulator': { title: 'Source Divergence Analyzer', subtitle: 'Simulate historical narrative interpretation weights' }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to current selection
            item.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Update header text
            if (pageMeta[targetTab]) {
                pageTitle.textContent = pageMeta[targetTab].title;
                pageSubtitle.textContent = pageMeta[targetTab].subtitle;
            }
        });
    });

    let currentTheme = 'dark';
    toggleThemeBtn.addEventListener('click', () => {
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            currentTheme = 'light';
            toggleThemeBtn.textContent = 'Dark Mode';
        } else {
            document.documentElement.removeAttribute('data-theme');
            currentTheme = 'dark';
            toggleThemeBtn.textContent = 'Toggle Theme';
        }
    });

    const matrixRows = document.querySelectorAll('#matrix-body tr');
    const detailBox = document.getElementById('matrix-detail-box');

    matrixRows.forEach(row => {
        row.addEventListener('click', () => {
            const detailText = row.getAttribute('data-detail');
            detailBox.innerHTML = `<strong>Inspector Inspection Log:</strong> ${detailText}`;
            
            // Highlight selected row
            matrixRows.forEach(r => r.style.backgroundColor = '');
            row.style.backgroundColor = currentTheme === 'dark' ? '#334155' : '#e2e8f0';
        });
    });

    const lensSlider = document.getElementById('lens-slider');
    const simOutput = document.getElementById('sim-output');

    lensSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        let title = "";
        let desc = "";

        if (val < 30) {
            title = "Strict Colonial Lens (Spanish Official View)";
            desc = "Lenses aligned with Montero y Vidal and Izquierdo: The event is interpreted strictly as a seditious conspiracy engineered by secular native priests and radical elements aimed at overthrowing Spanish rule.";
        } else if (val > 70) {
            title = "Nationalist Reform Lens (Filipino View)";
            desc = "Lenses aligned with Pardo de Tavera: The uprising is framed as a localized, desperate workers' strike provoked by arbitrary labor and tribute decree revocations, manipulated by friars to eliminate reformist priests.";
        } else {
            title = "Balanced Critical Synthesis";
            desc = "A modern objective viewpoint: Recognizing both immediate socio-economic grievances among arsenal workers and the broader underlying political friction regarding secularization that Spanish authorities exploited.";
        }

        simOutput.innerHTML = `<h4>Current Analysis Mode: ${title}</h4><p>${desc}</p>`;
    });
});