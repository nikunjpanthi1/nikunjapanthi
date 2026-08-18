// -------------------------------------------------------------
// 1. Three.js Particle Neural Network Visualizer
// -------------------------------------------------------------
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

// Animate particles
function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.0015;
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// -------------------------------------------------------------
// 2. Metric Counters Animation
// -------------------------------------------------------------
const counters = document.querySelectorAll('.counter');
let animated = false;

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight;
    const metricsPos = document.querySelector('.metrics-bar').offsetTop;

    if (scrollPos > metricsPos && !animated) {
        animated = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count).toLocaleString();
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    }
});
