"use strict"

// Modal Functions
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      console.log("target", $target)
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });


  // Login / Logout Button
  const isAuth = getStorage('isAuth');
  if (isAuth) {
    const logoutButton = document.createElement('a');
    logoutButton.className = 'button is-primary navbar-item';
    logoutButton.textContent = 'Logout';
    logoutButton.setAttribute('onclick', 'doLogout(event)');
    document.getElementById('login/logout').appendChild(logoutButton);
  } else {
    const loginButton = document.createElement('a');
    loginButton.className = 'button is-primary navbar-item js-modal-trigger';
    loginButton.dataset.target = 'modal-js-signin';
    loginButton.textContent = 'Sign In';

    const signupButton = document.createElement('a');
    signupButton.className = 'button is-primary navbar-item js-modal-trigger';
    signupButton.dataset.target = 'modal-js-signup';
    signupButton.textContent = 'Sign Up';
    
    const loginLogoutContainer = document.getElementById('login/logout');
    loginLogoutContainer.appendChild(loginButton)
    loginLogoutContainer.appendChild(signupButton);

  }

  // Side bar - Move to own file later
  // Toggle group functionality
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
      });
    });
  });

  // Save Sketch
  document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the button
    document.getElementById('save').addEventListener('click', () => {
      let isAuth = getStorage('isAuth');
      if (!isAuth) {
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'notification is-warning is-light';
        const content = document.createElement('div');
        content.innerText = "You must be logged in to save sketches.";
        notification.appendChild(content);

        document.getElementById('save-box').replaceChildren(notification);
      } else {
        // Save Sketch
        // Add input fields for file name and save button
        const saveBox = document.getElementById('save-box');
        if (saveBox) {
          const fileNameField = document.createElement('div');
          fileNameField.className = 'field';
          fileNameField.innerHTML = `
            <label class="label">File Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Enter file name" id="file-name">
            </div>
          `;
          const saveButton = document.createElement('button');
          saveButton.className = 'button is-primary';
          saveButton.textContent = 'Save';
          saveButton.addEventListener('click', () => {
            doSaveSketch();
          });
    
          saveBox.replaceChildren(fileNameField);
          saveBox.appendChild(saveButton);
        }
        
      }
    });

  });

  // Load Sketch
  document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the button
    document.getElementById('load').addEventListener('click', () => {
      let isAuth = getStorage('isAuth');
      if (!isAuth) {
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'notification is-warning is-light';
        const content = document.createElement('div');
        content.innerText = "You must be logged in to load saved sketches.";
        notification.appendChild(content);

        document.getElementById('load-box').replaceChildren(notification);
      } else {
        // load sketch
        //call sketches to get data then map over it
        const table = document.createElement('table');
        table.className = 'table is-fullwidth';
        const tbody = document.createElement('tbody');

        const sketches = doGetSketches().then((res) => {
          if (res.length === 0) {
            const tr = document.createElement('tr');
            tr.innerText = 'No saved sketches';
            tbody.appendChild(tr);
            return;
          }
          res.forEach((data) => {
            const tr = document.createElement('tr');

            const td = document.createElement('td');
            td.innerText = data.name;
            tr.appendChild(td);

            const td2 = document.createElement('td');
            td2.innerText = data.create_time;
            tr.appendChild(td2);

            const td3 = document.createElement('td');
            const button = document.createElement('button');
            button.className = 'button is-primary is-disabled';
            button.textContent = 'Load';
            // button.addEventListener('click', () => {
            //   console.log("load sketch", data.name);
            //   const sketch = document.getElementById('defaultCanvas0');
            //   const sketchData = JSON.parse(data.sketch);
              
            //   console.log("sketchData", sketchData);

              

            // });
            td3.appendChild(button);
            tr.appendChild(td3);

            tbody.appendChild(tr);
            return;
          });

        });

        table.appendChild(tbody);
        document.getElementById('load-box').replaceChildren(table);
      }
    });

  });

