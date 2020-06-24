import nano from 'nano-component'

export const Wrap = nano('div')({
    background: 'white',
    border: '1px solid black',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
})

export const Title = nano('h2')({
    marginBottom: 16,
})

export const Description = nano('p')({
    marginBottom: 16,
})

export const ProductsWrap = nano('div')({
    display: 'flex',
})

export const ProductCard = nano('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: 8,
    padding: 32,
    marginBottom: 16,
    marginRight: 16,
})

export const ProductTitle = nano('h3')({
    marginBottom: 16,
})

export const ProductId = nano('p')({
    marginBottom: 16,
})

export const Cta = nano('button')({})
