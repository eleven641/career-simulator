function generateShareImageFunc() {
    if (typeof html2canvas !== 'function') {
        showMessage('请等待页面加载完成');
        return;
    }
    
    const element = document.getElementById('ending-content');
    
    html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `career-simulator-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(error => {
        console.error('Failed to generate image:', error);
        showMessage('生成图片失败，请重试');
    });
}