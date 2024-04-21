function mountComponents() {
  const contHeaderEl = document.querySelector(".cont-header");
  const contFooterEl = document.querySelector(".cont-comp-footer");
  const contFormContactEl = document.querySelector(".cont-form-contact");

  mountComponentHeader(contHeaderEl);
  mountComponentFooter(contFooterEl);
  mountComponentForm(contFormContactEl);
}

function fetchContentful(entryId) {
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries/" +
    entryId +
    "?access_token=tM_hFkP9tO8hIO4hH7uVcFa7dVnWZcG4b9FVw3OR7cI";
  return fetch(url).then((res) => {
    return res.json();
  });
}
function fetchContentfulAsset(assetId) {
  const url =
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/assets/" +
    assetId +
    "?access_token=tM_hFkP9tO8hIO4hH7uVcFa7dVnWZcG4b9FVw3OR7cI";
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const urlImg = "https:" + data.fields.file.url;
      return urlImg;
    });
}

function connectToSectionPresentacion() {
  const entryIdPresentacion = "7JSLgYjrHkAmgOTDdlQORF";
  const imgEl = document.querySelector(".presentacion__img");
  const textEl = document.querySelector(".presentacion__text");

  fetchContentful(entryIdPresentacion)
    .then((data) => {
      const fields = data.fields;
      const text = fields.presentacionText;
      const imgId = fields.presentacionImg.sys.id;

      const fieldInfo = {
        text,
        imgId,
      };
      return fieldInfo;
    })
    .then((data) => {
      fetchContentfulAsset(data.imgId).then((dataAsset) => {
        const dataToRender = {
          text: data.text,
          img: dataAsset,
        };
        textEl.textContent = dataToRender.text;
        imgEl.src = dataToRender.img;
      });
    });
}

function connectToSectionSkills() {
  const entryIdSkills = "1Vutdne8A9n0HWnwTuAuhx";
  const sectionContSkillsEl = document.querySelector(".skills__cont");

  fetchContentful(entryIdSkills)
    .then((data) => {
      const skills = data.fields.skill;
      const idsImgs = [];
      skills.forEach((i) => {
        const idImg = i.sys.id;
        idsImgs.push(idImg);
      });
      return {
        idsImgs,
      };
    })
    .then((data) => {
      const idsImgs = data.idsImgs;
      idsImgs.map((id) => {
        fetchContentfulAsset(id).then((i) => {
          const posicionUltimoSlash = i.lastIndexOf("/");
          const urlCortada = i.slice(posicionUltimoSlash);
          const urlSinSlash = urlCortada.slice(1);
          const posicionDePunto = urlSinSlash.lastIndexOf(".");
          const palabraSinPunto = urlSinSlash.slice(0, posicionDePunto);

          const contImgEl = document.createElement("div");
          const nameSkillEl = document.createElement("p");
          const imgEl = document.createElement("img");

          contImgEl.classList.add("skills__cont-skill");

          nameSkillEl.classList.add("skills__name-skill");
          nameSkillEl.textContent = palabraSinPunto;

          imgEl.classList.add("skills__skill");
          imgEl.src = i;

          contImgEl.appendChild(nameSkillEl);
          contImgEl.appendChild(imgEl);
          sectionContSkillsEl.appendChild(contImgEl);

          // Cuando paso el mouse sobre el contenedor del skill
          // se asigna la clase para volver el nombre de color negro
          contImgEl.addEventListener("mouseover", () => {
            nameSkillEl.classList.add("skills__name-skill--black");
          });
        });
      });
    });
}

function getProyectsData() {
  return fetch(
    "https://cdn.contentful.com/spaces/oc2uf5byuqeu/environments/master/entries?access_token=tM_hFkP9tO8hIO4hH7uVcFa7dVnWZcG4b9FVw3OR7cI"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let dataProyects = [];
      data.items.forEach((i) => {
        if (i.fields.linkDemo) {
          const imgId = i.fields.img.sys.id;
          const linkDemo = i.fields.linkDemo.content[0].content[0].value;
          const titleProyect = i.fields.title.content[0].content[0].value;
          const descriptionProyect = i.fields.description;
          const linkGithub = i.fields.linkGithub.content[0].content[0].value;

          dataProyects.push({
            imgId,
            linkDemo,
            titleProyect,
            descriptionProyect,
            linkGithub,
          });
        }
      });
      return dataProyects;
    });
}

function connectToSectionProyects() {
  const contProyectsEl = document.querySelector(".proyects__cont");
  const $contGithubLink = document.createElement("div");
  const githubLogoEl = document.createElement("img");
  const textInContGithubEl = document.createElement("span");

  githubLogoEl.src = "./logo-github.png";
  textInContGithubEl.textContent = "More here";
  $contGithubLink.appendChild(githubLogoEl);
  $contGithubLink.appendChild(textInContGithubEl);

  getProyectsData().then((proyectsData) => {
    proyectsData.forEach((proyect) => {
      const proyectContEl = document.createElement("div");
      proyectContEl.classList.add("proyects__proyect-cont");

      const titleEl = document.createElement("p");
      const descriptionEl = document.createElement("p");

      const linksContainerEl = document.createElement("div");
      linksContainerEl.classList.add("proyects__links-container");

      const linkDemoEl = document.createElement("a");
      const imgEl = document.createElement("img");
      const linkGithubEl = document.createElement("a");

      linksContainerEl.appendChild(linkGithubEl);
      linksContainerEl.appendChild(linkDemoEl);

      titleEl.classList.add("proyects__proyect-title");
      titleEl.textContent = proyect.titleProyect;

      descriptionEl.textContent = proyect.descriptionProyect;
      descriptionEl.classList.add("proyects__proyect-description");

      linkDemoEl.classList.add("proyects__proyect-link");
      linkDemoEl.textContent = "Demo";
      linkDemoEl.target = "_BLANK";
      linkDemoEl.href = proyect.linkDemo;
      linkDemoEl.addEventListener("click", () => {
        window.open(proyect.linkDemo);
      });

      imgEl.classList.add("proyects__proyect-img");

      linkGithubEl.classList.add("proyects__proyect-link-github");
      linkGithubEl.textContent = "Code";
      linkGithubEl.href = proyect.linkGithub;
      linkGithubEl.target = "_BLANK";
      linkGithubEl.addEventListener("click", () => {
        window.open(proyect.linkGithub);
      });

      fetchContentfulAsset(proyect.imgId).then((data) => {
        const imgUrl = data;
        imgEl.src = imgUrl;
        proyectContEl.appendChild(titleEl);
        proyectContEl.appendChild(descriptionEl);
        proyectContEl.appendChild(imgEl);
        proyectContEl.appendChild(linksContainerEl);
        contProyectsEl.appendChild(proyectContEl);
      });
    });
  });
}

function main() {
  mountComponents();
  connectToSectionPresentacion();
  connectToSectionSkills();
  connectToSectionProyects();
}
main();
