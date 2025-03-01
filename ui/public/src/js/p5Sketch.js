// Global settings for drawing
let currentTool = "pen"; //[pen, brush, ...]
let currentColor = "#000000";
let currentStrokeWeight = 2;
let p5Canvas;
let backgroundColor = 220;

let sketch = function (p) {
    let isDrawing = false;
    let canvasWidth, canvasHeight;

    p.setup = function () {
        // Create canvas
        const container = document.getElementById('sketch-container');
        canvasWidth = container.offsetWidth;
        canvasHeight = container.offsetHeight;

        p5Canvas = p.createCanvas(canvasWidth, window.innerHeight - 200);
        p.background(backgroundColor);
    };

    p.draw = function () {
        if (isDrawing) {
            p.stroke(currentColor);
            p.strokeWeight(currentStrokeWeight);

            switch (currentTool) {
                case "pen":
                    p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
                    break;
                case "spray-can":
                    let density = currentStrokeWeight * 0.5;
                    p.push();
                    p.noStroke();
                    p.fill(currentColor);
                    for (let i = 0; i < density; i++) {
                        let offsetX = p.randomGaussian(0, currentStrokeWeight/3);
                        let offsetY = p.randomGaussian(0, currentStrokeWeight/3);
                        let size = p.random(1, 3);
                        p.ellipse(p.mouseX + offsetX, p.mouseY + offsetY, size, size);
                    }
                    p.pop();
                    break;
                case "fill":
                    backgroundColor = currentColor;
                    p.background(currentColor);
                    break;
                case "eraser":
                    p.noStroke();
                    p.fill(backgroundColor);
                    p.ellipse(p.mouseX, p.mouseY, currentStrokeWeight * 2, currentStrokeWeight * 2);
                    break;
            }
        }
    };

    p.mousePressed = function () {
        isDrawing = true;
    };

    p.mouseReleased = function () {
        isDrawing = false;
    };

    p.clearCanvas = function () {
        p.background(220);
    };

    p.downloadCanvas = function () {
        p.saveCanvas('drawing', 'png');
    };

    window.p5Instance = p;
};

new p5(sketch, 'sketch-container');

// Tool Bar
document.addEventListener('DOMContentLoaded', () => {
    const toggleItems = document.querySelectorAll('.toggle-item');

    toggleItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items in the same toggle group
            const groupName = item.getAttribute('data-toggle-group');
            document.querySelectorAll(`[data-toggle-group="${groupName}"]`).forEach(groupItem => {
                groupItem.classList.remove('is-active');
            });

            // Add active class to the clicked item
            item.classList.add('is-active');

            // Update current tool
            currentTool = item.getAttribute('data-tool');
        });
    });

    // Clear canvas functionality
    document.getElementById('clear-canvas').addEventListener('click', () => {
        if (window.p5Instance) {
            window.p5Instance.clearCanvas();
        }
    });

    // Download functionality
    document.getElementById('download').addEventListener('click', () => {
        if (window.p5Instance) {
            window.p5Instance.downloadCanvas();
        }
    });
});

// Handle window resize - Not working as expected
// window.addEventListener('resize', () => {
//     if (window.p5Instance) {
//         window.p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
//     }
// });

// Handle color picker
document.getElementById('colorPicker').addEventListener('input', function() {
    currentColor = this.value;
});

// Tool Slider Settings
document.addEventListener('DOMContentLoaded', () => {
    const sizeSlider = document.querySelector('input[data-tool="size"]');
    
    // Update currentStrokeWeight when slider value changes
    sizeSlider.addEventListener('input', function() {
        currentStrokeWeight = parseInt(this.value);
    });
    
    // Update slider state when tools change
    const toolButtons = document.querySelectorAll('.toggle-item[data-toggle-group="tools"]');
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTool = button.getAttribute('data-tool');
            if (selectedTool === "pen" || selectedTool === "spray-can" || selectedTool === "eraser") {
                sizeSlider.disabled = false;
            } else {
                sizeSlider.disabled = true;
            }
        });
    });
});
