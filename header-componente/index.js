function mountComponentHeader(contComponentHeaderEl) {
  const headerNewEl = document.createElement("header");
  headerNewEl.className = "header";
  headerNewEl.innerHTML = `<img class="header__logo" src="./logos/logo-nombre.png" alt="logo-personal" />
  <div class="header-menu-mobile-open">
    <div class="header-menu-mobile-open__line"></div>
    <div class="header-menu-mobile-open__line"></div>
    <div class="header-menu-mobile-open__line"></div>
  </div>
  <div class="header-menu-desktop">
    <nav class="header-menu-desktop__nav">
      <ul class="header-menu-desktop__links">
        <a href="#about" class="header-menu-desktop__link"
          >About</a
        >
        <a href="#skills" class="header-menu-desktop__link"
          >Skills</a
        >
        <a href="#proyects" class="header-menu-desktop__link">Proyectos</a>
        <a href="#contact" class="header-menu-desktop__link">Contacto</a>
      </ul>
    </nav>
  </div>
  <section class="ventana-mobile">
  <div class="ventana-mobile__cont-logo-close">
    <img class="ventana-mobile__logo-close" src="./logos/cruz-menu-mobile-header.png" />
  </div>
  <div class="ventana-mobile__cont-links">
    <a class="ventana-mobile__link" href="#about">About</a>
    <a class="ventana-mobile__link" href="#skills">Skills</a>
    <a class="ventana-mobile__link" href="#proyects">Proyectos</a>
    <a class="ventana-mobile__link" href="#contact">Contacto</a>
  </div>
 </section>
  `;

  function redirectPageHome() {
    const logoEl = headerNewEl.querySelector(".header__logo");
    logoEl.addEventListener("click", () => {
      window.location = "./index.html#welcome";
    });
  }
  redirectPageHome();

  function openAndCloseMenuMobile(linksMenuHamburguer) {
    const ventanaEl = headerNewEl.querySelector(".ventana-mobile");
    const buttonShowMenuEl = headerNewEl.querySelector(
      ".header-menu-mobile-open"
    );
    const buttonCloseMenuEl = headerNewEl.querySelector(
      ".ventana-mobile__logo-close"
    );

    buttonShowMenuEl.addEventListener("click", (e) => {
      ventanaEl.style.display = "block";
    });
    buttonCloseMenuEl.addEventListener("click", (e) => {
      ventanaEl.style.display = "";
    });
    buttonCloseMenuEl.addEventListener("click", (e) => {
      ventanaEl.style.display = "";
    });
    linksMenuHamburguer.forEach((link) => {
      link.addEventListener("click", (e) => {
        ventanaEl.style.display = "";
      });
    });
  }

  contComponentHeaderEl.appendChild(headerNewEl);


  const linksMenuHamburguer = document.querySelectorAll(
    ".ventana-mobile__link"
  );
  openAndCloseMenuMobile(linksMenuHamburguer);
}
