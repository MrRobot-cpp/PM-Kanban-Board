document.addEventListener("DOMContentLoaded", function () {
    // Status Chart (Doughnut)
    var ctx1 = document.getElementById('statusChart').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ["To Do", "In Progress", "Done"],
            datasets: [{
                label: "Status Overview",  // Added label to fix "undefined"
                data: [10, 4, 15],
                backgroundColor: ["#ff6384", "#ff9f40", "#4bc0c0"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5  // Increase to make the chart shorter, decrease to make it taller
        }
        
        
    });

    // Priority Breakdown Chart (Bar)
    var ctx2 = document.getElementById('priorityChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ["Highest", "High", "Medium", "Low", "Lowest"],
            datasets: [{
                label: "Priority Levels",  // Added label to fix "undefined"
                data: [2, 5, 12, 3, 1],
                backgroundColor: ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5  // Increase to make the chart shorter, decrease to make it taller
        }
        
        
    });

    // Types of Work Chart (Horizontal Bar)
    var ctx3 = document.getElementById('workChart').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',  // "horizontalBar" is outdated, replaced with "bar"
        data: {
            labels: ["Task", "Epic", "Story", "Bug", "Subtask"],
            datasets: [{
                label: "Types of Work",  // Added label for clarity
                data: [57, 36, 10, 5, 2],
                backgroundColor: ["#36a2eb", "#ff6384", "#ff9f40", "#4bc0c0", "#9966ff"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3.5  // Increase to make the chart shorter, decrease to make it taller
        }
        
    });
});
