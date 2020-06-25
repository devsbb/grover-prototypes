import nano from 'nano-component'

export const Wrap = nano('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
})

export const TopWrap = nano('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
})