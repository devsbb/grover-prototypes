import nano from 'nano-component'

export const Wrap = nano('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: '100vh',
})

export const TopWrap = nano('div')({
    display: 'flex',
    justifyContent: 'space-between',
    background: 'red',
    width: '100%',
})