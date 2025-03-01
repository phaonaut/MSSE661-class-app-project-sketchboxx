"use strict"

const doSaveSketch = (event) => {
    const fileName = document.getElementById("file-name").value;
    const sketch = document.getElementById('defaultCanvas0').toDataURL();
    postSketch({name: fileName, sketch: JSON.stringify(sketch)})
    .then((response) => {
        //close modal
        const modal = document.getElementById("modal-js-save");
        modal.classList.remove('is-active'); 
        // a toast message
        showSuccessToast('Successfully saved sketch!');
    }).catch((error) => {
        showErrorToast(error.message)
    });

};


const doGetSketches = (event) => {
    // event.preventDefault();
    return getSketches()
    .catch((error) => {
        showErrorToast(error.message)
    });

};