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

export const Title = nano('h3')({
    marginBottom: 16,
})

export const PlanText = nano('p')({
    marginBottom: 16,
})

export const PlanSelector = nano('div')({
    display: 'flex',
    marginBottom: 32,
})

export const Plan = nano('div')(props =>({
    cursor: 'pointer',
    margin: '0px 16px',
    border: '1px solid black',
    padding: 16,
    background: props.isActive && 'grey',
}))

export const Cta = nano('button')({})
