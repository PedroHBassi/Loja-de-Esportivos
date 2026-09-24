const sizeOptions = document.querySelectorAll(".size-option");
sizeOptions.forEach(button => {
    button.addEventListener("click", () => {
        sizeOptions.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});
const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach(button => {
    button.addEventListener("click", () => {
        colorOptions.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});