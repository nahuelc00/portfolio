function mountComponentForm(contComponentFormEl) {
  const formContactNewEl = document.createElement("div");
  formContactNewEl.className = "contacto";

  formContactNewEl.innerHTML = `
  <h2 class="contacto__title">Escribime</h2>
  <form class="form">
    <fieldset class="form__fieldset">
      <label class="form__label">
        NOMBRE <input type="text" name="name" class="form__input form__input--name"
      /></label>
    </fieldset>

    <fieldset class="form__fieldset">
      <label class="form__label"
        >EMAIL<input type="email" name="email" class="form__input form__input--email"
      /></label>
    </fieldset>

    <fieldset class="form__fieldset form__fieldset--textarea">
      <label class="form__label"
        >MENSAJE
        <textarea
          name="message"
          class="form__input form__input--textarea"
        ></textarea>
      </label>
    </fieldset>

    <button class="form__button">Enviar</button>

  </form>`;

  const form = formContactNewEl.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  contComponentFormEl.appendChild(formContactNewEl);
}
