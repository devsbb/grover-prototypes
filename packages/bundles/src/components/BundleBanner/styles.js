import nano from 'nano-component'

export const Wrap = nano('div')({
    background: 'white',
    border: '1px solid black',
    borderRadius: 8,
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const Title = nano('h2')({
    marginBottom: 16,
})

export const Description = nano('p')({
    marginBottom: 16,
})

export const ProductWrap = nano('div')({
    marginBottom: 16,
})

export const ProductTitle = nano('h3')({
    marginBottom: 16,
})

export const ProductId = nano('p')({
    marginBottom: 16,
})

export const Cta = nano('button')({})
