import Styled from 'styled-components'

export const TotalBack = Styled.div`
width:100vw;
height:100vh;
background-color:black;
display:flex;
justify-content:center;
align-items:center;
`
export const InnerContainer = Styled.div`
width:55%;
height:93%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
export const BodyContainer = Styled.div`
width:100%;
height:95%;
display:flex;
flex-direction:row;
`
export const StyledListItem = Styled.li`
width:30%;
`
export const StyledReaction = Styled.button`
color:${props => (props.like ? '#2563eb' : '#64748b')};
`
