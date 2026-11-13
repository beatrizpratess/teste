/* ============================================================
   Comportamento do site: navegação entre telas e busca.
   O conteúdo e as imagens ficam no index.html.
   ============================================================ */

var telaInicio = document.getElementById("tela-inicio");
var telaObras = document.getElementById("tela-obras");
var telaObra = document.getElementById("tela-obra");
var linhas = document.querySelectorAll("#lista .row");

/* ---------- Tela: página da obra ---------- */
function montarObra(linha) {
  telaObra.innerHTML = [
    '<a class="hand back" href="#obras">← Voltar às obras</a>',
    '<div class="card detail">',
    '<div>',
    '<div class="img ph">' + linha.querySelector(".img").innerHTML + '</div>',
    '<p class="credit">Crédito: ' + linha.dataset.acervo + '</p>',
    '</div>',
    '<div>',
    '<span class="sticker">' + linha.querySelector(".sticker").textContent + '</span>',
    '<h1>' + linha.querySelector("h3").textContent + '</h1>',
    '<ul class="fields">',
    '<li><b>Ano:</b> ' + linha.querySelector(".sticker").textContent + '</li>',
    '<li><b>Técnica:</b> ' + linha.dataset.tecnica + '</li>',
    '<li><b>Acervo:</b> ' + linha.dataset.acervo + '</li>',
    '</ul>',
    '<p class="d">' + linha.querySelector("p").textContent + '</p>',
    '<a class="btn" href="#obras">Ver mais obras</a>',
    '</div>',
    '</div>'
  ].join("");
}

/* ---------- Navegação (pelo # da URL) ---------- */
function route() {
  var hash = (location.hash || "#inicio").slice(1);
  var ativo = "inicio";
  var linha = null;

  if (hash.indexOf("obra-") === 0) {
    linha = document.querySelector('#lista .row[data-id="' + hash.slice(5) + '"]');
  }

  telaInicio.hidden = true;
  telaObras.hidden = true;
  telaObra.hidden = true;

  if (hash === "obras") {
    ativo = "obras";
    telaObras.hidden = false;
  } else if (linha) {
    ativo = "obras";
    montarObra(linha);
    telaObra.hidden = false;
  } else {
    telaInicio.hidden = false;
  }

  document.querySelectorAll("nav a").forEach(function (a) {
    a.classList.toggle("on", a.dataset.r === ativo);
  });
  window.scrollTo(0, 0);
}

/* ---------- Busca na lista de obras ---------- */
function buscar() {
  var termo = document.getElementById("busca").value.toLowerCase();
  var visiveis = 0;

  linhas.forEach(function (linha) {
    var texto = (
      linha.querySelector("h3").textContent + " " +
      linha.dataset.acervo + " " +
      linha.querySelector(".sticker").textContent
    ).toLowerCase();
    var mostrar = texto.indexOf(termo) > -1;

    linha.hidden = !mostrar;
    if (mostrar) {
      visiveis++;
    }
  });

  document.getElementById("contagem").textContent = visiveis + " obras";
  document.getElementById("vazio").hidden = visiveis > 0;
}

document.getElementById("busca").addEventListener("input", buscar);
window.addEventListener("hashchange", route);

buscar();
route();