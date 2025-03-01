  // Toast notification function
  function showToast(message, type = 'is-info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast notification ${type}`;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'delete';
    closeBtn.addEventListener('click', function() {
      removeToast(toast);
    });
    
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    
    toast.appendChild(closeBtn);
    toast.appendChild(messageElement);
    
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('is-showing');
    }, 10);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(toast);
      }, duration);
    }
    
    return toast;
  }
  
  function removeToast(toast) {
    toast.classList.remove('is-showing');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
  
  function showSuccessToast(message, duration = 3000) {
    return showToast(message, 'is-success', duration);
  }
  
  function showErrorToast(message, duration = 4000) {
    return showToast(message, 'is-danger', duration);
  }
  
  function showWarningToast(message, duration = 3500) {
    return showToast(message, 'is-warning', duration);
  }
  
  function showInfoToast(message, duration = 3000) {
    return showToast(message, 'is-info', duration);
  }