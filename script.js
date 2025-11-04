const labData = {
  redes: {
    title: "Laboratório de Redes",
    description: "Ambiente equipado para práticas de configuração, roteamento e segurança de redes.",
    image: "imagens/lab09.png"
  },
  programacao: {
    title: "Laboratório de Programação",
    description: "Espaço projetado para o desenvolvimento de software e aplicações.",
    image: "imagens/lab07.png"
  },
  ia: {
    title: "Laboratório de Inteligência Artificial",
    description: "Dedicado a projetos de machine learning, deep learning e visão computacional.",
    image: "imagens/lab08.png"
  },
  hardware: {
    title: "Laboratório de Hardware",
    description: "Espaço dedicado a montagens, testes e manutenção de dispositivos físicos e eletrônicos.",
    image: "imagens/lab10.png"
  }
};

const cards = document.querySelectorAll(".lab-card");
const modal = document.getElementById("labModal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const labKey = card.dataset.lab;
    const lab = labData[labKey];
    modalTitle.textContent = lab.title;
    modalDescription.textContent = lab.description;
    modalImage.src = lab.image;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });