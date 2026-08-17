/* =========================================================
   TOTAL CARNES — SCRIPT DE ENCOMENDAS
   ========================================================= */

let carrinho = [];


/* =========================================================
   ADICIONAR PRODUTO
   ========================================================= */

function adicionarAoCarrinho(nome, preco, unidade = "un") {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            quantidade: 1,
            unidade: unidade
        });

    }

    atualizarCarrinho();
    abrirCarrinho();
}


/* =========================================================
   ADICIONAR PRODUTO COM SABOR
   ========================================================= */

function adicionarComSabor(nome, preco, unidade, idSelect) {

    const select = document.getElementById(idSelect);

    if (!select) {
        return;
    }

    const sabor = select.value;

    const nomeCompleto =
        nome + " - " + sabor;

    adicionarAoCarrinho(
        nomeCompleto,
        0,
        unidade
    );
}


/* =========================================================
   ATUALIZAR CARRINHO
   ========================================================= */

function atualizarCarrinho() {

    const areaItens =
        document.getElementById("itens-carrinho");

    if (!areaItens) {
        return;
    }

    areaItens.innerHTML = "";


    /* CARRINHO VAZIO */

    if (carrinho.length === 0) {

        areaItens.innerHTML = `
            <p>
                Sua encomenda está vazia.
            </p>
        `;

        return;
    }


    /* PRODUTOS */

    carrinho.forEach((produto, index) => {

        const item =
            document.createElement("div");

        item.className =
            "item-encomenda";


        item.innerHTML = `

            <div class="item-encomenda-info">

                <strong>
                    ${produto.nome}
                </strong>

                <span>
                    Quantidade: ${produto.quantidade} ${produto.unidade}
                </span>

            </div>


            <div
                class="item-encomenda-controles"
                style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-top:10px;
                "
            >

                <button
                    type="button"
                    onclick="alterarQuantidade('${produto.nome}', -1)"
                    style="
                        background:#333;
                        color:white;
                        border:none;
                        width:32px;
                        height:32px;
                        border-radius:5px;
                        cursor:pointer;
                        font-size:18px;
                    "
                >
                    −
                </button>


                <strong>
                    ${produto.quantidade}
                </strong>


                <button
                    type="button"
                    onclick="alterarQuantidade('${produto.nome}', 1)"
                    style="
                        background:#e52b23;
                        color:white;
                        border:none;
                        width:32px;
                        height:32px;
                        border-radius:5px;
                        cursor:pointer;
                        font-size:18px;
                    "
                >
                    +
                </button>

            </div>

        `;

        areaItens.appendChild(item);

    });

}


/* =========================================================
   ALTERAR QUANTIDADE
   ========================================================= */

function alterarQuantidade(nome, quantidade) {

    const produto =
        carrinho.find(
            produto => produto.nome === nome
        );

    if (!produto) {
        return;
    }


    produto.quantidade += quantidade;


    if (produto.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                item => item.nome !== nome
            );

    }


    atualizarCarrinho();
}


/* =========================================================
   ABRIR CARRINHO
   ========================================================= */

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (!carrinhoElemento) {
        return;
    }


    carrinhoElemento.classList.add(
        "carrinho-aberto"
    );

    carrinhoElemento.style.display =
        "block";
}


/* =========================================================
   FECHAR CARRINHO
   ========================================================= */

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (!carrinhoElemento) {
        return;
    }


    carrinhoElemento.classList.remove(
        "carrinho-aberto"
    );

    carrinhoElemento.style.display =
        "none";
}


/* =========================================================
   SELECIONAR ENTREGA
   ========================================================= */

function selecionarEntrega(tipo) {

    const select =
        document.getElementById("tipo-entrega");

    const campoEndereco =
        document.getElementById("campo-endereco");

    const btnUber =
        document.getElementById("btn-uber");

    const btnRetirada =
        document.getElementById("btn-retirada");


    if (!select || !campoEndereco) {
        return;
    }


    select.value = tipo;


    if (btnUber) {
        btnUber.classList.remove("ativo");
    }

    if (btnRetirada) {
        btnRetirada.classList.remove("ativo");
    }


    if (tipo === "Entrega por Uber") {

        if (btnUber) {
            btnUber.classList.add("ativo");
        }

        campoEndereco.style.display =
            "block";

    } else {

        if (btnRetirada) {
            btnRetirada.classList.add("ativo");
        }

        campoEndereco.style.display =
            "none";


        const endereco =
            document.getElementById(
                "endereco-cliente"
            );

        if (endereco) {
            endereco.value = "";
        }

    }
}


/* =========================================================
   MOSTRAR ENDEREÇO
   ========================================================= */

function mostrarEndereco() {

    const select =
        document.getElementById("tipo-entrega");

    if (!select) {
        return;
    }

    selecionarEntrega(select.value);
}


/* =========================================================
   FINALIZAR ENCOMENDA — WHATSAPP
   ========================================================= */

function finalizarWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "Sua encomenda está vazia. Adicione algum produto antes de enviar."
        );

        return;
    }


    const nomeElemento =
        document.getElementById("nome-cliente");

    const telefoneElemento =
        document.getElementById("telefone-cliente");

    const tipoEntregaElemento =
        document.getElementById("tipo-entrega");

    const pagamentoElemento =
        document.getElementById("pagamento");

    const observacoesElemento =
        document.getElementById("observacoes");


    const nome =
        nomeElemento
            ? nomeElemento.value.trim()
            : "";


    const telefone =
        telefoneElemento
            ? telefoneElemento.value.trim()
            : "";


    const tipoEntrega =
        tipoEntregaElemento
            ? tipoEntregaElemento.value
            : "";


    const pagamento =
        pagamentoElemento
            ? pagamentoElemento.value
            : "";


    const observacoes =
        observacoesElemento
            ? observacoesElemento.value.trim()
            : "";


    /* =====================================================
       VALIDAÇÕES
       ===================================================== */

    if (!nome) {

        alert("Digite seu nome.");

        if (nomeElemento) {
            nomeElemento.focus();
        }

        return;
    }


    if (!telefone) {

        alert("Digite seu telefone.");

        if (telefoneElemento) {
            telefoneElemento.focus();
        }

        return;
    }


    if (!tipoEntrega) {

        alert(
            "Escolha como deseja receber a encomenda."
        );

        return;
    }


    let endereco = "";


    if (
        tipoEntrega ===
        "Entrega por Uber"
    ) {

        const enderecoElemento =
            document.getElementById(
                "endereco-cliente"
            );


        endereco =
            enderecoElemento
                ? enderecoElemento.value.trim()
                : "";


        if (!endereco) {

            alert(
                "Digite o endereço para entrega."
            );

            if (enderecoElemento) {
                enderecoElemento.focus();
            }

            return;
        }

    }


    if (!pagamento) {

        alert(
            "Escolha a forma de pagamento."
        );

        return;
    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    const numero =
        "5511953000827";


    /* =====================================================
       MONTAR MENSAGEM
       ===================================================== */

    let mensagem =
        "🥩 *NOVA ENCOMENDA - TOTAL CARNES*\n\n";


    mensagem +=
        `👤 *Nome:* ${nome}\n`;


    mensagem +=
        `📱 *Telefone:* ${telefone}\n\n`;


    mensagem +=
        `📦 *Forma de recebimento:* ${tipoEntrega}\n`;


    if (
        tipoEntrega ===
        "Entrega por Uber"
    ) {

        mensagem +=
            `📍 *Endereço:* ${endereco}\n`;

        mensagem +=
            `🛵 *Entrega por Uber — taxa por conta do cliente*\n`;

    }


    mensagem +=
        `\n💳 *Pagamento:* ${pagamento}\n\n`;


    mensagem +=
        "🛒 *ITENS DA ENCOMENDA*\n\n";


    carrinho.forEach(
        (produto) => {

            mensagem +=
                `• ${produto.nome} — ` +
                `${produto.quantidade} ` +
                `${produto.unidade}\n`;

        }
    );


    if (observacoes) {

        mensagem +=
            `\n📝 *Observações:*\n`;

        mensagem +=
            `${observacoes}\n`;

    }


    mensagem +=
        "\n❤️ Obrigado! Aguardamos sua confirmação.";


    /* =====================================================
       ABRIR WHATSAPP
       ===================================================== */

    const url =
        `https://wa.me/${numero}?text=` +
        encodeURIComponent(mensagem);


    window.open(
        url,
        "_blank"
    );
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function iniciarMenuMobile() {

    const menuMobile =
        document.getElementById(
            "menuMobile"
        );

    const menuNav =
        document.getElementById(
            "menuNav"
        );


    if (!menuMobile || !menuNav) {
        return;
    }


    menuMobile.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            menuNav.classList.toggle(
                "menu-aberto"
            );


            if (
                menuNav.classList.contains(
                    "menu-aberto"
                )
            ) {

                menuMobile.innerHTML = "✕";

                menuMobile.setAttribute(
                    "aria-label",
                    "Fechar menu"
                );

            } else {

                menuMobile.innerHTML = "☰";

                menuMobile.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );


    menuNav
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    menuNav.classList.remove(
                        "menu-aberto"
                    );

                    menuMobile.innerHTML =
                        "☰";

                    menuMobile.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                menuNav.classList.contains(
                    "menu-aberto"
                ) &&
                !menuNav.contains(
                    event.target
                ) &&
                !menuMobile.contains(
                    event.target
                )
            ) {

                menuNav.classList.remove(
                    "menu-aberto"
                );

                menuMobile.innerHTML =
                    "☰";

                menuMobile.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            atualizarCarrinho();
            iniciarMenuMobile();

        }
    );

} else {

    atualizarCarrinho();
    iniciarMenuMobile();

}