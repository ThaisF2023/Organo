let botaoAdicionar = document.querySelector('#botaoAdicionar')
botaoAdicionar.addEventListener('click', async function (e) {
    e.preventDefault()
    let form = document.querySelector('.formAdd')
    let pessoa = receberValoresDoForm(form)

    let row

    let imagemCodificada = await converterParaBase64(pessoa.imagem)
    localStorage.setItem('imagem', imagemCodificada)

    switch (pessoa.time) {
        case 'fullStack':
            row = document.querySelector('.fullStack')
            pessoa.corFundo = '#5cb85c'
            break
        case 'frontEnd':
            row = document.querySelector('.frontEnd')
            pessoa.corFundo = '#0275d8'
            break
        case 'BackEnd':
            row = document.querySelector('.backEnd')
            pessoa.corFundo = '#f0ad4e'
            break
        case 'dataScience':
            row = document.querySelector('.dataScience')
            pessoa.corFundo = '#d9534f'
            break
        case 'mobile':
            row = document.querySelector('.mobile')
            pessoa.corFundo = '#333'
            break
        case 'uxEDesign':
            row = document.querySelector('.uxEDesign')
            pessoa.corFundo = '#5bc0de'
            break
    }
    row.appendChild(await adicionarCard(pessoa))
})

function receberValoresDoForm(form) {
    let pessoa = {
        nome: form.nome.value,
        cargo: form.cargo.value,
        imagem: form.imagem.files[0],
        time: form.time.value
    }
    return pessoa
}

function adicionarDescricao(pessoa) {
    //criando um elemento h4 para receber o nome da pessoa
    let nomePessoa = document.createElement('h4')
    //add o conteudo de texto recebido do form dentro da tag criada
    nomePessoa.textContent = pessoa.nome
    //add uma classe dentro da tag criada
    nomePessoa.classList.add('text-center')
    nomePessoa.style.color = (pessoa.corFundo)

    //criando um elemento p para receber o cargo da pessoa
    let cargoPessoa = document.createElement('p')
    cargoPessoa.textContent = pessoa.cargo
    cargoPessoa.classList.add('text-center')
    cargoPessoa.style.color = (pessoa.corFundo)

    //colocando os dados obtidos dentro de uma tag <figcaption>
    let figcaption = document.createElement('figcaption')

    figcaption.appendChild(nomePessoa)
    figcaption.appendChild(cargoPessoa)

    return figcaption
}

async function montarCard(pessoa) {
    let foto = document.createElement('img')

    let imagemCodificada = localStorage.getItem('imagem')
    foto.setAttribute('src', 'data:image/png;base64,' + imagemCodificada)
    // foto.classList.add('rounded')
    foto.classList.add('img-fluid')
    foto.classList.add('foto')



    let figure = document.createElement('figure')
    figure.classList.add('card')
    figure.appendChild(foto)
    figure.appendChild(adicionarDescricao(pessoa))
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, ' + pessoa.corFundo + ' 40%)'


    return figure
}

 async function adicionarCard(pessoa) {
    let card = await montarCard(pessoa)

    let coluna = document.createElement('div')
    coluna.classList.add('col-md-3')
    coluna.appendChild(card)

    return coluna
}
async function converterParaBase64(imagem){
        return new Promise(resolve=> {
            let reader = new FileReader()
            reader.readAsDataURL(imagem)
            reader.onload = function(){
                let imagemCodificada = reader.result.split('')[1]
                resolve(imagemCodificada)

            }
        })
    }