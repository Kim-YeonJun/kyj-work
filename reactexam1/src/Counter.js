import React,{useState} from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = ({ initialValue:init }) => {
// const Counter = ({ initialValue }) => {

    //0에서 출발
    //1씩 증가하고
    //1씩 감소하는
    //count 상태
    // console.log(init);

    const [count, setCount] = useState(init);
    // const [count, setCount] = useState(initialValue);

    const onIncrease = () => {
        // setCount(count + 1);
        // let prevState  = count + 1;
        
        const nextState1 = count + 1;
        setCount(nextState1);

        // setCount((prevState) => {
        //     const nextState = prevState + 1;
        //     return nextState;
        // });
    };

    

    const onDecrease = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h2>{count}</h2>  
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEvenResult count={count} />
        </div>
    )
};

Counter.defaultProps = {
    initialValue: 0,
};

export default Counter;