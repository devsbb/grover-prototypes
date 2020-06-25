import nano from 'nano-component'

export const Wrap = nano('div')({
    background: 'white',
    border: '1px solid black',
    borderRadius: 8,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    height: 400,
})

export const Title = nano('h3')({
    marginBottom: 16,
})

export const ProductsWrap = nano('div')({
    maxHeight: '100%',
    overflow: 'scroll',
    padding: '0px 16px',
    maxHeight: '100%',
})
