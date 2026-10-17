import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const files = await Promise.all(['index.html', 'styles.css', 'script.js'].map(async (name) => [name, await readFile(new URL('../' + name, import.meta.url), 'utf8')]));
const source = Object.fromEntries(files);

assert.match(source['index.html'], />JaimeVGA</, 'logo debe mostrar JaimeVGA');
assert.doesNotMatch(source['index.html'], />JF<span>CV</, 'no debe quedar el logo anterior');
for (const id of ['inicio', 'educacion', 'habilidades', 'proyectos', 'certificaciones', 'contacto']) {
  assert.match(source['index.html'], new RegExp('href=\"#' + id + '\"'), 'falta enlace a #' + id);
  assert.match(source['index.html'], new RegExp('id=\"' + id + '\"'), 'falta sección #' + id);
}
assert.match(source['index.html'], /sound-toggle/, 'debe existir control de sonido');
assert.match(source['index.html'], /profile-frame[^>]*tabindex="0"/, 'el marco de perfil debe poder recibir foco');
assert.match(source['index.html'], /src="img\/Perfil\.jpeg"/, 'debe usar la foto proporcionada');
assert.match(source['index.html'], /cortesvegajaimefabian@gmail\.com/, 'debe mostrar el correo proporcionado');
assert.match(source['index.html'], /href="https:\/\/github\.com\/JaimeVGA"/, 'debe enlazar GitHub');
assert.match(source['index.html'], /href="https:\/\/www\.instagram\.com\/jaime_vga_\/"/, 'debe enlazar Instagram');
assert.match(source['index.html'], /href="https:\/\/www\.linkedin\.com\/in\/jaimevga"/, 'debe enlazar LinkedIn');
assert.match(source['styles.css'], /@keyframes pixel-drift/, 'debe existir animación de fondo');
assert.match(source['styles.css'], /isolation:\s*isolate/, 'el fondo debe tener un contexto de apilamiento visible');
assert.match(source['styles.css'], /animation:\s*grid-drift/, 'la rejilla debe moverse');
assert.match(source['index.html'], /class="animated-background"/, 'debe existir una capa real de fondo animado');
assert.match(source['styles.css'], /\.animated-background\s*\{/, 'la capa real debe tener estilos');
assert.match(source['styles.css'], /transform:\s*translate3d/, 'el fondo debe moverse mediante transform');
assert.match(source['styles.css'], /profile-frame:hover/, 'debe existir hover de perfil');
assert.match(source['styles.css'], /section-heading:hover/, 'debe existir hover de títulos');
assert.match(source['styles.css'], /prefers-reduced-motion/, 'debe respetar reducción de movimiento');
assert.match(source['script.js'], /getBoundingClientRect/, 'debe calcular sección activa por posición');
assert.match(source['script.js'], /AudioContext|webkitAudioContext/, 'debe implementar sonido opcional');
assert.match(source['script.js'], /syncMenuState/, 'debe sincronizar el menú al cambiar de viewport');
assert.match(source['script.js'], /let soundEnabled = true/, 'el sonido debe iniciar activado');
assert.match(source['index.html'], /aria-pressed="true"/, 'el control debe iniciar activado');
assert.match(source['index.html'], /Sonido: ON/, 'el control debe mostrar sonido activado');
console.log('portfolio structure tests passed');
