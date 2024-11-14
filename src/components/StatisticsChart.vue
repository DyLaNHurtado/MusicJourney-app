<!-- src/components/StatisticsChart.vue -->
<template>
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Estadísticas de Práctica</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <canvas ref="weeklyChart"></canvas>
        </div>
        <div>
          <canvas ref="monthlyChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const weeklyChart = ref(null);
  const monthlyChart = ref(null);
  
  onMounted(() => {
    new Chart(weeklyChart.value, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Minutos de práctica',
          data: [30, 45, 60, 30, 45, 90, 120],
          backgroundColor: 'rgba(88, 204, 2, 0.6)',
          borderColor: 'rgba(88, 204, 2, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    new Chart(monthlyChart.value, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Canciones aprendidas',
          data: [2, 3, 1, 4],
          borderColor: 'rgba(255, 200, 0, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      }
    });
  });
  </script>