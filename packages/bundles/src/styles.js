import nano from 'nano-component'

export const Button = nano('button')({
  fontFamily: 'inherit',
  fontSize: 14,
  display: 'inline-block',
  margin: 0,
  padding: 16,
  border: 0,
  borderRadius: 4,
  color: 'white',
  backgroundColor: 'tomato',
  appearance: 'none',
  ':hover': {
    backgroundColor: 'black'
  },
  '@media screen and (min-width: 32em)': {
    fontSize: 16,
  }
})