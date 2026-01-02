// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const { firebaseConfig } = window;
// Attendi che l'autenticazione sia pronta
window.addEventListener('load', () => {
    if (window.authManager?.currentUser) {
        initFarm();
    }
});

function initFarm() {
    // Inizializzazione Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a20);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('container').appendChild(renderer.domElement);

    // Luci
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Terreno
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3d2b1f,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Piante (slot)
    const plants = [];
    const plantPositions = [
        [-3, 0, -2], [0, 0, -2], [3, 0, -2],
        [-3, 0, 1], [0, 0, 1], [3, 0, 1],
        [-3, 0, 4], [0, 0, 4], [3, 0, 4],
        [-3, 0, 7], [0, 0, 7], [3, 0, 7],
        [-3, 0, 10], [0, 0, 10], [3, 0, 10],
        [-3, 0, 13], [0, 0, 13], [3, 0, 13]
    ];

    // Configurazione colture
    const CROPS = {
        "piantina": { time: 30, reward: 0.1, color: 0x00FF00 },
        "patata": { time: 60, reward: 0.25, color: 0x8B4513 },
        "grano": { time: 90, reward: 0.5, color: 0xFFFF00 },
        "pannocchia": { time: 120, reward: 1.0, color: 0xDAA520 }
    };

    function createPlant(position, type) {
        const group = new THREE.Group();
        group.position.set(...position);
        
        // Stelo
        const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.y = 1;
        stem.castShadow = true;
        group.add(stem);
        
        // Frutto specifico
        let fruitGeometry, fruitMaterial;
        switch(type) {
            case "piantina":
                fruitGeometry = new THREE.SphereGeometry(0.2, 6, 4);
                fruitMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
                break;
            case "patata":
                fruitGeometry = new THREE.SphereGeometry(0.25, 8, 6);
                fruitMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
                break;
            case "grano":
                fruitGeometry = new THREE.ConeGeometry(0.3, 0.8, 6);
                fruitMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
                break;
            case "pannocchia":
                fruitGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.6, 8);
                fruitMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520 });
                break;
        }
        
        const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
        fruit.position.y = 2.2;
        fruit.castShadow = true;
        group.add(fruit);
        
        // Timer
        group.userData = { 
            growth: 0, 
            type, 
            ready: false,
            startTime: Date.now(),
            totalTime: CROPS[type].time * 1000
        };
        scene.add(group);
        plants.push(group);
        return group;
    }

    // Crea 3 slot iniziali
    for (let i = 0; i < 3; i++) {
        createPlant(plantPositions[i], 'piantina');
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Dati utente (caricati dall'autenticazione)
    let userData = {
        ton: 0,
        plots: 3,
        maxPlots: 12,
        premium: {
            expandedSlots: false,
            fastGrowth: false,
            bonusHarvest: false
        }
    };

    // Aggiorna UI
    function updateUI() {
        document.getElementById('ton').textContent = userData.ton.toFixed(2);
        const slotText = userData.premium.expandedSlots ? 
            `${userData.plots}/20` : `${userData.plots}/12`;
        document.getElementById('plots').textContent = slotText;
        
        const expandBtn = document.getElementById('expandBtn');
        if (userData.premium.expandedSlots) {
            expandBtn.textContent = '✅ Slot Espansi';
            expandBtn.disabled = true;
            expandBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        } else {
            expandBtn.textContent = 'Espandi (2 TON)';
            expandBtn.disabled = userData.ton < 2;
        }
    }

    // Piantare
    document.getElementById('plantBtn').addEventListener('click', () => {
        const maxSlots = userData.premium.expandedSlots ? 20 : 12;
        if (userData.plots >= maxSlots) {
            alert(`Hai raggiunto il limite di ${maxSlots} piante!`);
            return;
        }
        
        const cropType = document.querySelector('input[name="cropType"]:checked')?.value || 'piantina';
        createPlant(plantPositions[userData.plots], cropType);
        userData.plots++;
        updateUI();
    });

    // Raccogli
    document.getElementById('harvestBtn').addEventListener('click', () => {
        const maturePlants = plants.filter(p => p.userData.ready);
        if (maturePlants.length === 0) {
            alert('Nessuna pianta matura!');
            return;
        }
        
        const plant = maturePlants[0];
        let reward = CROPS[plant.userData.type].reward;
        
        // Bonus premium
        if (userData.premium.bonusHarvest) {
            reward *= 1.5;
        }
        
        userData.ton += reward;
        updateUI();
        
        // Rimuovi pianta
        scene.remove(plant);
        const index = plants.indexOf(plant);
        if (index > -1) plants.splice(index, 1);
        
        // Effetto raccolto
        document.body.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A, #4CAF50)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c)';
        }, 300);
    });

    // Espandi terreno
    document.getElementById('expandBtn').addEventListener('click', () => {
        if (userData.premium.expandedSlots) return;
        
        if (userData.ton < 2) {
            alert('Servono 2 TON per espandere! Fai una donazione per sbloccare.');
            return;
        }
        
        alert('Per espandere, invia 2 TON al mio indirizzo e conferma con il pulsante "Ho Inviato una Donazione"');
    });

    // Animazione principale
    function animate() {
        requestAnimationFrame(animate);
        
        // Aggiorna crescita
        plants.forEach(plant => {
            const elapsed = Date.now() - plant.userData.startTime;
            let totalTime = plant.userData.totalTime;
            
            // Velocità premium
            if (userData.premium.fastGrowth) {
                totalTime *= 0.5;
            }
            
            const progress = Math.min(elapsed / totalTime, 1);
            plant.userData.growth = progress;
            plant.scale.y = 0.1 + progress * 1.9;
            
            if (progress >= 1 && !plant.userData.ready) {
                plant.userData.ready = true;
                const fruit = plant.children[1];
                fruit.material.emissive.set(0x333300);
            }
        });
        
        // Aggiorna timer
        updatePlantTimers();
        
        controls.update();
        renderer.render(scene, camera);
    }

    // Timer visivi
    function updatePlantTimers() {
        const timerContainer = document.getElementById('plantTimers');
        timerContainer.innerHTML = '';
        
        plants.forEach((plant, index) => {
            if (!plant.userData.ready) {
                const elapsed = Date.now() - plant.userData.startTime;
                let totalTime = plant.userData.totalTime;
                if (userData.premium.fastGrowth) {
                    totalTime *= 0.5;
                }
                const remaining = Math.max(0, totalTime - elapsed);
                const seconds = Math.ceil(remaining / 1000);
                
                const timerDiv = document.createElement('div');
                timerDiv.className = 'plant-timer';
                timerDiv.textContent = `Pianta ${index + 1}: ${seconds}s`;
                timerContainer.appendChild(timerDiv);
            }
        });
    }

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Avvia
    document.getElementById('loading').style.display = 'none';
    updateUI();
    animate();
}
