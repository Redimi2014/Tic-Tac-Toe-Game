// Obtén el input y el elemento de vista previa del color
const colorInput = document.getElementById('color1');
const colorPreview = document.getElementById('color1');

// Agrega un evento para detectar cambios en el input
colorInput.addEventListener('input', function () {
    // Obtiene el valor seleccionado en el input
    const selectedColor = colorInput.value;

    // Actualiza el fondo del elemento de vista previa con el color seleccionado
    colorPreview.style.backgroundColor = selectedColor;
});
