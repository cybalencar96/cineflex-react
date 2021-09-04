import styled from "styled-components"

const Button = styled.button`
    background-color: #E8833A;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 3px;
    cursor: ${({enabled}) => enabled ? "pointer" : "not-allowed"};
    margin: 30px auto ;
    font-size: 18px;
    width: 225px;
    height: 42px;
    border: none;
    opacity: ${({enabled}) => enabled ? 1 : 0.6};
`

const Input = styled.input`
    width: 100%;
    height: 51px;
    border-radius: 3px;
    border: 1px solid ${({isValid}) => isValid ? '#D5D5D5' : 'red'};
    padding-left: 20px;
    font-size: 18px;
    
    &:focus {
        outline: none;
    }
`

export {
    Button,
    Input
}