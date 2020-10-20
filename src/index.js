// подключение стилей
import './main.css';

// класс таймера обратного отсчета

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = document.querySelector(`${selector}`);
    this.targetDate = targetDate;
    this.init();
  }

  // очищает интерфейс до формата 00:00:00
  init() {
    const time = this.getTimeComponents(0);
    this.updateTimerFace(time);
  }

  // таймер
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;

      // предотвращаем появление отрицательного времени
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.init();
        return;
      }

      const time = this.getTimeComponents(deltaTime);
      this.updateTimerFace(time);
    }, 1000);
  }

  // обновляет интерфейс
  updateTimerFace({ days, hours, mins, secs }) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
  }

  // принимает время в мс, вычисляет необходимые величины времени
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  // Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// создаем экземпляр согласно задания
const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 25, 2020 10:57 AM'),
});

// запускаем при загрузке страницы
window.onload = myTimer.start();
