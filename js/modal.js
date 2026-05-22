let currentCallback = null;

function createModalContainer() {
    if (document.getElementById('message-modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'message-modal';
    modal.className = 'modal message-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-body">
                <p id="modal-message"></p>
            </div>
            <div class="modal-footer">
                <button id="modal-ok" class="btn btn-primary">确定</button>
                <button id="modal-cancel" class="btn btn-secondary" style="display: none;">取消</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('modal-ok').addEventListener('click', function() {
        closeModal();
        if (currentCallback) {
            currentCallback(true);
            currentCallback = null;
        }
    });
    
    document.getElementById('modal-cancel').addEventListener('click', function() {
        closeModal();
        if (currentCallback) {
            currentCallback(false);
            currentCallback = null;
        }
    });
}

function closeModal() {
    const modal = document.getElementById('message-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showMessage(message, callback) {
    createModalContainer();
    
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal-ok').style.display = 'block';
    document.getElementById('modal-cancel').style.display = 'none';
    
    if (callback) {
        currentCallback = callback;
    }
    
    document.getElementById('message-modal').style.display = 'flex';
}

function showConfirm(message, callback) {
    createModalContainer();
    
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal-ok').style.display = 'block';
    document.getElementById('modal-cancel').style.display = 'block';
    
    currentCallback = callback;
    
    document.getElementById('message-modal').style.display = 'flex';
}

function alert(message) {
    showMessage(message);
}

function confirm(message) {
    return new Promise(function(resolve) {
        showConfirm(message, resolve);
    });
}