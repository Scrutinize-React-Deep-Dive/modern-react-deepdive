
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM이 로드, 파싱되었습니다.');

    const demo = document.getElementById('demo');
    demo.textContent = '문단의 내용이 변경되었습니다!';

    // 이벤트 리스너 추가
    demo.addEventListener('click', function () {
        alert('문단을 클릭했습니다!');
    });

    // 새로운 요소 추가
    const newElement = document.createElement('p');
    newElement.textContent = '새로운 문단이 추가되었습니다!';
    document.body.appendChild(newElement);

    // 새로운 스타일 추가
    newElement.style.color = 'red';
    newElement.style.fontSize = '1.5em';
    newElement.style.fontWeight = 'bold';
    newElement.style.marginTop = '20px';
    newElement.style.textAlign = 'center';
});