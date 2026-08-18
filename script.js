// 1. Three.js Particle Neural Network Visualizer
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particleCount = 120;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.05,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.0015;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2. Interactive Hyperparameter Simulator Logic
const lrInput = document.getElementById('param-lr');
const treesInput = document.getElementById('param-trees');
const depthInput = document.getElementById('param-depth');

const lrVal = document.getElementById('lr-val');
const treesVal = document.getElementById('trees-val');
const depthVal = document.getElementById('depth-val');

lrInput.addEventListener('input', (e) => lrVal.innerText = e.target.value);
treesInput.addEventListener('input', (e) => treesVal.innerText = e.target.value);
depthInput.addEventListener('input', (e) => depthVal.innerText = e.target.value);

document.getElementById('run-simulation').addEventListener('click', () => {
    const log = document.getElementById('sim-log');
    const lr = parseFloat(lrInput.value);
    const trees = parseInt(treesInput.value);
    const depth = parseInt(depthInput.value);

    log.innerHTML = `<p class="prompt">&gt; Initializing XGBoost Run [lr=${lr}, n_est=${trees}, depth=${depth}]...</p>`;

    let step = 0;
    let loss = 0.85;
    
    const interval = setInterval(() => {
        step += Math.ceil(trees / 5);
        loss = Math.max(0.02, loss - (lr * 0.4)).toFixed(4);
        
        const line = document.createElement('p');
        line.innerHTML = `<span style="color:#27c93f;">[Epoch ${step}/${trees}]</span> Train-logloss: ${loss} | Eval-ROC-AUC: ${(1 - loss * 0.8).toFixed(4)}`;
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;

        if (step >= trees) {
            clearInterval(interval);
            const done = document.createElement('p');
            done.innerHTML = `<span style="color:#00f0ff;">✔ Convergence reached. Final Log Loss: ${loss}</span>`;
            log.appendChild(done);
            log.scrollTop = log.scrollHeight;
        }
    }, 200);
});

// 3. Interactive RFM Segment Explorer Logic
const rfmData = {
    champions: {
        title: "Champions (Highest Recency, Frequency & Monetary Value)",
        desc: "Bought recently, buy often, and spend the most.",
        action: "Action: Reward loyalty, recommend early access products, trigger personalized VIP marketing."
    },
    loyal: {
        title: "Loyal Customers (High Frequency & Monetary)",
        desc: "Buy regularly and respond well to promotions.",
        action: "Action: Upsell higher-value items and engage through targeted loyalty incentives."
    },
    atrisk: {
        title: "At-Risk Customers (Low Recency, High Past Frequency)",
        desc: "Spent good money and bought frequently, but haven't returned recently.",
        action: "Action: Send re-engagement churn-prevention email workflows and win-back offers."
    },
    lost: {
        title: "Lost Customers (Lowest Recency & Frequency)",
        desc: "Lowest purchase activity over long periods.",
        action: "Action: Run low-cost automated win-back campaigns or deprioritize expensive ad spending."
    }
};

const display = document.getElementById('rfm-display');

function updateRFM(segmentKey) {
    const data = rfmData[segmentKey];
    display.innerHTML = `
        <h4 style="color:#00f0ff; margin-bottom:0.5rem;">${data.title}</h4>
        <p style="color:#94a3b8; margin-bottom:0.8rem;">${data.desc}</p>
        <p style="color:#ff0055; font-weight:600;">${data.action}</p>
    `;
}

// Initial render
updateRFM('champions');

document.querySelectorAll('.rfm-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.rfm-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        updateRFM(e.target.getAttribute('data-segment'));
    });
});
