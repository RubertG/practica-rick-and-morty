const url = 'https://rickandmortyapi.com/api/character'
const templateCard = document.getElementById('template-card').content
const cards = document.getElementById('card-dinamicas')

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
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