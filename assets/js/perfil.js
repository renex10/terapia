document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de progreso lineal
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    new Chart(progressCtx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Nivel de mejora',
                data: [40, 65, 75, 85],
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico circular de terapias
    const therapyCtx = document.getElementById('therapyChart').getContext('2d');
    new Chart(therapyCtx, {
        type: 'pie',
        data: {
            labels: ['Terapia de Lenguaje', 'Terapia Ocupacional', 'Terapia Conductual', 'Terapia Física'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
});