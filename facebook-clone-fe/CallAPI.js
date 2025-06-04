// Sign-up
document.getElementById('reg').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const day = form.querySelector('.register-form__select--day').value.padStart(2, '0');
    const month = form.querySelector('.register-form__select--month').value.padStart(2, '0');
    const year = form.querySelector('.register-form__select--year').value;
    const birthDay = `${year}-${month}-${day}`;

    const sexValue = form.querySelector('input[name="sex"]:checked')?.value;
    const sex = sexValue === '1' ? 'Female' : sexValue === '2' ? 'Male' : '';

    const data = {
        username: form.querySelector('.register-form__input--contact').value.trim() || '',
        password: form.querySelector('.register-form__input--password').value || '',
        firstName: form.querySelector('.register-form__input--firstname').value.trim() || '',
        lastName: form.querySelector('.register-form__input--surname').value.trim() || '',
        sex: sex,
        birthDay: birthDay
    };

    // Basic validation
    if (!data.username || !data.password || !data.firstName || !data.lastName || !data.sex || !data.birthDay) {
        alert('Vui lòng điền đầy đủ tất cả các trường bắt buộc.');
        return;
    }

    // Additional validation for birthday
    if (day === '00' || month === '00' || year === '0') {
        alert('Vui lòng chọn ngày, tháng và năm sinh hợp lệ.');
        return;
    }

    const resultBox = document.getElementById('result');
    if (resultBox) {
        resultBox.innerText = 'Đang gửi...';
    }

    try {
        const response = await fetch('https://2bda-116-96-47-67.ngrok-free.app/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resText = await response.text();

        if (response.ok) {
            alert('Thành công: ' + resText);
            if (resultBox) {
                resultBox.innerText = 'Đăng ký thành công!';
                resultBox.style.color = 'green';
            }
        } else {
            alert('Lỗi: ' + resText);
            if (resultBox) {
                resultBox.innerText = 'Lỗi: ' + resText;
                resultBox.style.color = 'red';
            }
        }
    } catch (error) {
        if (resultBox) {
            resultBox.textContent = 'Lỗi kết nối đến server';
            resultBox.style.color = 'red';
        }
        console.error('Error:', error);
    }
});

