const url = 'https://rickandmortyapi.com/api/character'
const templateCard = document.getElementById('template-card').content
const cards = document.getElementById('card-dinamicas')
let pagina = 1

document.addEventListener('DOMContentLoaded', () => {
    fetchData(url)
})

const fetchData = async (url) => {
    try {
        loadingData(true)
        const rta = await fetch(url)
        const data = await rta.json()

        pintarCard(data)
    } catch (e) {
        console.log(e)
    } finally {
        loadingData(false)
    }
}

const pintarCard = data => {
    btnAnterior()
    btnSiguiente()

    const fragment = document.createDocumentFragment()
    
    data.results.forEach(element => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h2').textContent = element.name
        clone.querySelector('p').textContent = element.species
        clone.querySelector('.card-img').setAttribute('src', element.image)
        fragment.appendChild(clone)
    });

    cards.appendChild(fragment)
}

const loadingData = estado => {
    const loading = document.querySelector('.container-spinner')
    if (estado) {
        loading.classList.remove('ocultar')
    } else {
        loading.classList.add('ocultar')
    }
}

const btnAnterior = () => {
    if (pagina === 1) {
        document.querySelector('#btn-anterior').classList.add('ocultar')
    } else {
        document.querySelector('#btn-anterior').classList.remove('ocultar')
    }
}

const btnSiguiente = () => {
    if (pagina === 42) {
        document.querySelector('#btn-siguiente').classList.add('ocultar')
    } else {
        document.querySelector('#btn-siguiente').classList.remove('ocultar')
    }
}

const irAnterior = () => {
    if (pagina != 1) {
        Limpiar()
        pagina--
        fetchData(url + '/?page=' + pagina)
    }
}

const irSiguiente = () => {
    if (pagina != 42) {
        Limpiar()
        pagina++
        fetchData(url + '/?page=' + pagina)
    }
}

const Limpiar = () => {
    for (i = 0; i <= 19; i++){
        cards.removeChild(document.querySelector('.card'))
    }
}